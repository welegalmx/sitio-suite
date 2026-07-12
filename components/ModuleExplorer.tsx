"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
      className={`w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors ${
        active ? "text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
      }`}
      style={active ? { background: "var(--gradient-brand)" } : undefined}
    >
      {label}
    </button>
  );
}

export default function ModuleExplorer() {
  const [selectedId, setSelectedId] = useState("contratos");

  const active: ModuleItem =
    [...coreModules, ...premiumModules].find((m) => m.id === selectedId) ?? coreModules[0];

  const note = "note" in active ? active.note : undefined;

  return (
    <section id="modulos" className="bg-dark-bg py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-mint">
            {modulesSection.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            {modulesSection.headline}
          </h2>
          <p className="mt-4 text-base text-white/45">{modulesSection.subtitle}</p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="flex flex-col gap-1">
            <p className="px-4 pb-2 text-xs font-semibold uppercase tracking-widest text-white/30">
              Core
            </p>
            {coreModules.map((module) => (
              <SidebarButton
                key={module.id}
                label={module.name}
                active={module.id === selectedId}
                onClick={() => setSelectedId(module.id)}
              />
            ))}

            <div className="my-4 border-t border-white/10" />

            <p className="px-4 pb-2 text-xs font-semibold uppercase tracking-widest text-white/30">
              Premium
            </p>
            {premiumModules.map((module) => (
              <SidebarButton
                key={module.id}
                label={module.name}
                active={module.id === selectedId}
                onClick={() => setSelectedId(module.id)}
              />
            ))}
          </aside>

          <div className="relative min-h-[520px] overflow-hidden rounded-2xl border border-white/10 bg-dark-card/60 p-8 md:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <p className="text-sm font-semibold uppercase tracking-widest text-brand-mint">
                  {active.name}
                </p>
                <h3 className="mt-3 text-2xl font-bold leading-snug text-white md:text-3xl">
                  {active.phrase}
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/50 md:text-base">
                  {active.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {active.capabilities.map((capability) => (
                    <span
                      key={capability}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70"
                    >
                      {capability}
                    </span>
                  ))}
                </div>

                {note && <p className="mt-6 text-xs italic text-white/40">{note}</p>}

                {hasMockups(active) && active.mockups.length > 0 && (
                  <div className="mt-8 space-y-3">
                    {active.mockups.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3"
                      >
                        <div>
                          <p className="text-sm font-medium text-white">{item.label}</p>
                          <p className="text-xs text-white/40">{item.detail}</p>
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
          </div>
        </div>
      </div>
    </section>
  );
}
