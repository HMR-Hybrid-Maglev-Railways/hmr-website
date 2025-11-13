# hmr-website

Static website for Team HMR — Hybrid Maglev Railways.

## Project structure

```
hmr-website/
├── index.html            # Main page (pure static)
├── css/
│   └── style.css         # Site styles (tokens, components, effects)
├── js/
│   └── main.js           # Site logic (animations, tabs, charts)
└── images/
    ├── placeholder-management.svg
    ├── placeholder-external.svg
    ├── placeholder-propulsion.svg
    ├── placeholder-levitation.svg
    ├── placeholder-rail.svg
    ├── news-tue-contest.svg
    └── news-prototype.svg
```

## External libraries at runtime
- Tailwind CSS via CDN: the page loads `https://cdn.tailwindcss.com` in `<head>` to provide utility classes. Note: Tailwind’s console warning about CDN usage in production is expected.
- No other external libraries are required. Charts are rendered with a lightweight custom Canvas routine (no Chart.js). Fonts use the system stack for offline resilience.

## Development

This is a purely static site. You can open `index.html` directly in a browser (file://) or serve the folder with any static server if you prefer.

Examples:

- Python 3: `python3 -m http.server 8000`

Then visit: `http://localhost:8000` (optional; not required).

## Notes

- Design tokens live in `css/style.css` under `:root`:
  - `--accent-color` (primary), `--accent-alt` (companion), `--accent-hover`, `--accent-gradient`, `--accent-glow`.
  - Surfaces: `--primary-bg`, `--secondary-bg`; Text: `--text-light`, `--text-muted`; `--border-color`.
- Custom utility helpers and components live in `css/style.css`:
  - Theming helpers: `text-accent-color`, `bg-accent-color`, `border-accent-color`, `text-text-light`, `text-text-muted`, `bg-primary-bg`, `bg-secondary-bg`, `border-border-color`.
  - Effects: `text-gradient-accent`, `accent-glow`, `btn-outline-accent`, `glow-button`.
  - Layout aids: `.h-92vh`, `.max-w-92vw`, and a global Grid centering override (`.grid { justify-content: center; justify-items: center; }`). Use `grid-no-center` to opt out for a specific grid.
- Background: an animated “aurora field” is rendered via `body::before` + subtle grain in `body::after`.
  - Motion respects `prefers-reduced-motion`; set to reduce to freeze animation.
  - To tweak colors, update `--accent-*` tokens; to disable animation entirely, remove the `aurora-shift` keyframes or override `body::before { animation: none; }`.
- Charts are rendered with a small custom Canvas function in `js/main.js` (no external library).

## Navbar spacing
- Desktop nav links use a dedicated `nav-link` utility that increases horizontal padding and ensures full‑height vertical alignment in the fixed navbar.  
- Mobile menu items use `nav-link-mobile` to provide ≥48px tap targets.

## Performance notes
- Images: all non‑critical images (e.g., subteam photos, news cards) use `loading="lazy"` and `decoding="async"`, plus explicit `width/height` to reduce layout shifts.
- Charts: rendered on demand when canvases enter the viewport.

## Notes about Tailwind CDN
- The CDN build is convenient and keeps this site tool‑free, but Tailwind’s console warns against CDN usage in production deployments. This is expected given the requested setup.

## Developer tips
- If you need to disable animations globally for debugging, add a `no-anim` class (or enable OS/browser “Reduce Motion”).  
- When adding new sections with grids, remember grids are centered by default; add `grid-no-center` to opt out.
