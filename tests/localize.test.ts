import { describe, expect, it } from 'vitest';
import setupCustomlocalize from '../src/localize';
import type { HomeAssistant } from 'custom-card-helpers';

function hassWithLanguage(language: string): HomeAssistant {
  return { locale: { language } } as unknown as HomeAssistant;
}

describe('setupCustomlocalize', () => {
  it('translates a known key in the requested language', () => {
    expect(setupCustomlocalize(hassWithLanguage('cs'))('card.refresh')).toBe('Aktualizovat odjezdy');
  });

  it('falls back to English for an unknown language or missing hass', () => {
    expect(setupCustomlocalize(hassWithLanguage('xx'))('card.refresh')).toBe('Refresh departures');
    expect(setupCustomlocalize(undefined)('card.refresh')).toBe('Refresh departures');
  });

  it('returns the key itself when missing from every language', () => {
    expect(setupCustomlocalize(hassWithLanguage('en'))('card.does_not_exist')).toBe('card.does_not_exist');
  });
});
