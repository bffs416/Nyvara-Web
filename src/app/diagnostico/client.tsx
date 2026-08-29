'use client';

import React, { useState, useEffect } from 'react';
import SurveyForm from '@/components/sections/survey-form';
import GeneralSurveyForm from '@/components/sections/general-survey-form';
import { handleSurveySubmission, summarizeSurveyDataForDownload, handleGeneralSurveySubmission, summarizeGeneralSurveyDataForDownload } from '@/app/client-actions';
import type { SurveyFormData, GeneralSurveyFormData } from '@/lib/types';
import { Loader2, ServerCrash, Download, Send, CheckCircle, HeartPulse, Building, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';
import { useRouter, useSearchParams } from 'next/navigation';

const SuccessMessage = ({ onReset }: { onReset: () => void }) => (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[40px] p-8 md:p-12 max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
        <div className="text-center relative z-10">
            <h1 className="font-headline text-3xl md:text-5xl font-extrabold text-white mb-4">¡Diagnóstico Enviado!</h1>
            <p className="text-gray-400 uppercase tracking-widest text-sm font-bold">Gracias por tu tiempo.</p>
        </div>
        <p className="text-center my-8 text-gray-300 leading-relaxed text-lg relative z-10">
            Has dado un paso fundamental. He recibido tus respuestas y, gracias a los minutos que has invertido, ahora puedo dedicar todo mi esfuerzo y conocimiento en analizar tu visión para construir juntos el camino hacia tu objetivo.
            <br/><br/>
            <strong className="text-white font-bold">Revisaré personalmente cada detalle y me pondré en contacto contigo muy pronto.</strong>
        </p>
        <div className="flex justify-center mt-10 relative z-10">
            <button onClick={onReset} className="bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-full font-bold transition-all duration-300 w-full sm:w-auto">Volver al Inicio</button>
        </div>
    </div>
);

const GeneralSuccessMessage = () => {
    const whatsappUrl = `https://wa.me/${siteConfig.contact.phone}?text=${encodeURIComponent("Hola, he completado el Análisis de Necesidades (ADN) y me gustaría recibir mi diagnóstico inicial personalizado.")}`;
    return (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[40px] p-8 md:p-12 max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
            <div className="text-center relative z-10">
                <h1 className="font-headline text-3xl md:text-5xl font-extrabold text-white mb-4">¡Análisis Completado!</h1>
                 <p className="text-gray-400 uppercase tracking-widest text-sm font-bold">Gracias por tu honestidad.</p>
            </div>
            <p className="text-center my-8 text-gray-300 leading-relaxed text-lg relative z-10">
                La información compartida es ahora la materia prima para nuestro análisis. El siguiente paso es contactarnos directamente para recibir tu diagnóstico inicial personalizado y discutir tus oportunidades de crecimiento.
            </p>
            <div className="flex justify-center mt-10 relative z-10">
                 <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-full font-bold transition-all duration-300 w-full sm:w-auto text-center inline-block">
                    Contactar por WhatsApp
                 </a>
            </div>
        </div>
    );
};


const SectorSelection = ({ onSelect }: { onSelect: (sector: 'health' | 'general') => void }) => (
  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[40px] p-8 md:p-12 max-w-3xl mx-auto shadow-2xl relative overflow-hidden">
     <div className="text-center mb-12 relative z-10">
        <h1 className="font-headline text-4xl sm:text-5xl font-extrabold text-white mb-4">Paso 1</h1>
        <span className="text-gray-400 uppercase tracking-widest text-sm font-bold">Elige tu sector</span>
    </div>
    <p className="text-center mb-10 text-gray-300 text-lg relative z-10">Para ofrecerte el diagnóstico más preciso, por favor, selecciona el área que mejor describe tu negocio.</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
      <div onClick={() => onSelect('health')} className="bg-black/40 border border-white/10 hover:border-white/40 hover:bg-white/5 p-8 rounded-[32px] flex flex-col items-center text-center gap-4 cursor-pointer transition-all duration-300 group">
          <div className="p-4 bg-white/10 rounded-2xl group-hover:scale-110 transition-transform duration-300">
             <HeartPulse className="h-10 w-10 text-white" />
          </div>
          <div>
            <div className="font-bold text-xl text-white mb-2">Sector Salud</div>
            <div className="text-sm text-gray-400">(Medicina Estética)</div>
          </div>
      </div>
      <div onClick={() => onSelect('general')} className="bg-black/40 border border-white/10 hover:border-white/40 hover:bg-white/5 p-8 rounded-[32px] flex flex-col items-center text-center gap-4 cursor-pointer transition-all duration-300 group">
          <div className="p-4 bg-white/10 rounded-2xl group-hover:scale-110 transition-transform duration-300">
             <Building className="mb-2 h-10 w-10 text-white" />
          </div>
          <div>
            <div className="font-bold text-xl text-white mb-2">Otro Sector</div>
            <div className="text-sm text-gray-400">(Empresas y Profesionales)</div>
          </div>
      </div>
    </div>
  </div>
);


export default function DiagnosticoClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formStep, setFormStep] = useState<'sector' | 'form' | 'summary' | 'sent' | 'general_sent'>('sector');
  const [surveyData, setSurveyData] = useState<SurveyFormData | GeneralSurveyFormData | null>(null);
  const [summaryText, setSummaryText] = useState<string>('');
  const [selectedSector, setSelectedSector] = useState<'health' | 'general' | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const sector = searchParams.get('sector');
    if ((sector === 'health' || sector === 'general')) {
      setSelectedSector(sector);
      setFormStep('form');
    } else {
      setFormStep('sector');
      setSelectedSector(null);
    }
  }, [searchParams]);

  
  const handleSectorSelect = (sector: 'health' | 'general') => {
    router.push(`/diagnostico?sector=${sector}`, { scroll: false });
  };
  
  const handleFormSubmit = async (data: SurveyFormData | GeneralSurveyFormData) => {
    setIsLoading(true);
    setError(null);

    setSurveyData(data);
    
    let result;
    if (selectedSector === 'health') {
        result = await summarizeSurveyDataForDownload(data as SurveyFormData);
    } else {
        result = await summarizeGeneralSurveyDataForDownload(data as GeneralSurveyFormData);
    }

    if (result.summary) {
        setSummaryText(result.summary);
        setFormStep('summary');
    } else {
        setError(result.error || 'No se pudo generar el resumen.');
    }
    setIsLoading(false);
  };

  const handleDownloadSummary = () => {
    let fileName = 'resumen-diagnostico.txt';
    if(surveyData && 'q1_name' in surveyData && surveyData.q1_name) {
        fileName = `resumen-diagnostico-${surveyData.q1_name.replace(/ /g, '_')}.txt`;
    } else if (surveyData && 'name' in surveyData && surveyData.name) {
        fileName = `resumen-diagnostico-${surveyData.name.replace(/ /g, '_')}.txt`;
    }

    const blob = new Blob([summaryText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSendToSupabase = async () => {
    if (!surveyData) return;
    setIsLoading(true);
    setError(null);
    
    let result;
    if (selectedSector === 'health') {
        result = await handleSurveySubmission(surveyData as SurveyFormData);
        if (result.success) {
            setFormStep('sent');
        } else {
            setError(result.error || 'No se pudieron guardar los datos.');
        }
    } else {
        result = await handleGeneralSurveySubmission(surveyData as GeneralSurveyFormData);
        if (result.success) {
            setFormStep('general_sent');
        } else {
            setError(result.error || 'No se pudieron guardar los datos.');
        }
    }

    setIsLoading(false);
  };
  
  const resetFlow = () => {
    setIsLoading(false);
    setError(null);
    setSurveyData(null);
    setSummaryText('');
    setSelectedSector(null);
    setFormStep('sector');
    router.push(`/diagnostico`, { scroll: false });
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[40px] p-12 max-w-lg mx-auto shadow-2xl text-center">
            <Loader2 className="h-16 w-16 animate-spin text-white mx-auto mb-6" />
            <h2 className="text-2xl font-bold font-headline text-white">Procesando...</h2>
        </div>
      )
    }

    if (error) {
      return (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[40px] p-12 max-w-lg mx-auto shadow-2xl text-center">
            <ServerCrash className="h-16 w-16 text-red-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold font-headline text-white">¡Oops! Algo salió mal.</h2>
            <p className="mt-4 mb-8 text-gray-400">{error}</p>
            <button onClick={resetFlow} className="bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-full font-bold transition-colors w-full">Intentar de Nuevo</button>
        </div>
      );
    }
    
    switch (formStep) {
        case 'sector':
            return <SectorSelection onSelect={handleSectorSelect} />;
        case 'form':
            if (selectedSector === 'health') return <SurveyForm onSubmit={handleFormSubmit as (data: SurveyFormData) => void} />;
            if (selectedSector === 'general') return <GeneralSurveyForm onSubmit={handleFormSubmit as (data: GeneralSurveyFormData) => void} />;
            return null;
        case 'summary':
            return (
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[40px] p-8 md:p-12 max-w-2xl mx-auto shadow-2xl relative overflow-hidden text-center">
                  <div className="mb-10 relative z-10">
                     <h1 className="font-headline text-3xl md:text-5xl font-extrabold text-white mb-4">Paso Final</h1>
                     <span className="text-gray-400 uppercase tracking-widest text-sm font-bold">Revisa y Guarda tu Resumen</span>
                  </div>
                  <p className="mb-10 text-gray-300 text-lg relative z-10">Hemos generado un resumen de tus respuestas. Descárgalo para tus archivos y luego envíalo para que nuestro equipo lo revise.</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10 mb-8">
                      <button onClick={handleDownloadSummary} className="bg-transparent border border-white/20 text-white hover:bg-white/10 px-8 py-4 rounded-full font-bold transition-all duration-300 flex items-center justify-center">
                          <Download className="mr-2 h-5 w-5" />
                          Descargar
                      </button>
                      <button onClick={handleSendToSupabase} className="bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-full font-bold transition-all duration-300 flex items-center justify-center">
                          <Send className="mr-2 h-5 w-5" />
                          Enviar Diagnóstico
                      </button>
                  </div>
                  <button onClick={resetFlow} className="text-sm text-gray-500 hover:text-white underline transition-colors relative z-10">Volver al inicio</button>
              </div>
            );
        case 'sent':
            return <SuccessMessage onReset={resetFlow} />;
        case 'general_sent':
            return <GeneralSuccessMessage />;
        default:
            return null;
    }
  }

  return (
    <div className="z-10 relative container mx-auto px-4 sm:px-6">
        {renderContent()}
    </div>
  );
}
