import { Check, FileText, MessageCircle } from "lucide-react";
import { integrations } from "@/lib/marketing";

export default function WhatsappAssistant() {
  return (
    <section
      id="integraciones"
      className="section-space bg-white"
      aria-labelledby="integrations-title"
    >
      <div className="mx-auto max-w-6xl px-6">
        <p className="eyebrow">{integrations.eyebrow}</p>
        <h2 id="integrations-title" className="section-title">
          {integrations.headline}
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <article
            id="whatsapp"
            className="rounded-2xl border border-slate-200 bg-[#f3f9f6] p-6 md:p-8"
          >
            <MessageCircle
              className="h-6 w-6 text-teal-700"
              aria-hidden="true"
            />
            <p className="mt-5 text-sm font-semibold text-teal-800">
              {integrations.whatsapp.name}
            </p>
            <h3 className="font-display mt-2 text-2xl font-bold">
              {integrations.whatsapp.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              {integrations.whatsapp.description}
            </p>
            <div className="mt-6 space-y-3 rounded-xl border border-green-100 bg-white/80 p-4">
              <p className="text-xs text-slate-500">Ejemplo ilustrativo</p>
              <p className="ml-7 rounded-xl rounded-br-sm bg-[#def5e6] p-3 text-sm">
                {integrations.whatsapp.question}
              </p>
              <p className="mr-5 rounded-xl rounded-bl-sm border border-slate-100 bg-white p-3 text-sm leading-relaxed text-slate-600">
                {integrations.whatsapp.answer}
              </p>
            </div>
            <p className="mt-5 text-xs leading-relaxed text-slate-600">
              {integrations.note}
            </p>
          </article>
          <article
            id="word"
            className="rounded-2xl border border-slate-200 bg-[#f4f7fc] p-6 md:p-8"
          >
            <FileText className="h-6 w-6 text-blue-700" aria-hidden="true" />
            <p className="mt-5 text-sm font-semibold text-blue-800">
              {integrations.word.name}
            </p>
            <h3 className="font-display mt-2 text-2xl font-bold">
              {integrations.word.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              {integrations.word.description}
            </p>
            <ul className="mt-6 space-y-4">
              {integrations.word.bullets.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-slate-700"
                >
                  <Check
                    className="h-5 w-5 shrink-0 text-blue-700"
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
              className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-blue-800"
            >
              Ver el complemento en una demo →
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
