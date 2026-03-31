import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const HIGHLIGHTS = [
  "Better contacts across Indonesia",
  "More opportunities for business and life",
  "A trusted Nordic network you can rely on",
  "Events across Bali, Jakarta, and beyond",
  "Business and community in one place",
];

export function VideoShowcase() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function toggleVideo() {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  }

  return (
    <section
      className="py-20 md:py-28 px-4 md:px-6 bg-background"
      data-testid="section-video-showcase"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-xs font-semibold text-primary uppercase tracking-widest mb-3">
            See it for yourself
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            data-testid="heading-video-showcase"
          >
            See what members get from the network
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Real people, real value. Watch how the Nordic community in Indonesia
            helps professionals and companies build stronger connections, find
            opportunities, and grow together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          <motion.div
            className="lg:col-span-3 relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer bg-black"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            onClick={toggleVideo}
            data-testid="video-player"
          >
            <video
              ref={videoRef}
              className="w-full aspect-video object-cover"
              poster="/images/community.jpg"
              playsInline
              onEnded={() => setPlaying(false)}
              data-testid="video-element"
            >
              <source src="/images/hero-video.mp4" type="video/mp4" />
            </video>

            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                playing
                  ? "opacity-0 hover:opacity-100"
                  : "opacity-100"
              }`}
            >
              <div className="absolute inset-0 bg-black/30" />
              <div className="relative z-10 h-16 w-16 md:h-20 md:w-20 rounded-full bg-white/95 flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                {playing ? (
                  <Pause className="h-6 w-6 md:h-7 md:w-7 text-primary ml-0" />
                ) : (
                  <Play className="h-6 w-6 md:h-7 md:w-7 text-primary ml-1" />
                )}
              </div>
            </div>

            {!playing && (
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <p className="text-white text-sm font-medium drop-shadow-md">
                  Introduction to the NordicAsia Network
                </p>
                <p className="text-white/70 text-xs">2 min watch</p>
              </div>
            )}
          </motion.div>

          <motion.div
            className="lg:col-span-2 flex flex-col gap-3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <h3 className="text-lg font-bold text-foreground mb-1">
              What you get as a member
            </h3>
            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
              Every person who joins gets access to a real, active network of
              Nordic professionals in Indonesia. Here is what that means in
              practice.
            </p>

            <div className="flex flex-col gap-2.5">
              {HIGHLIGHTS.map((text, i) => (
                <motion.div
                  key={text}
                  className="flex items-start gap-3 p-3 rounded-xl bg-[#f8f7f5] border border-border/40"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.2 + i * 0.06 }}
                >
                  <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-sm text-foreground leading-snug">
                    {text}
                  </span>
                </motion.div>
              ))}
            </div>

            <Button
              className="rounded-full mt-3 self-start"
              asChild
              data-testid="btn-video-join"
            >
              <a href="/what-you-get">See membership options</a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
