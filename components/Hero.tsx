"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { hero, coreModules } from "@/lib/content";
import { badgeBg, badgeText } from "@/lib/badge-colors";
import { renderHighlighted } from "@/lib/highlight-text";

const PARTICLE_COUNT = 60;
const CONNECT_DISTANCE = 120;
const PARTICLE_RGB = "46, 207, 177"; // #2ECFB1

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let animationId: number;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createParticles = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      }));
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];

        ctx.beginPath();
        ctx.arc(a.x, a.y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${PARTICLE_RGB}, 0.8)`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DISTANCE) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${PARTICLE_RGB}, ${0.25 * (1 - dist / CONNECT_DISTANCE)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animate();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
}

export default function Hero() {
  const contratos = coreModules.find((m) => m.id === "contratos")!;

  return (
    <section className="relative overflow-hidden bg-dark-bg pt-[68px]">
      <div className="pointer-events-none absolute inset-0">
        <ParticleField />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-16 px-6 py-24 md:grid-cols-2 md:items-center md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-white md:text-6xl">
            {hero.headlineLines.map((line, i) => (
              <span key={i} className="block">
                {renderHighlighted(line, hero.headlineHighlight)}
              </span>
            ))}
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-white/45 md:text-lg">
            {hero.subtitle}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={hero.ctaPrimary.href}
              className="rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: "var(--gradient-brand)" }}
            >
              {hero.ctaPrimary.label}
            </a>
            <a
              href={hero.ctaSecondary.href}
              className="rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white/80 transition-colors hover:border-white/30 hover:text-white"
            >
              {hero.ctaSecondary.label}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="relative rounded-2xl border border-white/10 bg-dark-card/80 p-6 shadow-2xl shadow-black/40 backdrop-blur"
        >
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm font-semibold text-white/70">Contratos</p>
            <span className="text-xs text-white/40">Panel en vivo</span>
          </div>

          <div className="space-y-3">
            {contratos.mockups.map((item) => (
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
        </motion.div>
      </div>
    </section>
  );
}
