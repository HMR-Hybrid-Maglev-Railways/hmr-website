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
      className="group relative h-[380px]"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      {/* Card container */}
      <div className="relative w-full h-full">
        {/* Front face */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-card p-8 holographic card-lift border border-border/50"
          animate={{
            opacity: isFlipped ? 0 : 1,
            y: isFlipped ? -10 : 0,
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
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
        </motion.div>

        {/* Back face */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-secondary via-card to-secondary p-8 border border-hmr/30"
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: isFlipped ? 1 : 0,
            y: isFlipped ? 0 : 10,
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{ pointerEvents: isFlipped ? "auto" : "none" }}
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
        </motion.div>
      </div>
    </motion.div>
  );
};

const VisionSection = () => {
  return (
    <section id="vision" className="py-32 relative overflow-hidden">
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
