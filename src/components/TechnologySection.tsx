import { motion } from "framer-motion";
import { Magnet, RefreshCw, Cpu } from "lucide-react";

const techItems = [
  {
    icon: Magnet,
    title: "Electromagnetic Levitation",
    subtitle: "Flying above the tracks",
    points: [
      "Zero Rolling Resistance — higher speeds with less energy input",
      "Silent Operation — dramatic noise reduction for communities",
      "Maintenance Reduction — no friction means far less wear",
    ],
  },
  {
    icon: RefreshCw,
    title: "Backward Compatibility",
    subtitle: "The Hybrid advantage",
    points: [
      "Dual-Mode Capability — maglev at speed, wheels in stations",
      "Infrastructure Overlay — retrofit existing tracks into magnetic guideways",
      "No new land or raw materials needed",
    ],
  },
  {
    icon: Cpu,
    title: "Engineering Process",
    subtitle: "Multidisciplinary innovation",
    points: [
      "Mechanical, Electrical & Applied Physics teams",
      "Simulate, build, and test prototypes at TU/e",
      "Turning science fiction into reachable reality",
    ],
  },
];

const TechnologySection = () => {
  return (
    <section id="technology" className="py-32 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-hmr/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-hmr-light mb-4">Our Technology</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            The <span className="text-gradient-hmr">Hybrid Interface</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The critical technology that allows a train to levitate over standard railway tracks.
          </p>
        </motion.div>

        <div className="space-y-12">
          {techItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-xl bg-card border-gradient-hmr p-8 md:p-10"
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-14 h-14 rounded-xl bg-gradient-hmr flex items-center justify-center shrink-0">
                  <item.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-hmr-light uppercase tracking-wider mb-1">{item.subtitle}</p>
                  <h3 className="font-heading text-2xl font-semibold mb-4">{item.title}</h3>
                  <ul className="space-y-3">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-hmr mt-2 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Connecting glow line */}
              {i < techItems.length - 1 && (
                <div className="hidden md:block w-px h-12 bg-gradient-to-b from-hmr/30 to-transparent mx-auto mt-8" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
