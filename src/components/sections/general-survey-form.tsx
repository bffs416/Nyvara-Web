
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generalSurveySchema } from "@/lib/schema";
import type { GeneralSurveyFormData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { INTERESTED_SERVICES_OPTIONS } from "@/lib/constants";

interface GeneralSurveyFormProps {
  onSubmit: (data: GeneralSurveyFormData) => void;
}

export default function GeneralSurveyForm({ onSubmit }: GeneralSurveyFormProps) {
  
  const form = useForm<GeneralSurveyFormData>({
    resolver: zodResolver(generalSurveySchema),
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
      challenges: "",
      interested_services: [],
      additional_info: "",
    },
  });

  return (
      <Card className="shadow-2xl relative">
        <CardContent className="p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div>
                    <h2 className="font-headline text-3xl text-primary mb-6">Diagnóstico General</h2>
                    
                    <div className="space-y-4 border-b border-border pb-6 mb-6">
                        <h3 className="font-headline text-xl text-primary">Información de Contacto</h3>
                        <FormField name="name" control={form.control} render={({ field }) => <FormItem><FormLabel>Nombre Completo</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                        <FormField name="company" control={form.control} render={({ field }) => <FormItem><FormLabel>Nombre de la Empresa</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                        <FormField name="role" control={form.control} render={({ field }) => <FormItem><FormLabel>Tu Cargo o Rol</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                        <FormField name="phone" control={form.control} render={({ field }) => <FormItem><FormLabel>Número de Teléfono</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>} />
                        <FormField name="email" control={form.control} render={({ field }) => <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>} />
                    </div>

                    <div className="space-y-4 border-b border-border pb-6 mb-6">
                        <h3 className="font-headline text-xl text-primary">Sobre tu Negocio</h3>
                        <FormField name="business_description" control={form.control} render={({ field }) => <FormItem><FormLabel>Describe brevemente tu negocio</FormLabel><FormControl><Textarea rows={3} {...field} /></FormControl><FormMessage /></FormItem>} />
                        <FormField name="main_services" control={form.control} render={({ field }) => <FormItem><FormLabel>¿Cuáles son tus productos o servicios principales?</FormLabel><FormControl><Textarea rows={3} {...field} /></FormControl><FormMessage /></FormItem>} />
                        <FormField name="target_audience" control={form.control} render={({ field }) => <FormItem><FormLabel>¿Quién es tu cliente o público ideal?</FormLabel><FormControl><Textarea rows={3} {...field} /></FormControl><FormMessage /></FormItem>} />
                    </div>
                    
                    <div className="space-y-4 border-b border-border pb-6 mb-6">
                        <h3 className="font-headline text-xl text-primary">Objetivos y Desafíos</h3>
                        <FormField name="goals" control={form.control} render={({ field }) => <FormItem><FormLabel>¿Cuáles son los principales objetivos que quieres alcanzar con tu negocio en los próximos 6-12 meses?</FormLabel><FormControl><Textarea rows={3} {...field} /></FormControl><FormMessage /></FormItem>} />
                        <FormField name="challenges" control={form.control} render={({ field }) => <FormItem><FormLabel>¿Cuáles son los mayores desafíos o frustraciones que enfrentas actualmente?</FormLabel><FormControl><Textarea rows={3} {...field} /></FormControl><FormMessage /></FormMessage /></FormItem>} />
                    </div>

                    <div className="space-y-4 pb-6 mb-6">
                         <h3 className="font-headline text-xl text-primary">Áreas de Interés</h3>
                         <p className="text-muted-foreground">¿En qué áreas de servicio de Nyvara estás más interesado/a?</p>
                         <FormField name="interested_services" control={form.control} render={() => (
                            <FormItem>
                                <div className="grid grid-cols-1 gap-4">
                                {INTERESTED_SERVICES_OPTIONS.map((item) => (
                                    <FormField
                                    key={item}
                                    control={form.control}
                                    name="interested_services"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 bg-secondary p-3 rounded-md">
                                            <FormControl>
                                                <Checkbox
                                                checked={field.value?.includes(item)}
                                                onCheckedChange={(checked) => {
                                                    return checked
                                                    ? field.onChange([...(field.value || []), item])
                                                    : field.onChange(
                                                        field.value?.filter(
                                                        (value) => value !== item
                                                        )
                                                    )
                                                }}
                                                />
                                            </FormControl>
                                            <FormLabel className="font-normal cursor-pointer">
                                                {item}
                                            </FormLabel>
                                        </FormItem>
                                    )}
                                    />
                                ))}
                                </div>
                                <FormMessage />
                            </FormItem>
                         )} />
                    </div>

                     <div className="space-y-4">
                        <h3 className="font-headline text-xl text-primary">Información Adicional</h3>
                        <FormField name="additional_info" control={form.control} render={({ field }) => <FormItem><FormLabel>¿Hay algo más que consideres importante que sepamos?</FormLabel><FormControl><Textarea rows={4} {...field} /></FormControl><FormMessage /></FormItem>} />
                    </div>

                </div>

              <div className="mt-8 pt-6 border-t-2 border-secondary flex justify-end">
                 <Button type="submit" className="w-full md:w-auto">
                    Generar Resumen
                  </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
  );
}
