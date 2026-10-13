export function mapLinkUrl(latitude: number, longitude: number): string {
  return `https://www.openstreetmap.org/?mlat=${latitude.toFixed(6)}&mlon=${longitude.toFixed(6)}#map=18/${latitude.toFixed(6)}/${longitude.toFixed(6)}`;
}

export function hasCoordinates(attrs: { latitude?: unknown; longitude?: unknown } | undefined): attrs is { latitude: number; longitude: number } {
  return typeof attrs?.latitude === 'number' && typeof attrs?.longitude === 'number' && Number.isFinite(attrs.latitude) && Number.isFinite(attrs.longitude);
}

// Dark theme of the dashboard: HA reports it in hass.themes.darkMode, the browser preference is the fallback.
// (custom-card-helpers' types don't know `darkMode`, hence the loose parameter type)
export function isDarkMode(hass: { themes?: unknown } | undefined, prefersDark = (): boolean => window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false): boolean {
  return (hass?.themes as { darkMode?: boolean } | undefined)?.darkMode ?? prefersDark();
}
