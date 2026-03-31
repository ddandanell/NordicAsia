import { motion } from "framer-motion";

const COMPANIES = [
  { name: "Ericsson", country: "Sweden" },
  { name: "Maersk", country: "Denmark" },
  { name: "Equinor", country: "Norway" },
  { name: "Nokia", country: "Finland" },
  { name: "H&M Group", country: "Sweden" },
  { name: "Novo Nordisk", country: "Denmark" },
  { name: "Yara International", country: "Norway" },
  { name: "Wärtsilä", country: "Finland" },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const itemVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
};

export function WhyCompanies() {
  return (
    <section
      className="py-20 md:py-28 px-4 md:px-6 bg-[#f8f7f5]"
      data-testid="section-company-trust"
    >
      <div className="container mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="inline-block text-xs font-semibold text-primary uppercase tracking-widest mb-3">
            Trusted network
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            data-testid="heading-company-trust"
          >
            Connected to Nordic business leaders
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Many of the biggest companies from each Nordic country are part of or
            connected to this ecosystem. Our members include professionals,
            founders, and people working with some of the most recognized Nordic
            companies active in Indonesia.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mb-10"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          data-testid="company-grid"
        >
          {COMPANIES.map((c) => (
            <motion.div
              key={c.name}
              variants={itemVariant}
              className="group flex flex-col items-center justify-center gap-2 p-6 md:p-8 rounded-2xl border border-border/60 bg-card hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              data-testid={`company-${c.name.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center mb-1">
                <span className="text-lg font-bold text-primary/60 group-hover:text-primary transition-colors">
                  {c.name.charAt(0)}
                </span>
              </div>
              <p className="text-sm font-semibold text-foreground">{c.name}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                {c.country}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="text-xs text-muted-foreground max-w-lg mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          Company names shown to illustrate the level and reach of the network.
          Logos are placeholders — we do not claim endorsement or partnership.
        </motion.p>
      </div>
    </section>
  );
}
