"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { hero } from "@/lib/content";
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
        ctx.arc(a.x, a.y, 2.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${PARTICLE_RGB}, 1)`;
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
            ctx.strokeStyle = `rgba(${PARTICLE_RGB}, ${0.5 * (1 - dist / CONNECT_DISTANCE)})`;
            ctx.lineWidth = 1.4;
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

// Clips del hero, en orden de reproducción. Corren uno tras otro en bucle.
// Para agregar más, sube los .mp4 (H.264, formato cuadrado ~1:1) a public/hero/
// y añádelos a esta lista en el orden deseado.
const HERO_VIDEOS = ["/hero/hero-1.mp4", "/hero/hero-2.mp4", "/hero/hero-3.mp4"];

function HeroVideos() {
  const [index, setIndex] = useState(0);
  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  const single = HERO_VIDEOS.length === 1;

  // Crossfade: los clips se apilan y solo el activo está a opacity-100. Al
  // terminar uno, se arranca el siguiente desde 0 y ambos se funden (fade) por
  // la transición de opacidad, evitando el corte seco y el parpadeo de carga.
  const handleEnded = (endedIndex: number) => {
    if (single || endedIndex !== index) return;
    const next = (index + 1) % HERO_VIDEOS.length;
    const nextVideo = refs.current[next];
    if (nextVideo) {
      nextVideo.currentTime = 0;
      nextVideo.play().catch(() => {});
    }
    setIndex(next);
  };

  return (
    <div className="relative aspect-square">
      {HERO_VIDEOS.map((src, i) => (
        <video
          key={src}
          ref={(el) => {
            refs.current[i] = el;
          }}
          src={src}
          autoPlay={i === 0}
          muted
          playsInline
          loop={single}
          preload="auto"
          onEnded={() => handleEnded(i)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-dark-bg pt-[68px]">
      <div className="pointer-events-none absolute inset-0">
        <ParticleField />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 py-24 md:grid-cols-2 md:items-center md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground md:text-6xl">
            {hero.headlineLines.map((line, i) => (
              <span key={i} className="block">
                {renderHighlighted(line, hero.headlineHighlight)}
              </span>
            ))}
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-foreground/50 md:text-lg">
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
              className="rounded-full border border-foreground/25 px-7 py-3.5 text-sm font-semibold text-foreground/80 transition-colors hover:border-foreground/45 hover:text-foreground"
            >
              {hero.ctaSecondary.label}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="mx-auto w-full max-w-[580px] overflow-hidden rounded-2xl border border-foreground/20 shadow-2xl shadow-black/15"
        >
          <HeroVideos />
        </motion.div>
      </div>
    </section>
  );
}
