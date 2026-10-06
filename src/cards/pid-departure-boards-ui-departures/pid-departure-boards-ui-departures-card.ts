import { html, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import setupCustomlocalize from '../../localize';
import { departureTime, formatTime, minutesUntil, nextDepartureTime, routeIcon, scheduledTime, visibleDepartures } from '../../utils/departures';
import { INTEGRATION, refreshScheduler } from '../../utils/refresh-scheduler';
import { PidDeparturesCardStyles } from './pid-departure-boards-ui-departures-styles';
import type { HomeAssistant } from 'custom-card-helpers';
import type { CSSResultGroup, TemplateResult } from 'lit';
import './pid-departure-boards-ui-departures-editor';

const CARD_TAG = 'pid-departure-boards-ui-departures-card';
const DEFAULT_REFRESH_LEAD_MIN = 5;

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

  private _unsubscribe?: () => void;

  public static styles: CSSResultGroup = PidDeparturesCardStyles;

  public setConfig(config: PidDeparturesCardConfig): void {
    if (!config?.entity) {
      throw new Error(`${CARD_TAG}: "entity" is required`);
    }
    this._config = config;
  }

  public getCardSize(): number {
    return 1 + (this._config?.max_departures ?? 5);
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement('pid-departure-boards-ui-departures-editor');
  }

  public static getStubConfig(hass: HomeAssistant, entities: string[], entitiesFallback: string[]): PidDeparturesCardConfig {
    const registry = hass as unknown as HassWithRegistry;
    const entityId = [...entities, ...entitiesFallback].find((id) => registry.entities?.[id]?.platform === INTEGRATION);
    if (!entityId) {
      throw new Error(`No ${INTEGRATION} entity available`);
    }
    return { type: `custom:${CARD_TAG}`, entity: entityId };
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
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this._unsubscribe?.();
    this._unsubscribe = undefined;
  }

  private get _attrs(): PidSensorAttributes | undefined {
    if (!this.hass || !this._config) return undefined;
    return this.hass.states[this._config.entity]?.attributes as PidSensorAttributes | undefined;
  }

  private _refresh(): void {
    if (this.hass && this._config) void refreshScheduler.refresh(this.hass, this._config.entity);
  }

  protected render(): TemplateResult {
    const localize = setupCustomlocalize(this.hass);
    if (!this._config || !this.hass) return html``;

    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`<ha-card><div class="empty">${localize('card.no_entity')}</div></ha-card>`;
    }
    const attrs = stateObj.attributes as unknown as PidSensorAttributes;
    const unavailable = stateObj.state === 'unavailable';
    const departures = visibleDepartures(attrs.departures ?? [], this._now, this._config.max_departures);
    const title = this._config.title || attrs.stop_name || attrs.friendly_name || '';

    return html`
      <ha-card>
        <div class="header">
          <div>
            <span class="stop-name">${title}</span>
            ${attrs.platform ? html`<span class="platform">${attrs.platform}</span>` : nothing}
          </div>
          <ha-icon-button class="refresh ${this._refreshing ? 'spinning' : ''}" .label=${localize('card.refresh')} @click=${() => this._refresh()}>
            <ha-icon icon="mdi:refresh"></ha-icon>
          </ha-icon-button>
        </div>
        ${
          unavailable
            ? html`<div class="empty">${localize('card.unavailable')}</div>`
            : departures.length === 0
              ? html`<div class="empty">${localize('card.no_departures')}</div>`
              : html`<table>
                  ${departures.map((departure) => this._renderDeparture(departure, localize))}
                </table>`
        }
        ${(attrs.infotexts ?? []).length > 0 ? html`<div class="infotexts">${attrs.infotexts.map((info) => html`<div>${info.text}</div>`)}</div>` : nothing}
      </ha-card>
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
        <td class="headsign">${departure.headsign ?? ''}${note ? html`<span class="state">${note}</span>` : nothing}</td>
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
});
