"use client";

import { useState } from "react";
import Image from "next/image";

const LOGO_SRC = "/logo-welegal-suite.png";
const LOGO_ASPECT_RATIO = 1678 / 332;

export default function Logo({
  heightPx = 32,
  priority = false,
  dark = false,
}: {
  heightPx?: number;
  priority?: boolean;
  /** true cuando el logo va sobre un fondo oscuro (p. ej. el Footer, que
   * se mantiene oscuro en el tema claro) — controla el color del texto
   * de fallback "suite" si la imagen no carga. */
  dark?: boolean;
}) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <span className="font-display font-extrabold tracking-tight" style={{ fontSize: heightPx * 0.6 }}>
        <span style={{ color: "#1DAAE1" }}>we.</span>
        <span className="italic" style={{ color: "#2ECFB1" }}>
          legal
        </span>{" "}
        <span className={`font-light ${dark ? "text-white/60" : "text-foreground/60"}`}>
          suite
        </span>
      </span>
    );
  }

  return (
    <Image
      src={LOGO_SRC}
      alt="we.legal suite"
      width={Math.round(heightPx * LOGO_ASPECT_RATIO)}
      height={heightPx}
      priority={priority}
      style={{ height: heightPx, width: "auto" }}
      onError={() => setErrored(true)}
    />
  );
}
