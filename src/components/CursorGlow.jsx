import React, { useEffect, useRef } from 'react';

const CursorGlow = () => {
  const glowRef = useRef(null);

  useEffect(() => {
    // Check if device supports a fine pointer (like mouse/trackpad)
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return;

    const handleMouseMove = (event) => {
      if (glowRef.current) {
        glowRef.current.style.opacity = '1';
        glowRef.current.style.left = `${event.clientX}px`;
        glowRef.current.style.top = `${event.clientY}px`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.addEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={glowRef} 
      className="cursor-glow" 
      aria-hidden="true"
      style={{ opacity: 0, pointerEvents: 'none' }}
    />
  );
};

export default CursorGlow;
