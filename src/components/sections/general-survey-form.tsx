"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generalSurveySchema } from "@/lib/schema";
import type { GeneralSurveyFormData } from "@/lib/types";
import { INTERESTED_SERVICES_OPTIONS, GENERAL_CHALLENGES_OPTIONS } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { SAMPLE_GENERAL_SURVEY_DATA } from "@/lib/sample-data";

interface GeneralSurveyFormProps {
  onSubmit: (data: GeneralSurveyFormData) => void;
}

const TOTAL_STEPS = 8;

const getFieldNamesForStep = (step: number): (keyof GeneralSurveyFormData)[] => {
    const stepFields: Record<number, (keyof GeneralSurveyFormData)[]> = {
        0: ["name", "company", "role", "phone", "email"],
        1: ["target_audience", "business_description"],
        2: ["main_services", "value_proposition"],
        3: ["marketing_rating"],
        4: ["challenges", "challenges_cost"],
        5: ["goals", "growth_expectation", "avg_customer_value"],
        6: ["competitors"],
        7: ["interested_services", "additional_info"],
    };
    return stepFields[step] || [];
}

const GlassInput = ({ name, label, placeholder, type = 'text', register, error, ...props }: any) => (
    <div className="mb-6">
        <label htmlFor={name} className="block text-gray-400 font-bold mb-2 uppercase text-xs tracking-wider">{label}</label>
        <input id={name} type={type} placeholder={placeholder} {...register(name)} {...props} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-gray-600 focus:border-white/50 focus:bg-white/10 outline-none transition-all duration-300" />
        {error && <p className="text-red-500 text-xs mt-2">{error.message}</p>}
    </div>
);

const GlassTextarea = ({ name, label, placeholder, register, error, ...props }: any) => (
    <div className="mb-6">
        <label htmlFor={name} className="block text-gray-400 font-bold mb-2 uppercase text-xs tracking-wider">{label}</label>
        <textarea id={name} placeholder={placeholder} {...register(name)} {...props} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-gray-600 focus:border-white/50 focus:bg-white/10 outline-none transition-all duration-300 min-h-[120px] resize-y"></textarea>
        {error && <p className="text-red-500 text-xs mt-2">{error.message}</p>}
    </div>
);

const GlassCheckbox = ({ name, value, label, register, disabled, isChecked }: any) => (
    <label className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${isChecked ? 'bg-white/10 border-white/50' : 'bg-black/40 border-white/10 hover:border-white/30 hover:bg-white/5'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
        <input type="checkbox" value={value} {...register(name)} disabled={disabled} className="sr-only" />
        <div className={`w-6 h-6 rounded-md border flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${isChecked ? 'bg-white border-white' : 'border-white/30'}`}>
            {isChecked && <div className="w-3 h-3 bg-black rounded-sm" />}
        </div>
        <span className={`font-semibold ${isChecked ? 'text-white' : 'text-gray-300'}`}>{label}</span>
    </label>
);

const GlassSlider = ({ name, label, min, max, value, onChange }: any) => {
    const percentage = ((value - min) / (max - min)) * 100;
    return (
        <div className="mb-8">
            <label className="block text-gray-400 font-bold mb-6 uppercase text-xs tracking-wider text-center">{label}</label>
            <div className="relative py-4">
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-white transition-all duration-300" style={{ width: `${percentage}%` }} />
                </div>
                <div 
                    className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)] border-2 border-black cursor-pointer pointer-events-none transition-all duration-300"
                    style={{ left: `calc(${percentage}% - 12px)` }}
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    onChange={(e) => onChange(parseInt(e.target.value))}
                    className="w-full h-full opacity-0 absolute top-0 left-0 cursor-pointer"
                />
            </div>
             <div className="text-center font-headline text-4xl text-white font-bold mt-4">{value}</div>
        </div>
    );
};

export default function GeneralSurveyForm({ onSubmit }: GeneralSurveyFormProps) {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  
  const form = useForm<GeneralSurveyFormData>({
    resolver: zodResolver(generalSurveySchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      company: "",
      role: "",
      phone: "",
      email: "",
      business_description: "",
      main_services: "",
      target_audience: "",
      goals: "",
      challenges: [],
      challenges_cost: "",
      value_proposition: "",
      marketing_rating: 5,
      growth_expectation: undefined,
      avg_customer_value: undefined,
      interested_services: [],
      additional_info: "",
      competitors: ""
    },
  });

  const { register, control, watch, trigger, formState: { errors } } = form;
  const watchedName = watch("name");
  const watchedRating = watch("marketing_rating");
  const watchedChallenges = watch("challenges");

  useEffect(() => {
    if (watchedName === "0520") {
      form.reset(SAMPLE_GENERAL_SURVEY_DATA);
      toast({
        title: "¡Formulario Autocompletado!",
        description: "Se han cargado los datos de muestra para la encuesta general.",
      });
    }
  }, [watchedName, form, toast]);

  const handleNext = async () => {
    const fieldsToValidate = getFieldNamesForStep(currentStep);
    const isStepValid = await trigger(fieldsToValidate);
    
    if (isStepValid && currentStep < TOTAL_STEPS - 1) {
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const renderStep = () => {
      switch (currentStep) {
        case 0:
          return (
            <>
              <div className="mb-8 border-b border-white/10 pb-4"><h2 className="font-headline text-2xl font-bold text-white uppercase tracking-wider">Pilar 1: Sus Datos Fundamentales</h2></div>
              <GlassInput name="name" label="Nombre Completo" register={register} error={errors.name} />
              <GlassInput name="company" label="Nombre de la Empresa" register={register} error={errors.company} />
              <GlassInput name="role" label="Tu Cargo o Rol" register={register} error={errors.role} />
              <GlassInput name="phone" label="Número de Teléfono" type="tel" register={register} error={errors.phone} />
              <GlassInput name="email" label="Email" type="email" register={register} error={errors.email} />
            </>
          );
        case 1:
          return (
            <>
              <div className="mb-8 border-b border-white/10 pb-4"><h2 className="font-headline text-2xl font-bold text-white uppercase tracking-wider">Pilar 2: Claridad de Marca y Conexión Emocional</h2></div>
              <GlassTextarea name="target_audience" label="¿Quién es su cliente o público ideal? (Descríbalo con detalle)" register={register} error={errors.target_audience} />
              <GlassTextarea name="business_description" label="Describe brevemente tu negocio y el propósito que lo impulsa" register={register} error={errors.business_description} />
            </>
          );
        case 2:
            return (
                <>
                    <div className="mb-8 border-b border-white/10 pb-4"><h2 className="font-headline text-2xl font-bold text-white uppercase tracking-wider">Pilar 3: Su Ventaja Competitiva</h2></div>
                    <GlassTextarea name="main_services" label="¿Cuáles son sus productos o servicios principales?" register={register} error={errors.main_services} />
                    <GlassTextarea name="value_proposition" label="Si tuviera que resumir su Propuesta de Valor en una sola frase, ¿cuál sería?" placeholder="Ej: 'Ayudamos a las empresas a ahorrar tiempo automatizando sus finanzas con un software intuitivo'." register={register} error={errors.value_proposition} />
                </>
            )
        case 3:
            return (
                <>
                    <div className="mb-8 border-b border-white/10 pb-4"><h2 className="font-headline text-2xl font-bold text-white uppercase tracking-wider">Pilar 4: Diagnóstico de Eficacia Digital</h2></div>
                    <GlassSlider 
                        name="marketing_rating" 
                        label="En una escala de 1 a 10, ¿qué tan eficaz considera su marketing digital actual? (1 es ineficaz, 10 es líder del sector)" 
                        min={1} 
                        max={10} 
                        value={watchedRating} 
                        onChange={(val: number) => form.setValue('marketing_rating', val, { shouldValidate: true })} 
                    />
                </>
            )
        case 4:
            const challengesValue = watch('challenges') || [];
            return (
                <>
                    <div className="mb-8 border-b border-white/10 pb-4"><h2 className="font-headline text-2xl font-bold text-white uppercase tracking-wider">Pilar 4: Desafíos y Oportunidades</h2></div>
                    <label className="block text-gray-400 font-bold mb-4 uppercase text-xs tracking-wider text-center">¿Cuáles son los mayores desafíos o frustraciones que enfrenta actualmente? (Seleccione hasta 3)</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        {GENERAL_CHALLENGES_OPTIONS.map(item => (
                            <GlassCheckbox 
                                key={item} 
                                name="challenges" 
                                value={item} 
                                label={item} 
                                register={register} 
                                disabled={challengesValue.length >= 3 && !challengesValue.includes(item)}
                                isChecked={challengesValue.includes(item)}
                            />
                        ))}
                    </div>
                    {errors.challenges && <p className="text-red-500 text-xs mt-1 text-center mb-6">{errors.challenges.message}</p>}
                    {(watchedChallenges && watchedChallenges.length > 0) &&
                        <GlassTextarea name="challenges_cost" label="¿Cuál es el costo real (en tiempo, dinero u oportunidades perdidas) de no resolver su principal desafío en los próximos 6 meses?" register={register} error={errors.challenges_cost} />
                    }
                </>
            )
        case 5:
             return (
                <>
                    <div className="mb-8 border-b border-white/10 pb-4"><h2 className="font-headline text-2xl font-bold text-white uppercase tracking-wider">Pilar 5: Visión, Metas y Recursos</h2></div>
                    <GlassTextarea name="goals" label="¿Cuáles son los principales objetivos de negocio que quiere alcanzar en los próximos 6-12 meses?" register={register} error={errors.goals} />
                    <GlassInput name="growth_expectation" label="¿Cuál es el % de crecimiento que espera alcanzar en los próximos 12 meses?" type="number" register={register} error={errors.growth_expectation} placeholder="Ej: 25" onChange={(e: React.ChangeEvent<HTMLInputElement>) => form.setValue('growth_expectation', e.target.value === '' ? undefined : +e.target.value)} />
                    <GlassInput name="avg_customer_value" label="¿Cuál es el valor promedio (Lifetime Value) de un cliente para su negocio? (Opcional)" type="number" register={register} error={errors.avg_customer_value} placeholder="Ej: 5000000" onChange={(e: React.ChangeEvent<HTMLInputElement>) => form.setValue('avg_customer_value', e.target.value === '' ? undefined : +e.target.value)} />
                </>
             )
        case 6:
            return (
                <>
                    <div className="mb-8 border-b border-white/10 pb-4"><h2 className="font-headline text-2xl font-bold text-white uppercase tracking-wider">Pilar 6: Análisis del Entorno Competitivo</h2></div>
                    <GlassTextarea name="competitors" label="Al analizar a sus competidores, ¿siente que ellos han logrado el 'Product-Market Fit' que usted está buscando? Nómbrelos y describa brevemente qué hacen bien." placeholder="Ej: Competidor A: Tienen una marca muy fuerte en redes sociales. Competidor B: Su producto es más fácil de usar." register={register} error={errors.competitors} />
                </>
            )
        case 7:
            const interestedServicesValue = watch('interested_services') || [];
            return (
                 <>
                    <div className="mb-8 border-b border-white/10 pb-4"><h2 className="font-headline text-2xl font-bold text-white uppercase tracking-wider">Paso Final: Áreas de Interés</h2></div>
                     <label className="block text-gray-400 font-bold mb-4 uppercase text-xs tracking-wider text-center">Para finalizar, ¿en qué áreas de servicio de Nyvara está más interesado/a?</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        {INTERESTED_SERVICES_OPTIONS.map(item => (
                             <GlassCheckbox 
                                key={item} 
                                name="interested_services" 
                                value={item} 
                                label={item} 
                                register={register} 
                                isChecked={interestedServicesValue.includes(item)}
                            />
                        ))}
                    </div>
                     {errors.interested_services && <p className="text-red-500 text-xs mt-1 text-center mb-6">{errors.interested_services.message}</p>}

                    <GlassTextarea name="additional_info" label="¿Hay algo más que considere importante que sepamos para este diagnóstico?" register={register} error={errors.additional_info} />
                 </>
            )
          default:
            return null;
      }
  }


  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[40px] p-6 md:p-12 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
        <header className="text-center mb-12 relative z-10">
            <h1 className="font-headline text-4xl sm:text-5xl font-extrabold text-white mb-4">ADN</h1>
            <span className="text-gray-400 uppercase tracking-widest text-sm font-bold">Análisis de Necesidades Estratégicas</span>
        </header>

         <div className="mb-12 relative z-10">
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-white transition-all duration-500 ease-out" style={{ width: `${((currentStep + 1) / TOTAL_STEPS) * 100}%` }}></div>
            </div>
            <div className="text-right text-xs font-bold text-gray-400 mt-2 uppercase tracking-widest">{`${Math.round(((currentStep + 1) / TOTAL_STEPS) * 100)}% COMPLETADO`}</div>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="relative z-10">
            <div className="min-h-[400px]">
                {renderStep()}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mt-12 pt-8 border-t border-white/10 gap-6">
                <button type="button" onClick={handlePrev} disabled={currentStep === 0} className="w-full sm:w-auto bg-transparent border border-white/20 text-white hover:bg-white/10 px-8 py-3 rounded-full font-bold transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed">Anterior</button>
                <div className="text-sm font-bold text-gray-500 tracking-widest uppercase">PASO {String(currentStep + 1).padStart(2, '0')} DE {String(TOTAL_STEPS).padStart(2, '0')}</div>
                 {currentStep < TOTAL_STEPS - 1 ? (
                  <button type="button" onClick={handleNext} className="w-full sm:w-auto bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-full font-bold transition-all duration-300">Siguiente →</button>
                ) : (
                  <button type="submit" className="w-full sm:w-auto bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-full font-bold transition-all duration-300">Generar Resumen</button>
                )}
            </div>
        </form>
    </div>
  );
}
