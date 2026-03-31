import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-48 px-4 md:px-6 bg-[#f8f7f5]" data-testid="section-hero">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,rgba(30,80,100,0.05),transparent_50%)]" />
      
      <div className="container mx-auto relative z-10 flex flex-col items-center text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-block py-1.5 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 tracking-wide" data-testid="badge-hero">
            Connecting Scandinavia and Southeast Asia
          </span>
        </motion.div>

        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          data-testid="heading-hero"
        >
          Real human connections <br className="hidden md:block" /> across borders.
        </motion.h1>

        <motion.p 
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          data-testid="text-hero-desc"
        >
          We are a private network of founders, professionals, and companies bridging the Nordic countries and Indonesia. Find your people, discover opportunities, and grow together.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <Button size="lg" className="rounded-full text-base h-12 px-8 shadow-md" asChild data-testid="btn-hero-join">
            <a href="/what-you-get">Join the Community</a>
          </Button>
          <Button size="lg" variant="outline" className="rounded-full text-base h-12 px-8 bg-white" asChild data-testid="btn-hero-how">
            <a href="/how-it-works">How It Works</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}