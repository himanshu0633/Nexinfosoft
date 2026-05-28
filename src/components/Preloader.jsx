import React, { useState, useEffect } from 'react';

const Preloader = () => {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Fade out after small delay to show animation
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 600);

    // Fully remove from DOM after CSS transition completes (500ms transition time)
    const removeTimer = setTimeout(() => {
      setVisible(false);
    }, 1100);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`preloader ${fadeOut ? 'fade-out' : ''}`}>
      <img 
        src="/assets/nex-infotech-logo.png" 
        alt="Nexinfosoft IT Solutions" 
        className="loader-logo" 
      />
      <div className="loader-bar-container">
        <div className="loader-bar"></div>
      </div>
    </div>
  );
};

export default Preloader;
