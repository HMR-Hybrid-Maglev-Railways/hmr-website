import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Target, CheckCircle2, Wrench, Database, Camera, Plane, Bus, Train, Gauge, Users, Leaf, Clock, Crosshair, Briefcase } from "lucide-react";

type TransportMode = "Plane" | "Bus" | "Maglev";

interface MetricData {
  id: string;
  metric: string;
  shortName: string;
  unit: string;
  icon: typeof Gauge;
  values: Record<TransportMode, number>;
  inverted?: boolean;
}

const metricsData: MetricData[] = [
  {
    id: "speed",
    metric: "Average Speed",
    shortName: "Speed",
    unit: "km/h",
    icon: Gauge,
    values: { Plane: 800, Bus: 90, Maglev: 600 },
  },
  {
    id: "capacity",
    metric: "Capacity",
    shortName: "Capacity",
    unit: "pax",
    icon: Users,
    values: { Plane: 180, Bus: 50, Maglev: 400 },
  },
  {
    id: "emissions",
    metric: "CO₂ Emissions",
    shortName: "CO₂",
    unit: "g/pax/km",
    icon: Leaf,
    values: { Plane: 285, Bus: 68, Maglev: 14 },
    inverted: true,
  },
  {
    id: "boarding",
    metric: "Boarding Time",
    shortName: "Boarding",
    unit: "min",
    icon: Clock,
    values: { Plane: 120, Bus: 5, Maglev: 10 },
    inverted: true,
  },
];

const transportModes: {
  name: TransportMode;
  icon: typeof Train;
  color: string;
  bgColor: string;
  lightColor: string;
}[] = [
  {
    name: "Maglev",
    icon: Train,
    color: "hsl(205, 90%, 60%)",
    bgColor: "bg-[hsl(205,90%,60%)]",
    lightColor: "hsl(205, 90%, 70%)"
  },
  {
    name: "Plane",
    icon: Plane,
    color: "rgb(245, 158, 11)",
    bgColor: "bg-amber-500",
    lightColor: "rgb(251, 191, 36)"
  },
  {
    name: "Bus",
    icon: Bus,
    color: "rgb(20, 184, 166)",
    bgColor: "bg-teal-500",
    lightColor: "rgb(94, 234, 212)"
  },
];

const teamObjectives = [
  {
    id: "ENG",
    teamName: "Engineering",
    badge: "ENG",
    badgeColor: "badge-me",
    accentColor: "hsl(25, 95%, 53%)", // Orange
    icon: Wrench,
    lead: "Lars Hilkens",
    memberCount: 7,
    status: "active",
    tagline: "Designing, Building, and Testing the Hybrid Maglev System",
    photo: "technical_1.webp",
    description:
      "Our engineering team combines mechanical and electrical expertise to bring the hybrid maglev concept from theory to reality. From electromagnetic suspension design and power electronics to hands-on prototyping and computational simulation, we cover the full spectrum of disciplines needed to make frictionless rail travel work.",
    responsibilities: [
      "Electromagnetic levitation & propulsion system design",
      "Power electronics and real-time control systems",
      "Prototype fabrication, assembly & testing",
      "Computational simulation & numerical modelling",
    ],
    currentFocus: "Building and testing a scale prototype of the hybrid maglev system, integrating propulsion, levitation, and control subsystems into a unified demonstrator.",
    tools: ["SolidWorks", "ANSYS", "MATLAB/Simulink", "KiCad", "3D Printing", "Embedded C"],
    subsections: [
      {
        title: "Prototyping",
        photo: "technical_1.webp",
        responsibilities: [
          "Translate abstract physics concepts into physical test setups",
          "Gain hands-on experience with microcontrollers, sensors, and 3D-printed/machined parts",
          "Build and solder the electronic circuit or screw and assemble the track and train",
        ],
        currentGoals: "Constructing a functional scale-model track and train assembly that demonstrates basic electromagnetic interaction, with integrated sensor feedback for initial validation tests.",
      },
      {
        title: "Propulsion Design",
        photo: "technical_1.webp",
        responsibilities: [
          "Design and develop a linear propulsion system",
          "Model how the train behaves as it is moving along the track",
          "Develop a control system that can accurately control the train's movement",
        ],
        currentGoals: "Finalizing the linear motor topology and running coupled electromagnetic-mechanical simulations to validate thrust output against vehicle mass and drag profiles.",
      },
      {
        title: "Levitation Design",
        photo: "technical_1.webp",
        responsibilities: [
          "Manage forces and unstable dynamics to keep the train floating above the track",
          "Design the electromagnetic systems necessary to keep trains suspended safely above the track",
          "Develop control loops using real-time sensor data for accurate and fast position adjustments",
        ],
        currentGoals: "Achieving stable levitation at rest with a PID control loop, tuning gap-sensor feedback to maintain a consistent air gap under varying load conditions.",
      },
      {
        title: "Theoretical & Numerical Modelling",
        photo: "technical_1.webp",
        responsibilities: [
          "Transform the system dynamics into computational simulations",
          "Model the complex kinematics of the train interacting with electromagnetic fields",
          "Use advanced numerical tools to test and refine our propulsion and levitation concepts",
        ],
        currentGoals: "Building a multi-physics FEA model that couples electromagnetic field analysis with structural dynamics to predict system behavior before physical prototyping.",
      },
    ],
  },
  {
    id: "DS",
    teamName: "Data Science & Software",
    badge: "DS",
    badgeColor: "badge-ds",
    accentColor: "#06b6d4", // Cyan
    icon: Database,
    lead: "Kirill Chekmenev",
    memberCount: 3,
    status: "active",
    tagline: "Using Data to Prove Feasibility",
    description:
      "Our data science team builds the analytical backbone of the project. We're developing the Railway Network Analysis Tool—an interactive platform that models deployment scenarios, costs, and benefits across the European rail network.",
    responsibilities: [
      "Railway network graph modeling",
      "Cost-benefit analysis algorithms",
      "Interactive web visualization platform",
      "Simulation of deployment scenarios",
      "Data collection & infrastructure mapping"
    ],
    photo: "rna_cringe_2.webp",
    currentFocus: "Building an interactive web application that allows stakeholders to explore hybrid maglev deployment scenarios based on publicaly available open-source databases.",
    tools: ["Python", "Data Analysis", "OpenStreetMap", "Software Development"],
  },
  {
    id: "OPS",
    teamName: "Operations & Outreach",
    badge: "OPS",
    badgeColor: "badge-ie",
    accentColor: "hsl(160, 60%, 45%)", // Teal
    icon: Users,
    lead: "Kirill Chekmenev",
    memberCount: 3,
    status: "active",
    tagline: "Connecting Vision to Reality",
    description:
      "The operations team keeps the project on track (pun intended). We handle project coordination, stakeholder communications, recruitment, and public relations to ensure our technical achievements reach the right audiences.",
    responsibilities: [
      "Stakeholder & sponsor relations",
      "Team recruitment & onboarding",
      "Social media & content creation",
      "Event coordination & presentations",
      "Internal events organizing",
    ],
    photo: "pr_3.webp",
    currentFocus: "Expanding the team through targeted recruitment at TU/e, building partnerships with rail industry stakeholders, and making our engineers' lives better.",
    tools: ["Public/External Relations", "Social Media", "Stakeholder Interactions"],
  },
];

// Helper function to normalize values for radar chart (0-100 scale)
const normalizeValue = (value: number, metric: MetricData) => {
  const values = Object.values(metric.values);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const BUFFER = 10; // Minimum 10% for worst performer so it's visible

  if (metric.inverted) {
    // For inverted metrics, lower is better, so invert the scale
    return BUFFER + ((max - value) / (max - min)) * (100 - BUFFER);
  }
  return BUFFER + (value / max) * (100 - BUFFER);
};

// Helper to get winner for a metric
const getWinner = (metric: MetricData): TransportMode => {
  const entries = Object.entries(metric.values) as [TransportMode, number][];
  if (metric.inverted) {
    return entries.reduce((min, curr) => curr[1] < min[1] ? curr : min)[0];
  }
  return entries.reduce((max, curr) => curr[1] > max[1] ? curr : max)[0];
};

const InteractiveComparison = () => {
  const [activeMode, setActiveMode] = useState<TransportMode | null>(null);
  const [expandedMetric, setExpandedMetric] = useState<string | null>(null);
  const [visibleModes, setVisibleModes] = useState<Set<TransportMode>>(
    new Set(["Maglev", "Plane", "Bus"])
  );
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);
  const [hoveredPolygon, setHoveredPolygon] = useState<TransportMode | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const toggleMode = (mode: TransportMode) => {
    const newVisible = new Set(visibleModes);
    if (newVisible.has(mode)) {
      if (newVisible.size > 1) newVisible.delete(mode);
    } else {
      newVisible.add(mode);
    }
    setVisibleModes(newVisible);
  };

  // SVG configuration
  const SVG_SIZE = 360;
  const CENTER = SVG_SIZE / 2; // 180
  const MAX_RADIUS = 130;
  const LABEL_RADIUS = 160;

  // Generate radar chart points
  const getRadarPoints = (mode: TransportMode) => {
    return metricsData.map((metric, i) => {
      const angle = (i * 2 * Math.PI) / metricsData.length - Math.PI / 2;
      const value = normalizeValue(metric.values[mode], metric);
      const radius = (value / 100) * MAX_RADIUS;
      return {
        x: CENTER + radius * Math.cos(angle),
        y: CENTER + radius * Math.sin(angle),
        angle,
        metric,
      };
    });
  };

  const getRadarPath = (mode: TransportMode) => {
    const points = getRadarPoints(mode);
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 p-8 md:p-10"
    >
      <div className="grid lg:grid-cols-[1fr,1.2fr] gap-8 items-start">
        {/* Left: Radar Chart */}
        <div className="space-y-6">
          <div className="text-center lg:text-left">
            <h3 className="font-heading text-xl font-semibold mb-2">
              Transport Mode Comparison
            </h3>
            <p className="text-sm text-muted-foreground">
              Click transport modes to toggle visibility
            </p>
          </div>

          {/* Radar Chart */}
          <div className="relative w-full max-w-sm mx-auto aspect-square">
            <svg viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`} className="w-full h-full">
              {/* Grid circles */}
              {[20, 40, 60, 80, 100].map((percent) => (
                <g key={percent}>
                  <circle
                    cx={CENTER}
                    cy={CENTER}
                    r={(percent / 100) * MAX_RADIUS}
                    fill="none"
                    stroke="hsl(var(--border))"
                    strokeWidth="1"
                    opacity={0.3}
                  />
                  {/* Percentage label */}
                  <text
                    x={CENTER + 5}
                    y={CENTER - (percent / 100) * MAX_RADIUS + 5}
                    className="fill-muted-foreground font-mono-tech text-[8px]"
                    opacity={0.5}
                  >
                    {percent}%
                  </text>
                </g>
              ))}

              {/* Grid lines to each metric */}
              {metricsData.map((_, i) => {
                const angle = (i * 2 * Math.PI) / metricsData.length - Math.PI / 2;
                const x = CENTER + MAX_RADIUS * Math.cos(angle);
                const y = CENTER + MAX_RADIUS * Math.sin(angle);
                return (
                  <line
                    key={i}
                    x1={CENTER}
                    y1={CENTER}
                    x2={x}
                    y2={y}
                    stroke="hsl(var(--border))"
                    strokeWidth="1"
                    opacity={0.3}
                  />
                );
              })}

              {/* Data polygons — rendered first so points sit on top */}
              {transportModes.map((mode) => {
                if (!visibleModes.has(mode.name)) return null;
                const isActive = activeMode === mode.name || activeMode === null;
                const isPolygonHovered = hoveredPolygon === mode.name;

                return (
                  <motion.path
                    key={mode.name}
                    d={getRadarPath(mode.name)}
                    fill={mode.color}
                    fillOpacity={isPolygonHovered ? 0.25 : isActive ? 0.15 : 0.05}
                    stroke={mode.color}
                    strokeWidth={isPolygonHovered ? 3 : 2}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={
                      isInView
                        ? { pathLength: 1, opacity: 1 }
                        : { pathLength: 0, opacity: 0 }
                    }
                    transition={{ duration: 1, delay: 0.2 }}
                    style={{
                      opacity: isActive ? 1 : 0.3,
                      cursor: 'pointer',
                      filter: isPolygonHovered ? `drop-shadow(0 0 8px ${mode.color})` : 'none'
                    }}
                    onMouseEnter={() => setHoveredPolygon(mode.name)}
                    onMouseLeave={() => setHoveredPolygon(null)}
                  />
                );
              })}

              {/* Data points (visual only, no hover interaction) */}
              {transportModes.map((mode) => {
                if (!visibleModes.has(mode.name)) return null;
                const isActive = activeMode === mode.name || activeMode === null;

                return (
                  <g key={mode.name}>
                    {getRadarPoints(mode.name).map((point, i) => {
                      const isMetricHighlighted = hoveredMetric === metricsData[i].id;

                      return (
                        <motion.circle
                          key={i}
                          cx={point.x}
                          cy={point.y}
                          r={isMetricHighlighted ? 6 : 4}
                          fill={mode.color}
                          initial={{ scale: 0 }}
                          animate={isInView ? { scale: 1 } : { scale: 0 }}
                          transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                          style={{
                            opacity: isActive ? 1 : 0.3,
                            pointerEvents: 'none'
                          }}
                        />
                      );
                    })}
                  </g>
                );
              })}

              {/* Metric labels */}
              {metricsData.map((metric, i) => {
                const angle = (i * 2 * Math.PI) / metricsData.length - Math.PI / 2;
                const x = CENTER + LABEL_RADIUS * Math.cos(angle);
                const y = CENTER + LABEL_RADIUS * Math.sin(angle);
                const Icon = metric.icon;
                const isHighlighted = hoveredMetric === metric.id;

                return (
                  <g key={metric.id}>
                    <foreignObject
                      x={x - 24}
                      y={y - 24}
                      width="48"
                      height="48"
                      className="overflow-visible"
                    >
                      <div className="flex items-center justify-center w-full h-full">
                        <motion.div
                          className={`rounded-lg bg-card/90 backdrop-blur-sm border p-2.5 transition-all cursor-pointer group ${
                            isHighlighted
                              ? 'border-hmr shadow-lg shadow-hmr/30'
                              : 'border-border/50 hover:border-hmr/50'
                          }`}
                          onMouseEnter={() => setHoveredMetric(metric.id)}
                          onMouseLeave={() => setHoveredMetric(null)}
                          animate={isHighlighted ? { scale: 1.1 } : { scale: 1 }}
                        >
                          <Icon className="w-5 h-5 text-hmr group-hover:scale-110 transition-transform" />
                        </motion.div>
                      </div>
                    </foreignObject>
                  </g>
                );
              })}

              {/* Cross-metric comparison lines when metric is highlighted */}
              {hoveredMetric && transportModes.map((mode) => {
                if (!visibleModes.has(mode.name)) return null;
                const points = getRadarPoints(mode.name);
                const metricIndex = metricsData.findIndex(m => m.id === hoveredMetric);
                if (metricIndex === -1) return null;
                const point = points[metricIndex];
                const metric = metricsData[metricIndex];

                return (
                  <g key={`line-${mode.name}`}>
                    <motion.line
                      x1={CENTER}
                      y1={CENTER}
                      x2={point.x}
                      y2={point.y}
                      stroke={mode.color}
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.3 }}
                      opacity={0.6}
                    />
                    <motion.text
                      x={point.x + (point.x > CENTER ? 8 : -8)}
                      y={point.y}
                      className="font-mono-tech text-[10px] font-semibold"
                      fill={mode.color}
                      textAnchor={point.x > CENTER ? 'start' : 'end'}
                      dominantBaseline="middle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      {metric.values[mode.name]}
                    </motion.text>
                  </g>
                );
              })}
            </svg>

            {/* Polygon hover info */}
            <AnimatePresence>
              {hoveredPolygon && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 -translate-x-1/2 bottom-4 z-10 pointer-events-none"
                >
                  <div className="rounded-lg bg-card/95 backdrop-blur-sm border border-hmr/30 p-3 shadow-xl shadow-hmr/20">
                    <div className="flex items-center gap-2 mb-2">
                      {(() => {
                        const mode = transportModes.find(m => m.name === hoveredPolygon)!;
                        const Icon = mode.icon;
                        return (
                          <>
                            <Icon className="w-4 h-4" style={{ color: mode.color }} />
                            <span className="font-mono-tech text-sm font-semibold" style={{ color: mode.color }}>
                              {hoveredPolygon}
                            </span>
                          </>
                        );
                      })()}
                    </div>
                    <div className="space-y-1">
                      {metricsData.map(metric => {
                        const MetricIcon = metric.icon;
                        const value = metric.values[hoveredPolygon];
                        return (
                          <div key={metric.id} className="flex items-center gap-2 text-xs">
                            <MetricIcon className="w-3 h-3 text-hmr" />
                            <span className="text-muted-foreground min-w-[60px]">{metric.shortName}:</span>
                            <span className="font-mono-tech font-semibold text-foreground">{value}</span>
                            <span className="text-muted-foreground text-[10px]">{metric.unit}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Transport mode toggles */}
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            {transportModes.map((mode) => {
              const Icon = mode.icon;
              const isVisible = visibleModes.has(mode.name);

              return (
                <motion.button
                  key={mode.name}
                  onClick={() => toggleMode(mode.name)}
                  onMouseEnter={() => setActiveMode(mode.name)}
                  onMouseLeave={() => setActiveMode(null)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all
                    ${isVisible
                      ? 'border-current bg-card/50'
                      : 'border-border/30 bg-secondary/30 opacity-50'
                    }
                  `}
                  style={{
                    borderColor: isVisible ? mode.color : undefined,
                    color: isVisible ? mode.color : undefined
                  }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-mono-tech text-sm font-medium">
                    {mode.name}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Right: Metric Cards */}
        <div className="space-y-3">
          {metricsData.map((metric, index) => {
            const Icon = metric.icon;
            const winner = getWinner(metric);
            const winnerMode = transportModes.find(m => m.name === winner)!;
            const isExpanded = expandedMetric === metric.id;
            const maxValue = Math.max(...Object.values(metric.values));

            return (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setExpandedMetric(metric.id)}
                onMouseLeave={() => setExpandedMetric(null)}
                className="rounded-xl bg-secondary/30 border border-border/50 p-4 hover:border-hmr/30 transition-all"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-hmr/10 border border-hmr/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-hmr" />
                    </div>
                    <div>
                      <h4 className="font-heading text-sm font-semibold">
                        {metric.metric}
                      </h4>
                      <p className="font-mono-tech text-xs text-muted-foreground">
                        {metric.unit}
                      </p>
                    </div>
                  </div>

                  {/* Winner badge */}
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono-tech"
                    style={{ backgroundColor: `${winnerMode.color}20`, color: winnerMode.color }}
                  >
                    {React.createElement(winnerMode.icon, { className: "w-3 h-3" })}
                    <span className="font-semibold">{metric.values[winner]}</span>
                  </div>
                </div>

                {/* Comparison bars */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-2 overflow-hidden"
                    >
                      {transportModes.map((mode) => {
                        const value = metric.values[mode.name];
                        const percentage = metric.inverted
                          ? 10 + ((maxValue - value) / maxValue) * 90
                          : 10 + (value / maxValue) * 90;
                        const isWinner = mode.name === winner;

                        return (
                          <div key={mode.name} className="flex items-center gap-2">
                            <div className="w-16 flex items-center gap-1.5">
                              {React.createElement(mode.icon, { className: "w-3 h-3", style: { color: mode.color } })}
                              <span className="font-mono-tech text-xs" style={{ color: mode.color }}>
                                {mode.name}
                              </span>
                            </div>
                            <div className="flex-1 h-6 bg-secondary/50 rounded overflow-hidden relative">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="h-full relative"
                                style={{ backgroundColor: mode.color }}
                              >
                                {isWinner && (
                                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20" />
                                )}
                              </motion.div>
                            </div>
                            <span className="w-12 text-right font-mono-tech text-xs font-semibold">
                              {value}
                            </span>
                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

const TeamObjectiveCard = ({
  team,
  index,
}: {
  team: (typeof teamObjectives)[0];
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = team.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative group"
    >
      <div className="rounded-2xl bg-card/40 backdrop-blur-sm border border-border/50 overflow-hidden group-hover:border-hmr/30 transition-all duration-500">
        {/* Top Header Bar */}
        <div
          className="px-6 py-4 border-b border-border/30 flex items-center justify-between"
          style={{ background: `linear-gradient(135deg, ${team.accentColor}08, transparent)` }}
        >
          <div className="flex items-center gap-4">
            {/* Badge */}
            <div
              className={`px-3 py-1.5 rounded-lg text-xs font-mono-tech font-bold tracking-wider text-white ${team.badgeColor}`}
            >
              {team.badge}
            </div>
            {/* Team Name */}
            <div>
              <h3 className="font-heading text-xl md:text-2xl font-semibold">
                {team.teamName}
              </h3>
              <p className="font-mono-tech text-xs text-muted-foreground tracking-wide">
                {team.tagline}
              </p>
            </div>
          </div>

          {/* Status & Stats */}
          <div className="hidden sm:flex items-center gap-6">
            <div className="text-right">
              <p className="font-mono-tech text-xs text-muted-foreground">LEAD</p>
              <p className="font-heading text-sm font-medium">{team.lead}</p>
            </div>
            <div className="w-px h-8 bg-border/50" />
            <div className="text-right">
              <p className="font-mono-tech text-xs text-muted-foreground">MEMBERS</p>
              <p className="font-heading text-sm font-medium">{team.memberCount}</p>
            </div>
            <div className="w-px h-8 bg-border/50" />
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  team.status === "active" ? "bg-emerald-500 animate-pulse" : "bg-muted"
                }`}
              />
              <span className="font-mono-tech text-xs text-muted-foreground uppercase tracking-wider">
                {team.status === "active" ? "Active" : "Pending"}
              </span>
            </div>
          </div>
        </div>

        {/* Full-width photo banner for subsection teams */}
        {'subsections' in team && team.subsections && 'photo' in team && team.photo && (
          <div className="relative w-full aspect-[16/6] overflow-hidden">
            <img
              src={`${import.meta.env.BASE_URL}team_photos/team/${team.photo}`}
              alt={team.teamName}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent" />
          </div>
        )}

        {/* Main Content Grid */}
        <div className={'subsections' in team && team.subsections ? '' : 'grid lg:grid-cols-[300px_1fr]'}>
          {/* Photo Placeholder */}
          {'subsections' in team && team.subsections ? null : <div className="relative h-full">
            {'photo' in team && team.photo ? (
              <div className="aspect-[4/3] lg:aspect-auto lg:h-full relative overflow-hidden">
                <img
                  src={`${import.meta.env.BASE_URL}team_photos/team/${team.photo}`}
                  alt={team.teamName}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="aspect-[4/3] lg:aspect-auto lg:h-[280px] relative overflow-hidden">
                {/* Placeholder Background with Pattern */}
                {/*<div*/}
                {/*  className="absolute inset-0"*/}
                {/*  style={{*/}
                {/*    background: `linear-gradient(135deg, ${team.accentColor}15, ${team.accentColor}05)`,*/}
                {/*  }}*/}
                {/*/>*/}

                {/* Grid Pattern Overlay */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `
                      linear-gradient(${team.accentColor}20 1px, transparent 1px),
                      linear-gradient(90deg, ${team.accentColor}20 1px, transparent 1px)
                    `,
                    backgroundSize: '24px 24px',
                  }}
                />


                {/* Center Content - Camera Icon & Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="relative"
                  >
                    {/* Glowing ring */}
                    <div
                      className="absolute inset-0 rounded-full blur-xl opacity-30"
                      style={{ background: team.accentColor }}
                    />
                    <div
                      className="relative w-20 h-20 rounded-full border-2 border-dashed flex items-center justify-center"
                      style={{ borderColor: `${team.accentColor}60` }}
                    >
                      <Camera className="w-8 h-8" style={{ color: team.accentColor }} />
                    </div>
                  </motion.div>
                  <p className="mt-4 font-mono-tech text-xs tracking-widest uppercase" style={{ color: `${team.accentColor}99` }}>
                    Photo Coming Soon
                  </p>
                </div>

                {/* Corner Decorations */}
                {/*<div*/}
                {/*  className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2"*/}
                {/*  style={{ borderColor: `${team.accentColor}40` }}*/}
                {/*/>*/}
                {/*<div*/}
                {/*  className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2"*/}
                {/*  style={{ borderColor: `${team.accentColor}40` }}*/}
                {/*/>*/}

                {/* Team Icon Watermark */}
                <div className="absolute bottom-4 left-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: `${team.accentColor}20` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: team.accentColor }} />
                  </div>
                </div>
              </div>
            )}
          </div>}

          {/* Content Section */}
          <div className="p-6 lg:p-8">
            {/* Mobile Stats */}
            <div className="flex sm:hidden items-center gap-4 mb-4 pb-4 border-b border-border/30">
              <div>
                <p className="font-mono-tech text-[10px] text-muted-foreground">LEAD</p>
                <p className="font-heading text-sm font-medium">{team.lead}</p>
              </div>
              <div className="w-px h-6 bg-border/50" />
              <div>
                <p className="font-mono-tech text-[10px] text-muted-foreground">MEMBERS</p>
                <p className="font-heading text-sm font-medium">{team.memberCount}</p>
              </div>
              <div className="flex items-center gap-1.5 ml-auto">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono-tech text-[10px] text-muted-foreground uppercase">Active</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed mb-6">
              {team.description}
            </p>

            {/* Subsections or Responsibilities layout */}
            {'subsections' in team && team.subsections ? (
              <div className="space-y-4 mb-6">
                {team.subsections.map((sub, si) => (
                  <div
                    key={sub.title}
                    className="rounded-xl border border-border/50 overflow-hidden bg-secondary/20 p-5"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Briefcase className="w-4 h-4" style={{ color: team.accentColor }} />
                      <h4 className="font-heading text-base font-semibold" style={{ color: team.accentColor }}>
                        {sub.title}
                      </h4>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      {/* Responsibilities */}
                      <div>
                        <p className="font-mono-tech text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-2">
                          Responsibilities
                        </p>
                        <ul className="space-y-1.5">
                          {sub.responsibilities.map((item, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={isInView ? { opacity: 1, x: 0 } : {}}
                              transition={{ delay: index * 0.1 + si * 0.08 + i * 0.04 + 0.3 }}
                              className="flex items-start gap-2 text-sm text-foreground/80"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: team.accentColor }} />
                              <span>{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Current Goals */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Crosshair className="w-3.5 h-3.5" style={{ color: team.accentColor }} />
                          <p className="font-mono-tech text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
                            Current Goals
                          </p>
                        </div>
                        <p className="text-sm text-foreground/80 leading-relaxed">
                          {sub.currentGoals}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Responsibilities */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Briefcase className="w-4 h-4" style={{ color: team.accentColor }} />
                    <h4 className="font-mono-tech text-xs tracking-[0.15em] uppercase" style={{ color: team.accentColor }}>
                      Responsibilities
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {team.responsibilities.slice(0, 4).map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: index * 0.1 + i * 0.05 + 0.3 }}
                        className="flex items-start gap-2 text-sm text-foreground/80"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: team.accentColor }} />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Current Focus */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Crosshair className="w-4 h-4" style={{ color: team.accentColor }} />
                    <h4 className="font-mono-tech text-xs tracking-[0.15em] uppercase" style={{ color: team.accentColor }}>
                      Current Focus
                    </h4>
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {team.currentFocus}
                  </p>
                </div>
              </div>
            )}

            {/* Tools/Tech Stack */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono-tech text-[10px] text-muted-foreground tracking-wider uppercase mr-2">
                Tools:
              </span>
              {team.tools.map((tool, i) => (
                <motion.span
                  key={tool}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  className="px-2.5 py-1 rounded-md text-xs font-mono-tech border"
                  style={{
                    borderColor: `${team.accentColor}30`,
                    background: `${team.accentColor}10`,
                    color: team.accentColor
                  }}
                >
                  {tool}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const MissionSection = () => {
  return (
    <section id="mission" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-hmr/20 bg-secondary/30 backdrop-blur-sm mb-6">
            <Target className="w-4 h-4 text-hmr" />
            <span className="font-mono-tech text-xs tracking-[0.15em] text-hmr-light uppercase">
              Mission Control
            </span>
          </div>

          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Making Rail the{" "}
            <span className="text-gradient-hmr">Obvious Choice</span>
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Revolutionizing long-distance travel by making the train the most
            attractive option for international journeys.
          </p>
        </motion.div>

        {/* Interactive Comparison Dashboard */}
        <div className="mb-20">
          <InteractiveComparison />
        </div>

        {/* Team Objectives Section */}
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-hmr/10 border border-hmr/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-hmr" />
              </div>
              <div>
                <h3 className="font-heading text-2xl font-semibold">
                  Engineering Teams
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono-tech text-xs">{teamObjectives.length} Active Teams</span>
            </div>
          </motion.div>

          <div className="space-y-6">
            {teamObjectives.map((team, i) => (
              <TeamObjectiveCard key={team.id} team={team} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
