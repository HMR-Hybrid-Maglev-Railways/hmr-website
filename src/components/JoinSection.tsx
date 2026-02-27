import { motion } from "framer-motion";
import {
  Wrench,
  Zap,
  Atom,
  Rocket,
  Mail,
  Handshake,
  ArrowRight,
  CheckCircle,
  Share2,
  Linkedin,
  Instagram,
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
    requirements: "2nd year+ Bachelor or Master student in Mechanical Engineering",
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
    requirements: "2nd year+ Bachelor or Master student in Electrical Engineering",
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
    requirements: "2nd year+ Bachelor or Master student in Applied Physics",
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

const JoinSection = () => {
  return (
    <section id="join" className="py-32 relative overflow-hidden">
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

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Disciplines */}
          <div>
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

            <div className="space-y-4">
              {disciplines.map((d, i) => (
                <motion.div
                  key={d.tag}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group"
                >
                  <div className="rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 p-6 hover:border-hmr/30 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${d.color}`}
                      >
                        <d.icon className="w-6 h-6 text-white" />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-heading text-lg font-semibold">
                            {d.label}
                          </h3>
                          <span className="px-2 py-0.5 rounded-full bg-secondary text-[10px] font-mono-tech tracking-wider text-muted-foreground">
                            {d.tag}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                          {d.description}
                        </p>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {d.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-1 rounded-md bg-secondary/50 text-xs text-muted-foreground"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        {/* Responsibilities */}
                        {d.responsibilities && (
                          <div className="pt-4 border-t border-border/50">
                            <p className="text-xs font-mono-tech text-muted-foreground mb-2 uppercase tracking-wider">
                              You'll Work On:
                            </p>
                            <ul className="space-y-1">
                              {d.responsibilities.map((resp, idx) => (
                                <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                                  <ChevronRight className="w-3 h-3 text-hmr shrink-0 mt-0.5" />
                                  <span>{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Requirements */}
                        <div className="mt-3 pt-3 border-t border-border/30">
                          <p className="text-[10px] font-mono-tech text-muted-foreground flex items-start gap-1">
                            <GraduationCap className="w-3 h-3 shrink-0" />
                            {d.requirements}
                          </p>
                        </div>
                      </div>

                      {/* Arrow */}
                      <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
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
              className="mt-10 p-6 rounded-xl border border-hmr/20 bg-card/30"
            >
              <h4 className="font-heading text-lg font-semibold mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-hmr" />
                What We're Looking For
              </h4>

              <div className="space-y-3 text-sm text-muted-foreground">
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
                    <span> Minimum 1 academic year commitment (September-August)</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Benefits list */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              <p className="font-mono-tech text-xs text-muted-foreground tracking-wider mb-4">
                WHAT YOU'LL GAIN
              </p>
              <div className="space-y-4">
                {benefitCategories.map((category, catIdx) => (
                  <motion.div
                    key={category.category}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + catIdx * 0.1 }}
                    className="rounded-lg border border-border/50 bg-secondary/20 p-4"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <category.icon className="w-4 h-4 text-hmr" />
                      <h5 className="font-heading text-sm font-semibold">{category.category}</h5>
                    </div>
                    <ul className="space-y-2">
                      {category.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <CheckCircle className="w-3 h-3 text-hmr shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Contact cards */}
          <div className="space-y-6">
            {/* Join card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="rounded-2xl bg-gradient-to-br from-card via-card to-secondary/50 border border-border overflow-hidden">
                {/* Header gradient */}
                <div className="h-2 bg-gradient-hmr" />

                <div className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-hmr flex items-center justify-center">
                      <Mail className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-semibold">
                        Join the Team
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Applications open for TU/e students
                      </p>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Fill out our application form with your details and tell us
                    why you want to be part of HMR. We'll get back to you within a
                    week.
                  </p>

                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdC70GmIn8hGNJdvvRUFeUNFvddyR6NKyY6yy6bCBYOkEwm-Q/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between w-full px-6 py-4 rounded-xl bg-gradient-hmr text-primary-foreground font-heading font-semibold hover:opacity-90 transition-opacity"
                  >
                    <span>Apply Now</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono-tech text-sm font-normal opacity-80">
                        Application Form
                      </span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Partner card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="rounded-2xl bg-card/50 backdrop-blur-sm border border-border p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl border border-border bg-secondary flex items-center justify-center">
                    <Handshake className="w-7 h-7 text-hmr" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-semibold">
                      Partner With Us
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Sponsorship & collaboration
                    </p>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Interested in supporting the future of rail? We're open to
                  partnerships with companies aligned with our vision.
                </p>

                <a
                  href="mailto:board.hmr@gmail.com"
                  className="group flex items-center justify-between w-full px-6 py-4 rounded-xl border border-border bg-secondary/30 text-foreground font-heading font-semibold hover:border-hmr/30 hover:bg-secondary/50 transition-all"
                >
                  <span>Get in Touch</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono-tech text-sm font-normal text-muted-foreground">
                      board.hmr@gmail.com
                    </span>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 group-hover:text-foreground transition-all" />
                  </div>
                </a>
              </div>
            </motion.div>

            {/* Social Links card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="rounded-2xl bg-card/50 backdrop-blur-sm border border-border p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl border border-border bg-secondary flex items-center justify-center">
                    <Share2 className="w-7 h-7 text-hmr" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-semibold">
                      Follow Our Journey
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Stay updated on social media
                    </p>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Join our community and follow along as we engineer the future of rail transportation.
                </p>

                <div className="flex flex-col gap-3">
                  <a
                    href="https://www.linkedin.com/company/hybrid-maglev-railways/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between w-full px-6 py-4 rounded-xl border border-border bg-secondary/30 hover:border-hmr/30 hover:bg-secondary/50 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Linkedin className="w-5 h-5 text-[#0A66C2]" />
                      <span className="font-heading font-semibold">LinkedIn</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 group-hover:text-foreground transition-all" />
                  </a>

                  <a
                    href="https://www.instagram.com/hmr_hybridmaglevrailways/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between w-full px-6 py-4 rounded-xl border border-border bg-secondary/30 hover:border-hmr/30 hover:bg-secondary/50 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Instagram className="w-5 h-5 text-[#E4405F]" />
                      <span className="font-heading font-semibold">Instagram</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 group-hover:text-foreground transition-all" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinSection;
