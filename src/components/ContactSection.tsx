import { motion } from "framer-motion";
import {
  Mail,
  Handshake,
  Share2,
  ArrowRight,
  Linkedin,
  Instagram,
  Send,
  CheckCircle,
} from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-32 relative overflow-hidden">
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
            <Send className="w-4 h-4 text-hmr" />
            <span className="font-mono-tech text-xs tracking-[0.15em] text-hmr-light uppercase">
              Multiple Ways to Connect
            </span>
          </div>

          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Get in{" "}
            <span className="text-gradient-hmr">Touch</span>
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Ready to join our team, explore partnerships, or just follow our journey?
            We'd love to hear from you.
          </p>
        </motion.div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Apply Now Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-2xl bg-gradient-to-br from-card via-card to-secondary/50 border border-border overflow-hidden h-full flex flex-col">
              {/* Header gradient */}
              <div className="h-2 bg-gradient-hmr" />

              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-hmr flex items-center justify-center">
                    <Mail className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-semibold">
                      Join the Team
                    </h3>
                    <p className="text-sm text-foreground/70">
                      Applications open for TU/e students
                    </p>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed flex-1">
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
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Partner With Us Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="rounded-2xl bg-card/80 backdrop-blur-sm border border-border p-8 h-full flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl border border-border bg-secondary flex items-center justify-center">
                  <Handshake className="w-7 h-7 text-hmr" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold">
                    Partner With Us
                  </h3>
                  <p className="text-sm text-foreground/70">
                    Sponsorship & collaboration
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground mb-4 leading-relaxed">
                Align your brand with the future of sustainable rail. We offer
                meaningful partnership tiers for companies that share our vision.
              </p>

              <a
                href="mailto:board.hmr@gmail.com"
                className="group flex items-center justify-between w-full px-6 py-4 rounded-xl border border-border bg-secondary/30 text-foreground hover:border-hmr/30 hover:bg-secondary/50 transition-all"
              >
                <div className="flex flex-col">
                  <span className="font-heading font-semibold">Get in Touch</span>
                  <span className="font-mono-tech text-sm font-normal text-foreground/70">
                    board.hmr@gmail.com
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-foreground/70 group-hover:translate-x-1 group-hover:text-foreground transition-all" />
              </a>
            </div>
          </motion.div>

          {/* Social Links Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="sm:col-span-2 lg:col-span-1"
          >
            <div className="rounded-2xl bg-card/80 backdrop-blur-sm border border-border p-8 h-full flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl border border-border bg-secondary flex items-center justify-center">
                  <Share2 className="w-7 h-7 text-hmr" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold">
                    Follow Our Journey
                  </h3>
                  <p className="text-sm text-foreground/70">
                    Stay updated on social media
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed flex-1">
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
    </section>
  );
};

export default ContactSection;
