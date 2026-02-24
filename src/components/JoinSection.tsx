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
} from "lucide-react";

const disciplines = [
  {
    icon: Wrench,
    label: "Mechanical Engineering",
    tag: "ME",
    color: "badge-me",
    skills: ["CAD/CAE", "Structural Analysis", "Prototyping"],
  },
  {
    icon: Zap,
    label: "Electrical Engineering",
    tag: "EE",
    color: "badge-ee",
    skills: ["Power Systems", "Control Theory", "PCB Design"],
  },
  {
    icon: Atom,
    label: "Applied Physics",
    tag: "AP",
    color: "badge-ap",
    skills: ["Electromagnetics", "Simulation", "Materials Science"],
  },
];

const benefits = [
  "Work on cutting-edge maglev technology",
  "Gain hands-on engineering experience",
  "Be part of a passionate student team",
  "Access to TU/e labs and resources",
  "Present at international competitions",
  "Build your professional network",
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

                        {/* Skills */}
                        <div className="flex flex-wrap gap-2">
                          {d.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-1 rounded-md bg-secondary/50 text-xs text-muted-foreground"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Arrow */}
                      <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Benefits list */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-8"
            >
              <p className="font-mono-tech text-xs text-muted-foreground tracking-wider mb-4">
                WHAT YOU'LL GAIN
              </p>
              <div className="grid grid-cols-2 gap-3">
                {benefits.map((benefit, i) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.05 }}
                    className="flex items-start gap-2"
                  >
                    <CheckCircle className="w-4 h-4 text-hmr shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">
                      {benefit}
                    </span>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinSection;
