import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Compass,
  ArrowLeft,
  MessageCircle,
  Mail,
  ChevronRight,
  ExternalLink,
  Lock,
} from "lucide-react";

type View = "login" | "whatsapp-sent" | "email-sent";

const WA_GROUPS = [
  {
    key: "private",
    label: "Private Community",
    sublabel: "All members · moderated",
    flag: "🌐",
    color: "bg-[#25D366]/10 border-[#25D366]/30 hover:border-[#25D366]/60",
    labelColor: "text-[#25D366]",
    href: "https://wa.me/nordicasianetwork",
    icon: Lock,
  },
  {
    key: "dk",
    label: "Denmark",
    sublabel: "🇩🇰 Dansk gruppe",
    flag: "🇩🇰",
    color: "bg-muted/40 border-border/60 hover:border-primary/30 hover:bg-primary/5",
    labelColor: "text-foreground",
    href: "https://wa.me/nordicasia-dk",
  },
  {
    key: "no",
    label: "Norway",
    sublabel: "🇳🇴 Norsk gruppe",
    flag: "🇳🇴",
    color: "bg-muted/40 border-border/60 hover:border-primary/30 hover:bg-primary/5",
    labelColor: "text-foreground",
    href: "https://wa.me/nordicasia-no",
  },
  {
    key: "se",
    label: "Sweden",
    sublabel: "🇸🇪 Svensk grupp",
    flag: "🇸🇪",
    color: "bg-muted/40 border-border/60 hover:border-primary/30 hover:bg-primary/5",
    labelColor: "text-foreground",
    href: "https://wa.me/nordicasia-se",
  },
  {
    key: "fi",
    label: "Finland",
    sublabel: "🇫🇮 Suomi-ryhmä",
    flag: "🇫🇮",
    color: "bg-muted/40 border-border/60 hover:border-primary/30 hover:bg-primary/5",
    labelColor: "text-foreground",
    href: "https://wa.me/nordicasia-fi",
  },
  {
    key: "is",
    label: "Iceland",
    sublabel: "🇮🇸 Íslenska hópurinn",
    flag: "🇮🇸",
    color: "bg-muted/40 border-border/60 hover:border-primary/30 hover:bg-primary/5",
    labelColor: "text-foreground",
    href: "https://wa.me/nordicasia-is",
  },
];

export default function Login() {
  const [view, setView] = useState<View>("login");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [showEmailFallback, setShowEmailFallback] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
          <p className="text-sm text-muted-foreground leading-relaxed mb-8">
            We sent a sign-in message to <span className="font-semibold text-foreground">{phone}</span>. Open WhatsApp and tap the link to sign in.
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
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">

        {/* ── Left: Sign in card ── */}
        <div className="order-1 lg:order-1 w-full" data-testid="panel-login-form">
          <div className="bg-card border border-border/60 rounded-2xl overflow-hidden shadow-sm">

            {/* Photo */}
            <div className="w-full h-48 md:h-56 overflow-hidden relative">
              <img
                src="/images/login-photo.png"
                alt="NordicAsia Association team, Bali"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-4 left-5">
                <p className="text-white text-sm font-semibold drop-shadow">NordicAsia Association</p>
                <p className="text-white/70 text-xs">Bali, Indonesia</p>
              </div>
            </div>

            <div className="p-6 md:p-7">
              <h1 className="text-xl font-bold text-foreground mb-1" data-testid="heading-login">
                Already a member?
              </h1>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Sign in with your WhatsApp number — no password needed.
              </p>

              {/* WhatsApp sign in */}
              <form onSubmit={handleWhatsApp} className="flex flex-col gap-3" data-testid="form-whatsapp">
                <label className="text-xs font-semibold text-muted-foreground" htmlFor="login-phone">
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
                  className="w-full h-12 rounded-xl font-semibold bg-[#25D366] hover:bg-[#22c55e] text-white"
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
                  <label className="text-xs font-semibold text-muted-foreground" htmlFor="login-email">
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
                  <p className="text-xs text-muted-foreground -mt-1">
                    We will email you a one-click sign-in link. No password needed.
                  </p>
                </form>
              )}

              {/* Join CTA */}
              <div className="border-t border-border/50 mt-6 pt-5 flex flex-col gap-3">
                <p className="text-xs text-muted-foreground text-center">Not a member yet?</p>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full h-11 rounded-xl font-semibold border-primary/30 text-primary hover:bg-primary/5"
                  data-testid="btn-go-signup"
                >
                  <Link href="/sign-up" className="flex items-center gap-2">
                    Join the community
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Free to apply. Your first event is always free.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: WhatsApp groups ── */}
        <div className="order-2 lg:order-2 flex flex-col gap-6" data-testid="panel-whatsapp-groups">

          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
              WhatsApp Groups
            </p>
            <h2 className="text-2xl font-bold text-foreground leading-snug mb-2">
              Join your group directly
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The NordicAsia community lives in WhatsApp. Choose the private community group or go straight to your country group.
            </p>
          </div>

          {/* Groups list */}
          <div className="flex flex-col gap-2" data-testid="list-whatsapp-groups">
            {WA_GROUPS.map((g) => {
              const Icon = g.icon;
              return (
                <a
                  key={g.key}
                  href={g.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-xl border transition-all ${g.color}`}
                  data-testid={`btn-wa-group-${g.key}`}
                >
                  <span className="text-2xl leading-none w-8 text-center shrink-0">{g.flag}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold ${g.labelColor}`}>{g.label}</p>
                    <p className="text-xs text-muted-foreground">{g.sublabel}</p>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                </a>
              );
            })}
          </div>

          {/* Note */}
          <div className="flex items-start gap-3 bg-muted/40 rounded-xl p-4 border border-border/50">
            <MessageCircle className="h-4 w-4 text-[#25D366] shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              All groups are moderated and require approval. The private community group is for full members only. Country groups are open to everyone from that country.
            </p>
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
