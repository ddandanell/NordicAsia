import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="py-32 bg-primary relative overflow-hidden" data-testid="section-cta">
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight" data-testid="heading-cta">
            Ready to join the network?
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 leading-relaxed max-w-2xl mx-auto" data-testid="text-cta-desc">
            Stop searching and start connecting. Become a member today and get instant access to our community of professionals and businesses.
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="rounded-full text-base h-14 px-10 bg-white text-primary hover:bg-white/90 shadow-lg" 
            asChild
            data-testid="btn-cta-join"
          >
            <a href="#pricing">Join the Community</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}