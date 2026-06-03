import React, { useEffect, useRef } from 'react';

const CoreCapabilities = () => {
  const capabilitiesScrollerRef = useRef(null);

  useEffect(() => {
    const scroller = capabilitiesScrollerRef.current;
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    let intervalId;
    let resumeTimer;

    const stopAutoScroll = () => {
      clearInterval(intervalId);
      clearTimeout(resumeTimer);
    };

    const startAutoScroll = () => {
      stopAutoScroll();
      if (!scroller || !mobileQuery.matches) return;

      intervalId = setInterval(() => {
        const firstItem = scroller.querySelector('.capability-item');
        if (!firstItem) return;

        const cardWidth = firstItem.getBoundingClientRect().width;
        const gap = parseFloat(window.getComputedStyle(scroller).gap) || 0;
        const maxScroll = scroller.scrollWidth - scroller.clientWidth;
        const nextLeft = scroller.scrollLeft + cardWidth + gap;

        scroller.scrollTo({
          left: nextLeft >= maxScroll - 4 ? 0 : nextLeft,
          behavior: 'smooth'
        });
      }, 1000);
    };

    const pauseThenResume = () => {
      stopAutoScroll();
      resumeTimer = setTimeout(startAutoScroll, 2200);
    };

    startAutoScroll();

    if (scroller) {
      scroller.addEventListener('touchstart', pauseThenResume, { passive: true });
    }

    mobileQuery.addEventListener('change', startAutoScroll);

    return () => {
      stopAutoScroll();
      mobileQuery.removeEventListener('change', startAutoScroll);
      if (scroller) {
        scroller.removeEventListener('touchstart', pauseThenResume);
      }
    };
  }, []);

  return (
    <section className="core-capabilities">
      <div className="container">
        <div className="section-header reveal slide-up active">
          <span className="section-tag">Core Capabilities</span>
          <h2 className="section-title">Everything Your Digital Product Needs To Scale</h2>
          <p className="section-desc">From product design to secure cloud deployment, our team covers the full software delivery lifecycle.</p>
        </div>

        <div ref={capabilitiesScrollerRef} className="capabilities-grid reveal slide-up delay-100 active">
          <div className="capability-item"><i className="ri-window-line"></i><span>Web Applications</span></div>
          <div className="capability-item"><i className="ri-smartphone-line"></i><span>Mobile Solutions</span></div>
          <div className="capability-item"><i className="ri-database-2-line"></i><span>ERP Development</span></div>
          <div className="capability-item"><i className="ri-cloud-line"></i><span>Cloud Integration</span></div>
          <div className="capability-item"><i className="ri-code-box-line"></i><span>API Development</span></div>
          <div className="capability-item"><i className="ri-palette-line"></i><span>UI/UX Design</span></div>
          <div className="capability-item"><i className="ri-brain-line"></i><span>AI Solutions</span></div>
          <div className="capability-item"><i className="ri-tools-line"></i><span>DevOps Support</span></div>
          <div className="capability-item"><i className="ri-speed-up-line"></i><span>Performance Optimization</span></div>
          <div className="capability-item"><i className="ri-shield-check-line"></i><span>Security Focused</span></div>
          <div className="capability-item"><i className="ri-settings-3-line"></i><span>Custom Software</span></div>
          <div className="capability-item"><i className="ri-refresh-line"></i><span>Digital Transformation</span></div>
          <div className="capability-item"><i className="ri-loop-left-line"></i><span>Agile Delivery</span></div>
          <div className="capability-item"><i className="ri-checkbox-circle-line"></i><span>QA Tested</span></div>
          <div className="capability-item"><i className="ri-building-4-line"></i><span>Enterprise Ready</span></div>
          <div className="capability-item"><i className="ri-node-tree"></i><span>Scalable Architecture</span></div>
        </div>
      </div>
    </section>
  );
};

export default CoreCapabilities;
