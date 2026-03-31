import { Link } from "wouter";
import { Compass, Mail, MessageCircle, Linkedin, Instagram, Facebook, ExternalLink } from "lucide-react";

const SOCIAL = [
  {
    label: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/company/nordicasia-network",
    testId: "link-social-linkedin",
  },
  {
    label: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/nordicasianetwork",
    testId: "link-social-instagram",
  },
  {
    label: "Facebook",
    icon: Facebook,
    href: "https://www.facebook.com/nordicasianetwork",
    testId: "link-social-facebook",
  },
  {
    label: "WhatsApp",
    icon: MessageCircle,
    href: "https://wa.me/nordicasianetwork",
    testId: "link-social-whatsapp",
  },
  {
    label: "Email",
    icon: Mail,
    href: "mailto:hello@nordicasianetwork.com",
    testId: "link-social-email",
  },
];

const FIVE_COUNTRIES = [
  { flag: "🇩🇰", name: "Denmark" },
  { flag: "🇳🇴", name: "Norway" },
  { flag: "🇸🇪", name: "Sweden" },
  { flag: "🇫🇮", name: "Finland" },
  { flag: "🇮🇸", name: "Iceland" },
];

export function Footer() {
  return (
    <footer className="bg-white border-t border-border/50" data-testid="footer">

      {/* Five countries banner */}
      <div className="border-b border-border/40 py-6 px-4 md:px-6" data-testid="footer-countries">
        <div className="container mx-auto max-w-5xl">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4 text-center">
            This platform is run by five Nordic countries
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {FIVE_COUNTRIES.map((c) => (
              <div key={c.name} className="flex items-center gap-2" data-testid={`country-${c.name.toLowerCase()}`}>
                <span className="text-2xl leading-none">{c.flag}</span>
                <span className="text-sm font-medium text-foreground">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer body */}
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Compass className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg tracking-tight">NordicAsia</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              A business lodge for the Nordics.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 flex-wrap" data-testid="footer-social-icons">
              {SOCIAL.map(({ label, icon: Icon, href, testId }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  aria-label={label}
                  title={label}
                  className="h-9 w-9 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all"
                  data-testid={testId}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Network links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">Explore</h4>
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-home">
              Home
            </Link>
            <Link href="/what-you-get" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-wyg">
              What You Get
            </Link>
            <Link href="/how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-hiw">
              How It Works
            </Link>
            <a href="/#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-pricing">
              Pricing
            </a>
            <a href="/#members" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-members">
              Members
            </a>
          </div>

          {/* Join links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">Join</h4>
            <Link href="/sign-up" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-signup">
              Apply to Join
            </Link>
            <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-login">
              Sign In
            </Link>
            <a
              href="mailto:hello@nordicasianetwork.com"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-footer-email"
            >
              Contact Us
            </a>
            <a
              href="https://wa.me/nordicasianetwork"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
              data-testid="link-footer-whatsapp"
            >
              WhatsApp Us
              <ExternalLink className="h-3 w-3 opacity-60" />
            </a>
          </div>

          {/* Legal + Follow */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">Legal</h4>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-privacy">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-terms">
              Terms of Use
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-guidelines">
              Community Guidelines
            </a>
            <div className="mt-2 pt-2 border-t border-border/40 flex flex-col gap-3">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Follow Us</h4>
              <a
                href="https://www.linkedin.com/company/nordicasia-network"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
                data-testid="link-footer-linkedin"
              >
                <Linkedin className="h-3.5 w-3.5" />
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/nordicasianetwork"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
                data-testid="link-footer-instagram"
              >
                <Instagram className="h-3.5 w-3.5" />
                Instagram
              </a>
              <a
                href="https://www.facebook.com/nordicasianetwork"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
                data-testid="link-footer-facebook"
              >
                <Facebook className="h-3.5 w-3.5" />
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/50 py-5 px-4 md:px-6">
        <div className="container mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} NordicAsia Network. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            <span>Built for</span>
            {FIVE_COUNTRIES.map((c) => (
              <span key={c.name} title={c.name} className="text-base leading-none">{c.flag}</span>
            ))}
            <span>Nordic communities in Indonesia</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
