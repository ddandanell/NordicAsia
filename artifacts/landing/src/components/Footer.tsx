import { Compass } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-border/50 py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="max-w-xs">
          <div className="flex items-center gap-2 mb-4">
            <Compass className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg tracking-tight">NordicAsia</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A private network connecting Nordic and Asian professionals, founders, and companies. Building bridges across borders.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-12 sm:grid-cols-3">
          <div className="flex flex-col gap-3">
            <h4 className="font-medium text-sm">Network</h4>
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-about">About Us</a>
            <a href="#members" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-members">Who is Here</a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-pricing">Pricing</a>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-medium text-sm">Legal</h4>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-privacy">Privacy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-terms">Terms</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-guidelines">Community Guidelines</a>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-medium text-sm">Contact</h4>
            <a href="mailto:hello@nordicasia.network" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-email">Email Us</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-linkedin">LinkedIn</a>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-6 mt-12 pt-8 border-t border-border/50 text-sm text-muted-foreground">
        © {new Date().getFullYear()} NordicAsia Network. All rights reserved.
      </div>
    </footer>
  );
}