"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  FileText,
  BarChart3,
  Sparkles,
  MessageCircle,
  Layers,
  Loader2,
  Send,
} from "lucide-react";
import { premiumSection, premiumModules } from "@/lib/content";

const byId = Object.fromEntries(premiumModules.map((m) => [m.id, m]));
const abogado = byId["abogado-ai"];
const formatos = byId["formatos"];
const reportes = byId["reportes"];

// Ficha de una variable dinámica dentro del mock de plantilla.
function Token({ children }: { children: string }) {
  return (
    <span className="rounded bg-brand-mint/15 px-1.5 py-0.5 font-medium text-brand-mint">
      {children}
    </span>
  );
}

// Barras del mini-gráfico del tile de Reportes.
const REPORT_BARS = [42, 68, 52, 88, 60, 74];

// Puntos "escribiendo…" mientras el Abogado AI genera la respuesta.
function TypingDots() {
  return (
    <span className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-foreground/40"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </span>
  );
}

type AnswerRow = { label: string; value: string; tag?: "warn" | "ok" };

// Las dos respuestas estructuradas que devuelve el Abogado AI en el demo.
const ANSWER_1: { title: string; rows: AnswerRow[] } = {
  title: "Resumen del contrato",
  rows: [
    { label: "Vigencia", value: "15 sep 2024 – 14 sep 2027" },
    { label: "Renovación", value: "Automática · 12 meses" },
    { label: "Terminación anticipada", value: "Pena de 3 rentas mensuales" },
    { label: "Score de riesgo", value: "62 / 100 · Medio", tag: "warn" },
  ],
};

const ANSWER_2: { title: string; rows: AnswerRow[] } = {
  title: "Cláusulas a negociar",
  rows: [
    { label: "Incremento de renta", value: "INPC + 3% anual", tag: "warn" },
    { label: "Depósito en garantía", value: "2 meses · estándar", tag: "ok" },
    { label: "Exclusividad de giro", value: "Sí · revisar", tag: "warn" },
  ],
};

// Burbuja de pregunta del usuario dentro del chat del demo.
function QuestionBubble({ children }: { children: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex justify-end"
    >
      <span className="max-w-[88%] rounded-2xl rounded-br-sm bg-foreground/[0.06] px-3 py-2 text-xs leading-snug text-foreground/80">
        {children}
      </span>
    </motion.div>
  );
}

// Tarjeta de respuesta estructurada del Abogado AI.
function AnswerCard({
  title,
  rows,
}: {
  title: string;
  rows: AnswerRow[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl border border-brand-mint/25 bg-brand-mint/[0.05] p-3"
    >
      <div className="mb-2.5 flex items-center gap-2">
        <Sparkles className="h-3.5 w-3.5 text-brand-mint" />
        <span className="text-xs font-semibold text-foreground">{title}</span>
      </div>
      <dl className="space-y-1.5">
        {rows.map((row, i) => (
          <motion.div
            key={row.label}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.15 + i * 0.15 }}
            className="flex items-start justify-between gap-3 text-xs"
          >
            <dt className="shrink-0 text-foreground/45">{row.label}</dt>
            {row.tag ? (
              <dd
                className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                  row.tag === "warn"
                    ? "bg-amber-400/15 text-amber-500"
                    : "bg-brand-mint/15 text-brand-mint"
                }`}
              >
                {row.value}
              </dd>
            ) : (
              <dd className="text-right font-medium text-foreground/80">{row.value}</dd>
            )}
          </motion.div>
        ))}
      </dl>
    </motion.div>
  );
}

// Indicador de escritura del asistente.
function TypingRow() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center gap-2 px-1 py-1"
    >
      <Sparkles className="h-3.5 w-3.5 text-brand-mint" />
      <TypingDots />
    </motion.div>
  );
}

// Mini-demo animado (bucle): sube un contrato y le hace dos preguntas
// seguidas; el Abogado AI responde cada una con un resumen estructurado.
// Fases: 0 analizando · 1 pregunta 1 · 2 escribiendo · 3 respuesta 1 ·
//        4 pregunta 2 · 5 escribiendo · 6 respuesta 2.
function AbogadoDemo() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const durations = [1600, 1300, 1300, 3200, 1300, 1300, 4400];
    const t = window.setTimeout(() => setPhase((p) => (p + 1) % 7), durations[phase]);
    return () => window.clearTimeout(t);
  }, [phase]);

  return (
    <div className="mt-6 flex flex-1 flex-col overflow-hidden rounded-2xl border border-foreground/12 bg-foreground/[0.03] p-4">
      {/* El chat se ancla al fondo (junto al input), como una UI real: los
          mensajes suben desde abajo y el espacio libre queda arriba. */}
      <div className="flex flex-1 flex-col justify-end gap-2.5 overflow-hidden">
        {/* Contrato subido */}
        <div className="flex shrink-0 items-center gap-3 rounded-xl border border-foreground/12 bg-foreground/[0.04] px-3 py-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-mint/12 text-brand-mint">
            <FileText className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-foreground">
              Arrendamiento_Polanco.pdf
            </p>
            <p className="text-[11px] text-foreground/40">
              {phase === 0 ? "Analizando contrato…" : "Analizado · 14 págs"}
            </p>
          </div>
          {phase === 0 ? (
            <Loader2 className="h-4 w-4 shrink-0 animate-spin text-brand-mint" />
          ) : (
            <Check className="h-4 w-4 shrink-0 text-brand-mint" />
          )}
        </div>

        <AnimatePresence initial={false}>
          {phase >= 1 && (
            <QuestionBubble key="q1">
              ¿Cuándo vence y qué pena aplica por terminación anticipada?
            </QuestionBubble>
          )}
          {phase === 2 && <TypingRow key="t1" />}
          {phase >= 3 && <AnswerCard key="a1" title={ANSWER_1.title} rows={ANSWER_1.rows} />}

          {phase >= 4 && (
            <QuestionBubble key="q2">
              ¿Qué cláusulas debería negociar antes de firmar?
            </QuestionBubble>
          )}
          {phase === 5 && <TypingRow key="t2" />}
          {phase >= 6 && <AnswerCard key="a2" title={ANSWER_2.title} rows={ANSWER_2.rows} />}
        </AnimatePresence>
      </div>

      {/* Barra de entrada decorativa: cierra la interfaz como un chat real. */}
      <div className="flex items-center gap-2 pt-3">
        <div className="flex-1 rounded-full border border-foreground/12 bg-foreground/[0.04] px-4 py-2 text-xs text-foreground/35">
          Pregunta sobre cualquier documento…
        </div>
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white"
          style={{ background: "var(--gradient-brand)" }}
        >
          <Send className="h-3.5 w-3.5" />
        </div>
      </div>
    </div>
  );
}

export default function PremiumSection() {
  return (
    <section id="premium" className="bg-dark-card py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-mint">
            {premiumSection.eyebrow}
          </p>
          <h2 className="font-display mt-4 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            {premiumSection.headline}
          </h2>
          <p className="mt-4 text-base text-foreground/50">{premiumSection.subtitle}</p>
        </motion.div>

        {/* Bento: Abogado AI como tile destacado (izquierda, 2×2) + Formatos y
            Reportes apilados a la derecha. */}
        <div className="mt-16 grid gap-5 lg:grid-cols-3 lg:grid-rows-2">
          {/* --- Tile destacado: Abogado AI --- */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="rounded-3xl p-px lg:col-span-2 lg:row-span-2"
            style={{ background: "var(--gradient-brand)" }}
          >
            <div className="flex h-full flex-col rounded-[calc(1.5rem-1px)] bg-dark-bg p-8 md:p-10">
              <div className="flex items-center gap-4">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white"
                  style={{ background: "var(--gradient-brand)" }}
                >
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-mint">
                    {abogado.name}
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    <span className="inline-flex items-center gap-1 rounded-full border border-foreground/12 bg-foreground/[0.04] px-2.5 py-0.5 text-[11px] text-foreground/60">
                      <MessageCircle className="h-3 w-3" /> Web y WhatsApp
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-foreground/12 bg-foreground/[0.04] px-2.5 py-0.5 text-[11px] text-foreground/60">
                      <Layers className="h-3 w-3" /> DocRoom
                    </span>
                  </div>
                </div>
              </div>

              <h3 className="font-display mt-6 text-2xl font-bold leading-snug text-foreground md:text-3xl">
                {abogado.phrase}
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground/55">
                Sube cualquier contrato o documento y pregúntale en lenguaje natural. El
                Abogado AI lo lee, lo entiende en el contexto de tu operación y te devuelve
                la respuesta estructurada en segundos.
              </p>

              <AbogadoDemo />

              {abogado.note && (
                <p className="mt-4 text-xs italic text-foreground/35">{abogado.note}</p>
              )}
            </div>
          </motion.div>

          {/* --- Tile: Formatos --- */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="flex flex-col rounded-3xl border border-foreground/12 bg-dark-bg/60 p-8"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-mint/12 text-brand-mint">
              <FileText className="h-5 w-5" />
            </div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-brand-mint">
              {formatos.name}
            </p>
            <h3 className="font-display mt-2 text-lg font-bold leading-snug text-foreground">
              Del formato en blanco al documento listo, en un clic.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground/55">
              Plantillas .docx con variables que se llenan solas con los datos reales de tu
              empresa, empleados y contratos.
            </p>

            <div className="mt-auto rounded-xl border border-foreground/10 bg-foreground/[0.03] p-4 text-xs leading-relaxed text-foreground/50">
              Contrato individual de trabajo de <Token>{"{{nombre}}"}</Token>, con puesto de{" "}
              <Token>{"{{puesto}}"}</Token> en <Token>{"{{empresa}}"}</Token>, con fecha de
              ingreso <Token>{"{{fecha_ingreso}}"}</Token>.
            </div>
          </motion.div>

          {/* --- Tile: Reportes --- */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col rounded-3xl border border-foreground/12 bg-dark-bg/60 p-8"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-mint/12 text-brand-mint">
              <BarChart3 className="h-5 w-5" />
            </div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-brand-mint">
              {reportes.name}
            </p>
            <h3 className="font-display mt-2 text-lg font-bold leading-snug text-foreground">
              {reportes.phrase}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground/55">
              Visión ejecutiva del estado completo de tu operación legal, generada con IA —
              sin revisar expediente por expediente.
            </p>

            <div className="mt-auto rounded-xl border border-foreground/10 bg-foreground/[0.03] p-4">
              <div className="flex h-20 items-end justify-between gap-2">
                {REPORT_BARS.map((h, i) => (
                  <div
                    key={i}
                    className="w-full rounded-t-sm"
                    style={{ height: `${h}%`, background: "var(--gradient-brand)" }}
                  />
                ))}
              </div>
              <div className="mt-2.5 flex justify-between text-[10px] uppercase tracking-wide text-foreground/30">
                <span>Contratos</span>
                <span>Equipo</span>
                <span>Litigios</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
