import React, { Suspense } from 'react';
import DiagnosticoClient from './client';
import { Loader2 } from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-lg min-h-[500px]">
    <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
    <h2 className="text-2xl font-semibold text-foreground">Cargando Diagnóstico...</h2>
    <p className="text-muted-foreground mt-2">Preparando todo para ti.</p>
  </div>
);

const DiagnosticoPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<LoadingFallback />}>
          <DiagnosticoClient />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default DiagnosticoPage;
