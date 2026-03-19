import { motion } from "framer-motion";
import { Users, Linkedin, Wrench, Zap, Database, Megaphone } from "lucide-react";
import { useState } from "react";

type Discipline = "all" | "ME" | "EE" | "DS" | "IE";

const photo = (name: string) =>
  `${import.meta.env.BASE_URL}team_photos/personal/${name}.webp`;

const teamMembers = [
  {
    name: "Lars Hilkens",
    role: "Team Lead",
    discipline: "ME" as const,
    image: photo("lars"),
    linkedin: "https://www.linkedin.com/in/lars-hilkens/",
  },
  {
    name: "Kirill Chekmenev",
    role: "Project Lead",
    discipline: "DS" as const,
    image: photo("kirill"),
    linkedin: "https://www.linkedin.com/in/kirill-chekmenev/",
  },
  {
    name: "Andreas Christoforou",
    role: "Engineer",
    discipline: "ME" as const,
    image: photo("andreas"),
    linkedin: "https://www.linkedin.com/in/andreas-christoforou-39698033a/",
  },
  {
    name: "José Ledesma Martin",
    role: "Engineer",
    discipline: "ME" as const,
    image: photo("jose"),
    linkedin: "https://www.linkedin.com/in/jose-luis-ledesma-martin-1360b832b/",
  },
  {
    name: "Gustavs Grecihins",
    role: "Engineer",
    discipline: "ME" as const,
    image: photo("gustavs"),
    linkedin: "https://www.linkedin.com/in/gustavs-gre%C4%8Dihins-b37553342/",
  },
  {
    name: "Ahmed Elsaid",
    role: "Engineer",
    discipline: "EE" as const,
    image: photo("ahmed"),
    linkedin: "https://www.linkedin.com/in/ahmed-elsaid-4815b8292/",
  },
  {
    name: "Nabeel Shaikh",
    role: "Engineer",
    discipline: "EE" as const,
    image: photo("nabeel"),
    linkedin: "https://www.linkedin.com/in/nabeel-shaikh-a51413363/",
  },
  {
    name: "Yuexi Yang",
    role: "Data Analyst",
    discipline: "DS" as const,
    image: photo("yuexi"),
    linkedin: "https://www.linkedin.com/in/yuexi-yang-636114333/",
  },
  {
    name: "Zofia Bilewicz",
    role: "Data Analyst",
    discipline: "DS" as const,
    image: photo("zofia"),
    linkedin: "https://www.linkedin.com/in/zofia-bilewicz-09536b25a/",
  },
  {
    name: "Tigran Bagdasaryan",
    role: "PR Manager",
    discipline: "IE" as const,
    image: photo("tigran"),
    linkedin: "https://www.linkedin.com/in/tigran-bagdasaryan-52207133b/",
  },
  {
    name: "Alisa Morozova",
    role: "Social Media Manager / Engineer",
    discipline: "EE" as const,
    image: null as string | null,
    linkedin: "https://www.linkedin.com/in/alisa-morozova-2b2b87210/",
  },
];

const disciplines = [
  { id: "all" as const, label: "All Team", icon: Users, count: teamMembers.length },
  {
    id: "ME" as const,
    label: "Mechanical Eng.",
    icon: Wrench,
    count: teamMembers.filter((m) => m.discipline === "ME").length,
  },
  {
    id: "EE" as const,
    label: "Electrical Eng.",
    icon: Zap,
    count: teamMembers.filter((m) => m.discipline === "EE").length,
  },
  {
    id: "DS" as const,
    label: "Data Science",
    icon: Database,
    count: teamMembers.filter((m) => m.discipline === "DS").length,
  },
  {
    id: "IE" as const,
    label: "Industrial Eng.",
    icon: Megaphone,
    count: teamMembers.filter((m) => m.discipline === "IE").length,
  },
];

const disciplineColors = {
  ME: "badge-me",
  EE: "badge-ee",
  DS: "badge-ds",
  IE: "badge-ie",
};

const TeamMemberCard = ({
  member,
  index,
}: {
  member: (typeof teamMembers)[0];
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group"
    >
      <div className="team-card rounded-2xl overflow-hidden h-full flex flex-col">
        {/* Photo / Avatar */}
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary via-card to-secondary">
              <span className="font-heading text-5xl font-bold text-gradient-hmr">
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
          )}

          {/* Gradient overlay at bottom for text readability */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Discipline badge */}
          <div
            className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-mono-tech tracking-wider text-white backdrop-blur-sm ${
              disciplineColors[member.discipline]
            }`}
          >
            {member.discipline}
          </div>
        </div>

        {/* Info */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-heading text-lg font-semibold mb-1 relative">
            <span className="transition-opacity duration-300 group-hover:opacity-0">
              {member.name}
            </span>
            <span className="absolute inset-0 text-gradient-hmr opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {member.name}
            </span>
          </h3>
          <p className="text-sm text-muted-foreground mb-4">{member.role}</p>

          {/* LinkedIn */}
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Connect with ${member.name} on LinkedIn`}
            className="mt-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/50 text-muted-foreground hover:text-foreground hover:border-hmr/30 transition-colors text-sm w-fit"
          >
            <Linkedin className="w-4 h-4" />
            <span className="font-mono-tech text-xs">Connect</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const TeamSection = () => {
  const [activeFilter, setActiveFilter] = useState<Discipline>("all");

  const filteredMembers =
    activeFilter === "all"
      ? teamMembers
      : teamMembers.filter((m) => m.discipline === activeFilter);

  return (
    <section id="team" className="py-32 relative overflow-hidden">
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
            <Users className="w-4 h-4 text-hmr" />
            <span className="font-mono-tech text-xs tracking-[0.15em] text-hmr-light uppercase">
              The Engineers
            </span>
          </div>

          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Meet the <span className="text-gradient-hmr">Team</span>
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            A multidisciplinary group of TU/e students united by a shared vision
            of revolutionizing European rail transportation.
          </p>
        </motion.div>

        {/* Team stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-8 mb-12"
        >
          <div className="text-center">
            <p className="font-mono-tech text-4xl font-bold text-gradient-hmr">
              {teamMembers.length}+
            </p>
            <p className="font-mono-tech text-xs text-muted-foreground tracking-wider">
              ENGINEERS
            </p>
          </div>
          <div className="w-px h-12 bg-border" />
          <div className="text-center">
            <p className="font-mono-tech text-4xl font-bold text-gradient-hmr">4</p>
            <p className="font-mono-tech text-xs text-muted-foreground tracking-wider">
              DISCIPLINES
            </p>
          </div>
          <div className="w-px h-12 bg-border" />
          <div className="text-center">
            <p className="font-mono-tech text-4xl font-bold text-gradient-hmr">1</p>
            <p className="font-mono-tech text-xs text-muted-foreground tracking-wider">
              MISSION
            </p>
          </div>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {disciplines.map((d) => {
            const isActive = activeFilter === d.id;
            return (
              <button
                key={d.id}
                onClick={() => setActiveFilter(d.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-hmr border-transparent text-primary-foreground"
                    : "border-border bg-card/50 text-muted-foreground hover:text-foreground hover:border-hmr/30"
                }`}
              >
                <d.icon className="w-4 h-4" />
                <span className="font-mono-tech text-sm">{d.label}</span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] ${
                    isActive ? "bg-white/20" : "bg-secondary"
                  }`}
                >
                  {d.count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Team grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {filteredMembers.map((member, i) => (
            <TeamMemberCard key={member.name} member={member} index={i} />
          ))}
        </motion.div>

        {/* Join CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl border border-dashed border-hmr/30 bg-card/30 backdrop-blur-sm">
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-hmr/50 flex items-center justify-center">
              <span className="text-3xl">?</span>
            </div>
            <div className="text-center sm:text-left">
              <p className="font-heading text-lg font-semibold mb-1">
                Your spot is waiting
              </p>
              <p className="text-sm text-muted-foreground">
                We're looking for passionate engineers to join our mission
              </p>
            </div>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdC70GmIn8hGNJdvvRUFeUNFvddyR6NKyY6yy6bCBYOkEwm-Q/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-gradient-hmr text-primary-foreground font-heading font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Apply Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
