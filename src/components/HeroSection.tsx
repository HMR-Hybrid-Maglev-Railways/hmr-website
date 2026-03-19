import { motion, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { scrollTo } from "@/lib/utils";

const SpeedCounter = () => {
  const [speed, setSpeed] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const duration = 1500;
    const target = 800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setSpeed(target);
        clearInterval(timer);
      } else {
        setSpeed(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView]);

  return (
    <div ref={ref} className="flex items-baseline gap-2">
      <span className="speed-counter text-6xl md:text-8xl font-bold text-gradient-animated">
        {speed}
      </span>
      <span className="font-mono-tech text-xl md:text-2xl text-muted-foreground">km/h</span>
    </div>
  );
};

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const timer = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(timer);
          setTimeout(() => setShowCursor(false), 1000);
        }
      }, 50);
      return () => clearInterval(timer);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <span>
      {displayText}
      {showCursor && <span className="typewriter-cursor" />}
    </span>
  );
};

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-hmr/20 bg-secondary/30 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-hmr animate-pulse" />
            <span className="font-mono-tech text-xs md:text-sm tracking-[0.15em] text-hmr-light uppercase">
              Hybrid Maglev Railways
            </span>
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-6"
        >
          Engineering the
          <br />
          <span className="text-gradient-hmr">Future of Rail</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          A TU/e engineering team developing retrofittable maglev technology
          that runs on Europe's existing rail network — no new infrastructure,
          just a step change in speed and sustainability.
        </motion.p>

        {/* Speed counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col items-center gap-2 mb-14"
        >
          <SpeedCounter />
          <p className="font-mono-tech text-sm text-muted-foreground tracking-wider">
            TARGET CRUISING SPEED
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => scrollTo("#recruitment")}
            className="group relative px-8 py-4 rounded-xl overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-hmr" />
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10" />
            <span className="relative text-primary-foreground font-heading font-semibold text-base flex items-center justify-center gap-2">
              Join the Team
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
            {/* Glow */}
            <span className="absolute inset-0 rounded-xl glow-blue opacity-50 group-hover:opacity-100 transition-opacity" />
          </button>

          <button
            onClick={() => scrollTo("#contact")}
            className="group px-8 py-4 rounded-xl border border-border bg-card/30 backdrop-blur-sm text-foreground font-heading font-semibold text-base hover:bg-secondary/50 hover:border-hmr/30 transition-all flex items-center justify-center gap-2"
          >
            <span>Partner With Us</span>
            <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo("#hybrid-maglev")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
        aria-label="Scroll down"
      >
        <span className="font-mono-tech text-[10px] tracking-[0.2em] uppercase opacity-60">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 rounded-full border border-border flex items-start justify-center p-2 group-hover:border-hmr/50 transition-colors"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1 h-2 rounded-full bg-hmr"
          />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default HeroSection;
