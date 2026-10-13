import { departureTime } from './departures';
import { buildRoute, passesWithin, projectOnRoute } from './route-position';
import type { RouteLine } from './route-position';
import type { HomeAssistant } from 'custom-card-helpers';

export const VEHICLE_POLL_MS = 12 * 1000;

export interface PidRouteShape {
  route: string;
  headsign: string | null;
  shape_id: string | null;
  // [lon, lat] pairs (GeoJSON order), null when the line has no reference trip
  coordinates: [number, number][] | null;
}

export interface PidVehicle {
  vehicle_id: string | null;
  route: string;
  trip_id: string | null;
  headsign: string | null;
  latitude: number;
  longitude: number;
  bearing: number | null;
  delay_min: number | null;
  state: string | null;
  canceled: boolean;
}

export interface PidVehiclesResponse {
  updated?: string;
  vehicles: PidVehicle[];
  routes_without_reference?: string[];
}

interface ServiceResponseEnvelope<T> {
  response: T;
}

// Calls a pid_departure_boards service that only answers with response data (SupportsResponse.ONLY).
async function callForResponse<T>(hass: HomeAssistant, service: string, entityId: string): Promise<T> {
  const result = await hass.callWS<ServiceResponseEnvelope<T>>({
    type: 'call_service',
    domain: 'pid_departure_boards',
    service,
    service_data: { entity_id: entityId },
    return_response: true,
  });
  return result.response;
}

export async function fetchRouteShapes(hass: HomeAssistant, entityId: string): Promise<PidRouteShape[]> {
  const response = await callForResponse<{ routes?: PidRouteShape[] }>(hass, 'get_route_shapes', entityId);
  return (response?.routes ?? []).filter((shape) => (shape.coordinates?.length ?? 0) >= 2);
}

export async function fetchVehicles(hass: HomeAssistant, entityId: string): Promise<PidVehiclesResponse> {
  const response = await callForResponse<Partial<PidVehiclesResponse>>(hass, 'get_vehicle_positions', entityId);
  const vehicles = (response?.vehicles ?? []).filter((vehicle) => Number.isFinite(vehicle.latitude) && Number.isFinite(vehicle.longitude));
  return { updated: response?.updated, vehicles, routes_without_reference: response?.routes_without_reference ?? [] };
}

// The service delivers [lon, lat]; Leaflet wants [lat, lon].
export function toLatLngs(coordinates: [number, number][]): [number, number][] {
  return coordinates.map(([lon, lat]) => [lat, lon]);
}

const METRO_COLORS: Record<string, string> = { A: '#00a651', B: '#f7d600', C: '#e31b23' };

// Colors by vehicle type (GTFS route_type): tram red, bus blue, trolleybus green, train purple, metro per line.
export function routeColor(route: string, routeType: number | null | undefined): string {
  if (routeType === 1) return METRO_COLORS[route.toUpperCase()] ?? '#555555';
  if (routeType === 0) return '#c8102e';
  if (routeType === 11) return '#00843d';
  if (routeType === 2) return '#6a2c91';
  if (routeType === 4) return '#0099b0';
  if (route.toUpperCase().startsWith('N')) return '#1a1a2e';
  return '#0072bc';
}

// route number -> GTFS route_type taken from the sensor's departures (the services don't deliver the vehicle type).
export function routeTypes(departures: PidDeparture[] | undefined): Map<string, number | null> {
  const types = new Map<string, number | null>();
  for (const departure of departures ?? []) {
    if (!types.has(departure.route) || types.get(departure.route) === null) types.set(departure.route, departure.route_type);
  }
  return types;
}

// Stable key for updating a marker in place between polls.
export function vehicleKey(vehicle: PidVehicle): string {
  return vehicle.trip_id ?? vehicle.vehicle_id ?? `${vehicle.route}:${vehicle.latitude.toFixed(4)},${vehicle.longitude.toFixed(4)}`;
}

export function vehicleTooltip(vehicle: PidVehicle): string {
  const delay = vehicle.delay_min === null ? '' : vehicle.delay_min > 0 ? ` +${vehicle.delay_min}` : vehicle.delay_min < 0 ? ` ${vehicle.delay_min}` : '';
  return `${vehicle.route}${vehicle.headsign ? ` → ${vehicle.headsign}` : ''}${delay}`;
}

// -- vehicles that already passed the stop --------------------------------------------------------------------------------
// The service returns every vehicle of the watched lines going the stop's way, including those that already served the stop and head on to
// the end of the line. A vehicle counts as passed when, measured along the route of its line, it is further than PASSED_MARGIN_M behind the stop.

// A vehicle standing at the platform is still shown; it disappears once it has moved on by more than this.
export const PASSED_MARGIN_M = 40;
// Further from the line than this, the vehicle is probably on another variant of the route (depot run, short turn): can't tell, keep it.
const MAX_VEHICLE_OFF_ROUTE_M = 150;
// The stop must lie on the route; otherwise the position along the route says nothing about it.
const MAX_STOP_OFF_ROUTE_M = 100;
// A loop runs past the stop twice, so "behind the stop" is ambiguous there: such routes are not filtered.
const LOOP_RADIUS_M = 30;
const LOOP_GAP_M = 200;

export interface StopPosition {
  latitude: number;
  longitude: number;
}

interface RouteWithStop {
  line: RouteLine;
  // distance of the stop from the start of the route; undefined when the filter can't be applied to this route
  stopAlong?: number;
}

const shapeKey = (route: string, headsign: string | null): string => `${route}\u0000${headsign ?? ''}`;

function routeWithStop(shape: PidRouteShape, stop: StopPosition): RouteWithStop | undefined {
  if (!shape.coordinates || shape.coordinates.length < 2) return undefined;
  const line = buildRoute(shape.coordinates);
  const position = projectOnRoute(line, stop.longitude, stop.latitude);
  const usable = position !== undefined && position.distance <= MAX_STOP_OFF_ROUTE_M && passesWithin(line, stop.longitude, stop.latitude, LOOP_RADIUS_M, LOOP_GAP_M) <= 1;
  return { line, stopAlong: usable ? position.along : undefined };
}

// `hidden` holds the keys of vehicles hidden earlier: once passed, a vehicle stays hidden for as long as it is in the responses, so GPS noise
// around the margin doesn't make it blink. Returns the vehicles to show and the new set of hidden keys (those still in the response).
export function withoutPassedVehicles(
  vehicles: PidVehicle[],
  shapes: PidRouteShape[],
  stop: StopPosition | undefined,
  hidden: ReadonlySet<string>,
): { visible: PidVehicle[]; hidden: Set<string> } {
  const routes = new Map<string, RouteWithStop>();
  if (stop) {
    for (const shape of shapes) {
      const entry = routeWithStop(shape, stop);
      if (entry) routes.set(shapeKey(shape.route, shape.headsign), entry);
    }
  }
  const visible: PidVehicle[] = [];
  const nowHidden = new Set<string>();
  for (const vehicle of vehicles) {
    const key = vehicleKey(vehicle);
    let passed = hidden.has(key);
    if (!passed && stop && vehicle.headsign !== null) {
      const entry = routes.get(shapeKey(vehicle.route, vehicle.headsign));
      if (entry?.stopAlong !== undefined) {
        const position = projectOnRoute(entry.line, vehicle.longitude, vehicle.latitude);
        passed = position !== undefined && position.distance <= MAX_VEHICLE_OFF_ROUTE_M && position.along - entry.stopAlong > PASSED_MARGIN_M;
      }
    }
    if (passed) nowHidden.add(key);
    else visible.push(vehicle);
  }
  return { visible, hidden: nowHidden };
}

// The vehicle closest to the stop in a straight line (the one that arrives next, among those that haven't passed it yet).
export function nearestVehicle(vehicles: PidVehicle[], stop: StopPosition): PidVehicle | undefined {
  const kx = Math.cos((stop.latitude * Math.PI) / 180);
  const distance = (vehicle: PidVehicle): number => Math.hypot((vehicle.longitude - stop.longitude) * kx, vehicle.latitude - stop.latitude);
  return vehicles.reduce<PidVehicle | undefined>((best, vehicle) => (best === undefined || distance(vehicle) < distance(best) ? vehicle : best), undefined);
}

// The vehicle of `route` that arrives at the stop next: the one on the earliest departure of that line (the sensor's departures carry the
// trip_id of the vehicle); if no departure can be matched to a vehicle, the one closest to the stop, or the first one without a stop position.
export function nextVehicleOfRoute(vehicles: PidVehicle[], route: string, departures: PidDeparture[] | undefined, stop: StopPosition | undefined): PidVehicle | undefined {
  const candidates = vehicles.filter((vehicle) => vehicle.route === route);
  if (candidates.length === 0) return undefined;
  const upcoming = (departures ?? [])
    .filter((departure) => departure.route === route && !departure.canceled && departure.trip_id !== null)
    .map((departure) => ({ tripId: departure.trip_id, time: departureTime(departure)?.getTime() }))
    .filter((entry): entry is { tripId: string | null; time: number } => entry.time !== undefined)
    .sort((a, b) => a.time - b.time);
  for (const entry of upcoming) {
    const match = candidates.find((vehicle) => vehicle.trip_id === entry.tripId);
    if (match) return match;
  }
  return (stop ? nearestVehicle(candidates, stop) : undefined) ?? candidates[0];
}
