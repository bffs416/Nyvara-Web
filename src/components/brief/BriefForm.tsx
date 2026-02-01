"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition, useRef } from "react";
import { Loader2, Copy, Sparkles, FileDown, FileJson } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import { processBriefAction } from "@/app/client-actions";
import { briefFormSchema, type BriefFormValues } from "@/lib/schema";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type BriefResult = {
  briefText: string;
  tags: string[];
  sector: string;
};

const SectionHeader = ({ step, title }: { step: string; title:string }) => (
    <div className="flex items-center gap-5 mb-8 pb-4 border-b border-gray-300">
      <div className="font-headline text-3xl text-indigo-500 italic relative pr-5">
        {step}
        <div className="absolute right-0 top-1/4 h-1/2 w-px bg-indigo-500/60"></div>
      </div>
      <h2 className="text-lg font-semibold tracking-wider uppercase text-blue-500">
        {title}
      </h2>
    </div>
  );


export function BriefForm() {
  const [result, setResult] = useState<BriefResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<BriefFormValues>({
    resolver: zodResolver(briefFormSchema),
    defaultValues: {
      clientName: "",
      consecutive: "FVNY-",
      projectName: "",
      deadline: "",
      format: "Post IG/FB (1080x1080)",
      goal: "Ventas",
      headline: "",
      bodyText: "",
      cta: "",
      references: "",
      otherFormat: "",
    },
  });

  const watchedFormat = form.watch("format");
  
  const generatePdf = async () => {
    const formElement = formRef.current;
    if (!formElement) return;

    try {
      const canvas = await html2canvas(formElement, {
        scale: 2, 
        useCORS: true,
        backgroundColor: '#ffffff',
        height: formElement.scrollHeight,
        windowHeight: formElement.scrollHeight
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      const consecutive = form.getValues("consecutive") || "brief";
      pdf.save(`brief-${consecutive}.pdf`);
      toast({
        title: "PDF Generado",
        description: "El PDF del brief ha sido descargado.",
        className: "bg-blue-500 text-white"
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        variant: "destructive",
        title: "Error al generar PDF",
        description: "No se pudo crear el archivo PDF.",
      });
    }
  };


  function onSubmit(values: BriefFormValues) {
    startTransition(async () => {
      setError(null);
      setResult(null);
      
      const submissionValues = { ...values };
      if (submissionValues.format === "Otro") {
        submissionValues.format = submissionValues.otherFormat || "Otro";
      }

      const response = await processBriefAction(submissionValues);
      if (response.success) {
        setResult(response.data);
         window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
      } else {
        setError(response.error);
        toast({
          variant: "destructive",
          title: "Error",
          description: response.error,
        });
      }
    });
  }

  const copyBrief = () => {
    if (!result) return;
    const aiSection = `
------------------------------------------------------------
AI ANALYSIS
------------------------------------------------------------
SECTOR: ${result.sector}
TAGS: ${result.tags.join(', ')}
`;
    const textToCopy = result.briefText + aiSection;
    navigator.clipboard.writeText(textToCopy);
    toast({
      title: "COPIADO AL PORTAPAPELES",
      description: "El resumen del brief ha sido copiado como texto.",
      className: "bg-blue-500 text-white"
    });
  };

  const copyJson = () => {
    if (!result) return;
    const jsonToCopy = JSON.stringify({
      protocol: "Creative Asset Management Protocol",
      consecutive: form.getValues("consecutive"),
      brief: result.briefText,
      analysis: {
        sector: result.sector,
        tags: result.tags
      },
      raw_data: form.getValues()
    }, null, 2);
    navigator.clipboard.writeText(jsonToCopy);
    toast({
      title: "JSON COPIADO",
      description: "Los datos del protocolo han sido copiados en formato JSON.",
      className: "bg-blue-500 text-white"
    });
  };

  return (
    <>
    <Card className="shadow-none border-none bg-transparent">
      <CardContent className="p-1">
        <Form {...form}>
          <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 bg-white text-black">
            
            <div>
              <SectionHeader step="01" title="Identificación del Cliente" />
              <div className="grid md:grid-cols-2 gap-6">
                <FormField control={form.control} name="clientName" render={({ field }) => (
                  <FormItem><FormLabel>Nombre del Cliente</FormLabel><FormControl><Input className="bg-gray-100 border-gray-300" placeholder="Nombre de la empresa o médico" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="consecutive" render={({ field }) => (
                  <FormItem><FormLabel>Consecutivo Interno</FormLabel><FormControl><Input className="bg-gray-100 border-gray-300" placeholder="Ej: FVNY-001" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
              </div>
            </div>

            <div>
              <SectionHeader step="02" title="Contexto y Tiempos" />
              <div className="grid md:grid-cols-2 gap-6">
                 <FormField control={form.control} name="projectName" render={({ field }) => (
                  <FormItem><FormLabel>Nombre de la Pieza</FormLabel><FormControl><Input className="bg-gray-100 border-gray-300" placeholder="Ej: Campaña Mensual" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="deadline" render={({ field }) => (
                  <FormItem><FormLabel>Fecha Límite</FormLabel><FormControl><Input type="date" className="bg-gray-100 border-gray-300" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
              </div>
            </div>

            <div>
              <SectionHeader step="03" title="Parámetros Técnicos" />
              <div className="grid md:grid-cols-2 gap-6">
                <FormField control={form.control} name="format" render={({ field }) => (
                  <FormItem><FormLabel>Formato Requerido</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger className="bg-gray-100 border-gray-300"><SelectValue placeholder="Seleccione un formato" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="Post IG/FB (1080x1080)">Post Cuadrado (1080x1080)</SelectItem>
                        <SelectItem value="Stories / Reel (1080x1920)">Story / Reel (1080x1920)</SelectItem>
                        <SelectItem value="Banner Web">Banner Web</SelectItem>
                        <SelectItem value="PDF Informativo">PDF Informativo</SelectItem>
                        <SelectItem value="Imagen WhatsApp">Imagen WhatsApp</SelectItem>
                        <SelectItem value="Stand 3*2">Stand 3*2</SelectItem>
                        <SelectItem value="Stand 3*3">Stand 3*3</SelectItem>
                        <SelectItem value="Stand 4.2">Stand 4.2</SelectItem>
                        <SelectItem value="Modelado 3D">Modelado 3D</SelectItem>
                        <SelectItem value="Animacion 2D">Animación 2D</SelectItem>
                        <SelectItem value="Animacion 3D">Animación 3D</SelectItem>
                        <SelectItem value="Video Multimedia">Video Multimedia</SelectItem>
                        <SelectItem value="Edicion de fotos">Edición de Fotos</SelectItem>
                        <SelectItem value="Edicion de Video">Edición de Video</SelectItem>
                        <SelectItem value="Grabacion Profesional">Grabación Profesional</SelectItem>
                        <SelectItem value="Fotografia Profesional">Fotografía Profesional</SelectItem>
                        <SelectItem value="Software CRM">Software CRM</SelectItem>
                        <SelectItem value="Otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  <FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="goal" render={({ field }) => (
                  <FormItem><FormLabel>Objetivo Estratégico</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                     <FormControl><SelectTrigger className="bg-gray-100 border-gray-300"><SelectValue placeholder="Seleccione un objetivo" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="Ventas">Ventas Directas</SelectItem>
                        <SelectItem value="Contenido Educativo">Contenido Educativo</SelectItem>
                        <SelectItem value="Posicionamiento">Posicionamiento / Marca</SelectItem>
                        <SelectItem value="Lanzamiento">Lanzamiento</SelectItem>
                      </SelectContent>
                    </Select>
                  <FormMessage /></FormItem>
                )}/>
              </div>
               {watchedFormat === "Otro" && (
                <div className="mt-6">
                  <FormField control={form.control} name="otherFormat" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Especifique el formato</FormLabel>
                      <FormControl>
                        <Input className="bg-gray-100 border-gray-300" placeholder="Describa el formato requerido" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}/>
                </div>
              )}
            </div>

            <div>
              <SectionHeader step="04" title="Contenido Estructural" />
              <div className="space-y-6">
                 <FormField control={form.control} name="headline" render={({ field }) => (
                  <FormItem><FormLabel>Titular Principal</FormLabel><FormControl><Input className="bg-gray-100 border-gray-300" placeholder="Frase destacada" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="bodyText" render={({ field }) => (
                  <FormItem><FormLabel>Información Detallada</FormLabel><FormControl><Textarea className="bg-gray-100 border-gray-300" placeholder="Texto secundario, beneficios o datos técnicos..." {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <div className="grid md:grid-cols-2 gap-6">
                   <FormField control={form.control} name="cta" render={({ field }) => (
                    <FormItem><FormLabel>Llamado a la Acción (CTA)</FormLabel><FormControl><Input className="bg-gray-100 border-gray-300" placeholder="Ej: Contáctanos aquí" {...field} /></FormControl><FormMessage /></FormItem>
                  )}/>
                  <FormField control={form.control} name="references" render={({ field }) => (
                    <FormItem><FormLabel>Referencias Visuales</FormLabel><FormControl><Input className="bg-gray-100 border-gray-300" placeholder="Links o ideas visuales" {...field} /></FormControl><FormMessage /></FormItem>
                  )}/>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-md text-sm text-blue-900">
              <strong>Normas de Servicio:</strong> Toda solicitud formal procesada bajo este protocolo incluye hasta <strong>dos (2) tandas de revisión</strong>. Asegúrese de incluir toda la información técnica necesaria para evitar cargos adicionales por modificaciones fuera de alcance.
            </div>

            <div className="flex flex-wrap items-center gap-4">
               <Button 
                type="submit" 
                disabled={isPending} 
                className="w-auto h-12 px-8 text-xs font-bold uppercase tracking-widest bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                {isPending ? <Loader2 className="animate-spin" /> : "Generar Registro de Envío"}
              </Button>
               <Button 
                type="button" 
                variant="outline"
                onClick={generatePdf} 
                disabled={isPending || !form.formState.isValid}
                className="w-auto h-12 px-8 text-xs font-bold uppercase tracking-widest border-blue-500 text-blue-500 hover:bg-blue-500/10"
              >
                <FileDown className="mr-2 h-4 w-4"/>
                Exportar PDF
              </Button>
              <Button type="reset" variant="outline" onClick={() => {form.reset(); setResult(null); setError(null);}} className="h-12 px-8 text-xs uppercase tracking-widest ml-auto border-gray-300 text-gray-700 hover:bg-gray-100">
                Limpiar
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>

    {result && (
        <Card className="bg-gray-50 text-black shadow-lg border-gray-200 animate-in fade-in slide-in-from-bottom-5 duration-500 mt-12">
            <CardContent className="p-10">
                <SectionHeader step="05" title="Resumen Generado" />

                <div className="mb-8 space-y-4">
                  <h3 className="font-bold text-blue-500 flex items-center gap-2 text-lg"><Sparkles className="text-indigo-500"/> Análisis con IA</h3>
                  <div className="flex flex-col gap-3">
                    <p><span className="font-semibold text-gray-500 mr-2">Sector Identificado:</span> <Badge variant="outline" className="font-semibold border-blue-500 text-blue-500">{result.sector}</Badge></p>
                    <div className="flex items-start">
                      <span className="font-semibold text-gray-500 mt-1 mr-2">Tags Sugeridos:</span>
                      <div className="flex flex-wrap gap-2">
                        {result.tags.map(tag => <Badge key={tag} variant="secondary" className="font-medium bg-gray-200 text-gray-800">{tag}</Badge>)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <div className="bg-gray-100 p-8 rounded-md font-code text-sm text-gray-800 whitespace-pre-wrap border border-gray-200 shadow-inner">
                      {result.briefText}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mt-8">
                  <Button onClick={copyBrief} className="h-12 text-xs font-bold uppercase tracking-widest bg-blue-500 text-white hover:bg-blue-600 transition-all">
                      <Copy className="mr-2 h-4 w-4"/>
                      Copiar Texto Plano
                  </Button>
                  <Button onClick={copyJson} variant="outline" className="h-12 text-xs font-bold uppercase tracking-widest border-blue-500 text-blue-500 hover:bg-blue-500/10">
                      <FileJson className="mr-2 h-4 w-4"/>
                      Copiar como JSON
                  </Button>
                </div>
            </CardContent>
        </Card>
    )}
    </>
  );
}
