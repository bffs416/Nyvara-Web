'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/config';

const WhatsAppButton = () => {
  const phoneNumber = siteConfig.contact.phone;
  const message = siteConfig.contact.whatsappMessage;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const WhatsAppIcon = () => (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      className="w-8 h-8"
    >
      <path d="M16.1 2.5C8.3 2.5 2 8.8 2 16.6c0 2.8.8 5.4 2.3 7.6l-2.2 8.1 8.3-2.2c2.1 1.3 4.6 2.1 7.1 2.1h.1c7.8 0 14.1-6.3 14.1-14.1C30.2 8.8 23.9 2.5 16.1 2.5zM22.9 20.3c-.2.5-.9.9-1.6 1-.7.1-1.6.1-2.4-.1-.8-.2-1.9-.7-3.4-2.1s-2.6-2.9-3-3.6c-.4-.7-.8-1.5-.8-2.4s.2-1.4.5-1.9c.3-.5.7-.7.9-.7.2 0 .5 0 .7.1.2.1.5.2.7.3.2.1.3.2.5.5s.3.5.4.7c.1.2.1.5 0 .7-.1.2-.2.3-.4.5-.1.1-.3.3-.5.5-.2.2-.4.4-.5.5-.1.1-.2.3-.1.5.1.2.3.5.6.8.3.3.6.6.9.9.4.4.8.7 1.2.9.4.2.8.3 1.2.3.4 0 .8-.1 1.1-.4.3-.3.5-.7.7-1 .2-.3.4-.5.7-.5h.1c.4 0 .9.2 1.1.4.2.2.3.7.1 1.2z" />
    </svg>
  );

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg flex items-center justify-center"
      aria-label="Contactar por WhatsApp"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut'
      }}
    >
      <WhatsAppIcon />
    </motion.a>
  );
};

export default WhatsAppButton;
