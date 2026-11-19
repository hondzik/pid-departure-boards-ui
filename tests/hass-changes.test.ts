import { describe, expect, it } from 'vitest';
import { hassAffectsCard } from '../src/utils/hass-changes';
import type { HomeAssistant } from 'custom-card-helpers';

const ENTITY = 'sensor.stop';
const locale = { language: 'cs' };
const themes = { themes: {} };
const sensor = { entity_id: ENTITY, state: '2026-10-06T11:18:08+00:00', attributes: {} };

function hass(patch: Record<string, unknown> = {}): HomeAssistant {
  return { states: { [ENTITY]: sensor, 'light.kitchen': { state: 'on' } }, locale, language: 'cs', config: { time_zone: 'Europe/Prague' }, themes, ...patch } as unknown as HomeAssistant;
}

describe('hassAffectsCard', () => {
  it('ignores state changes of other entities', () => {
    const previous = hass();
    const next = hass({ states: { ...previous.states, 'light.kitchen': { state: 'off' } } });
    expect(hassAffectsCard(previous, next, ENTITY)).toBe(false);
  });

  it('reacts to a new state of the card sensor, also when it appears or disappears', () => {
    const previous = hass();
    expect(hassAffectsCard(previous, hass({ states: { ...previous.states, [ENTITY]: { ...sensor, state: 'unavailable' } } }), ENTITY)).toBe(true);
    expect(hassAffectsCard(previous, hass({ states: { 'light.kitchen': previous.states['light.kitchen'] } }), ENTITY)).toBe(true);
    expect(hassAffectsCard(hass({ states: {} }), previous, ENTITY)).toBe(true);
  });

  it('reacts to a changed language, time format, time zone or theme', () => {
    const previous = hass();
    expect(hassAffectsCard(previous, hass({ locale: { language: 'cs', time_format: '12' } }), ENTITY)).toBe(true);
    expect(hassAffectsCard(previous, hass({ language: 'en' }), ENTITY)).toBe(true);
    expect(hassAffectsCard(previous, hass({ config: { time_zone: 'UTC' } }), ENTITY)).toBe(true);
    expect(hassAffectsCard(previous, hass({ themes: { themes: {}, darkMode: true } }), ENTITY)).toBe(true);
  });

  it('is false for an identical set of the used parts (copy of hass)', () => {
    expect(hassAffectsCard(hass(), hass(), ENTITY)).toBe(false);
  });
});
