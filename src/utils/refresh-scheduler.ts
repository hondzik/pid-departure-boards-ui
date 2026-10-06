import { shouldAutoRefresh } from './departures';
import type { HomeAssistant } from 'custom-card-helpers';

export const INTEGRATION = 'pid_departure_boards';
// Countdown has minute resolution; ticking this often keeps it from lagging noticeably.
const DEFAULT_TICK_MS = 10 * 1000;

// What a card exposes to the scheduler. Everything is a getter because config and hass change over the card's lifetime.
export interface RefreshSubscriber {
  entity(): string | undefined;
  hass(): HomeAssistant | undefined;
  // time of the next non-canceled departure the auto-refresh counts down to
  nextTime(now: Date): Date | undefined;
  // refresh this many minutes before nextTime; 0 = auto-refresh off
  leadMin(): number;
  onTick(now: Date): void;
  onRefreshing(refreshing: boolean): void;
}

// One timer and one refresh call for the whole page: cards showing the same sensor share its refresh state and
// all sensors that are due in the same tick go out in a single pid_departure_boards.refresh call, so many cards
// don't multiply requests against the Golemio rate limit (20 requests / 8 s per token).
export class RefreshScheduler {
  private readonly _subscribers = new Set<RefreshSubscriber>();

  private readonly _lastRefreshAt = new Map<string, number>();

  private readonly _inflight = new Set<string>();

  private _timer?: ReturnType<typeof setInterval>;

  public constructor(private readonly _tickMs = DEFAULT_TICK_MS) {}

  public subscribe(subscriber: RefreshSubscriber): () => void {
    this._subscribers.add(subscriber);
    if (this._timer === undefined) {
      this._timer = setInterval(() => this.tick(), this._tickMs);
    }
    return () => {
      this._subscribers.delete(subscriber);
      if (this._subscribers.size === 0 && this._timer !== undefined) {
        clearInterval(this._timer);
        this._timer = undefined;
      }
    };
  }

  public tick(now = new Date()): void {
    const due = new Map<string, HomeAssistant>();
    for (const subscriber of this._subscribers) {
      subscriber.onTick(now);
      const entity = subscriber.entity();
      const hass = subscriber.hass();
      if (!entity || !hass || due.has(entity) || this._inflight.has(entity)) continue;
      if (shouldAutoRefresh({ nextTime: subscriber.nextTime(now), now, leadMin: subscriber.leadMin(), lastRefreshAt: this._lastRefreshAt.get(entity) })) {
        due.set(entity, hass);
      }
    }
    // all subscribers of a page share one hass object, so one call serves every due entity
    const hass = due.values().next().value;
    if (hass) void this._call(hass, [...due.keys()], now.getTime());
  }

  // Manual refresh (the card's button); joins an in-flight refresh of the same sensor instead of repeating it.
  public refresh(hass: HomeAssistant, entity: string): Promise<void> {
    if (this._inflight.has(entity)) return Promise.resolve();
    return this._call(hass, [entity], Date.now());
  }

  private async _call(hass: HomeAssistant, entities: string[], at: number): Promise<void> {
    for (const entity of entities) {
      this._lastRefreshAt.set(entity, at);
      this._inflight.add(entity);
    }
    this._notify(entities);
    try {
      await hass.callService(INTEGRATION, 'refresh', { entity_id: entities });
    } catch (err) {
      console.error('pid-departure-boards-ui: refresh failed', err);
    } finally {
      for (const entity of entities) this._inflight.delete(entity);
      this._notify(entities);
    }
  }

  private _notify(entities: string[]): void {
    for (const subscriber of this._subscribers) {
      const entity = subscriber.entity();
      if (entity && entities.includes(entity)) subscriber.onRefreshing(this._inflight.has(entity));
    }
  }
}

export const refreshScheduler = new RefreshScheduler();
