import { useState, useCallback, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Compass, ArrowLeft, Check, Eye, EyeOff, Zap, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  nationality: string;
  location: string;
  joinType: "personal" | "company" | "";
  companyName: string;
  role: string;
  motivation: string[];
  accessType: "free" | "paid" | "";
  whatsappConsent: boolean;
  authMethod: "password" | "magic" | "";
  password: string;
};

const NATIONALITIES = [
  "Norwegian", "Swedish", "Danish", "Finnish", "Icelandic",
  "Indonesian", "Singaporean", "Malaysian", "Thai", "Filipino",
  "Vietnamese", "Chinese", "Japanese", "South Korean",
  "British", "American", "Australian", "German", "Dutch", "Other",
];

const ROLES = [
  { value: "founder", label: "Founder / Co-founder" },
  { value: "business_owner", label: "Business owner" },
  { value: "employee", label: "Employee" },
  { value: "consultant", label: "Consultant" },
  { value: "freelancer", label: "Freelancer" },
  { value: "digital_nomad", label: "Digital nomad" },
  { value: "student", label: "Student" },
  { value: "private", label: "Private person" },
  { value: "other", label: "Other" },
];

const MOTIVATIONS = [
  { value: "meet_people", label: "Meet people from home" },
  { value: "networking", label: "Business networking" },
  { value: "partners", label: "Find partners or clients" },
  { value: "events", label: "Discover and attend events" },
  { value: "community", label: "Be part of a community" },
  { value: "learning", label: "Learn about Asia or Nordic business" },
  { value: "other", label: "Something else" },
];

const initialFormData: FormData = {
  fullName: "",
  email: "",
  phone: "",
  nationality: "",
  location: "",
  joinType: "",
  companyName: "",
  role: "",
  motivation: [],
  accessType: "",
  whatsappConsent: false,
  authMethod: "",
  password: "",
};

type StepKey =
  | "fullName"
  | "email"
  | "phone"
  | "nationality"
  | "location"
  | "joinType"
  | "companyName"
  | "role"
  | "motivation"
  | "accessType"
  | "whatsapp"
  | "auth";

const ALL_STEPS: StepKey[] = [
  "fullName", "email", "phone", "nationality", "location",
  "joinType", "companyName", "role", "motivation", "accessType", "whatsapp", "auth",
];

function getActiveSteps(data: FormData): StepKey[] {
  return ALL_STEPS.filter((s) => {
    if (s === "companyName") return data.joinType === "company";
    return true;
  });
}

function validate(step: StepKey, data: FormData): string | null {
  switch (step) {
    case "fullName":
      return data.fullName.trim().length < 2 ? "Please enter your full name." : null;
    case "email": {
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim());
      return ok ? null : "Please enter a valid email address.";
    }
    case "phone":
      return data.phone.trim().length < 6 ? "Please enter your mobile number." : null;
    case "nationality":
      return data.nationality ? null : "Please select your nationality.";
    case "location":
      return data.location.trim().length < 2 ? "Please enter your current city or country." : null;
    case "joinType":
      return data.joinType ? null : "Please choose one option.";
    case "companyName":
      return data.companyName.trim().length < 2 ? "Please enter your company name." : null;
    case "role":
      return data.role ? null : "Please choose the option that fits best.";
    case "motivation":
      return data.motivation.length === 0 ? "Please choose at least one reason." : null;
    case "accessType":
      return data.accessType ? null : "Please choose one option.";
    case "whatsapp":
      return null;
    case "auth":
      if (!data.authMethod) return "Please choose how you want to sign in.";
      if (data.authMethod === "password" && data.password.length < 8)
        return "Password must be at least 8 characters.";
      return null;
    default:
      return null;
  }
}

export default function SignUp() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [stepIndex, setStepIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [, setLocation] = useLocation();

  const activeSteps = useMemo(() => getActiveSteps(formData), [formData]);
  const currentStep = activeSteps[stepIndex];
  const totalSteps = activeSteps.length;
  const progress = ((stepIndex) / totalSteps) * 100;

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
      setSubmitted(true);
    }
  };

  const goBack = () => {
    if (stepIndex > 0) {
      setStepIndex((i) => i - 1);
      setError(null);
    }
  };

  if (submitted) {
    return <SuccessScreen formData={formData} onHome={() => setLocation("/")} />;
  }

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
          {/* Back button */}
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
            showPassword={showPassword}
            togglePassword={() => setShowPassword((v) => !v)}
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
  showPassword: boolean;
  togglePassword: () => void;
  onNext: () => void;
}

function StepContent({ step, formData, update, error, showPassword, togglePassword, onNext }: StepProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") onNext();
  };

  switch (step) {
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

    case "email":
      return (
        <Step
          heading="What is your email address?"
          helper="We will send your confirmation and sign-in link here. We do not share your email with anyone."
          error={error}
          onNext={onNext}
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

    case "phone":
      return (
        <Step
          heading="What is your mobile number?"
          helper="Members who join our WhatsApp group need a phone number. You can skip WhatsApp later if you prefer."
          error={error}
          onNext={onNext}
        >
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

    case "nationality":
      return (
        <Step
          heading="What is your nationality?"
          helper="This helps us connect you with others who share your background and understand your context."
          error={error}
          onNext={onNext}
        >
          <select
            autoFocus
            value={formData.nationality}
            onChange={(e) => update({ nationality: e.target.value })}
            className="w-full h-14 text-base rounded-xl px-4 border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
            data-testid="select-nationality"
          >
            <option value="">Select your nationality…</option>
            <optgroup label="Nordic">
              {NATIONALITIES.slice(0, 5).map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </optgroup>
            <optgroup label="Asia">
              {NATIONALITIES.slice(5, 14).map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </optgroup>
            <optgroup label="Other">
              {NATIONALITIES.slice(14).map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </optgroup>
          </select>
        </Step>
      );

    case "location":
      return (
        <Step
          heading="Where are you based right now?"
          helper="This helps us suggest relevant local events and connect you with people nearby."
          error={error}
          onNext={onNext}
        >
          <Input
            autoFocus
            placeholder="e.g. Jakarta, Indonesia"
            value={formData.location}
            onChange={(e) => update({ location: e.target.value })}
            onKeyDown={handleKeyDown}
            className="h-14 text-base rounded-xl px-4"
            data-testid="input-location"
          />
        </Step>
      );

    case "joinType":
      return (
        <Step
          heading="Are you joining for yourself or for a company?"
          helper="Both are welcome. If you represent a company, we will add your business to our directory."
          error={error}
          onNext={onNext}
          hideButton={!!formData.joinType}
        >
          <div className="flex flex-col gap-3" data-testid="options-join-type">
            {([
              { value: "personal", label: "For myself", desc: "I am joining as a private person or professional." },
              { value: "company", label: "For my company", desc: "I represent a business and want it listed in the network." },
            ] as const).map((opt) => (
              <OptionCard
                key={opt.value}
                label={opt.label}
                desc={opt.desc}
                selected={formData.joinType === opt.value}
                onSelect={() => { update({ joinType: opt.value }); setTimeout(onNext, 300); }}
                testId={`option-join-${opt.value}`}
              />
            ))}
          </div>
        </Step>
      );

    case "companyName":
      return (
        <Step
          heading="What is your company called?"
          helper="We will create a company profile in the member directory so other members can find and contact you."
          error={error}
          onNext={onNext}
        >
          <Input
            autoFocus
            placeholder="e.g. Nordic Ventures AS"
            value={formData.companyName}
            onChange={(e) => update({ companyName: e.target.value })}
            onKeyDown={handleKeyDown}
            className="h-14 text-base rounded-xl px-4"
            data-testid="input-company-name"
          />
        </Step>
      );

    case "role":
      return (
        <Step
          heading="What best describes you?"
          helper="This helps us understand who you are and match you with the right people."
          error={error}
          onNext={onNext}
          hideButton={!!formData.role}
        >
          <div className="grid grid-cols-1 gap-2" data-testid="options-role">
            {ROLES.map((r) => (
              <OptionCard
                key={r.value}
                label={r.label}
                selected={formData.role === r.value}
                onSelect={() => { update({ role: r.value }); setTimeout(onNext, 300); }}
                testId={`option-role-${r.value}`}
              />
            ))}
          </div>
        </Step>
      );

    case "motivation":
      return (
        <Step
          heading="Why do you want to join?"
          helper="You can choose more than one. This helps us personalise your experience from day one."
          error={error}
          onNext={onNext}
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

    case "accessType":
      return (
        <Step
          heading="How do you want to start?"
          helper="You can always upgrade later. Most members go straight to paid — it is where the real network lives."
          error={error}
          onNext={onNext}
          hideButton={!!formData.accessType}
        >
          <div className="flex flex-col gap-3" data-testid="options-access-type">
            <OptionCard
              label="Start free"
              desc="Browse the community and see who is here. No commitment."
              selected={formData.accessType === "free"}
              onSelect={() => { update({ accessType: "free" }); setTimeout(onNext, 300); }}
              testId="option-access-free"
            />
            <OptionCard
              label="Paid membership"
              desc="Full access to the network, events, WhatsApp group, and directory."
              selected={formData.accessType === "paid"}
              onSelect={() => { update({ accessType: "paid" }); setTimeout(onNext, 300); }}
              badge="Most popular"
              testId="option-access-paid"
            />
          </div>
        </Step>
      );

    case "whatsapp":
      return (
        <Step
          heading="Can we add you to our WhatsApp group?"
          helper="The WhatsApp group is where most members connect daily. You can leave at any time."
          error={error}
          onNext={onNext}
        >
          <div className="rounded-xl border border-border bg-card p-5 space-y-4" data-testid="whatsapp-consent-card">
            <p className="text-sm text-muted-foreground leading-relaxed">
              By joining the WhatsApp group you agree to receive messages from other members and occasional announcements from us. We keep it useful — no spam, no noise.
            </p>
            <label
              className="flex items-start gap-3 cursor-pointer"
              htmlFor="whatsapp-consent"
            >
              <Checkbox
                id="whatsapp-consent"
                checked={formData.whatsappConsent}
                onCheckedChange={(checked) => update({ whatsappConsent: !!checked })}
                className="mt-0.5"
                data-testid="checkbox-whatsapp"
              />
              <span className="text-sm font-medium leading-relaxed">
                Yes, I agree to be added to the NordicAsia WhatsApp group.
              </span>
            </label>
            {!formData.whatsappConsent && (
              <p className="text-xs text-muted-foreground">
                Not ready yet? That is fine — you can join the group later from your member profile.
              </p>
            )}
          </div>
        </Step>
      );

    case "auth":
      return (
        <Step
          heading="How do you want to sign in?"
          helper="Choose the method that suits you. You can always add a password later."
          error={error}
          onNext={onNext}
          hideButton={false}
        >
          <div className="flex flex-col gap-3" data-testid="options-auth-method">
            {/* Magic link */}
            <button
              type="button"
              onClick={() => update({ authMethod: "magic", password: "" })}
              className={cn(
                "flex items-center gap-4 w-full px-4 py-4 rounded-xl border text-left transition-all",
                formData.authMethod === "magic"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/40 hover:bg-muted/30"
              )}
              data-testid="option-auth-magic"
            >
              <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Zap className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Send me a magic link</p>
                <p className="text-xs text-muted-foreground mt-0.5">We email you a one-click sign-in link. No password needed.</p>
              </div>
              {formData.authMethod === "magic" && (
                <Check className="h-4 w-4 text-primary ml-auto shrink-0" />
              )}
            </button>

            {/* Password */}
            <button
              type="button"
              onClick={() => update({ authMethod: "password" })}
              className={cn(
                "flex items-center gap-4 w-full px-4 py-4 rounded-xl border text-left transition-all",
                formData.authMethod === "password"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/40 hover:bg-muted/30"
              )}
              data-testid="option-auth-password"
            >
              <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                <Lock className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Create a password</p>
                <p className="text-xs text-muted-foreground mt-0.5">Choose your own password to sign in anytime.</p>
              </div>
              {formData.authMethod === "password" && (
                <Check className="h-4 w-4 text-primary ml-auto shrink-0" />
              )}
            </button>

            {/* Password input (conditional) */}
            {formData.authMethod === "password" && (
              <div className="relative mt-1" data-testid="password-input-wrapper">
                <Label htmlFor="password" className="sr-only">Password</Label>
                <Input
                  id="password"
                  autoFocus
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
                  value={formData.password}
                  onChange={(e) => update({ password: e.target.value })}
                  className="h-14 text-base rounded-xl px-4 pr-12"
                  data-testid="input-password"
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="btn-toggle-password"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            )}
          </div>
        </Step>
      );

    default:
      return null;
  }
}

/* ── Reusable Step Wrapper ── */

function Step({
  heading,
  helper,
  children,
  error,
  onNext,
  hideButton = false,
}: {
  heading: string;
  helper: string;
  children: React.ReactNode;
  error: string | null;
  onNext: () => void;
  hideButton?: boolean;
}) {
  return (
    <div className="flex flex-col gap-6" data-testid="step-wrapper">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-snug mb-2" data-testid="step-heading">
          {heading}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed" data-testid="step-helper">
          {helper}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {children}
      </div>

      {error && (
        <p className="text-sm text-red-500 font-medium" data-testid="step-error" role="alert">
          {error}
        </p>
      )}

      {!hideButton && (
        <Button
          size="lg"
          className="w-full h-14 text-base rounded-xl font-semibold"
          onClick={onNext}
          data-testid="btn-continue"
        >
          Continue
        </Button>
      )}
    </div>
  );
}

/* ── Option Card ── */

function OptionCard({
  label,
  desc,
  selected,
  onSelect,
  badge,
  testId,
}: {
  label: string;
  desc?: string;
  selected: boolean;
  onSelect: () => void;
  badge?: string;
  testId: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "relative flex items-start gap-4 w-full px-4 py-4 rounded-xl border text-left transition-all",
        selected
          ? "border-primary bg-primary/5 shadow-sm"
          : "border-border hover:border-primary/40 hover:bg-muted/30"
      )}
      data-testid={testId}
    >
      {badge && (
        <span className="absolute -top-2.5 right-3 text-[10px] font-semibold bg-primary text-primary-foreground rounded-full px-2 py-0.5">
          {badge}
        </span>
      )}
      <div
        className={cn(
          "h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors",
          selected ? "border-primary bg-primary" : "border-muted-foreground/40"
        )}
      >
        {selected && <Check className="h-3 w-3 text-white" />}
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">{label}</p>
        {desc && <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{desc}</p>}
      </div>
    </button>
  );
}

/* ── Success / Welcome Screen ── */

function SuccessScreen({ formData, onHome }: { formData: FormData; onHome: () => void }) {
  const firstName = formData.fullName.split(" ")[0];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12" data-testid="section-success">
      <div className="w-full max-w-md text-center">
        <div
          className="mx-auto mb-6 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center"
          data-testid="icon-success"
        >
          <Check className="h-8 w-8 text-primary" />
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="heading-success">
          Welcome, {firstName}!
        </h1>
        <p className="text-muted-foreground leading-relaxed mb-10 text-base" data-testid="text-success-desc">
          Your application has been received. We review every new member personally, so this takes a little time. Here is what happens next.
        </p>

        <div className="text-left flex flex-col gap-4 mb-10" data-testid="next-steps">
          {[
            {
              step: "1",
              title: "We review your profile",
              desc: "Someone on our team will check your application within 1–3 business days.",
            },
            {
              step: "2",
              title: "You get a confirmation email",
              desc: "We will email you at " + formData.email + " with your access details.",
            },
            {
              step: "3",
              title: formData.whatsappConsent ? "We add you to WhatsApp" : "You can join WhatsApp later",
              desc: formData.whatsappConsent
                ? "Once approved, you will be added to the private member group."
                : "You can opt in to the WhatsApp group from your profile page at any time.",
            },
          ].map(({ step, title, desc }) => (
            <div
              key={step}
              className="flex items-start gap-4 p-4 rounded-xl border border-border/60 bg-card"
              data-testid={`next-step-${step}`}
            >
              <div className="h-8 w-8 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center shrink-0">
                {step}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <Button
            size="lg"
            className="w-full h-14 rounded-xl text-base font-semibold"
            onClick={onHome}
            data-testid="btn-go-home"
          >
            Back to home
          </Button>
          <Link href="/what-you-get" className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-what-you-get">
            Review what you get as a member
          </Link>
        </div>
      </div>
    </div>
  );
}
