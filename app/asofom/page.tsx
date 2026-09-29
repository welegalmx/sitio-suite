import type { Metadata } from "next";
import { BadgePercent, ShieldCheck, Sparkles } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AsofomForm from "@/components/AsofomForm";

export const metadata: Metadata = {
  title: "15% de descuento · 20° Convención Nacional ASOFOM | we.legal Suite",
  description:
    "Regístrate durante la 20° Convención Nacional ASOFOM y obtén 15% de descuento en we.legal Suite, la plataforma legal con IA para tu SOFOM.",
  // Landing de evento: no queremos que se indexe ni aparezca en búsquedas.
  robots: { index: false, follow: false },
  // Relativa: resuelve contra metadataBase (welegal.mx) definido en layout.
  alternates: { canonical: "/asofom" },
};

const beneficios = [
  {
    icon: Sparkles,
    title: "Abogado AI",
    copy: "Un asistente que conoce tus documentos, procesos y riesgos, disponible por WhatsApp.",
  },
  {
    icon: ShieldCheck,
    title: "Firma NOM-151",
    copy: "Firma electrónica avanzada con plena validez jurídica y evidencias por firmante.",
  },
  {
    icon: BadgePercent,
    title: "15% exclusivo ASOFOM",
    copy: "Beneficio especial para asistentes de la 20° Convención Nacional.",
  },
];

export default function AsofomPage() {
  return (
    <>
      <Nav />

      <main id="contenido" className="flex-1">
        {/* HERO + FORMULARIO */}
        <section className="relative overflow-hidden bg-dark-bg pt-[68px]">
          {/* Fondo degradado sutil de marca */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{ background: "var(--gradient-brand)" }}
          />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
            {/* Columna izquierda: mensaje del evento */}
            <div className="flex flex-col justify-center">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-sky/25 bg-brand-sky/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-sky">
                20° Convención Nacional ASOFOM
              </span>

              <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground md:text-5xl">
                Lleva la operación legal de tu SOFOM a{" "}
                <span className="text-gradient-brand">un solo lugar</span>
              </h1>

              <p className="mt-5 max-w-md text-base leading-relaxed text-foreground/65 md:text-lg">
                Regístrate aquí y obtén un{" "}
                <span className="font-bold text-foreground">15% de descuento</span>{" "}
                en we.legal Suite: contratos, documentos corporativos, firma
                electrónica y un Abogado AI que entiende tu empresa por dentro.
              </p>

              <ul className="mt-10 space-y-5">
                {beneficios.map((b) => (
                  <li key={b.title} className="flex items-start gap-4">
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-brand-mint/10 text-brand-teal">
                      <b.icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="font-semibold text-foreground">{b.title}</p>
                      <p className="text-sm leading-relaxed text-foreground/60">
                        {b.copy}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Columna derecha: tarjeta con el formulario */}
            <div className="flex flex-col justify-center">
              <div className="rounded-3xl border border-foreground/10 bg-dark-card p-6 shadow-xl shadow-brand-blue/5 sm:p-8">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Regístrate y activa tu 15%
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-foreground/60">
                  Déjanos tus datos. Nuestro equipo te contactará para aplicar
                  el descuento y darte una demo.
                </p>
                <div className="mt-6">
                  <AsofomForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
