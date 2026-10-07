import { html, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { keyed } from 'lit/directives/keyed.js';
import setupCustomlocalize from '../../localize';
import {
  capacityForRows,
  departureTime,
  effectiveRows,
  formatTime,
  gridRows,
  minutesUntil,
  nextDepartureTime,
  rowLimit,
  routeIcon,
  scheduledTime,
  visibleDepartures,
} from '../../utils/departures';
import { embedMapUrl, hasCoordinates, mapLinkUrl, searchMapUrl } from '../../utils/map';
import { INTEGRATION, refreshScheduler } from '../../utils/refresh-scheduler';
import { PidDeparturesCardStyles } from './pid-departure-boards-ui-departures-styles';
import type { HomeAssistant } from 'custom-card-helpers';
import type { CSSResultGroup, TemplateResult } from 'lit';
import './pid-departure-boards-ui-departures-editor';

const CARD_TAG = 'pid-departure-boards-ui-departures-card';
const DEFAULT_REFRESH_LEAD_MIN = 5;
const INFOTEXT_ROTATE_MS = 5 * 1000;

function isPidEntity(hass: HomeAssistant, entityId: string): boolean {
  return (hass as unknown as HassWithRegistry).entities?.[entityId]?.platform === INTEGRATION;
}

@customElement(CARD_TAG)
export class PidDeparturesCard extends LitElement implements LovelaceCard {
  @property({ attribute: false })
  public hass?: HomeAssistant;

  @state()
  private _config?: PidDeparturesCardConfig;

  @state()
  private _now = new Date();

  @state()
  private _refreshing = false;

  @state()
  private _infotextIndex = 0;

  @state()
  private _mapOpen = false;

  private _unsubscribe?: () => void;

  private _rotateTimer?: number;

  public static styles: CSSResultGroup = PidDeparturesCardStyles;

  public setConfig(config: PidDeparturesCardConfig): void {
    if (!config?.entity) {
      throw new Error(`${CARD_TAG}: "entity" is required`);
    }
    this._config = config;
  }

  // Sections view: occupy exactly the rows of the standard cards next to it (see gridRows).
  public getGridOptions(): { columns: number; min_columns: number; rows: number; min_rows: number } {
    return { columns: 12, min_columns: 6, rows: gridRows(this._rowLimit), min_rows: 2 };
  }

  // Masonry view (50 px units): the same height as in the sections view (row height 56 px, gap 8 px).
  public getCardSize(): number {
    return Math.ceil((this._rows * 64 - 8) / 50);
  }

  // Number of departures the sensor provides (capped by max_departures); the default height of the card.
  private get _rowLimit(): number {
    return rowLimit(this._config?.max_departures, this._attrs?.departures?.length ?? 0);
  }

  // Grid rows the card occupies: the height set on the dashboard (grid_options.rows) wins over the default.
  private get _rows(): number {
    return effectiveRows(this._config?.grid_options?.rows, this._rowLimit);
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement('pid-departure-boards-ui-departures-editor');
  }

  public static getStubConfig(hass: HomeAssistant, entities: string[], entitiesFallback: string[]): PidDeparturesCardConfig {
    const entityId = [...entities, ...entitiesFallback].find((id) => isPidEntity(hass, id));
    if (!entityId) {
      throw new Error(`No ${INTEGRATION} entity available`);
    }
    return { type: `custom:${CARD_TAG}`, entity: entityId };
  }

  public static getEntitySuggestion(hass: HomeAssistant, entityId: string): { label: string; config: PidDeparturesCardConfig } | null {
    return isPidEntity(hass, entityId) ? { label: 'PID Departure Board', config: { type: `custom:${CARD_TAG}`, entity: entityId } } : null;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this._now = new Date();
    this._unsubscribe = refreshScheduler.subscribe({
      entity: () => this._config?.entity,
      hass: () => this.hass,
      nextTime: (now) => nextDepartureTime(this._attrs?.departures ?? [], now),
      leadMin: () => this._config?.refresh_lead_min ?? DEFAULT_REFRESH_LEAD_MIN,
      onTick: (now) => {
        this._now = now;
      },
      onRefreshing: (refreshing) => {
        this._refreshing = refreshing;
      },
    });
    this._rotateTimer = window.setInterval(() => {
      if ((this._attrs?.infotexts?.length ?? 0) > 1) this._infotextIndex += 1;
    }, INFOTEXT_ROTATE_MS);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this._unsubscribe?.();
    this._unsubscribe = undefined;
    window.clearInterval(this._rotateTimer);
    this._rotateTimer = undefined;
  }

  private get _attrs(): PidSensorAttributes | undefined {
    if (!this.hass || !this._config) return undefined;
    return this.hass.states[this._config.entity]?.attributes as PidSensorAttributes | undefined;
  }

  private _refresh(): void {
    if (this.hass && this._config) void refreshScheduler.refresh(this.hass, this._config.entity);
  }

  private _openMap = (): void => {
    this._mapOpen = true;
  };

  private _closeMap = (): void => {
    this._mapOpen = false;
  };

  private _onTitleKey = (ev: KeyboardEvent): void => {
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      this._openMap();
    }
  };

  protected render(): TemplateResult {
    const localize = setupCustomlocalize(this.hass);
    if (!this._config || !this.hass) return html``;

    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`<ha-card><div class="empty">${localize('card.no_entity')}</div></ha-card>`;
    }
    const attrs = stateObj.attributes as unknown as PidSensorAttributes;
    const unavailable = stateObj.state === 'unavailable';
    const rows = this._rows;
    const limit = Math.min(capacityForRows(rows), this._config.max_departures && this._config.max_departures > 0 ? this._config.max_departures : Infinity);
    const departures = visibleDepartures(attrs.departures ?? [], this._now, limit);
    const title = this._config.title || attrs.stop_name || attrs.friendly_name || '';
    const infotexts = attrs.infotexts ?? [];
    const infotextIndex = infotexts.length > 0 ? this._infotextIndex % infotexts.length : 0;
    const infotext = infotexts[infotextIndex];

    return html`
      <ha-card style="--pid-units: ${rows - 1}">
        <div class="header">
          <div class="heading">
            <div class="title-line">
              <span class="stop-name" role="button" tabindex="0" title=${localize('card.show_map')} @click=${this._openMap} @keydown=${this._onTitleKey}>${title}</span>
              ${attrs.platform ? html`<span class="platform">${attrs.platform}</span>` : nothing}
            </div>
            ${
              infotext
                ? keyed(
                    infotextIndex,
                    html`<div class="infotext" title=${infotext.text}>
                      ${infotexts.length > 1 ? html`<span class="counter">${infotextIndex + 1}/${infotexts.length}</span> ` : nothing}${infotext.text}
                    </div>`,
                  )
                : nothing
            }
          </div>
          <ha-icon-button class="refresh ${this._refreshing ? 'spinning' : ''}" .label=${localize('card.refresh')} @click=${() => this._refresh()}>
            <ha-icon icon="mdi:refresh"></ha-icon>
          </ha-icon-button>
        </div>
        <div class="body">
          ${
            unavailable
              ? html`<div class="empty">${localize('card.unavailable')}</div>`
              : departures.length === 0
                ? html`<div class="empty">${localize('card.no_departures')}</div>`
                : html`<table>
                    ${departures.map((departure) => this._renderDeparture(departure, localize))}
                  </table>`
          }
        </div>
      </ha-card>
      ${this._mapOpen ? this._renderMap(attrs, title, localize) : nothing}
    `;
  }

  private _renderMap(attrs: PidSensorAttributes, title: string, localize: (key: string) => string): TemplateResult {
    const coordinates = hasCoordinates(attrs) ? attrs : undefined;
    const src = coordinates ? embedMapUrl(coordinates.latitude, coordinates.longitude) : searchMapUrl(attrs.stop_name || title);
    return html`
      <ha-dialog open .heading=${attrs.platform ? `${title} ${attrs.platform}` : title} @closed=${this._closeMap}>
        <iframe class="map" src=${src} loading="lazy" referrerpolicy="no-referrer" title=${title}></iframe>
        ${coordinates ? html`<a class="map-link" href=${mapLinkUrl(coordinates.latitude, coordinates.longitude)} target="_blank" rel="noopener noreferrer">${localize('card.open_in_osm')}</a>` : nothing}
        <ha-button slot="primaryAction" @click=${this._closeMap}>${localize('card.close')}</ha-button>
      </ha-dialog>
    `;
  }

  private _renderDeparture(departure: PidDeparture, localize: (key: string) => string): TemplateResult {
    const config = this._config as PidDeparturesCardConfig;
    const mode = config.time_display ?? 'both';
    const time = departureTime(departure);
    const language = this.hass?.locale?.language ?? 'en';
    const minutes = time ? minutesUntil(time, this._now) : undefined;

    const countdown = minutes === undefined ? '' : minutes <= 0 ? localize('card.now') : `${minutes} ${localize('card.min')}`;
    const timetable = scheduledTime(departure);
    const clock = timetable ? formatTime(timetable, language, this.hass?.config?.time_zone) : '';
    const wheelchairColumn = config.show_wheelchair ?? true;
    const airConditionedColumn = config.show_air_conditioned ?? true;
    const note = departure.canceled ? localize('card.canceled') : '';
    const atStop = departure.at_stop && !departure.canceled;

    return html`
      <tr class=${departure.canceled ? 'canceled' : atStop ? 'at-stop' : ''} title=${atStop ? localize('card.at_stop') : nothing}>
        <td class="icon"><ha-icon icon=${routeIcon(departure.route_type)}></ha-icon></td>
        <td class="line">${departure.route}</td>
        <td class="headsign">${departure.headsign ?? ''}${note ? html` <span class="state">${note}</span>` : nothing}</td>
        ${mode !== 'time' ? html`<td class="countdown">${countdown}</td>` : nothing} ${mode !== 'countdown' ? html`<td class="time">${clock}</td>` : nothing}
        <td class="delay">${(departure.delay_min ?? 0) > 0 ? `+${departure.delay_min}` : ''}</td>
        ${wheelchairColumn ? html`<td class="feature">${departure.wheelchair ? html`<ha-icon icon="mdi:wheelchair" .title=${localize('card.wheelchair')}></ha-icon>` : nothing}</td>` : nothing}
        ${airConditionedColumn ? html`<td class="feature">${departure.air_conditioned ? html`<ha-icon icon="mdi:snowflake" .title=${localize('card.air_conditioned')}></ha-icon>` : nothing}</td>` : nothing}
      </tr>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [CARD_TAG]: PidDeparturesCard;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: CARD_TAG,
  name: 'PID Departure Board',
  description: 'Departure board for a PID stop (pid_departure_boards integration)',
  preview: false,
  // suggested in the "add card" dialog after picking an entity (getStubConfig only serves the "all cards" list)
  getEntitySuggestion: (hass, entityId) => PidDeparturesCard.getEntitySuggestion(hass, entityId),
});
