'use client';

import ScrollToTop from './scroll-to-top';
import WhatsAppButton from './whatsapp-button';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollToTop />
      {children}
      <WhatsAppButton />
    </>
  );
}
