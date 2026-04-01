import { motion } from "framer-motion";
import { Coffee, Users, Briefcase, ArrowRight } from "lucide-react";

const TYPES = [
  {
    icon: Coffee,
    color: "bg-amber-500/10 text-amber-600",
    accent: "border-amber-500/20",
    label: "Meetups",
    tagline: "Real life, casual, no agenda.",
    body: "Casual social meetups and smaller gatherings where members meet face to face. Coffee in the morning, lunch, dinner, a beer after work, or just a local hangout. No formal structure — just people getting together.",
    examples: ["Morning coffee in Seminyak", "Dinner in SCBD Jakarta", "Beach hangout in Lombok", "Lunch in Ubud"],
  },
  {
    icon: Users,
    color: "bg-primary/10 text-primary",
    accent: "border-primary/20",
    label: "Groups",
    tagline: "Circles built around shared interests.",
    body: "Small groups created by members who want to do something together on a regular basis. A group is simply someone asking if others want to join something they are already doing.",
    examples: ["Business breakfast group", "Golf group Bali", "Startup talk circle", "Scandinavian family group"],
  },
  {
    icon: Briefcase,
    color: "bg-violet-500/10 text-violet-600",
    accent: "border-violet-500/20",
    label: "Events",
    tagline: "The business side of the network.",
    body: "More structured and business-focused sessions. Organized network events, talks, company presentations, or premium member activities. These are where business introductions and serious networking happen.",
    examples: ["Nordic business dinner", "Market entry roundtable", "Company presentation night", "Premium member summit"],
  },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function CommunityTypes() {
  return (
    <section
      className="py-20 md:py-28 px-4 md:px-6 bg-background"
      id="community"
      data-testid="section-community-types"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-xs font-semibold text-primary uppercase tracking-widest mb-3">
            How the community works
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            data-testid="heading-community-types"
          >
            Three ways to connect
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Inside the network you can take part in three different things. Each one
            is simple, human, and useful — whether you are looking for business or just
            a good connection.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          data-testid="community-types-grid"
        >
          {TYPES.map((t) => {
            const Icon = t.icon;
            return (
              <motion.div
                key={t.label}
                variants={cardVariant}
                className={`rounded-2xl border bg-card p-6 md:p-7 flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${t.accent}`}
                data-testid={`community-type-${t.label.toLowerCase()}`}
              >
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-4 ${t.color}`}>
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-1">{t.label}</h3>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                  {t.tagline}
                </p>

                <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                  {t.body}
                </p>

                <div className="border-t border-border/50 pt-4">
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2.5">
                    Examples
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {t.examples.map((ex) => (
                      <li key={ex} className="flex items-center gap-2 text-xs text-foreground/80">
                        <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
