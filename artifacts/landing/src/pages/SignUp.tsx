import { useState, useCallback, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Compass, ArrowLeft, Check, MessageCircle, Gift } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@/context/UserContext";

type FormData = {
  accessType: "free" | "paid" | "";
  country: string;
  fullName: string;
  phone: string;
  email: string;
  location: string;
  eventPreference: string;
  wantCall: boolean | null;
  motivation: string[];
};

const NORDIC_COUNTRIES = [
  { code: "DK", name: "Denmark", flag: "🇩🇰" },
  { code: "NO", name: "Norway", flag: "🇳🇴" },
  { code: "SE", name: "Sweden", flag: "🇸🇪" },
  { code: "FI", name: "Finland", flag: "🇫🇮" },
  { code: "IS", name: "Iceland", flag: "🇮🇸" },
];

const LOCATIONS = [
  "Bali",
  "Jakarta",
  "Surabaya",
  "Bandung",
  "Yogyakarta",
  "Lombok",
  "Other in Indonesia",
  "Not in Indonesia yet",
];

const EVENT_OPTIONS = [
  { value: "this_month", label: "This month — I am ready" },
  { value: "next_month", label: "Next month — works better for me" },
  { value: "exploring", label: "Just exploring for now" },
];

const MOTIVATIONS = [
  { value: "meet_people", label: "Meet people from home" },
  { value: "networking", label: "Business networking" },
  { value: "partners", label: "Find partners or clients" },
  { value: "events", label: "Discover and join events" },
  { value: "community", label: "Be part of a community" },
  { value: "business_updates", label: "Stay updated on business activity" },
  { value: "connections", label: "Build stronger connections" },
  { value: "other", label: "Something else" },
];

const initialFormData: FormData = {
  accessType: "",
  country: "",
  fullName: "",
  phone: "",
  email: "",
  location: "",
  eventPreference: "",
  wantCall: null,
  motivation: [],
};

type StepKey =
  | "accessType"
  | "country"
  | "fullName"
  | "phone"
  | "email"
  | "location"
  | "eventPreference"
  | "wantCall"
  | "motivation";

const ALL_STEPS: StepKey[] = [
  "accessType",
  "country",
  "fullName",
  "phone",
  "email",
  "location",
  "eventPreference",
  "wantCall",
  "motivation",
];

function validate(step: StepKey, data: FormData): string | null {
  switch (step) {
    case "accessType":
      return data.accessType ? null : "Please choose how you want to start.";
    case "country":
      return data.country ? null : "Please choose a country.";
    case "fullName":
      return data.fullName.trim().length < 2 ? "Please enter your full name." : null;
    case "phone":
      return data.phone.trim().length < 6 ? "Please enter your WhatsApp number." : null;
    case "email": {
      if (!data.email.trim()) return null;
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim());
      return ok ? null : "That does not look like a valid email address.";
    }
    case "location":
      return data.location ? null : "Please choose your area.";
    case "eventPreference":
      return data.eventPreference ? null : "Please choose one option.";
    case "wantCall":
      return data.wantCall === null ? "Please choose one option." : null;
    case "motivation":
      return null;
    default:
      return null;
  }
}

export default function SignUp() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [stepIndex, setStepIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [, setLocation] = useLocation();
  const { setUser } = useUser();

  const activeSteps = useMemo(() => ALL_STEPS, []);
  const currentStep = activeSteps[stepIndex];
  const totalSteps = activeSteps.length;
  const progress = (stepIndex / totalSteps) * 100;

  const update = useCallback((patch: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...patch }));
    setError(null);
  }, []);

  const goNext = () => {
    const err = validate(currentStep, formData);
    if (err) { setError(err); return; }
    if (stepIndex < totalSteps - 1) {
      setStepIndex((i) => i + 1);
      setError(null);
    } else {
      setUser({
        status: "pending",
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        location: formData.location,
        accessType: formData.accessType as "free" | "paid",
        motivation: formData.motivation,
        wantCall: formData.wantCall ?? false,
        eventPreference: formData.eventPreference,
        whatsappConsent: true,
      });
      setLocation("/welcome");
    }
  };

  const goBack = () => {
    if (stepIndex > 0) {
      setStepIndex((i) => i - 1);
      setError(null);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <header className="w-full px-4 py-4 flex items-center justify-between border-b border-border/40">
        <Link href="/" className="flex items-center gap-2" data-testid="link-logo">
          <Compass className="h-5 w-5 text-primary" />
          <span className="font-semibold text-base tracking-tight">NordicAsia</span>
        </Link>
        <span className="text-xs text-muted-foreground font-medium" data-testid="text-step-count">
          Step {stepIndex + 1} of {totalSteps}
        </span>
      </header>

      {/* Progress bar */}
      <div className="w-full h-1 bg-muted" data-testid="progress-bar-track">
        <div
          className="h-1 bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
          data-testid="progress-bar-fill"
        />
      </div>

      {/* Step content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          {stepIndex > 0 && (
            <button
              onClick={goBack}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
              data-testid="btn-back"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          )}

          <StepContent
            step={currentStep}
            formData={formData}
            update={update}
            error={error}
            onNext={goNext}
          />
        </div>
      </div>
    </div>
  );
}

/* ── Step Content ── */
interface StepProps {
  step: StepKey;
  formData: FormData;
  update: (patch: Partial<FormData>) => void;
  error: string | null;
  onNext: () => void;
}

function StepContent({ step, formData, update, error, onNext }: StepProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") onNext();
  };

  switch (step) {

    case "accessType":
      return (
        <Step
          heading="How do you want to join?"
          helper="You can always upgrade later. Both paths start with a free first event."
          error={error}
          onNext={onNext}
          hideButton={!!formData.accessType}
        >
          {/* First event free callout */}
          <div className="flex items-start gap-3 bg-primary/5 border border-primary/20 rounded-xl p-4 mb-4">
            <Gift className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">Your first event is always free.</span> Apply, come meet members, and then decide if paid membership is right for you.
            </p>
          </div>

          <div className="flex flex-col gap-3" data-testid="options-access-type">
            <button
              type="button"
              onClick={() => { update({ accessType: "free" }); setTimeout(onNext, 300); }}
              className={cn(
                "flex flex-col gap-2 w-full text-left px-5 py-4 rounded-xl border transition-all",
                formData.accessType === "free"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/30 hover:bg-muted/40"
              )}
              data-testid="option-access-free"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-foreground">Free member</p>
                <span className="text-xs text-muted-foreground font-medium">IDR 0</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Join the community. Meet people. Get access to community updates and explore what is happening. Light WhatsApp access. Social and casual.
              </p>
            </button>

            <button
              type="button"
              onClick={() => { update({ accessType: "paid" }); setTimeout(onNext, 300); }}
              className={cn(
                "relative flex flex-col gap-2 w-full text-left px-5 py-4 rounded-xl border transition-all",
                formData.accessType === "paid"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/30 hover:bg-muted/40"
              )}
              data-testid="option-access-paid"
            >
              <span className="absolute -top-2.5 right-3 text-[10px] font-semibold bg-primary text-primary-foreground rounded-full px-2 py-0.5">
                Most popular
              </span>
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-foreground">Paid member</p>
                <span className="text-xs text-primary font-semibold">IDR 1.800.000/thn</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Full network access. Get invited to business events. Stay updated on business activity. Premium connections. Access the stronger, more serious side of the community.
              </p>
            </button>
          </div>
        </Step>
      );

    case "country":
      return (
        <Step
          heading="Which Nordic country are you connected to?"
          helper="Choose the country network you feel most connected to. This places you in the right group."
          error={error}
          onNext={onNext}
          hideButton={!!formData.country}
        >
          <div className="flex flex-col gap-2" data-testid="options-country">
            {NORDIC_COUNTRIES.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => { update({ country: c.name }); setTimeout(onNext, 300); }}
                className={cn(
                  "flex items-center gap-4 w-full px-5 py-4 rounded-xl border transition-all",
                  formData.country === c.name
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/30 hover:bg-muted/40"
                )}
                data-testid={`option-country-${c.code.toLowerCase()}`}
              >
                <span className="text-3xl leading-none">{c.flag}</span>
                <span className="text-sm font-semibold text-foreground">{c.name}</span>
                {formData.country === c.name && (
                  <Check className="h-4 w-4 text-primary ml-auto shrink-0" />
                )}
              </button>
            ))}
          </div>
        </Step>
      );

    case "fullName":
      return (
        <Step
          heading="What is your name?"
          helper="We use your name to personalise your profile and introduce you to others in the network."
          error={error}
          onNext={onNext}
        >
          <Input
            autoFocus
            placeholder="e.g. Anna Bergström"
            value={formData.fullName}
            onChange={(e) => update({ fullName: e.target.value })}
            onKeyDown={handleKeyDown}
            className="h-14 text-base rounded-xl px-4"
            data-testid="input-full-name"
          />
        </Step>
      );

    case "phone":
      return (
        <Step
          heading="What is your WhatsApp number?"
          helper="We send your invitation, reminders, and community access through WhatsApp. This is how we connect you."
          error={error}
          onNext={onNext}
        >
          <div className="flex items-center gap-2 rounded-xl border border-[#25D366]/30 bg-[#25D366]/5 px-4 py-2.5 mb-3">
            <MessageCircle className="h-4 w-4 text-[#25D366] shrink-0" />
            <p className="text-xs font-medium text-foreground">Powered by WhatsApp — login and communication all happen here</p>
          </div>
          <Input
            autoFocus
            type="tel"
            placeholder="+62 812 3456 7890"
            value={formData.phone}
            onChange={(e) => update({ phone: e.target.value })}
            onKeyDown={handleKeyDown}
            className="h-14 text-base rounded-xl px-4"
            data-testid="input-phone"
          />
        </Step>
      );

    case "email":
      return (
        <Step
          heading="What is your email address?"
          helper="Optional but helpful. We will use it for confirmations and as a backup contact."
          error={error}
          onNext={onNext}
          skipLabel="Skip for now"
          onSkip={onNext}
        >
          <Input
            autoFocus
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => update({ email: e.target.value })}
            onKeyDown={handleKeyDown}
            className="h-14 text-base rounded-xl px-4"
            data-testid="input-email"
          />
        </Step>
      );

    case "location":
      return (
        <Step
          heading="Where are you based in Indonesia?"
          helper="This helps us invite you to events close to you and connect you with local members."
          error={error}
          onNext={onNext}
          hideButton={!!formData.location}
        >
          <div className="flex flex-col gap-2" data-testid="options-location">
            {LOCATIONS.map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => { update({ location: loc }); setTimeout(onNext, 300); }}
                className={cn(
                  "flex items-center justify-between w-full px-4 py-3.5 rounded-xl border text-sm font-medium transition-all text-left",
                  formData.location === loc
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border text-foreground hover:border-primary/40 hover:bg-muted/40"
                )}
                data-testid={`option-location-${loc.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {loc}
                {formData.location === loc && <Check className="h-4 w-4 text-primary shrink-0" />}
              </button>
            ))}
          </div>
        </Step>
      );

    case "eventPreference":
      return (
        <Step
          heading="When would you like to come to your first event?"
          helper="Remember — your first event is always free. We will invite you by WhatsApp."
          error={error}
          onNext={onNext}
          hideButton={!!formData.eventPreference}
        >
          {/* First event free callout */}
          <div className="flex items-start gap-3 bg-primary/5 border border-primary/20 rounded-xl p-4 mb-4">
            <Gift className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">First event is free.</span> Come meet some members first. See how the network feels in real life. Then you decide.
            </p>
          </div>

          <div className="flex flex-col gap-2" data-testid="options-event-preference">
            {EVENT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => { update({ eventPreference: opt.value }); setTimeout(onNext, 300); }}
                className={cn(
                  "flex items-center justify-between w-full px-4 py-3.5 rounded-xl border text-sm font-medium transition-all text-left",
                  formData.eventPreference === opt.value
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border text-foreground hover:border-primary/40 hover:bg-muted/40"
                )}
                data-testid={`option-event-${opt.value}`}
              >
                {opt.label}
                {formData.eventPreference === opt.value && <Check className="h-4 w-4 text-primary shrink-0" />}
              </button>
            ))}
          </div>
        </Step>
      );

    case "wantCall":
      return (
        <Step
          heading="Would you like us to call you and tell you more?"
          helper="A short friendly call. We can answer your questions and help you get started."
          error={error}
          onNext={onNext}
          hideButton={formData.wantCall !== null}
        >
          <div className="flex flex-col gap-3" data-testid="options-want-call">
            {([
              { value: true, label: "Yes, I would like a call", desc: "We will call you on the WhatsApp number you provided." },
              { value: false, label: "No thanks, I am good", desc: "We will reach out by WhatsApp when your invitation is ready." },
            ] as const).map((opt) => (
              <button
                key={String(opt.value)}
                type="button"
                onClick={() => { update({ wantCall: opt.value }); setTimeout(onNext, 300); }}
                className={cn(
                  "flex flex-col gap-1 w-full text-left px-5 py-4 rounded-xl border transition-all",
                  formData.wantCall === opt.value
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/30 hover:bg-muted/40"
                )}
                data-testid={`option-call-${opt.value}`}
              >
                <p className="text-sm font-semibold text-foreground">{opt.label}</p>
                <p className="text-xs text-muted-foreground">{opt.desc}</p>
              </button>
            ))}
          </div>
        </Step>
      );

    case "motivation":
      return (
        <Step
          heading="What are you looking for in the network?"
          helper="Optional — choose as many as you like. This helps us personalise your experience from day one."
          error={error}
          onNext={onNext}
          skipLabel="Skip this step"
          onSkip={onNext}
        >
          <div className="flex flex-col gap-2" data-testid="options-motivation">
            {MOTIVATIONS.map((m) => {
              const selected = formData.motivation.includes(m.value);
              return (
                <button
                  key={m.value}
                  type="button"
                  onClick={() => {
                    const next = selected
                      ? formData.motivation.filter((v) => v !== m.value)
                      : [...formData.motivation, m.value];
                    update({ motivation: next });
                  }}
                  className={cn(
                    "flex items-center justify-between w-full px-4 py-3.5 rounded-xl border text-sm font-medium transition-all text-left",
                    selected
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border text-foreground hover:border-primary/40 hover:bg-muted/40"
                  )}
                  data-testid={`option-motivation-${m.value}`}
                >
                  {m.label}
                  {selected && <Check className="h-4 w-4 text-primary shrink-0" />}
                </button>
              );
            })}
          </div>
        </Step>
      );

    default:
      return null;
  }
}

/* ── Generic Step wrapper ── */
interface StepWrapperProps {
  heading: string;
  helper?: string;
  children: React.ReactNode;
  error: string | null;
  onNext: () => void;
  hideButton?: boolean;
  skipLabel?: string;
  onSkip?: () => void;
}

function Step({
  heading,
  helper,
  children,
  error,
  onNext,
  hideButton = false,
  skipLabel,
  onSkip,
}: StepWrapperProps) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-bold text-foreground leading-snug mb-1.5" data-testid="step-heading">
          {heading}
        </h1>
        {helper && (
          <p className="text-sm text-muted-foreground leading-relaxed" data-testid="step-helper">
            {helper}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {children}
      </div>

      {error && (
        <p className="text-sm text-red-500 font-medium" role="alert" data-testid="step-error">
          {error}
        </p>
      )}

      {!hideButton && (
        <Button
          type="button"
          size="lg"
          onClick={onNext}
          className="w-full h-13 rounded-xl font-semibold"
          data-testid="btn-next"
        >
          Continue
        </Button>
      )}

      {skipLabel && onSkip && (
        <button
          type="button"
          onClick={onSkip}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors text-center underline underline-offset-2"
          data-testid="btn-skip"
        >
          {skipLabel}
        </button>
      )}
    </div>
  );
}
