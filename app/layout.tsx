import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SomosLegado | Abogados de Herencias y Posesión Efectiva",
    template: "%s | SomosLegado",
  },

  description:
    "Asesoría legal en herencias, posesión efectiva, seguros y trámites bancarios. Acompañamiento jurídico en las regiones de Los Lagos y Los Ríos.",

  applicationName: "SomosLegado",

  authors: [{ name: "SomosLegado" }],
  creator: "SomosLegado",
  publisher: "SomosLegado",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    title: "SomosLegado | Abogados de Herencias y Posesión Efectiva",
    description:
      "Asesoría legal en herencias, posesión efectiva, seguros y trámites bancarios en Los Lagos y Los Ríos.",
    type: "website",
    locale: "es_CL",
    siteName: "SomosLegado",
  },

  twitter: {
    card: "summary_large_image",
    title: "SomosLegado | Abogados de Herencias y Posesión Efectiva",
    description:
      "Asesoría legal en herencias, posesión efectiva y trámites sucesorios en Los Lagos y Los Ríos.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CL">
      <body>{children}</body>
    </html>
  );
}
