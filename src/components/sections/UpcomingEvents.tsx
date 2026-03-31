import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const EVENTS = [
  {
    id: 1,
    date: "Tue 7 April 2026",
    time: "18:30",
    title: "Nordic Business Dinner",
    description: "Join Nordic leaders and Indonesian business professionals for an intimate three-course dinner. Discuss trade opportunities, partnerships, and Nordic innovation in Southeast Asia.",
    location: "SCBD, Jakarta",
    type: "In-person",
    country: "🇮🇩 Jakarta",
    spots: "16 spots left",
    color: "bg-primary/8 border-primary/20",
    badge: "bg-primary/10 text-primary",
    image: "/images/jakarta.jpg",
  },
  {
    id: 2,
    date: "Thu 10 April 2026",
    time: "19:00",
    title: "Bali Networking Sundowner",
    description: "Sunset drinks and casual networking on Seminyak beach. Perfect for relaxed conversations with Nordic professionals and local entrepreneurs. No agenda—just great people and ocean views.",
    location: "Seminyak, Bali",
    type: "In-person",
    country: "🇮🇩 Bali",
    spots: "24 spots left",
    color: "bg-muted/50 border-border/60",
    badge: "bg-muted text-muted-foreground",
    image: "/images/bali.jpg",
  },
  {
    id: 3,
    date: "Wed 16 April 2026",
    time: "17:00 CEST / 22:00 WIB",
    title: "Nordic–Indonesia Trade Webinar",
    description: "Expert panel discussion on export-import regulations, logistics, and business registration in Indonesia. Learn from successful Nordic businesses already operating in Southeast Asia.",
    location: "Online · Zoom",
    type: "Online",
    country: "🌐 Online",
    spots: "Open",
    color: "bg-muted/50 border-border/60",
    badge: "bg-muted text-muted-foreground",
    image: "/images/coworking.jpg",
  },
  {
    id: 4,
    date: "Sat 26 April 2026",
    time: "11:00",
    title: "Founders Brunch — Bali Chapter",
    description: "For startup founders and business leaders. Share growth strategies, fundraising challenges, and scaling lessons. Followed by informal networking at a beachside venue in Canggu.",
    location: "Canggu, Bali",
    type: "In-person",
    country: "🇮🇩 Bali",
    spots: "12 spots left",
    color: "bg-muted/50 border-border/60",
    badge: "bg-muted text-muted-foreground",
    image: "/images/bali.jpg",
  },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const card = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export function UpcomingEvents() {
  return (
    <section
      className="py-20 md:py-28 px-4 md:px-6 bg-background"
      data-testid="section-upcoming-events"
    >
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <span className="inline-block text-xs font-semibold text-primary uppercase tracking-widest mb-2">
              April 2026
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Upcoming events
            </h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-md leading-relaxed">
              Four events across Jakarta and Bali this month — in-person dinners, a webinar, and a founders brunch. Members get invited by WhatsApp.
            </p>
          </div>
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:opacity-75 transition-opacity shrink-0"
            data-testid="link-see-all-events"
          >
            Join to attend
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 gap-4"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {EVENTS.map((ev) => (
            <motion.div
              key={ev.id}
              variants={card}
              className={`rounded-2xl border overflow-hidden ${ev.color}`}
              data-testid={`card-event-${ev.id}`}
            >
              <div className="flex flex-col sm:flex-row gap-0">
                {/* Image — left on desktop, top on mobile */}
                <div className="sm:w-48 sm:h-48 shrink-0 overflow-hidden bg-muted">
                  <img
                    src={ev.image}
                    alt={ev.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content — right on desktop, below image on mobile */}
                <div className="flex-1 p-5 flex flex-col gap-3">
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-2">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${ev.badge}`}>
                      {ev.type}
                    </span>
                    <span className="text-xs text-muted-foreground">{ev.spots}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-foreground leading-snug">
                    {ev.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {ev.description}
                  </p>

                  {/* Meta */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5 shrink-0" />
                      <span>{ev.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5 shrink-0" />
                      <span>{ev.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      <span>{ev.location}</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-auto pt-2 border-t border-border/40 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{ev.country}</span>
                    <Link
                      href="/sign-up"
                      className="text-xs font-semibold text-primary hover:opacity-75 transition-opacity inline-flex items-center gap-1"
                      data-testid={`link-event-signup-${ev.id}`}
                    >
                      Join to attend
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          className="text-center text-xs text-muted-foreground mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Your first event is always free. Apply, get invited, meet the community — then decide.
        </motion.p>
      </div>
    </section>
  );
}
