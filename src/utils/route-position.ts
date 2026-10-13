// Position of a point along a route line: the line is flattened into a local plane (meters), like the integration does in its geometry module.
const METERS_PER_DEG_LAT = 110540;
const METERS_PER_DEG_LON_EQUATOR = 111320;

export type LonLat = [number, number];

export interface RouteLine {
  lon0: number;
  lat0: number;
  kx: number;
  // [x, y] in meters from the first point of the line
  points: [number, number][];
  // distance along the line (m) at every point
  cumulative: number[];
}

export interface RoutePosition {
  // distance from the start of the route to the closest point on the line (m)
  along: number;
  // distance of the point from the line (m)
  distance: number;
}

export function buildRoute(coordinates: LonLat[]): RouteLine {
  const [lon0, lat0] = coordinates[0];
  const kx = METERS_PER_DEG_LON_EQUATOR * Math.cos((lat0 * Math.PI) / 180);
  const points = coordinates.map(([lon, lat]): [number, number] => [(lon - lon0) * kx, (lat - lat0) * METERS_PER_DEG_LAT]);
  const cumulative = [0];
  for (let i = 1; i < points.length; i += 1) {
    cumulative.push(cumulative[i - 1] + Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]));
  }
  return { lon0, lat0, kx, points, cumulative };
}

function toPlane(route: RouteLine, lon: number, lat: number): [number, number] {
  return [(lon - route.lon0) * route.kx, (lat - route.lat0) * METERS_PER_DEG_LAT];
}

// Closest point of every segment: its distance from the query point and where along the route it lies.
function segmentHits(route: RouteLine, lon: number, lat: number): RoutePosition[] {
  const [px, py] = toPlane(route, lon, lat);
  const hits: RoutePosition[] = [];
  for (let i = 1; i < route.points.length; i += 1) {
    const [ax, ay] = route.points[i - 1];
    const [bx, by] = route.points[i];
    const dx = bx - ax;
    const dy = by - ay;
    const lengthSquared = dx * dx + dy * dy;
    const t = lengthSquared === 0 ? 0 : Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / lengthSquared));
    hits.push({
      along: route.cumulative[i - 1] + t * Math.sqrt(lengthSquared),
      distance: Math.hypot(px - (ax + t * dx), py - (ay + t * dy)),
    });
  }
  return hits;
}

// The closest point of the whole route.
export function projectOnRoute(route: RouteLine, lon: number, lat: number): RoutePosition | undefined {
  let best: RoutePosition | undefined;
  for (const hit of segmentHits(route, lon, lat)) {
    if (!best || hit.distance < best.distance) best = hit;
  }
  return best;
}

// How many separate stretches of the route run within `radius` of the point (a loop passes the same stop twice).
// Stretches closer together than `gap` along the route count as one.
export function passesWithin(route: RouteLine, lon: number, lat: number, radius: number, gap: number): number {
  const alongs = segmentHits(route, lon, lat)
    .filter((hit) => hit.distance <= radius)
    .map((hit) => hit.along)
    .sort((a, b) => a - b);
  let passes = 0;
  let last = -Infinity;
  for (const along of alongs) {
    if (along - last > gap) passes += 1;
    last = along;
  }
  return passes;
}

// The point `along` meters from the start of the route (clamped to the route).
export function pointAtDistance(route: RouteLine, along: number): LonLat {
  const last = route.points.length - 1;
  const target = Math.max(0, Math.min(along, route.cumulative[last]));
  let i = 1;
  while (i < last && route.cumulative[i] < target) i += 1;
  const span = route.cumulative[i] - route.cumulative[i - 1];
  const t = span === 0 ? 0 : (target - route.cumulative[i - 1]) / span;
  const x = route.points[i - 1][0] + t * (route.points[i][0] - route.points[i - 1][0]);
  const y = route.points[i - 1][1] + t * (route.points[i][1] - route.points[i - 1][1]);
  return [route.lon0 + x / route.kx, route.lat0 + y / METERS_PER_DEG_LAT];
}
