import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COUNTRIES = [
  {
    name: "Denmark",
    flag: "🇩🇰",
    code: "DK",
    color: "#C60C30",
    companies: [
      "Novo Nordisk", "AP Møller-Mærsk", "DSV Panalpina", "Vestas Wind Systems",
      "Carlsberg", "Genmab", "Novozymes", "Pandora", "Tryg", "Ascendis Pharma",
    ],
  },
  {
    name: "Sweden",
    flag: "🇸🇪",
    code: "SE",
    color: "#006AA7",
    companies: [
      "Investor AB", "Atlas Copco", "Spotify", "AB Volvo", "ASSA ABLOY",
      "SEB", "Epiroc", "H&M", "Sandvik", "Swedbank",
    ],
  },
  {
    name: "Norway",
    flag: "🇳🇴",
    code: "NO",
    color: "#EF2B2D",
    companies: [
      "Equinor", "DNB Bank", "Kongsberg Gruppen", "Aker BP", "Norsk Hydro",
      "Telenor", "Yara International", "Var Energi", "Orkla", "Storebrand",
    ],
  },
  {
    name: "Finland",
    flag: "🇫🇮",
    code: "FI",
    color: "#003580",
    companies: [
      "KONE", "Nokia", "Neste", "Nordea Bank", "UPM-Kymmene",
      "Fortum", "Sampo", "Metso Outotec", "Konecranes", "Elisa",
    ],
  },
  {
    name: "Iceland",
    flag: "🇮🇸",
    code: "IS",
    color: "#003897",
    companies: [
      "Marel", "Alvotech", "Arion Banki", "Össur", "Icelandair Group",
      "Íslandsbanki", "Brim", "Síminn", "Landsvirkjun", "Bakkavör Group",
    ],
  },
];

const nameVariants = {
  hidden: { opacity: 0 },
  show: (i: number) => ({
    opacity: 1,
    transition: { delay: i * 0.04, duration: 0.3 },
  }),
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

export function WhyCompanies() {
  const [active, setActive] = useState(0);
  const country = COUNTRIES[active];

  return (
    <section
      className="py-20 md:py-28 px-4 md:px-6 bg-[#0f1117] text-white overflow-hidden"
      data-testid="section-company-trust"
    >
      <div className="container mx-auto max-w-6xl">

        {/* Header */}
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
        >
          <span className="inline-block text-xs font-semibold text-primary uppercase tracking-widest mb-4">
            A business lodge for the Nordics
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight max-w-lg" data-testid="heading-company-trust">
              Five countries.<br className="hidden md:block" /> One network.
            </h2>
            <p className="text-sm text-white/50 max-w-xs leading-relaxed md:text-right">
              The largest companies from each Nordic country are connected to our ecosystem — supporting the community in Indonesia.
            </p>
          </div>
        </motion.div>

        {/* Country tab selector */}
        <motion.div
          className="flex gap-2 md:gap-3 mb-10 overflow-x-auto pb-2 scrollbar-none"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          {COUNTRIES.map((c, i) => (
            <button
              key={c.code}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                active === i
                  ? "bg-white text-[#0f1117] border-white shadow-lg scale-105"
                  : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white"
              }`}
              data-testid={`tab-country-${c.code.toLowerCase()}`}
            >
              <span className="text-base">{c.flag}</span>
              <span>{c.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Company names display */}
        <div className="relative min-h-[220px] md:min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={country.code}
              className="flex flex-wrap gap-3 md:gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              data-testid={`companies-${country.code.toLowerCase()}`}
            >
              {country.companies.map((name, i) => (
                <motion.div
                  key={name}
                  custom={i}
                  variants={nameVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all cursor-default"
                  data-testid={`chip-${name.toLowerCase().replace(/\s+/g, "-").slice(0, 20)}`}
                >
                  <span className="text-lg leading-none">{country.flag}</span>
                  <span className="text-sm font-semibold text-white">{name}</span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Divider + disclaimer */}
        <motion.div
          className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-4">
            {COUNTRIES.map((c) => (
              <span key={c.code} className="text-2xl" title={c.name}>{c.flag}</span>
            ))}
          </div>
          <p className="text-xs text-white/35 max-w-md leading-relaxed">
            Company names are shown to illustrate the level and reach of the network. We do not claim endorsement or formal partnership.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
