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
      className="section-space bg-slate-50/60"
      aria-labelledby="capabilities-title"
    >
      <div className="mx-auto max-w-7xl px-6">
        <p className="eyebrow">{capabilities.eyebrow}</p>
        <h2 id="capabilities-title" className="section-title">
          {capabilities.headline}
        </h2>
        <p className="section-copy max-w-2xl">{capabilities.subtitle}</p>
        <div className="mt-12 grid gap-10 lg:grid-cols-3 lg:gap-0">
          {capabilities.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <article
                id={item.id}
                key={item.id}
                className="flex min-w-0 flex-col border-t border-slate-200 pt-8 lg:border-t-0 lg:border-l lg:px-8 lg:pt-0 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-6 w-6 text-brand-mint" aria-hidden="true" />
                  <p className="text-sm font-semibold text-brand-mint">
                    {item.name}
                  </p>
                </div>
                <h3 className="font-display mt-3 text-2xl font-bold leading-tight">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
                <div className="mt-8 flex-1">
                  <p className="mb-3 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                    Ejemplo ilustrativo
                  </p>
                  {item.steps && (
                    <ol className="space-y-1">
                      {item.steps.map((step, i) => (
                        <li
                          key={step}
                          className={`flex items-center gap-3 border-l-2 px-3 py-2 text-sm ${i === 2 ? "border-brand-mint bg-brand-mint/10 font-semibold text-foreground" : "border-slate-200 text-slate-600"}`}
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
                    <div className="border-l-2 border-amber-300 pl-4 py-1">
                      <p className="text-xs font-semibold text-amber-900">
                        {item.example.status}
                      </p>
                      <p className="mt-3 text-sm font-semibold">
                        {item.example.label}
                      </p>
                      <p className="mt-2 text-sm text-slate-700">
                        {item.example.actual}
                      </p>
                      <p className="mt-3 border-t border-slate-200 pt-3 text-sm text-slate-600">
                        {item.example.expected}
                      </p>
                    </div>
                  )}
                  {item.rows && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <caption className="sr-only">
                          Comparación ilustrativa de contratos en DocRoom
                        </caption>
                        <thead className="text-slate-500">
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
                              className="border-t border-slate-200/70"
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
                <p className="mt-6 border-t border-slate-200/70 pt-4 text-xs leading-relaxed text-slate-600">
                  {item.detail}
                </p>
              </article>
            );
          })}
        </div>
        <a
          href="#demo"
          className="mt-9 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-foreground underline decoration-brand-mint decoration-2 underline-offset-8 hover:decoration-foreground"
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
                  <div className="flex items-center gap-3 text-brand-mint">
                    <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                    <h4 className="text-base font-semibold">{item.name}</h4>
                  </div>
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
