
'use client';

import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { PlusCircle, Trash2, Copy, FileText, Calculator, Printer } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { siteConfig } from '@/lib/config';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { quoteTemplates } from '@/lib/quote-templates';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

const quoteItemSchema = z.object({
  id: z.string().optional(),
  description: z.string().min(1, 'La descripción es requerida.'),
  quantity: z.number().min(1, 'La cantidad debe ser al menos 1.'),
  price: z.number().min(0, 'El precio no puede ser negativo.'),
  section: z.string().optional(),
});

const quoteFormSchema = z.object({
  issuerName: z.string().min(1, 'Tu nombre o razón social es requerido.'),
  issuerNit: z.string().min(1, 'Tu NIT o CC es requerido.'),
  issuerAddress: z.string().optional(),
  clientName: z.string().min(1, 'El nombre del cliente es requerido.'),
  clientNit: z.string().min(1, 'El NIT o CC del cliente es requerido.'),
  quoteNumber: z.string().min(1, 'El número de cotización es requerido.'),
  projectName: z.string().min(1, 'El nombre del proyecto es requerido.'),
  items: z.array(quoteItemSchema).min(1, 'Debes agregar al menos un ítem.'),
  ivaPercentage: z.number().min(0),
  paymentConditions: z.string().optional(),
  notes: z.string().optional(),
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;

const PriceCalculator = ({ onItemIndex, onPriceCalculated }: { onItemIndex: number; onPriceCalculated: (index: number, price: number) => void; }) => {
    const [directCost, setDirectCost] = useState<number | ''>('');
    const [indirectCost, setIndirectCost] = useState<number | ''>('');
    const [margin, setMargin] = useState<number | ''>('');
    const [calculatedPrice, setCalculatedPrice] = useState(0);
    
    useEffect(() => {
        const dc = typeof directCost === 'number' ? directCost : 0;
        const ic = typeof indirectCost === 'number' ? indirectCost : 0;
        const m = typeof margin === 'number' ? margin : 0;
        
        const totalCost = dc + ic;
        const finalPrice = totalCost * (1 + m / 100);
        setCalculatedPrice(finalPrice);
    }, [directCost, indirectCost, margin]);

    const handleApply = () => {
        onPriceCalculated(onItemIndex, calculatedPrice);
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
    };

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Calculadora de Precio</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
                <FormItem>
                    <FormLabel>Costos Directos (Mano de obra, materiales, etc.)</FormLabel>
                    <Input type="number" value={directCost} onChange={(e) => setDirectCost(e.target.value === '' ? '' : parseFloat(e.target.value))} placeholder="Suma de costos directos" />
                </FormItem>
                <FormItem>
                    <FormLabel>Costos Indirectos (Proporcional)</FormLabel>
                    <Input type="number" value={indirectCost} onChange={(e) => setIndirectCost(e.target.value === '' ? '' : parseFloat(e.target.value))} placeholder="Costos operativos del proyecto" />
                </FormItem>
                 <FormItem>
                    <FormLabel>Margen de Ganancia (%)</FormLabel>
                    <Input type="number" value={margin} onChange={(e) => setMargin(e.target.value === '' ? '' : parseFloat(e.target.value))} placeholder="Ej: 30" />
                </FormItem>
                <div className="border-t pt-4 mt-4">
                    <p className="text-right">Precio Final Calculado: <strong className="text-primary text-lg">{formatCurrency(calculatedPrice)}</strong></p>
                </div>
            </div>
            <DialogFooter>
                 <DialogClose asChild>
                    <Button type="button" onClick={handleApply}>Calcular y Aplicar</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    );
};


export default function QuoteGenerator() {
  const [summary, setSummary] = useState('');
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      issuerName: 'Nyvara Group',
      issuerNit: '46.371.609',
      issuerAddress: 'Bogotá, Colombia',
      clientName: '',
      clientNit: '',
      quoteNumber: `1`,
      projectName: '',
      items: [{ description: '', quantity: 1, price: 0, section: 'Servicios Generales' }],
      ivaPercentage: 0,
      paymentConditions: '50% para iniciar el proyecto, 50% contra entrega final.',
      notes: 'Esta cotización no incluye costos de licenciamiento de software de terceros, a menos que se especifique lo contrario. Cualquier cambio solicitado sobre el alcance definido en esta propuesta estará sujeto a una nueva cotización.',
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: 'items',
  });

  const watchedItems = form.watch('items');
  const watchedIva = form.watch('ivaPercentage');
  const subtotal = watchedItems.reduce((acc, item) => acc + (item.quantity || 0) * (item.price || 0), 0);
  const ivaAmount = subtotal * (watchedIva / 100);
  const total = subtotal + ivaAmount;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
  };
  
  const handleTemplateChange = (templateKey: string) => {
    const template = quoteTemplates[templateKey as keyof typeof quoteTemplates];
    if (!template) return;

    setActiveTemplate(template.nombre_paquete);
    form.setValue('projectName', template.nombre_paquete);

    const newItems = template.secciones.flatMap(section => 
        section.items.map(item => ({
            ...item,
            quantity: 1,
            price: item.price || 0,
            section: section.nombre_seccion,
        }))
    );

    replace(newItems);
  };
  
  const onPriceCalculated = (index: number, price: number) => {
      form.setValue(`items.${index}.price`, price);
  };

  const generateQuoteNumber = (num: string) => {
      const year = new Date().getFullYear();
      const formattedNum = num.padStart(3, '0');
      return `COT-${year}-${formattedNum}`;
  }

  const onSubmit = (data: QuoteFormData) => {
    const issueDate = new Date();
    const validityDate = new Date();
    validityDate.setDate(issueDate.getDate() + 15);
    const finalQuoteNumber = generateQuoteNumber(data.quoteNumber);

    // Save data to localStorage for the print view
    const printData = { ...data, finalQuoteNumber, issueDate: issueDate.toISOString(), validityDate: validityDate.toISOString() };
    localStorage.setItem('quotePrintData', JSON.stringify(printData));

    let summaryText = `**************************************************\n`;
    summaryText += `** PROPUESTA COMERCIAL **\n`;
    summaryText += `**************************************************\n\n`;

    summaryText += `DE:\n`;
    summaryText += `  - ${data.issuerName}\n`;
    summaryText += `  - NIT/CC: ${data.issuerNit}\n`;
    summaryText += `  - Dirección: ${data.issuerAddress}\n`;
    summaryText += `  - Email: ${siteConfig.contact.email}\n`;
    summaryText += `  - Teléfono: +${siteConfig.contact.phone}\n\n`;

    summaryText += `PARA:\n`;
    summaryText += `  - ${data.clientName}\n`;
    summaryText += `  - NIT/CC: ${data.clientNit}\n\n`;
    
    summaryText += `--------------------------------------------------\n`;
    summaryText += `DETALLES DE LA PROPUESTA\n`;
    summaryText += `--------------------------------------------------\n`;
    summaryText += `  - Propuesta N°: ${finalQuoteNumber}\n`;
    summaryText += `  - Proyecto: ${data.projectName}\n`;
    summaryText += `  - Fecha de expedición: ${issueDate.toLocaleDateString('es-CO')}\n`;
    summaryText += `  - Validez de la oferta: ${validityDate.toLocaleDateString('es-CO')} (15 días)\n\n`;
    
    const itemsBySection: { [key: string]: typeof data.items } = data.items.reduce((acc, item) => {
        const section = item.section || 'Servicios Generales';
        if (!acc[section]) {
            acc[section] = [];
        }
        acc[section].push(item);
        return acc;
    }, {} as { [key: string]: typeof data.items });

    summaryText += `--------------------------------------------------\n`;
    summaryText += `DESCRIPCIÓN DE SERVICIOS / PRODUCTOS\n`;
    summaryText += `--------------------------------------------------\n`;
    
    Object.entries(itemsBySection).forEach(([section, items]) => {
        summaryText += `\n**${section.toUpperCase()}**\n`;
        items.forEach((item, index) => {
            summaryText += `\n  ÍTEM: ${item.description}\n`;
            summaryText += `    - Cantidad: ${item.quantity}\n`;
            summaryText += `    - Precio Unitario: ${formatCurrency(item.price)}\n`;
            summaryText += `    - Subtotal Ítem: ${formatCurrency(item.quantity * item.price)}\n`;
        });
    });
    summaryText += `\n--------------------------------------------------\n\n`;

    summaryText += `--------------------------------------------------\n`;
    summaryText += `RESUMEN DE LA INVERSIÓN\n`;
    summaryText += `--------------------------------------------------\n`;
    summaryText += `  - Subtotal: ${formatCurrency(subtotal)}\n`;
    summaryText += `  - IVA (${data.ivaPercentage}%): ${formatCurrency(ivaAmount)}\n`;
    summaryText += `  ------------------------------------------------\n`;
    summaryText += `  - INVERSIÓN TOTAL: ${formatCurrency(total)}\n`;
    summaryText += `--------------------------------------------------\n\n`;

    if (data.paymentConditions) {
      summaryText += `CONDICIONES DE PAGO:\n`;
      summaryText += `${data.paymentConditions}\n\n`;
    }

    if (data.notes) {
      summaryText += `NOTAS Y CLÁUSULAS ADICIONALES:\n`;
      summaryText += `${data.notes}\n\n`;
    }

    summaryText += `PRÓXIMOS PASOS:\n`;
    summaryText += `Para aprobar esta propuesta y dar inicio al proyecto, por favor, responde a este comunicado con tu confirmación.\n\n`;

    summaryText += `**************************************************\n`;
    summaryText += `Gracias por la oportunidad de presentar esta propuesta.\nAtentamente,\n\n${data.issuerName}\n`;
    summaryText += `**************************************************\n`;

    setSummary(summaryText);
    toast({
        title: "Propuesta Generada",
        description: "El texto y la vista para imprimir están listos.",
    })
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
    toast({
      title: '¡Copiado!',
      description: 'La propuesta ha sido copiada al portapapeles.',
    });
  };

  const openPrintView = () => {
    const isDataSaved = localStorage.getItem('quotePrintData');
    if(isDataSaved) {
        window.open('/cotizador/imprimir', '_blank');
    } else {
        toast({
            title: 'Genera una propuesta primero',
            description: 'Debes hacer clic en "Generar Propuesta" antes de poder imprimir.',
            variant: 'destructive',
        })
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Crear Propuesta Comercial</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

              <div className="space-y-4 p-4 border rounded-lg bg-card-foreground/5">
                <h3 className="font-semibold text-primary">Plantillas Rápidas</h3>
                 <Select onValueChange={handleTemplateChange}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Cargar una plantilla de servicios" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.entries(quoteTemplates).map(([key, template]) => (
                            <SelectItem key={key} value={key}>{template.nombre_paquete}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {activeTemplate && <p className="text-sm text-muted-foreground">Plantilla cargada: <span className="font-bold text-primary">{activeTemplate}</span></p>}
              </div>
              
              <div className="space-y-2 p-4 border rounded-lg">
                <h3 className="font-semibold text-primary">Tus Datos (Emisor)</h3>
                <FormField name="issuerName" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Nombre / Razón Social</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField name="issuerNit" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>NIT / CC</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField name="issuerAddress" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Dirección (Opcional)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              
              <div className="space-y-2 p-4 border rounded-lg">
                <h3 className="font-semibold text-primary">Datos del Cliente</h3>
                <FormField name="clientName" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Nombre del Cliente</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField name="clientNit" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>NIT / CC del Cliente</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>

              <div className="space-y-2 p-4 border rounded-lg">
                <h3 className="font-semibold text-primary">Detalles de la Propuesta</h3>
                <FormField name="quoteNumber" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Número Consecutivo</FormLabel>
                        <FormControl><Input {...field} type="number" placeholder="Ej: 1" /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField name="projectName" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Nombre del Proyecto</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>

              <div>
                <FormLabel className='text-primary font-semibold'>Ítems de la Cotización</FormLabel>
                <div className="space-y-4 mt-2">
                  {fields.map((field, index) => (
                    <Dialog key={field.id}>
                        <Card className="p-4 bg-secondary/50 relative">
                        {field.section && <p className="text-xs font-bold text-primary mb-2">{field.section}</p>}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField control={form.control} name={`items.${index}.description`} render={({ field }) => (
                            <FormItem className="md:col-span-3"><FormLabel>Descripción</FormLabel><FormControl><Textarea {...field} rows={2}/></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name={`items.${index}.quantity`} render={({ field }) => (
                            <FormItem><FormLabel>Cantidad</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name={`items.${index}.price`} render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                    <FormLabel>Precio Unitario (COP)</FormLabel>
                                    <div className="flex items-center gap-2">
                                        <FormControl>
                                            <Input type="number" step="1000" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} />
                                        </FormControl>
                                         <DialogTrigger asChild>
                                            <Button type="button" variant="outline" size="icon">
                                                <Calculator className="h-4 w-4" />
                                            </Button>
                                        </DialogTrigger>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>
                        <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => remove(index)} disabled={fields.length <= 1}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                        </Card>
                        <PriceCalculator onItemIndex={index} onPriceCalculated={onPriceCalculated} />
                    </Dialog>
                  ))}
                </div>
                <Button type="button" variant="outline" size="sm" className="mt-4" onClick={() => append({ description: '', quantity: 1, price: 0, section: 'Ítem Adicional' })}>
                  <PlusCircle className="mr-2 h-4 w-4" />Añadir Ítem
                </Button>
              </div>

               <div className="space-y-2 p-4 border rounded-lg">
                <h3 className="font-semibold text-primary">Condiciones y Notas</h3>
                <FormField
                  control={form.control}
                  name="ivaPercentage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Porcentaje de IVA</FormLabel>
                      <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={String(field.value)}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona el IVA" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0">0% (No aplica)</SelectItem>
                          <SelectItem value="19">19%</SelectItem>
                          <SelectItem value="5">5%</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField name="paymentConditions" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Condiciones de Pago</FormLabel><FormControl><Textarea {...field} placeholder="Ej: 50% para iniciar, 50% contra entrega." rows={2} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField name="notes" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Notas y Cláusulas Adicionales</FormLabel><FormControl><Textarea {...field} placeholder="Ej: Tiempos de entrega, garantías, etc." rows={3} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              
              <Button type="submit" className="w-full">
                <FileText className="mr-2" />
                Generar Propuesta
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Resumen para Copiar</CardTitle>
          {summary && (
            <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                <Copy className="h-5 w-5" />
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {summary ? (
            <Textarea
              readOnly
              className="min-h-[500px] bg-secondary/30 text-xs font-mono whitespace-pre-wrap"
              value={summary}
            />
          ) : (
            <div className="flex items-center justify-center min-h-[500px] bg-secondary/30 rounded-md">
              <p className="text-muted-foreground">El resumen de la propuesta aparecerá aquí.</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-end gap-4 text-right">
            <div className="w-full grid grid-cols-2 gap-4">
                 <div className='col-start-2 grid grid-cols-2 gap-4'>
                    <div>
                        <p className='text-muted-foreground'>Subtotal</p>
                        <p className='text-lg font-bold'>{formatCurrency(subtotal)}</p>
                    </div>
                    <div>
                        <p className='text-muted-foreground'>IVA ({watchedIva}%)</p>
                        <p className='text-lg font-bold'>{formatCurrency(ivaAmount)}</p>
                    </div>
                </div>
            </div>
             <div className='w-full border-t pt-4 mt-4'>
                <p className='text-muted-foreground'>Total</p>
                <p className='text-3xl font-bold text-primary'>{formatCurrency(total)}</p>
            </div>
            {summary && (
                <div className="w-full pt-4 mt-4 border-t">
                    <Button className="w-full" variant="outline" onClick={openPrintView}>
                        <Printer className="mr-2" />
                        Vista para Imprimir / PDF
                    </Button>
                </div>
            )}
        </CardFooter>
      </Card>
    </div>
  );
}
