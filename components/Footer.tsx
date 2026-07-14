import { footer } from "@/lib/content";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0A0F1E]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col items-center text-center">
          <a href="/" className="flex items-center">
            <Logo heightPx={28} dark />
          </a>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/45">
            {footer.tagline}
          </p>
        </div>

        <div className="mt-12 flex flex-col items-center gap-2.5 border-t border-white/10 pt-8 text-center">
          <p className="text-xs text-white/35">{footer.credit}</p>
          <a
            href={footer.registro.href}
            className="text-xs text-white/30 underline underline-offset-4 transition-colors hover:text-brand-mint"
          >
            {footer.registro.label}
          </a>
        </div>
      </div>
    </footer>
  );
}
