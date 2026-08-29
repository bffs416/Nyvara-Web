"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { surveySchema } from "@/lib/schema";
import type { SurveyFormData } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { 
    Q1_ROLE_OPTIONS, Q2_SERVICES_OPTIONS, Q4_OPTIONS, Q5_OPTIONS, Q7_OPTIONS, 
    Q8_OPTIONS, Q9_OPTIONS, Q10_CHALLENGES_OPTIONS, Q11_OPTIONS, Q13_COLORS_OPTIONS
} from "@/lib/constants";
import { PlusCircle, Trash2 } from "lucide-react";
import { SAMPLE_SURVEY_DATA } from "@/lib/sample-data";
import { useRouter } from "next/navigation";

const TOTAL_STEPS = 15;

interface SurveyFormProps {
  onSubmit: (data: SurveyFormData) => void;
}

const getFieldNamesForStep = (step: number): (keyof SurveyFormData)[] => {
    const stepFields: Record<number, (keyof SurveyFormData)[]> = {
        0: ["q1_name", "q1_location", "q1_country", "q1_phone", "q1_experience", "q1_role"],
        1: ["q2_services", "q2_unique"],
        2: ["q3_persona"],
        3: ["q4_perception"],
        4: ["q5_emotions"],
        5: ["q6_why"],
        6: ["q7_differentiation", "q7_why"],
        7: ["q8_value"],
        8: ["q9_presence"],
        9: ["q10_rating", "q10_challenges"],
        10: ["q11_training", "q12_details"],
        11: ["q13_colors", "q14_hobby"],
        12: ["q15_final"],
        13: ["competitors"],
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

const GlassRadio = ({ name, value, label, register, isChecked }: any) => (
    <label className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${isChecked ? 'bg-white/10 border-white/50' : 'bg-black/40 border-white/10 hover:border-white/30 hover:bg-white/5'}`}>
        <input type="radio" value={value} {...register(name)} className="sr-only" />
        <div className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${isChecked ? 'border-white' : 'border-white/30'}`}>
            {isChecked && <div className="w-3 h-3 bg-white rounded-full" />}
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

export default function SurveyForm({ onSubmit }: SurveyFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<SurveyFormData>({
    resolver: zodResolver(surveySchema),
    mode: "onChange",
    defaultValues: {
      q1_name: "", q1_location: "", q1_country: "", q1_phone: "", q1_experience: undefined, q1_role: [], q1_role_other: "",
      q2_services: [], q2_unique: "", q2_other: "",
      q3_persona: "",
      q4_perception: [], q4_other: "", 
      q5_emotions: [], q5_other: "",
      q6_why: "",
      q7_differentiation: [], q7_why: "", q7_other: "",
      q8_value: [], q8_other: "",
      q9_presence: [], q9_other: "",
      q10_rating: 5, q10_challenges: [], q10_other: "",
      q11_training: undefined, q12_details: "",
      q13_colors: [], q13_other: "", q14_hobby: "", q15_final: "",
      competitors: [{ name: "" }],
    },
  });
  
  const { register, control, watch, trigger, formState: { errors } } = form;
  const { fields, append, remove } = useFieldArray({ control, name: "competitors" });
  const watchedName = watch("q1_name");

  useEffect(() => {
    if (watchedName === "0520") {
      form.reset(SAMPLE_SURVEY_DATA);
      toast({
        title: "¡Formulario Autocompletado!",
        description: "Se han cargado los datos de muestra.",
      });
    } else if (watchedName === "cotizar") {
        router.push('/cotizador');
    }
  }, [watchedName, form, toast, router]);


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
  
  const watchedRole = watch("q1_role") || [];
  const watchedServices = watch("q2_services") || [];
  const watchedPerception = watch("q4_perception") || [];
  const watchedEmotions = watch("q5_emotions") || [];
  const watchedDifferentiation = watch("q7_differentiation") || [];
  const watchedValue = watch("q8_value") || [];
  const watchedPresence = watch("q9_presence") || [];
  const watchedChallenges = watch("q10_challenges") || [];
  const watchedTraining = watch("q11_training");
  const watchedColors = watch("q13_colors") || [];
  const watchedRating = watch("q10_rating") || 5;

  const renderStep = () => {
      switch(currentStep) {
        case 0:
            return <>
                <div className="mb-8 border-b border-white/10 pb-4"><h2 className="font-headline text-2xl font-bold text-white uppercase tracking-wider">Sección 1: Información Básica</h2></div>
                <GlassInput name="q1_name" label="Nombre del profesional o la clínica" register={register} error={errors.q1_name} />
                <GlassInput name="q1_location" label="Ubicación de la clínica o consultorio" register={register} error={errors.q1_location} />
                <GlassInput name="q1_country" label="País" register={register} error={errors.q1_country} placeholder="Escribe tu país" />
                <GlassInput name="q1_phone" label="Número de contacto" type="tel" register={register} error={errors.q1_phone} />
                <GlassInput name="q1_experience" label="Años de experiencia en medicina estética" type="number" register={register} error={errors.q1_experience} onChange={(e:any) => form.setValue('q1_experience', e.target.value === '' ? undefined : +e.target.value)} />
                <div className="text-center font-bold text-lg text-white mb-6 mt-10">¿Cuál es tu cargo o rol principal?</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">{Q1_ROLE_OPTIONS.map(item => <GlassCheckbox key={item} name="q1_role" value={item} label={item} register={register} isChecked={watchedRole.includes(item)} />)}</div>
                {watchedRole?.includes("Otra especialidad") && <GlassInput name="q1_role_other" label="Por favor, especifica tu otra especialidad" placeholder="Ej: Especialista en Medicina Regenerativa" register={register} error={errors.q1_role_other} />}
            </>
        case 1:
            return <>
                <div className="mb-8 border-b border-white/10 pb-4"><h2 className="font-headline text-2xl font-bold text-white uppercase tracking-wider">Sección 1: Oferta de Servicios</h2></div>
                <div className="text-center font-bold text-lg text-white mb-6">Tratamientos y servicios principales (Selecciona los que apliquen)</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">{Q2_SERVICES_OPTIONS.map(item => <GlassCheckbox key={item} name="q2_services" value={item} label={item} register={register} isChecked={watchedServices.includes(item)} />)}</div>
                {watchedServices?.includes("Otro") && <GlassInput name="q2_other" label="Por favor, especifica otro servicio" placeholder="Ej: Terapia de quelación" register={register} error={errors.q2_other} />}
                <GlassTextarea name="q2_unique" label="¿Existen servicios o especialidades únicas que los diferencien?" placeholder="Ej: Nuestra técnica 'Renacer Lift'..." register={register} error={errors.q2_unique} />
            </>
        case 2:
            return <>
                <div className="mb-8 border-b border-white/10 pb-4"><h2 className="font-headline text-2xl font-bold text-white uppercase tracking-wider">Sección 2: Identidad y Valores</h2></div>
                <GlassTextarea name="q3_persona" label="Si tu marca personal fuera una persona, ¿quién sería y por qué?" placeholder="Ej: Sería un arquitecto de la belleza..." register={register} error={errors.q3_persona} />
            </>
        case 3:
            return <>
                <div className="mb-8 border-b border-white/10 pb-4"><h2 className="font-headline text-2xl font-bold text-white uppercase tracking-wider">Sección 2: Percepción de Marca</h2></div>
                <div className="text-center font-bold text-lg text-white mb-6">¿Qué imagen deseas que los pacientes tengan de ti? (Selecciona hasta 3)</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">{Q4_OPTIONS.map(item => <GlassCheckbox key={item} name="q4_perception" value={item} label={item} register={register} disabled={watchedPerception.length >= 3 && !watchedPerception.includes(item)} isChecked={watchedPerception.includes(item)} />)}</div>
                {errors.q4_perception && <p className="text-red-500 text-xs mt-1 mb-6 text-center">{errors.q4_perception.message}</p>}
                {watchedPerception?.includes("Otro") && <GlassTextarea name="q4_other" label="Por favor, especifica tu percepción" placeholder="Ej: Pionero en técnicas..." register={register} error={errors.q4_other} />}
            </>
        case 4:
            return <>
                <div className="mb-8 border-b border-white/10 pb-4"><h2 className="font-headline text-2xl font-bold text-white uppercase tracking-wider">Sección 2: Emociones a Evocar</h2></div>
                <div className="text-center font-bold text-lg text-white mb-6">¿Qué emociones quieres evocar en tus pacientes? (Selecciona hasta 3)</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">{Q5_OPTIONS.map(item => <GlassCheckbox key={item} name="q5_emotions" value={item} label={item} register={register} disabled={watchedEmotions.length >= 3 && !watchedEmotions.includes(item)} isChecked={watchedEmotions.includes(item)} />)}</div>
                 {errors.q5_emotions && <p className="text-red-500 text-xs mt-1 mb-6 text-center">{errors.q5_emotions.message}</p>}
                {watchedEmotions?.includes("Otro") && <GlassTextarea name="q5_other" label="Por favor, especifica qué emociones" placeholder="Ej: Serenidad, vitalidad, etc." register={register} error={errors.q5_other} />}
            </>
        case 5:
            return <>
                <div className="mb-8 border-b border-white/10 pb-4"><h2 className="font-headline text-2xl font-bold text-white uppercase tracking-wider">Sección 2: Tu Propósito</h2></div>
                <GlassTextarea name="q6_why" label="En 1-2 frases, describe el impacto que buscas generar en tus pacientes." placeholder="Ej: Quiero que mis pacientes se sientan la mejor versión..." register={register} error={errors.q6_why} />
            </>
        case 6:
            return <>
                <div className="mb-8 border-b border-white/10 pb-4"><h2 className="font-headline text-2xl font-bold text-white uppercase tracking-wider">Sección 3: Diferenciación</h2></div>
                <div className="text-center font-bold text-lg text-white mb-6">¿Cómo te diferencias de la competencia? (Selecciona hasta 3)</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">{Q7_OPTIONS.map(item => <GlassCheckbox key={item.value} name="q7_differentiation" value={item.label} label={item.label} register={register} disabled={watchedDifferentiation.length >= 3 && !watchedDifferentiation.includes(item.label)} isChecked={watchedDifferentiation.includes(item.label)} />)}</div>
                {errors.q7_differentiation && <p className="text-red-500 text-xs mt-1 mb-6 text-center">{errors.q7_differentiation.message}</p>}
                <GlassTextarea name="q7_why" label="Describe brevemente el elemento que seleccionaste." placeholder="¿Qué lo hace especial y único?" register={register} error={errors.q7_why} />
                {watchedDifferentiation?.includes("Otro") && <GlassTextarea name="q7_other" label="Por favor, especifica tu diferenciación" placeholder="Ej: Ofrezco consultas de seguimiento gratuitas por 6 meses." register={register} error={errors.q7_other} />}
            </>
        case 7:
            return <>
                <div className="mb-8 border-b border-white/10 pb-4"><h2 className="font-headline text-2xl font-bold text-white uppercase tracking-wider">Sección 3: Propuesta de Valor</h2></div>
                <div className="text-center font-bold text-lg text-white mb-6">¿Cuál es tu principal valor añadido para tus clientes? (Selecciona hasta 3)</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">{Q8_OPTIONS.map(item => <GlassCheckbox key={item} name="q8_value" value={item} label={item} register={register} disabled={watchedValue.length >= 3 && !watchedValue.includes(item)} isChecked={watchedValue.includes(item)} />)}</div>
                {errors.q8_value && <p className="text-red-500 text-xs mt-1 mb-6 text-center">{errors.q8_value.message}</p>}
                {watchedValue?.includes("Otro") && <GlassTextarea name="q8_other" label="Por favor, especifica tu valor añadido" placeholder="Ej: Diagnóstico facial con IA..." register={register} error={errors.q8_other} />}
            </>
        case 8:
            return <>
                <div className="mb-8 border-b border-white/10 pb-4"><h2 className="font-headline text-2xl font-bold text-white uppercase tracking-wider">Sección 4: Presencia Online</h2></div>
                <div className="text-center font-bold text-lg text-white mb-6">¿Qué canales de comunicación y redes sociales utilizas?</div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">{Q9_OPTIONS.map(item => <GlassCheckbox key={item} name="q9_presence" value={item} label={item} register={register} isChecked={watchedPresence.includes(item)} />)}</div>
                {watchedPresence?.includes("Otros") && <GlassTextarea name="q9_other" label="Por favor, especifica otros canales" placeholder="Ej: Publicaciones en revistas, podcasts, etc." register={register} error={errors.q9_other} />}
            </>
        case 9:
            return <>
                <div className="mb-8 border-b border-white/10 pb-4"><h2 className="font-headline text-2xl font-bold text-white uppercase tracking-wider">Sección 4: Marketing Digital</h2></div>
                <GlassSlider name="q10_rating" label="¿Cómo calificarías tu presencia digital actual?" min={1} max={10} value={watchedRating} onChange={(val: number) => form.setValue('q10_rating', val, { shouldValidate: true })} />
                <div className="text-center font-bold text-lg text-white mb-6 mt-10">¿Cuáles son tus mayores desafíos? (Selecciona hasta 3)</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">{Q10_CHALLENGES_OPTIONS.map(item => <GlassCheckbox key={item} name="q10_challenges" value={item} label={item} register={register} disabled={watchedChallenges.length >= 3 && !watchedChallenges.includes(item)} isChecked={watchedChallenges.includes(item)} />)}</div>
                {errors.q10_challenges && <p className="text-red-500 text-xs mt-1 mb-6 text-center">{errors.q10_challenges.message}</p>}
                {watchedChallenges?.includes("Otro") && <GlassTextarea name="q10_other" label="Por favor, especifica otro desafío" placeholder="Ej: Mantenerse actualizado..." register={register} error={errors.q10_other} />}
            </>
        case 10:
            return <>
                <div className="mb-8 border-b border-white/10 pb-4"><h2 className="font-headline text-2xl font-bold text-white uppercase tracking-wider">Sección 5: Visión a Futuro</h2></div>
                <div className="text-center font-bold text-lg text-white mb-6">¿Te interesa capacitar a otros profesionales?</div>
                <div className="grid grid-cols-1 gap-4 mb-6">{Q11_OPTIONS.map(item => <GlassRadio key={item.value} name="q11_training" value={item.label} label={item.label} register={register} isChecked={watchedTraining === item.label} />)}</div>
                {(watchedTraining === "Sí" || watchedTraining === "No lo había pensado, pero me gustaría saber más") && <GlassTextarea name="q12_details" label="¿En qué temas específicos te gustaría capacitar?" placeholder="Ej: Mi técnica de 'Lifting Facial no invasivo'..." register={register} error={errors.q12_details} />}
            </>
        case 11:
            return <>
                <div className="mb-8 border-b border-white/10 pb-4"><h2 className="font-headline text-2xl font-bold text-white uppercase tracking-wider">Sección 5: Preferencias Personales</h2></div>
                <div className="text-center font-bold text-lg text-white mb-6">Si tu marca tuviera una paleta de colores, ¿cuáles incluiría?</div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">{Q13_COLORS_OPTIONS.map(item => <GlassCheckbox key={item} name="q13_colors" value={item} label={item} register={register} isChecked={watchedColors.includes(item)} />)}</div>
                {watchedColors?.includes("Otro") && <GlassInput name="q13_other" label="Por favor, especifica otro color" placeholder="Ej: Turquesa, Coral, etc." register={register} error={errors.q13_other} />}
                <GlassTextarea name="q14_hobby" label="¿Qué te gusta hacer en tu tiempo libre? (Opcional)" placeholder="¿Algún hobby o interés que te apasione?" register={register} error={errors.q14_hobby} />
            </>
        case 12:
            return <>
                <div className="mb-8 border-b border-white/10 pb-4"><h2 className="font-headline text-2xl font-bold text-white uppercase tracking-wider">Reflexión Final</h2></div>
                <GlassTextarea name="q15_final" label="¿Cómo visualizas tu negocio en 2 años? ¿Cuál es la necesidad más urgente que tienes hoy o qué esperas lograr con nuestra ayuda?" placeholder="Ej: En 2 años, veo mi clínica como un referente..." register={register} error={errors.q15_final} rows={5}/>
            </>
        case 13:
            return <>
                <div className="mb-8 border-b border-white/10 pb-4"><h2 className="font-headline text-2xl font-bold text-white uppercase tracking-wider">Análisis de Competencia (Opcional)</h2></div>
                <label className="block text-gray-400 font-bold mb-4 uppercase text-xs tracking-wider">Nombra algunos competidores clave para enriquecer el análisis.</label>
                {fields.map((field, index) => (
                    <div className="flex items-center gap-2 mb-4" key={field.id}>
                        <input className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-gray-600 focus:border-white/50 focus:bg-white/10 outline-none transition-all duration-300" placeholder={`Nombre del competidor ${index + 1}`} {...register(`competitors.${index}.name`)} />
                        <button type="button" className="p-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-2xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => remove(index)} disabled={fields.length <= 1}><Trash2 className="h-5 w-5" /></button>
                    </div>
                ))}
                <button type="button" className="flex items-center justify-center w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl px-5 py-4 transition-all duration-300 font-bold mt-4" onClick={() => append({ name: '' })}><PlusCircle className="mr-2 h-5 w-5" />Añadir Competidor</button>
            </>
        case 14:
            return <>
                <div className="mb-8 border-b border-white/10 pb-4"><h2 className="font-headline text-2xl font-bold text-white uppercase tracking-wider">¡Casi listo!</h2></div>
                <p className="text-center text-lg text-gray-300 my-12">Has completado todas las preguntas. Haz clic en el botón de abajo para generar el resumen de tu diagnóstico. Podrás revisarlo antes de enviarlo.</p>
            </>
        default:
          return null;
      }
  }

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[40px] p-6 md:p-12 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
        <header className="text-center mb-12 relative z-10">
            <h1 className="font-headline text-4xl sm:text-5xl font-extrabold text-white mb-4">Diagnóstico</h1>
            <span className="text-gray-400 uppercase tracking-widest text-sm font-bold">Descubre el potencial de tu marca</span>
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
