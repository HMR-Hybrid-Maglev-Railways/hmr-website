import React from 'react';

// City coordinates (scaled for 16:9 viewBox: 160x90)
const cities = [
  { id: 'london', name: 'London', x: 28.8, y: 19.8 },
  { id: 'amsterdam', name: 'Amsterdam', x: 56, y: 16.2 },
  { id: 'brussels', name: 'Brussels', x: 51.2, y: 27 },
  { id: 'paris', name: 'Paris', x: 35.2, y: 37.8 },
  { id: 'berlin', name: 'Berlin', x: 88, y: 18 },
  { id: 'prague', name: 'Prague', x: 99.2, y: 31.5 },
  { id: 'warsaw', name: 'Warsaw', x: 131.2, y: 22.5 },
  { id: 'vienna', name: 'Vienna', x: 112, y: 43.2 },
  { id: 'frankfurt', name: 'Frankfurt', x: 72, y: 34.2 },
  { id: 'zurich', name: 'Zurich', x: 67.2, y: 49.5 },
  { id: 'munich', name: 'Munich', x: 88, y: 46.8 },
  { id: 'milan', name: 'Milan', x: 76.8, y: 61.2 },
  { id: 'rome', name: 'Rome', x: 92.8, y: 73.8 },
  { id: 'barcelona', name: 'Barcelona', x: 28.8, y: 67.5 },
  { id: 'madrid', name: 'Madrid', x: 8, y: 61.2 },
];

// Rail connections between cities
const routes = [
  ['london', 'amsterdam'],
  ['london', 'paris'],
  ['london', 'brussels'],
  ['amsterdam', 'berlin'],
  ['amsterdam', 'brussels'],
  ['amsterdam', 'frankfurt'],
  ['brussels', 'paris'],
  ['brussels', 'frankfurt'],
  ['paris', 'frankfurt'],
  ['paris', 'zurich'],
  ['paris', 'barcelona'],
  ['paris', 'madrid'],
  ['berlin', 'prague'],
  ['berlin', 'warsaw'],
  ['berlin', 'frankfurt'],
  ['prague', 'vienna'],
  ['prague', 'munich'],
  ['vienna', 'munich'],
  ['vienna', 'rome'],
  ['frankfurt', 'zurich'],
  ['frankfurt', 'munich'],
  ['zurich', 'milan'],
  ['zurich', 'munich'],
  ['milan', 'rome'],
  ['milan', 'munich'],
  ['barcelona', 'madrid'],
];

const getCityById = (id: string) => cities.find(c => c.id === id);

const EuropeNetwork: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <svg
        viewBox="0 0 160 90"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
        style={{ opacity: 0.25 }}
      >
        <defs>
          {/* Glow filter for cities */}
          <filter id="cityGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradient for train packets */}
          <linearGradient id="trainGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(205, 90%, 60%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(205, 90%, 70%)" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(205, 90%, 60%)" stopOpacity="0" />
          </linearGradient>

          {/* Animated train packet marker */}
          <circle id="trainPacket" r="0.4" fill="hsl(205, 90%, 70%)">
            <animate
              attributeName="opacity"
              values="0.6;1;0.6"
              dur="1s"
              repeatCount="indefinite"
            />
          </circle>
        </defs>

        {/* Rail routes */}
        <g className="routes">
          {routes.map(([fromId, toId], index) => {
            const from = getCityById(fromId);
            const to = getCityById(toId);
            if (!from || !to) return null;

            const pathId = `route-${fromId}-${toId}`;
            const pathLength = Math.hypot(to.x - from.x, to.y - from.y);
            const duration = 8 + (index % 6); // Varied durations for organic feel (slower)
            const delay = (index * 0.7) % 8; // Staggered starts

            return (
              <g key={pathId}>
                {/* Base route line */}
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="hsl(220, 30%, 20%)"
                  strokeWidth="0.25"
                  strokeLinecap="round"
                />

                {/* Animated path for train movement */}
                <path
                  id={pathId}
                  d={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
                  fill="none"
                  stroke="none"
                />

                {/* Moving train packet */}
                <circle r="0.6" fill="hsl(205, 90%, 65%)">
                  <animateMotion
                    dur={`${duration}s`}
                    repeatCount="indefinite"
                    begin={`${delay}s`}
                  >
                    <mpath href={`#${pathId}`} />
                  </animateMotion>
                  <animate
                    attributeName="opacity"
                    values="0;0.9;0.9;0"
                    keyTimes="0;0.1;0.9;1"
                    dur={`${duration}s`}
                    repeatCount="indefinite"
                    begin={`${delay}s`}
                  />
                </circle>

                {/* Return journey train (opposite direction) */}
                <circle r="0.5" fill="hsl(200, 85%, 55%)">
                  <animateMotion
                    dur={`${duration + 1}s`}
                    repeatCount="indefinite"
                    begin={`${delay + duration / 2}s`}
                    keyPoints="1;0"
                    keyTimes="0;1"
                    calcMode="linear"
                  >
                    <mpath href={`#${pathId}`} />
                  </animateMotion>
                  <animate
                    attributeName="opacity"
                    values="0;0.7;0.7;0"
                    keyTimes="0;0.1;0.9;1"
                    dur={`${duration + 1}s`}
                    repeatCount="indefinite"
                    begin={`${delay + duration / 2}s`}
                  />
                </circle>
              </g>
            );
          })}
        </g>

        {/* City nodes */}
        <g className="cities">
          {cities.map((city, index) => {
            const pulseDelay = index * 0.3;
            const isHub = ['paris', 'berlin', 'frankfurt', 'milan', 'vienna'].includes(city.id);
            const nodeSize = isHub ? 1.2 : 0.9;

            return (
              <g key={city.id}>
                {/* Outer pulse ring */}
                <circle
                  cx={city.x}
                  cy={city.y}
                  r={nodeSize}
                  fill="none"
                  stroke="hsl(205, 90%, 60%)"
                  strokeWidth="0.15"
                >
                  <animate
                    attributeName="r"
                    values={`${nodeSize};${nodeSize * 2.5};${nodeSize}`}
                    dur="4s"
                    begin={`${pulseDelay}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.6;0;0.6"
                    dur="4s"
                    begin={`${pulseDelay}s`}
                    repeatCount="indefinite"
                  />
                </circle>

                {/* City node */}
                <circle
                  cx={city.x}
                  cy={city.y}
                  r={nodeSize}
                  fill="hsl(205, 90%, 55%)"
                  filter="url(#cityGlow)"
                >
                  <animate
                    attributeName="opacity"
                    values="0.7;1;0.7"
                    dur="3s"
                    begin={`${pulseDelay * 0.5}s`}
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Inner bright core */}
                <circle
                  cx={city.x}
                  cy={city.y}
                  r={nodeSize * 0.4}
                  fill="hsl(200, 100%, 80%)"
                >
                  <animate
                    attributeName="opacity"
                    values="0.8;1;0.8"
                    dur="2s"
                    begin={`${pulseDelay * 0.3}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            );
          })}
        </g>
      </svg>

      {/* CSS for reduced motion preference */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          svg * {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default EuropeNetwork;
