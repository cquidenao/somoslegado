import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SomosLegado | Asesoría legal sucesoria",
  description: "Acompañamiento legal para posesiones efectivas, herencias, seguros y trámites sucesorios en las regiones de Los Ríos y Los Lagos.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
