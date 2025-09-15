'use client';

import CustomCursor from './custom-cursor';
import ScrollToTop from './scroll-to-top';
import WhatsAppButton from './whatsapp-button';

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
