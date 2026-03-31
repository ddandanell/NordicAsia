import { motion } from "framer-motion";
import { MapPin, Users } from "lucide-react";

const AREAS = [
  {
    name: "Bali",
    image: "/images/bali.jpg",
    members: 245,
    desc: "Creative founders, remote workers, families, hospitality professionals, and long-stay entrepreneurs. The heart of the Nordic expat community.",
  },
  {
    name: "Jakarta",
    image: "/images/jakarta.jpg",
    members: 178,
    desc: "Corporate professionals, executives, decision-makers, embassy staff, and the centre of Nordic business activity in Indonesia.",
  },
  {
    name: "Surabaya",
    image: "/images/surabaya.jpg",
    members: 42,
    desc: "East Java's industrial hub. Manufacturing leaders, trade professionals, and a small but growing community of Nordic families.",
  },
  {
    name: "Bandung",
    image: "/images/bandung.jpg",
    members: 31,
    desc: "Creative industries, tech startups, and professionals who enjoy a cooler climate, close to Jakarta but with a slower pace.",
  },
  {
    name: "Yogyakarta",
    image: "/images/yogyakarta.jpg",
    members: 18,
    desc: "Culture, education, and heritage. A growing spot for Nordic creatives, researchers, and those drawn to traditional Java.",
  },
  {
    name: "Lombok",
    image: "/images/lombok.jpg",
    members: 14,
    desc: "A quieter alternative to Bali. Attracting Nordic entrepreneurs, divers, and families looking for a slower pace with strong community ties.",
  },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function AreaCoverage() {
  return (
    <section
      className="py-20 md:py-28 px-4 md:px-6 bg-background"
      id="areas"
      data-testid="section-areas"
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
            Where we are
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            data-testid="heading-areas"
          >
            Active across Indonesia
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            These are the areas where our Nordic network is active. Explore where
            people are based, where events happen, and where the community is
            growing.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          data-testid="area-grid"
        >
          {AREAS.map((area) => (
            <motion.div
              key={area.name}
              variants={cardVariant}
              className="group relative overflow-hidden rounded-2xl cursor-default min-h-[220px]"
              data-testid={`area-card-${area.name.toLowerCase()}`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                style={{ backgroundImage: `url('${area.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="relative z-10 h-full flex flex-col justify-end p-5 md:p-6">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-white/70" />
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    {area.name}
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 mb-3">
                  <Users className="h-3.5 w-3.5 text-white/60" />
                  <span className="text-xs font-semibold text-white/70">
                    {area.members} members
                  </span>
                </div>

                <p className="text-xs text-white/70 leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
                  {area.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
