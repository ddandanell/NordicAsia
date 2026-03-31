import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";
import { useUser, STATUS_LABELS, STATUS_COLORS } from "@/context/UserContext";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [location] = useLocation();
  const { user, isAuthenticated, signOut } = useUser();
  const isHome = location === "/";

  const firstName = user.name ? user.name.split(" ")[0] : "";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" data-testid="link-home">
          <Compass className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg tracking-tight">NordicAsia</span>
        </Link>

        <nav className="hidden md:flex gap-6 items-center">
          {isHome ? (
            <>
              <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="link-nav-about">About</a>
              <a href="#members" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="link-nav-members">Members</a>
              <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="link-nav-pricing">Pricing</a>
            </>
          ) : (
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="link-nav-home">Home</Link>
          )}
          <Link
            href="/what-you-get"
            className={`text-sm font-medium transition-colors ${location === "/what-you-get" ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"}`}
            data-testid="link-nav-what-you-get"
          >
            What You Get
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <div className="hidden sm:flex items-center gap-2" data-testid="nav-user-info">
                <span
                  className={cn("h-2 w-2 rounded-full shrink-0", STATUS_COLORS[user.status].split(" ")[0])}
                  data-testid="nav-status-dot"
                />
                <span className="text-sm font-medium text-foreground" data-testid="nav-user-name">
                  {firstName}
                </span>
                <span className="text-xs text-muted-foreground hidden lg:inline" data-testid="nav-status-label">
                  · {STATUS_LABELS[user.status]}
                </span>
              </div>
              <Button
                asChild
                size="sm"
                className="rounded-full"
                data-testid="btn-nav-welcome"
              >
                <Link href="/welcome">My account</Link>
              </Button>
              <button
                onClick={signOut}
                className="hidden sm:inline-flex text-xs text-muted-foreground hover:text-foreground transition-colors"
                data-testid="btn-nav-sign-out"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden sm:inline-flex text-sm font-medium text-foreground hover:text-primary transition-colors"
                data-testid="link-nav-login"
              >
                Sign In
              </Link>
              <Button asChild size="sm" className="rounded-full shadow-xs" data-testid="btn-nav-join">
                <a href="/what-you-get">Join the Network</a>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
