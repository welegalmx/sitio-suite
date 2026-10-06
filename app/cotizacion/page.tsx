import type { Metadata } from "next";
import Logo from "@/components/Logo";
import CotizacionForm from "@/components/CotizacionForm";

export const metadata: Metadata = {
  title: "Solicitud de cotización | we.legal Suite",
  description:
    "Cuéntanos el volumen legal de tu empresa y te enviamos una propuesta de we.legal Suite.",
  // Página privada: solo se comparte por link con prospectos. No se indexa,
  // no está en el sitemap y nada del sitio enlaza a ella.
  robots: { index: false, follow: false },
  alternates: { canonical: "/cotizacion" },
};

export default function CotizacionPage() {
  return (
    // Sin menú ni footer: es una vista para el prospecto, no una página
    // del sitio. Solo el logo como firma de marca.
    <>
      <main id="contenido" className="flex-1">
        <section className="relative overflow-hidden">
          {/* Halo de marca muy tenue detrás del encabezado */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-[0.06] blur-3xl"
            style={{ background: "var(--gradient-brand)" }}
          />

          <div className="relative mx-auto max-w-2xl px-4 pb-24 pt-10 sm:px-6 sm:pt-14">
            <div className="mb-14 sm:mb-20">
              <Logo heightPx={26} priority />
            </div>

            <header className="mb-14">
              <p className="eyebrow">Solicitud de cotización</p>
              <h1 className="mt-4 font-display text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl">
                Una propuesta hecha a la{" "}
                <span className="text-gradient-brand">medida de tu operación</span>
              </h1>
              <p className="section-copy max-w-xl">
                Indícanos cuántos documentos manejas al mes en cada área. Con
                eso preparamos tu propuesta y te la enviamos por correo.
              </p>
            </header>

            <CotizacionForm />
          </div>
        </section>
      </main>
    </>
  );
}
