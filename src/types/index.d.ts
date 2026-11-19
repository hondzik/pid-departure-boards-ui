import type { HomeAssistant, LovelaceCardConfig } from 'custom-card-helpers';

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
    getEntitySuggestion?: (hass: HomeAssistant, entityId: string) => { label?: string; config: LovelaceCardConfig } | null;
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
    // stop position, used for the map popup (optional)
    latitude?: number;
    longitude?: number;
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
    // set by the dashboard when the card is resized (sections view)
    grid_options?: { rows?: number | 'auto'; columns?: number | 'full' };
  };
}
