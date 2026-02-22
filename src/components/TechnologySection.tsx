import { motion, useInView } from "framer-motion";
import { Magnet, RefreshCw, Cpu, Zap } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const techNodes = [
  {
    icon: Magnet,
    title: "Electromagnetic Levitation",
    tag: "CORE_SYSTEM",
    metric: { value: 0, unit: "", label: "Rolling Resistance" },
    points: [
      "Zero friction at cruising speed",
      "Silent operation for communities",
      "Minimal mechanical wear",
    ],
  },
  {
    icon: RefreshCw,
    title: "Backward Compatibility",
    tag: "HYBRID_MODE",
    metric: { value: 100, unit: "%", label: "Track Compatible" },
    points: [
      "Dual-mode: maglev + wheels",
      "Retrofit existing infrastructure",
      "No new land acquisition",
    ],
  },
  {
    icon: Cpu,
    title: "Engineering Process",
    tag: "R&D_PIPELINE",
    metric: { value: 3, unit: "", label: "Disciplines United" },
    points: [
      "Mechanical × Electrical × Physics",
      "Simulate → Build → Test cycle",
      "Prototyping at TU/e labs",
    ],
  },
];

const AnimatedCounter = ({ value, unit }: { value: number; unit: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const steps = 40;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-mono-tech text-4xl md:text-5xl font-semibold text-gradient-hmr">
      {count}{unit}
    </span>
  );
};

const FieldLines = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
    viewBox="0 0 800 600"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="hsl(200, 90%, 65%)" stopOpacity="0" />
        <stop offset="50%" stopColor="hsl(205, 100%, 70%)" stopOpacity="1" />
        <stop offset="100%" stopColor="hsl(225, 80%, 40%)" stopOpacity="0" />
      </linearGradient>
    </defs>
    {/* Curved magnetic field lines */}
    <path
      d="M 100 300 Q 250 100 400 300 Q 550 500 700 300"
      fill="none"
      stroke="url(#lineGrad)"
      strokeWidth="1"
      strokeDasharray="8 12"
      className="animate-field-flow"
    />
    <path
      d="M 100 350 Q 250 150 400 350 Q 550 550 700 350"
      fill="none"
      stroke="url(#lineGrad)"
      strokeWidth="1"
      strokeDasharray="8 12"
      className="animate-field-flow"
      style={{ animationDelay: "0.5s" }}
    />
    <path
      d="M 100 250 Q 250 50 400 250 Q 550 450 700 250"
      fill="none"
      stroke="url(#lineGrad)"
      strokeWidth="1"
      strokeDasharray="8 12"
      className="animate-field-flow"
      style={{ animationDelay: "1s" }}
    />
  </svg>
);

const TechCard = ({
  node,
  index,
}: {
  node: (typeof techNodes)[0];
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Hexagon backdrop */}
      <div className="absolute -inset-4 md:-inset-6 hex-clip bg-gradient-to-b from-hmr-light/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative rounded-2xl bg-card/80 backdrop-blur-sm tech-card-glow p-6 md:p-8 transition-all duration-500 hover:-translate-y-1">
        {/* Tag */}
        <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-secondary border border-hmr/30">
          <span className="font-mono-tech text-[10px] tracking-[0.15em] text-hmr-light">
            {node.tag}
          </span>
        </div>

        {/* Icon with orbital ring */}
        <div className="relative w-16 h-16 mb-6">
          <motion.div
            className="absolute inset-0 rounded-full border border-dashed border-hmr/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-2 rounded-full bg-gradient-hmr flex items-center justify-center">
            <node.icon className="w-6 h-6 text-primary-foreground" />
          </div>
          {/* Orbiting dot */}
          <motion.div
            className="absolute w-2 h-2 rounded-full bg-hmr-light"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{ top: 0, left: "50%", marginLeft: -4, transformOrigin: "4px 32px" }}
          />
        </div>

        {/* Metric display */}
        <div className="mb-4">
          <AnimatedCounter value={node.metric.value} unit={node.metric.unit} />
          <p className="font-mono-tech text-xs text-muted-foreground mt-1 tracking-wider">
            {node.metric.label}
          </p>
        </div>

        {/* Title */}
        <h3 className="font-heading text-xl md:text-2xl font-semibold mb-4 group-hover:text-gradient-hmr transition-all duration-300">
          {node.title}
        </h3>

        {/* Points with staggered reveal */}
        <ul className="space-y-2.5">
          {node.points.map((point, i) => (
            <motion.li
              key={point}
              initial={{ opacity: 0.5, x: 0 }}
              animate={isHovered ? { opacity: 1, x: 4 } : { opacity: 0.6, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="flex items-center gap-3 text-sm text-muted-foreground"
            >
              <Zap className="w-3 h-3 text-hmr flex-shrink-0" />
              <span>{point}</span>
            </motion.li>
          ))}
        </ul>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-hmr to-transparent"
          initial={{ scaleX: 0 }}
          animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.div>
  );
};

const TechnologySection = () => {
  return (
    <section id="technology" className="py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-hmr-dark/15 blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-hmr-light/10 blur-[120px]" />
      </div>

      {/* Schematic grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, hsl(var(--hmr-blue)) 1px, transparent 0)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Animated field lines */}
      <FieldLines />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-hmr/20 bg-secondary/50 mb-6">
            <span className="w-2 h-2 rounded-full bg-hmr animate-pulse" />
            <span className="font-mono-tech text-xs tracking-[0.2em] text-hmr-light uppercase">
              System Architecture
            </span>
          </div>

          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            The <span className="text-gradient-hmr">Hybrid Interface</span>
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Three core pillars enabling trains to levitate over standard railway tracks
          </p>
        </motion.div>

        {/* Connection lines between cards (desktop only) */}
        <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-px">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-hmr/30 to-transparent animate-pulse-line" />
        </div>

        {/* Tech cards grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {techNodes.map((node, index) => (
            <TechCard key={node.title} node={node} index={index} />
          ))}
        </div>

        {/* Bottom blueprint decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 flex justify-center"
        >
          <div className="flex items-center gap-4 px-6 py-3 rounded-full border border-border/50 bg-card/30 backdrop-blur-sm">
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-hmr"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
            <span className="font-mono-tech text-xs text-muted-foreground tracking-wider">
              MAGLEV_INTERFACE_v2.0
            </span>
            <div className="w-px h-4 bg-border" />
            <span className="font-mono-tech text-xs text-hmr-light">ACTIVE</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologySection;
