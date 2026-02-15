import { motion } from "framer-motion";
import { Wind, Zap, Building2 } from "lucide-react";

const cards = [
  {
    icon: Wind,
    title: "Frictionless Journey",
    description:
      "Passengers travel with the silence and smoothness of a glider—free from vibrations, oscillations, and turbulence of traditional rail.",
  },
  {
    icon: Zap,
    title: "Speed Meets Sustainability",
    description:
      "Intercountry travel so fast and energy-efficient that it naturally replaces short-haul flights, cutting Europe's carbon footprint.",
  },
  {
    icon: Building2,
    title: "Infrastructure as an Asset",
    description:
      "Thousands of kilometers of existing steel rail are not discarded but upgraded—the foundation for a new era of high-speed transit.",
  },
];

const VisionSection = () => {
  return (
    <section id="vision" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-hmr-light mb-4">Our Vision</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            A Europe Without <span className="text-gradient-hmr">Barriers</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We envision a Europe where borders are merely lines on a map, not barriers to travel.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative rounded-xl bg-card p-8 border-gradient-hmr hover:bg-secondary/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-hmr flex items-center justify-center mb-6">
                <card.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-3">{card.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
