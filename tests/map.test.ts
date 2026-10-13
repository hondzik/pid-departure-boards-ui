import { describe, expect, it } from 'vitest';
import { hasCoordinates, isDarkMode, mapLinkUrl } from '../src/utils/map';

describe('map utils', () => {
  it('links to the full OpenStreetMap view of the stop', () => {
    expect(mapLinkUrl(50.0452, 14.4017)).toBe('https://www.openstreetmap.org/?mlat=50.045200&mlon=14.401700#map=18/50.045200/14.401700');
  });

  it('recognizes usable coordinates only', () => {
    expect(hasCoordinates({ latitude: 50, longitude: 14 })).toBe(true);
    expect(hasCoordinates({ latitude: 50 })).toBe(false);
    expect(hasCoordinates({ latitude: '50', longitude: '14' })).toBe(false);
    expect(hasCoordinates({ latitude: NaN, longitude: 14 })).toBe(false);
    expect(hasCoordinates(undefined)).toBe(false);
  });

  it('detects the dark theme from HA, falling back to the browser preference', () => {
    expect(isDarkMode({ themes: { darkMode: true } }, () => false)).toBe(true);
    expect(isDarkMode({ themes: { darkMode: false } }, () => true)).toBe(false);
    expect(isDarkMode({ themes: {} }, () => true)).toBe(true);
    expect(isDarkMode(undefined, () => false)).toBe(false);
  });
});
