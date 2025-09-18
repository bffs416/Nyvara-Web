
import React from 'react';
import QuotePrintView from '@/components/sections/quote-print-view';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

const LoadingFallback = () => (
    <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg">Cargando propuesta...</p>
    </div>
);


const PrintQuotePage = () => {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <QuotePrintView />
        </Suspense>
    );
};

export default PrintQuotePage;
