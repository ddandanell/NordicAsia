import { useState, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Compass,
  ArrowLeft,
  ArrowRight,
  UserPlus,
  User,
  MapPin,
  Star,
  TrendingUp,
  Users,
  Building2,
  Lock,
  MessageCircle,
  Heart,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  {
    number: 1,
    icon: UserPlus,
    color: "bg-primary/10 text-primary",
    heading: "Join the network",
    body: "Apply in a few minutes. We review every application personally — so the people you meet here are real, vetted, and here for the right reasons.",
    aside: "Takes about 5 minutes to apply.",
  },
  {
    number: 2,
    icon: User,
    color: "bg-sky-500/10 text-sky-600",
    heading: "Create your profile",
    body: "Tell us who you are, where you're based, and what you're looking for. Your profile is your presence in the network — it's how people find and reach out to you.",
    aside: "You can update it anytime.",
  },
  {
    number: 3,
    icon: MapPin,
    color: "bg-amber-500/10 text-amber-600",
    heading: "Explore people and events",
    body: "Browse the member directory. Discover events in your city or online. See who is active nearby, and who shares your background or interests.",
    aside: "Updated every week.",
  },
  {
    number: 4,
    icon: Star,
    color: "bg-violet-500/10 text-violet-600",
    heading: "Join free or premium activities",
    body: "Some events and community spaces are open to everyone. Others are reserved for paid members. You always know which is which — no surprises.",
    aside: "Clear labels on everything.",
  },
  {
    number: 5,
    icon: TrendingUp,
    color: "bg-emerald-500/10 text-emerald-600",
    heading: "Build your network over time",
    body: "The more you show up — at events, in the group, in conversations — the more you get out. Real connections take time. We make it easier.",
    aside: "Long-term relationships, not quick transactions.",
  },
];

const EXPLAINERS = [
  {
    icon: Users,
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
    heading: "People and companies",
    body: "The network includes private individuals — professionals, expats, founders — and businesses. Both have their own profiles and can connect with each other.",
  },
  {
    icon: Lock,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-500/10",
    heading: "Open and members-only",
    body: "Some content is visible to everyone. Some things — like the full directory, WhatsApp group, and certain events — are for paid members only. It is always clear which is which.",
  },
  {
    icon: MessageCircle,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-500/10",
    heading: "WhatsApp for real-time updates",
    body: "We use WhatsApp to share event reminders, introductions, and community news. It keeps things simple and makes it easier to stay in the loop without checking an app.",
  },
  {
    icon: Heart,
    iconColor: "text-rose-500",
    iconBg: "bg-rose-500/10",
    heading: "Built to help people connect",
    body: "This is not a job board or a sales platform. It is a space for Scandinavians and Asians to meet, share, and build something together — personally and professionally.",
  },
];

export default function HowItWorks() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const touchStartX = useRef<number | null>(null);

  const goTo = (next: number, dir: 1 | -1) => {
    setDirection(dir);
    setStep(next);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) < 40) return;
    if (diff > 0 && step < STEPS.length - 1) goTo(step + 1, 1);
    else if (diff < 0 && step > 0) goTo(step - 1, -1);
    touchStartX.current = null;
  };

  const current = STEPS[step];
  const Icon = current.icon;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full px-4 md:px-8 py-4 flex items-center justify-between border-b border-border/40">
        <Link href="/" className="flex items-center gap-2" data-testid="link-logo">
          <Compass className="h-5 w-5 text-primary" />
          <span className="font-semibold text-base tracking-tight">NordicAsia</span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          data-testid="link-back-home"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </header>

      {/* Page intro */}
      <div className="px-4 md:px-8 pt-10 pb-6 max-w-2xl mx-auto w-full text-center">
        <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
          How it works
        </p>
        <h1
          className="text-3xl md:text-4xl font-bold text-foreground leading-snug"
          data-testid="heading-how-it-works"
        >
          Five simple steps to get started
        </h1>
        <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
          You do not need to understand everything before you join. Here is a quick walk through what happens when you become part of the network.
        </p>
      </div>

      {/* ── Mobile step cards ── */}
      <div
        className="block lg:hidden px-4 pb-4"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        data-testid="mobile-steps"
      >
        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mb-5" role="tablist" aria-label="Step indicators">
          {STEPS.map((s, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === step}
              onClick={() => goTo(i, i > step ? 1 : -1)}
              className={cn(
                "rounded-full transition-all duration-300",
                i === step
                  ? "w-6 h-2 bg-primary"
                  : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
              data-testid={`dot-${i}`}
            />
          ))}
        </div>

        {/* Card */}
        <div className="overflow-hidden" data-testid="step-card-container">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              initial={{ x: direction * 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction * -60, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div
                className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm min-h-[280px] flex flex-col"
                data-testid={`step-card-${step}`}
              >
                {/* Step number + icon */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center shrink-0", current.color)}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">
                      Step {current.number} of {STEPS.length}
                    </p>
                    <p className="text-base font-bold text-foreground leading-tight">
                      {current.heading}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-foreground leading-relaxed flex-1" data-testid="step-body">
                  {current.body}
                </p>

                <div className="mt-5 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary/50" />
                  {current.aside}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Prev / Next */}
        <div className="flex items-center justify-between mt-4 px-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => goTo(step - 1, -1)}
            disabled={step === 0}
            className="gap-1.5 text-muted-foreground"
            data-testid="btn-prev-step"
          >
            <ArrowLeft className="h-4 w-4" /> Previous
          </Button>
          {step < STEPS.length - 1 ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => goTo(step + 1, 1)}
              className="gap-1.5 text-primary font-semibold"
              data-testid="btn-next-step"
            >
              Next <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              asChild
              size="sm"
              className="gap-1.5 rounded-full font-semibold"
              data-testid="btn-create-profile-mobile"
            >
              <Link href="/sign-up">
                Create profile <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* ── Desktop step list ── */}
      <div
        className="hidden lg:block px-8 pb-8 max-w-3xl mx-auto w-full"
        data-testid="desktop-steps"
      >
        <div className="flex flex-col gap-4">
          {STEPS.map((s) => {
            const SIcon = s.icon;
            return (
              <motion.div
                key={s.number}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: s.number * 0.07 }}
                className="flex items-start gap-5 p-5 rounded-2xl border border-border/60 bg-card shadow-sm"
                data-testid={`desktop-step-${s.number}`}
              >
                <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center shrink-0", s.color)}>
                  <SIcon className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-xs font-semibold text-muted-foreground">Step {s.number}</span>
                    <h3 className="text-base font-bold text-foreground">{s.heading}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                  <p className="text-xs text-muted-foreground/70 mt-2 flex items-center gap-1.5">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary/40 shrink-0" />
                    {s.aside}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Explainer blocks ── */}
      <div className="px-4 md:px-8 pb-10 max-w-3xl mx-auto w-full" data-testid="section-explainers">
        <div className="border-t border-border/40 pt-8 mb-6">
          <h2 className="text-lg font-bold text-foreground mb-1">A few more things to know</h2>
          <p className="text-sm text-muted-foreground">
            The network is more than just a list of people. Here is how it all fits together.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" data-testid="explainer-grid">
          {EXPLAINERS.map((e) => {
            const EIcon = e.icon;
            return (
              <div
                key={e.heading}
                className="flex items-start gap-4 p-5 rounded-2xl border border-border/60 bg-card"
                data-testid={`explainer-${e.heading.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className={cn("h-9 w-9 rounded-xl flex items-center justify-center shrink-0", e.iconBg)}>
                  <EIcon className={cn("h-4.5 w-4.5", e.iconColor)} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">{e.heading}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{e.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Final CTA ── */}
      <div
        className="px-4 md:px-8 pb-14 max-w-3xl mx-auto w-full"
        data-testid="section-final-cta"
      >
        <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6 md:p-8 text-center">
          <h2 className="text-xl font-bold text-foreground mb-2">
            Ready to join?
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-md mx-auto">
            Applications take about five minutes. We review each one personally and get back to you within a few days.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto h-12 px-8 rounded-full font-semibold"
              data-testid="btn-create-profile-cta"
            >
              <Link href="/sign-up">Create your profile</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="w-full sm:w-auto h-12 px-6 rounded-full text-muted-foreground"
              data-testid="btn-back-community"
            >
              <Link href="/">Back to community</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
