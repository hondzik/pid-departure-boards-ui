import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import setupCustomlocalize from '../../localize';
import type { HomeAssistant } from 'custom-card-helpers';
import type { CSSResultGroup, TemplateResult } from 'lit';

const CARD_TYPE = 'custom:pid-departure-boards-ui-departures-card';

@customElement('pid-departure-boards-ui-departures-editor')
export class PidDeparturesEditor extends LitElement {
  @property({ attribute: false })
  public hass?: HomeAssistant;

  @state()
  private _config: PidDeparturesCardConfig = { type: CARD_TYPE, entity: '' };

  public static styles: CSSResultGroup = css`
    .card-config {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
  `;

  public setConfig(config: PidDeparturesCardConfig): void {
    this._config = { ...config };
  }

  protected render(): TemplateResult {
    if (!this.hass) return html``;
    const localize = setupCustomlocalize(this.hass);
    const config = this._config;

    const timeOptions = (['time', 'countdown', 'both'] as const).map((value) => ({ value, label: localize(`editor.time_display_${value}`) }));

    return html`
      <div class="card-config">
        <ha-selector
          .hass=${this.hass}
          .selector=${{ entity: { filter: { integration: 'pid_departure_boards', domain: 'sensor' } } }}
          .value=${config.entity}
          .label=${localize('editor.entity')}
          @value-changed=${this._changed('entity')}
        ></ha-selector>

        <ha-selector .hass=${this.hass} .selector=${{ text: {} }} .value=${config.title ?? ''} .label=${localize('editor.title')} @value-changed=${this._changed('title')}></ha-selector>

        <ha-selector
          .hass=${this.hass}
          .selector=${{ select: { mode: 'dropdown', options: timeOptions } }}
          .value=${config.time_display ?? 'both'}
          .label=${localize('editor.time_display')}
          @value-changed=${this._changed('time_display')}
        ></ha-selector>

        <ha-selector
          .hass=${this.hass}
          .selector=${{ boolean: {} }}
          .value=${config.show_wheelchair ?? true}
          .label=${localize('editor.show_wheelchair')}
          @value-changed=${this._changed('show_wheelchair')}
        ></ha-selector>

        <ha-selector
          .hass=${this.hass}
          .selector=${{ boolean: {} }}
          .value=${config.show_air_conditioned ?? true}
          .label=${localize('editor.show_air_conditioned')}
          @value-changed=${this._changed('show_air_conditioned')}
        ></ha-selector>

        <ha-selector
          .hass=${this.hass}
          .selector=${{ number: { min: 0, max: 30, step: 1, mode: 'box', unit_of_measurement: 'min' } }}
          .value=${config.refresh_lead_min ?? 5}
          .label=${localize('editor.refresh_lead_min')}
          @value-changed=${this._changed('refresh_lead_min')}
        ></ha-selector>

        <ha-selector
          .hass=${this.hass}
          .selector=${{ number: { min: 1, max: 20, step: 1, mode: 'box' } }}
          .value=${config.max_departures ?? 5}
          .label=${localize('editor.max_departures')}
          @value-changed=${this._changed('max_departures')}
        ></ha-selector>
      </div>
    `;
  }

  private _changed(key: keyof PidDeparturesCardConfig) {
    return (ev: CustomEvent<{ value: unknown }>): void => {
      ev.stopPropagation();
      // a cleared text field removes the option
      this._update({ [key]: ev.detail.value === '' ? undefined : ev.detail.value });
    };
  }

  private _update(patch: Partial<PidDeparturesCardConfig>): void {
    const config = { ...this._config, ...patch } as PidDeparturesCardConfig;
    for (const key of Object.keys(config)) {
      if (config[key] === undefined) delete config[key];
    }
    this._config = config;
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config }, bubbles: true, composed: true }));
  }
}
