import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Tipografía de marca (Brand Guidelines POLVO ROSA, julio 2026):
// Averta Std para headlines, DM Sans para body.
const averta = localFont({
  variable: "--font-averta",
  src: [
    { path: "./fonts/averta/AvertaStd-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/averta/AvertaStd-Semibold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/averta/AvertaStd-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/averta/AvertaStd-ExtraBold.ttf", weight: "800", style: "normal" },
    { path: "./fonts/averta/AvertaStd-Black.ttf", weight: "900", style: "normal" },
  ],
});

const dmSans = localFont({
  variable: "--font-dm-sans",
  src: [
    { path: "./fonts/dm-sans/DMSans-Light.otf", weight: "300", style: "normal" },
    { path: "./fonts/dm-sans/DMSans-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/dm-sans/DMSans-Medium.otf", weight: "500", style: "normal" },
    { path: "./fonts/dm-sans/DMSans-Bold.otf", weight: "700", style: "normal" },
    { path: "./fonts/dm-sans/DMSans-Black.otf", weight: "900", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: "we.legal Suite — La operación legal de tu empresa, en un solo lugar",
  description:
    "Contratos, documentos corporativos, equipo, litigios y un Abogado AI que conoce tu empresa por dentro. Plataforma legal SaaS hecha en México para Latinoamérica.",
  metadataBase: new URL("https://suite.welegal.mx"),
  openGraph: {
    title: "we.legal Suite",
    description: "La operación legal de tu empresa, toda en un solo lugar.",
    url: "https://suite.welegal.mx",
    siteName: "we.legal Suite",
    locale: "es_MX",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${averta.variable} ${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-dark-bg text-foreground">
        {children}
      </body>
    </html>
  );
}
