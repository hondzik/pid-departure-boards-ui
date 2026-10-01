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
}
