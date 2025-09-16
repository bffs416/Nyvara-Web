
'use client';

import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { PlusCircle, Trash2, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const quoteItemSchema = z.object({
  description: z.string().min(1, 'La descripción es requerida.'),
  quantity: z.number().min(1, 'La cantidad debe ser al menos 1.'),
  price: z.number().min(0, 'El precio no puede ser negativo.'),
});

const quoteFormSchema = z.object({
  clientName: z.string().min(1, 'El nombre del cliente es requerido.'),
  projectName: z.string().min(1, 'El nombre del proyecto es requerido.'),
  items: z.array(quoteItemSchema).min(1, 'Debes agregar al menos un ítem.'),
  notes: z.string().optional(),
});

type QuoteFormData = z.infer<typeof quoteFormSchema>;

export default function QuoteGenerator() {
  const [summary, setSummary] = useState('');
  const { toast } = useToast();

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      clientName: '',
      projectName: '',
      items: [{ description: '', quantity: 1, price: 0 }],
      notes: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items',
  });

  const watchedItems = form.watch('items');
  const total = watchedItems.reduce((acc, item) => acc + (item.quantity || 0) * (item.price || 0), 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);
  };

  const onSubmit = (data: QuoteFormData) => {
    let summaryText = `COTIZACIÓN\n`;
    summaryText += `========================================\n\n`;
    summaryText += `Cliente: ${data.clientName}\n`;
    summaryText += `Proyecto: ${data.projectName}\n`;
    summaryText += `Fecha: ${new Date().toLocaleDateString('es-CO')}\n\n`;
    summaryText += `--- ÍTEMS ---\n`;

    data.items.forEach((item, index) => {
      summaryText += `\n${index + 1}. ${item.description}\n`;
      summaryText += `   Cantidad: ${item.quantity}\n`;
      summaryText += `   Precio Unitario: ${formatCurrency(item.price)}\n`;
      summaryText += `   Subtotal: ${formatCurrency(item.quantity * item.price)}\n`;
    });

    summaryText += `\n----------------------------------------\n`;
    summaryText += `TOTAL: ${formatCurrency(total)}\n`;
    summaryText += `----------------------------------------\n`;

    if (data.notes) {
      summaryText += `\n--- NOTAS ADICIONALES ---\n`;
      summaryText += `${data.notes}\n`;
    }
    
    summaryText += `\nGracias por su interés.`;

    setSummary(summaryText);
    toast({
        title: "Resumen Generado",
        description: "El resumen de la cotización está listo para ser copiado.",
    })
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
    toast({
      title: '¡Copiado!',
      description: 'La cotización ha sido copiada al portapapeles.',
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Detalles de la Cotización</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField name="clientName" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Nombre del Cliente</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="projectName" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Nombre del Proyecto</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />

              <div>
                <FormLabel>Ítems de la Cotización</FormLabel>
                <div className="space-y-4 mt-2">
                  {fields.map((field, index) => (
                    <Card key={field.id} className="p-4 bg-secondary/50 relative">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField control={form.control} name={`items.${index}.description`} render={({ field }) => (
                          <FormItem className="md:col-span-3"><FormLabel>Descripción</FormLabel><FormControl><Textarea {...field} rows={2}/></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name={`items.${index}.quantity`} render={({ field }) => (
                          <FormItem><FormLabel>Cantidad</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name={`items.${index}.price`} render={({ field }) => (
                          <FormItem className="md:col-span-2"><FormLabel>Precio Unitario (COP)</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>
                      <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => remove(index)} disabled={fields.length <= 1}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </Card>
                  ))}
                </div>
                <Button type="button" variant="outline" size="sm" className="mt-4" onClick={() => append({ description: '', quantity: 1, price: 0 })}>
                  <PlusCircle className="mr-2 h-4 w-4" />Añadir Ítem
                </Button>
              </div>

              <FormField name="notes" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Notas Adicionales</FormLabel><FormControl><Textarea {...field} placeholder="Ej: Condiciones de pago, tiempo de entrega, etc." /></FormControl><FormMessage /></FormItem>
              )} />
              
              <Button type="submit" className="w-full">Generar Resumen</Button>
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
              className="min-h-[500px] bg-secondary/30 text-sm font-mono whitespace-pre-wrap"
              value={summary}
            />
          ) : (
            <div className="flex items-center justify-center min-h-[500px] bg-secondary/30 rounded-md">
              <p className="text-muted-foreground">El resumen de la cotización aparecerá aquí.</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="justify-end">
            <div className='text-right'>
                <p className='text-muted-foreground'>Total</p>
                <p className='text-2xl font-bold text-primary'>{formatCurrency(total)}</p>
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}
