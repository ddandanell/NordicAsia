import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { WhatItIs } from "@/components/sections/WhatItIs";
import { WhoIsHere } from "@/components/sections/WhoIsHere";
import { WhyJoin } from "@/components/sections/WhyJoin";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Pricing } from "@/components/sections/Pricing";
import { WhyCompanies } from "@/components/sections/WhyCompanies";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function LandingPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <WhatItIs />
        <WhoIsHere />
        <WhyJoin />
        <HowItWorks />
        <Pricing />
        <WhyCompanies />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}