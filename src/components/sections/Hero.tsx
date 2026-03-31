import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      className="relative overflow-hidden min-h-[90vh] md:min-h-[85vh] flex items-center justify-center px-4 md:px-6"
      data-testid="section-hero"
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
        data-testid="hero-bg-image"
      />
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 z-0 w-full h-full object-cover"
        poster="/images/hero.jpg"
        data-testid="hero-bg-video"
      >
        <source src="/images/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_top_right,rgba(30,80,100,0.15),transparent_60%)]" />

      <div className="container mx-auto relative z-10 flex flex-col items-center text-center max-w-4xl py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span
            className="inline-block py-1.5 px-4 rounded-full bg-white/15 text-white/90 text-sm font-medium mb-6 tracking-wide backdrop-blur-sm border border-white/10"
            data-testid="badge-hero"
          >
            The Nordic Network in Indonesia
          </span>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.08]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          data-testid="heading-hero"
        >
          The Nordic Community and
          <br className="hidden md:block" /> Business Network in Indonesia.
        </motion.h1>

        <motion.p
          className="text-base md:text-lg text-white/80 max-w-2xl mb-5 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          data-testid="text-hero-desc"
        >
          Meet people, join groups, explore events, and build better connections
          across Bali, Jakarta, and beyond.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
        >
          <Button
            size="lg"
            className="rounded-full text-base h-13 px-10 shadow-lg bg-white text-foreground hover:bg-white/90 font-semibold"
            asChild
            data-testid="btn-hero-join"
          >
            <a href="/what-you-get">Join the Community</a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full text-base h-13 px-8 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
            asChild
            data-testid="btn-hero-how"
          >
            <a href="/how-it-works">How It Works</a>
          </Button>
        </motion.div>

        <motion.p
          className="text-sm text-white/60 max-w-md leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          data-testid="text-hero-trust"
        >
          First event is free. Powered by WhatsApp. Apply, join, meet people, then decide.
        </motion.p>
      </div>

      {/* Stats bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-10 bg-black/30 backdrop-blur-md border-t border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        data-testid="hero-stats"
      >
        <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:gap-x-16">
          {[
            { value: "5", label: "Nordic countries" },
            { value: "500+", label: "Members" },
            { value: "80", label: "Events held" },
            { value: "100+", label: "Groups" },
            { value: "6", label: "Cities" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center shrink-0">
              <p className="text-base md:text-xl font-bold text-white">{value}</p>
              <p className="text-[10px] md:text-xs text-white/60 uppercase tracking-wider whitespace-nowrap">{label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
