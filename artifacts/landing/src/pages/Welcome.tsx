import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Compass,
  Clock,
  MessageCircle,
  Star,
  ArrowRight,
  Check,
  User,
  CalendarDays,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser, STATUS_LABELS, STATUS_COLORS } from "@/context/UserContext";
import { motion } from "framer-motion";

export default function Welcome() {
  const { user, signOut } = useUser();
  const [, setLocation] = useLocation();

  const firstName = user.name ? user.name.split(" ")[0] : "there";
  const isPaid = user.accessType === "paid" || user.status === "paid";
  const statusLabel = STATUS_LABELS[user.status] ?? "Pending approval";
  const statusColor = STATUS_COLORS[user.status] ?? STATUS_COLORS.pending;

  const handleSignOut = () => {
    signOut();
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <header className="w-full px-4 md:px-8 py-4 flex items-center justify-between border-b border-border/40">
        <Link href="/" className="flex items-center gap-2" data-testid="link-logo">
          <Compass className="h-5 w-5 text-primary" />
          <span className="font-semibold text-base tracking-tight">NordicAsia</span>
        </Link>
        <button
          onClick={handleSignOut}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          data-testid="btn-sign-out"
        >
          Sign out
        </button>
      </header>

      <div className="flex-1 px-4 md:px-8 py-10 md:py-14 max-w-2xl mx-auto w-full">

        {/* ── Greeting ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
          data-testid="section-greeting"
        >
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span
              className={cn("text-xs font-semibold px-2.5 py-1 rounded-full", statusColor)}
              data-testid="badge-status"
            >
              {statusLabel}
            </span>
            {user.country && (
              <span className="text-xs text-muted-foreground font-medium px-2.5 py-1 rounded-full bg-muted">
                {user.country}
              </span>
            )}
          </div>
          <h1
            className="text-3xl md:text-4xl font-bold text-foreground leading-snug mb-2"
            data-testid="heading-welcome"
          >
            Welcome, {firstName}
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your application is in. Here is what to expect and how to get started.
          </p>
        </motion.div>

        {/* ── Status card ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.07 }}
          className="rounded-2xl border border-amber-200 bg-amber-50 p-5 mb-6"
          data-testid="card-status"
        >
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-amber-900 mb-1">
                Your application is under review
              </p>
              <p className="text-xs text-amber-700 leading-relaxed">
                We review every application personally to keep the network high-quality. This usually takes 1–2 business days. We will reach out to you on WhatsApp
                {user.phone ? <span className="font-medium"> ({user.phone})</span> : ""} when it is approved.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Access level ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.12 }}
          className="rounded-2xl border border-border/60 bg-card p-5 mb-6"
          data-testid="card-access-level"
        >
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
            Your access level
          </p>
          <div className="flex items-center gap-3 mb-3">
            <div className={cn("h-9 w-9 rounded-xl flex items-center justify-center shrink-0", isPaid ? "bg-primary/10" : "bg-sky-100")}>
              {isPaid ? <Star className="h-4 w-4 text-primary" /> : <User className="h-4 w-4 text-sky-600" />}
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">
                {isPaid ? "Paid membership" : "Free member"}
              </p>
              <p className="text-xs text-muted-foreground">
                {isPaid
                  ? "Full network access, events, WhatsApp group, and member directory."
                  : "Public directory and community updates. Some areas are for paid members only."}
              </p>
            </div>
          </div>
          {!isPaid && (
            <Link
              href="/what-you-get"
              className="text-xs text-primary flex items-center gap-1 font-medium hover:opacity-80 transition-opacity"
              data-testid="link-upgrade-access"
            >
              See what paid membership includes <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </motion.div>

        {/* ── What happens next ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.17 }}
          className="mb-6"
          data-testid="section-next-steps"
        >
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
            What happens next
          </p>
          <div className="flex flex-col gap-3">
            {[
              {
                icon: MessageCircle,
                iconBg: "bg-[#25D366]/10",
                iconColor: "text-[#25D366]",
                heading: "We will contact you on WhatsApp",
                body: `We will review your application and reach out to you on WhatsApp${user.phone ? " at " + user.phone : ""}. This is how we place you in the right group and send your invitation.`,
                testId: "next-step-whatsapp",
              },
              {
                icon: User,
                iconBg: "bg-sky-100",
                iconColor: "text-sky-600",
                heading: "We place you in the right country group",
                body: `You will be connected to the ${user.country || "Nordic"} network and placed with members in your area${user.location ? " — " + user.location : ""}.`,
                testId: "next-step-country",
              },
              {
                icon: CalendarDays,
                iconBg: "bg-amber-100",
                iconColor: "text-amber-600",
                heading: "You get invited to your first event — free",
                body: "Come meet some members. See the network in real life. After that, you decide if you want to stay as Free Member or become a Paid Member.",
                testId: "next-step-events",
              },
            ].map(({ icon: Icon, iconBg, iconColor, heading, body, testId }, i) => (
              <motion.div
                key={testId}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.2 + i * 0.07 }}
                className="flex items-start gap-4 p-4 rounded-xl border border-border/60 bg-card"
                data-testid={testId}
              >
                <div className={cn("h-9 w-9 rounded-xl flex items-center justify-center shrink-0", iconBg)}>
                  <Icon className={cn("h-4 w-4", iconColor)} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-0.5">{heading}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── WhatsApp card ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className={cn(
            "rounded-2xl border p-5 mb-6",
            user.whatsappConsent
              ? "border-emerald-200 bg-emerald-50"
              : "border-border/60 bg-card"
          )}
          data-testid="card-whatsapp"
        >
          <div className="flex items-start gap-4">
            <div className={cn("h-9 w-9 rounded-xl flex items-center justify-center shrink-0", user.whatsappConsent ? "bg-emerald-100" : "bg-muted")}>
              <MessageCircle className={cn("h-4 w-4", user.whatsappConsent ? "text-emerald-600" : "text-muted-foreground")} />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground mb-0.5">WhatsApp group</p>
              {user.whatsappConsent ? (
                <p className="text-xs text-emerald-700 leading-relaxed">
                  You agreed to join the group — we will add you once your application is approved. The group is active daily and is where most of the community interaction happens.
                </p>
              ) : (
                <p className="text-xs text-muted-foreground leading-relaxed">
                  You opted out for now — no problem. You can join the WhatsApp group at any time from your profile page after you are approved.
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* ── Upgrade CTA (free members only) ── */}
        {!isPaid && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.42 }}
            className="rounded-2xl border border-primary/20 bg-primary/5 p-5 mb-8"
            data-testid="card-upgrade"
          >
            <div className="flex items-start gap-4">
              <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground mb-0.5">
                  Want full access?
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  Paid members get access to the private directory, all events, the WhatsApp group, and personal introductions. Most members upgrade within the first month.
                </p>
                <Link
                  href="/what-you-get"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:opacity-80 transition-opacity"
                  data-testid="link-see-paid"
                >
                  See what is included <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Quick links ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.48 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10"
          data-testid="section-quick-links"
        >
          {[
            {
              icon: Check,
              label: "What you get",
              desc: "Full breakdown of each access level.",
              href: "/what-you-get",
              testId: "link-quick-wyg",
            },
            {
              icon: ArrowRight,
              label: "How it works",
              desc: "A five-step guide to the network.",
              href: "/how-it-works",
              testId: "link-quick-hiw",
            },
          ].map(({ icon: Icon, label, desc, href, testId }) => (
            <Link
              key={testId}
              href={href}
              className="flex items-center gap-3 p-4 rounded-xl border border-border/60 bg-card hover:border-primary/30 hover:bg-muted/30 transition-all"
              data-testid={testId}
            >
              <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto shrink-0" />
            </Link>
          ))}
        </motion.div>

        {/* ── Footer CTA ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.55 }}
          className="text-center"
          data-testid="section-footer-cta"
        >
          <Button
            asChild
            variant="ghost"
            className="text-muted-foreground hover:text-foreground rounded-full"
            data-testid="btn-back-home"
          >
            <Link href="/">Back to homepage</Link>
          </Button>
          <p className="text-xs text-muted-foreground mt-3">
            Questions? Reach us at{" "}
            <a
              href="mailto:hello@nordicasianetwork.com"
              className="text-primary hover:opacity-80 transition-opacity"
              data-testid="link-email-contact"
            >
              hello@nordicasianetwork.com
            </a>
          </p>
        </motion.div>

      </div>
    </div>
  );
}
