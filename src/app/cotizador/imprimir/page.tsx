
import React from 'react';
import QuotePrintView from '@/components/sections/quote-print-view';

const PrintQuotePage = () => {
    return (
        <html>
            <head>
                <title>Propuesta Comercial</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=Lato:wght@400;700&display=swap" rel="stylesheet" />
            </head>
            <body>
                <QuotePrintView />
            </body>
        </html>
    );
};

export default PrintQuotePage;

    