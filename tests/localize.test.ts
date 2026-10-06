import en from '../src/translations/en.json';
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

  it('resolves regional and aliased language codes', () => {
    expect(setupCustomlocalize(hassWithLanguage('cs-CZ'))('card.refresh')).toBe('Aktualizovat odjezdy');
    expect(setupCustomlocalize(hassWithLanguage('nb'))('card.refresh')).toBe(setupCustomlocalize(hassWithLanguage('no'))('card.refresh'));
  });
});

const LANGUAGES = ['cs', 'de', 'es', 'fr', 'he', 'hu', 'it', 'ja', 'nl', 'no', 'pl', 'pt', 'sk', 'sv', 'uk', 'zh'];

describe('translation files', () => {
  const keys = (obj: Record<string, Record<string, string>>) => Object.entries(obj).flatMap(([group, entries]) => Object.keys(entries).map((key) => `${group}.${key}`));

  it.each(LANGUAGES)('%s has exactly the keys of en and no empty values', async (lang) => {
    const translation = (await import(`../src/translations/${lang}.json`)).default as Record<string, Record<string, string>>;
    expect(keys(translation).sort()).toEqual(keys(en).sort());
    expect(Object.values(translation).flatMap((group) => Object.values(group)).every((value) => value.trim().length > 0)).toBe(true);
  });
});
