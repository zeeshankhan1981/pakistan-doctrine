# Pakistan Under Siege – Roadmap

_Last updated: 2025-04-17_

This roadmap outlines the next steps to make this website a robust, authoritative, and up-to-date information resource on human rights violations in Pakistan.

---

## 1. Data & Content Expansion

- **Broaden Coverage:**
  - Add new incidents and cases for all regions, especially underrepresented ones (e.g., gender-based violence, digital rights, minority persecution).
  - Expand categories to include internet shutdowns, attacks on journalists, and other relevant topics.
- **Regular Updates:**
  - Monitor news and NGO reports for new incidents and update datasets monthly.
  - Add a "last updated" field to each dataset for transparency.
- **Source Transparency:**
  - Ensure every data point and incident includes a credible source link.
  - Create a dedicated "Sources" page listing all organizations and data providers.
- **Survivor Testimonies & Multimedia:**
  - Curate more survivor quotes, stories, and testimonies from reputable sources.
  - Embed or link to relevant videos, podcasts, and photo essays.

## 2. Data Automation & Sourcing

- **Automate Data Collection:**
  - Develop scripts to fetch or scrape data from trusted sources (e.g., HRCP, Amnesty, RSF, Dawn, UN, government portals).
  - Use APIs where available for news and open data.
- **Data Validation:**
  - Implement scripts to check for missing sources, date inconsistencies, and duplicate events.

## 3. Information Architecture & Search

- **Advanced Search & Filters:**
  - Add filtering by region, year, violation type, and source.
  - Improve search UX and result relevance.
- **Timeline Visualization:**
  - Implement an interactive timeline for major events and trends.
- **Cross-Linking:**
  - Link incidents to related reports, region pages, and media coverage.

## 4. Visual & UX Enhancements

- **Infographics & Charts:**
  - Add more visualizations (e.g., trends in disappearances, protests, media freedom).
- **Mobile Optimization:**
  - Audit and improve mobile UX and responsiveness.
- **Accessibility:**
  - Ensure the site meets accessibility standards (WCAG compliance).

## 5. Community & Contribution

- **Contribution Guide:**
  - Expand documentation for contributors (how to add data, reports, translations).
- **Localization:**
  - Plan for translations (Urdu, regional languages).
- **Issue Tracker:**
  - Use GitHub Issues for suggestions, errors, and new data requests.

## 6. Transparency & Trust

- **Changelog:**
  - Maintain a public changelog of updates and data changes.
- **Data Download:**
  - Allow users to download datasets (CSV/JSON) for research.
- **Ethical Statement:**
  - Add a page on data ethics, privacy, and editorial policy.

## 7. Outreach & Impact

- **Newsletter/Updates:**
  - Allow users to subscribe for updates.
- **Shareable Content:**
  - Add social media cards and share buttons for incidents and reports.
- **Engagement:**
  - Highlight ways to help, donate, or connect with advocacy groups.

## 8. Integration of Research Content (2025)

With the addition of comprehensive, source-backed content in `/research/pakistan-hrv.md` and `/research/pakistan-hrv.html`, the following steps will ensure this real content is systematically integrated throughout the website:

### A. Region Pages (`/regions/*.html`)
- **Populate with Real Incidents:**
  - Extract incidents, statistics, and trends for each province/year from the research file.
  - Update region JSON data files (e.g., `data/violations.json`) to reflect the real cases, dates, and sources.
  - Ensure each region page displays:
    - Chronological timeline of major events (with year/incident headings)
    - Category breakdowns (enforced disappearances, extrajudicial killings, etc.)
    - Direct citations and hyperlinks to sources for each event (use footnotes or inline links)
    - Notable survivor testimonies or quotes (with attribution)
    - Section for international responses (UN, Amnesty, HRW, etc.)

### B. Homepage (`index.html`)
- **Featured Reports & Timeline:**
  - Replace placeholders with real, high-impact events from the research file (e.g., major protests, massacres, landmark court cases).
  - Add citations and source links for every featured report/event.
- **Infographics Section:**
  - Update data files (e.g., `violations.json`, `protests.json`, `migration.json`) with real statistics from the research.
  - Ensure all charts (enforced disappearances, protests, migration, etc.) use these updated numbers.
  - Add chart footnotes/sources directly under each infographic (auto-generated from data sources in research file).
- **Stories & Reports:**
  - Curate and display real survivor testimonies, media stories, and report links from the research.

### C. Reports Section (`/reports/`)
- **PDF & HTML/MD Reports:**
  - Add the research markdown and HTML files to the reports section for direct download/viewing.
  - Link to these files from both the homepage and region pages.
  - Ensure all reports are properly attributed and dated.

### D. Data Files (`/data/*.json`)
- **Synchronize Data:**
  - Parse the research markdown to extract structured data (incidents, dates, categories, sources) and update all relevant JSON files.
  - Ensure each incident in the JSON includes a `sources` array with URLs and a `summary` field for context.
  - Add new fields as needed (e.g., `international_response`, `testimony`, `media_coverage`).

### E. Citations & Source Transparency
- **Inline & Footnote Citations:**
  - For every statistic, quote, or event, provide a direct link to the original source (as in the research file).
  - Consider adding a citation hover or footnote system for better UX.
- **Dedicated Sources Page:**
  - Aggregate all unique sources from the research file into a `/SOURCES.md` page.
  - Link to this from the main navigation and each region page.

### F. Infographics & Visuals
- **Charts & Figures:**
  - Use real numbers from the research for all charts (disappearances, killings, protests, etc.).
  - Add new charts if new data types are present (e.g., forced conversions, attacks on journalists).
  - Ensure every chart has a visible source/citation below it (auto-generated if possible).

### G. Search & Archive
- **Improve Search Index:**
  - Rebuild the search index (`scripts/search.js`) to include new events, categories, and sources from the research.
  - Ensure advanced filters (by year, region, category, source) are populated with real values.

### H. Ongoing Content Update Process
- **Content Pipeline:**
  - Establish a workflow for regularly extracting new incidents from the research file and updating the site’s data and pages.
  - Document the process for contributors (see CONTRIBUTING.md).

---

**Milestone:**
- By integrating the research content as outlined, the site will transition from a demo/static archive to a living, authoritative, and fully sourced record of human rights violations in Pakistan, with transparency and credibility at its core.

---

## Immediate Next Steps (Q2 2025)

1. Expand and update all data files with new incidents and sources from 2024–2025.
2. Add more survivor quotes and multimedia content.
3. Develop scripts for automated data collection and validation.
4. Add a "Sources" and "Changelog" page.
5. Begin work on advanced search and filter features.
6. Improve mobile UX and accessibility.

---

_This roadmap will be revisited and updated regularly to reflect progress and new priorities._
