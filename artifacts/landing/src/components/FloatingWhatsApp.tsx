import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle } from "lucide-react";

const WA_GROUPS = [
  {
    key: "private",
    flag: "🌐",
    label: "Private Community",
    sub: "All members · moderated",
    href: "https://wa.me/nordicasianetwork",
  },
  {
    key: "dk",
    flag: "🇩🇰",
    label: "Denmark",
    sub: "Dansk gruppe",
    href: "https://wa.me/nordicasia-dk",
  },
  {
    key: "no",
    flag: "🇳🇴",
    label: "Norway",
    sub: "Norsk gruppe",
    href: "https://wa.me/nordicasia-no",
  },
  {
    key: "se",
    flag: "🇸🇪",
    label: "Sweden",
    sub: "Svensk grupp",
    href: "https://wa.me/nordicasia-se",
  },
  {
    key: "fi",
    flag: "🇫🇮",
    label: "Finland",
    sub: "Suomi-ryhmä",
    href: "https://wa.me/nordicasia-fi",
  },
  {
    key: "is",
    flag: "🇮🇸",
    label: "Iceland",
    sub: "Íslenska hópurinn",
    href: "https://wa.me/nordicasia-is",
  },
];

export function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-4 md:right-6 z-50 flex flex-col items-end gap-3">
      {/* Popup panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-card border border-border/60 rounded-2xl shadow-2xl overflow-hidden w-72"
            data-testid="whatsapp-popup"
          >
            {/* Header */}
            <div className="bg-[#25D366] px-4 py-3 flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-bold leading-tight">NordicAsia Network</p>
                <p className="text-white/75 text-xs">Choose your group</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Group list */}
            <div className="flex flex-col divide-y divide-border/50">
              {WA_GROUPS.map((g) => (
                <a
                  key={g.key}
                  href={g.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-muted/60 transition-colors"
                  data-testid={`wa-float-group-${g.key}`}
                  onClick={() => setOpen(false)}
                >
                  <span className="text-xl shrink-0 w-7 text-center">{g.flag}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground leading-tight">{g.label}</p>
                    <p className="text-xs text-muted-foreground">{g.sub}</p>
                  </div>
                  <MessageCircle className="h-3.5 w-3.5 text-[#25D366] shrink-0" />
                </a>
              ))}
            </div>

            {/* Footer note */}
            <div className="px-4 py-2.5 bg-muted/40 border-t border-border/50">
              <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
                All groups are moderated and require approval.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.92 }}
        className="relative h-14 w-14 rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/30 flex items-center justify-center text-white hover:bg-[#22c55e] transition-colors"
        aria-label="Open WhatsApp groups"
        data-testid="btn-float-whatsapp"
      >
        {/* Pulse ring — only when closed */}
        {!open && (
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
        )}
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
