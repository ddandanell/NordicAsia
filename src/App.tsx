import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { lazy, Suspense } from "react";
import LandingPage from "@/pages/LandingPage"; // Keep landing page synchronous for initial load speed

const WhatYouGet = lazy(() => import("@/pages/WhatYouGet"));
const SignUp = lazy(() => import("@/pages/SignUp"));
const Login = lazy(() => import("@/pages/Login"));
const HowItWorks = lazy(() => import("@/pages/HowItWorks"));
const Welcome = lazy(() => import("@/pages/Welcome"));
import { UserProvider } from "@/context/UserContext";
import { ScrollToTop } from "@/components/ScrollToTop";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

const queryClient = new QueryClient();

function Router() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center p-4">Loading...</div>}>
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route path="/what-you-get" component={WhatYouGet} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/how-it-works" component={HowItWorks} />
        <Route path="/welcome" component={Welcome} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <UserProvider>
          <ScrollToTop />
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
            <FloatingWhatsApp />
          </WouterRouter>
          <Toaster />
        </UserProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
