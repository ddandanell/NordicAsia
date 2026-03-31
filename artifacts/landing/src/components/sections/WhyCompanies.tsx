import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Country {
  name: string;
  flag: string;
  companies: string[];
}

const COUNTRIES: Country[] = [
  {
    name: "Denmark",
    flag: "🇩🇰",
    companies: [
      "Maersk",
      "Novo Nordisk",
      "Carlsberg",
      "Vestas",
      "Danfoss",
      "Grundfos",
      "Pandora",
      "Coloplast",
      "DSV",
      "Arla Foods",
    ],
  },
  {
    name: "Sweden",
    flag: "🇸🇪",
    companies: [
      "Ericsson",
      "Volvo",
      "H&M Group",
      "IKEA",
      "Atlas Copco",
      "Sandvik",
      "Spotify",
      "Scania",
      "Electrolux",
      "SKF",
    ],
  },
  {
    name: "Norway",
    flag: "🇳🇴",
    companies: [
      "Equinor",
      "Yara International",
      "DNB",
      "Telenor",
      "Kongsberg",
      "Statkraft",
      "Norsk Hydro",
      "Orkla",
      "Aker Solutions",
      "Schibsted",
    ],
  },
  {
    name: "Finland",
    flag: "🇫🇮",
    companies: [
      "Nokia",
      "Wärtsilä",
      "KONE",
      "Neste",
      "UPM",
      "Stora Enso",
      "Outokumpu",
      "Metso",
      "Fortum",
      "Valmet",
    ],
  },
  {
    name: "Iceland",
    flag: "🇮🇸",
    companies: [
      "Marel",
      "Össur",
      "Icelandair",
      "Landsvirkjun",
      "Siminn",
      "Arion Bank",
      "Íslandsbanki",
      "Eimskip",
      "Kvika Bank",
      "Origo",
    ],
  },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const countryVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export function WhyCompanies() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section
      className="py-20 md:py-28 px-4 md:px-6 bg-[#f8f7f5]"
      data-testid="section-company-trust"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-xs font-semibold text-primary uppercase tracking-widest mb-3">
            A business lodge for the Nordics
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            data-testid="heading-company-trust"
          >
            Five countries. One network.
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            NordicAsia Network is a business lodge for Denmark, Sweden, Norway,
            Finland, and Iceland. The biggest companies from each country are
            connected to our ecosystem — supporting the Nordic community in
            Indonesia.
          </p>
        </motion.div>

        {/* Flag row */}
        <motion.div
          className="flex items-center justify-center gap-4 md:gap-8 mb-12"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          data-testid="flags-row"
        >
          {COUNTRIES.map((c) => (
            <div key={c.name} className="flex flex-col items-center gap-1.5">
              <span className="text-3xl md:text-4xl" role="img" aria-label={`Flag of ${c.name}`}>
                {c.flag}
              </span>
              <span className="text-[10px] md:text-xs font-semibold text-foreground/70 uppercase tracking-wider">
                {c.name}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Country company blocks */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          data-testid="company-countries-grid"
        >
          {COUNTRIES.map((country) => {
            const isExpanded = expanded === country.name;
            const visibleCompanies = isExpanded
              ? country.companies
              : country.companies.slice(0, 5);

            return (
              <motion.div
                key={country.name}
                variants={countryVariant}
                className="bg-card rounded-2xl border border-border/60 overflow-hidden hover:shadow-md transition-shadow duration-300"
                data-testid={`country-block-${country.name.toLowerCase()}`}
              >
                <div className="p-5 pb-3 border-b border-border/40">
                  <div className="flex items-center gap-2.5 mb-1">
                    <span className="text-2xl" role="img" aria-label={`Flag of ${country.name}`}>
                      {country.flag}
                    </span>
                    <h3 className="text-base font-bold text-foreground">
                      {country.name}
                    </h3>
                  </div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    {country.companies.length} companies supporting
                  </p>
                </div>

                <div className="p-4">
                  <ul className="flex flex-col gap-1.5">
                    {visibleCompanies.map((company, i) => (
                      <li
                        key={company}
                        className="flex items-center gap-2.5 py-1"
                      >
                        <div className="h-7 w-7 rounded-lg bg-primary/5 flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-primary/50">
                            {company.charAt(0)}
                          </span>
                        </div>
                        <span className="text-sm text-foreground/85 leading-tight">
                          {company}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.ul
                        className="flex flex-col gap-1.5 mt-1.5"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      />
                    )}
                  </AnimatePresence>

                  {!isExpanded && country.companies.length > 5 && (
                    <button
                      onClick={() => setExpanded(country.name)}
                      className="flex items-center gap-1 mt-3 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                      data-testid={`expand-${country.name.toLowerCase()}`}
                    >
                      Show all {country.companies.length}
                      <ChevronDown className="h-3 w-3" />
                    </button>
                  )}

                  {isExpanded && (
                    <button
                      onClick={() => setExpanded(null)}
                      className="flex items-center gap-1 mt-3 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      Show less
                      <ChevronDown className="h-3 w-3 rotate-180" />
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.p
          className="text-xs text-muted-foreground max-w-lg mx-auto leading-relaxed text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          Company names shown to illustrate the level and reach of the network.
          We do not claim endorsement or formal partnership.
        </motion.p>
      </div>
    </section>
  );
}
