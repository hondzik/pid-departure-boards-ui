import { describe, expect, it } from 'vitest';
import coordinates from './fixtures/shape_L20V2_coordinates.json';
import { buildRoute, passesWithin, pointAtDistance, projectOnRoute } from '../src/utils/route-position';
import { nearestVehicle, nextVehicleOfRoute, PASSED_MARGIN_M, vehicleKey, withoutPassedVehicles } from '../src/utils/vehicles';
import type { LonLat } from '../src/utils/route-position';
import type { PidRouteShape, PidVehicle } from '../src/utils/vehicles';

// real route of line 20 (shape L20V2) and the stop Anděl A on it
const ROUTE = coordinates as LonLat[];
const STOP = { latitude: 50.07193, longitude: 14.403631 };
const SHAPE: PidRouteShape = { route: '20', headsign: 'Dědina', shape_id: 'L20V2', coordinates: ROUTE };
const LINE = buildRoute(ROUTE);
const STOP_ALONG = (projectOnRoute(LINE, STOP.longitude, STOP.latitude) as { along: number }).along;

function vehicleAt(along: number, patch: Partial<PidVehicle> = {}): PidVehicle {
  const [longitude, latitude] = pointAtDistance(LINE, along);
  return { vehicle_id: `v${Math.round(along)}`, route: '20', trip_id: `trip-${Math.round(along)}`, headsign: 'Dědina', latitude, longitude, bearing: null, delay_min: 0, state: 'on_track', canceled: false, ...patch };
}

const run = (vehicles: PidVehicle[], hidden: Set<string> = new Set(), shapes: PidRouteShape[] = [SHAPE], stop: typeof STOP | null = STOP) => withoutPassedVehicles(vehicles, shapes, stop ?? undefined, hidden);

describe('route geometry', () => {
  it('finds the stop on the real route', () => {
    const position = projectOnRoute(LINE, STOP.longitude, STOP.latitude);
    expect(position?.distance).toBeLessThan(30);
    expect(STOP_ALONG).toBeGreaterThan(500);
    expect(STOP_ALONG).toBeLessThan(LINE.cumulative[LINE.cumulative.length - 1]);
  });

  it('measures distances along the route, in both directions', () => {
    const [lon, lat] = pointAtDistance(LINE, STOP_ALONG + 300);
    const position = projectOnRoute(LINE, lon, lat);
    expect(position?.along).toBeCloseTo(STOP_ALONG + 300, 0);
    expect(position?.distance).toBeLessThan(1);
    expect(pointAtDistance(LINE, -50)).toEqual(ROUTE[0]);
    expect(pointAtDistance(LINE, 1e9)).toEqual(ROUTE[ROUTE.length - 1]);
  });

  it('counts a single pass on the route and two on a loop', () => {
    expect(passesWithin(LINE, STOP.longitude, STOP.latitude, 30, 200)).toBe(1);
    expect(passesWithin(buildRoute([...ROUTE, ...ROUTE]), STOP.longitude, STOP.latitude, 30, 200)).toBe(2);
    expect(passesWithin(LINE, 15, 51, 30, 200)).toBe(0);
  });
});

describe('withoutPassedVehicles', () => {
  it('keeps vehicles before the stop and at the platform, hides those that have moved on', () => {
    const before = vehicleAt(STOP_ALONG - 300);
    const atStop = vehicleAt(STOP_ALONG + 5, { state: 'at_stop' });
    const justAfter = vehicleAt(STOP_ALONG + PASSED_MARGIN_M - 10);
    const after = vehicleAt(STOP_ALONG + 300);
    const far = vehicleAt(STOP_ALONG + 4000);
    const { visible, hidden } = run([before, atStop, justAfter, after, far]);
    expect(visible).toEqual([before, atStop, justAfter]);
    expect([...hidden]).toEqual([vehicleKey(after), vehicleKey(far)]);
  });

  it('keeps a hidden vehicle hidden when GPS noise moves it back, and forgets it once it leaves the response', () => {
    const after = vehicleAt(STOP_ALONG + 100);
    const hidden = run([after]).hidden;
    const jitter = vehicleAt(STOP_ALONG + 20, { trip_id: after.trip_id });
    expect(run([jitter], hidden).visible).toEqual([]);
    expect(run([], hidden).hidden.size).toBe(0);
    expect(run([jitter], run([], hidden).hidden).visible).toEqual([jitter]);
  });

  it('keeps vehicles it cannot judge', () => {
    const after = vehicleAt(STOP_ALONG + 500);
    expect(run([after], new Set(), [SHAPE], null).visible).toEqual([after]); // stop without coordinates
    expect(run([after], new Set(), []).visible).toEqual([after]); // no route of the line
    expect(run([after], new Set(), [{ ...SHAPE, coordinates: null }]).visible).toEqual([after]);
    expect(run([vehicleAt(STOP_ALONG + 500, { headsign: 'Jinam' })]).visible).toHaveLength(1); // another destination than the route
    expect(run([vehicleAt(STOP_ALONG + 500, { headsign: null })]).visible).toHaveLength(1);
    expect(run([after], new Set(), [{ ...SHAPE, coordinates: [ROUTE[0]] }]).visible).toEqual([after]);
  });

  it('keeps a vehicle far from the route (another variant) and a stop that is not on the route', () => {
    const offRoute = vehicleAt(STOP_ALONG + 500, { latitude: 50.0755 + 0.0045, longitude: 14.43 });
    expect(run([offRoute]).visible).toEqual([offRoute]);
    expect(run([vehicleAt(STOP_ALONG + 500)], new Set(), [SHAPE], { latitude: 50.2, longitude: 14.6 }).visible).toHaveLength(1);
  });

  it('does not filter a loop that passes the stop twice', () => {
    const loop: PidRouteShape = { ...SHAPE, coordinates: [...ROUTE, ...ROUTE] };
    const loopLine = buildRoute(loop.coordinates as LonLat[]);
    const [longitude, latitude] = pointAtDistance(loopLine, STOP_ALONG + 600);
    const vehicle = vehicleAt(0, { latitude, longitude });
    expect(run([vehicle], new Set(), [loop]).visible).toEqual([vehicle]);
  });
});

describe('nearestVehicle', () => {
  it('picks the vehicle closest to the stop', () => {
    const far = vehicleAt(STOP_ALONG - 3000);
    const near = vehicleAt(STOP_ALONG - 200);
    const middle = vehicleAt(STOP_ALONG - 900);
    expect(nearestVehicle([far, near, middle], STOP)).toBe(near);
    expect(nearestVehicle([far, middle], STOP)).toBe(middle);
  });

  it('has no answer without vehicles', () => {
    expect(nearestVehicle([], STOP)).toBeUndefined();
  });
});

describe('nextVehicleOfRoute', () => {
  const at = (minutes: number) => new Date(Date.parse('2026-10-14T10:00:00+02:00') + minutes * 60000).toISOString();
  const departure = (trip_id: string | null, minutes: number, patch: Partial<PidDeparture> = {}): PidDeparture =>
    ({ route: '20', trip_id, predicted: at(minutes), scheduled: at(minutes), canceled: false, ...patch }) as PidDeparture;
  const near = vehicleAt(STOP_ALONG - 200, { trip_id: 'near' });
  const far = vehicleAt(STOP_ALONG - 2000, { trip_id: 'far' });
  const other = vehicleAt(STOP_ALONG - 50, { route: '9', trip_id: 'other' });

  it('prefers the vehicle on the earliest departure of the line', () => {
    // the sensor lists the farther vehicle first (e.g. the nearer one is delayed less/more than expected): the earliest departure wins
    expect(nextVehicleOfRoute([near, far, other], '20', [departure('near', 5), departure('far', 2)], STOP)).toBe(far);
    expect(nextVehicleOfRoute([near, far, other], '20', [departure('far', 9), departure('near', 3)], STOP)).toBe(near);
  });

  it('skips canceled departures and departures without a matching vehicle', () => {
    const departures = [departure('gone', 1), departure('far', 2, { canceled: true }), departure(null, 3), departure('near', 4)];
    expect(nextVehicleOfRoute([near, far], '20', departures, STOP)).toBe(near);
  });

  it('falls back to the vehicle nearest to the stop, or the first one without a stop position', () => {
    expect(nextVehicleOfRoute([far, near], '20', [], STOP)).toBe(near);
    expect(nextVehicleOfRoute([far, near], '20', undefined, STOP)).toBe(near);
    expect(nextVehicleOfRoute([far, near], '20', [], undefined)).toBe(far);
  });

  it('has no answer for a line without vehicles', () => {
    expect(nextVehicleOfRoute([near, far], '136', [], STOP)).toBeUndefined();
  });
});
