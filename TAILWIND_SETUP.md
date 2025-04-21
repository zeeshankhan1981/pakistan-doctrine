# Tailwind CSS Setup Documentation for Pakistan Under Siege

This document provides a comprehensive overview of how Tailwind CSS was configured and used in the Pakistan Under Siege project, including versioning, customizations, build process, and integration details.

---

## 1. Tailwind CSS Version
- **Tailwind Version:** ^3.4.1  
  (See `package.json` under `devDependencies`)
- **Installation:** Installed as a dev dependency via npm/yarn.

## 2. Project Structure & Integration
- **Tailwind is used via a local build, not CDN.**
- The main CSS output file is: `dist/output.css`
- **Source CSS:** `src/input.css` (contains Tailwind directives and any custom CSS)
- **HTML Coverage:** Tailwind is applied to all HTML files in the root, `/regions/`, `/components/`, and any other subdirectories.
- **JS Coverage:** Tailwind is also available for any scripts in `/scripts/`.

## 3. Build Process
- **Build Script:**
  ```bash
  npm run build:css
  # or
  npx tailwindcss -i ./src/input.css -o ./dist/output.css --minify
  ```
- This compiles Tailwind from `src/input.css` to a minified CSS file at `dist/output.css`.
- The `output.css` file is linked in all HTML files for styling.

## 4. Tailwind Configuration (`tailwind.config.js`)
- **Content Paths:**
  ```js
  content: [
    "./regions/**/*.html",
    "./components/**/*.html",
    "./scripts/**/*.js",
    "./**/*.html"
  ],
  ```
  Ensures Tailwind scans all relevant HTML and JS files for class usage.
- **Theme Extensions:**
  - **Fonts:**
    - `sans`: Uses 'Source Sans 3' as primary sans-serif.
    - `serif`: Uses 'Playfair Display' as primary serif.
  - **Colors:**
    - Custom green palette (shades 50–950) for branding and UI consistency.
  - **Shadows:**
    - `green` and `green-lg` for soft and deep green box shadows.
  - **Animations:**
    - `pulse-slow` for subtle attention effects.
- **Plugins:**
  - No additional Tailwind plugins are used by default.

## 5. Usage in HTML
- Each HTML file includes:
  ```html
  <link href="dist/output.css" rel="stylesheet">
  ```
- Tailwind utility classes are used extensively for layout, typography, color, spacing, and effects.
- Custom fonts (Inter, Roboto Slab) are loaded via Google Fonts in the HTML, but the Tailwind config sets defaults for fallback fonts.

## 6. Customization & Best Practices
- **Design Consistency:**
  - All region pages and components share the same Tailwind setup for a unified look.
  - Custom color palette and shadows reinforce the project's branding.
- **Performance:**
  - Only classes found in the specified content paths are included in the build, keeping CSS output minimal.
- **Accessibility:**
  - Tailwind's utility classes are leveraged for focus rings, contrasts, and responsive design.

## 7. Updating Tailwind
- To update Tailwind, modify the version in `package.json` and run:
  ```bash
  npm install
  ```
- Rebuild the CSS with the build script after any update.

---

## References
- [Tailwind CSS Documentation](https://tailwindcss.com/docs/installation)
- [Tailwind Release Notes](https://github.com/tailwindlabs/tailwindcss/releases)

---

**For any further customization or troubleshooting, refer to `tailwind.config.js` and the official Tailwind CSS docs.**
