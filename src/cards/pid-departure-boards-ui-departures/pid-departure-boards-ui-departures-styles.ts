import { css } from 'lit';
import type { CSSResultGroup } from 'lit';

// Sizing follows the sections-view grid so the card lines up with standard cards next to it:
// header = one grid row, each --pid-units block = one grid row + gap = two departure rows.
// --row-height / --row-gap are provided by the sections view (56 px / 8 px by default).
export const PidDeparturesCardStyles: CSSResultGroup = css`
  :host {
    --pid-row: var(--row-height, 56px);
    --pid-unit: calc(var(--pid-row) + var(--row-gap, 8px));
  }

  ha-card {
    position: relative;
    box-sizing: border-box;
    height: 100%;
    overflow: hidden;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    height: var(--pid-row);
    padding: 0 16px;
  }

  .stop-name {
    font-weight: bold;
    font-size: 1.2em;
    color: var(--primary-text-color);
  }

  .platform {
    margin-left: 8px;
    padding: 0 6px;
    border-radius: 4px;
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
    font-size: 0.8em;
    vertical-align: middle;
  }

  .refresh {
    --mdc-icon-button-size: 36px;
    margin-right: -10px;
    color: var(--secondary-text-color);
  }

  .refresh.spinning ha-icon {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .body {
    box-sizing: border-box;
    height: calc(var(--pid-units, 1) * var(--pid-unit));
    padding: 0 16px;
    overflow: hidden;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  tr {
    height: calc(var(--pid-unit) / 2);
  }

  td {
    padding: 0 5px;
    text-align: left;
    vertical-align: middle;
  }

  .icon {
    width: 24px;
    padding-left: 0;
    text-align: left;
    color: var(--secondary-text-color);
  }

  .line {
    width: 44px;
    font-weight: bold;
    color: var(--primary-text-color);
  }

  .headsign {
    width: 100%;
    max-width: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: var(--primary-text-color);
  }

  .headsign .state {
    font-size: 0.75em;
    color: var(--secondary-text-color);
  }

  .countdown {
    font-weight: bold;
    text-align: right;
    white-space: nowrap;
    color: var(--primary-text-color);
  }

  .time {
    font-size: 0.9em;
    text-align: right;
    white-space: nowrap;
    color: var(--secondary-text-color);
  }

  .delay {
    width: 30px;
    padding-left: 8px;
    font-size: 0.9em;
    white-space: nowrap;
    color: var(--error-color, #ff8a80);
  }

  .feature {
    width: 20px;
    text-align: center;
    color: var(--disabled-text-color, #888);
    --mdc-icon-size: 18px;
  }

  tr.at-stop {
    animation: blink 1.5s ease-in-out infinite;
  }

  @keyframes blink {
    50% {
      opacity: 0.35;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    tr.at-stop {
      animation: none;
      background: var(--secondary-background-color);
    }
  }

  tr.canceled td {
    text-decoration: line-through;
    opacity: 0.55;
  }

  .empty,
  .infotexts {
    color: var(--secondary-text-color);
  }

  .infotexts {
    box-sizing: border-box;
    height: var(--pid-unit);
    padding: 8px 16px;
    overflow: auto;
    border-top: 1px solid var(--divider-color);
    font-size: 0.9em;
  }
`;
