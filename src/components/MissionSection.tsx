import { motion, useInView } from "framer-motion";
import { Target, Activity, CheckCircle2, Zap, Workflow, FlaskConical, Award, Map } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const stats = [
  { value: 0, label: "Rolling Resistance", suffix: "", prefix: "" },
  { value: 95, label: "Noise Reduction", suffix: "%", prefix: "" },
  { value: 90, label: "Less Wear", suffix: "%", prefix: "" },
  { value: 1000, label: "Target Speed", suffix: "", prefix: "", unit: "km/h" },
];

const goals = [
  {
    number: "01",
    title: "Eliminate Friction",
    icon: Zap,
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

const AnimatedStat = ({
  stat,
  index,
}: {
  stat: (typeof stats)[0];
  index: number;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 50;
    const increment = stat.value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.value) {
        setCount(stat.value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, stat.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
    >
      <div className="rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 p-6 text-center hover:border-hmr/30 transition-all duration-300">
        {/* Gauge visualization */}
        <div className="relative w-20 h-20 mx-auto mb-4">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            {/* Background circle */}
            <circle
              cx="18"
              cy="18"
              r="15"
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="3"
            />
            {/* Progress arc */}
            <motion.circle
              cx="18"
              cy="18"
              r="15"
              fill="none"
              stroke="url(#gaugeGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${(count / (stat.value || 1)) * 94.2} 94.2`}
              initial={{ strokeDasharray: "0 94.2" }}
              animate={
                isInView
                  ? { strokeDasharray: `${(stat.value > 0 ? 94.2 : 0)} 94.2` }
                  : {}
              }
              transition={{ duration: 2, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--hmr-blue-light))" />
                <stop offset="100%" stopColor="hsl(var(--hmr-blue-dark))" />
              </linearGradient>
            </defs>
          </svg>
          {/* Center value */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Activity className="w-6 h-6 text-hmr" />
          </div>
        </div>

        {/* Value */}
        <p className="font-mono-tech text-3xl md:text-4xl font-bold text-gradient-hmr mb-1">
          {stat.prefix}
          {count}
          {stat.suffix}
          {stat.unit && (
            <span className="text-base ml-1 text-muted-foreground">
              {stat.unit}
            </span>
          )}
        </p>
        <p className="font-mono-tech text-xs text-muted-foreground uppercase tracking-wider">
          {stat.label}
        </p>
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
      <div className="h-full rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 p-8 group-hover:border-hmr/30 group-hover:bg-card/70 transition-all duration-300 card-lift">
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

        <h3 className="font-heading text-2xl font-semibold mb-3 group-hover:text-gradient-hmr transition-colors">
          {goal.title}
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
    </motion.div>
  );
};

const MissionSection = () => {
  return (
    <section id="mission" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-hmr-dark/10 blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-hmr-light/5 blur-[120px]" />
      </div>

      {/* Circuit pattern */}
      <div className="absolute inset-0 dot-grid opacity-15" />

      {/* Wave divider */}
      <div className="wave-divider" />

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

        {/* Stats dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20">
          {stats.map((stat, i) => (
            <AnimatedStat key={stat.label} stat={stat} index={i} />
          ))}
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

          <div className="grid md:grid-cols-2 gap-6">
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
