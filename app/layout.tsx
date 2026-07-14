import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const SITE_URL = "https://suite.welegal.mx";

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
  metadataBase: new URL(SITE_URL),
  applicationName: "we.legal Suite",
  keywords: [
    "software legal",
    "legaltech México",
    "gestión de contratos",
    "firma electrónica NOM-151",
    "Abogado AI",
    "software para despachos",
    "gestión legal empresarial",
    "documentos corporativos",
  ],
  authors: [{ name: "we.legal Suite" }],
  creator: "we.legal Suite",
  publisher: "we.legal Suite",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "we.legal Suite",
    description: "La operación legal de tu empresa, toda en un solo lugar.",
    url: SITE_URL,
    siteName: "we.legal Suite",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "we.legal Suite",
    description: "La operación legal de tu empresa, toda en un solo lugar.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0F1E",
};

// Datos estructurados (JSON-LD): identidad de marca + sitio + producto SaaS.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "we.legal Suite",
      url: SITE_URL,
      logo: `${SITE_URL}/icon.png`,
      slogan: "La operación legal de tu empresa, toda en un solo lugar.",
      areaServed: "Latinoamérica",
      description:
        "Plataforma legal SaaS hecha en México para Latinoamérica: contratos, documentos corporativos, equipo, litigios y un Abogado AI.",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "we.legal Suite",
      inLanguage: "es-MX",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      name: "we.legal Suite",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      inLanguage: "es-MX",
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
      description:
        "Software de gestión legal con IA: contratos con análisis y firma electrónica NOM-151, documentos corporativos, equipo/RRHH, permisos y trámites, litigios y un Abogado AI.",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${averta.variable} ${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-dark-bg text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
