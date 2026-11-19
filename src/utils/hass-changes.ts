import type { HomeAssistant } from 'custom-card-helpers';

// Home Assistant assigns a new `hass` object on every state change anywhere in the instance. The card only draws from a few parts of it:
// the state of its sensor, the language and time format, the time zone and the theme (dark map). Everything else can't change what it shows.
export function hassAffectsCard(previous: HomeAssistant, next: HomeAssistant, entity: string): boolean {
  return (
    previous.states[entity] !== next.states[entity] ||
    previous.locale !== next.locale ||
    previous.language !== next.language ||
    previous.config?.time_zone !== next.config?.time_zone ||
    previous.themes !== next.themes
  );
}
