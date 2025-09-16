'use client';

import React, { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || window.getComputedStyle(target).cursor === 'pointer') {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  const cursorSize = isHovering ? 32 : 8;
  const blurSize = isHovering ? 64 : 32;

  const dotX = useSpring(position.x, { stiffness: 3000, damping: 80 });
  const dotY = useSpring(position.y, { stiffness: 3000, damping: 80 });

  const blurX = useSpring(position.x, { stiffness: 200, damping: 30 });
  const blurY = useSpring(position.y, { stiffness: 200, damping: 30 });

  return (
    <>
      <motion.div
        className="custom-cursor-blur"
        style={{ x: blurX, y: blurY, translateX: '-50%', translateY: '-50%' }}
        animate={{ 
          width: blurSize, 
          height: blurSize 
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
      <motion.div
        className="custom-cursor-dot"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        animate={{ 
          width: cursorSize, 
          height: cursorSize,
          backgroundColor: isHovering ? 'hsl(var(--primary))' : '#FFFFFF'
        }}
        transition={{ type: 'spring', stiffness: 700, damping: 30 }}
      />
    </>
  );
};

export default CustomCursor;
