"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { nav } from "@/lib/content";
import Logo from "./Logo";

function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

const getScrolled = () => window.scrollY > 24;
const getServerScrolled = () => false;

export default function Nav({ overlayHero = false }: { overlayHero?: boolean }) {
  const scrolled = useSyncExternalStore(subscribeToScroll, getScrolled, getServerScrolled);
  const transparent = overlayHero && !scrolled;
  return (
    <header className={`fixed inset-x-0 top-0 z-50 h-[72px] border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-200 ${
      transparent
        ? "border-transparent bg-transparent"
        : "border-slate-200/70 bg-white/95 shadow-sm backdrop-blur-md"
    }`}>
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href="/"
          aria-label="we.legal Suite — inicio"
          className="nav-logo shrink-0"
        >
          <Logo heightPx={22} priority dark={transparent} />
        </Link>
        <nav
          aria-label="Navegación principal"
          className="flex items-center gap-2 sm:gap-6"
        >
          <Link
            href="/#modulos"
            className={`hidden min-h-11 items-center text-sm font-medium md:inline-flex ${transparent ? "text-white/85 hover:text-white" : "text-slate-600 hover:text-foreground"}`}
          >
            Plataforma
          </Link>
          <a
            href={nav.suiteCta.href}
            className={`inline-flex min-h-11 items-center text-sm font-semibold ${transparent ? "text-white hover:text-brand-mint" : "text-slate-700 hover:text-brand-mint"}`}
          >
            Ingresar
          </a>
          <Link
            href="/#demo"
            className="button-primary nav-demo"
            aria-label="Agendar demo"
          >
            <span className="hidden min-[360px]:inline">Agendar</span> demo
          </Link>
        </nav>
      </div>
    </header>
  );
}
