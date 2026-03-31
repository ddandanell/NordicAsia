import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { AreaCoverage } from "@/components/sections/AreaCoverage";
import { WhatItIs } from "@/components/sections/WhatItIs";
import { CommunityTypes } from "@/components/sections/CommunityTypes";
import { VideoShowcase } from "@/components/sections/VideoShowcase";
import { MemberStories } from "@/components/sections/MemberStories";
import { WhyJoin } from "@/components/sections/WhyJoin";
import { WhyCompanies } from "@/components/sections/WhyCompanies";
import { Pricing } from "@/components/sections/Pricing";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function LandingPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <AreaCoverage />
        <WhatItIs />
        <CommunityTypes />
        <VideoShowcase />
        <MemberStories />
        <WhyJoin />
        <WhyCompanies />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
