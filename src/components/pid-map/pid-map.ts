import * as L from 'leaflet';
import leafletCss from 'leaflet/dist/leaflet.css';
import { css, html, LitElement, nothing, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import setupCustomlocalize from '../../localize';
import { isDarkMode } from '../../utils/map';
import { fetchRouteShapes, fetchVehicles, routeColor, routeTypes, toLatLngs, VEHICLE_POLL_MS, vehicleKey, vehicleTooltip } from '../../utils/vehicles';
import type { PidRouteShape, PidVehicle } from '../../utils/vehicles';
import type { HomeAssistant } from 'custom-card-helpers';
import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';

// CARTO basemaps (OpenStreetMap data): unlike tile.openstreetmap.org they work without a Referer header, which the HA frontend doesn't send
// (OSM answers 403 "Access blocked"), and they come with a native dark style.
const TILE_ATTRIBUTION = '© OpenStreetMap contributors © CARTO';
const TILES = {
  light: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
};
const DEFAULT_CENTER: [number, number] = [50.0755, 14.4378];

// Map of one stop: the lines serving it (drawn once) and the live positions of their vehicles (polled while visible).
@customElement('pid-departure-boards-ui-map')
export class PidMap extends LitElement {
  @property({ attribute: false })
  public hass?: HomeAssistant;

  @property()
  public entity = '';

  @property({ type: Number })
  public latitude?: number;

  @property({ type: Number })
  public longitude?: number;

  @state()
  private _updated?: Date;

  @state()
  private _error = false;

  @state()
  private _routes: { route: string; color: string }[] = [];

  private _map?: L.Map;

  private _shapeLayer = L.layerGroup();

  private _vehicleLayer = L.layerGroup();

  private _markers = new Map<string, L.Marker>();

  private _timer?: number;

  private _resizeObserver?: ResizeObserver;

  private _fitted = false;

  private _tiles?: L.TileLayer;

  private _tilesDark?: boolean;

  public static styles: CSSResultGroup = [
    unsafeCSS(leafletCss),
    css`
      :host {
        display: block;
      }

      .map {
        width: min(80vw, 640px);
        height: 60vh;
        background: var(--secondary-background-color);
      }

      .frame.dark .leaflet-control-attribution {
        background: rgba(0, 0, 0, 0.6);
        color: #ccc;
      }

      .frame.dark .leaflet-control-attribution a {
        color: #8ab4f8;
      }

      .frame.dark .leaflet-bar a {
        background: var(--card-background-color, #1c1c1c);
        color: var(--primary-text-color, #fff);
        border-bottom-color: var(--divider-color, #444);
      }

      .legend {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 6px;
        margin-top: 8px;
        font-size: 0.85em;
        color: var(--secondary-text-color);
      }

      .chip {
        padding: 0 6px;
        border-radius: 4px;
        font-weight: bold;
        color: #fff;
      }

      .status {
        margin-left: auto;
      }

      .status.error {
        color: var(--error-color);
      }

      .vehicle {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border: 2px solid #fff;
        border-radius: 50%;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
        font-size: 11px;
        font-weight: bold;
        color: #fff;
        background: var(--pid-color, #0072bc);
      }

      .vehicle.at-stop {
        opacity: 0.65;
      }

      .vehicle .arrow {
        position: absolute;
        inset: -9px;
        transform: rotate(var(--pid-bearing, 0deg));
        pointer-events: none;
      }

      .vehicle .arrow::before {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        margin-left: -4px;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-bottom: 7px solid var(--pid-color, #0072bc);
      }
    `,
  ];

  protected render(): TemplateResult {
    const localize = setupCustomlocalize(this.hass);
    return html`
      <div class="frame ${isDarkMode(this.hass) ? 'dark' : ''}"><div class="map"></div></div>
      <div class="legend">
        ${this._routes.map((entry) => html`<span class="chip" style="background: ${entry.color}">${entry.route}</span>`)}
        <span class="status ${this._error ? 'error' : ''}">
          ${this._error ? localize('card.map_error') : this._updated ? `${localize('card.map_updated')} ${this._updated.toLocaleTimeString(this.hass?.locale?.language)}` : nothing}
        </span>
      </div>
    `;
  }

  protected firstUpdated(): void {
    const container = this.renderRoot.querySelector('.map') as HTMLElement;
    const hasCenter = Number.isFinite(this.latitude) && Number.isFinite(this.longitude);
    this._map = L.map(container, { zoomControl: true, attributionControl: true });
    this._applyTiles();
    this._shapeLayer.addTo(this._map);
    this._vehicleLayer.addTo(this._map);
    this._map.setView(hasCenter ? [this.latitude as number, this.longitude as number] : DEFAULT_CENTER, hasCenter ? 16 : 12);
    if (hasCenter) {
      L.circleMarker([this.latitude as number, this.longitude as number], { radius: 7, color: '#fff', weight: 2, fillColor: '#d32f2f', fillOpacity: 1 }).addTo(this._map);
    }
    // the dialog animates open, so the size is only final later
    this._resizeObserver = new ResizeObserver(() => this._map?.invalidateSize());
    this._resizeObserver.observe(container);
    void this._loadShapes();
    void this._pollVehicles();
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this._startPolling();
    document.addEventListener('visibilitychange', this._onVisibility);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this._stopPolling();
    document.removeEventListener('visibilitychange', this._onVisibility);
    this._resizeObserver?.disconnect();
    this._map?.remove();
    this._map = undefined;
  }

  // light or dark base map, switched when the dashboard theme changes
  private _applyTiles(): void {
    const dark = isDarkMode(this.hass);
    if (!this._map || dark === this._tilesDark) return;
    this._tiles?.remove();
    this._tiles = L.tileLayer(dark ? TILES.dark : TILES.light, { maxZoom: 19, subdomains: 'abcd', detectRetina: true, attribution: TILE_ATTRIBUTION }).addTo(this._map);
    this._tiles.bringToBack();
    this._tilesDark = dark;
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has('hass')) this._applyTiles();
    if (changed.has('entity') && changed.get('entity') !== undefined && this._map) {
      this._fitted = false;
      void this._loadShapes();
      void this._pollVehicles();
    }
  }

  private _startPolling(): void {
    this._stopPolling();
    this._timer = window.setInterval(() => void this._pollVehicles(), VEHICLE_POLL_MS);
  }

  private _stopPolling(): void {
    window.clearInterval(this._timer);
    this._timer = undefined;
  }

  // Positions are only worth fetching while somebody can see them.
  private _onVisibility = (): void => {
    if (document.hidden) {
      this._stopPolling();
    } else {
      this._startPolling();
      void this._pollVehicles();
    }
  };

  private get _types(): Map<string, number | null> {
    const attrs = this.hass?.states[this.entity]?.attributes as { departures?: PidDeparture[] } | undefined;
    return routeTypes(attrs?.departures);
  }

  private async _loadShapes(): Promise<void> {
    if (!this.hass || !this.entity || !this._map) return;
    try {
      const shapes = await fetchRouteShapes(this.hass, this.entity);
      this._drawShapes(shapes);
    } catch (err) {
      console.error('pid-departure-boards-ui: loading route shapes failed', err);
    }
  }

  private _drawShapes(shapes: PidRouteShape[]): void {
    const types = this._types;
    this._shapeLayer.clearLayers();
    this._routes = shapes.map((shape) => ({ route: shape.route, color: routeColor(shape.route, types.get(shape.route)) }));
    for (const shape of shapes) {
      const color = routeColor(shape.route, types.get(shape.route));
      L.polyline(toLatLngs(shape.coordinates ?? []), { color, weight: 4, opacity: 0.75 })
        .bindTooltip(shape.headsign ? `${shape.route} → ${shape.headsign}` : shape.route, { sticky: true })
        .addTo(this._shapeLayer);
    }
    // without a stop position the map centers on the lines instead
    if (!Number.isFinite(this.latitude) && this._shapeLayer.getLayers().length > 0 && this._map) {
      this._map.fitBounds(L.featureGroup(this._shapeLayer.getLayers()).getBounds(), { padding: [16, 16] });
    }
  }

  private async _pollVehicles(): Promise<void> {
    if (!this.hass || !this.entity || !this._map || document.hidden) return;
    try {
      const response = await fetchVehicles(this.hass, this.entity);
      this._drawVehicles(response.vehicles);
      this._updated = response.updated ? new Date(response.updated) : new Date();
      this._error = false;
    } catch (err) {
      this._error = true;
      console.error('pid-departure-boards-ui: loading vehicle positions failed', err);
    }
  }

  private _drawVehicles(vehicles: PidVehicle[]): void {
    const types = this._types;
    const seen = new Set<string>();
    for (const vehicle of vehicles) {
      const key = vehicleKey(vehicle);
      seen.add(key);
      const color = routeColor(vehicle.route, types.get(vehicle.route));
      const icon = L.divIcon({
        className: '',
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        html: `<div class="vehicle ${vehicle.state === 'at_stop' ? 'at-stop' : ''}" style="--pid-color: ${color}">${vehicle.bearing === null ? '' : `<span class="arrow" style="--pid-bearing: ${vehicle.bearing}deg"></span>`}${escapeHtml(vehicle.route)}</div>`,
      });
      const position: [number, number] = [vehicle.latitude, vehicle.longitude];
      const existing = this._markers.get(key);
      if (existing) {
        existing.setLatLng(position).setIcon(icon).setTooltipContent(vehicleTooltip(vehicle));
      } else {
        const marker = L.marker(position, { icon, zIndexOffset: 1000 }).bindTooltip(vehicleTooltip(vehicle), { direction: 'top' }).addTo(this._vehicleLayer);
        this._markers.set(key, marker);
      }
    }
    for (const [key, marker] of this._markers) {
      if (!seen.has(key)) {
        this._vehicleLayer.removeLayer(marker);
        this._markers.delete(key);
      }
    }
    // the first fix: make sure the stop and the vehicles around it are in view
    if (!this._fitted && vehicles.length > 0 && this._map) {
      const points: L.LatLngExpression[] = vehicles.map((vehicle) => [vehicle.latitude, vehicle.longitude]);
      if (Number.isFinite(this.latitude) && Number.isFinite(this.longitude)) points.push([this.latitude as number, this.longitude as number]);
      this._map.fitBounds(L.latLngBounds(points), { padding: [32, 32], maxZoom: 16 });
      this._fitted = true;
    }
  }
}

function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char] as string);
}
