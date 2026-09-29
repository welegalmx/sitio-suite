import { Check, Building2, BriefcaseBusiness } from "lucide-react";
import { audiences } from "@/lib/marketing";

export default function Profiles() {
  return (
    <section
      id="para-quien"
      className="section-space bg-slate-50/60"
      aria-labelledby="audience-title"
    >
      <div className="mx-auto max-w-7xl px-6">
        <p className="eyebrow">Para tu equipo</p>
        <h2 id="audience-title" className="section-title">
          Una plataforma. Distintas formas de trabajar.
        </h2>
        <div className="mt-12 divide-y divide-slate-200">
          {audiences.map((item, index) => {
            const Icon = index === 0 ? Building2 : BriefcaseBusiness;
            return (
              <article
                key={item.name}
                className="grid gap-6 py-9 first:pt-0 last:pb-0 lg:grid-cols-12 lg:gap-8"
              >
                <div className="flex items-center gap-3 self-start text-brand-mint lg:col-span-2">
                  <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                  <p className="text-sm font-semibold">{item.name}</p>
                </div>
                <div className="lg:col-span-5">
                <h3 className="font-display max-w-sm text-2xl font-bold leading-tight">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
                </div>
                <ul className="space-y-4 lg:col-span-5 lg:pl-6">
                  {item.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-3 text-sm leading-relaxed text-slate-700"
                    >
                      <Check
                        className="h-5 w-5 shrink-0 text-brand-mint"
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
