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
