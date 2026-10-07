const HALF_WIDTH_DEG = 0.003;
const HALF_HEIGHT_DEG = 0.0015;

// Embeddable OpenStreetMap view centered on the stop.
export function embedMapUrl(latitude: number, longitude: number): string {
  const bbox = [longitude - HALF_WIDTH_DEG, latitude - HALF_HEIGHT_DEG, longitude + HALF_WIDTH_DEG, latitude + HALF_HEIGHT_DEG].map((value) => value.toFixed(6)).join(',');
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${latitude.toFixed(6)},${longitude.toFixed(6)}`;
}

export function mapLinkUrl(latitude: number, longitude: number): string {
  return `https://www.openstreetmap.org/?mlat=${latitude.toFixed(6)}&mlon=${longitude.toFixed(6)}#map=18/${latitude.toFixed(6)}/${longitude.toFixed(6)}`;
}

// Fallback when the sensor has no coordinates: search the stop by name.
export function searchMapUrl(stopName: string): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(`${stopName} zastávka`)}&output=embed`;
}

export function hasCoordinates(attrs: { latitude?: unknown; longitude?: unknown } | undefined): attrs is { latitude: number; longitude: number } {
  return typeof attrs?.latitude === 'number' && typeof attrs?.longitude === 'number' && Number.isFinite(attrs.latitude) && Number.isFinite(attrs.longitude);
}
