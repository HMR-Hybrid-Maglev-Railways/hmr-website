import { motion } from "framer-motion";

const stats = [
  { value: "0", label: "Rolling Resistance" },
  { value: "Silent", label: "Operation" },
  { value: "90%", label: "Less Wear" },
  { value: "∞", label: "Potential" },
];

const goals = [
  {
    number: "01",
    title: "Eliminate Friction",
    description: "Lowering energy consumption and maintenance costs by removing physical contact at speed.",
  },
  {
    number: "02",
    title: "Seamless Integration",
    description: "Integrating with current European rail infrastructure to minimize land use and construction time.",
  },
  {
    number: "03",
    title: "Prove Viability",
    description: "Rigorous engineering and prototyping at TU/e to demonstrate retrofittable Maglev solutions.",
  },
];

const MissionSection = () => {
  return (
    <section id="mission" className="py-32 relative">
      {/* Subtle divider glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-hmr/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-hmr-light mb-4">Our Mission</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            Making Rail the <span className="text-gradient-hmr">Obvious Choice</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Revolutionizing long-distance travel by making the train the most attractive option for international journeys.
          </p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center p-6 rounded-xl bg-card border-gradient-hmr">
              <p className="font-heading text-3xl md:text-4xl font-bold text-gradient-hmr mb-2">{stat.value}</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Goals timeline */}
        <div className="space-y-8 max-w-3xl mx-auto">
          {goals.map((goal, i) => (
            <motion.div
              key={goal.number}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-6 items-start"
            >
              <span className="font-heading text-2xl font-bold text-hmr shrink-0">{goal.number}</span>
              <div className="border-l border-border pl-6">
                <h3 className="font-heading text-xl font-semibold mb-2">{goal.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{goal.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
