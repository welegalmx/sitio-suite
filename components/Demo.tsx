"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { ArrowUpRight, Calendar, Check } from "lucide-react";
import { demo } from "@/lib/content";

function CalendlyEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const [loadCalendar, setLoadCalendar] = useState(false);
  const [calendarReady, setCalendarReady] = useState(false);
  useEffect(() => {
    const receive = (event: MessageEvent) => {
      const frame = widgetRef.current?.querySelector("iframe");
      if (
        event.origin !== "https://calendly.com" ||
        !frame ||
        event.source !== frame.contentWindow
      )
        return;
      if (
        [
          "calendly.event_type_viewed",
          "calendly.date_and_time_selected",
        ].includes(event.data?.event)
      )
        setCalendarReady(true);
    };
    window.addEventListener("message", receive);
    return () => window.removeEventListener("message", receive);
  }, []);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadCalendar(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);
  const url = `${demo.calendly.url}?hide_gdpr_banner=1&primary_color=${demo.calendly.primaryColor}&background_color=ffffff&text_color=0a0f1e`;
  // onReady also runs when Next.js reuses the script after client navigation.
  const initializeCalendar = () => {
    const parentElement = widgetRef.current;
    if (!parentElement || parentElement.querySelector("iframe")) return;
    const calendly = (
      window as Window & {
        Calendly?: {
          initInlineWidget: (options: {
            url: string;
            parentElement: HTMLElement;
          }) => void;
        };
      }
    ).Calendly;
    calendly?.initInlineWidget({ url, parentElement });
  };
  return (
    <div ref={containerRef}>
      <div className="relative h-[650px] overflow-hidden rounded-xl border border-slate-200 bg-white">
        {loadCalendar ? (
          <>
            {!calendarReady && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-slate-50 px-6 text-center">
                <Calendar
                  className="h-8 w-8 text-brand-mint"
                  aria-hidden="true"
                />
                <p className="font-display text-xl font-bold">
                  Elige el horario que mejor te funcione.
                </p>
                <p className="max-w-xs text-sm leading-relaxed text-slate-600">
                  Puedes abrir la agenda directamente mientras se carga el
                  calendario.
                </p>
                <a
                  href={demo.calendly.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-primary"
                >
                  Elegir fecha y hora
                </a>
              </div>
            )}
            <div
              ref={widgetRef}
              className="calendly-inline-widget h-full w-full"
              data-auto-load="false"
            />
            <Script
              src="https://assets.calendly.com/assets/external/widget.js"
              strategy="afterInteractive"
              onReady={initializeCalendar}
            />
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <button
              type="button"
              className="button-primary"
              onClick={() => setLoadCalendar(true)}
            >
              Ver horarios disponibles
            </button>
          </div>
        )}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-slate-600">
        ¿No aparece el calendario?{" "}
        <a
          href={demo.calendly.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-brand-mint underline underline-offset-4"
        >
          Abrir en otra pestaña
        </a>{" "}
        o escribe a{" "}
        <a
          href={`mailto:${demo.calendly.fallbackEmail}`}
          className="font-semibold text-brand-mint underline underline-offset-4"
        >
          {demo.calendly.fallbackEmail}
        </a>
        .
      </p>
    </div>
  );
}

export default function Demo() {
  return (
    <section
      id="demo"
      className="section-space bg-white"
      aria-labelledby="demo-title"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[.85fr_1.15fr] lg:gap-14">
        <div>
          <p className="eyebrow">{demo.eyebrow}</p>
          <h2 id="demo-title" className="section-title">
            {demo.headline}
          </h2>
          <p className="section-copy">{demo.subtitle}</p>
          <ul className="mt-8 space-y-5">
            {demo.highlights.map((item) => (
              <li key={item.icon} className="flex items-start gap-3">
                <Check
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand-mint"
                  aria-hidden="true"
                />
                <span className="text-sm leading-relaxed text-slate-600">
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
          <a
            href={demo.calendly.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-mint"
          >
            Agendar directamente en Calendly{" "}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
        <div className="min-w-0">
          <div className="mb-5 flex items-center gap-3">
            <Calendar className="h-5 w-5 text-brand-mint" aria-hidden="true" />
            <p className="text-sm font-semibold">
              Demo personalizada · we.legal Suite
            </p>
          </div>
          <CalendlyEmbed />
        </div>
      </div>
    </section>
  );
}
