import { describe, expect, it } from 'vitest';
import { embedMapUrl, hasCoordinates, mapLinkUrl, searchMapUrl } from '../src/utils/map';

describe('map urls', () => {
  it('builds an OpenStreetMap embed centered on the stop', () => {
    const url = embedMapUrl(50.0452, 14.4017);
    expect(url).toContain('openstreetmap.org/export/embed.html');
    expect(url).toContain('marker=50.045200,14.401700');
    expect(url).toContain('bbox=14.398700,50.043700,14.404700,50.046700');
  });

  it('links to the full map and searches by name without coordinates', () => {
    expect(mapLinkUrl(50.0452, 14.4017)).toBe('https://www.openstreetmap.org/?mlat=50.045200&mlon=14.401700#map=18/50.045200/14.401700');
    expect(searchMapUrl('Smíchovské nádraží')).toBe('https://maps.google.com/maps?q=Sm%C3%ADchovsk%C3%A9%20n%C3%A1dra%C5%BE%C3%AD%20zast%C3%A1vka&output=embed');
  });

  it('recognizes usable coordinates only', () => {
    expect(hasCoordinates({ latitude: 50, longitude: 14 })).toBe(true);
    expect(hasCoordinates({ latitude: 50 })).toBe(false);
    expect(hasCoordinates({ latitude: '50', longitude: '14' })).toBe(false);
    expect(hasCoordinates({ latitude: NaN, longitude: 14 })).toBe(false);
    expect(hasCoordinates(undefined)).toBe(false);
  });
});
