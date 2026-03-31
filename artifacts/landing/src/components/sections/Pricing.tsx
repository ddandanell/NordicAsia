import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white" data-testid="section-pricing">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight" data-testid="heading-pricing">Free vs Paid Access</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start for free to see who is here, or upgrade to get the full value of the network.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Tier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full flex flex-col border border-border/50 shadow-sm rounded-2xl" data-testid="card-pricing-free">
              <CardHeader className="p-8 pb-4">
                <h3 className="text-2xl font-medium mb-2">Basic</h3>
                <div className="text-4xl font-semibold mb-2">Free</div>
                <p className="text-sm text-muted-foreground">For looking around.</p>
              </CardHeader>
              <CardContent className="p-8 pt-4 flex-1">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-muted-foreground shrink-0" />
                    <span className="text-sm">Browse member directory (limited info)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-muted-foreground shrink-0" />
                    <span className="text-sm">Read public articles and guides</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-muted-foreground shrink-0" />
                    <span className="text-sm">Receive monthly newsletter</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="p-8 pt-0">
                <Button variant="outline" className="w-full rounded-full" asChild data-testid="btn-pricing-free"><a href="/sign-up">Create Free Account</a></Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Member Tier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="h-full flex flex-col border-primary/20 shadow-md bg-primary/5 rounded-2xl relative overflow-hidden" data-testid="card-pricing-member">
              <div className="absolute top-0 inset-x-0 h-1 bg-primary" />
              <CardHeader className="p-8 pb-4">
                <h3 className="text-2xl font-medium mb-2 text-primary">Member</h3>
                <div className="text-4xl font-semibold mb-2">$29<span className="text-lg text-muted-foreground font-normal">/mo</span></div>
                <p className="text-sm text-muted-foreground">Full access to everything.</p>
              </CardHeader>
              <CardContent className="p-8 pt-4 flex-1">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-sm font-medium">Full member and company directory</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-sm font-medium">Direct messaging to anyone</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-sm font-medium">Invites to private events (online/offline)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-sm font-medium">Personal introductions by admins</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-sm font-medium">Access to exclusive job & partner board</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="p-8 pt-0">
                <Button className="w-full rounded-full shadow-sm" asChild data-testid="btn-pricing-member"><a href="/sign-up">Become a Member</a></Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}