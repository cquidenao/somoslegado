import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SomosLegado | Asesoría Legal Sucesoria",
  description:
    "Acompañamiento legal para posesiones efectivas, herencias, seguros y trámites sucesorios en las regiones de Los Ríos y Los Lagos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
