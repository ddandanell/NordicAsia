import { motion } from "framer-motion";
import { Eye, Magnet, Building, BriefcaseBusiness } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const companyBenefits = [
  {
    title: "Regional Visibility",
    description: "Showcase your brand to a highly targeted audience of professionals and partners.",
    icon: Eye,
    id: "visibility"
  },
  {
    title: "Quality Leads",
    description: "Find potential clients or distributors who are actively looking for Nordic quality or Asian scale.",
    icon: Magnet,
    id: "leads"
  },
  {
    title: "Local Presence",
    description: "Establish trust before you even open an office by being active in the local community.",
    icon: Building,
    id: "presence"
  },
  {
    title: "Find Talent",
    description: "Hire individuals who understand both cultures and can bridge the gap in your team.",
    icon: BriefcaseBusiness,
    id: "talent"
  }
];

export function WhyCompanies() {
  return (
    <section className="py-24 bg-[#f8f7f5]" data-testid="section-companies">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-semibold mb-6 tracking-tight" data-testid="heading-companies">Why companies join</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Entering a new market is expensive and risky. We help companies reduce that risk by plugging them directly into a network of people who already know the landscape.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Whether you are a Swedish tech firm looking for Indonesian developers, or an Asian manufacturer wanting to sell in Norway, this is your launchpad.
              </p>
            </motion.div>
          </div>
          
          <div className="md:w-1/2 w-full">
            <div className="grid sm:grid-cols-2 gap-4">
              {companyBenefits.map((benefit, index) => (
                <motion.div
                  key={benefit.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full border-none shadow-sm rounded-xl" data-testid={`card-company-${benefit.id}`}>
                    <CardContent className="p-6">
                      <div className="mb-4 text-primary">
                        <benefit.icon className="h-6 w-6" />
                      </div>
                      <h4 className="font-medium mb-2">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}