import { describe, expect, it } from 'vitest';
import fixture from './fixtures/sensor.litochlebske_namesti_opatov.json';
import { departureTime, formatTime, minutesUntil, nextDepartureTime, routeIcon, shouldAutoRefresh, visibleDepartures } from '../src/utils/departures';

const departures = fixture.attributes.departures as PidDeparture[];
const at = (iso: string) => new Date(iso);

describe('departureTime', () => {
  it('prefers predicted over scheduled', () => {
    expect(departureTime(departures[0])?.toISOString()).toBe(at('2026-10-06T13:18:08+02:00').toISOString());
  });

  it('falls back to scheduled and handles missing/invalid times', () => {
    expect(departureTime({ ...departures[0], predicted: null })?.toISOString()).toBe(at('2026-10-06T13:13:00+02:00').toISOString());
    expect(departureTime({ ...departures[0], predicted: null, scheduled: null })).toBeUndefined();
    expect(departureTime({ ...departures[0], predicted: 'nonsense' })).toBeUndefined();
  });
});

describe('visibleDepartures', () => {
  it('sorts by effective time and keeps at_stop vehicles', () => {
    const result = visibleDepartures(departures, at('2026-10-06T13:18:10+02:00'));
    expect(result.map((d) => d.trip_id)).toEqual(['136_8163_260831', '213_2504_260831', '125_2580_260831', '136_8164_260831', '213_1487_260831']);
  });

  it('drops departures older than the grace period', () => {
    const result = visibleDepartures(departures, at('2026-10-06T13:20:00+02:00'));
    expect(result.map((d) => d.trip_id)).toEqual(['125_2580_260831', '136_8164_260831', '213_1487_260831']);
  });

  it('applies the limit', () => {
    expect(visibleDepartures(departures, at('2026-10-06T13:00:00+02:00'), 2)).toHaveLength(2);
  });
});

describe('minutesUntil / formatTime', () => {
  it('rounds down to whole minutes', () => {
    expect(minutesUntil(at('2026-10-06T13:23:07+02:00'), at('2026-10-06T13:18:10+02:00'))).toBe(4);
    expect(minutesUntil(at('2026-10-06T13:18:08+02:00'), at('2026-10-06T13:18:10+02:00'))).toBe(-1);
  });

  it('formats in the requested time zone', () => {
    expect(formatTime(at('2026-10-06T11:18:08+00:00'), 'cs', 'Europe/Prague')).toBe('13:18');
  });
});

describe('nextDepartureTime', () => {
  it('skips canceled departures', () => {
    const list = [{ ...departures[2], canceled: true }, departures[3]];
    expect(nextDepartureTime(list, at('2026-10-06T13:00:00+02:00'))?.toISOString()).toBe(at('2026-10-06T13:23:43+02:00').toISOString());
  });

  it('returns undefined when nothing is left', () => {
    expect(nextDepartureTime([], new Date())).toBeUndefined();
  });
});

describe('shouldAutoRefresh', () => {
  const now = at('2026-10-06T13:00:00+02:00');
  const soon = at('2026-10-06T13:04:00+02:00');
  const far = at('2026-10-06T13:10:00+02:00');

  it('does nothing while the next departure is further than the lead time', () => {
    expect(shouldAutoRefresh({ nextTime: far, now, leadMin: 5 })).toBe(false);
  });

  it('refreshes inside the lead window, at most once a minute', () => {
    expect(shouldAutoRefresh({ nextTime: soon, now, leadMin: 5 })).toBe(true);
    expect(shouldAutoRefresh({ nextTime: soon, now, leadMin: 5, lastRefreshAt: now.getTime() - 30000 })).toBe(false);
    expect(shouldAutoRefresh({ nextTime: soon, now, leadMin: 5, lastRefreshAt: now.getTime() - 60000 })).toBe(true);
  });

  it('refreshes when the next departure is already past (stale data)', () => {
    expect(shouldAutoRefresh({ nextTime: at('2026-10-06T12:59:30+02:00'), now, leadMin: 5 })).toBe(true);
  });

  it('is disabled with leadMin 0 and without a next departure', () => {
    expect(shouldAutoRefresh({ nextTime: soon, now, leadMin: 0 })).toBe(false);
    expect(shouldAutoRefresh({ now, leadMin: 5 })).toBe(false);
  });
});

describe('routeIcon', () => {
  it('maps GTFS route types and falls back to a bus', () => {
    expect(routeIcon(0)).toBe('mdi:tram');
    expect(routeIcon(2)).toBe('mdi:train');
    expect(routeIcon(11)).toBe('mdi:bus-electric');
    expect(routeIcon(null)).toBe('mdi:bus');
    expect(routeIcon(99)).toBe('mdi:bus');
  });
});
