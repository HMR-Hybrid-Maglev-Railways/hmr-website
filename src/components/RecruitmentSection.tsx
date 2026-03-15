import { motion } from "framer-motion";
import {
  Wrench,
  Zap,
  Atom,
  Rocket,
  CheckCircle,
  TrendingUp,
  Users,
  Info,
  Clock,
  GraduationCap,
  Heart,
  Calendar,
  ChevronRight,
} from "lucide-react";

const disciplines = [
  {
    icon: Wrench,
    label: "Mechanical Engineering",
    tag: "ME",
    color: "badge-me",
    description: "Design and optimize the physical systems that make maglev technology possible.",
    skills: ["CAD/CAE (SolidWorks, ANSYS)", "Structural Analysis", "Prototyping", "FEA", "Materials Selection", "Manufacturing"],
    responsibilities: [
      "Design levitation and propulsion components",
      "Perform stress and fatigue analysis",
      "Develop prototypes using TU/e facilities",
    ],
  },
  {
    icon: Zap,
    label: "Electrical Engineering",
    tag: "EE",
    color: "badge-ee",
    description: "Build the power and control systems that drive our maglev vehicle.",
    skills: ["Power Electronics", "Control Systems", "PCB Design", "Motor Control", "Embedded Systems", "Signal Processing"],
    responsibilities: [
      "Design power distribution systems",
      "Implement control algorithms",
      "Develop embedded software for vehicle control",
    ],
  },
  {
    icon: Atom,
    label: "Applied Physics",
    tag: "AP",
    color: "badge-ap",
    description: "Research and model the electromagnetic principles behind magnetic levitation.",
    skills: ["Electromagnetics", "FEM Simulation", "Materials Science", "Mathematical Modeling", "MATLAB/Python", "Sensor Technology"],
    responsibilities: [
      "Model magnetic field interactions",
      "Optimize levitation gap control",
      "Conduct electromagnetic simulations",
    ],
  },
];

const benefitCategories = [
  {
    category: "Technical Skills",
    icon: Wrench,
    items: [
      "Work with cutting-edge maglev and electromagnetic technology",
      "Gain hands-on experience with professional engineering tools",
      "Access to TU/e's advanced labs and testing facilities",
      "Learn from interdisciplinary collaboration",
    ],
  },
  {
    category: "Career Development",
    icon: TrendingUp,
    items: [
      "Build a portfolio project valued by top engineering companies",
      "Present at international competitions and conferences",
      "Network with industry partners and TU/e faculty",
      "Receive mentorship from experienced engineers",
    ],
  },
  {
    category: "Personal Growth",
    icon: Users,
    items: [
      "Develop leadership and project management skills",
      "Work in a passionate, mission-driven team environment",
      "Contribute to sustainable transportation solutions",
      "Balance academics with meaningful extracurricular work",
    ],
  },
];

const RecruitmentSection = () => {
  return (
    <section id="recruitment" className="py-32 relative overflow-hidden">
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
            <Rocket className="w-4 h-4 text-hmr" />
            <span className="font-mono-tech text-xs tracking-[0.15em] text-hmr-light uppercase">
              Now Recruiting
            </span>
          </div>

          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Help Us Make Trains{" "}
            <span className="text-gradient-hmr">Fly</span>
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            We're looking for passionate engineering students at TU/e who want
            to push the boundaries of what's possible.
          </p>
        </motion.div>

        {/* Disciplines Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="font-mono-tech text-xs text-muted-foreground tracking-wider">
            DISCIPLINES WE'RE SEEKING
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {disciplines.map((d, i) => (
            <motion.div
              key={d.tag}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group"
            >
              <div className="rounded-2xl bg-card/80 backdrop-blur-sm border border-border p-6 hover:border-hmr/30 transition-all duration-300 h-full flex flex-col">
                {/* Icon & Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${d.color}`}
                  >
                    <d.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-lg font-semibold">
                      {d.label}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-foreground/80 mb-4 leading-relaxed">
                  {d.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {d.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 rounded-md bg-secondary/80 text-xs text-foreground/90"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Responsibilities */}
                <div className="pt-4 border-t border-border/50 mb-4 flex-1">
                  <p className="text-xs font-mono-tech text-muted-foreground mb-2 uppercase tracking-wider">
                    You'll Work On:
                  </p>
                  <ul className="space-y-1">
                    {d.responsibilities.map((resp, idx) => (
                      <li key={idx} className="text-sm text-foreground/80 flex items-start gap-2">
                        <ChevronRight className="w-3 h-3 text-hmr shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Requirements & Expectations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mb-12 p-6 rounded-xl border border-hmr/20 bg-card/60"
        >
          <h4 className="font-heading text-lg font-semibold mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-hmr" />
            What We're Looking For
          </h4>

          <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-hmr shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-foreground">Time Commitment:</span>
                <span> 8-12 hours/week (flexible around your academic schedule)</span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <GraduationCap className="w-4 h-4 text-hmr shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-foreground">Academic Standing:</span>
                <span> 2nd year Bachelor or higher, enrolled at TU/e</span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Heart className="w-4 h-4 text-hmr shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-foreground">Mindset:</span>
                <span> Passionate about sustainable tech, collaborative spirit, willingness to learn</span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Calendar className="w-4 h-4 text-hmr shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-foreground">Duration:</span>
                <span> Minimum half an academic year commitment</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="font-mono-tech text-xs text-muted-foreground tracking-wider mb-6 flex items-center gap-3">
            WHAT YOU'LL GAIN
            <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {benefitCategories.map((category, catIdx) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + catIdx * 0.1 }}
                className="rounded-xl border border-border bg-secondary/40 p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <category.icon className="w-5 h-5 text-hmr" />
                  <h5 className="font-heading text-base font-semibold">{category.category}</h5>
                </div>
                <ul className="space-y-2">
                  {category.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2 text-sm text-foreground/80">
                      <CheckCircle className="w-4 h-4 text-hmr shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RecruitmentSection;
