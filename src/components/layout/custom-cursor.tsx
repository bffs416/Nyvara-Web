'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <>
      <motion.div
        className="custom-cursor-blur"
        animate={{ x: position.x - 16, y: position.y - 16 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      />
      <motion.div
        className="custom-cursor-dot"
        animate={{ x: position.x - 4, y: position.y - 4 }}
        transition={{ type: 'spring', damping: 35, stiffness: 700 }}
      />
    </>
  );
};

export default CustomCursor;
