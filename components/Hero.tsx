"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { hero } from "@/lib/content";
import { renderHighlighted } from "@/lib/highlight-text";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [playing, setPlaying] = useState(false);
  const [videoAvailable, setVideoAvailable] = useState(false);
  const userPaused = useRef(false);
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;
    const media = window.matchMedia(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
    );
    let visible = false;
    const sync = () => {
      if (media.matches && visible && !document.hidden && !userPaused.current) {
        if (!video.getAttribute("src")) video.src = "/hero/hero-bg.mp4";
        video.play().catch(() => {});
      } else video.pause();
      if (!media.matches && video.hasAttribute("src")) {
        video.removeAttribute("src");
        video.load();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(section);
    media.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      video.pause();
    };
  }, []);
  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#101c2b] pt-[72px]"
    >
      <Image
        src="/hero/hero-poster.jpg"
        alt=""
        fill
        preload
        sizes="100vw"
        className="object-cover"
      />
      <video
        ref={videoRef}
        muted
        playsInline
        loop
        preload="none"
        aria-hidden="true"
        onCanPlay={() => setVideoAvailable(true)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="absolute inset-0 hidden h-full w-full object-cover md:block motion-reduce:hidden"
      />
      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(6,11,24,0.94),rgba(6,11,24,0.76)_55%,rgba(6,11,24,0.38))]" />
      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
          Operación legal · Inteligencia artificial
        </p>
        <h1 className="font-display mt-6 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight text-white md:text-6xl">
          {hero.headlineLines.map((line, index) => (
            <span key={index} className="block">
              {renderHighlighted(line, hero.headlineHighlight)}
            </span>
          ))}
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-200 md:text-lg">
          {hero.subtitle}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a href={hero.ctaPrimary.href} className="button-primary">
            {hero.ctaPrimary.label}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={hero.ctaSecondary.href}
            className="inline-flex min-h-12 items-center rounded-full border border-white/40 px-6 text-sm font-semibold text-white hover:bg-white/10"
          >
            {hero.ctaSecondary.label}
          </a>
        </div>
        <p className="mt-7 text-sm text-slate-300">
          Para empresas y despachos. Hecho en México.
        </p>
      </div>
      {videoAvailable && (
        <button
          type="button"
          onClick={() => {
            const video = videoRef.current;
            if (!video) return;
            userPaused.current = !userPaused.current;
            if (userPaused.current) video.pause();
            else video.play().catch(() => {});
          }}
          aria-label={
            playing ? "Pausar video de fondo" : "Reproducir video de fondo"
          }
          className="absolute right-6 bottom-6 hidden h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-black/30 text-white md:flex motion-reduce:hidden"
        >
          {playing ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </button>
      )}
    </section>
  );
}
