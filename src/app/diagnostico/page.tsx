import React, { Suspense } from 'react';
import DiagnosticoClient from './client';
import { Loader2 } from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center text-center p-8 min-h-screen">
    <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
    <h2 className="text-2xl font-semibold text-foreground">Cargando Diagnóstico...</h2>
    <p className="text-muted-foreground mt-2">Preparando todo para ti.</p>
  </div>
);

const DiagnosticoPage = () => {
  return (
    <div className="flex flex-col min-h-screen relative bg-black overflow-hidden">
      {/* Glow Effects (Same as Home) */}
      <div className="glow-sphere" />
      <div className="glow-sphere-2" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

      <Header />
      <main className="flex-1 relative z-10 pt-20 pb-32">
        <Suspense fallback={<LoadingFallback />}>
          <DiagnosticoClient />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default DiagnosticoPage;
