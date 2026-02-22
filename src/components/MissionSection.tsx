import { motion, useInView } from "framer-motion";
import { Target, Activity, CheckCircle2 } from "lucide-react";
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
    description:
      "Lowering energy consumption and maintenance costs by removing physical contact at speed.",
    status: "active",
    progress: 65,
  },
  {
    number: "02",
    title: "Seamless Integration",
    description:
      "Integrating with current European rail infrastructure to minimize land use and construction time.",
    status: "active",
    progress: 40,
  },
  {
    number: "03",
    title: "Prove Viability",
    description:
      "Rigorous engineering and prototyping at TU/e to demonstrate retrofittable Maglev solutions.",
    status: "active",
    progress: 25,
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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative group"
    >
      {/* Connection line to next */}
      {index < goals.length - 1 && (
        <div className="absolute left-6 top-16 bottom-0 w-px">
          <motion.div
            className="w-full h-full bg-gradient-to-b from-hmr/50 to-transparent"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
            style={{ transformOrigin: "top" }}
          />
        </div>
      )}

      <div className="flex gap-6 items-start">
        {/* Number node */}
        <div className="relative shrink-0">
          <div className="w-12 h-12 rounded-xl bg-gradient-hmr flex items-center justify-center">
            <span className="font-mono-tech text-lg font-bold text-primary-foreground">
              {goal.number}
            </span>
          </div>
          {/* Pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-xl border-2 border-hmr"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 pb-8">
          <div className="rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 p-6 group-hover:border-hmr/30 transition-all duration-300">
            {/* Status badge */}
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`w-2 h-2 rounded-full ${
                  goal.status === "active" ? "bg-hmr animate-pulse" : "bg-muted"
                }`}
              />
              <span className="font-mono-tech text-[10px] tracking-[0.15em] text-muted-foreground uppercase">
                {goal.status === "active" ? "In Progress" : "Pending"}
              </span>
            </div>

            <h3 className="font-heading text-xl font-semibold mb-2 group-hover:text-gradient-hmr transition-colors">
              {goal.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {goal.description}
            </p>

            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-mono-tech text-muted-foreground">
                  Progress
                </span>
                <span className="font-mono-tech text-hmr-light">
                  {goal.progress}%
                </span>
              </div>
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-hmr rounded-full"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${goal.progress}%` } : {}}
                  transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                />
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
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Goals timeline */}
          <div className="space-y-0">
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

            {goals.map((goal, i) => (
              <GoalCard key={goal.number} goal={goal} index={i} />
            ))}
          </div>

          {/* Right: System status panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="sticky top-24"
          >
            <div className="rounded-2xl bg-card border border-border overflow-hidden">
              {/* Header */}
              <div className="px-6 py-4 border-b border-border bg-secondary/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="font-mono-tech text-xs text-muted-foreground">
                    system_status.hmr
                  </span>
                </div>
                <span className="w-2 h-2 rounded-full bg-hmr animate-pulse" />
              </div>

              {/* Content */}
              <div className="p-6 font-mono-tech text-sm">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">project:</span>
                    <span className="text-hmr-light">hybrid_maglev_v2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">team_size:</span>
                    <span className="text-foreground">15+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">disciplines:</span>
                    <span className="text-foreground">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">location:</span>
                    <span className="text-foreground">TU/e, Eindhoven</span>
                  </div>
                  <div className="h-px bg-border my-4" />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">status:</span>
                    <span className="text-green-400">OPERATIONAL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">next_milestone:</span>
                    <span className="text-foreground">Prototype_v1</span>
                  </div>
                </div>

                {/* Animated cursor */}
                <div className="mt-6 flex items-center gap-2">
                  <span className="text-hmr">→</span>
                  <span className="text-muted-foreground">
                    Seeking new team members
                  </span>
                  <span className="typewriter-cursor" />
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="mt-6 flex justify-center">
              <div className="flex items-center gap-4 px-4 py-2 rounded-full border border-border/50 bg-card/30">
                <span className="font-mono-tech text-xs text-muted-foreground">
                  LIVE DATA FEED
                </span>
                <div className="flex gap-1">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 h-4 bg-hmr rounded-full"
                      animate={{ scaleY: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.15,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
