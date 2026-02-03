import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { ClientProviders } from '@/components/layout/client-providers';
import { Analytics } from '@vercel/analytics/react';
import { Inter, JetBrains_Mono, Space_Grotesk, Archivo_Black } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space',
});

const archivoBlack = Archivo_Black({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-archivo',
});

export const metadata: Metadata = {
  title: {
    default: "Nyvara: Soluciones Integrales de Marketing, Eventos y Tecnología",
    template: "%s | Nyvara",
  },
  description: 'Potenciamos el crecimiento de tu negocio con soluciones 360°. Integramos marketing digital, organización de eventos corporativos y desarrollo de software a medida para llevar tu marca al siguiente nivel.',
  keywords: ["marketing digital", "eventos corporativos", "desarrollo de software", "Nyvara", "soluciones tecnológicas", "agencia de marketing", "organización de eventos Bogotá"],
  authors: [{ name: "Nyvara" }],
  creator: "Nyvara",
  publisher: "Nyvara",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} ${archivoBlack.variable} font-body bg-background text-foreground antialiased`}>
        <div className="cyber-grid"></div>
        <div className="glow-sphere"></div>
        <ClientProviders>
          {children}
        </ClientProviders>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
