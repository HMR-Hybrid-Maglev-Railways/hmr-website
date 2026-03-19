import { motion } from "framer-motion";
import { Linkedin, Instagram, Mail, MapPin, ExternalLink } from "lucide-react";
import { scrollTo } from "@/lib/utils";

const linksColA = [
  { label: "How It Works", href: "#hybrid-maglev", type: "scroll" as const },
  { label: "Vision", href: "#vision", type: "scroll" as const },
  { label: "Mission", href: "#mission", type: "scroll" as const },
  { label: "Team", href: "#team", type: "scroll" as const },
];

const linksColB = [
  { label: "Join Us", href: "#recruitment", type: "scroll" as const },
  { label: "Contact Us", href: "#contact", type: "scroll" as const },
  { label: "TU/e Website", href: "https://www.tue.nl", type: "external" as const },
  { label: "Sponsorship", href: "mailto:board.hmr@gmail.com", type: "link" as const },
];

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/company/hybrid-maglev-railways/", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/hmr_hybridmaglevrailways/", label: "Instagram" },
  { icon: Mail, href: "mailto:board.hmr@gmail.com", label: "Email" },
];

const LinkItem = ({
  item,
  scrollTo,
}: {
  item: (typeof linksColA)[0] | (typeof linksColB)[0];
  scrollTo: (href: string) => void;
}) => {
  const className =
    "group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200";
  const arrow = (
    <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-hmr text-xs">
      →
    </span>
  );

  if (item.type === "scroll") {
    return (
      <button onClick={() => scrollTo(item.href)} className={className}>
        {arrow}
        {item.label}
      </button>
    );
  }
  return (
    <a
      href={item.href}
      target={item.type === "external" ? "_blank" : undefined}
      rel={item.type === "external" ? "noopener noreferrer" : undefined}
      className={className}
    >
      {arrow}
      {item.label}
      {item.type === "external" && <ExternalLink className="w-3 h-3 opacity-50" />}
    </a>
  );
};

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-background">
      {/* Top separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-hmr/40 to-transparent" />

      {/* Footer nav grid */}
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-10">
        <div className="grid md:grid-cols-[2fr_1fr_1fr] gap-12 mb-12">

          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={`${import.meta.env.BASE_URL}logo/hmr_logo.svg`}
              alt="HMR Logo"
              className="h-16 w-auto mb-5"
              width={64}
              height={64}
            />
            <p className="text-muted-foreground leading-relaxed max-w-sm mb-6 text-sm">
              A TU/e engineering team developing retrofittable hybrid maglev
              technology for Europe's existing rail network.
            </p>

            {/* Location */}
            <div className="flex items-start gap-2.5 mb-6">
              <MapPin className="w-4 h-4 text-hmr shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-foreground/80">Eindhoven University of Technology</p>
                <p className="text-xs text-muted-foreground">De Zaale, 5612 AZ Eindhoven, Netherlands</p>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg border border-border bg-secondary/20 flex items-center justify-center text-muted-foreground hover:text-hmr-light hover:border-hmr/40 hover:shadow-[0_0_14px_hsl(var(--hmr-glow)/0.35)] transition-all duration-200"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Links column A */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="font-mono-tech text-[10px] tracking-[0.18em] text-muted-foreground uppercase mb-5">
              Explore
            </p>
            <ul className="space-y-3">
              {linksColA.map((link) => (
                <li key={link.href}>
                  <LinkItem item={link} scrollTo={scrollTo} />
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Links column B */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <p className="font-mono-tech text-[10px] tracking-[0.18em] text-muted-foreground uppercase mb-5">
              Connect
            </p>
            <ul className="space-y-3">
              {linksColB.map((link) => (
                <li key={link.label}>
                  <LinkItem item={link} scrollTo={scrollTo} />
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom strip */}
        <div className="h-px bg-gradient-to-r from-transparent via-hmr/15 to-transparent mb-5" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} HMR — Hybrid Maglev Railways. All rights reserved.
          </p>
          <span className="font-mono-tech text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
            TU/e · Eindhoven · Netherlands
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
