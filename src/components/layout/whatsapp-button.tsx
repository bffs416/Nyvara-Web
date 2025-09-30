
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/config';

const WhatsAppButton = () => {
  const phoneNumber = siteConfig.contact.phone;
  const message = siteConfig.contact.whatsappMessage;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const MessageIcon = () => (
    <svg 
      width="32" 
      height="32" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="text-white"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg flex items-center justify-center"
      aria-label="Contactar por WhatsApp"
      whileHover={{ scale: 1.1, boxShadow: "0px 10px 30px rgba(37, 211, 102, 0.4)" }}
      whileTap={{ scale: 0.9 }}
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut'
      }}
    >
      <MessageIcon />
    </motion.a>
  );
};

export default WhatsAppButton;
