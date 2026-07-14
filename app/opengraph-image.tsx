import { ImageResponse } from "next/og";

// Imagen social (Open Graph / Twitter). Next la sirve en /opengraph-image y
// añade og:image + twitter:image automáticamente.
export const alt =
  "we.legal Suite — La operación legal de tu empresa, en un solo lugar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "96px",
          background:
            "linear-gradient(135deg, #081226 0%, #0A0F1E 55%, #0e1b30 100%)",
        }}
      >
        {/* Barra de acento con el degradado de marca */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 14,
            background: "linear-gradient(90deg, #2ECFB1, #1DAAE1, #2A88FE)",
          }}
        />

        {/* Wordmark */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontSize: 100,
            fontWeight: 800,
            letterSpacing: -3,
          }}
        >
          <span style={{ color: "#1DAAE1" }}>we.</span>
          <span style={{ color: "#2ECFB1", fontStyle: "italic" }}>legal</span>
          <span style={{ color: "#FFFFFF", fontWeight: 300, marginLeft: 20 }}>
            suite
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            marginTop: 44,
            maxWidth: 940,
            fontSize: 48,
            lineHeight: 1.25,
            fontWeight: 600,
            color: "rgba(255,255,255,0.85)",
          }}
        >
          La operación legal de tu empresa, toda en un solo lugar.
        </div>

        {/* Pie */}
        <div
          style={{
            display: "flex",
            marginTop: 56,
            fontSize: 30,
            color: "rgba(255,255,255,0.5)",
          }}
        >
          suite.welegal.mx
        </div>
      </div>
    ),
    { ...size }
  );
}
