
'use client';

import React, { useEffect, useState } from 'react';
import type { QuoteFormData } from './quote-generator';
import NyvaraLogo from '../icons/nyvara-logo';
import { siteConfig } from '@/lib/config';

interface PrintData extends QuoteFormData {
    finalQuoteNumber: string;
    issueDate: string;
    validityDate: string;
}

const QuotePrintView = () => {
    const [data, setData] = useState<PrintData | null>(null);

    useEffect(() => {
        const savedData = localStorage.getItem('quotePrintData');
        if (savedData) {
            setData(JSON.parse(savedData));
        }
    }, []);

    useEffect(() => {
        if (data) {
            setTimeout(() => {
                window.print();
            }, 500); // Small delay to ensure content is rendered
        }
    }, [data]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
    };

    if (!data) {
        return <div className="p-10">Cargando datos de la propuesta...</div>;
    }
    
    const subtotal = data.items.reduce((acc, item) => acc + (item.quantity || 0) * (item.price || 0), 0);
    const ivaAmount = subtotal * (data.ivaPercentage / 100);
    const total = subtotal + ivaAmount;
    
    const itemsBySection: { [key: string]: typeof data.items } = data.items.reduce((acc, item) => {
        const section = item.section || 'Servicios Generales';
        if (!acc[section]) {
            acc[section] = [];
        }
        acc[section].push(item);
        return acc;
    }, {} as { [key: string]: typeof data.items });

    const issuer = {
        name: data.issuerName,
        nit: data.issuerNit,
        address: data.issuerAddress,
        email: siteConfig.contact.email,
        phone: `+${siteConfig.contact.phone}`,
    }

    return (
        <div className="bg-white text-black font-body p-12 max-w-4xl mx-auto">
             <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=Lato:wght@400;700&display=swap');
                
                body {
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                }

                @media print {
                    body, html {
                        margin: 0;
                        padding: 0;
                        width: 210mm;
                        height: 297mm;
                    }
                    .no-print {
                        display: none;
                    }
                }

                .font-headline {
                    font-family: 'Cormorant Garamond', serif;
                }
                .font-body {
                    font-family: 'Lato', sans-serif;
                }
            `}</style>
            
            <header className="flex justify-between items-start pb-8 border-b-2 border-gray-900">
                <div className="w-1/3">
                    <NyvaraLogo className="h-16 w-full" />
                </div>
                <div className="text-right">
                    <h1 className="font-headline text-4xl font-bold">Propuesta Comercial</h1>
                    <p className="mt-2 text-gray-600">{data.finalQuoteNumber}</p>
                </div>
            </header>

            <section className="grid grid-cols-2 gap-8 my-8 text-sm">
                <div>
                    <h2 className="font-bold text-gray-500 uppercase tracking-widest text-xs mb-2">De:</h2>
                    <p className="font-bold">{issuer.name}</p>
                    <p>{issuer.nit}</p>
                    <p>{issuer.address}</p>
                    <p>{issuer.email}</p>
                    <p>{issuer.phone}</p>
                </div>
                <div>
                    <h2 className="font-bold text-gray-500 uppercase tracking-widest text-xs mb-2">Para:</h2>
                    <p className="font-bold">{data.clientName}</p>
                    <p>{data.clientNit}</p>
                    <h2 className="font-bold text-gray-500 uppercase tracking-widest text-xs mt-4 mb-2">Proyecto:</h2>
                    <p className="font-bold">{data.projectName}</p>
                </div>
            </section>

             <section className="grid grid-cols-2 gap-8 my-8 text-sm bg-gray-100 p-4 rounded-lg">
                <div>
                    <strong className="text-gray-500">Fecha de expedición:</strong>
                    <span className="ml-2">{new Date(data.issueDate).toLocaleDateString('es-CO')}</span>
                </div>
                 <div>
                    <strong className="text-gray-500">Validez de la oferta:</strong>
                    <span className="ml-2">{new Date(data.validityDate).toLocaleDateString('es-CO')}</span>
                </div>
            </section>

            <section className="my-10">
                <h2 className="font-headline text-2xl font-bold mb-4 border-b pb-2">Alcance de Servicios</h2>
                {Object.entries(itemsBySection).map(([section, items]) => (
                    <div key={section} className="mb-6">
                        <h3 className="font-headline text-lg font-bold text-gray-700 mb-3">{section}</h3>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b text-left text-gray-500">
                                    <th className="py-2 pr-4 font-normal">Descripción</th>
                                    <th className="py-2 px-4 w-24 text-center font-normal">Cant.</th>
                                    <th className="py-2 px-4 w-40 text-right font-normal">Precio Unit.</th>
                                    <th className="py-2 pl-4 w-40 text-right font-normal">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (
                                    <tr key={index} className="border-b border-gray-200">
                                        <td className="py-3 pr-4">{item.description}</td>
                                        <td className="py-3 px-4 text-center">{item.quantity}</td>
                                        <td className="py-3 px-4 text-right">{formatCurrency(item.price)}</td>
                                        <td className="py-3 pl-4 text-right font-semibold">{formatCurrency(item.quantity * item.price)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </section>

            <section className="flex justify-end my-10">
                <div className="w-full max-w-sm text-sm">
                    <div className="flex justify-between py-2 border-b">
                        <span>Subtotal</span>
                        <span>{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                        <span>IVA ({data.ivaPercentage}%)</span>
                        <span>{formatCurrency(ivaAmount)}</span>
                    </div>
                    <div className="flex justify-between py-3 font-bold text-lg bg-gray-100 px-2 rounded-md mt-2">
                        <span>Inversión Total</span>
                        <span>{formatCurrency(total)}</span>
                    </div>
                </div>
            </section>

            <section className="my-10 text-xs text-gray-600">
                 {data.paymentConditions && (
                     <div className="mb-6">
                        <h3 className="font-bold text-gray-800 text-sm mb-2">Condiciones de Pago</h3>
                        <p>{data.paymentConditions}</p>
                     </div>
                 )}
                 {data.notes && (
                     <div>
                        <h3 className="font-bold text-gray-800 text-sm mb-2">Notas y Cláusulas Adicionales</h3>
                        <p className="whitespace-pre-line">{data.notes}</p>
                     </div>
                 )}
            </section>

            <footer className="mt-12 pt-8 border-t-2 border-gray-900 text-center text-xs text-gray-500">
                <p>Gracias por la oportunidad de presentar esta propuesta. Esperamos poder colaborar juntos.</p>
                <p className="font-bold mt-2">{issuer.name}</p>
            </footer>

        </div>
    );
};

export default QuotePrintView;

    