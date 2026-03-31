import { motion } from "framer-motion";

export function WhatItIs() {
  return (
    <section id="about" className="py-24 md:py-32 bg-white" data-testid="section-what">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 tracking-tight text-foreground" data-testid="heading-what">
              More than just a contact list
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed" data-testid="text-what-desc">
              LinkedIn is great for names, but business happens through trust. We built this community to bridge the clean, precise business culture of the Nordics with the fast, dynamic energy of Asia. This is a place where real people meet, share honest advice, and help each other succeed in a new market.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}