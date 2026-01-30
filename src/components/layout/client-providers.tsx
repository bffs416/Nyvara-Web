'use client';

import ScrollToTop from './scroll-to-top';
import WhatsAppButton from './whatsapp-button';
import CustomCursor from './custom-cursor';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CustomCursor />
      <ScrollToTop />
      {children}
      <WhatsAppButton />
    </>
  );
}
