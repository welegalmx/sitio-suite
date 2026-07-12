"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, MinusCircle, XCircle, type LucideIcon } from "lucide-react";
import { comparison, type Coverage } from "@/lib/content";

const coverageIcon: Record<Coverage, LucideIcon> = {
  full: CheckCircle2,
  partial: MinusCircle,
  none: XCircle,
};

const coverageColor: Record<Coverage, string> = {
  full: "#2ECFB1",
  partial: "#fbbf24",
  none: "#f87171",
};

function CoverageIcon({ value }: { value: Coverage }) {
  const Icon = coverageIcon[value];
  return <Icon className="mx-auto h-5 w-5" style={{ color: coverageColor[value] }} />;
}

export default function Comparison() {
  const lastColumn = comparison.columns.length - 1;

  return (
    <section className="bg-dark-card py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-mint">
            {comparison.eyebrow}
          </p>
          <h2 className="font-display mt-4 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            {comparison.headline}
          </h2>
          <p className="mt-4 text-base text-foreground/50">{comparison.subtitle}</p>
        </div>

        <div className="mt-16 overflow-x-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative grid min-w-[720px] grid-cols-[1.6fr_repeat(4,minmax(0,1fr))] gap-y-1"
            style={{ gridTemplateRows: `repeat(${comparison.rows.length + 1}, auto)` }}
          >
            {/* fondo destacado para la columna we.legal suite */}
            <div
              aria-hidden
              className="rounded-2xl p-[1.5px]"
              style={{
                gridColumn: `${lastColumn + 2} / ${lastColumn + 3}`,
                gridRow: `1 / ${comparison.rows.length + 2}`,
                background: "var(--gradient-brand)",
              }}
            >
              <div className="h-full w-full rounded-2xl bg-dark-card" />
            </div>

            {/* header — la columna destacada se coloca fuera del flujo automático,
                porque el fondo que abarca todas las filas ya ocupa esa pista en
                cada fila y el auto-placement de Grid saltaría esa celda,
                desfasando en cascada el resto de las celdas auto-ubicadas. */}
            <div />
            {comparison.columns.slice(0, lastColumn).map((col) => (
              <div key={col} className="relative z-10 px-4 py-4 text-center text-sm font-semibold text-foreground/50">
                {col}
              </div>
            ))}
            <div
              className="relative z-10 px-4 py-4 text-center text-sm font-semibold"
              style={{ gridColumn: `${lastColumn + 2} / ${lastColumn + 3}`, gridRow: "1 / 2" }}
            >
              <span className="font-display text-gradient-brand">{comparison.columns[lastColumn]}</span>
            </div>

            {/* filas */}
            {comparison.rows.map((row, rowIndex) => {
              const rowLine = rowIndex + 2;
              return (
                <Fragment key={row.capability}>
                  <div className="flex items-center border-t border-foreground/15 px-4 py-4 text-sm text-foreground/70">
                    {row.capability}
                  </div>
                  {row.values.slice(0, lastColumn).map((value, i) => (
                    <div
                      key={i}
                      className="relative z-10 flex items-center justify-center border-t border-foreground/15 px-4 py-4"
                    >
                      <CoverageIcon value={value} />
                    </div>
                  ))}
                  <div
                    className="relative z-10 flex items-center justify-center border-t border-foreground/15 px-4 py-4"
                    style={{
                      gridColumn: `${lastColumn + 2} / ${lastColumn + 3}`,
                      gridRow: `${rowLine} / ${rowLine + 1}`,
                    }}
                  >
                    <CoverageIcon value={row.values[lastColumn]} />
                  </div>
                </Fragment>
              );
            })}
          </motion.div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs text-foreground/40">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" style={{ color: coverageColor.full }} />
            {comparison.legend.full.replace("✓ ", "")}
          </span>
          <span className="flex items-center gap-2">
            <MinusCircle className="h-4 w-4" style={{ color: coverageColor.partial }} />
            {comparison.legend.partial.replace("~ ", "")}
          </span>
          <span className="flex items-center gap-2">
            <XCircle className="h-4 w-4" style={{ color: coverageColor.none }} />
            {comparison.legend.none.replace("✗ ", "")}
          </span>
        </div>
      </div>
    </section>
  );
}
