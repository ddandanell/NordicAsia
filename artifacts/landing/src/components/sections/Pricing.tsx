import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Gift } from "lucide-react";

const TIERS = [
  {
    id: "free",
    name: "Free Access",
    price: "IDR 0",
    period: "",
    tagline: "Start here. No commitment.",
    highlight: false,
    features: [
      "Create a profile and explore the community",
      "See what is happening and who is here",
      "Join selected meetups and open groups",
      "Ask questions and connect with people",
      "Browse public event listings",
    ],
    note: "Limited access to business events and premium features.",
    cta: "Start Free",
    href: "/sign-up",
    testid: "card-pricing-free",
  },
  {
    id: "member",
    name: "Paid Membership",
    price: "IDR 1.800.000",
    period: "/ tahun",
    tagline: "Full access to everything.",
    highlight: true,
    features: [
      "Full access to the private member directory",
      "Direct messaging to any member",
      "Attend all community events — online and in-person",
      "Access to all groups and premium circles",
      "Private WhatsApp community group",
      "Business opportunity board",
      "Stronger visibility in the network",
      "Priority for personal introductions",
    ],
    note: null,
    cta: "Become a Member",
    href: "/sign-up",
    testid: "card-pricing-member",
  },
  {
    id: "company",
    name: "Company Membership",
    price: "IDR 5.400.000",
    period: "/ tahun",
    tagline: "For businesses that want presence.",
    highlight: false,
    features: [
      "Everything in paid membership",
      "Featured company profile in the directory",
      "Add team members to the network",
      "Sponsored post in monthly newsletter",
      "Curated introductions to partners and clients",
      "Visibility at events as a community partner",
      "Recruitment access — find Nordic talent",
    ],
    note: null,
    cta: "Join as a Company",
    href: "/sign-up",
    testid: "card-pricing-company",
  },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function Pricing() {
  return (
    <section
      id="pricing"
      className="py-20 md:py-28 px-4 md:px-6 bg-background"
      data-testid="section-pricing"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-xs font-semibold text-primary uppercase tracking-widest mb-3">
            Membership
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            data-testid="heading-pricing"
          >
            Simple, honest pricing
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Start for free. Attend your first event for free. Then decide if membership
            is right for you. All prices in Indonesian Rupiah.
          </p>
        </motion.div>

        {/* First event is free banner */}
        <motion.div
          className="flex items-center justify-center gap-3 bg-primary/5 border border-primary/20 rounded-2xl px-5 py-4 mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          data-testid="first-event-free-banner"
        >
          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Gift className="h-4.5 w-4.5 text-primary" />
          </div>
          <p className="text-sm text-foreground leading-snug">
            <span className="font-bold text-primary">First event is always free.</span>{" "}
            Apply, get invited to your first event, meet real people — then decide if
            you want to become a paid member.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {TIERS.map((tier) => (
            <motion.div
              key={tier.id}
              variants={cardVariant}
              className={`relative rounded-2xl border flex flex-col overflow-hidden ${
                tier.highlight
                  ? "border-primary/30 shadow-lg bg-primary/5"
                  : "border-border/60 bg-card shadow-sm"
              }`}
              data-testid={tier.testid}
            >
              {tier.highlight && (
                <div className="absolute top-0 inset-x-0 h-0.5 bg-primary" />
              )}
              {tier.highlight && (
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
                    Most popular
                  </span>
                </div>
              )}

              <div className="p-6 md:p-7 pb-4">
                <h3 className={`text-base font-bold mb-1 ${tier.highlight ? "text-primary" : "text-foreground"}`}>
                  {tier.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className={`text-2xl md:text-3xl font-bold ${tier.highlight ? "text-foreground" : "text-foreground"}`}>
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="text-sm text-muted-foreground">{tier.period}</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{tier.tagline}</p>
              </div>

              <div className="px-6 md:px-7 flex-1">
                <ul className="flex flex-col gap-2.5 pb-4">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check className={`h-4 w-4 mt-0.5 shrink-0 ${tier.highlight ? "text-primary" : "text-muted-foreground"}`} />
                      <span className="text-sm text-foreground/85 leading-snug">{f}</span>
                    </li>
                  ))}
                  {tier.note && (
                    <li className="text-xs text-muted-foreground pl-6 italic">{tier.note}</li>
                  )}
                </ul>
              </div>

              <div className="p-6 md:p-7 pt-4">
                <Button
                  className={`w-full rounded-full font-semibold ${tier.highlight ? "shadow" : ""}`}
                  variant={tier.highlight ? "default" : "outline"}
                  asChild
                  data-testid={`btn-pricing-${tier.id}`}
                >
                  <a href={tier.href}>{tier.cta}</a>
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="text-xs text-muted-foreground text-center mt-8 max-w-lg mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          Prices shown are indicative and may be updated. Membership is reviewed before
          approval. We keep the network small and high-quality on purpose.
        </motion.p>
      </div>
    </section>
  );
}
