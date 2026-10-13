import { describe, expect, it, vi } from 'vitest';
import { fetchTileToken, PROXY_TILE_URL, proxyTileUrl } from '../src/utils/map-tiles';
import type { HomeAssistant } from 'custom-card-helpers';

describe('map tiles proxy', () => {
  it('asks HA for the access token over the websocket', async () => {
    const callWS = vi.fn().mockResolvedValue({ token: 'abc' });
    expect(await fetchTileToken({ callWS } as unknown as HomeAssistant)).toBe('abc');
    expect(callWS).toHaveBeenCalledWith({ type: 'map_tiles/access_token' });
  });

  it('returns no token when the answer has none', async () => {
    const callWS = vi.fn().mockResolvedValue({});
    expect(await fetchTileToken({ callWS } as unknown as HomeAssistant)).toBeUndefined();
    expect(await fetchTileToken({ callWS: vi.fn().mockResolvedValue(undefined) } as unknown as HomeAssistant)).toBeUndefined();
  });

  it('builds the proxy URL on the instance, keeping the template placeholders', () => {
    expect(PROXY_TILE_URL).toBe('/api/map_tiles/raster/{z}/{x}/{y}.png?token={token}');
    expect(proxyTileUrl('http://192.168.1.10:8123')).toBe('http://192.168.1.10:8123/api/map_tiles/raster/{z}/{x}/{y}.png?token={token}');
    expect(proxyTileUrl('https://ha.example.com/')).toBe('https://ha.example.com/api/map_tiles/raster/{z}/{x}/{y}.png?token={token}');
  });
});
