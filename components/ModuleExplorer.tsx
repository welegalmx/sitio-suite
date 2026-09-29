"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight, Layers3 } from "lucide-react";
import { modulesSection, coreModules } from "@/lib/content";
import { badgeBg, badgeText } from "@/lib/badge-colors";

export default function ModuleExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = coreModules[activeIndex];
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown")
      next = (index + 1) % coreModules.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      next = (index + coreModules.length - 1) % coreModules.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = coreModules.length - 1;
    else return;
    event.preventDefault();
    setActiveIndex(next);
    tabs.current[next]?.focus();
  }
  return (
    <section
      id="modulos"
      className="section-space bg-white"
      aria-labelledby="modules-title"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="eyebrow">{modulesSection.eyebrow}</p>
          <h2 id="modules-title" className="section-title">
            {modulesSection.headline}
          </h2>
          <p className="section-copy">{modulesSection.subtitle}</p>
        </div>
        <div
          role="tablist"
          aria-label="Áreas de operación"
          className="mt-8 flex gap-2 overflow-x-auto pb-3"
        >
          {coreModules.map((module, index) => (
            <button
              key={module.id}
              ref={(el) => {
                tabs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${module.id}`}
              aria-controls="module-panel"
              aria-selected={index === activeIndex}
              tabIndex={index === activeIndex ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => navigate(event, index)}
              className={`min-h-11 shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${index === activeIndex ? "border-foreground bg-foreground text-white" : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"}`}
            >
              {module.name}
            </button>
          ))}
        </div>
        <div
          role="tabpanel"
          id="module-panel"
          aria-labelledby={`tab-${active.id}`}
          tabIndex={0}
          className="mt-3 grid gap-8 rounded-3xl border border-slate-200 bg-dark-card p-6 md:min-h-[350px] md:grid-cols-2 md:items-center md:p-10"
        >
          <div>
            <Layers3 className="h-6 w-6 text-teal-700" aria-hidden="true" />
            <h3 className="font-display mt-5 text-2xl font-bold leading-tight md:text-3xl">
              {active.phrase}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              {active.description}
            </p>
            {active.capabilities.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-2">
                {active.capabilities.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg bg-white px-3 py-2 text-xs font-medium text-slate-600"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
            <a
              href="#demo"
              className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-teal-800"
            >
              Ver en una demo{" "}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
            <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-4">
              <p className="text-sm font-semibold">{active.name}</p>
              <span className="text-xs text-slate-500">
                Ejemplo ilustrativo
              </span>
            </div>
            <div className="space-y-3">
              {active.mockups.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-50 p-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600">
                      {item.detail}
                    </p>
                  </div>
                  <span
                    className="rounded-full px-2.5 py-1 text-xs font-semibold"
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
          </div>
        </div>
      </div>
    </section>
  );
}
