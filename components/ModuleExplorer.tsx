"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  modulesSection,
  coreModules,
  premiumModules,
  type CoreModule,
  type PremiumModule,
} from "@/lib/content";
import { badgeBg, badgeText } from "@/lib/badge-colors";

type ModuleItem = CoreModule | PremiumModule;

function hasMockups(module: ModuleItem): module is CoreModule {
  return "mockups" in module;
}

// El scrollytelling recorre los módulos en el mismo orden que la sidebar:
// core primero, premium después.
const allModules: ModuleItem[] = [...coreModules, ...premiumModules];
const MODULE_COUNT = allModules.length;
const DESKTOP_QUERY = "(min-width: 768px)";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY);
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

function SidebarButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors duration-300 ${
        active ? "text-white" : "text-foreground/60 hover:bg-foreground/8 hover:text-foreground"
      }`}
      style={active ? { background: "var(--gradient-brand)" } : undefined}
    >
      {label}
    </button>
  );
}

function ModulePanel({ active }: { active: ModuleItem }) {
  const note = "note" in active ? active.note : undefined;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={active.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-mint">
          {active.name}
        </p>
        <h3 className="font-display mt-3 text-2xl font-bold leading-snug text-foreground md:text-3xl">
          {active.phrase}
        </h3>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/50 md:text-base">
          {active.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {active.capabilities.map((capability) => (
            <span
              key={capability}
              className="rounded-full border border-foreground/20 bg-foreground/8 px-3 py-1.5 text-xs text-foreground/70"
            >
              {capability}
            </span>
          ))}
        </div>

        {note && <p className="mt-6 text-xs italic text-foreground/40">{note}</p>}

        {hasMockups(active) && active.mockups.length > 0 && (
          <div className="mt-8 space-y-3">
            {active.mockups.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-xl border border-foreground/15 bg-foreground/[0.06] px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-foreground/40">{item.detail}</p>
                </div>
                <span
                  className="rounded-full px-3 py-1 text-xs font-semibold"
                  style={{
                    color: badgeText[item.badge.color],
                    backgroundColor: badgeBg[item.badge.color],
                  }}
                >
                  {item.badge.text}
                </span>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default function ModuleExplorer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isDesktop = useIsDesktop();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Divide el progreso de scroll (0–1) en MODULE_COUNT segmentos iguales
  // y lo convierte en un índice entero 0..MODULE_COUNT-1.
  const rawIndex = useTransform(scrollYProgress, (progress) => {
    const segment = Math.floor(progress * MODULE_COUNT);
    return Math.min(MODULE_COUNT - 1, Math.max(0, segment));
  });

  // Al hacer clic, el scroll suave atraviesa los segmentos intermedios y
  // cada uno dispararía su propia transición — esta bandera silencia esas
  // actualizaciones intermedias mientras dura el scroll programático.
  const isProgrammaticScrollRef = useRef(false);

  useMotionValueEvent(rawIndex, "change", (latest) => {
    if (!isDesktop || isProgrammaticScrollRef.current) return;
    setActiveIndex((prev) => (prev === latest ? prev : latest));
  });

  const scrollToModule = useCallback(
    (index: number) => {
      if (!isDesktop) {
        setActiveIndex(index);
        return;
      }

      const container = containerRef.current;
      if (!container) return;

      isProgrammaticScrollRef.current = true;
      setActiveIndex(index);

      // scrollYProgress (offset "start start"/"end end") avanza de 0 a 1 sobre
      // (altura del contenedor − alto del viewport), no sobre la altura total
      // del contenedor. El target tiene que usar el mismo denominador o el
      // índice que detecta el scroll no coincide con el módulo en el que se
      // hizo clic.
      const containerTop = container.getBoundingClientRect().top + window.scrollY;
      const scrollableRange = container.offsetHeight - window.innerHeight;
      const targetProgress = (index + 0.5) / MODULE_COUNT;
      const targetY = containerTop + targetProgress * scrollableRange;

      const releaseLock = () => {
        isProgrammaticScrollRef.current = false;
        window.removeEventListener("scrollend", releaseLock);
      };
      window.addEventListener("scrollend", releaseLock, { once: true });
      window.setTimeout(releaseLock, 1000);

      window.scrollTo({ top: targetY, behavior: "smooth" });
    },
    [isDesktop]
  );

  const active = allModules[activeIndex];

  return (
    <section id="modulos" className="bg-dark-bg py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-mint">
            {modulesSection.eyebrow}
          </p>
          <h2 className="font-display mt-4 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            {modulesSection.headline}
          </h2>
          <p className="mt-4 text-base text-foreground/50">{modulesSection.subtitle}</p>
        </div>
      </div>

      <div
        ref={containerRef}
        className="mt-16"
        style={isDesktop ? { height: `${MODULE_COUNT * 100}vh` } : undefined}
      >
        <div className={isDesktop ? "sticky top-0 flex h-screen items-center" : ""}>
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
              <aside className="flex flex-col gap-1">
                <p className="px-4 pb-2 text-xs font-semibold uppercase tracking-widest text-foreground/30">
                  Core
                </p>
                {coreModules.map((module, i) => (
                  <SidebarButton
                    key={module.id}
                    label={module.name}
                    active={i === activeIndex}
                    onClick={() => scrollToModule(i)}
                  />
                ))}

                <div className="my-4 border-t border-foreground/20" />

                <p className="px-4 pb-2 text-xs font-semibold uppercase tracking-widest text-foreground/30">
                  Premium
                </p>
                {premiumModules.map((module, i) => {
                  const index = coreModules.length + i;
                  return (
                    <SidebarButton
                      key={module.id}
                      label={module.name}
                      active={index === activeIndex}
                      onClick={() => scrollToModule(index)}
                    />
                  );
                })}
              </aside>

              <div className="relative min-h-[520px] overflow-hidden rounded-2xl border border-foreground/20 bg-dark-card/60 p-8 shadow-sm shadow-black/5 md:p-10">
                <ModulePanel active={active} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
