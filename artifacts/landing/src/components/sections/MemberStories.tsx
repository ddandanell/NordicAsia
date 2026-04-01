import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Quote, Building2, User, Briefcase, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const TESTIMONIALS = [
  {
    name: "Erik Lindqvist",
    role: "Founder, remote worker",
    location: "Bali",
    age: "32",
    type: "Young professional",
    color: "bg-sky-500",
    quote:
      "I met people here much faster than I would have on my own. Within two weeks I had dinner invitations, business contacts, and friends who actually understood where I come from.",
    value:
      "Found his first two clients through introductions made inside the community.",
  },
  {
    name: "Ingrid Halvorsen",
    role: "Country Manager, Nordic Industries",
    location: "Jakarta",
    age: "51",
    type: "Senior professional",
    color: "bg-emerald-600",
    quote:
      "This gave me both business contacts and a social circle. After 15 years in Asia, I still rely on this network every week for introductions and local knowledge.",
    value:
      "Built her entire local partner network through the community over 3 years.",
  },
  {
    name: "Matti Korhonen",
    role: "Head of Asia-Pacific, FinServ Group",
    location: "Jakarta",
    age: "45",
    type: "Company representative",
    color: "bg-violet-600",
    quote:
      "For our company, this creates a stronger channel into the Nordic community. We have found partners, employees, and local advisors we would never have met through traditional channels.",
    value:
      "Hired two senior team members and signed three partnerships through the network.",
  },
];

const WHY_COMPANIES = [
  "Access to a real and active Nordic channel in Indonesia",
  "Stronger visibility and relationships in the local market",
  "Connect with both companies and individuals who share Nordic values",
  "Stronger representation and local relevance across Indonesian cities",
];

const WHY_INDIVIDUALS = [
  "Meet like-minded people who understand your background",
  "Find useful contacts for business, life, and everything in between",
  "Join events across Bali, Jakarta, and other cities",
  "Ask questions and get honest, practical help from the community",
  "Feel part of a trusted group while living or working in Indonesia",
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function MemberStories() {
  return (
    <section
      className="py-20 md:py-28 px-4 md:px-6 bg-[#f8f7f5]"
      data-testid="section-member-stories"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Testimonial cards */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-xs font-semibold text-primary uppercase tracking-widest mb-3">
            Member stories
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            data-testid="heading-member-stories"
          >
            Hear from people like you
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Real members share why they joined, what they got from it, and why
            they would recommend it. Different people, same conclusion — the
            network works.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          data-testid="testimonial-grid"
        >
          {TESTIMONIALS.map((t) => (
            <motion.div
              key={t.name}
              variants={cardVariant}
              className="group bg-card rounded-2xl border border-border/60 p-6 flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              data-testid={`testimonial-${t.name.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={cn(
                    "h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0",
                    t.color
                  )}
                >
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                  <p className="text-[10px] text-muted-foreground/70">
                    {t.location} — {t.type}
                  </p>
                </div>
              </div>

              <div className="relative mb-4 flex-1">
                <Quote className="absolute -top-1 -left-1 h-5 w-5 text-primary/15" />
                <p className="text-sm text-foreground/90 leading-relaxed pl-5 italic">
                  {t.quote}
                </p>
              </div>

              <div className="pt-3 border-t border-border/50">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground/80">
                    Result:{" "}
                  </span>
                  {t.value}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Why companies + Why individuals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-16">
          <motion.div
            className="bg-card rounded-2xl border border-border/60 p-6 md:p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            data-testid="why-companies-use"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-10 w-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-violet-600" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                Why companies use it
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              Companies join to strengthen their presence in the Nordic-Indonesian
              business space. Here is what they get.
            </p>
            <ul className="flex flex-col gap-2.5">
              {WHY_COMPANIES.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Briefcase className="h-4 w-4 text-violet-500 mt-0.5 shrink-0" />
                  <span className="text-sm text-foreground/85 leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="bg-card rounded-2xl border border-border/60 p-6 md:p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            data-testid="why-individuals-use"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-10 w-10 rounded-xl bg-rose-500/10 flex items-center justify-center">
                <Heart className="h-5 w-5 text-rose-500" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                Why private members use it
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              Individual members join for personal and professional reasons. Here
              is what they value most.
            </p>
            <ul className="flex flex-col gap-2.5">
              {WHY_INDIVIDUALS.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <User className="h-4 w-4 text-rose-500 mt-0.5 shrink-0" />
                  <span className="text-sm text-foreground/85 leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Section CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          data-testid="member-stories-cta"
        >
          <p className="text-sm text-muted-foreground mb-5">
            Ready to see what the network can do for you?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              className="rounded-full text-base h-13 px-8 font-semibold"
              asChild
              data-testid="btn-stories-join"
            >
              <a href="/what-you-get">Join the Community</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full text-base h-13 px-8"
              asChild
              data-testid="btn-stories-how"
            >
              <a href="/how-it-works">Explore How It Works</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
