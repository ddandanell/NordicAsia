import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Explore",
    description: "Browse our directory of members, companies, and ongoing projects. See who is active in your industry.",
    id: "explore"
  },
  {
    num: "02",
    title: "Connect",
    description: "Send direct messages, join specific interest groups, or attend our monthly online and offline events.",
    id: "connect"
  },
  {
    num: "03",
    title: "Grow",
    description: "Build lasting relationships, find your next business partner, or hire the right local talent.",
    id: "grow"
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-[#f8f7f5]" data-testid="section-how">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight" data-testid="heading-how">How it works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple, transparent, and focused on real connections.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative max-w-5xl mx-auto">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-border -z-10" />

          {steps.map((step, index) => (
            <motion.div 
              key={step.id}
              className="flex flex-col items-center text-center relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              data-testid={`step-item-${step.id}`}
            >
              <div className="w-24 h-24 rounded-full bg-white border border-border/60 shadow-sm flex items-center justify-center mb-6 text-2xl font-semibold text-primary">
                {step.num}
              </div>
              <h3 className="text-xl font-medium mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed px-4">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}