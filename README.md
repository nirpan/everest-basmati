# everest-basmati

Website for Basmati Nepalese and Indian Restaurant, Southampton: https://everestbasmati.co.uk

A single static page. No build step, no frameworks.

- `index.html` – the page
- `css/style.css` – all styles
- `js/main.js` – sets the footer year and draws the map once it scrolls into view
- `vendor/maplibre/` – [MapLibre GL JS](https://maplibre.org) 5.24.0, self-hosted. (5.x is the last line with a classic-script build; 6.x is ES-module only, which browsers refuse to load from a `file://` page.) The map uses [OpenFreeMap](https://openfreemap.org) tiles, which are free for commercial use with no API key and no usage limits. (OpenStreetMap's own tile server was tried first, but it blocks visitors on some networks.)
- `images/` – `hero-*` are the optimised shopfront photo, `gallery-*` are the photos shown in the grid
- `pdf/` – menus
- `package.json` – no dependencies and no build step; it only pins the Node.js version Vercel uses (`engines.node`). Vercel refuses to deploy when the project's Node.js version is retired, and this setting overrides the one in the Vercel dashboard.

## Common edits

- **Change the menu**: add the new PDF to `pdf/` and update the two links in `index.html` (search for `pdf/`).
- **Show or hide a notice** (closures, holidays): in `index.html` find `<aside class="notice"` and edit the text. Add a `hidden` attribute to the `<aside>` to hide it. There is a matching one-line note in the Opening hours box (`hours__closure`); update or delete both.
- **Favicon**: `favicon.svg` is the source. `favicon.ico` and `apple-touch-icon.png` are rendered from it.
- **Opening hours**: edit the `Opening hours` list in `index.html`, and the `openingHoursSpecification` block near the top so search engines match.

## Preview locally

```
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deployment

1. Clone the repository locally.
2. Make your changes and push to the master branch.
3. Vercel deploys the changes automatically.

The domain `everestbasmati.co.uk` is attached to the `everest-basmati` project in Vercel (Project Settings, Domains), so every production deployment picks it up. It used to be an alias bound to one specific deployment through the old `now.json` file, which Vercel no longer reads; that is why a successful deploy once left the old site live. `www.everestbasmati.co.uk` is served by the separate `everestbasmati-redirect` project, which redirects to the main domain.

If a deployment fails straight away with a Node.js version error, the project's Node.js version in the Vercel dashboard is out of date. `package.json` overrides it, so bump `engines.node` there to a version Vercel still supports.
