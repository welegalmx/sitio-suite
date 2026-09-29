import { Check, Building2, BriefcaseBusiness } from "lucide-react";
import { audiences } from "@/lib/marketing";

export default function Profiles() {
  return (
    <section
      id="para-quien"
      className="section-space border-t border-slate-200/70 bg-dark-card"
      aria-labelledby="audience-title"
    >
      <div className="mx-auto max-w-6xl px-6">
        <p className="eyebrow">Para tu equipo</p>
        <h2 id="audience-title" className="section-title">
          Una plataforma. Distintas formas de trabajar.
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {audiences.map((item, index) => {
            const Icon = index === 0 ? Building2 : BriefcaseBusiness;
            return (
              <article
                key={item.name}
                className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8"
              >
                <Icon className="h-6 w-6 text-teal-700" aria-hidden="true" />
                <p className="mt-5 text-sm font-semibold text-teal-800">
                  {item.name}
                </p>
                <h3 className="font-display mt-2 text-2xl font-bold">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {item.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-3 text-sm text-slate-700"
                    >
                      <Check
                        className="h-5 w-5 shrink-0 text-teal-700"
                        aria-hidden="true"
                      />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
