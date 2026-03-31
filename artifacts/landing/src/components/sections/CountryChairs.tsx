import { motion } from "framer-motion";

const CHAIRS = [
  {
    flag: "🇩🇰",
    country: "Denmark",
    name: "Lars Erik Møller",
    title: "Country Chair · Denmark",
    location: "Copenhagen → Bali",
    bio: "Lars has been part of the Nordic community in Bali for over eight years. He brings together Danish professionals and businesses across Indonesia.",
    photo: "/images/chair-denmark.png",
  },
  {
    flag: "🇳🇴",
    country: "Norway",
    name: "Karin Halvorsen",
    title: "Country Chair · Norway",
    location: "Oslo → Jakarta",
    bio: "Karin leads the Norwegian chapter of the network from Jakarta, connecting professionals in finance, energy, and trade between Norway and Indonesia.",
    photo: "/images/chair-norway.png",
  },
  {
    flag: "🇸🇪",
    country: "Sweden",
    name: "Erik Lindqvist",
    title: "Country Chair · Sweden",
    location: "Stockholm → Bali",
    bio: "Erik founded the first Swedish meetup group in Bali in 2018 and has grown it into one of the most active Nordic chapters on the island.",
    photo: "/images/chair-sweden.png",
  },
  {
    flag: "🇫🇮",
    country: "Finland",
    name: "Aino Mäkinen",
    title: "Country Chair · Finland",
    location: "Helsinki → Jakarta",
    bio: "Aino represents the Finnish community across Indonesia, with a focus on technology, education, and sustainable business.",
    photo: "/images/chair-finland.png",
  },
  {
    flag: "🇮🇸",
    country: "Iceland",
    name: "Björn Sigurdsson",
    title: "Country Chair · Iceland",
    location: "Reykjavik → Bali",
    bio: "Björn has lived between Iceland and Bali for six years, building bridges between Icelandic entrepreneurs and the broader Nordic network in Asia.",
    photo: "/images/chair-iceland.png",
  },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function CountryChairs() {
  return (
    <section
      className="py-20 md:py-28 px-4 md:px-6 bg-muted/30"
      data-testid="section-country-chairs"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-xs font-semibold text-primary uppercase tracking-widest mb-3">
            Leadership
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Meet the country chairs
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Each Nordic country has a dedicated chair who organises events, welcomes new members, and keeps the community strong on the ground in Indonesia.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {CHAIRS.map((chair) => (
            <motion.div
              key={chair.country}
              variants={cardVariant}
              className="bg-card border border-border/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              data-testid={`card-chair-${chair.country.toLowerCase()}`}
            >
              {/* Photo */}
              <div className="relative h-56 bg-muted overflow-hidden">
                <img
                  src={chair.photo}
                  alt={`${chair.name} — ${chair.title}`}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
                {/* Country flag overlay */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-background/90 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-sm">
                  <span className="text-base leading-none">{chair.flag}</span>
                  <span className="text-xs font-semibold text-foreground">{chair.country}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-2">
                <div>
                  <p className="text-base font-bold text-foreground leading-snug" data-testid={`chair-name-${chair.country.toLowerCase()}`}>
                    {chair.name}
                  </p>
                  <p className="text-xs font-semibold text-primary mt-0.5">
                    {chair.title}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="inline-block h-1 w-1 rounded-full bg-primary/50 shrink-0" />
                  {chair.location}
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                  {chair.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          className="text-center text-xs text-muted-foreground mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          The five chairs meet monthly to coordinate events and ensure every country community is active and growing.
        </motion.p>
      </div>
    </section>
  );
}
