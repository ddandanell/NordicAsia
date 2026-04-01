import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section
      className="relative overflow-hidden py-28 md:py-36 px-4 md:px-6"
      data-testid="section-cta"
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/coworking.jpg')" }}
      />
      <div className="absolute inset-0 z-[1] bg-gradient-to-br from-primary/90 via-primary/85 to-primary/80" />
      <div className="absolute inset-0 z-[2] opacity-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="container mx-auto relative z-10 text-center max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight leading-snug"
            data-testid="heading-cta"
          >
            This is where you start.
          </h2>
          <p
            className="text-base md:text-lg text-white/80 mb-10 leading-relaxed max-w-2xl mx-auto"
            data-testid="text-cta-desc"
          >
            If you want business opportunities, better contacts, useful events,
            and a stronger Nordic community around you in Indonesia — join the
            network today.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="rounded-full text-base h-14 px-10 bg-white text-primary hover:bg-white/90 shadow-lg font-semibold"
              asChild
              data-testid="btn-cta-join"
            >
              <a href="/what-you-get">Join the Community</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full text-base h-14 px-8 border-white/30 text-white hover:bg-white/10"
              asChild
              data-testid="btn-cta-how"
            >
              <a href="/how-it-works">Explore How It Works</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
