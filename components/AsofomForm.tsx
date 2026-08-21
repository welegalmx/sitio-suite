"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

type Estado = "idle" | "enviando" | "ok" | "error";

const inputBase =
  "w-full rounded-xl border border-foreground/15 bg-white px-4 py-3 text-[15px] text-foreground " +
  "placeholder:text-foreground/35 transition-colors outline-none focus:border-brand-sky " +
  "focus:ring-2 focus:ring-brand-sky/25";

const labelBase = "mb-1.5 block text-sm font-medium text-foreground/80";

export default function AsofomForm() {
  const [estado, setEstado] = useState<Estado>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (estado === "enviando") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      nombre: String(data.get("nombre") || ""),
      empresa: String(data.get("empresa") || ""),
      whatsapp: String(data.get("whatsapp") || ""),
      correo: String(data.get("correo") || ""),
      necesidad: String(data.get("necesidad") || ""),
      sitio_web: String(data.get("sitio_web") || ""), // honeypot
    };

    setEstado("enviando");
    setErrorMsg("");

    try {
      const res = await fetch("/api/asofom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(json?.error || "Ocurrió un error. Intenta de nuevo.");
      }
      setEstado("ok");
      form.reset();
    } catch (err) {
      setEstado("error");
      setErrorMsg(err instanceof Error ? err.message : "Ocurrió un error.");
    }
  }

  if (estado === "ok") {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-brand-mint/30 bg-brand-mint/5 px-6 py-12 text-center">
        <CheckCircle2 className="h-12 w-12 text-brand-mint" strokeWidth={1.5} />
        <h3 className="mt-4 font-display text-2xl font-bold text-foreground">
          ¡Registro recibido!
        </h3>
        <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-foreground/65">
          Gracias por tu interés. Nuestro equipo te contactará muy pronto para
          activar tu <span className="font-semibold text-foreground">15% de descuento</span> y
          resolver tus dudas sobre we.legal Suite.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot: oculto para humanos, invisible a lectores de pantalla. */}
      <div aria-hidden className="hidden">
        <label>
          No llenar
          <input
            type="text"
            name="sitio_web"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <div>
        <label htmlFor="nombre" className={labelBase}>
          Nombre completo <span className="text-brand-blue">*</span>
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          required
          autoComplete="name"
          placeholder="Tu nombre"
          className={inputBase}
        />
      </div>

      <div>
        <label htmlFor="empresa" className={labelBase}>
          Empresa / SOFOM <span className="text-brand-blue">*</span>
        </label>
        <input
          id="empresa"
          name="empresa"
          type="text"
          required
          autoComplete="organization"
          placeholder="Nombre de tu empresa o SOFOM"
          className={inputBase}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="whatsapp" className={labelBase}>
            WhatsApp / teléfono <span className="text-brand-blue">*</span>
          </label>
          <input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            required
            autoComplete="tel"
            placeholder="55 1234 5678"
            className={inputBase}
          />
        </div>
        <div>
          <label htmlFor="correo" className={labelBase}>
            Correo electrónico <span className="text-brand-blue">*</span>
          </label>
          <input
            id="correo"
            name="correo"
            type="email"
            required
            autoComplete="email"
            placeholder="tu@empresa.com"
            className={inputBase}
          />
        </div>
      </div>

      <div>
        <label htmlFor="necesidad" className={labelBase}>
          ¿Qué te gustaría resolver con we.legal Suite de tus procesos legales?
        </label>
        <textarea
          id="necesidad"
          name="necesidad"
          rows={4}
          placeholder="Cuéntanos brevemente tu principal reto legal u operativo…"
          className={`${inputBase} resize-none`}
        />
      </div>

      {estado === "error" && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={estado === "enviando"}
        className="flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        style={{ background: "var(--gradient-brand)" }}
      >
        {estado === "enviando" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Enviando…
          </>
        ) : (
          "Registrarme y obtener mi 15% →"
        )}
      </button>

      <p className="text-center text-xs leading-relaxed text-foreground/45">
        Al registrarte aceptas que we.legal te contacte para activar tu descuento.
        Tus datos no se comparten con terceros.
      </p>
    </form>
  );
}
