'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SurveyForm from '@/components/sections/survey-form';
import { handleSurveySubmission, handleRecommendationGeneration, summarizeSurveyDataForDownload } from '@/app/client-actions';
import type { SurveyFormData } from '@/lib/types';
import type { ServiceRecommendationOutput } from '@/ai/flows/service-recommendation';
import { Loader2, ServerCrash, Lightbulb, Download, Send, Bot } from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';

const RecommendationResults = ({ recommendation }: { recommendation: ServiceRecommendationOutput }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    className="bg-card border border-border/50 p-8 rounded-lg shadow-2xl"
  >
    <div className="text-center mb-8">
      <Lightbulb className="mx-auto h-12 w-12 text-primary mb-4" />
      <h2 className="text-3xl font-bold font-headline text-primary">{recommendation.title}</h2>
      <p className="text-muted-foreground mt-2">{recommendation.summary}</p>
    </div>
    
    <div className="space-y-6">
      {recommendation.recommendedServices.map((service, index) => (
        <div key={index} className="bg-background/50 p-6 rounded-lg border border-border">
          <h3 className="text-xl font-bold font-headline text-foreground mb-3">{service.serviceName}</h3>
          <p className="text-muted-foreground mb-4 italic">"{service.justification}"</p>
          <div>
            <h4 className="font-semibold text-primary mb-2">Acciones Sugeridas:</h4>
            <ul className="list-disc list-inside space-y-2 text-foreground/90">
              {service.suggestedActions.map((action, actionIndex) => (
                <li key={actionIndex}>{action}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

export default function DiagnosticoClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<ServiceRecommendationOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [formStep, setFormStep] = useState<'form' | 'summary' | 'sent'>('form');
  const [surveyData, setSurveyData] = useState<SurveyFormData | null>(null);
  const [summaryText, setSummaryText] = useState<string>('');
  
  const handleFormSubmit = async (data: SurveyFormData) => {
    setIsLoading(true);
    setError(null);
    setSurveyData(data);

    const result = await summarizeSurveyDataForDownload(data);
    if (result.summary) {
        setSummaryText(result.summary);
        setFormStep('summary');
    } else {
        setError(result.error || 'No se pudo generar el resumen.');
    }
    setIsLoading(false);
  };

  const handleDownloadSummary = () => {
    const blob = new Blob([summaryText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `resumen-diagnostico-${surveyData?.q1_name || 'cliente'}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSendToSupabase = async () => {
    if (!surveyData) return;
    setIsLoading(true);
    setError(null);
    
    const result = await handleSurveySubmission(surveyData);
    if (result.success) {
        setFormStep('sent');
    } else {
        setError(result.error || 'No se pudieron guardar los datos.');
    }
    setIsLoading(false);
  };

  const handleGenerateRecommendation = async () => {
      if (!surveyData) return;
      setIsLoading(true);
      setError(null);
      setRecommendation(null);

      const result = await handleRecommendationGeneration(surveyData);

      if (result.recommendation) {
        setRecommendation(result.recommendation);
      } else {
        setError(result.error || 'Ocurrió un error inesperado.');
      }
      
      setIsLoading(false);
  };
  
  const resetFlow = () => {
    setFormStep('form');
    setSurveyData(null);
    setSummaryText('');
    setError(null);
    setRecommendation(null);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="bg-background text-foreground pt-32 pb-20">
          <div className="container mx-auto px-6">
            <motion.section
              className="text-center mb-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-4 text-primary font-headline">Diagnóstico Estratégico</h1>
              <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto">
                {recommendation 
                  ? "Aquí tienes tu recomendación personalizada." 
                  : "Completa este formulario para descubrir el potencial oculto de tu marca."}
              </p>
            </motion.section>
            
            {isLoading && (
              <div className="flex flex-col items-center justify-center text-center p-8 bg-card rounded-lg">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <h2 className="text-2xl font-semibold text-foreground">Procesando...</h2>
                <p className="text-muted-foreground mt-2">Estamos trabajando en tu solicitud. Esto puede tardar un momento.</p>
              </div>
            )}

            {error && (
              <div className="flex flex-col items-center justify-center text-center p-8 bg-destructive/10 border border-destructive rounded-lg">
                <ServerCrash className="h-12 w-12 text-destructive mb-4" />
                <h2 className="text-2xl font-semibold text-destructive">¡Oops! Algo salió mal.</h2>
                <p className="text-destructive/80 mt-2">{error}</p>
                  <button onClick={resetFlow} className="mt-4 bg-destructive text-destructive-foreground px-4 py-2 rounded">Intentar de Nuevo</button>
              </div>
            )}

            {!isLoading && !error && (
              <>
                {formStep === 'form' && <SurveyForm onSubmit={handleFormSubmit} />}

                {formStep === 'summary' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="bg-card p-8 rounded-lg shadow-xl text-center"
                  >
                    <h2 className="text-2xl font-bold font-headline text-primary mb-4">Paso 2: Revisa y Guarda tu Resumen</h2>
                    <p className="text-muted-foreground mb-6">Hemos generado un resumen de tus respuestas. Descárgalo para tus archivos antes de continuar.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button onClick={handleDownloadSummary} size="lg">
                        <Download className="mr-2" />
                        Descargar Resumen
                      </Button>
                      <Button onClick={handleSendToSupabase} size="lg" variant="outline">
                        <Send className="mr-2" />
                        Enviar a Supabase
                      </Button>
                    </div>
                  </motion.div>
                )}

                {formStep === 'sent' && (
                   <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="bg-card p-8 rounded-lg shadow-xl text-center"
                  >
                    <h2 className="text-2xl font-bold font-headline text-primary mb-4">Paso 3: Genera tu Diagnóstico</h2>
                    <p className="text-muted-foreground mb-6">Tus datos se han guardado de forma segura. Ahora, utiliza nuestra IA para obtener tu plan estratégico personalizado.</p>
                    <Button onClick={handleGenerateRecommendation} size="lg">
                      <Bot className="mr-2" />
                      Generar Recomendación con IA
                    </Button>
                  </motion.div>
                )}
                
                {recommendation && <RecommendationResults recommendation={recommendation} />}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
