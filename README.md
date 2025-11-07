# Constructa Template

Constructa is a modern, multi-page construction company website template crafted with consistent spacing, typography, and layout standards. It includes reusable HTML includes, modular CSS, and light JavaScript enhancements to accelerate project launches.

## Features

- 14 production-ready HTML pages covering services, projects, team, blog, contact, FAQ, careers, client login, dashboard, and legal content
- Strict spacing system (8/16/24/32/48/64/96px) with 1200px container and 80px section padding
- Typography built on the "Poppins" family with clearly defined heading scales and body copy
- Flexbox navigation, card layouts, and CSS Grid galleries for responsive structure
- Modular CSS split into `style.css`, `custom.css`, and `responsive.css`
- JavaScript modules for navigation toggles, counters, accordions, preloader, modals, and vendor integrations
- Prepared vendor folders for Bootstrap, AOS, Isotope, and Owl Carousel assets

## Project Structure

```
constructa-template/
|- assets/
|  |- css/
|  |- js/
|  |- images/
|  |- fonts/
|  |- vendors/
|- includes/
|- docs/
|- demo/
|- *.html
```

## Usage

1. Replace placeholder imagery in `assets/images/` with branded assets using the suggested search prompts in `docs/credits.txt`.
2. Update navigation links in `includes/header.html` if you add or rename pages.
3. Include vendor CSS/JS files inside the `<head>` and before `</body>` where required (AOS, Isotope, Owl Carousel, etc.).
4. Customize colors and spacing via CSS variables in `assets/css/style.css`.
5. Run a production build pipeline or deploy the static files to your hosting environment.

## Local Build Preview

Server-side includes in the pages are resolved during a build step. To generate fully assembled HTML in `dist/`:

```
npm run build
```

Then serve the `dist/` folder with any static server (for example `npx serve dist`) to preview pages with the header, footer, and other includes in place.

## Scripts

Three JavaScript bundles are provided:

- `assets/js/main.js`: Core interactions (navigation, back-to-top, modals, preloader)
- `assets/js/custom.js`: Counters, accordion behaviors, and reusable utilities
- `assets/js/plugins.js`: Optional hooks for third-party libraries

## License

This template is provided for commercial and personal projects. Attribution to Constructa is appreciated but not required.


