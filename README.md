# Hybrid Maglev Railways - TU/e Student Team

A showcase website for the Hybrid Maglev Railways (HMR) student team at Eindhoven University of Technology (TU/e), featuring our work on retrofittable magnetic levitation railway technology.

## About the Project

Hybrid Maglev Railways is revolutionizing long-distance rail travel by developing a magnetic levitation system that can be retrofitted to existing European railway infrastructure. Our mission is to make rail travel the obvious choice for international journeys by combining high-speed maglev technology with the practicality of existing rail networks.

**Live Website:** [https://skyrimer.github.io/glide-on-rails/](https://skyrimer.github.io/glide-on-rails/)

## Key Features

- **Interactive Radar Visualization** - Dynamic comparison chart showing Maglev performance vs. Plane and Bus across multiple metrics
- **Responsive Design** - Optimized for all device sizes from mobile to desktop
- **Smooth Animations** - Powered by Framer Motion for engaging user interactions
- **Modern UI** - Built with shadcn-ui components and Tailwind CSS
- **Team Showcase** - Meet the multidisciplinary TU/e student team

## Technology Stack

This project is built with modern web technologies:

- **[Vite](https://vitejs.dev/)** - Fast build tool and development server
- **[React 18](https://react.dev/)** - UI component library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn-ui](https://ui.shadcn.com/)** - Beautifully designed components
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Lucide React](https://lucide.dev/)** - Icon library
- **React Router** - Client-side routing

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/skyrimer/glide-on-rails.git

# Navigate to project directory
cd glide-on-rails

# Install dependencies
npm install

# Start development server
npm run dev
```

The development server will start at `http://localhost:8080`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run deploy` - Build and deploy to GitHub Pages

## Deployment

This site is configured for deployment to GitHub Pages:

```bash
# Build and deploy in one command
npm run deploy
```

The site will be automatically built and pushed to the `gh-pages` branch, making it available at the GitHub Pages URL.

## Project Structure

```
glide-on-rails/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # shadcn-ui components
│   │   ├── HeroSection.tsx
│   │   ├── MissionSection.tsx
│   │   ├── TechnologySection.tsx
│   │   ├── TeamSection.tsx
│   │   └── ...
│   ├── pages/              # Route pages
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── App.tsx             # Root component
│   └── main.tsx            # Application entry point
├── public/                 # Static assets
├── index.html             # HTML template
├── vite.config.ts         # Vite configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── package.json           # Project dependencies
```

## Key Components

### Interactive Mission Control Visualization
The `MissionSection` component features a fully interactive radar chart that compares transport modes across multiple metrics:
- Hover over data points to see exact values
- Click metric icons to highlight cross-mode comparisons
- Toggle transport modes on/off
- Expandable metric cards with detailed breakdowns

### Responsive Navigation
Smart navigation with smooth scrolling to sections and mobile-friendly menu.

### Team Profiles
Showcases the multidisciplinary TU/e student team with hexagonal avatars and discipline badges.

## About TU/e

This project is developed by students at [Eindhoven University of Technology (TU/e)](https://www.tue.nl/), one of Europe's leading technical universities.

## Contributing

This is a student team project. If you're a TU/e student interested in joining the Hybrid Maglev Railways team, check out the "Join Us" section on our website.

## License

© 2025 HMR — Hybrid Maglev Railways. All rights reserved.

## Contact

For inquiries about the project or team, please visit our website or reach out through the contact information provided there.

---

**Built with ❤️ by the HMR Team at TU/e**
