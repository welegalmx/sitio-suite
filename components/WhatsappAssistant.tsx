import { Check, FileText, MessageCircle } from "lucide-react";
import { integrations } from "@/lib/marketing";

export default function WhatsappAssistant() {
  return (
    <section
      id="integraciones"
      className="section-space bg-white"
      aria-labelledby="integrations-title"
    >
      <div className="mx-auto max-w-7xl px-6">
        <p className="eyebrow">{integrations.eyebrow}</p>
        <h2 id="integrations-title" className="section-title">
          {integrations.headline}
        </h2>
        <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-0">
          <article
            id="whatsapp"
            className="min-w-0 md:pr-10 lg:pr-14"
          >
            <div className="flex items-center gap-3 text-brand-mint">
              <MessageCircle className="h-6 w-6 shrink-0" aria-hidden="true" />
              <p className="text-sm font-semibold">{integrations.whatsapp.name}</p>
            </div>
            <h3 className="font-display mt-5 max-w-md text-2xl font-bold leading-tight">
              {integrations.whatsapp.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              {integrations.whatsapp.description}
            </p>
            <div className="mt-8 space-y-4">
              <p className="text-[11px] uppercase tracking-wider text-slate-500">Ejemplo ilustrativo</p>
              <p className="ml-10 rounded-2xl rounded-br-sm bg-brand-mint/15 px-5 py-4 text-sm">
                {integrations.whatsapp.question}
              </p>
              <p className="mr-10 rounded-2xl rounded-bl-sm bg-slate-50 px-5 py-4 text-sm leading-relaxed text-slate-600">
                {integrations.whatsapp.answer}
              </p>
            </div>
            <p className="mt-5 text-xs leading-relaxed text-slate-600">
              {integrations.note}
            </p>
          </article>
          <article
            id="word"
            className="min-w-0 border-t border-slate-200 pt-10 md:border-t-0 md:border-l md:pt-0 md:pl-10 lg:pl-14"
          >
            <div className="flex items-center gap-3 text-brand-mint">
              <FileText className="h-6 w-6 shrink-0" aria-hidden="true" />
              <p className="text-sm font-semibold">{integrations.word.name}</p>
            </div>
            <h3 className="font-display mt-5 max-w-md text-2xl font-bold leading-tight">
              {integrations.word.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              {integrations.word.description}
            </p>
            <ul className="mt-8 divide-y divide-slate-100">
              {integrations.word.bullets.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 py-4 text-sm text-slate-700"
                >
                  <Check
                    className="h-5 w-5 shrink-0 text-brand-mint"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-slate-200 pt-5 text-xs leading-relaxed text-slate-600">
              {integrations.word.note}
            </p>
            <a
              href="#demo"
              className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-foreground underline decoration-brand-mint decoration-2 underline-offset-8 hover:decoration-foreground"
            >
              Ver el complemento en una demo →
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
