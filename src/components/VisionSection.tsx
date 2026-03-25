import { motion } from "framer-motion";
import {
  Timer,
  Waves,
  Leaf,
  Network,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useCallback, useEffect, useRef } from "react";

const cards = [
  {
    icon: Timer,
    title: "Flying on the Rail",
    description:
      "Imagine boarding a train in Amsterdam and arriving in Paris in under an hour — without ever leaving the ground. Magnetic levitation eliminates physical contact between the train and the track, virtually removing friction from the equation. The result is a system that can sustain cruising speeds above 500 km/h, cutting journey times between major European cities by half compared to today's fastest services.",
    stat: { value: "50%", label: "Travel Time Reduction" },
  },
  {
    icon: Waves,
    title: "Smooth Journey",
    description:
      "Without wheels striking rails, the ride becomes remarkably quiet and stable — no clatter, no vibration, no lateral sway. Passengers experience the smoothness of a glider, free from the turbulence and oscillations of conventional high-speed rail. Noise output drops by up to 80% at equivalent speeds, making the system far less disruptive to communities along the route and dramatically more comfortable for those on board.",
    stat: { value: "80%", label: "Noise Reduction" },
  },
  {
    icon: Leaf,
    title: "Speed Meets Sustainability",
    description:
      "By delivering door-to-door travel times that better than short-haul aviation, maglev rail naturally shifts passengers away from the most carbon-intensive mode of transport. The system runs on electric propulsion designed to integrate with renewable energy grids, achieving up to 95% lower CO₂ emissions per passenger-kilometer than flying with potential to zero emission. At scale, this shift could eliminate millions of tonnes of aviation emissions annually across Europe.",
    stat: { value: "95%", label: "Lower Emissions" },
  },
  {
    icon: Network,
    title: "Smooth Infrastructure Integration",
    description:
      "Europe's rail network represents over half a trillion euros of built infrastructure — stations, bridges, tunnels, and right-of-way corridors developed over more than a century. Rather than starting from scratch, our hybrid approach retrofits existing steel rail to support both conventional and maglev operations on the same tracks. This preserves the enormous value already in the ground while unlocking next-generation speeds on routes that matter most.",
    stat: { value: "€500B+", label: "Infrastructure Value" },
  },
];

const CARD_GAP = 24; // px gap between cards

const VisionCard = ({
  card,
  isActive,
}: {
  card: (typeof cards)[0];
  isActive: boolean;
}) => {
  return (
    <motion.div
      animate={{
        opacity: isActive ? 1 : 0.35,
        scale: isActive ? 1 : 0.92,
      }}
      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      className="group/card rounded-2xl bg-card p-8 holographic border border-border/50 h-full flex flex-col"
    >
      {/* Top row: icon + stat */}
      <div className="flex items-start justify-between mb-6">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-xl bg-gradient-hmr opacity-20 blur-lg" />
          <div className="relative w-full h-full rounded-xl bg-gradient-hmr flex items-center justify-center">
            <card.icon className="w-7 h-7 text-primary-foreground" />
          </div>
        </div>

        {/* Stat badge */}
        <div className="text-right transition-transform duration-300 ease-out group-hover/card:scale-110 origin-top-right">
          <p className="font-heading text-3xl font-bold text-gradient-hmr leading-none">
            {card.stat.value}
          </p>
          <p className="font-mono-tech text-[11px] text-muted-foreground tracking-wider mt-1">
            {card.stat.label}
          </p>
        </div>
      </div>

      {/* Title */}
      <h3 className="font-heading text-xl md:text-2xl font-semibold mb-4">
        {card.title}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground leading-relaxed">{card.description}</p>
    </motion.div>
  );
};

const TrackNavigator = ({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
}) => {
  const progress = activeIndex / (cards.length - 1);

  return (
    <div className="relative max-w-lg mx-auto mt-12">
      {/* Rail line */}
      <div className="absolute top-[10px] left-[5%] right-[5%] h-[2px] bg-border" />

      {/* Animated progress fill */}
      <motion.div
        className="absolute top-[10px] left-[5%] h-[2px] bg-gradient-hmr origin-left"
        animate={{ width: `${progress * 90}%` }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      />

      {/* Nodes */}
      <div className="relative flex justify-between px-[5%]">
        {cards.map((card, i) => {
          const isActive = i === activeIndex;
          const isPast = i <= activeIndex;

          return (
            <button
              key={card.title}
              onClick={() => onSelect(i)}
              className="flex flex-col items-center gap-3 group relative"
            >
              {/* Node dot */}
              <div className="relative">
                <div
                  className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                    isActive
                      ? "border-hmr bg-hmr scale-110"
                      : isPast
                        ? "border-hmr bg-hmr/40"
                        : "border-border bg-card group-hover:border-hmr/50"
                  }`}
                />

                {/* Active glow ring */}
                {isActive && (
                  <motion.div
                    layoutId="visionActiveNode"
                    className="absolute -inset-2 rounded-full border-2 border-hmr/40"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </div>

              {/* Label — hidden on small screens */}
              <span
                className={`hidden sm:block font-mono-tech text-[10px] tracking-wider text-center max-w-[80px] leading-tight transition-colors duration-300 ${
                  isActive
                    ? "text-hmr-light"
                    : "text-muted-foreground/50 group-hover:text-muted-foreground"
                }`}
              >
                {card.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const VisionSection = () => {
  const [[activeIndex, direction], setPage] = useState([0, 0]);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);

  // Measure card width from the container
  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      const containerW = containerRef.current.offsetWidth;
      // Card takes ~75% of container on desktop, ~90% on mobile, capped at 75ch (~680px)
      const ratio = window.innerWidth >= 768 ? 0.75 : 0.9;
      setCardWidth(Math.min(containerW * ratio, 680));
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const navigate = useCallback(
    (newIndex: number) => {
      if (newIndex < 0 || newIndex >= cards.length) return;
      const dir = newIndex > activeIndex ? 1 : -1;
      setPage([newIndex, dir]);
    },
    [activeIndex],
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        navigate(activeIndex - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        navigate(activeIndex + 1);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, navigate]);

  const handleDragEnd = (
    _: unknown,
    info: { offset: { x: number }; velocity: { x: number } },
  ) => {
    const swipeThreshold = 50;
    const velocityThreshold = 300;

    if (
      info.offset.x > swipeThreshold ||
      info.velocity.x > velocityThreshold
    ) {
      navigate(activeIndex - 1);
    } else if (
      info.offset.x < -swipeThreshold ||
      info.velocity.x < -velocityThreshold
    ) {
      navigate(activeIndex + 1);
    }
  };

  // Calculate the x offset to center the active card
  // Each card is `cardWidth` wide with `CARD_GAP` between them
  // The strip starts at x=0 where card 0 is at the left edge of the container
  // To center card N: shift by -(N * (cardWidth + gap)) + (containerWidth - cardWidth) / 2
  const containerWidth = containerRef.current?.offsetWidth ?? 0;
  const peekOffset = (containerWidth - cardWidth) / 2;
  const stripX = -(activeIndex * (cardWidth + CARD_GAP)) + peekOffset;

  return (
    <section
      id="vision"
      ref={sectionRef}
      className="py-16 md:py-32 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-hmr/20 bg-secondary/30 backdrop-blur-sm mb-6">
            <Globe className="w-4 h-4 text-hmr" />
            <span className="font-mono-tech text-xs tracking-[0.15em] text-hmr-light uppercase">
              Our Vision
            </span>
          </div>

          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            A Europe{" "}
            <span className="text-gradient-hmr">Without Barriers</span>
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            We envision a Europe where borders are merely lines on a map, not
            barriers to travel. Where every major city is under 3 hours away.
          </p>
        </motion.div>

        {/* Slider viewport */}
        <div className="relative">
          {/* Arrow navigation — hidden on mobile */}
          <button
            onClick={() => navigate(activeIndex - 1)}
            className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-11 h-11 rounded-full bg-secondary/60 backdrop-blur-sm border border-border/50 hover:bg-secondary hover:border-hmr/30 transition-all ${
              activeIndex === 0
                ? "opacity-0 pointer-events-none"
                : "opacity-100"
            }`}
            aria-label="Previous card"
          >
            <ChevronLeft className="w-5 h-5 text-muted-foreground" />
          </button>

          <button
            onClick={() => navigate(activeIndex + 1)}
            className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-11 h-11 rounded-full bg-secondary/60 backdrop-blur-sm border border-border/50 hover:bg-secondary hover:border-hmr/30 transition-all ${
              activeIndex === cards.length - 1
                ? "opacity-0 pointer-events-none"
                : "opacity-100"
            }`}
            aria-label="Next card"
          >
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* Card strip container */}
          <div ref={containerRef} className="overflow-hidden">
            <motion.div
              className="flex cursor-grab active:cursor-grabbing"
              style={{ gap: CARD_GAP }}
              animate={{ x: stripX }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={handleDragEnd}
            >
              {cards.map((card, i) => (
                <div
                  key={card.title}
                  className="flex-shrink-0"
                  style={{ width: cardWidth || "65%" }}
                  onClick={() => {
                    if (i !== activeIndex) navigate(i);
                  }}
                >
                  <VisionCard card={card} isActive={i === activeIndex} />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Track-line navigator */}
        <TrackNavigator activeIndex={activeIndex} onSelect={navigate} />

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-20 text-center"
        >
          <blockquote className="relative max-w-3xl mx-auto">
            <span className="absolute -top-4 -left-2 text-6xl text-hmr/20 font-serif">
              "
            </span>
            <p className="text-xl md:text-2xl text-foreground/80 italic leading-relaxed">
              The train of the future isn't about leaving the past behind—it's
              about building on the foundation our cities were made for.
            </p>
            <span className="absolute -bottom-8 -right-2 text-6xl text-hmr/20 font-serif">
              "
            </span>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionSection;
