// Departures older than this (relative to "now") are dropped from the board.
export const GRACE_MS = 60 * 1000;

// Time the vehicle is expected at the stop: predicted time if the API has one, otherwise the timetable.
export function departureTime(departure: PidDeparture): Date | undefined {
  const iso = departure.predicted ?? departure.scheduled;
  if (!iso) return undefined;
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

// Clock time shown on the board: always the timetable time (the delay is shown separately as "+m");
// the real expected time (departureTime) drives the countdown, ordering and refresh.
export function scheduledTime(departure: PidDeparture): Date | undefined {
  const iso = departure.scheduled ?? departure.predicted;
  if (!iso) return undefined;
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

const DEFAULT_ROW_LIMIT = 5;

// Number of departure rows the card reserves space for: the configured maximum, capped by what the sensor
// provides (stable, unlike the number of not-yet-departed rows that changes minute by minute).
export function rowLimit(maxDepartures: number | undefined, available: number): number {
  if (available <= 0) return maxDepartures && maxDepartures > 0 ? maxDepartures : DEFAULT_ROW_LIMIT;
  return maxDepartures && maxDepartures > 0 ? Math.min(maxDepartures, available) : available;
}

// Layout units: two departure rows take the height of one standard dashboard row (row height + gap), so the card
// stays aligned with neighbouring standard cards in a sections view. The header is one grid row; the body has one
// unit per grid row and always leaves the last half unit empty as the bottom margin, so n units show 2n - 1 departures.
export function layoutUnits(limit: number): number {
  return Math.max(1, Math.ceil((limit + 1) / 2));
}

export function gridRows(limit: number): number {
  return 1 + layoutUnits(limit);
}

// How many departures fit into a card that is `rows` grid rows high (2 rows -> 1, 3 -> 3, 4 -> 5, ...).
export function capacityForRows(rows: number): number {
  return Math.max(1, 2 * (rows - 1) - 1);
}

// Grid rows the card actually occupies: the height set by the user on the dashboard if any, otherwise what fits the limit.
export function effectiveRows(configuredRows: number | string | undefined, limit: number): number {
  return typeof configuredRows === 'number' && configuredRows >= 2 ? Math.floor(configuredRows) : gridRows(limit);
}

// Departures the board should show: already-departed ones are dropped, the rest sorted by time.
export function visibleDepartures(departures: PidDeparture[], now: Date, limit?: number): PidDeparture[] {
  const result = departures
    .map((departure) => ({ departure, time: departureTime(departure) }))
    .filter((entry): entry is { departure: PidDeparture; time: Date } => entry.time !== undefined && entry.time.getTime() >= now.getTime() - GRACE_MS)
    .sort((a, b) => a.time.getTime() - b.time.getTime())
    .map((entry) => entry.departure);
  return limit && limit > 0 ? result.slice(0, limit) : result;
}

// Whole minutes until the departure (rounded down); <= 0 means "now".
export function minutesUntil(time: Date, now: Date): number {
  return Math.floor((time.getTime() - now.getTime()) / 60000);
}

export function formatTime(time: Date, language: string, timeZone?: string): string {
  return new Intl.DateTimeFormat(language, { hour: '2-digit', minute: '2-digit', hour12: false, timeZone }).format(time);
}

// Next non-canceled departure, the one the auto-refresh counts down to.
export function nextDepartureTime(departures: PidDeparture[], now: Date): Date | undefined {
  const next = visibleDepartures(departures, now).find((departure) => !departure.canceled);
  return next ? departureTime(next) : undefined;
}

// Auto-refresh policy: nothing while the next departure is further away than leadMin minutes,
// then one refresh per minute (also when the data went stale and the departure is already past).
export function shouldAutoRefresh(options: { nextTime?: Date; now: Date; leadMin: number; lastRefreshAt?: number }): boolean {
  const { nextTime, now, leadMin, lastRefreshAt } = options;
  if (leadMin <= 0) return false;
  // nothing to count down to (no departures) — the integration's own interval handles recovery
  if (!nextTime || nextTime.getTime() - now.getTime() > leadMin * 60000) return false;
  return lastRefreshAt === undefined || now.getTime() - lastRefreshAt >= 60000;
}

const ROUTE_ICONS: Record<number, string> = {
  0: 'mdi:tram',
  1: 'mdi:subway',
  2: 'mdi:train',
  3: 'mdi:bus',
  4: 'mdi:ferry',
  7: 'mdi:gondola',
  11: 'mdi:bus-electric',
};

export function routeIcon(routeType: number | null): string {
  return (routeType !== null && ROUTE_ICONS[routeType]) || 'mdi:bus';
}
