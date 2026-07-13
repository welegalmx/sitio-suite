"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, MessageCircle, Send } from "lucide-react";
import { whatsappSection } from "@/lib/content";

const CHAT = whatsappSection.conversation;

function TypingDots() {
  return (
    <span className="flex items-center gap-1 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-2 w-2 rounded-full bg-foreground/40"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </span>
  );
}

// Maqueta de chat: revela los mensajes uno por uno, mostrando el indicador de
// "escribiendo…" antes de cada respuesta del asistente, y reinicia en bucle.
function ChatMock() {
  const [count, setCount] = useState(0);
  const [typing, setTyping] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timer: number;
    if (count >= CHAT.length) {
      timer = window.setTimeout(() => {
        setTyping(false);
        setCount(0);
      }, 3500);
      return () => window.clearTimeout(timer);
    }
    const next = CHAT[count];
    if (next.role === "assistant") {
      setTyping(true);
      timer = window.setTimeout(() => {
        setTyping(false);
        setCount((c) => c + 1);
      }, 1600);
    } else {
      timer = window.setTimeout(() => setCount((c) => c + 1), count === 0 ? 700 : 1300);
    }
    return () => window.clearTimeout(timer);
  }, [count]);

  // Auto-scroll al fondo conforme aparecen mensajes / el indicador de escritura.
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [count, typing]);

  return (
    <div className="mx-auto flex h-[520px] w-full max-w-[380px] flex-col overflow-hidden rounded-[2rem] border border-foreground/15 bg-white shadow-2xl shadow-black/15">
      {/* header */}
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{ background: "var(--gradient-brand)" }}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
          <MessageCircle className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{whatsappSection.contactName}</p>
          <p className="text-xs text-white/80">en línea</p>
        </div>
      </div>

      {/* cuerpo del chat */}
      <div
        ref={bodyRef}
        className="flex flex-1 flex-col gap-2 overflow-y-auto bg-[#EDE7DF] px-4 py-4"
      >
        <AnimatePresence initial={false}>
          {CHAT.slice(0, count).map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <span
                className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-snug text-foreground shadow-sm ${
                  m.role === "user"
                    ? "rounded-br-sm bg-[#D9FDD3]"
                    : "rounded-bl-sm bg-white"
                }`}
              >
                {m.text}
              </span>
            </motion.div>
          ))}
          {typing && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex justify-start"
            >
              <span className="rounded-2xl rounded-bl-sm bg-white px-4 py-2 shadow-sm">
                <TypingDots />
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* barra de entrada (decorativa) */}
      <div className="flex items-center gap-2 border-t border-foreground/10 bg-white px-4 py-3">
        <div className="flex-1 rounded-full bg-foreground/[0.06] px-4 py-2 text-xs text-foreground/40">
          Escribe un mensaje…
        </div>
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
          style={{ background: "var(--gradient-brand)" }}
        >
          <Send className="h-4 w-4 text-white" />
        </div>
      </div>
    </div>
  );
}

export default function WhatsappAssistant() {
  return (
    <section id="whatsapp" className="bg-dark-bg py-24">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-2 md:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-mint">
            {whatsappSection.eyebrow}
          </p>
          <h2 className="font-display mt-4 text-3xl font-extrabold leading-tight tracking-tight text-foreground md:text-4xl">
            {whatsappSection.headline}
          </h2>
          <p className="mt-4 text-base text-foreground/50">{whatsappSection.subtitle}</p>

          <ul className="mt-8 space-y-4">
            {whatsappSection.highlights.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0" style={{ color: "#2ECFB1" }} />
                <span className="text-sm leading-relaxed text-foreground/70">{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-xs italic text-foreground/40">{whatsappSection.disclaimer}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        >
          <ChatMock />
        </motion.div>
      </div>
    </section>
  );
}
