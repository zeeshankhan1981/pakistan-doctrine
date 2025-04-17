# Pakistan Under Siege

[![GitHub](https://img.shields.io/badge/GitHub-zeeshankhan1981/pakistan--under--siege-blue.svg)](https://github.com/zeeshankhan1981/pakistan-under-siege)

A static documentary-style website documenting human rights violations in Pakistan since 2022.

## Project Philosophy

This website aims to provide a clear, impactful, and accessible record of human rights violations across Pakistan's regions. The design is inspired by documentary filmmaking, with a focus on visual storytelling and clear data presentation.

## Features

- Region-specific pages with detailed documentation
- Timeline of events
- Search functionality
- Reports and documentation
- Responsive design for all devices

## Visual Design

The site features a documentary-style aesthetic with:
- Black and white color scheme with green accents
- Bold sans-serif headers and elegant serif body text
- Dramatic section dividers
- Card-based layout for incidents and reports

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
- `style/main.css`: (Tailwind via CDN, this file optional)
- `scripts/search.js`: Lunr.js search logic
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

- HTML5, TailwindCSS (CDN), Vanilla JS, Lunr.js, Markdown/JSON for content

## License

MIT or Creative Commons (choose as appropriate)
