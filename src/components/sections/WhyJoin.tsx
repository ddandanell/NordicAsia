import { motion } from "framer-motion";
import { Users, Heart, Shield, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const POINTS = [
  {
    icon: Users,
    color: "bg-primary/10 text-primary",
    heading: "Meet the right people faster",
    body: "Skip the cold introductions. Inside the network, the right connection is often just one message or one event away.",
  },
  {
    icon: Shield,
    color: "bg-emerald-500/10 text-emerald-600",
    heading: "Get trusted local knowledge",
    body: "Visas, taxes, suppliers, schools, contractors — ask people who have already done it and get honest answers that actually work.",
  },
  {
    icon: Heart,
    color: "bg-rose-500/10 text-rose-500",
    heading: "Join useful conversations",
    body: "Active groups and WhatsApp channels where members share what is happening, what to avoid, and what is worth exploring.",
  },
  {
    icon: TrendingUp,
    color: "bg-amber-500/10 text-amber-600",
    heading: "Feel part of something real",
    body: "A real Nordic community in Indonesia — not just a directory. People who meet, help each other, and actually know each other.",
  },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariant = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export function WhyJoin() {
  return (
    <section
      className="py-20 md:py-28 px-4 md:px-6 bg-background"
      id="benefits"
      data-testid="section-why-exists"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: image + pull quote */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/images/whyjoin.jpg"
                alt="NordicAsia networking event in Ubud, Bali"
                className="w-full h-[320px] md:h-[420px] object-cover"
                loading="lazy"
                data-testid="img-community"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 md:-right-8 bg-card rounded-xl shadow-lg border border-border/60 p-4 max-w-[240px]">
              <p className="text-sm font-semibold text-foreground mb-1">
                "The best decision I made after moving to Bali."
              </p>
              <p className="text-xs text-muted-foreground">
                — Anna, founder from Stockholm
              </p>
            </div>
          </motion.div>

          {/* Right: copy + points */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <span className="inline-block text-xs font-semibold text-primary uppercase tracking-widest mb-3">
                Why join
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-snug"
                data-testid="heading-why-exists"
              >
                What you actually
                <br className="hidden md:block" /> get out of it.
              </h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                People join for different reasons. What they have in common is that
                they want something real — real contacts, real knowledge, real
                community. Here is what the network gives you.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col gap-4"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
            >
              {POINTS.map((p) => {
                const Icon = p.icon;
                return (
                  <motion.div
                    key={p.heading}
                    variants={itemVariant}
                    className="flex items-start gap-4"
                    data-testid={`why-point-${p.heading.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <div
                      className={cn(
                        "h-10 w-10 rounded-xl flex items-center justify-center shrink-0",
                        p.color
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground mb-0.5">
                        {p.heading}
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {p.body}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
