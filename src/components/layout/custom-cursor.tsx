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

  const dotX = useSpring(position.x - cursorSize / 2, { stiffness: 1000, damping: 50 });
  const dotY = useSpring(position.y - cursorSize / 2, { stiffness: 1000, damping: 50 });

  const blurX = useSpring(position.x - blurSize / 2, { stiffness: 300, damping: 30 });
  const blurY = useSpring(position.y - blurSize / 2, { stiffness: 300, damping: 30 });

  useEffect(() => {
    dotX.set(position.x - cursorSize / 2);
    dotY.set(position.y - cursorSize / 2);
    blurX.set(position.x - blurSize / 2);
    blurY.set(position.y - blurSize / 2);
  }, [position, cursorSize, blurSize, dotX, dotY, blurX, blurY]);


  return (
    <>
      <motion.div
        className="custom-cursor-blur"
        style={{ x: blurX, y: blurY }}
        animate={{ 
          width: blurSize, 
          height: blurSize 
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
      <motion.div
        className="custom-cursor-dot"
        style={{ x: dotX, y: dotY }}
        animate={{ 
          width: cursorSize, 
          height: cursorSize 
        }}
        transition={{ type: 'spring', stiffness: 700, damping: 30 }}
      />
    </>
  );
};

export default CustomCursor;
