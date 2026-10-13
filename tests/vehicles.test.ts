import { describe, expect, it, vi } from 'vitest';
import { fetchRouteShapes, fetchVehicles, routeColor, routeTypes, toLatLngs, vehicleKey, vehicleTooltip } from '../src/utils/vehicles';
import type { PidVehicle } from '../src/utils/vehicles';
import type { HomeAssistant } from 'custom-card-helpers';

// payloads shaped like the examples in the integration's service documentation
const SHAPES = {
  stop_id: 'U1040Z1P',
  routes: [
    {
      route: '20',
      headsign: 'Dědina',
      shape_id: 'L20V2',
      coordinates: [
        [14.38948, 50.05902],
        [14.3911, 50.0602],
      ],
    },
    { route: 'N91', headsign: null, shape_id: null, coordinates: null },
  ],
};

const VEHICLES = {
  stop_id: 'U1040Z1P',
  updated: '2026-10-13T13:50:41.123456+00:00',
  vehicles: [
    { vehicle_id: '8177', route: '20', trip_id: '20_18058_261005', headsign: 'Dědina', latitude: 50.0719, longitude: 14.4036, bearing: 84, delay_min: 1, state: 'at_stop', canceled: false },
    { vehicle_id: null, route: '20', trip_id: null, headsign: null, latitude: Number.NaN, longitude: 14.4, bearing: null, delay_min: null, state: null, canceled: false },
  ],
  routes_without_reference: ['N91'],
};

function hassReturning(response: unknown) {
  const callWS = vi.fn().mockResolvedValue({ context: {}, response });
  return { hass: { callWS } as unknown as HomeAssistant, callWS };
}

describe('service calls', () => {
  it('asks for route shapes with a response and drops lines without a trace', async () => {
    const { hass, callWS } = hassReturning(SHAPES);
    const shapes = await fetchRouteShapes(hass, 'sensor.x');
    expect(callWS).toHaveBeenCalledWith({ type: 'call_service', domain: 'pid_departure_boards', service: 'get_route_shapes', service_data: { entity_id: 'sensor.x' }, return_response: true });
    expect(shapes.map((shape) => shape.route)).toEqual(['20']);
  });

  it('asks for vehicle positions and drops entries without a position', async () => {
    const { hass, callWS } = hassReturning(VEHICLES);
    const result = await fetchVehicles(hass, 'sensor.x');
    expect(callWS.mock.calls[0][0].service).toBe('get_vehicle_positions');
    expect(result.vehicles).toHaveLength(1);
    expect(result.updated).toBe(VEHICLES.updated);
    expect(result.routes_without_reference).toEqual(['N91']);
  });

  it('copes with empty responses', async () => {
    const { hass } = hassReturning(undefined);
    expect(await fetchRouteShapes(hass, 'sensor.x')).toEqual([]);
    expect(await fetchVehicles(hass, 'sensor.x')).toEqual({ updated: undefined, vehicles: [], routes_without_reference: [] });
  });
});

describe('toLatLngs', () => {
  it('swaps [lon, lat] to [lat, lon]', () => {
    expect(toLatLngs([[14.38948, 50.05902]])).toEqual([[50.05902, 14.38948]]);
  });
});

describe('routeColor / routeTypes', () => {
  it('colors by vehicle type, metro by line, night lines dark', () => {
    expect(routeColor('20', 0)).toBe('#c8102e');
    expect(routeColor('136', 3)).toBe('#0072bc');
    expect(routeColor('A', 1)).toBe('#00a651');
    expect(routeColor('X', 1)).toBe('#555555');
    expect(routeColor('N91', null)).toBe('#1a1a2e');
    expect(routeColor('S9', 2)).toBe('#6a2c91');
    expect(routeColor('7', 11)).toBe('#00843d');
    expect(routeColor('P1', 4)).toBe('#0099b0');
  });

  it('collects the route type per line from the departures, preferring a known one', () => {
    const departure = (route: string, route_type: number | null) => ({ route, route_type }) as PidDeparture;
    const types = routeTypes([departure('20', null), departure('20', 0), departure('136', 3)]);
    expect(types.get('20')).toBe(0);
    expect(types.get('136')).toBe(3);
    expect(routeTypes(undefined).size).toBe(0);
  });
});

describe('vehicle helpers', () => {
  const vehicle = (patch: Partial<PidVehicle>): PidVehicle => ({ ...(VEHICLES.vehicles[0] as PidVehicle), ...patch });

  it('keys markers by trip, then vehicle, then position', () => {
    expect(vehicleKey(vehicle({}))).toBe('20_18058_261005');
    expect(vehicleKey(vehicle({ trip_id: null }))).toBe('8177');
    expect(vehicleKey(vehicle({ trip_id: null, vehicle_id: null }))).toBe('20:50.0719,14.4036');
  });

  it('describes the vehicle for the tooltip', () => {
    expect(vehicleTooltip(vehicle({}))).toBe('20 → Dědina +1');
    expect(vehicleTooltip(vehicle({ delay_min: 0, headsign: null }))).toBe('20');
    expect(vehicleTooltip(vehicle({ delay_min: -2 }))).toBe('20 → Dědina -2');
    expect(vehicleTooltip(vehicle({ delay_min: null }))).toBe('20 → Dědina');
  });
});
