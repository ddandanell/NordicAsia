import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Compass,
  ArrowLeft,
  Check,
  MessageCircle,
  Mail,
  Users,
  Star,
  CalendarDays,
  Zap,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

type View = "login" | "whatsapp-sent" | "email-sent";

const ACCESS_TIERS = [
  {
    key: "free",
    label: "Free member",
    icon: Users,
    desc: "Join the community, meet people, see what is happening.",
    color: "text-muted-foreground",
    bg: "bg-muted/50",
  },
  {
    key: "paid",
    label: "Paid member",
    icon: Star,
    desc: "Full access — events, business networking, premium connections, WhatsApp.",
    color: "text-primary",
    bg: "bg-primary/5",
    popular: true,
  },
];

export default function Login() {
  const [view, setView] = useState<View>("login");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [showEmailFallback, setShowEmailFallback] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTier, setActiveTier] = useState("paid");

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim() || phone.trim().length < 6) {
      setError("Please enter your WhatsApp number.");
      return;
    }
    setError(null);
    setView("whatsapp-sent");
  };

  const handleEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    setView("email-sent");
  };

  if (view === "whatsapp-sent") {
    return (
      <PageShell>
        <div className="w-full max-w-sm mx-auto text-center" data-testid="view-whatsapp-sent">
          <div className="mx-auto mb-5 h-16 w-16 rounded-full bg-[#25D366]/10 flex items-center justify-center">
            <MessageCircle className="h-8 w-8 text-[#25D366]" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Check your WhatsApp</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-2">
            We sent a sign-in message to <span className="font-semibold text-foreground">{phone}</span> on WhatsApp.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-8">
            Open WhatsApp and tap the link to sign in — no password needed.
          </p>
          <button
            onClick={() => { setView("login"); setError(null); }}
            className="text-sm text-primary hover:opacity-80 transition-opacity underline underline-offset-2"
            data-testid="btn-back-from-whatsapp"
          >
            Use a different number
          </button>
        </div>
      </PageShell>
    );
  }

  if (view === "email-sent") {
    return (
      <PageShell>
        <div className="w-full max-w-sm mx-auto text-center" data-testid="view-email-sent">
          <div className="mx-auto mb-5 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Check your inbox</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-8">
            We sent a sign-in link to <span className="font-semibold text-foreground">{email}</span>. Click the link to sign in — no password needed.
          </p>
          <button
            onClick={() => { setView("login"); setError(null); }}
            className="text-sm text-primary hover:opacity-80 transition-opacity underline underline-offset-2"
            data-testid="btn-back-from-email"
          >
            Use a different address
          </button>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

        {/* ── Left column: Trust ── */}
        <div className="order-2 lg:order-1 flex flex-col gap-6" data-testid="panel-trust">
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
              Nordic Network · Indonesia
            </p>
            <h2 className="text-2xl font-bold text-foreground leading-snug mb-3" data-testid="heading-trust">
              Enter the network. Meet your people.
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The NordicAsia Network connects Scandinavians and Nordic-connected professionals across Indonesia. Login, invitations, and communication all happen through WhatsApp.
            </p>
          </div>

          {/* WhatsApp badge */}
          <div className="flex items-center gap-3 rounded-xl border border-[#25D366]/30 bg-[#25D366]/5 px-4 py-3">
            <MessageCircle className="h-5 w-5 text-[#25D366] shrink-0" />
            <div>
              <p className="text-xs font-bold text-foreground">Powered by WhatsApp</p>
              <p className="text-xs text-muted-foreground">Login, invites, reminders, and community updates — all through WhatsApp.</p>
            </div>
          </div>

          <div className="flex flex-col gap-2" data-testid="list-trust-points">
            {[
              { icon: CalendarDays, text: "Get invited to events by WhatsApp" },
              { icon: Zap, text: "One-tap sign in — no password" },
              { icon: Users, text: "Connect with the Nordic community in Indonesia" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-sm text-foreground">
                <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="h-3.5 w-3.5 text-primary" />
                </div>
                {text}
              </div>
            ))}
          </div>

          <div className="border-t border-border/50 pt-5" data-testid="section-access-tiers">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
              Two ways to be a member
            </p>
            <div className="flex flex-col gap-2">
              {ACCESS_TIERS.map((tier) => {
                const Icon = tier.icon;
                const isActive = activeTier === tier.key;
                return (
                  <button
                    key={tier.key}
                    type="button"
                    onClick={() => setActiveTier(tier.key)}
                    className={cn(
                      "relative flex items-start gap-3 w-full text-left px-4 py-3.5 rounded-xl border transition-all",
                      isActive
                        ? "border-primary/40 " + tier.bg + " shadow-sm"
                        : "border-border/60 hover:border-primary/20 hover:bg-muted/30"
                    )}
                    data-testid={`tier-card-${tier.key}`}
                  >
                    {tier.popular && (
                      <span className="absolute -top-2.5 right-3 text-[10px] font-semibold bg-primary text-primary-foreground rounded-full px-2 py-0.5">
                        Most popular
                      </span>
                    )}
                    <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5", tier.bg)}>
                      <Icon className={cn("h-4 w-4", tier.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-foreground">{tier.label}</p>
                        {isActive && <Check className="h-3.5 w-3.5 text-primary ml-auto shrink-0" />}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{tier.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
              Not a member yet?{" "}
              <Link href="/what-you-get" className="text-primary underline underline-offset-2 hover:opacity-80" data-testid="link-what-you-get">
                See what each level includes.
              </Link>
            </p>
          </div>
        </div>

        {/* ── Right column: Login form ── */}
        <div className="order-1 lg:order-2 w-full" data-testid="panel-login-form">
          <div className="bg-card border border-border/60 rounded-2xl overflow-hidden shadow-sm">

            {/* Photo banner */}
            <div className="w-full h-44 md:h-52 overflow-hidden">
              <img
                src="/images/login-photo.png"
                alt="NordicAsia Association — FORMAND and SUPPORT, Bali"
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="p-6 md:p-8">
            <h1 className="text-xl font-bold text-foreground mb-1" data-testid="heading-login">
              Already a member?
            </h1>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Sign in with your WhatsApp number. One tap — no password needed.
            </p>

            {/* WhatsApp login — primary */}
            <form onSubmit={handleWhatsApp} className="flex flex-col gap-3" data-testid="form-whatsapp">
              <label className="text-xs font-medium text-muted-foreground" htmlFor="login-phone">
                Your WhatsApp number
              </label>
              <Input
                id="login-phone"
                type="tel"
                placeholder="+62 812 3456 7890"
                value={phone}
                onChange={(e) => { setPhone(e.target.value); setError(null); }}
                className="h-12 text-base rounded-xl"
                data-testid="input-login-phone"
              />
              {error && (
                <p className="text-sm text-red-500 font-medium" role="alert" data-testid="error-login">
                  {error}
                </p>
              )}
              <Button
                type="submit"
                size="lg"
                className="w-full h-12 rounded-xl font-semibold bg-[#25D366] hover:bg-[#22c55e] text-white mt-1"
                data-testid="btn-whatsapp-login"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Continue with WhatsApp
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-border/60" />
              <span className="text-xs text-muted-foreground">or</span>
              <div className="flex-1 h-px bg-border/60" />
            </div>

            {/* Email fallback */}
            {!showEmailFallback ? (
              <button
                type="button"
                onClick={() => setShowEmailFallback(true)}
                className="w-full flex items-center justify-center gap-2 h-11 rounded-xl border border-border/70 text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
                data-testid="btn-show-email"
              >
                <Mail className="h-4 w-4" />
                Sign in with email instead
              </button>
            ) : (
              <form onSubmit={handleEmail} className="flex flex-col gap-3" data-testid="form-email">
                <label className="text-xs font-medium text-muted-foreground" htmlFor="login-email">
                  Email address
                </label>
                <Input
                  id="login-email"
                  autoFocus
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(null); }}
                  className="h-12 text-sm rounded-xl"
                  data-testid="input-login-email"
                />
                {error && (
                  <p className="text-sm text-red-500 font-medium" role="alert" data-testid="error-email">
                    {error}
                  </p>
                )}
                <Button
                  type="submit"
                  variant="outline"
                  size="lg"
                  className="w-full h-12 rounded-xl font-semibold"
                  data-testid="btn-email-login"
                >
                  Send sign-in link
                </Button>
                <p className="text-xs text-muted-foreground leading-relaxed -mt-1">
                  We will email you a one-click sign-in link. No password needed.
                </p>
              </form>
            )}

            {/* Divider */}
            <div className="border-t border-border/50 mt-6 pt-6">
              <p className="text-sm text-muted-foreground mb-3 text-center">New to NordicAsia Network?</p>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full h-12 rounded-xl font-semibold border-primary/30 text-primary hover:bg-primary/5"
                data-testid="btn-go-signup"
              >
                <Link href="/sign-up" className="flex items-center gap-2">
                  Join the community
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
              <p className="text-xs text-muted-foreground mt-3 text-center leading-relaxed">
                Free to apply. Your first event is always free.
              </p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

/* ── Shared page shell ── */
function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
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
          Back to home
        </Link>
      </header>
      <div className="flex-1 flex items-start lg:items-center px-4 md:px-8 py-10 md:py-14">
        {children}
      </div>
    </div>
  );
}
