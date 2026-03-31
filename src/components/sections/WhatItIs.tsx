import { motion } from "framer-motion";
import {
  Lightbulb,
  Users,
  Globe,
  CalendarDays,
  Building2,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    icon: Lightbulb,
    color: "bg-amber-500/10 text-amber-600",
    heading: "Knowledge and practical help",
    body: "Get real answers from people who have done it before. Taxes, visas, schools, suppliers — ask the community and get advice that works.",
  },
  {
    icon: Users,
    color: "bg-primary/10 text-primary",
    heading: "Useful contacts",
    body: "Meet the right people at the right time. Whether you need a co-founder, a lawyer, or a dinner partner, the network is here for you.",
  },
  {
    icon: Globe,
    color: "bg-sky-500/10 text-sky-600",
    heading: "Nordic professionals like you",
    body: "A large network of like-minded people from Denmark, Sweden, Norway, Finland, and Iceland who understand where you come from.",
  },
  {
    icon: CalendarDays,
    color: "bg-emerald-500/10 text-emerald-600",
    heading: "Events across Indonesia",
    body: "From casual meet-ups in Bali to business dinners in Jakarta. Something happening every week, wherever you are.",
  },
  {
    icon: Building2,
    color: "bg-violet-500/10 text-violet-600",
    heading: "Companies and professionals",
    body: "Access to founders, executives, and companies who have already built things and know the market. Learn from their experience.",
  },
  {
    icon: MessageCircle,
    color: "bg-rose-500/10 text-rose-500",
    heading: "Ask, recommend, connect",
    body: "A place where you can ask any question, get honest recommendations, and connect with people faster than on your own.",
  },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export function WhatItIs() {
  return (
    <section
      className="py-20 md:py-28 px-4 md:px-6 bg-[#f8f7f5]"
      id="about"
      data-testid="section-what-you-find"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="max-w-2xl mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-xs font-semibold text-primary uppercase tracking-widest mb-3">
            What is this
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            data-testid="heading-what-you-find"
          >
            A Nordic community and business
            <br className="hidden md:block" /> network in Indonesia.
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-3">
            This is a community for people connected to Denmark, Sweden, Norway, Finland,
            and Iceland who live, work, or spend time in Indonesia.
          </p>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Some join to meet people. Some join to build business connections. Some join for both.
            Inside, you find real people, real knowledge, and real opportunities.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          data-testid="features-grid"
        >
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.heading}
                variants={cardVariant}
                className="group p-6 rounded-2xl border border-border/60 bg-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                data-testid={`feature-card-${f.heading.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div
                  className={cn(
                    "h-11 w-11 rounded-xl flex items-center justify-center mb-4",
                    f.color
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">
                  {f.heading}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.body}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
