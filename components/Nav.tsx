"use client";

import { useEffect, useState } from "react";
import { nav } from "@/lib/content";
import Logo from "./Logo";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // El nav solo muestra los dos links de texto; "Por qué we.legal" queda
  // para cuando exista esa sección, y el CTA se renderiza aparte.
  const textLinks = nav.links.slice(0, 2);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 h-[68px] transition-colors duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(10, 15, 30, 0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        <a href="/" className="flex items-center">
          <Logo heightPx={32} priority />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {textLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={nav.cta.href}
          className="rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: "var(--gradient-brand)" }}
        >
          {nav.cta.label}
        </a>
      </div>
    </header>
  );
}
