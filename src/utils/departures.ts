// Departures older than this (relative to "now") are dropped from the board.
export const GRACE_MS = 60 * 1000;

// Time the vehicle is expected at the stop: predicted time if the API has one, otherwise the timetable.
export function departureTime(departure: PidDeparture): Date | undefined {
  const iso = departure.predicted ?? departure.scheduled;
  if (!iso) return undefined;
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? undefined : date;
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
