'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import SurveyForm from '@/components/sections/survey-form';
import { handleSurveyAndRecommend } from '@/app/actions';
import { SurveyFormData } from '@/lib/types';
import { ServiceRecommendationOutput } from '@/ai/flows/service-recommendation';
import { Loader2, ServerCrash, Lightbulb } from 'lucide-react';

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


const DiagnosticoPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<ServiceRecommendationOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const pageVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.6 } }
  };
  
  const handleFormSubmit = async (data: SurveyFormData) => {
    setIsLoading(true);
    setError(null);
    setRecommendation(null);

    const result = await handleSurveyAndRecommend(data);

    if (result.recommendation) {
      setRecommendation(result.recommendation);
    } else {
      setError(result.error || 'Ocurrió un error inesperado.');
    }
    
    setIsLoading(false);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <motion.div
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="bg-background text-foreground pt-32 pb-20"
        >
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
                <h2 className="text-2xl font-semibold text-foreground">Analizando tus respuestas...</h2>
                <p className="text-muted-foreground mt-2">Nuestra IA está generando tu diagnóstico personalizado. Esto puede tardar un momento.</p>
              </div>
            )}

            {error && (
              <div className="flex flex-col items-center justify-center text-center p-8 bg-destructive/10 border border-destructive rounded-lg">
                <ServerCrash className="h-12 w-12 text-destructive mb-4" />
                <h2 className="text-2xl font-semibold text-destructive">¡Oops! Algo salió mal.</h2>
                <p className="text-destructive/80 mt-2">{error}</p>
                 <button onClick={() => {setError(null); setRecommendation(null);}} className="mt-4 bg-destructive text-destructive-foreground px-4 py-2 rounded">Intentar de Nuevo</button>
              </div>
            )}

            {!isLoading && !recommendation && !error && (
              <SurveyForm onSubmit={handleFormSubmit} />
            )}

            {recommendation && !isLoading && (
              <RecommendationResults recommendation={recommendation} />
            )}
            
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default DiagnosticoPage;
