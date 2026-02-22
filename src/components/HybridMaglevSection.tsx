import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Gauge, Zap, Wind } from "lucide-react";

const phases = [
  {
    title: "Conventional Rolling",
    speedLabel: "0-80 km/h",
    speedValue: 80,
    mode: "WHEEL_CONTACT",
    description:
      "The train starts like any other service, riding on steel wheels while using existing track geometry and signaling.",
    image: "/images/hybrid-stage-rolling.svg",
    alt: "Train rolling on steel wheels on a standard rail line",
    specs: [
      { label: "Mode", value: "Steel on Steel" },
      { label: "Friction", value: "Standard" },
      { label: "Noise", value: "Normal" },
    ],
  },
  {
    title: "Hybrid Transition",
    speedLabel: "80-200 km/h",
    speedValue: 200,
    mode: "MAGNETIC_ASSIST",
    description:
      "As speed builds, magnetic propulsion activates. Guidance magnets begin to lift the chassis while wheels maintain stability.",
    image: "/images/hybrid-stage-hybrid.svg",
    alt: "Train partially levitating as magnets begin to lift it above the rails",
    specs: [
      { label: "Mode", value: "Hybrid Lift" },
      { label: "Friction", value: "Reducing" },
      { label: "Noise", value: "Decreasing" },
    ],
  },
  {
    title: "Full Levitation",
    speedLabel: "200-1000 km/h",
    speedValue: 1000,
    mode: "FULL_MAGLEV",
    description:
      "At cruising speed the train is fully levitated with no rolling contact, enabling plane-like velocities with minimal friction.",
    image: "/images/hybrid-stage-levitation.svg",
    alt: "Train fully levitating above a guideway at very high speed",
    specs: [
      { label: "Mode", value: "Full Maglev" },
      { label: "Friction", value: "Near Zero" },
      { label: "Noise", value: "Minimal" },
    ],
  },
];

const PhaseCard = ({
  phase,
  index,
  isActive,
  onClick,
}: {
  phase: (typeof phases)[0];
  index: number;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onClick={onClick}
      className={`group relative rounded-2xl cursor-pointer transition-all duration-500 ${
        isActive
          ? "bg-card tech-card-glow scale-[1.02]"
          : "bg-card/50 hover:bg-card/80"
      }`}
    >
      {/* Step indicator */}
      <div
        className={`absolute -top-3 left-6 px-3 py-1 rounded-full border transition-all duration-300 ${
          isActive
            ? "bg-gradient-hmr border-transparent text-primary-foreground"
            : "bg-secondary border-border text-hmr-light"
        }`}
      >
        <span className="font-mono-tech text-[10px] tracking-[0.15em]">
          PHASE_{index + 1}
        </span>
      </div>

      {/* Content wrapper */}
      <div className="p-6 md:p-7">
        {/* Image with hover overlay */}
        <div className="relative rounded-xl overflow-hidden border border-border bg-secondary/40 mb-6">
          <img
            src={phase.image}
            alt={phase.alt}
            className={`w-full h-44 md:h-52 object-cover transition-all duration-500 ${
              isActive ? "scale-105" : "group-hover:scale-102"
            }`}
            loading="lazy"
          />

          {/* Speed overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent flex items-end justify-between p-4 transition-opacity duration-300 ${
              isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
          >
            <div>
              <p className="font-mono-tech text-[10px] text-hmr-light tracking-wider mb-1">
                SPEED RANGE
              </p>
              <p className="font-heading text-2xl font-bold text-gradient-hmr">
                {phase.speedLabel}
              </p>
            </div>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                isActive ? "bg-hmr" : "bg-secondary"
              }`}
            >
              {index === 0 && <Gauge className="w-5 h-5 text-primary-foreground" />}
              {index === 1 && <Zap className="w-5 h-5 text-primary-foreground" />}
              {index === 2 && <Wind className="w-5 h-5 text-primary-foreground" />}
            </div>
          </div>
        </div>

        {/* Mode tag */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`w-2 h-2 rounded-full transition-colors ${
              isActive ? "bg-hmr animate-pulse" : "bg-muted-foreground/50"
            }`}
          />
          <span className="font-mono-tech text-[10px] tracking-[0.15em] text-muted-foreground">
            {phase.mode}
          </span>
        </div>

        {/* Title */}
        <h3
          className={`font-heading text-xl md:text-2xl font-semibold mb-3 transition-colors ${
            isActive ? "text-gradient-hmr" : ""
          }`}
        >
          {phase.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {phase.description}
        </p>

        {/* Specs grid - visible when active */}
        <motion.div
          initial={false}
          animate={{
            height: isActive ? "auto" : 0,
            opacity: isActive ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border">
            {phase.specs.map((spec) => (
              <div key={spec.label} className="text-center">
                <p className="font-mono-tech text-[9px] text-muted-foreground tracking-wider mb-1">
                  {spec.label.toUpperCase()}
                </p>
                <p className="font-heading text-sm font-medium text-hmr-light">
                  {spec.value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Active border glow */}
      {isActive && (
        <motion.div
          layoutId="activePhase"
          className="absolute inset-0 rounded-2xl border-2 border-hmr/50 pointer-events-none"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </motion.article>
  );
};

const ProgressLine = ({ activeIndex }: { activeIndex: number }) => {
  const progress = ((activeIndex + 1) / phases.length) * 100;

  return (
    <div className="hidden lg:flex items-center justify-center gap-4 mb-12">
      <span className="font-mono-tech text-xs text-muted-foreground">START</span>
      <div className="relative w-64 h-1 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-hmr rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        {/* Pulse effect at the end */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-hmr"
          animate={{ left: `calc(${progress}% - 6px)` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="absolute inset-0 rounded-full bg-hmr animate-ping opacity-50" />
        </motion.div>
      </div>
      <span className="font-mono-tech text-xs text-hmr-light">1000 km/h</span>
    </div>
  );
};

const HybridMaglevSection = () => {
  const [activePhase, setActivePhase] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={sectionRef}
      id="hybrid-maglev"
      className="py-32 relative overflow-hidden"
    >
      {/* Background effects */}
      <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
        <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-hmr-light/10 blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full bg-hmr-dark/20 blur-[170px]" />
      </motion.div>

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-20" />

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
            <span className="w-2 h-2 rounded-full bg-hmr animate-pulse" />
            <span className="font-mono-tech text-xs tracking-[0.15em] text-hmr-light uppercase">
              Operating Principle
            </span>
          </div>

          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            How <span className="text-gradient-hmr">Hybrid Maglev</span> Works
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            A staged transition from steel-on-steel rolling to full levitation,
            keeping compatibility with today's rail while unlocking tomorrow's speeds.
          </p>
        </motion.div>

        {/* Progress indicator */}
        <ProgressLine activeIndex={activePhase} />

        {/* Phase cards */}
        <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
          {phases.map((phase, index) => (
            <PhaseCard
              key={phase.title}
              phase={phase}
              index={index}
              isActive={activePhase === index}
              onClick={() => setActivePhase(index)}
            />
          ))}
        </div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 flex justify-center"
        >
          <div className="flex items-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full border-2 border-muted-foreground/30" />
              <span className="font-mono-tech text-xs">Wheels</span>
            </div>
            <div className="w-8 h-px bg-gradient-to-r from-muted-foreground/30 via-hmr/50 to-muted-foreground/30" />
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full border-2 border-hmr/50 bg-hmr/20" />
              <span className="font-mono-tech text-xs">Hybrid</span>
            </div>
            <div className="w-8 h-px bg-gradient-to-r from-muted-foreground/30 via-hmr/50 to-muted-foreground/30" />
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-hmr" />
              <span className="font-mono-tech text-xs">Maglev</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HybridMaglevSection;
