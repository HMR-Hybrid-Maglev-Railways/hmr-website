# Hybrid Maglev Railways - TU/e Student Team

A showcase website for the Hybrid Maglev Railways (HMR) student team at Eindhoven University of Technology (TU/e), featuring our work on retrofittable magnetic levitation railway technology.

## About the Project

Hybrid Maglev Railways is revolutionizing long-distance rail travel by developing a magnetic levitation system that can be retrofitted to existing European railway infrastructure. Our mission is to make rail travel the obvious choice for international journeys by combining high-speed maglev technology — up to 600 km/h — with the practicality of existing rail networks.

**Live Website:** [https://hybridmaglevrailways.nl/](https://hybridmaglevrailways.nl/)

## Key Features

- **Animated Hero** — Speed counter animating to 600 km/h on scroll, with typewriter text effect
- **Interactive Phase System** — 3-card technology walkthrough: conventional rolling → hybrid transition → full levitation
- **Interactive Radar Visualization** — Dynamic comparison chart showing Maglev performance vs. Plane and Bus across multiple metrics
- **Team Showcase** — Multidisciplinary TU/e student team with profiles and discipline badges
- **Recruitment Section** — Discipline-specific recruitment info for engineering applicants
- **Responsive Design** — Optimized for all device sizes from mobile to desktop
- **Smooth Animations** — Powered by Framer Motion with staggered reveals and micro-interactions
- **Dark Theme** — Cohesive deep navy aesthetic with HMR blue gradient accents

## Technology Stack

- **[Vite](https://vitejs.dev/)** + **[React SWC Plugin](https://github.com/vitejs/vite-plugin-react-swc)** — Fast build tool with SWC transpilation
- **[React 18](https://react.dev/)** — UI component library
- **[TypeScript](https://www.typescriptlang.org/)** — Type-safe JavaScript
- **[React Router DOM v6](https://reactrouter.com/)** — Client-side routing
- **[Tailwind CSS](https://tailwindcss.com/)** — Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** — Animation library
- **[Lucide React](https://lucide.dev/)** — Icon library
- **[clsx](https://github.com/lukeed/clsx)** + **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** — Class utilities

**Typography (Variable Fonts via [Fontsource](https://fontsource.org/)):**
- **Space Grotesk** — Headings
- **Inter** — Body text
- **JetBrains Mono** — Technical / code-style text

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm, yarn, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/skyrimer/hmr-website.git

# Navigate to project directory
cd hmr-website

# Install dependencies
npm install

# Start development server
npm run dev
```

The development server will start at `http://localhost:8080`.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Production build |
| `npm run build:dev` | Development build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run deploy` | Build and deploy to GitHub Pages |

## Deployment

This site is configured for deployment to GitHub Pages:

```bash
npm run deploy
```

The site will be built and pushed to the `gh-pages` branch automatically.

## Project Structure

```
hmr-website/
├── src/
│   ├── components/
│   │   ├── ui/                       # Shared UI primitives
│   │   ├── Navbar.tsx                # Fixed nav with smooth-scroll & active section tracking
│   │   ├── HeroSection.tsx           # Animated speed counter + typewriter headline
│   │   ├── HybridMaglevSection.tsx   # 3-phase interactive technology walkthrough
│   │   ├── VisionSection.tsx         # Project vision & values
│   │   ├── MissionSection.tsx        # Interactive radar chart comparing transport modes
│   │   ├── TeamSection.tsx           # Team profiles with discipline badges
│   │   ├── RecruitmentSection.tsx    # Discipline-specific recruitment information
│   │   ├── ContactSection.tsx        # Contact form
│   │   └── Footer.tsx                # Footer with links
│   ├── pages/
│   │   ├── Index.tsx                 # Main landing page (all sections)
│   │   └── NotFound.tsx              # 404 page
│   ├── lib/
│   │   └── utils.ts                  # Utility functions (smooth scroll, cn helper)
│   ├── App.tsx                       # Root component with React Router
│   ├── main.tsx                      # Application entry point
│   └── index.css                     # Global styles, CSS variables, custom utilities
├── public/
│   ├── images/                       # WebP phase images
│   ├── logo/                         # HMR logo assets
│   ├── team_photos/                  # Team member photos (WebP)
│   ├── favicon.ico
│   └── robots.txt
├── index.html                        # HTML template with SEO & Open Graph meta
├── vite.config.ts                    # Vite configuration (port 8080, @ alias)
├── tailwind.config.ts                # Tailwind theming (dark mode, custom palette, animations)
├── tsconfig.json                     # TypeScript configuration
└── package.json                      # Dependencies and scripts
```

## Design System

The site uses a custom Tailwind theme with CSS variable–driven design tokens:

- **Background**: Deep navy (`hsl(230 60% 6%)`)
- **Brand accent**: HMR blue (`hsl(200 90% 65%)` → `hsl(225 80% 40%)`)
- **Glass panels**: Backdrop-blur overlays for depth
- **Custom utilities**: `.text-gradient-hmr`, `.bg-gradient-hmr`, `.glow-blue`, `.glass-panel`

## About TU/e

This project is developed by students at [Eindhoven University of Technology (TU/e)](https://www.tue.nl/), one of Europe's leading technical universities.

## Contributing

This is a student team project. If you're a TU/e student interested in joining the Hybrid Maglev Railways team, check out the "Join Us" section on our website.

## Contact

For inquiries about the project or team, please visit our website or reach out through the contact information provided there.

---

**Built with by the HMR Team at TU/e**
