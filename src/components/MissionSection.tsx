import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Target, CheckCircle2, Zap, Workflow, FlaskConical, Map, Plane, Bus, Train, Gauge, Users, Leaf, Clock, TrendingUp, TrendingDown } from "lucide-react";

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
    color: "rgb(107, 114, 128)",
    bgColor: "bg-gray-500",
    lightColor: "rgb(156, 163, 175)"
  },
];

const goals = [
  {
    number: "01",
    title: "Eliminate Friction",
    icon: Zap,
    image: `${import.meta.env.BASE_URL}images/objective-friction.svg`,
    alt: "Electromagnetic levitation system diagram showing reduced friction",
    description:
      "Design and implement a magnetic levitation system that removes physical wheel-rail contact at high speeds, dramatically reducing rolling resistance and energy consumption while minimizing infrastructure wear.",
    status: "active",
    details: [
      "Develop electromagnetic suspension architecture",
      "Optimize power consumption at cruising speed",
      "Minimize infrastructure wear and tear"
    ],
    outcome: "Energy-efficient propulsion system with 90% reduction in mechanical friction"
  },
  {
    number: "02",
    title: "Seamless Integration",
    icon: Workflow,
    image: `${import.meta.env.BASE_URL}images/objective-integration.svg`,
    alt: "Hybrid maglev system integration with existing rail infrastructure",
    description:
      "Engineer a hybrid system that works with existing European rail infrastructure, enabling gradual deployment without requiring complete track replacement or massive capital investment.",
    status: "active",
    details: [
      "Retrofit solution for existing rail corridors",
      "Compatible with current signaling systems",
      "Phased deployment strategy for infrastructure"
    ],
    outcome: "Upgrade solution requiring minimal modifications to existing tracks"
  },
  {
    number: "03",
    title: "Prove Viability",
    icon: FlaskConical,
    image: `${import.meta.env.BASE_URL}images/objective-prototype.svg`,
    alt: "Prototype maglev vehicle testing at TU/e facilities",
    description:
      "Conduct rigorous engineering research and build functional prototypes at TU/e to validate the technical feasibility, safety, and performance of retrofittable maglev technology.",
    status: "active",
    details: [
      "Build and test functional prototype vehicle",
      "Conduct track compatibility testing",
      "Validate safety standards and regulations"
    ],
    outcome: "Demonstrator vehicle proving technical feasibility at TU/e facilities"
  },
  {
    number: "04",
    title: "Railway Network Analysis Tool",
    icon: Map,
    image: `${import.meta.env.BASE_URL}images/objective-network.svg`,
    alt: "Interactive web platform for European rail network analysis",
    description:
      "Develop an interactive web-based platform that enables stakeholders to investigate costs, benefits, and deployment feasibility of hybrid maglev technology across various European rail network configurations.",
    status: "active",
    details: [
      "Interactive cost and benefit modeling system",
      "Route optimization and feasibility analysis",
      "Visual exploration of deployment scenarios"
    ],
    outcome: "Web platform for exploring hybrid maglev deployment across Europe"
  },
];

// Helper function to normalize values for radar chart (0-100 scale)
const normalizeValue = (value: number, metric: MetricData) => {
  const values = Object.values(metric.values);
  const max = Math.max(...values);
  const min = Math.min(...values);

  if (metric.inverted) {
    // For inverted metrics, lower is better, so invert the scale
    return ((max - value) / (max - min)) * 100;
  }
  return (value / max) * 100;
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
  const [hoveredPoint, setHoveredPoint] = useState<{
    mode: TransportMode;
    metricId: string;
    x: number;
    y: number;
  } | null>(null);
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

              {/* Data polygons */}
              {transportModes.map((mode) => {
                if (!visibleModes.has(mode.name)) return null;
                const isActive = activeMode === mode.name || activeMode === null;
                const isPolygonHovered = hoveredPolygon === mode.name;

                return (
                  <motion.g key={mode.name}>
                    {/* Polygon area */}
                    <motion.path
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
                    {/* Data points */}
                    {getRadarPoints(mode.name).map((point, i) => {
                      const metric = metricsData[i];
                      const isPointHovered =
                        hoveredPoint?.mode === mode.name &&
                        hoveredPoint?.metricId === metric.id;
                      const isMetricHighlighted = hoveredMetric === metric.id;

                      return (
                        <g key={i}>
                          {/* Invisible larger hit area for easier hovering */}
                          <circle
                            cx={point.x}
                            cy={point.y}
                            r="12"
                            fill="transparent"
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              setHoveredPoint({
                                mode: mode.name,
                                metricId: metric.id,
                                x: rect.left + rect.width / 2,
                                y: rect.top,
                              });
                            }}
                            onMouseLeave={() => setHoveredPoint(null)}
                          />
                          {/* Visible point */}
                          <motion.circle
                            cx={point.x}
                            cy={point.y}
                            r={isPointHovered || isMetricHighlighted ? 6 : 4}
                            fill={mode.color}
                            initial={{ scale: 0 }}
                            animate={isInView ? { scale: 1 } : { scale: 0 }}
                            transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                            style={{
                              opacity: isActive ? 1 : 0.3,
                              filter: isPointHovered ? `drop-shadow(0 0 6px ${mode.lightColor})` : 'none',
                              pointerEvents: 'none'
                            }}
                          />
                          {/* Pulsing ring on hover */}
                          {isPointHovered && (
                            <motion.circle
                              cx={point.x}
                              cy={point.y}
                              r="8"
                              fill="none"
                              stroke={mode.color}
                              strokeWidth="2"
                              initial={{ scale: 0.8, opacity: 0.8 }}
                              animate={{ scale: 1.5, opacity: 0 }}
                              transition={{ duration: 1, repeat: Infinity }}
                            />
                          )}
                        </g>
                      );
                    })}
                  </motion.g>
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

            {/* Tooltip for hovered points */}
            <AnimatePresence>
              {hoveredPoint && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 -translate-x-1/2 bottom-4 z-10 pointer-events-none"
                >
                  <div className="rounded-lg bg-card/95 backdrop-blur-sm border border-hmr/30 p-3 shadow-xl shadow-hmr/20">
                    <div className="flex items-center gap-2 mb-1">
                      {(() => {
                        const mode = transportModes.find(m => m.name === hoveredPoint.mode)!;
                        const Icon = mode.icon;
                        return (
                          <>
                            <Icon className="w-4 h-4" style={{ color: mode.color }} />
                            <span className="font-mono-tech text-sm font-semibold" style={{ color: mode.color }}>
                              {hoveredPoint.mode}
                            </span>
                          </>
                        );
                      })()}
                    </div>
                    <div className="flex items-baseline gap-2">
                      {(() => {
                        const metric = metricsData.find(m => m.id === hoveredPoint.metricId)!;
                        const MetricIcon = metric.icon;
                        const value = metric.values[hoveredPoint.mode];
                        return (
                          <>
                            <MetricIcon className="w-3 h-3 text-hmr" />
                            <span className="font-heading text-xs text-muted-foreground">
                              {metric.metric}:
                            </span>
                            <span className="font-mono-tech text-lg font-bold text-gradient-hmr">
                              {value}
                            </span>
                            <span className="font-mono-tech text-xs text-muted-foreground">
                              {metric.unit}
                            </span>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Polygon hover info */}
            <AnimatePresence>
              {hoveredPolygon && !hoveredPoint && (
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
                onClick={() => setExpandedMetric(isExpanded ? null : metric.id)}
                className="rounded-xl bg-secondary/30 border border-border/50 p-4 cursor-pointer hover:border-hmr/30 transition-all"
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
                          ? ((maxValue - value) / maxValue) * 100
                          : (value / maxValue) * 100;
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

const GoalCard = ({
  goal,
  index,
}: {
  goal: (typeof goals)[0];
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = goal.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group h-full"
    >
      <div className="h-full rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 overflow-hidden group-hover:border-hmr/30 group-hover:bg-card/70 transition-all duration-300 card-lift">
        {/* Hero Image Section */}
        <div className="relative h-48 md:h-56 overflow-hidden">
          <img
            src={goal.image}
            alt={goal.alt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

          {/* Objective number overlay */}
          <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-hmr/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
            <span className="font-mono-tech text-sm font-bold text-primary-foreground">
              {goal.number}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 md:p-8">
          {/* Header with Icon and Status */}
          <div className="flex items-center justify-between mb-4">
          {/* Icon */}
          <div className="relative w-14 h-14">
            <div className="absolute inset-0 rounded-xl bg-gradient-hmr opacity-20 blur-md" />
            <div className="relative w-full h-full rounded-xl bg-gradient-hmr flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Icon className="w-7 h-7 text-primary-foreground" />
            </div>
          </div>

          {/* Status indicator */}
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                goal.status === "active" ? "bg-hmr animate-pulse" : "bg-muted"
              }`}
            />
            <span className="font-mono-tech text-[10px] tracking-[0.15em] text-muted-foreground uppercase">
              {goal.status === "active" ? "In Progress" : "Pending"}
            </span>
          </div>
        </div>

        <h3 className="font-heading text-2xl font-semibold mb-3 relative">
          {/* Base text (visible when not hovered) */}
          <span className="transition-opacity duration-300 group-hover:opacity-0">
            {goal.title}
          </span>
          {/* Gradient text (visible when hovered) */}
          <span className="absolute inset-0 text-gradient-hmr opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {goal.title}
          </span>
        </h3>

        <p className="text-muted-foreground leading-relaxed mb-6">
          {goal.description}
        </p>

        {/* Key Focus Areas */}
        <div className="mb-6">
          <h4 className="font-mono-tech text-xs tracking-[0.15em] text-hmr-light uppercase mb-3">
            Key Focus Areas
          </h4>
          <ul className="space-y-2">
            {goal.details.map((detail, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 + i * 0.1 + 0.3 }}
                className="flex items-start gap-3 text-sm text-foreground/80"
              >
                <CheckCircle2 className="w-4 h-4 text-hmr shrink-0 mt-0.5" />
                <span>{detail}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Expected Outcome */}
        <div className="rounded-lg bg-secondary/50 border border-hmr/20 p-4">
          <div className="flex items-start gap-3">
            <Target className="w-5 h-5 text-hmr shrink-0 mt-0.5" />
            <div>
              <p className="font-mono-tech text-[10px] tracking-[0.15em] text-hmr-light uppercase mb-1">
                Expected Outcome
              </p>
              <p className="text-sm text-foreground/90 leading-relaxed">
                {goal.outcome}
              </p>
            </div>
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

        {/* Goals section */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <CheckCircle2 className="w-5 h-5 text-hmr" />
            <h3 className="font-heading text-2xl font-semibold">
              Engineering Objectives
            </h3>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {goals.map((goal, i) => (
              <GoalCard key={goal.number} goal={goal} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
