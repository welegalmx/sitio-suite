import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-dark-bg text-foreground">
        {children}
      </body>
    </html>
  );
}
