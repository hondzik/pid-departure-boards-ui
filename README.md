# PID Departure Boards – cards for Home Assistant <!-- omit from toc -->

[![GitHub Release](https://img.shields.io/github/release/hondzik/pid-departure-boards-ui.svg?style=for-the-badge)](https://github.com/hondzik/pid-departure-boards-ui/releases)
[![License](https://img.shields.io/github/license/hondzik/pid-departure-boards-ui.svg?style=for-the-badge)](LICENSE)
[![Project Maintenance](https://img.shields.io/badge/maintainer-hondzik-blue.svg?style=for-the-badge)](https://github.com/hondzik)
![Github](https://img.shields.io/github/followers/hondzik.svg?style=for-the-badge)
[![GitHub Activity](https://img.shields.io/github/last-commit/hondzik/pid-departure-boards-ui?style=for-the-badge)](https://github.com/hondzik/pid-departure-boards-ui/commits/main)

[Čeština](README.cs.md)

## Table of contents <!-- omit from toc -->

- [Description](#description)
- [What's in this bundle](#whats-in-this-bundle)
- [Requirements](#requirements)
- [Installation](#installation)
- [Card: Departure board](#card-departure-board)
  - [How it works](#how-it-works)
  - [Configuration options](#configuration-options)
  - [Using the visual editor](#using-the-visual-editor)
- [Map popup](#map-popup)
  - [What the map shows](#what-the-map-shows)
  - [Controls](#controls)
  - [Requirements and limits](#requirements-and-limits)
- [Troubleshooting](#troubleshooting)
- [Translations](#translations)
- [Contributors](#contributors)

## Description

This is a custom Home Assistant Lovelace **card** that shows a departure board for a stop of the Prague Integrated Transport (PID) — line, destination, time until departure, delay and accessibility info. It reads the data from the [`pid_departure_boards`](https://github.com/hondzik/pid-departure-boards) integration and never talks to the Golemio API itself.

![Departure board overview](docs/images/card.png)

## What's in this bundle

| Card | What it shows |
| ---- | ------------- |
| `pid-departure-boards-ui-departures-card` | Upcoming departures from one stop platform, with a refresh button and optional notices (closures). |

## Requirements

- Home Assistant 2026.10.0 or newer (the map in the popup uses HA's built-in map tiles).
- The [`pid_departure_boards`](https://github.com/hondzik/pid-departure-boards) integration set up with at least one stop platform (one sensor per platform).

## Installation

Install through [HACS](https://hacs.xyz/) using the badge below, or add this repository manually as a custom HACS repository (category: plugin) if it isn't listed in the default store yet.

[![My Home Assistant](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?repository=pid-departure-boards-ui&owner=hondzik&category=Plugin)

## Card: Departure board

![Departure board card](docs/images/card.png)

`type: custom:pid-departure-boards-ui-departures-card`

### How it works

The card shows the stop name and platform in the header and one row per upcoming departure.

- Each row has a vehicle icon, the line number, the destination, the time until departure and/or the departure clock time, the delay (`+5` only when the vehicle is late) and the wheelchair / air-conditioning icons.
- The clock time is always the timetable (scheduled) time and the delay is shown next to it; the countdown, ordering and refresh use the real expected time including the delay. Departures that are already gone disappear on their own.
- Canceled departures are struck through; a row blinks while the vehicle is standing at the stop (hover shows "at the stop"; with reduced motion enabled the row is highlighted instead).
- Notices (e.g. closures) from the integration are shown under the stop name as a single line of text that scrolls endlessly (several notices are joined with a space).
- Click the stop name to open the [map popup](#map-popup) with the routes and the live positions of the vehicles.
- The card's height follows the dashboard grid: resize it in the dashboard editor and it shows as many departures as fit (2 rows = 1 departure, 3 rows = 3, 4 rows = 5, ...).
- The sensor itself only changes when the integration updates, so the "in X min" countdown is computed by the card.
- **Refresh:** the button in the top right corner refreshes the sensor immediately. In addition, once the next departure is closer than the configured number of minutes the card refreshes the sensor every minute. One shared timer serves all cards on the page, sensors due at the same time are refreshed in a single call and several cards showing the same sensor refresh it only once — so many cards don't exhaust the Golemio API rate limit.

### Configuration options

| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| `entity` | `string` | – (required) | A sensor of the `pid_departure_boards` integration. |
| `title` | `string` | stop name | Custom card title. |
| `time_display` | `time` / `countdown` / `both` | `both` | Show the departure clock time, the time until departure, or both. |
| `show_wheelchair` | `boolean` | `true` | Show the wheelchair-accessible icon. |
| `show_air_conditioned` | `boolean` | `true` | Show the air-conditioning icon. |
| `refresh_lead_min` | `number` | `5` | Refresh the sensor this many minutes before the next departure, then every minute. `0` turns the automatic refresh off. |
| `max_departures` | `number` | all from the sensor | Maximum number of departures shown. |

```yaml
type: custom:pid-departure-boards-ui-departures-card
entity: sensor.smichovske_nadrazi_b
time_display: both
show_wheelchair: true
show_air_conditioned: false
refresh_lead_min: 5
max_departures: 5
```

### Using the visual editor

Add the card from the card picker (it is offered for sensors of the `pid_departure_boards` integration) or edit an existing card. Every option above is available in the editor:

![Departure board editor](docs/images/editor.png)

## Map popup

Click the stop name in the card header to open a map of the stop.

![Map popup](docs/images/map.png)

### What the map shows

- **The stop** as a red dot (when the sensor provides its position) and the base map of Home Assistant's built-in map tiles; in the dark theme the map is dark as well.
- **The routes** of all lines watched by the sensor, drawn in the direction the platform serves. Colors follow the vehicle type: trams red, buses blue, trolleybuses green, trains purple, ferries teal, night lines dark; metro lines have their own colors (A green, B yellow, C red).
- **The vehicles** of those lines as colored circles with the line number. The small arrow shows the heading; a vehicle standing at the stop is paler. Hover (or tap) a vehicle for its line, destination and delay.
- **Only vehicles that still have the stop ahead of them.** A vehicle that has already served the stop and drives on to the end of its line is hidden (the position along the route decides; a vehicle that stands at the platform is still shown). If this cannot be determined — for example for a line without a reference trip, a loop that passes the stop twice or a vehicle on another variant of the route — the vehicle is shown.
- **Live positions.** They are refreshed every 12 seconds while the map is open and the browser tab is visible; below the map you can see when the data were updated. The routes are loaded once, when the map opens.
- **A legend** under the map with the lines in their colors.

### Controls

- **Open:** click the stop name. **Close:** the *Close* button, `Esc` or a click outside the popup.
- **Zoom and move** the map with the mouse wheel, the +/− buttons, a double click or by dragging; on a phone with a pinch gesture.
- **Initial view:** the map zooms so that the stop and the nearest vehicle are in view (all vehicles if the sensor has no position of the stop).
- **Click a line number in the legend** to center the map on the vehicle of that line that arrives at the stop next; its tooltip opens. Lines that currently have no vehicle on the map are grayed out.
- **Open in OpenStreetMap** (a link below the map) opens the position of the stop in the full map in a new tab.

### Requirements and limits

- Home Assistant 2026.10.0 or newer — the tiles are served by HA's own *Map tiles* integration, so the browser never contacts a tile server directly.
- A version of the `pid_departure_boards` integration with the `get_route_shapes` and `get_vehicle_positions` services. The position of the stop (the `latitude` and `longitude` attributes of the sensor) is optional but needed for the stop marker, the initial zoom and for hiding the vehicles that have already passed. Platforms added to the integration before it provided positions have to be added again.
- The Golemio API limits requests (20 per 8 seconds per token) and the departures share this limit with the map. Keep the map open only when you need it.

## Troubleshooting

- **The card isn't offered for my sensor** — only sensors created by the `pid_departure_boards` integration get the card suggested after selecting an entity; otherwise pick it manually from "All cards" ("Custom: PID Departure Board"). Reload the browser cache after updating the card.
- **The board shows "Departures are unavailable"** — the integration failed to update from the API; check the integration's logs.
- **The times don't count down between updates** — make sure the browser tab isn't suspended; the countdown is computed in the browser every few seconds.
- **The map shows "Map data unavailable" or has no background** — the map needs Home Assistant 2026.10.0 or newer (map tiles) and the integration version with the map services; check the browser console for details.
- **The stop isn't marked and passed vehicles are still shown** — the sensor has no `latitude`/`longitude` attributes; see [Requirements and limits](#requirements-and-limits).
- **No delay shown** — the delay is shown only when the vehicle reports one (`+m` for a positive delay).

## Translations

The card and its editor are localized into: Czech, German, English, Spanish, French, Hebrew, Hungarian, Italian, Japanese, Dutch, Norwegian, Polish, Portuguese, Slovak, Swedish, Ukrainian and Chinese (falls back to English for any other language). Czech and English are maintained by the author; **all other translations are machine-translated** and may contain mistakes. Spot something wrong or want another language? Feel free to open an issue or PR — corrections are always welcome.

## Contributors

[![Contributors](https://contrib.rocks/image?repo=hondzik/pid-departure-boards-ui)](https://github.com/hondzik/pid-departure-boards-ui/graphs/contributors)
