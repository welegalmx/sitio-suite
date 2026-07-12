"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { motion } from "framer-motion";
import { Check, Calendar } from "lucide-react";
import { demo } from "@/lib/content";
import { renderHighlighted } from "@/lib/highlight-text";

const FALLBACK_TIMEOUT_MS = 4000;

function CalendlyEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasIframe = containerRef.current?.querySelector("iframe");
      if (!hasIframe) setShowFallback(true);
    }, FALLBACK_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, []);

  if (showFallback) {
    return (
      <div className="flex h-[560px] flex-col items-center justify-center gap-4 rounded-xl border border-foreground/20 bg-foreground/[0.05] px-8 text-center">
        <p className="text-sm text-foreground/60">
          No pudimos cargar el calendario. Escríbenos y agendamos tu demo por correo.
        </p>
        <a
          href={`mailto:${demo.calendly.fallbackEmail}`}
          className="rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: "var(--gradient-brand)" }}
        >
          {demo.calendly.fallbackEmail}
        </a>
      </div>
    );
  }

  return (
    <div ref={containerRef}>
      <div
        className="calendly-inline-widget"
        data-url={`${demo.calendly.url}?hide_gdpr_banner=1&primary_color=${demo.calendly.primaryColor}&background_color=${demo.calendly.backgroundColor}&text_color=${demo.calendly.textColor}`}
        style={{ minWidth: "280px", height: "560px" }}
      />
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
    </div>
  );
}

export default function Demo() {
  return (
    <section id="demo" className="bg-[#F0F7FF] py-24">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-2 md:items-start">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-mint">
            {demo.eyebrow}
          </p>
          <h2 className="font-display mt-4 text-3xl font-extrabold leading-tight tracking-tight text-foreground md:text-4xl">
            {renderHighlighted(demo.headline, demo.headlineHighlight)}
          </h2>
          <p className="mt-4 text-base text-foreground/50">{demo.subtitle}</p>

          <div className="mt-10 space-y-5">
            {demo.highlights.map((item) => (
              <div key={item.text} className="flex items-start gap-4">
                <span className="text-2xl leading-none">{item.emoji}</span>
                <p className="text-sm leading-relaxed text-foreground/70">{item.text}</p>
              </div>
            ))}
          </div>

          <ul className="mt-10 space-y-3 border-t border-foreground/20 pt-8">
            {demo.guarantees.map((guarantee) => (
              <li key={guarantee} className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0" style={{ color: "#2ECFB1" }} />
                <span className="text-sm text-foreground/60">{guarantee}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          className="rounded-2xl border border-brand-mint/40 bg-dark-card p-6 shadow-sm shadow-black/5"
        >
          <div className="mb-6 flex items-center gap-3">
            <Calendar className="h-5 w-5" style={{ color: "#2ECFB1" }} />
            <p className="text-sm font-semibold text-foreground">Demo we.legal Suite · 30 minutos</p>
          </div>

          <CalendlyEmbed />
        </motion.div>
      </div>
    </section>
  );
}
