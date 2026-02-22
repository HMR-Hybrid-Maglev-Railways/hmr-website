import { motion } from "framer-motion";
import { Linkedin, Instagram, Mail, MapPin, ExternalLink } from "lucide-react";

const quickLinks = [
  { label: "How It Works", href: "#hybrid-maglev" },
  { label: "Vision", href: "#vision" },
  { label: "Mission", href: "#mission" },
  { label: "Technology", href: "#technology" },
  { label: "Team", href: "#team" },
  { label: "Join Us", href: "#join" },
];

const socialLinks = [
  { icon: Linkedin, href: "https://linkedin.com/company/hmr-tue", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com/hmr_tue", label: "Instagram" },
  { icon: Mail, href: "mailto:team@hmr-tue.nl", label: "Email" },
];

const Footer = () => {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Top wave divider */}
      <div className="absolute top-0 left-0 right-0 h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-hmr/50 to-transparent" />
      </div>

      {/* Animated wave */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden">
        <svg
          viewBox="0 0 1200 40"
          className="w-full h-10 fill-none"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0 20 Q 150 0 300 20 Q 450 40 600 20 Q 750 0 900 20 Q 1050 40 1200 20 V 40 H 0 Z"
            fill="hsl(var(--card))"
            initial={{ d: "M0 20 Q 150 0 300 20 Q 450 40 600 20 Q 750 0 900 20 Q 1050 40 1200 20 V 40 H 0 Z" }}
            animate={{
              d: [
                "M0 20 Q 150 0 300 20 Q 450 40 600 20 Q 750 0 900 20 Q 1050 40 1200 20 V 40 H 0 Z",
                "M0 20 Q 150 40 300 20 Q 450 0 600 20 Q 750 40 900 20 Q 1050 0 1200 20 V 40 H 0 Z",
                "M0 20 Q 150 0 300 20 Q 450 40 600 20 Q 750 0 900 20 Q 1050 40 1200 20 V 40 H 0 Z",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <div className="bg-card pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Main footer content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand column */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <img
                  src="/logo/hmr_logo.svg"
                  alt="HMR Logo"
                  className="h-12 w-auto mb-4"
                />
                <p className="text-muted-foreground leading-relaxed max-w-md">
                  A TU/e student team engineering the future of rail
                  transportation through hybrid maglev technology.
                </p>
              </motion.div>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex items-start gap-3 mb-6"
              >
                <MapPin className="w-5 h-5 text-hmr shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-foreground">
                    Eindhoven University of Technology
                  </p>
                  <p className="text-sm text-muted-foreground">
                    De Zaale, 5612 AZ Eindhoven, Netherlands
                  </p>
                </div>
              </motion.div>

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex gap-3"
              >
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg border border-border bg-secondary/30 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-hmr/30 transition-all"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </motion.div>
            </div>

            {/* Quick links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="font-heading text-lg font-semibold mb-4">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Partners / Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="font-heading text-lg font-semibold mb-4">
                Resources
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://www.tue.nl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    TU/e Website
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:team@hmr-tue.nl"
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:sponsors@hmr-tue.nl"
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    Sponsorship
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:press@hmr-tue.nl"
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    Press Inquiries
                  </a>
                </li>
              </ul>

              {/* TU/e badge */}
              <div className="mt-6 p-4 rounded-xl border border-border bg-secondary/20">
                <p className="font-mono-tech text-[10px] text-muted-foreground tracking-wider mb-2">
                  AFFILIATED WITH
                </p>
                <p className="font-heading font-semibold text-sm">
                  Eindhoven University of Technology
                </p>
              </div>
            </motion.div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Copyright */}
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} HMR — Hybrid Maglev Railways. All
                rights reserved.
              </p>

              {/* Status badge */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/50 bg-secondary/30">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="font-mono-tech text-xs text-muted-foreground">
                    Systems Operational
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative bottom element */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 flex justify-center"
          >
            <div className="flex items-center gap-2 text-muted-foreground/50">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-border" />
              <span className="font-mono-tech text-[10px] tracking-[0.3em]">
                ENGINEERING THE FUTURE
              </span>
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-border" />
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
