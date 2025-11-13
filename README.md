# hmr-website

Static website for Team HMR — Hybrid Maglev Railways.

## Project structure

```
hmr-website/
├── index.html         # Main page
├── css/
│   └── style.css      # Extracted styles (was inline in index.html)
├── js/
│   └── main.js        # Extracted scripts (was inline in index.html)
└── images/
    └── .gitkeep       # Placeholder; put site images here
```

External libraries are loaded via CDN:
- Tailwind CSS via `https://cdn.tailwindcss.com`
- Chart.js via `cdnjs`
- Google Fonts (Inter, Roboto Mono)

## Development

This is a purely static site. You can open `index.html` directly in a browser or serve the folder with any static server.

Examples:

- Python 3: `python3 -m http.server 8000`
- Node (serve): `npx serve .`

Then visit: `http://localhost:8000`

## Notes

- Design tokens live in `css/style.css` under `:root`:
  - `--accent-color` (primary), `--accent-alt` (companion), `--accent-hover`, `--accent-gradient`, `--accent-glow`.
  - Surfaces: `--primary-bg`, `--secondary-bg`; Text: `--text-light`, `--text-muted`; `--border-color`.
- Utility classes for consistent theming:
  - `text-accent-color`, `bg-accent-color`, `border-accent-color`, `text-text-light`, `text-text-muted`, `bg-primary-bg`, `bg-secondary-bg`, `border-border-color`.
  - Gradient text: `text-gradient-accent`; Glow: `accent-glow`; Outline button: `btn-outline-accent`.
  - Hover shims for Tailwind-like usage: `hover:text-accent-color`, `hover:bg-border-color`.
- Background: an animated “aurora field” is rendered via `body::before` + subtle grain in `body::after`.
  - Motion respects `prefers-reduced-motion`; set to reduce to freeze animation.
  - To tweak colors, update `--accent-*` tokens; to disable animation entirely, remove the `aurora-shift` keyframes or override `body::before { animation: none; }`.
- Scripts in `js/main.js` rely on Chart.js being available; keep the Chart.js CDN script before `js/main.js` in `index.html`.
- Grid layout: all Tailwind `grid` containers are centered by default via CSS (`justify-content: center; justify-items: center;`). To opt out for a specific grid, add the `grid-no-center` class.
