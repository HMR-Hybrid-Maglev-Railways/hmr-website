import { motion } from "framer-motion";
import { Wrench, BoltIcon, Atom } from "lucide-react";

const disciplines = [
  { icon: Wrench, label: "Mechanical Engineering" },
  { icon: BoltIcon, label: "Electrical Engineering" },
  { icon: Atom, label: "Applied Physics" },
];

const JoinSection = () => {
  return (
    <section id="join" className="py-32 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-hmr/30 to-transparent" />

      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm uppercase tracking-[0.2em] text-hmr-light mb-4">Get Involved</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            Help Us Make Trains <span className="text-gradient-hmr">Fly</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-12">
            We're looking for passionate engineering students at TU/e who want to push the boundaries of what's possible.
          </p>
        </motion.div>

        {/* Disciplines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14"
        >
          {disciplines.map((d) => (
            <div key={d.label} className="flex items-center justify-center gap-3 p-5 rounded-xl bg-card border-gradient-hmr">
              <d.icon className="w-5 h-5 text-hmr" />
              <span className="font-heading font-medium">{d.label}</span>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="mailto:team@hmr-tue.nl"
            className="px-8 py-3.5 rounded-lg bg-gradient-hmr text-primary-foreground font-heading font-semibold text-base hover:opacity-90 transition-opacity glow-blue"
          >
            Join the Team
          </a>
          <a
            href="mailto:sponsors@hmr-tue.nl"
            className="px-8 py-3.5 rounded-lg border border-border text-foreground font-heading font-semibold text-base hover:bg-secondary transition-colors"
          >
            Partner with Us
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default JoinSection;
