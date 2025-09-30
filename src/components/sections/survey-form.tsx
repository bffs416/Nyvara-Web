
"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { surveySchema } from "@/lib/schema";
import type { SurveyFormData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { 
    Q1_ROLE_OPTIONS, Q2_SERVICES_OPTIONS, Q4_OPTIONS, Q5_OPTIONS, Q7_OPTIONS, 
    Q8_OPTIONS, Q9_OPTIONS, Q10_CHALLENGES_OPTIONS, Q11_OPTIONS, Q13_COLORS_OPTIONS
} from "@/lib/constants";
import { PlusCircle, Trash2 } from "lucide-react";
import { SAMPLE_SURVEY_DATA } from "@/lib/sample-data";
import { useRouter } from "next/navigation";


const TOTAL_STEPS = 14;

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
  
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "competitors",
  });
  
  const watchedName = form.watch("q1_name");

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
    const isStepValid = await form.trigger(fieldsToValidate);
    
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
  
  const watchedRole = form.watch("q1_role");
  const watchedServices = form.watch("q2_services");
  const watchedPerception = form.watch("q4_perception");
  const watchedEmotions = form.watch("q5_emotions");
  const watchedDifferentiation = form.watch("q7_differentiation");
  const watchedValue = form.watch("q8_value");
  const watchedPresence = form.watch("q9_presence");
  const watchedChallenges = form.watch("q10_challenges");
  const watchedTraining = form.watch("q11_training");
  const watchedColors = form.watch("q13_colors");
  const watchedRating = form.watch("q10_rating");


  return (
    <>
      <div className="w-full bg-secondary rounded-full h-2.5 mb-8 shadow-inner">
        <Progress value={(currentStep / (TOTAL_STEPS - 1)) * 100} className="h-2.5" />
      </div>
      <Card className="shadow-2xl relative min-h-[500px]">
        <CardContent className="p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className={currentStep === 0 ? 'block' : 'hidden'}>
                <h2 className="font-headline text-3xl text-primary mb-6">Sección 1: Información Básica</h2>
                <div className="space-y-6">
                  <FormField name="q1_name" control={form.control} render={({ field }) => <FormItem><FormLabel>Nombre del profesional o la clínica</FormLabel><FormControl><Input {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>} />
                  <FormField name="q1_location" control={form.control} render={({ field }) => <FormItem><FormLabel>Ubicación de la clínica o consultorio</FormLabel><FormControl><Input {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>} />
                  <FormField name="q1_country" control={form.control} render={({ field }) => <FormItem><FormLabel>País</FormLabel><FormControl><Input {...field} value={field.value ?? ""} placeholder="Escribe tu país" /></FormControl><FormMessage /></FormItem>} />
                  <FormField name="q1_phone" control={form.control} render={({ field }) => <FormItem><FormLabel>Número de contacto</FormLabel><FormControl><Input type="tel" {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>} />
                  <FormField name="q1_experience" control={form.control} render={({ field }) => <FormItem><FormLabel>Años de experiencia en medicina estética</FormLabel><FormControl><Input type="number" {...field} value={field.value ?? ''} onChange={e => field.onChange(e.target.value === '' ? undefined : +e.target.value)} /></FormControl><FormMessage /></FormItem>} />
                  
                  <FormField name="q1_role" control={form.control} render={() => (
                    <FormItem>
                        <FormLabel>¿Cuál es tu cargo o rol principal?</FormLabel>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{Q1_ROLE_OPTIONS.map(item => (<FormField key={item} control={form.control} name="q1_role" render={({ field }) => (<FormItem className="flex flex-row items-start space-x-3 space-y-0 bg-secondary p-3 rounded-md"><FormControl><Checkbox checked={field.value?.includes(item)} onCheckedChange={(checked) => {return checked ? field.onChange([...(field.value || []), item]) : field.onChange(field.value?.filter(value => value !== item))}} /></FormControl><FormLabel className="font-normal cursor-pointer">{item}</FormLabel></FormItem>)}/>))}</div>
                        <FormMessage />
                    </FormItem>
                  )} />
                  {watchedRole?.includes("Otra especialidad") && (
                    <FormField name="q1_role_other" control={form.control} render={({ field }) => <FormItem><FormLabel>Por favor, especifica tu otra especialidad</FormLabel><FormControl><Input placeholder="Ej: Especialista en Medicina Regenerativa" {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>} />
                  )}
                </div>
              </div>

              <div className={currentStep === 1 ? 'block' : 'hidden'}>
                <h2 className="font-headline text-3xl text-primary mb-2">Sección 1: Oferta de Servicios</h2>
                <p className="text-muted-foreground mb-6">Cuéntanos qué ofreces a tus pacientes. (Selecciona los que apliquen)</p>
                
                 <FormField name="q2_services" control={form.control} render={() => (
                    <FormItem>
                        <FormLabel>Tratamientos y servicios principales</FormLabel>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{Q2_SERVICES_OPTIONS.map(item => (<FormField key={item} control={form.control} name="q2_services" render={({ field }) => (<FormItem className="flex flex-row items-start space-x-3 space-y-0 bg-secondary p-3 rounded-md"><FormControl><Checkbox checked={field.value?.includes(item)} onCheckedChange={(checked) => {return checked ? field.onChange([...(field.value || []), item]) : field.onChange(field.value?.filter(value => value !== item))}} /></FormControl><FormLabel className="font-normal cursor-pointer">{item}</FormLabel></FormItem>)}/>))}</div>
                        <FormMessage />
                    </FormItem>
                 )} />
                  {watchedServices?.includes("Otro") && (
                    <FormField name="q2_other" control={form.control} render={({ field }) => <FormItem className="mt-4"><FormLabel>Por favor, especifica otro servicio</FormLabel><FormControl><Input placeholder="Ej: Terapia de quelación" {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>} />
                  )}
                
                <FormField name="q2_unique" control={form.control} render={({ field }) => <FormItem className="mt-6"><FormLabel>¿Existen servicios o especialidades únicas que los diferencien?</FormLabel><FormControl><Textarea rows={4} placeholder="Ej: Nuestra técnica 'Renacer Lift' combina hilos tensores con bioestimuladores para un resultado natural sin cirugía." {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>} />
              </div>

              <div className={currentStep === 2 ? 'block' : 'hidden'}>
                <h2 className="font-headline text-3xl text-primary mb-2">Sección 2: Identidad y Valores</h2>
                <p className="text-muted-foreground mb-6">Vamos a definir la personalidad de tu marca.</p>
                <FormField name="q3_persona" control={form.control} render={({ field }) => <FormItem><FormLabel>Si tu marca personal fuera una persona, ¿quién sería y por qué?</FormLabel><FormControl><Textarea rows={4} placeholder="Ej: Sería un arquitecto de la belleza: preciso, artístico y enfocado en construir estructuras faciales armoniosas que perduren en el tiempo." {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>} />
              </div>
              
              <div className={currentStep === 3 ? 'block' : 'hidden'}>
                <h2 className="font-headline text-3xl text-primary mb-2">Sección 2: Percepción de Marca</h2>
                <p className="text-muted-foreground mb-6">¿Qué imagen deseas que los pacientes tengan de ti? (Selecciona hasta 3)</p>
                <FormField
                  name="q4_perception"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Q4_OPTIONS.map((item) => (
                          <FormField
                            key={item}
                            control={form.control}
                            name="q4_perception"
                            render={({ field: checkboxField }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 bg-secondary p-3 rounded-md">
                                <FormControl>
                                  <Checkbox
                                    checked={checkboxField.value?.includes(item)}
                                    disabled={(checkboxField.value?.length ?? 0) >= 3 && !checkboxField.value?.includes(item)}
                                    onCheckedChange={(checked) => {
                                      const current = checkboxField.value || [];
                                      if (checked) {
                                        if (current.length < 3) checkboxField.onChange([...current, item]);
                                      } else {
                                        checkboxField.onChange(current.filter((value) => value !== item));
                                      }
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">{item}</FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 {watchedPerception?.includes("Otro") && (
                    <FormField name="q4_other" control={form.control} render={({ field }) => <FormItem className="mt-4"><FormLabel>Por favor, especifica tu percepción</FormLabel><FormControl><Textarea rows={3} placeholder="Ej: Pionero en técnicas de rejuvenecimiento sin dolor" {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>} />
                )}
              </div>
              
              <div className={currentStep === 4 ? 'block' : 'hidden'}>
                <h2 className="font-headline text-3xl text-primary mb-2">Sección 2: Emociones a Evocar</h2>
                <p className="text-muted-foreground mb-6">¿Qué emociones quieres evocar en tus pacientes? (Selecciona hasta 3)</p>
                <FormField
                  name="q5_emotions"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Q5_OPTIONS.map((item) => (
                          <FormField
                            key={item}
                            control={form.control}
                            name="q5_emotions"
                            render={({ field: checkboxField }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 bg-secondary p-3 rounded-md">
                                <FormControl>
                                  <Checkbox
                                    checked={checkboxField.value?.includes(item)}
                                    disabled={(checkboxField.value?.length ?? 0) >= 3 && !checkboxField.value?.includes(item)}
                                    onCheckedChange={(checked) => {
                                      const current = checkboxField.value || [];
                                      if (checked) {
                                        if (current.length < 3) checkboxField.onChange([...current, item]);
                                      } else {
                                        checkboxField.onChange(current.filter((value) => value !== item));
                                      }
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">{item}</FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 {watchedEmotions?.includes("Otro") && (
                    <FormField name="q5_other" control={form.control} render={({ field }) => <FormItem className="mt-4"><FormLabel>Por favor, especifica qué emociones</FormLabel><FormControl><Textarea rows={3} placeholder="Ej: Serenidad, vitalidad, etc." {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>} />
                )}
              </div>

              <div className={currentStep === 5 ? 'block' : 'hidden'}>
                 <h2 className="font-headline text-3xl text-primary mb-2">Sección 2: Tu Propósito</h2>
                 <p className="text-muted-foreground mb-6">Más allá del negocio, ¿cuál es tu misión?</p>
                 <FormField name="q6_why" control={form.control} render={({ field }) => <FormItem><FormLabel>En 1-2 frases, describe el impacto que buscas generar en tus pacientes.</FormLabel><FormControl><Textarea rows={4} placeholder="Ej: Quiero que mis pacientes se sientan la mejor versión de sí mismos, restaurando su confianza y bienestar a través de resultados sutiles y elegantes." {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>} />
              </div>

              <div className={currentStep === 6 ? 'block' : 'hidden'}>
                <h2 className="font-headline text-3xl text-primary mb-2">Sección 3: Diferenciación</h2>
                <p className="text-muted-foreground mb-6">¿Cómo te diferencias de la competencia? (Selecciona hasta 3)</p>
                <FormField
                  name="q7_differentiation"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Q7_OPTIONS.map((item) => (
                          <FormField
                            key={item.value}
                            control={form.control}
                            name="q7_differentiation"
                            render={({ field: checkboxField }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 bg-secondary p-3 rounded-md">
                                <FormControl>
                                  <Checkbox
                                    checked={checkboxField.value?.includes(item.label)}
                                    disabled={(checkboxField.value?.length ?? 0) >= 3 && !checkboxField.value?.includes(item.label)}
                                    onCheckedChange={(checked) => {
                                      const current = checkboxField.value || [];
                                      if (checked) {
                                        if (current.length < 3) checkboxField.onChange([...current, item.label]);
                                      } else {
                                        checkboxField.onChange(current.filter((value) => value !== item.label));
                                      }
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">{item.label}</FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField name="q7_why" control={form.control} render={({ field }) => <FormItem className="mt-4"><FormLabel>Describe brevemente el elemento que seleccionaste.</FormLabel><FormControl><Textarea rows={3} placeholder="¿Qué lo hace especial y único?" {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>} />
                {watchedDifferentiation?.includes("Otro") && (
                    <FormField name="q7_other" control={form.control} render={({ field }) => <FormItem className="mt-4"><FormLabel>Por favor, especifica tu diferenciación</FormLabel><FormControl><Textarea rows={3} placeholder="Ej: Ofrezco consultas de seguimiento gratuitas por 6 meses." {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>} />
                )}
              </div>

              <div className={currentStep === 7 ? 'block' : 'hidden'}>
                <h2 className="font-headline text-3xl text-primary mb-2">Sección 3: Propuesta de Valor</h2>
                <p className="text-muted-foreground mb-6">¿Cuál es tu principal valor añadido para tus clientes? (Selecciona hasta 3)</p>
                <FormField
                  name="q8_value"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Q8_OPTIONS.map((item) => (
                          <FormField
                            key={item}
                            control={form.control}
                            name="q8_value"
                            render={({ field: checkboxField }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 bg-secondary p-3 rounded-md">
                                <FormControl>
                                  <Checkbox
                                    checked={checkboxField.value?.includes(item)}
                                    disabled={(checkboxField.value?.length ?? 0) >= 3 && !checkboxField.value?.includes(item)}
                                    onCheckedChange={(checked) => {
                                      const current = checkboxField.value || [];
                                      if (checked) {
                                        if (current.length < 3) checkboxField.onChange([...current, item]);
                                      } else {
                                        checkboxField.onChange(current.filter((value) => value !== item));
                                      }
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">{item}</FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 {watchedValue?.includes("Otro") && (
                    <FormField name="q8_other" control={form.control} render={({ field }) => <FormItem className="mt-4"><FormLabel>Por favor, especifica tu valor añadido</FormLabel><FormControl><Textarea rows={3} placeholder="Ej: Diagnóstico facial con IA antes de cada procedimiento." {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>} />
                )}
              </div>

              <div className={currentStep === 8 ? 'block' : 'hidden'}>
                <h2 className="font-headline text-3xl text-primary mb-2">Sección 4: Presencia Online</h2>
                <p className="text-muted-foreground mb-6">¿Qué canales de comunicación y redes sociales utilizas?</p>
                <FormField name="q9_presence" control={form.control} render={() => (<FormItem><div className="grid grid-cols-2 md:grid-cols-3 gap-4">{Q9_OPTIONS.map(item => (<FormField key={item} control={form.control} name="q9_presence" render={({ field }) => (<FormItem className="flex flex-row items-start space-x-3 space-y-0 bg-secondary p-3 rounded-md"><FormControl><Checkbox checked={field.value?.includes(item)} onCheckedChange={(checked) => {return checked ? field.onChange([...(field.value || []), item]) : field.onChange(field.value?.filter(value => value !== item))}} /></FormControl><FormLabel className="font-normal cursor-pointer">{item}</FormLabel></FormItem>)}/>))}</div><FormMessage /></FormItem>)} />
                 {watchedPresence?.includes("Otros") && (
                    <FormField name="q9_other" control={form.control} render={({ field }) => <FormItem className="mt-4"><FormLabel>Por favor, especifica otros canales</FormLabel><FormControl><Textarea rows={3} placeholder="Ej: Publicaciones en revistas, podcasts, etc." {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>} />
                )}
              </div>

              <div className={currentStep === 9 ? 'block' : 'hidden'}>
                <h2 className="font-headline text-3xl text-primary mb-2">Sección 4: Marketing Digital</h2>
                <p className="text-muted-foreground mb-6">¿Cómo calificarías tu presencia digital actual?</p>
                <FormField name="q10_rating" control={form.control} render={({ field }) => <FormItem>
                  <div className="flex items-center space-x-4"><span className="text-sm">Baja (1)</span><FormControl><Slider min={1} max={10} step={1} defaultValue={[field.value ?? 5]} onValueChange={(vals) => field.onChange(vals[0])} /></FormControl><span className="text-sm">Fuerte (10)</span></div>
                  <div className="text-center mt-4 text-xl font-bold text-primary">{watchedRating}</div>
                <FormMessage /></FormItem>} />
                <p className="text-muted-foreground mb-6 mt-8">¿Cuáles son tus mayores desafíos? (Selecciona hasta 3)</p>
                <FormField
                  name="q10_challenges"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Q10_CHALLENGES_OPTIONS.map((item) => (
                          <FormField
                            key={item}
                            control={form.control}
                            name="q10_challenges"
                            render={({ field: checkboxField }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 bg-secondary p-3 rounded-md">
                                <FormControl>
                                  <Checkbox
                                    checked={checkboxField.value?.includes(item)}
                                    disabled={(checkboxField.value?.length ?? 0) >= 3 && !checkboxField.value?.includes(item)}
                                    onCheckedChange={(checked) => {
                                      const current = checkboxField.value || [];
                                      if (checked) {
                                        if (current.length < 3) checkboxField.onChange([...current, item]);
                                      } else {
                                        checkboxField.onChange(current.filter((value) => value !== item));
                                      }
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">{item}</FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {watchedChallenges?.includes("Otro") && (
                    <FormField name="q10_other" control={form.control} render={({ field }) => <FormItem className="mt-4"><FormLabel>Por favor, especifica otro desafío</FormLabel><FormControl><Textarea rows={3} placeholder="Ej: Mantenerse actualizado con las nuevas tendencias." {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>} />
                )}
              </div>
              
              <div className={currentStep === 10 ? 'block' : 'hidden'}>
                <h2 className="font-headline text-3xl text-primary mb-2">Sección 5: Visión a Futuro</h2>
                <p className="text-muted-foreground mb-6">¿Te interesa capacitar a otros profesionales?</p>
                <FormField name="q11_training" control={form.control} render={({ field }) => <FormItem><FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value ?? undefined} className="space-y-3">{Q11_OPTIONS.map(item => (<FormItem key={item.value} className="flex items-center space-x-3 space-y-0 bg-secondary p-3 rounded-md"><FormControl><RadioGroupItem value={item.label} /></FormControl><FormLabel className="font-normal cursor-pointer">{item.label}</FormLabel></FormItem>))}</RadioGroup></FormControl><FormMessage /></FormItem>} />
                {(watchedTraining === "Sí" || watchedTraining === "No lo había pensado, pero me gustaría saber más") && (
                  <FormField name="q12_details" control={form.control} render={({ field }) => <FormItem className="mt-4"><FormLabel>¿En qué temas específicos te gustaría capacitar?</FormLabel><FormControl><Textarea rows={3} placeholder="Ej: Mi técnica de 'Lifting Facial no invasivo'..." {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>} />
                )}
              </div>
              
              <div className={currentStep === 11 ? 'block' : 'hidden'}>
                <h2 className="font-headline text-3xl text-primary mb-2">Sección 5: Preferencias Personales</h2>
                <p className="text-muted-foreground mb-6">Un toque final para humanizar tu marca.</p>
                
                 <FormField name="q13_colors" control={form.control} render={() => (
                    <FormItem>
                        <FormLabel>Si tu marca tuviera una paleta de colores, ¿cuáles incluiría? (Selecciona tus preferidos)</FormLabel>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">{Q13_COLORS_OPTIONS.map(item => (<FormField key={item} control={form.control} name="q13_colors" render={({ field }) => (<FormItem className="flex flex-row items-start space-x-3 space-y-0 bg-secondary p-3 rounded-md"><FormControl><Checkbox checked={field.value?.includes(item)} onCheckedChange={(checked) => {return checked ? field.onChange([...(field.value || []), item]) : field.onChange(field.value?.filter(value => value !== item))}} /></FormControl><FormLabel className="font-normal cursor-pointer">{item}</FormLabel></FormItem>)}/>))}</div>
                        <FormMessage />
                    </FormItem>
                 )} />
                {watchedColors?.includes("Otro") && (
                    <FormField name="q13_other" control={form.control} render={({ field }) => <FormItem className="mt-4"><FormLabel>Por favor, especifica otro color</FormLabel><FormControl><Input placeholder="Ej: Turquesa, Coral, etc." {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>} />
                )}

                <FormField name="q14_hobby" control={form.control} render={({ field }) => <FormItem className="mt-6"><FormLabel>¿Qué te gusta hacer en tu tiempo libre? (Opcional)</FormLabel><FormControl><Textarea rows={3} placeholder="¿Algún hobby o interés que te apasione?" {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>} />
              </div>
              
              <div className={currentStep === 12 ? 'block' : 'hidden'}>
                <h2 className="font-headline text-3xl text-primary mb-2">Reflexión Final</h2>
                <p className="text-muted-foreground mb-6">Este es un espacio para ti.</p>
                <FormField name="q15_final" control={form.control} render={({ field }) => <FormItem><FormLabel>¿Cómo visualizas tu negocio en 2 años? ¿Cuál es la necesidad más urgente que tienes hoy o qué esperas lograr con nuestra ayuda?</FormLabel><FormControl><Textarea rows={5} placeholder="Ej: En 2 años, veo mi clínica como un referente nacional. Mi necesidad más urgente es atraer pacientes que valoren la calidad sobre el precio. Espero que Nyvara me ayude a construir una marca sólida que comunique ese valor." {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>} />
              </div>
              
               <div className={currentStep === 13 ? 'block' : 'hidden'}>
                <h2 className="font-headline text-3xl text-primary mb-2">Paso Final: Generar Resumen</h2>
                <p className="text-muted-foreground mb-6">¡Has completado el diagnóstico! Ahora, genera un resumen de tus respuestas.</p>
                <div>
                  <h3 className="font-headline text-xl text-primary mb-4">Análisis de Competencia (Opcional)</h3>
                  <p className="text-muted-foreground mb-6">Nombra algunos competidores clave para enriquecer el análisis.</p>
                  {fields.map((field, index) => (
                    <FormField key={field.id} control={form.control} name={`competitors.${index}.name`} render={({ field }) => (
                      <FormItem className="flex items-center gap-2 mb-2">
                        <FormLabel className="sr-only">Competidor {index + 1}</FormLabel>
                        <FormControl><Input placeholder={`Nombre del competidor ${index + 1}`} {...field} value={field.value ?? ""} /></FormControl>
                         <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} disabled={fields.length <= 1}><Trash2 className="h-4 w-4" /></Button>
                        <FormMessage />
                      </FormItem>
                    )} />
                  ))}
                  <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => append({ name: '' })}><PlusCircle className="mr-2 h-4 w-4" />Añadir Competidor</Button>
                </div>
                 <Button type="submit" className="mt-8 w-full md:w-auto">
                    Generar Resumen
                  </Button>
              </div>

              <div className="mt-8 pt-6 border-t-2 border-secondary flex justify-between items-center">
                <div>
                  <Button type="button" onClick={handlePrev} disabled={currentStep === 0} variant="secondary">Anterior</Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  Paso {currentStep + 1} de {TOTAL_STEPS}
                </div>
                
                {currentStep < TOTAL_STEPS - 1 ? (
                  <Button type="button" onClick={handleNext}>Siguiente</Button>
                ) : (
                    <div></div>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}

    