import { footer } from "@/lib/content";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#040812]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <a href="/" className="flex items-center">
              <Logo heightPx={28} />
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/45">
              {footer.tagline}
            </p>
          </div>

          {footer.columns.map((column) => (
            <div key={column.title}>
              <p className="text-sm font-semibold text-white">{column.title}</p>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/50 transition-colors hover:text-brand-mint"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-center text-xs text-white/35">
          {footer.credit}
        </div>
      </div>
    </footer>
  );
}
