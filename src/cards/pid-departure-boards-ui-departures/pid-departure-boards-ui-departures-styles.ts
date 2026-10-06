import { css } from 'lit';
import type { CSSResultGroup } from 'lit';

export const PidDeparturesCardStyles: CSSResultGroup = css`
  ha-card {
    position: relative;
    padding: 12px 16px 16px;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
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
    margin: -6px -10px -6px 0;
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

  table {
    width: 100%;
    border-collapse: collapse;
  }

  td {
    padding: 3px 5px;
    text-align: left;
    vertical-align: middle;
  }

  .icon {
    width: 30px;
    text-align: center;
    color: var(--secondary-text-color);
  }

  .line {
    width: 44px;
    font-weight: bold;
    color: var(--primary-text-color);
  }

  .headsign {
    color: var(--primary-text-color);
  }

  .headsign .state {
    display: block;
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

  tr.canceled td {
    text-decoration: line-through;
    opacity: 0.55;
  }

  .empty,
  .infotexts {
    color: var(--secondary-text-color);
  }

  .infotexts {
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid var(--divider-color);
    font-size: 0.9em;
  }
`;
