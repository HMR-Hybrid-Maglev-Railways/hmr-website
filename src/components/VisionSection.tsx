import { motion } from "framer-motion";
import { Wind, Zap, Building2, Globe, ArrowRight } from "lucide-react";
import { useState } from "react";

const cards = [
  {
    icon: Wind,
    title: "Frictionless Journey",
    description:
      "Passengers travel with the silence and smoothness of a glider—free from vibrations, oscillations, and turbulence of traditional rail.",
    detail: "Magnetic levitation eliminates rail contact, reducing noise by up to 95% compared to conventional high-speed rail.",
    stat: { value: "95%", label: "Noise Reduction" },
  },
  {
    icon: Zap,
    title: "Speed Meets Sustainability",
    description:
      "Intercountry travel so fast and energy-efficient that it naturally replaces short-haul flights, cutting Europe's carbon footprint.",
    detail: "Electric propulsion powered by renewable energy, with 70% lower emissions per passenger-kilometer than aviation.",
    stat: { value: "70%", label: "Lower Emissions" },
  },
  {
    icon: Building2,
    title: "Infrastructure as an Asset",
    description:
      "Thousands of kilometers of existing steel rail are not discarded but upgraded—the foundation for a new era of high-speed transit.",
    detail: "Retrofit approach preserves €500B+ of existing European rail infrastructure while enabling next-generation speeds.",
    stat: { value: "€500B+", label: "Infrastructure Value" },
  },
];

const routeNodes = [
  { city: "Amsterdam", x: 35, y: 25 },
  { city: "Brussels", x: 32, y: 40 },
  { city: "Paris", x: 28, y: 55 },
  { city: "Berlin", x: 55, y: 30 },
  { city: "Munich", x: 52, y: 50 },
  { city: "Milan", x: 45, y: 65 },
];

const EuropeMap = () => (
  <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Animated route lines */}
      {routeNodes.map((node, i) =>
        routeNodes.slice(i + 1).map((target, j) => (
          <motion.line
            key={`${node.city}-${target.city}`}
            x1={node.x}
            y1={node.y}
            x2={target.x}
            y2={target.y}
            stroke="hsl(var(--hmr-blue))"
            strokeWidth="0.3"
            strokeDasharray="2 2"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: (i + j) * 0.1 }}
          />
        ))
      )}
      {/* City nodes */}
      {routeNodes.map((node, i) => (
        <motion.g key={node.city}>
          <motion.circle
            cx={node.x}
            cy={node.y}
            r="1.5"
            fill="hsl(var(--hmr-blue))"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 + 0.5 }}
          />
          <motion.circle
            cx={node.x}
            cy={node.y}
            r="3"
            fill="none"
            stroke="hsl(var(--hmr-blue))"
            strokeWidth="0.2"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 + 0.6 }}
          />
        </motion.g>
      ))}
    </svg>
  </div>
);

const VisionCard = ({
  card,
  index,
}: {
  card: (typeof cards)[0];
  index: number;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative h-[380px] perspective-1000"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      {/* Card container with 3D flip */}
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front face */}
        <div
          className="absolute inset-0 rounded-2xl bg-card p-8 holographic card-lift border border-border/50"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Icon */}
          <div className="relative w-14 h-14 mb-6">
            <div className="absolute inset-0 rounded-xl bg-gradient-hmr opacity-20 blur-lg" />
            <div className="relative w-full h-full rounded-xl bg-gradient-hmr flex items-center justify-center">
              <card.icon className="w-7 h-7 text-primary-foreground" />
            </div>
          </div>

          {/* Content */}
          <h3 className="font-heading text-xl md:text-2xl font-semibold mb-4">
            {card.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {card.description}
          </p>

          {/* Hover hint */}
          <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between text-sm text-muted-foreground/60">
            <span className="font-mono-tech text-xs">Hover for details</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Back face */}
        <div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-secondary via-card to-secondary p-8 border border-hmr/30"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {/* Stat highlight */}
          <div className="mb-6">
            <p className="font-mono-tech text-xs text-hmr-light tracking-wider mb-2">
              KEY METRIC
            </p>
            <p className="font-heading text-4xl font-bold text-gradient-hmr">
              {card.stat.value}
            </p>
            <p className="font-mono-tech text-sm text-muted-foreground">
              {card.stat.label}
            </p>
          </div>

          {/* Detailed description */}
          <p className="text-foreground leading-relaxed mb-6">{card.detail}</p>

          {/* Bottom decoration */}
          <div className="absolute bottom-8 left-8 right-8">
            <div className="h-1 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-hmr"
                initial={{ width: "0%" }}
                animate={{ width: isFlipped ? "100%" : "0%" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const VisionSection = () => {
  return (
    <section id="vision" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-hmr-light/5 blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-hmr-dark/10 blur-[120px]" />
      </div>

      {/* Europe map background */}
      <EuropeMap />

      {/* Wave divider */}
      <div className="wave-divider" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-hmr/20 bg-secondary/30 backdrop-blur-sm mb-6">
            <Globe className="w-4 h-4 text-hmr" />
            <span className="font-mono-tech text-xs tracking-[0.15em] text-hmr-light uppercase">
              Our Vision
            </span>
          </div>

          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            A Europe Without{" "}
            <span className="text-gradient-hmr">Barriers</span>
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            We envision a Europe where borders are merely lines on a map, not
            barriers to travel. Where every major city is under 3 hours away.
          </p>
        </motion.div>

        {/* Vision cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, i) => (
            <VisionCard key={card.title} card={card} index={i} />
          ))}
        </div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-20 text-center"
        >
          <blockquote className="relative max-w-3xl mx-auto">
            <span className="absolute -top-4 -left-2 text-6xl text-hmr/20 font-serif">
              "
            </span>
            <p className="text-xl md:text-2xl text-foreground/80 italic leading-relaxed">
              The train of the future isn't about leaving the past behind—it's
              about building on the foundation our cities were made for.
            </p>
            <span className="absolute -bottom-8 -right-2 text-6xl text-hmr/20 font-serif">
              "
            </span>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionSection;
