"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { MODULOS, VOLUMENES } from "@/lib/cotizacion";

type Estado = "idle" | "enviando" | "ok" | "error";

const inputBase =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-foreground " +
  "placeholder:text-slate-400 transition-colors outline-none focus:border-brand-mint " +
  "focus:ring-4 focus:ring-brand-mint/15";

const labelBase = "mb-2 block text-sm font-medium text-slate-700";

function Seccion({
  numero,
  titulo,
  copy,
  children,
}: {
  numero: string;
  titulo: string;
  copy?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="border-t border-slate-200 pt-10 first:border-t-0 first:pt-0">
      <legend className="contents">
        <span className="font-display text-sm font-semibold tabular-nums text-brand-mint">
          {numero}
        </span>
        <span className="mt-2 block font-display text-xl font-bold tracking-tight text-foreground">
          {titulo}
        </span>
      </legend>
      {copy && (
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-500">{copy}</p>
      )}
      <div className="mt-7">{children}</div>
    </fieldset>
  );
}

export default function CotizacionForm() {
  const [estado, setEstado] = useState<Estado>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (estado === "enviando") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(
      [...data.entries()].map(([k, v]) => [k, String(v)]),
    );

    setEstado("enviando");
    setErrorMsg("");

    try {
      const res = await fetch("/api/cotizacion", {
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
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setEstado("error");
      setErrorMsg(err instanceof Error ? err.message : "Ocurrió un error.");
    }
  }

  if (estado === "ok") {
    return (
      <div className="flex flex-col items-center py-16 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-mint/10 text-brand-mint">
          <Check className="h-7 w-7" strokeWidth={2} />
        </span>
        <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-foreground">
          Solicitud recibida
        </h2>
        <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-slate-500">
          Gracias. Preparamos tu propuesta con base en estos volúmenes y te la
          enviaremos por correo.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Honeypot: oculto para humanos, invisible a lectores de pantalla. */}
      <div aria-hidden className="hidden">
        <label>
          No llenar
          <input type="text" name="sitio_web" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <Seccion numero="01" titulo="Datos de contacto">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="nombre" className={labelBase}>
              Nombre completo
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              required
              autoComplete="name"
              className={inputBase}
            />
          </div>
          <div>
            <label htmlFor="correo" className={labelBase}>
              Correo electrónico
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
          <div>
            <label htmlFor="whatsapp" className={labelBase}>
              WhatsApp
            </label>
            <input
              id="whatsapp"
              name="whatsapp"
              type="tel"
              required
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="10 dígitos"
              pattern="\D*(\d\D*){10}"
              title="10 dígitos, sin lada internacional"
              className={inputBase}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="empresa" className={labelBase}>
              Empresa
            </label>
            <input
              id="empresa"
              name="empresa"
              type="text"
              required
              autoComplete="organization"
              className={inputBase}
            />
          </div>
        </div>
      </Seccion>

      <Seccion
        numero="02"
        titulo="Volumen mensual"
        copy="Escribe la cantidad aproximada por mes de cada área, considerando la suma de todas tus empresas. Deja en blanco lo que no aplique."
      >
        <ul className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white">
          {VOLUMENES.map((v) => (
            <li key={v.name} className="flex items-center justify-between gap-4 px-5 py-4">
              <label htmlFor={v.name} className="min-w-0 flex-1 cursor-pointer">
                <span className="block text-[15px] font-medium text-foreground">
                  {v.label}
                </span>
                {v.hint && (
                  <span className="mt-0.5 block text-[13px] text-slate-500">{v.hint}</span>
                )}
              </label>
              <input
                id={v.name}
                name={v.name}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                title="Solo números enteros"
                maxLength={7}
                placeholder="0"
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
                }}
                className="w-24 shrink-0 rounded-lg border border-slate-200 bg-slate-50/60 px-3 py-2 text-right text-[15px] tabular-nums text-foreground outline-none transition-colors placeholder:text-slate-300 focus:border-brand-mint focus:bg-white focus:ring-4 focus:ring-brand-mint/15"
              />
            </li>
          ))}
        </ul>
      </Seccion>

      <Seccion
        numero="03"
        titulo="Módulos adicionales"
        copy="Indica cuáles quieres que incluyamos en la propuesta."
      >
        <div className="space-y-3">
          {MODULOS.map((m) => (
            <div
              key={m.name}
              role="radiogroup"
              aria-labelledby={`${m.name}-label`}
              className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4"
            >
              <div id={`${m.name}-label`} className="min-w-0">
                <span className="block font-display text-[15px] font-bold text-foreground">
                  {m.label}
                </span>
                <span className="mt-0.5 block text-[13px] text-slate-500">{m.descripcion}</span>
              </div>
              <div className="flex shrink-0 rounded-full bg-slate-100 p-1">
                {(["si", "no"] as const).map((op) => (
                  <label key={op} className="relative">
                    <input
                      type="radio"
                      name={m.name}
                      value={op}
                      required
                      className="peer absolute inset-0 cursor-pointer opacity-0"
                    />
                    <span className="block min-w-14 rounded-full px-4 py-1.5 text-center text-sm font-medium text-slate-500 transition-colors peer-checked:bg-foreground peer-checked:text-white peer-checked:shadow-sm peer-focus-visible:ring-2 peer-focus-visible:ring-brand-mint">
                      {op === "si" ? "Sí" : "No"}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Seccion>

      <div className="border-t border-slate-200 pt-10">
        {estado === "error" && (
          <p role="alert" className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {errorMsg}
          </p>
        )}

        <div className="flex flex-col-reverse items-center gap-5 sm:flex-row sm:justify-between">
          <p className="text-center text-xs leading-relaxed text-slate-400 sm:text-left">
            Usamos estos datos solo para preparar tu propuesta.
            <br className="hidden sm:block" /> No se comparten con terceros.
          </p>
          <button
            type="submit"
            disabled={estado === "enviando"}
            className="button-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {estado === "enviando" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Enviando…
              </>
            ) : (
              <>
                Solicitar cotización
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
