import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Compass,
  ArrowLeft,
  Zap,
  Lock,
  Eye,
  EyeOff,
  Mail,
  Phone,
  Check,
  CalendarDays,
  Users,
  Building2,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

type LoginMethod = "email" | "phone";
type AuthMethod = "magic" | "password";
type View = "login" | "forgot" | "magic-sent" | "reset-sent";

const ACCESS_TIERS = [
  {
    key: "free",
    label: "Free member",
    icon: Users,
    desc: "Browse the public directory and read community updates.",
    color: "text-muted-foreground",
    bg: "bg-muted/50",
  },
  {
    key: "paid",
    label: "Paid member",
    icon: Star,
    desc: "Full network access, events, WhatsApp group, and introductions.",
    color: "text-primary",
    bg: "bg-primary/5",
    popular: true,
  },
  {
    key: "company",
    label: "Company member",
    icon: Building2,
    desc: "Everything in paid, plus a featured company profile and recruitment access.",
    color: "text-foreground",
    bg: "bg-card",
  },
];

export default function Login() {
  const [loginMethod, setLoginMethod] = useState<LoginMethod>("email");
  const [authMethod, setAuthMethod] = useState<AuthMethod>("magic");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [view, setView] = useState<View>("login");
  const [error, setError] = useState<string | null>(null);
  const [activeTier, setActiveTier] = useState<string>("paid");

  const validate = (): string | null => {
    if (loginMethod === "email") {
      if (!email.trim()) return "Please enter your email address.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
        return "That doesn't look like a valid email.";
      if (authMethod === "password" && password.length < 1)
        return "Please enter your password.";
    } else {
      if (!phone.trim() || phone.trim().length < 6)
        return "Please enter your phone number.";
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setError(null);
    if (authMethod === "magic" || loginMethod === "phone") {
      setView("magic-sent");
    } else {
      // Password login — placeholder: show a stub "logged in" state
      setView("magic-sent");
    }
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) { setError("Please enter your email address."); return; }
    setError(null);
    setView("reset-sent");
  };

  if (view === "magic-sent") {
    const contact = loginMethod === "email" ? email : phone;
    const isMagic = authMethod === "magic" || loginMethod === "phone";
    return (
      <ConfirmationScreen
        heading={isMagic ? "Check your inbox" : "You're in"}
        desc={
          isMagic
            ? `We sent a ${loginMethod === "phone" ? "code to " + contact : "sign-in link to " + contact + ". Click the link to sign in — no password needed."}`
            : `Welcome back. You are now signed in.`
        }
        onBack={() => setView("login")}
        testId="view-magic-sent"
      />
    );
  }

  if (view === "reset-sent") {
    return (
      <ConfirmationScreen
        heading="Reset link sent"
        desc={`We sent a password reset link to ${forgotEmail}. Check your inbox and follow the instructions.`}
        onBack={() => { setView("login"); setForgotEmail(""); }}
        testId="view-reset-sent"
      />
    );
  }

  if (view === "forgot") {
    return (
      <PageShell>
        <div className="w-full max-w-sm mx-auto" data-testid="view-forgot">
          <button
            onClick={() => { setView("login"); setError(null); }}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            data-testid="btn-back-to-login"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to sign in
          </button>

          <h1 className="text-2xl font-bold text-foreground mb-1" data-testid="heading-forgot">
            Forgot your password?
          </h1>
          <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
            Enter your email and we will send you a link to reset it.
          </p>

          <form onSubmit={handleForgot} className="flex flex-col gap-4">
            <Input
              autoFocus
              type="email"
              placeholder="you@example.com"
              value={forgotEmail}
              onChange={(e) => { setForgotEmail(e.target.value); setError(null); }}
              className="h-13 text-base rounded-xl px-4"
              data-testid="input-forgot-email"
            />
            {error && (
              <p className="text-sm text-red-500" role="alert" data-testid="error-forgot">
                {error}
              </p>
            )}
            <Button
              type="submit"
              size="lg"
              className="w-full h-13 rounded-xl font-semibold"
              data-testid="btn-send-reset"
            >
              Send reset link
            </Button>
          </form>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

        {/* ── Left column: Trust + Access tiers ── */}
        <div className="order-2 lg:order-1 flex flex-col gap-6" data-testid="panel-trust">
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
              The NordicAsia Network
            </p>
            <h2 className="text-2xl font-bold text-foreground leading-snug mb-3" data-testid="heading-trust">
              See what's happening in your network
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Sign in to access the community, browse the member directory, join events, and connect with people across the Nordic and Asian business world.
            </p>
          </div>

          <div className="flex flex-col gap-2" data-testid="list-trust-points">
            {[
              { icon: CalendarDays, text: "Join events and connect with others" },
              { icon: Users, text: "Browse the private member directory" },
              { icon: Zap, text: "Get introductions from our team" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-sm text-foreground">
                <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="h-3.5 w-3.5 text-primary" />
                </div>
                {text}
              </div>
            ))}
          </div>

          <Separator className="opacity-50" />

          {/* Access tier cards */}
          <div data-testid="section-access-tiers">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
              Access depends on your membership level
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
          <div className="bg-card border border-border/60 rounded-2xl p-6 md:p-8 shadow-sm">

            <h1 className="text-xl font-bold text-foreground mb-1" data-testid="heading-login">
              Sign in to your account
            </h1>
            <p className="text-sm text-muted-foreground mb-6">
              Welcome back. Enter your details below.
            </p>

            {/* Login method toggle: Email / Phone */}
            <div
              className="flex rounded-xl border border-border/70 bg-muted/40 p-1 mb-6"
              data-testid="toggle-login-method"
              role="tablist"
            >
              {(["email", "phone"] as LoginMethod[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  role="tab"
                  aria-selected={loginMethod === m}
                  onClick={() => { setLoginMethod(m); setError(null); }}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 h-9 rounded-lg text-sm font-medium transition-all",
                    loginMethod === m
                      ? "bg-background shadow-xs text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  data-testid={`tab-${m}`}
                >
                  {m === "email" ? <Mail className="h-4 w-4" /> : <Phone className="h-4 w-4" />}
                  {m === "email" ? "Email" : "Phone number"}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Email or phone input */}
              {loginMethod === "email" ? (
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block" htmlFor="login-email">
                    Email address
                  </label>
                  <Input
                    id="login-email"
                    autoFocus
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(null); }}
                    className="h-11 text-sm rounded-xl"
                    data-testid="input-login-email"
                  />
                </div>
              ) : (
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block" htmlFor="login-phone">
                    Mobile number
                  </label>
                  <Input
                    id="login-phone"
                    autoFocus
                    type="tel"
                    placeholder="+62 812 3456 7890"
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value); setError(null); }}
                    className="h-11 text-sm rounded-xl"
                    data-testid="input-login-phone"
                  />
                </div>
              )}

              {/* Auth method toggle (email only) */}
              {loginMethod === "email" && (
                <div
                  className="flex rounded-xl border border-border/70 bg-muted/40 p-1"
                  data-testid="toggle-auth-method"
                  role="tablist"
                >
                  {(["magic", "password"] as AuthMethod[]).map((m) => (
                    <button
                      key={m}
                      type="button"
                      role="tab"
                      aria-selected={authMethod === m}
                      onClick={() => { setAuthMethod(m); setError(null); }}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-1.5 h-8 rounded-lg text-xs font-medium transition-all",
                        authMethod === m
                          ? "bg-background shadow-xs text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                      data-testid={`tab-auth-${m}`}
                    >
                      {m === "magic" ? <Zap className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
                      {m === "magic" ? "Magic link" : "Password"}
                    </button>
                  ))}
                </div>
              )}

              {/* Password input */}
              {loginMethod === "email" && authMethod === "password" && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-medium text-muted-foreground" htmlFor="login-password">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => { setView("forgot"); setForgotEmail(email); setError(null); }}
                      className="text-xs text-primary hover:opacity-80 transition-opacity"
                      data-testid="btn-forgot-password"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Your password"
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setError(null); }}
                      className="h-11 text-sm rounded-xl pr-10"
                      data-testid="input-login-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      data-testid="btn-toggle-password"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Helper text for magic / phone */}
              {(authMethod === "magic" && loginMethod === "email") && (
                <p className="text-xs text-muted-foreground leading-relaxed -mt-1" data-testid="text-magic-helper">
                  We will send a one-click sign-in link to your email. No password needed.
                </p>
              )}
              {loginMethod === "phone" && (
                <p className="text-xs text-muted-foreground leading-relaxed -mt-1" data-testid="text-phone-helper">
                  We will send a one-time code to your phone number.
                </p>
              )}

              {error && (
                <p className="text-sm text-red-500 font-medium" role="alert" data-testid="error-login">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full h-12 rounded-xl font-semibold mt-1"
                data-testid="btn-submit-login"
              >
                {loginMethod === "phone"
                  ? "Send code"
                  : authMethod === "magic"
                  ? "Send sign-in link"
                  : "Sign in"}
              </Button>
            </form>

            <Separator className="my-6 opacity-50" />

            {/* Sign up CTA */}
            <div className="text-center" data-testid="section-signup-cta">
              <p className="text-sm text-muted-foreground mb-3">
                New to NordicAsia Network?
              </p>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full h-12 rounded-xl font-semibold border-primary/30 text-primary hover:bg-primary/5"
                data-testid="btn-go-signup"
              >
                <Link href="/sign-up">Join the community</Link>
              </Button>
              <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                Free to apply. We review every member to keep the network high-quality.
              </p>
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
      {/* Top bar */}
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

      {/* Content */}
      <div className="flex-1 flex items-start lg:items-center px-4 md:px-8 py-10 md:py-14">
        {children}
      </div>
    </div>
  );
}

/* ── Confirmation screen ── */

function ConfirmationScreen({
  heading,
  desc,
  onBack,
  testId,
}: {
  heading: string;
  desc: string;
  onBack: () => void;
  testId: string;
}) {
  return (
    <PageShell>
      <div className="w-full max-w-sm mx-auto text-center" data-testid={testId}>
        <div className="mx-auto mb-5 h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
          <Check className="h-7 w-7 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2" data-testid="heading-confirmation">
          {heading}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-8" data-testid="text-confirmation">
          {desc}
        </p>
        <button
          onClick={onBack}
          className="text-sm text-primary hover:opacity-80 transition-opacity underline underline-offset-2"
          data-testid="btn-back-from-confirmation"
        >
          Use a different method
        </button>
      </div>
    </PageShell>
  );
}
