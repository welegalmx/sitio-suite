"use client";

import { motion } from "framer-motion";
import { Sparkles, ScanText, FileSignature, BellRing, type LucideIcon } from "lucide-react";
import { pillarsSection, pillars } from "@/lib/content";

const icons: Record<string, LucideIcon> = {
  "ai-native": Sparkles,
  "ocr-ai": ScanText,
  "firma-electronica": FileSignature,
  alertas: BellRing,
};

export default function Pillars() {
  return (
    <section id="por-que-welegal" className="bg-dark-card py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-mint">
            {pillarsSection.eyebrow}
          </p>
          <h2 className="font-display mt-4 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            {pillarsSection.headline}
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, index) => {
            const Icon = icons[pillar.id];
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
                className="rounded-2xl border border-foreground/15 bg-foreground/[0.05] p-8 shadow-sm shadow-black/5"
              >
                <Icon className="h-10 w-10" style={{ color: "#2ECFB1" }} strokeWidth={1.75} />
                <h3 className="font-display mt-6 text-lg font-semibold text-foreground">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/50">{pillar.copy}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
