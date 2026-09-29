import {
  ArrowRight,
  GitBranch,
  ShieldCheck,
  Table2,
  Sparkles,
  FileText,
  BarChart3,
} from "lucide-react";
import { capabilities, includedTools } from "@/lib/marketing";

const icons = [GitBranch, ShieldCheck, Table2];
const toolIcons = [Sparkles, FileText, BarChart3];

export default function PremiumSection() {
  return (
    <section
      id="capacidades"
      className="section-space border-y border-slate-200/70 bg-dark-card"
      aria-labelledby="capabilities-title"
    >
      <div className="mx-auto max-w-6xl px-6">
        <p className="eyebrow">{capabilities.eyebrow}</p>
        <h2 id="capabilities-title" className="section-title">
          {capabilities.headline}
        </h2>
        <p className="section-copy max-w-2xl">{capabilities.subtitle}</p>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {capabilities.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <article
                id={item.id}
                key={item.id}
                className="flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-6 md:p-7"
              >
                <div className="flex items-center justify-between">
                  <Icon className="h-6 w-6 text-teal-700" aria-hidden="true" />
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                    Módulo adicional
                  </span>
                </div>
                <p className="mt-6 text-sm font-semibold text-teal-800">
                  {item.name}
                </p>
                <h3 className="font-display mt-2 text-2xl font-bold leading-tight">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
                <div className="mt-6 flex-1">
                  <p className="mb-3 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                    Ejemplo ilustrativo
                  </p>
                  {item.steps && (
                    <ol className="space-y-2">
                      {item.steps.map((step, i) => (
                        <li
                          key={step}
                          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${i === 2 ? "border border-teal-200 bg-teal-50 font-semibold text-teal-900" : "bg-slate-50 text-slate-600"}`}
                        >
                          <span className="text-xs tabular-nums">0{i + 1}</span>
                          {step}
                          {i === 2 && (
                            <span className="ml-auto text-xs">En curso</span>
                          )}
                        </li>
                      ))}
                    </ol>
                  )}
                  {item.example && (
                    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                      <p className="text-xs font-semibold text-amber-900">
                        {item.example.status}
                      </p>
                      <p className="mt-3 text-sm font-semibold">
                        {item.example.label}
                      </p>
                      <p className="mt-2 text-sm text-slate-700">
                        {item.example.actual}
                      </p>
                      <p className="mt-3 border-t border-amber-200 pt-3 text-sm text-slate-600">
                        {item.example.expected}
                      </p>
                    </div>
                  )}
                  {item.rows && (
                    <div className="overflow-x-auto rounded-xl border border-slate-200">
                      <table className="w-full text-left text-xs">
                        <caption className="sr-only">
                          Comparación ilustrativa de contratos en DocRoom
                        </caption>
                        <thead className="bg-slate-100 text-slate-600">
                          <tr>
                            {item.columns.map((col) => (
                              <th
                                key={col}
                                scope="col"
                                className="px-3 py-3 font-semibold"
                              >
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {item.rows.map((row) => (
                            <tr
                              key={row[0]}
                              className="border-t border-slate-100"
                            >
                              {row.map((cell, i) =>
                                i === 0 ? (
                                  <th
                                    key={cell}
                                    scope="row"
                                    className="px-3 py-4 font-medium"
                                  >
                                    {cell}
                                  </th>
                                ) : (
                                  <td
                                    key={cell}
                                    className="px-3 py-4 text-slate-600"
                                  >
                                    {cell}
                                  </td>
                                ),
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
                <p className="mt-6 border-t border-slate-100 pt-4 text-xs leading-relaxed text-slate-600">
                  {item.detail}
                </p>
              </article>
            );
          })}
        </div>
        <a
          href="#demo"
          className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-teal-800"
        >
          Conocer los módulos en una demo{" "}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
        <div className="mt-12 border-t border-slate-200 pt-10">
          <h3 className="font-display text-2xl font-bold">
            {includedTools.headline}
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
            {includedTools.subtitle}
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {includedTools.items.map((item, index) => {
              const Icon = toolIcons[index];
              return (
                <div key={item.name}>
                  <Icon className="h-5 w-5 text-teal-700" aria-hidden="true" />
                  <h4 className="mt-3 text-base font-semibold">{item.name}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
