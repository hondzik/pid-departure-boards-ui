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

        <ha-textfield .label=${localize('editor.title')} .value=${config.title ?? ''} @input=${this._titleChanged}></ha-textfield>

        <ha-selector
          .hass=${this.hass}
          .selector=${{ select: { mode: 'dropdown', options: timeOptions } }}
          .value=${config.time_display ?? 'both'}
          .label=${localize('editor.time_display')}
          @value-changed=${this._changed('time_display')}
        ></ha-selector>

        <ha-formfield .label=${localize('editor.show_wheelchair')}>
          <ha-switch .checked=${config.show_wheelchair ?? true} @change=${this._switchChanged('show_wheelchair')}></ha-switch>
        </ha-formfield>

        <ha-formfield .label=${localize('editor.show_air_conditioned')}>
          <ha-switch .checked=${config.show_air_conditioned ?? true} @change=${this._switchChanged('show_air_conditioned')}></ha-switch>
        </ha-formfield>

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
      this._update({ [key]: ev.detail.value });
    };
  }

  private _switchChanged(key: 'show_wheelchair' | 'show_air_conditioned') {
    return (ev: Event): void => this._update({ [key]: (ev.target as HTMLInputElement).checked });
  }

  private _titleChanged = (ev: Event): void => {
    const value = (ev.target as HTMLInputElement).value;
    this._update({ title: value || undefined });
  };

  private _update(patch: Partial<PidDeparturesCardConfig>): void {
    const config = { ...this._config, ...patch } as PidDeparturesCardConfig;
    for (const key of Object.keys(config)) {
      if (config[key] === undefined) delete config[key];
    }
    this._config = config;
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config }, bubbles: true, composed: true }));
  }
}
