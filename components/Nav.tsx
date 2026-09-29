import Link from "next/link";
import { nav } from "@/lib/content";
import Logo from "./Logo";

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[72px] border-b border-slate-200/70 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href="/"
          aria-label="we.legal Suite — inicio"
          className="nav-logo shrink-0"
        >
          <Logo heightPx={22} priority />
        </Link>
        <nav
          aria-label="Navegación principal"
          className="flex items-center gap-2 sm:gap-6"
        >
          <Link
            href="/#modulos"
            className="hidden min-h-11 items-center text-sm font-medium text-slate-600 hover:text-foreground md:inline-flex"
          >
            Plataforma
          </Link>
          <a
            href={nav.suiteCta.href}
            className="inline-flex min-h-11 items-center text-sm font-semibold text-slate-700 hover:text-teal-800"
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
