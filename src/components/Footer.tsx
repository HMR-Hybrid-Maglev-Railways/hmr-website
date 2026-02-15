const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-heading text-lg font-bold text-gradient-hmr mb-1">Hybrid Maglev Railways</p>
            <p className="text-sm text-muted-foreground">Student Team · Eindhoven University of Technology</p>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="mailto:team@hmr-tue.nl" className="hover:text-foreground transition-colors">
              Contact
            </a>
            <a href="https://www.tue.nl" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              TU/e
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} HMR — Hybrid Maglev Railways. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
