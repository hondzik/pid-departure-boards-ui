import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { RefreshScheduler } from '../src/utils/refresh-scheduler';
import type { RefreshSubscriber } from '../src/utils/refresh-scheduler';
import type { HomeAssistant } from 'custom-card-helpers';

const NOW = new Date('2026-10-06T13:00:00+02:00');
const SOON = new Date('2026-10-06T13:03:00+02:00');
const FAR = new Date('2026-10-06T13:30:00+02:00');

function makeHass(callService = vi.fn().mockResolvedValue(undefined)) {
  return { callService } as unknown as HomeAssistant & { callService: ReturnType<typeof vi.fn> };
}

function makeSubscriber(entity: string, hass: HomeAssistant, nextTime: Date | null = SOON, leadMin = 5) {
  return {
    entity: () => entity,
    hass: () => hass,
    nextTime: () => nextTime ?? undefined,
    leadMin: () => leadMin,
    onTick: vi.fn(),
    onRefreshing: vi.fn(),
  } satisfies RefreshSubscriber;
}

describe('RefreshScheduler', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('sends sensors that are due in the same tick in one call', () => {
    const hass = makeHass();
    const scheduler = new RefreshScheduler();
    scheduler.subscribe(makeSubscriber('sensor.a', hass));
    scheduler.subscribe(makeSubscriber('sensor.b', hass));
    scheduler.subscribe(makeSubscriber('sensor.c', hass, FAR));
    scheduler.tick(NOW);
    expect(hass.callService).toHaveBeenCalledTimes(1);
    expect(hass.callService).toHaveBeenCalledWith('pid_departure_boards', 'refresh', { entity_id: ['sensor.a', 'sensor.b'] });
  });

  it('refreshes a sensor shown by several cards only once', () => {
    const hass = makeHass();
    const scheduler = new RefreshScheduler();
    scheduler.subscribe(makeSubscriber('sensor.a', hass));
    scheduler.subscribe(makeSubscriber('sensor.a', hass));
    scheduler.tick(NOW);
    expect(hass.callService).toHaveBeenCalledWith('pid_departure_boards', 'refresh', { entity_id: ['sensor.a'] });
  });

  it('refreshes at most once a minute per sensor', async () => {
    const hass = makeHass();
    const scheduler = new RefreshScheduler();
    scheduler.subscribe(makeSubscriber('sensor.a', hass));
    scheduler.tick(NOW);
    await vi.waitFor(() => expect(hass.callService).toHaveBeenCalledTimes(1));
    scheduler.tick(new Date(NOW.getTime() + 30000));
    expect(hass.callService).toHaveBeenCalledTimes(1);
    scheduler.tick(new Date(NOW.getTime() + 60000));
    expect(hass.callService).toHaveBeenCalledTimes(2);
  });

  it('does nothing without auto-refresh or a next departure', () => {
    const hass = makeHass();
    const scheduler = new RefreshScheduler();
    scheduler.subscribe(makeSubscriber('sensor.a', hass, SOON, 0));
    scheduler.subscribe(makeSubscriber('sensor.b', hass, null));
    scheduler.tick(NOW);
    expect(hass.callService).not.toHaveBeenCalled();
  });

  it('reports the refreshing state and survives a failed call', async () => {
    const hass = makeHass(vi.fn().mockRejectedValue(new Error('boom')));
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const scheduler = new RefreshScheduler();
    const subscriber = makeSubscriber('sensor.a', hass);
    scheduler.subscribe(subscriber);
    await scheduler.refresh(hass, 'sensor.a');
    expect(subscriber.onRefreshing.mock.calls).toEqual([[true], [false]]);
    expect(error).toHaveBeenCalled();
    error.mockRestore();
  });

  it('joins a manual refresh to one already in flight', async () => {
    let finish: () => void = () => undefined;
    const hass = makeHass(vi.fn().mockReturnValue(new Promise<void>((resolve) => (finish = resolve))));
    const scheduler = new RefreshScheduler();
    const first = scheduler.refresh(hass, 'sensor.a');
    await scheduler.refresh(hass, 'sensor.a');
    expect(hass.callService).toHaveBeenCalledTimes(1);
    finish();
    await first;
  });

  it('ticks subscribers on the interval and stops the timer after the last unsubscribe', () => {
    const hass = makeHass();
    const scheduler = new RefreshScheduler(1000);
    const subscriber = makeSubscriber('sensor.a', hass, FAR);
    const unsubscribe = scheduler.subscribe(subscriber);
    vi.advanceTimersByTime(3000);
    expect(subscriber.onTick).toHaveBeenCalledTimes(3);
    unsubscribe();
    expect(vi.getTimerCount()).toBe(0);
    vi.advanceTimersByTime(3000);
    expect(subscriber.onTick).toHaveBeenCalledTimes(3);
  });
});
