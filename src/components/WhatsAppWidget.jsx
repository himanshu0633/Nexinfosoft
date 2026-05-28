import React, { useState, useEffect, useRef } from 'react';

const WhatsAppWidget = () => {
  const [active, setActive] = useState(false);
  const [showBadge, setShowBadge] = useState(true);
  const widgetRef = useRef(null);

  const toggleWidget = (e) => {
    e.stopPropagation();
    setActive(!active);
    if (showBadge) {
      setShowBadge(false);
    }
  };

  // Close widget when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target)) {
        setActive(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={widgetRef} className="whatsapp-widget">
      <button 
        onClick={toggleWidget} 
        className="whatsapp-btn" 
        style={{ border: 'none', cursor: 'pointer' }}
        aria-label="Chat on WhatsApp"
      >
        <i className="ri-whatsapp-line"></i>
        {showBadge && <span className="whatsapp-badge">1</span>}
      </button>
      
      <div className={`whatsapp-box ${active ? 'active' : ''}`}>
        <div className="whatsapp-header">
          <div className="whatsapp-avatar">N</div>
          <div className="whatsapp-header-info">
            <h4>Nexinfosoft Support</h4>
            <span>Online | Typically replies in 5m</span>
          </div>
        </div>
        
        <div className="whatsapp-body">
          <div className="whatsapp-bubble">
            Hi! Thanks for visiting Nexinfosoft. What kind of software or application are you looking to build today?
            <div className="whatsapp-bubble-time">Just now</div>
          </div>
          
          <a 
            href="https://wa.me/919999530797?text=Hello%20Nexinfosoft%20IT%20Solutions.%20I%20would%20like%20to%20discuss%20a%20project%20requirement." 
            target="_blank" 
            rel="noopener noreferrer" 
            className="whatsapp-action-btn"
          >
            <i className="ri-whatsapp-line"></i>
            <span>Start Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppWidget;
