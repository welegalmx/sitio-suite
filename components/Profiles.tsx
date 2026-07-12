"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { profilesSection, profiles, type Profile } from "@/lib/content";

function ProfileInfo({ profile }: { profile: Profile }) {
  const nonEmpty = profile.copyLines.filter(Boolean);
  const headingLines = nonEmpty.slice(0, 2);
  const bodyLines = nonEmpty.slice(2);

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-brand-mint">
        {profile.role}
      </p>
      <h3 className="mt-2 text-2xl font-bold text-white">{profile.name}</h3>
      <p className="mt-1 text-sm text-white/40">{profile.companyContext}</p>

      <blockquote className="mt-6 border-l-2 border-brand-mint/60 pl-4 text-lg italic leading-relaxed text-white/70">
        {profile.painPoints[0]}
      </blockquote>

      <div className="mt-6 space-y-1">
        {headingLines.map((line) => (
          <p key={line} className="text-lg font-semibold leading-snug text-white">
            {line}
          </p>
        ))}
      </div>

      {bodyLines.map((line) => (
        <p key={line} className="mt-3 text-sm leading-relaxed text-white/50">
          {line}
        </p>
      ))}
    </div>
  );
}

function BenefitsCard({ profile }: { profile: Profile }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-dark-card/60 p-8">
      <p className="text-sm font-semibold text-white/70">Beneficios clave</p>
      <ul className="mt-5 space-y-4">
        {profile.benefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-3">
            <Check className="mt-0.5 h-5 w-5 shrink-0" style={{ color: "#2ECFB1" }} />
            <span className="text-sm leading-relaxed text-white/70">{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Profiles() {
  return (
    <section className="bg-dark-bg py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mx-auto max-w-2xl text-center text-3xl font-extrabold tracking-tight text-white md:text-4xl">
          {profilesSection.headline}
        </h2>

        <div className="mt-16 flex flex-col gap-20">
          {profiles.map((profile, index) => {
            const reversed = index % 2 === 1;
            return (
              <div key={profile.id} className="grid gap-10 md:grid-cols-2 md:items-center">
                <motion.div
                  initial={{ opacity: 0, x: reversed ? 24 : -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={reversed ? "md:order-2" : "md:order-1"}
                >
                  <ProfileInfo profile={profile} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: reversed ? -24 : 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                  className={reversed ? "md:order-1" : "md:order-2"}
                >
                  <BenefitsCard profile={profile} />
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
