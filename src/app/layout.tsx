import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { ClientProviders } from '@/components/layout/client-providers';
import { Analytics } from '@vercel/analytics/react';

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
    <html lang="es" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=Lato:wght@400;700&family=Plus+Jakarta+Sans:wght@300;400;600;800&family=Inter:wght@400;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body bg-background text-foreground antialiased" suppressHydrationWarning>
        <ClientProviders>
          {children}
        </ClientProviders>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
