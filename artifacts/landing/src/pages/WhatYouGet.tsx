import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Users,
  Briefcase,
  Calendar,
  MessageCircle,
  Globe,
  Check,
  Lock,
  Star,
  Building2,
  UserCircle,
} from "lucide-react";

const freeFeatures = [
  "Browse the public member directory",
  "See upcoming events and their details",
  "Read community updates and announcements",
  "Apply to join (subject to approval)",
];

const paidFeatures = [
  "Full access to the private member directory",
  "Direct introductions to other members",
  "Attend all community events — online and in-person",
  "Join the private WhatsApp group",
  "Access to the business opportunity board",
  "Mentorship from experienced members",
  "Company listing in the member directory",
  "Monthly digital newsletter with market insights",
];

const companyFeatures = [
  "Everything in the paid membership",
  "Featured company profile in the directory",
  "Sponsored post in the monthly newsletter",
  "Introductions to potential partners and clients",
  "Visibility at events as a community partner",
  "Priority access to new members from your sector",
  "Recruitment access — find Nordic talent in Asia",
];

const faqItems = [
  {
    id: "what-is-this",
    question: "What is this?",
    answer:
      "NordicAsia Network is a private community for Nordic people (from Norway, Sweden, Denmark, Finland, and Iceland) who live in, work in, or do business with Indonesia and Southeast Asia. It is also for Asian professionals and companies who want real connections with the Nordic world. Think of it as a trusted inner circle — not a giant platform, not a public forum. A real community of real people.",
  },
  {
    id: "who-is-this-for",
    question: "Who is this for?",
    answer:
      "This is for you if you are a Nordic expat living in Indonesia or Asia, an Indonesian or Asian professional who works with Nordic companies, a founder or entrepreneur looking for partners, investors, or customers across the two regions, a company looking to grow in Asia or attract Nordic talent, or simply someone who wants to meet people from home or build a new professional circle in a new country.",
  },
  {
    id: "free-access",
    question: "What can I do for free?",
    answer:
      "Free visitors can browse public information about the community, see event listings, and read public updates. You cannot contact members, join events, or access the private directory without a membership. Free access is designed to help you understand the community before you decide to join.",
  },
  {
    id: "paid-members",
    question: "What do paid members get?",
    answer:
      "Paid members get full access to the private community. This means you can see who else is in the network, request introductions, join all events, and participate in the private WhatsApp group where most of the day-to-day conversations happen. You also get access to the business opportunity board, where members share jobs, partnerships, and market opportunities.",
  },
  {
    id: "company-members",
    question: "What do company members get?",
    answer:
      "Company membership is for businesses that want to be visible inside the network. Your company gets a featured profile in our directory so members can find and contact you directly. You also get a sponsored post in our monthly newsletter, access to potential clients and partners through curated introductions, and the ability to recruit from our pool of Nordic professionals in Asia.",
  },
  {
    id: "events",
    question: "How do events work?",
    answer:
      "We run events in two formats. Online events are video calls and webinars — open to members across Asia and Europe. In-person events happen in Jakarta and other cities and are smaller, more personal gatherings. Events include networking dinners, business roundtables, and casual meetups. All events are visible to free users, but only paid members can attend. We typically host two to four events per month.",
  },
  {
    id: "whatsapp",
    question: "How does WhatsApp fit into this?",
    answer:
      "WhatsApp is where the community actually lives day to day. Paid members are added to a private WhatsApp group where people share opportunities, ask questions, make introductions, and stay connected between events. It is active, useful, and well-moderated. We keep it focused on business and professional topics — not noise. It is one of the most valuable parts of membership.",
  },
  {
    id: "why-useful",
    question: "Why does this network matter?",
    answer:
      "Most professional networks are too big to be useful. You end up with thousands of contacts and no real relationships. NordicAsia Network is kept deliberately small and high-quality. Everyone is either Nordic, connected to the Nordic world, or doing serious business in Asia. That shared context makes conversations more relevant, introductions more useful, and trust easier to build. If you are trying to do business across these two regions, this is the fastest way to find the right people.",
  },
];

export default function WhatYouGet() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 pb-24">
        {/* Page Header */}
        <section
          className="bg-background border-b border-border/50 py-10 md:py-16"
          data-testid="section-header"
        >
          <div className="container mx-auto px-4 md:px-6 max-w-2xl text-center">
            <Badge
              variant="secondary"
              className="mb-4 rounded-full px-4 py-1 text-xs font-medium tracking-wide"
              data-testid="badge-page-label"
            >
              Before you sign up
            </Badge>
            <h1
              className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-3"
              data-testid="heading-main"
            >
              What you get when you join
            </h1>
            <p
              className="text-base text-muted-foreground leading-relaxed"
              data-testid="text-subtitle"
            >
              No surprises. Here is exactly what the NordicAsia Network is, who
              it is for, and what you can access at each level.
            </p>
          </div>
        </section>

        {/* Access Tier Cards */}
        <section
          className="py-10 md:py-14"
          data-testid="section-tiers"
        >
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-6 text-center">
              Three ways to be part of the network
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Free */}
              <div
                className="rounded-2xl border border-border/70 bg-card p-5 flex flex-col gap-3"
                data-testid="card-tier-free"
              >
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                    <UserCircle className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <span className="font-semibold text-foreground text-sm">Visitor</span>
                  <Badge variant="secondary" className="ml-auto text-xs rounded-full px-2 py-0.5">Free</Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Browse the public community and learn what we do before committing.
                </p>
                <ul className="flex flex-col gap-1.5 mt-1">
                  {freeFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-foreground">
                      <Check className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Member */}
              <div
                className="rounded-2xl border-2 border-primary bg-card p-5 flex flex-col gap-3 relative shadow-sm"
                data-testid="card-tier-member"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="rounded-full px-3 py-0.5 text-xs font-medium bg-primary text-primary-foreground shadow">
                    Most popular
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Star className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-semibold text-foreground text-sm">Member</span>
                  <span className="ml-auto text-xs font-semibold text-primary">Paid</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Full access to the community, events, WhatsApp, and the member directory.
                </p>
                <ul className="flex flex-col gap-1.5 mt-1">
                  {paidFeatures.slice(0, 5).map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-foreground">
                      <Check className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                  <li className="text-xs text-muted-foreground pl-5">+ {paidFeatures.length - 5} more benefits</li>
                </ul>
              </div>

              {/* Company */}
              <div
                className="rounded-2xl border border-border/70 bg-card p-5 flex flex-col gap-3"
                data-testid="card-tier-company"
              >
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <span className="font-semibold text-foreground text-sm">Company</span>
                  <span className="ml-auto text-xs font-semibold text-muted-foreground">Paid</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Get your business visible to the right people across both regions.
                </p>
                <ul className="flex flex-col gap-1.5 mt-1">
                  {companyFeatures.slice(0, 5).map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-foreground">
                      <Check className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                  <li className="text-xs text-muted-foreground pl-5">+ {companyFeatures.length - 5} more benefits</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <Separator className="max-w-3xl mx-auto opacity-50" />

        {/* What members get — full detail */}
        <section className="py-10 md:py-14" data-testid="section-member-detail">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-xl font-bold text-foreground mb-6">
              Full membership benefits
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { icon: Users, label: "Private member directory", desc: "See who is in the network and reach out directly." },
                { icon: MessageCircle, label: "WhatsApp group access", desc: "Where daily conversations and opportunities happen." },
                { icon: Calendar, label: "All events — online and in-person", desc: "Dinners, roundtables, and casual meetups." },
                { icon: Globe, label: "Business opportunity board", desc: "Jobs, partnerships, and leads from within the community." },
                { icon: Briefcase, label: "Curated introductions", desc: "We connect you to the right people — not random contacts." },
                { icon: Lock, label: "Company listing", desc: "Your business appears in the private directory." },
              ].map(({ icon: Icon, label, desc }) => (
                <div
                  key={label}
                  className="flex items-start gap-3 p-4 rounded-xl border border-border/60 bg-card"
                  data-testid={`card-benefit-${label.toLowerCase().replace(/\s+/g, "-").slice(0, 30)}`}
                >
                  <div className="h-9 w-9 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Separator className="max-w-3xl mx-auto opacity-50" />

        {/* FAQ Accordion */}
        <section className="py-10 md:py-14" data-testid="section-faq">
          <div className="container mx-auto px-4 md:px-6 max-w-2xl">
            <h2 className="text-xl font-bold text-foreground mb-6">
              Common questions
            </h2>

            <Accordion type="single" collapsible className="flex flex-col gap-2" data-testid="accordion-faq">
              {faqItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="rounded-xl border border-border/60 bg-card px-4 data-[state=open]:border-primary/30"
                  data-testid={`accordion-item-${item.id}`}
                >
                  <AccordionTrigger
                    className="text-sm font-semibold text-foreground text-left hover:no-underline py-4 gap-3"
                    data-testid={`accordion-trigger-${item.id}`}
                  >
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent
                    className="text-sm text-muted-foreground leading-relaxed pb-4"
                    data-testid={`accordion-content-${item.id}`}
                  >
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Trust line */}
        <section className="py-8" data-testid="section-trust">
          <div className="container mx-auto px-4 md:px-6 max-w-2xl text-center">
            <p className="text-sm text-muted-foreground">
              Membership is reviewed before approval. We keep the network small and relevant on purpose.
            </p>
          </div>
        </section>
      </main>

      <Footer />

      {/* Sticky bottom CTA */}
      <div
        className="fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur-sm border-t border-border/60 p-4 flex items-center justify-center gap-3 shadow-lg"
        data-testid="sticky-cta-bar"
      >
        <p className="text-sm text-muted-foreground hidden sm:block">
          Ready to join the network?
        </p>
        <Button
          size="lg"
          className="rounded-full w-full sm:w-auto font-semibold shadow"
          asChild
          data-testid="btn-cta-continue"
        >
          <a href="/sign-up">Continue to Sign Up</a>
        </Button>
      </div>
    </div>
  );
}
