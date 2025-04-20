# Pakistan Under Siege

[![GitHub](https://img.shields.io/badge/GitHub-zeeshankhan1981/pakistan--under--siege-blue.svg)](https://github.com/zeeshankhan1981/pakistan-under-siege)

A static documentary-style website documenting human rights violations in Pakistan since 2022.

## Data Integrity & Sourcing

All data on this website is real, research-backed, and transparently sourced. This includes:
- **Incidents of human rights violations** (see `data/violations.json`): Each incident is extracted from reputable reports, news articles, or human rights organizations, and includes full citations.
- **Statistical datasets** (see `data/protests.json`, `data/media.json`, `data/terrorism.json`): Yearly statistics are sourced from organizations such as Amnesty International, Reporters Without Borders (RSF), Committee to Protect Journalists (CPJ), South Asia Terrorism Portal (SATP), and others. All figures include direct links to their original sources.

**Transparency and Citation Standards:**
- Every incident and statistic is accompanied by a clear source or citation in the data files.
- The project maintains a high standard for accuracy, transparency, and credibility.

**How to Add New Data:**
- Always provide reputable sources for new incidents or statistics.
- See the `research/pakistan-hrv.md` file for the master list of sources and research notes.

## Project Philosophy

This website aims to provide a clear, impactful, and accessible record of human rights violations across Pakistan's regions. The design is inspired by documentary filmmaking, with a focus on visual storytelling and clear data presentation.

## Features

- Region-specific pages with detailed documentation
- Timeline of events
- Reports and documentation
- Responsive design for all devices
- **Democracy Under Siege Tracker** (2022–2025)
- **Democracy Health Index** chart with severity bands
- Critical alert banners for major incidents
- Search functionality

## New in 2025: Democracy Under Siege Tracker

**Democracy Under Siege Tracker (2022–2025):**
- The homepage now features a comprehensive timeline and tracker documenting the erosion of democracy in Pakistan from April 2022 to April 2025.
- Includes a visual timeline of major incidents (protests, crackdowns, censorship, election fraud, enforced disappearances, and attacks on press freedom) with severity ratings and sources.
- Features the **Democracy Health Index**: a Chart.js-powered interactive line chart visualizing the decline in democratic health (0–100 scale) over time, with color-coded severity bands and event highlights.
- All timeline events and index data are research-backed and transparently sourced. See `scripts/infographics.js` for implementation details.

**Critical Alert System:**
- Prominent alert banners and severity indicators highlight critical threats to democracy and human rights.

## Visual Design

The site features a documentary-style aesthetic with:
- Black and white color scheme with green and red accents
- Bold sans-serif headers and elegant serif body text
- Dramatic section dividers
- Card-based layout for incidents and reports
- Interactive charts and infographics

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/zeeshankhan1981/pakistan-under-siege.git
```

2. Start the development server:
```bash
./server.sh start
```

3. Visit http://localhost:8000 in your browser

## Adding New Content

### Adding New Incidents
1. Add the incident to `violations.json`
2. The incident will automatically appear on the relevant region page

### Adding New Reports
1. Place PDF reports in the `reports` directory
2. Update the region page with a link to the new report

## Maintaining the Democracy Tracker & Index

- To update the timeline or index, edit the relevant section in `index.html` and update the data arrays in `scripts/infographics.js`.
- Always cite reputable sources for new events or index changes.
- Severity ratings and color codes should follow the legend in the homepage tracker.

## Contributing

Please follow these guidelines when contributing:
1. Maintain the documentary-style design aesthetic
2. Ensure all content is properly sourced
3. Follow the existing content structure
4. Test changes across different screen sizes

## License

All rights reserved. Contact the project maintainer for permission to use the content.

## Structure

- `index.html`: Home page
- `about.html`: About the project
- `style/main.css`: (Tailwind built locally, this file optional)
- `scripts/search.js`: Lunr.js search logic
- `scripts/infographics.js`: Chart.js logic for Democracy Health Index and other infographics
- `data/violations.json`: Human rights violations data
- `regions/`: Pages for Balochistan, Sindh, KP, GB, Punjab
- `reports/`: PDF reports
- `assets/`: Images, icons

## Local Development

- Use any static server, e.g.:
  - `python3 -m http.server`
  - `npx live-server`

## Deployment

- Zip the folder and upload to Hostinger or push via FTP.
- Ensure `index.html` is in the root.

## Tech Stack

- HTML5, TailwindCSS (built locally), Vanilla JS, Chart.js, Lunr.js, Markdown/JSON for content

## License

MIT or Creative Commons (choose as appropriate)
