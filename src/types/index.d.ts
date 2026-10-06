import type { HomeAssistant } from 'custom-card-helpers';

export {};

declare global {
  interface Window {
    customCards: CustomCard[];
  }

  interface CustomCard {
    type: string;
    name: string;
    description: string;
    preview?: boolean;
    documentationURL?: string;
  }

  // Minimal shape of the entity/device registry display data the frontend
  // attaches to hass (missing from custom-card-helpers' types). This is the
  // lightweight display registry, not the full entity_registry/device_registry
  // records — it does NOT carry config_entry_id on the entity itself, only
  // device_id; config_entry_id has to be resolved via the device instead.
  interface EntityRegistryDisplayEntry {
    entity_id: string;
    platform?: string;
    device_id?: string;
    name?: string;
  }

  interface DeviceRegistryDisplayEntry {
    id: string;
    name?: string;
    name_by_user?: string;
    config_entries?: string[];
  }

  type HassWithRegistry = HomeAssistant & {
    entities?: Record<string, EntityRegistryDisplayEntry>;
    devices?: Record<string, DeviceRegistryDisplayEntry>;
  };

  interface LovelaceCardConfig {
    type: string;
    [key: string]: unknown;
  }

  interface LovelaceCard extends HTMLElement {
    hass?: HomeAssistant;
    setConfig(config: LovelaceCardConfig): void;
    getCardSize?(): number | Promise<number>;
  }

  // -- sensor.<stop> of the pid_departure_boards integration ----------------

  interface PidDeparture {
    route: string;
    route_type: number | null;
    headsign: string | null;
    platform: string | null;
    scheduled: string | null;
    predicted: string | null;
    delay_min: number | null;
    wheelchair: boolean | null;
    air_conditioned: boolean | null;
    is_night: boolean;
    is_regional: boolean;
    is_substitute: boolean;
    canceled: boolean;
    at_stop: boolean;
    trip_id: string | null;
    last_stop: string | null;
  }

  interface PidInfotext {
    text: string;
    valid_from: string | null;
    valid_to: string | null;
    display_type: string | null;
  }

  interface PidSensorAttributes {
    stop_id: string;
    stop_name: string | null;
    platform: string | null;
    departures: PidDeparture[];
    infotexts: PidInfotext[];
    friendly_name?: string;
  }

  // -- card config -----------------------------------------------------------

  type PidTimeDisplay = 'time' | 'countdown' | 'both';

  type PidDeparturesCardConfig = LovelaceCardConfig & {
    entity: string;
    title?: string;
    show_wheelchair?: boolean;
    show_air_conditioned?: boolean;
    time_display?: PidTimeDisplay;
    // refresh the sensor this many minutes before the next departure (then every minute); 0 = never
    refresh_lead_min?: number;
    max_departures?: number;
  };
}
