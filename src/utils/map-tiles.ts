import type { HomeAssistant } from 'custom-card-helpers';

// Home Assistant's own tile proxy (integration "Map tiles", used by the frontend's map): it serves the OpenStreetMap raster tiles
// through the instance, so the browser never talks to the tile server and the Referer policy of OSM is not an issue (Home Assistant 2026.10+; no fallback to older versions).
const MAP_TILES_PATH = '/api/map_tiles';

// The proxy rotates its token every 30 minutes and keeps two valid; asking every 20 minutes always yields one good for at least 10 more.
export const TOKEN_REFRESH_MS = 20 * 60 * 1000;

// A refused tile means a stale token, but a dashboard full of tiles would ask for a new one per tile.
export const TOKEN_RETRY_THROTTLE_MS = 30 * 1000;

// Leaflet substitutes `{token}` from the layer options on every request, so a rotated token reaches later tiles without a new layer.
export const PROXY_TILE_URL = `${MAP_TILES_PATH}/raster/{z}/{x}/{y}.png?token={token}`;

// OSM has no zoom above 19; Leaflet scales the last level up instead of requesting tiles that do not exist.
export const TILE_MAX_NATIVE_ZOOM = 19;

export async function fetchTileToken(hass: HomeAssistant): Promise<string | undefined> {
  const result = await hass.callWS<{ token?: string }>({ type: 'map_tiles/access_token' });
  return result?.token || undefined;
}

// Absolute URL of the proxy on this instance (concatenated, so `{z}` and `{token}` stay unencoded).
export function proxyTileUrl(origin: string = location.origin): string {
  return `${origin.replace(/\/+$/, '')}${PROXY_TILE_URL}`;
}
