import { motion } from "framer-motion";
import { Users, Lightbulb, Handshake, MapPin } from "lucide-react";

const benefits = [
  {
    title: "Find business partners",
    description: "Skip the cold emails. Connect directly with decision-makers who are open to collaboration and joint ventures.",
    icon: Handshake,
    id: "partners"
  },
  {
    title: "Learn how to do business",
    description: "Every culture has its rules. Get honest advice from people who have already navigated the local business landscape.",
    icon: Lightbulb,
    id: "learn"
  },
  {
    title: "Meet people from home",
    description: "Sometimes you just want to speak your own language. Connect with fellow Nordics living and working in Asia.",
    icon: Users,
    id: "home"
  },
  {
    title: "Discover local opportunities",
    description: "Hear about projects, jobs, and investments before they are public, shared within a trusted circle.",
    icon: MapPin,
    id: "opportunities"
  }
];

export function WhyJoin() {
  return (
    <section id="benefits" className="py-24 bg-white" data-testid="section-why">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight" data-testid="heading-why">Why people join</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Time is your most valuable asset. Our community is designed to help you find the right people faster, so you can focus on building.
              </p>
            </motion.div>
          </div>
          
          <div className="lg:w-2/3 grid sm:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={benefit.id}
                className="flex flex-col gap-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                data-testid={`benefit-item-${benefit.id}`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/5">
                    <benefit.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-medium text-lg">{benefit.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}