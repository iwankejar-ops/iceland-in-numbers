# Iceland in Numbers

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/iwankejar-ops/iceland-in-numbers/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/iwankejar-ops/iceland-in-numbers/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

A national statistics site for Iceland — the people, economy, energy and places of a small island nation, with every figure carrying its source and year.

## What it covers

- **Overview** — the six headline figures and a ten-year population chart.
- **Population** — 2017–2026 growth (Statistics Iceland), who lives here, capital-region share, foreign citizens and the largest immigrant group. Line/bar toggle.
- **Economy** — GDP per person and real growth (World Bank / IMF), inflation, unemployment, jobs and tourism. GDP-per-person / real-growth toggle.
- **Energy & climate** — renewable energy shares, electricity use per person, and Reykjavík monthly highs and lows (1991–2020 normals). Highs/lows toggle.
- **Towns** — the five largest urban areas and the six largest municipalities, in a sortable, filterable table.
- **Sources & methods** — every publisher behind every figure, and how the figures were chosen.

## How it is built

Fully static and offline: plain HTML, CSS and JavaScript, hand-drawn SVG charts, no frameworks, no network requests, no tracking. Each file has one clear job:

| File | Job |
| --- | --- |
| `app/index.html` | Page shell, navigation, footer |
| `app/style.css` | All styling (original Nordic design) |
| `app/data.js` | Every figure, with source and year |
| `app/charts.js` | SVG chart builders (bars, lines, ranking bars) |
| `app/pages.js` | Page renderers and page controls |
| `app/main.js` | Hash router and boot |

## Sources

Statistics Iceland (Hagstofa Íslands), World Bank World Development Indicators, IMF World Economic Outlook, Icelandic Meteorological Office / WMO, CIA World Factbook. Figures were checked in November 2026; publishers may have revised them since.

## Run it

```sh
python3 -m http.server -d app
# open http://localhost:8000/
```

## License

MIT — see [LICENSE](LICENSE).
