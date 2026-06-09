import React, { useState, useEffect, useRef } from 'react';

const Process = ({ previewData = null }) => {
  const processScrollerRef = useRef(null);
  
  const [data, setData] = useState({
    title: 'Our Structured Software Creation Lifecycle',
    subtitle: 'Workflow Blueprint',
    description: 'We maintain transparent, structured development timelines to ensure projects are delivered on time and within scope.',
    metadata: {
      steps: [
        { number: '01', name: 'Analysis', text: 'Understanding system flows and detailed scope.', tags: ['Scope Doc', 'Flowcharts'] },
        { number: '02', name: 'UI/UX Design', text: 'Creating wireframes and interactive mockups.', tags: ['Figma UI', 'Wireframes'] },
        { number: '03', name: 'Coding', text: 'Frontend, backend, APIs, and integrations.', tags: ['Clean Code', 'APIs          .'] },
        { number: '04', name: 'Testing', text: 'Functional, performance, and responsive QA.', tags: ['QA Report', 'Bug Fixes'] },
        { number: '05', name: 'Deployment', text: 'Publishing systems to secure hosting.', tags: ['Live Server', 'SSL Setup'] },
        { number: '06', name: 'Support', text: 'Ongoing tuning, patches, and feature updates.', tags: ['Uptime Check', 'Updates'] }
      ]
    }
  });

  useEffect(() => {
    if (previewData) {
      setData(previewData);
      return;
    }

    const fetchProcess = async () => {
      try {
        const res = await fetch(`/api/content/process?t=${Date.now()}`, { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        // Fallback handled by default state
      }
    };

    fetchProcess();
  }, [previewData]);

  const steps = data.metadata?.steps || [];

  useEffect(() => {
    const scroller = processScrollerRef.current;
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
        const firstItem = scroller.querySelector('.process-step');
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

    const pauseAutoScroll = () => stopAutoScroll();
    const resumeAutoScroll = () => startAutoScroll();

    startAutoScroll();

    if (scroller) {
      scroller.addEventListener('touchstart', pauseThenResume, { passive: true });
      scroller.addEventListener('mouseenter', pauseAutoScroll);
      scroller.addEventListener('focusin', pauseAutoScroll);
      scroller.addEventListener('mouseleave', resumeAutoScroll);
      scroller.addEventListener('focusout', resumeAutoScroll);
    }

    mobileQuery.addEventListener('change', startAutoScroll);

    return () => {
      stopAutoScroll();
      mobileQuery.removeEventListener('change', startAutoScroll);
      if (scroller) {
        scroller.removeEventListener('touchstart', pauseThenResume);
        scroller.removeEventListener('mouseenter', pauseAutoScroll);
        scroller.removeEventListener('focusin', pauseAutoScroll);
        scroller.removeEventListener('mouseleave', resumeAutoScroll);
        scroller.removeEventListener('focusout', resumeAutoScroll);
      }
    };
  }, [steps]);

  return (
    <section className="process">
      <div className="container">
        <div className="section-header reveal slide-up active">
          <span className="section-tag">{data.subtitle || 'Workflow Blueprint'}</span>
          <h2 className="section-title">{data.title}</h2>
          <p className="section-desc">{data.description}</p>
        </div>

        <div className="process-timeline reveal scale-up active">
          <div ref={processScrollerRef} className="process-steps">
            {steps.map((step, idx) => (
              <div key={idx} className="process-step">
                <div className="process-number">{step.number || `0${idx + 1}`}</div>
                <h4 className="process-name">{step.name}</h4>
                <p className="process-text">{step.text}</p>
                {step.tags && Array.isArray(step.tags) && (
                  <div className="process-tags">
                    {step.tags.map((tag, tIdx) => (
                      <span key={tIdx}>{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
