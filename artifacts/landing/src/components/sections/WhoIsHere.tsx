import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Globe2, Briefcase, TrendingUp, Building2 } from "lucide-react";

const members = [
  {
    title: "Nordic Expats",
    description: "Professionals living in Asia who want to stay connected to their roots and help others navigate the region.",
    icon: Globe2,
    id: "expats"
  },
  {
    title: "Asian Entrepreneurs",
    description: "Founders and business owners looking to partner with Scandinavian companies or enter the Nordic market.",
    icon: Briefcase,
    id: "entrepreneurs"
  },
  {
    title: "Investors",
    description: "Capital partners seeking high-growth opportunities across both regions with trusted local insights.",
    icon: TrendingUp,
    id: "investors"
  },
  {
    title: "Company Leaders",
    description: "Executives managing cross-border teams, looking for local talent, partners, and market knowledge.",
    icon: Building2,
    id: "leaders"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export function WhoIsHere() {
  return (
    <section id="members" className="py-24 bg-[#f8f7f5]" data-testid="section-who">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight" data-testid="heading-who">Who is in the network</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A carefully curated group of people who understand the value of crossing borders.
          </p>
        </div>

        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {members.map((member) => (
            <motion.div key={member.id} variants={itemVariants}>
              <Card className="h-full border-none shadow-sm hover:shadow-md transition-shadow bg-white rounded-2xl overflow-hidden" data-testid={`card-member-${member.id}`}>
                <CardContent className="p-6 md:p-8 flex flex-col items-start text-left">
                  <div className="h-12 w-12 rounded-xl bg-primary/5 flex items-center justify-center mb-6">
                    <member.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-3">{member.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}