import { motion } from "framer-motion";
import { Lock, Users, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const VISIBLE_GROUPS = [
  { flag: "🇩🇰", name: "Danish Nordic Network", members: 48, location: "Jakarta & Bali" },
  { flag: "🇸🇪", name: "Swedish Business Circle", members: 61, location: "Bali" },
  { flag: "🇳🇴", name: "Norwegian Professionals", members: 37, location: "Jakarta" },
];

const LOCKED_GROUPS = [
  { flag: "🇫🇮", name: "Finnish Community" },
  { flag: "🇮🇸", name: "Icelandic Network" },
  { flag: "🌐", name: "Nordic Trade Forum" },
  { flag: "🏢", name: "Business Founders" },
  { flag: "💼", name: "Expat Professionals" },
  { flag: "🤝", name: "Nordic–Indonesia Bridge" },
  { flag: "🎓", name: "Alumni & Academia" },
];

export function CommunityGroups() {
  return (
    <section
      className="py-20 md:py-28 px-4 md:px-6 bg-muted/30"
      data-testid="section-community-groups"
    >
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-xs font-semibold text-primary uppercase tracking-widest mb-3">
            Community
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            10 active groups
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            The network runs across 10 groups — by country, profession, and interest. Members see and join all of them.
          </p>
        </motion.div>

        <div className="relative">
          {/* Visible groups */}
          <motion.div
            className="flex flex-col gap-3 mb-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {VISIBLE_GROUPS.map((g) => (
              <div
                key={g.name}
                className="flex items-center gap-4 bg-card border border-border/60 rounded-2xl px-5 py-4"
                data-testid={`card-group-visible-${g.name.toLowerCase().slice(0, 10).replace(/\s/g, "-")}`}
              >
                <span className="text-2xl shrink-0">{g.flag}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{g.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{g.location}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <Users className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs font-semibold text-foreground">{g.members}</span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Locked groups with blur overlay */}
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {/* Blurred rows */}
            <div className="flex flex-col gap-3 select-none pointer-events-none" aria-hidden="true">
              {LOCKED_GROUPS.slice(0, 4).map((g, i) => (
                <div
                  key={g.name}
                  className="flex items-center gap-4 bg-card border border-border/60 rounded-2xl px-5 py-4"
                  style={{ filter: "blur(4px)", opacity: 1 - i * 0.18 }}
                >
                  <span className="text-2xl shrink-0">{g.flag}</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{g.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Members only</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs font-semibold text-foreground">••</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Lock overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl bg-gradient-to-t from-muted/80 via-muted/60 to-transparent">
              <div className="flex flex-col items-center gap-3 bg-card/95 backdrop-blur-sm border border-border/60 rounded-2xl px-6 py-5 shadow-lg max-w-xs w-full mx-auto text-center">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Lock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">7 more groups hidden</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Members see all 10 groups. Sign in or apply to unlock the full community.
                  </p>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <Button
                    asChild
                    size="sm"
                    className="w-full rounded-full font-semibold"
                    data-testid="btn-groups-signup"
                  >
                    <Link href="/sign-up" className="flex items-center gap-1.5">
                      Apply to join
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    variant="ghost"
                    className="w-full rounded-full text-xs text-muted-foreground"
                    data-testid="btn-groups-signin"
                  >
                    <Link href="/login">Already a member? Sign in</Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
