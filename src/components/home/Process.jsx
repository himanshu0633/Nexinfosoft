import React, { useEffect, useRef, useState } from 'react';

const Process = () => {
  const processScrollerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    {
      number: '01',
      name: 'Analysis',
      text: 'Understanding system flows and detailed scope.',
      tags: ['Scope Doc', 'Flowcharts']
    },
    {
      number: '02',
      name: 'UI/UX Design',
      text: 'Creating wireframes and interactive mockups.',
      tags: ['Figma UI', 'Wireframes']
    },
    {
      number: '03',
      name: 'Coding',
      text: 'Frontend, backend, APIs, and integrations.',
      tags: ['Clean Code', 'APIs          .']
    },
    {
      number: '04',
      name: 'Testing',
      text: 'Functional, performance, and responsive QA.',
      tags: ['QA Report', 'Bug Fixes']
    },
    {
      number: '05',
      name: 'Deployment',
      text: 'Publishing systems to secure hosting.',
      tags: ['Live Server', 'SSL Setup']
    },
    {
      number: '06',
      name: 'Support',
      text: 'Ongoing tuning, patches, and feature updates.',
      tags: ['Uptime Check', 'Updates']
    }
  ];

  useEffect(() => {
    const scroller = processScrollerRef.current;
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    let intervalId;
    let resumeTimer;
    let scrollFrame;

    const stopAutoScroll = () => {
      clearInterval(intervalId);
      clearTimeout(resumeTimer);
    };

    const scrollToStep = (index) => {
      if (!scroller) return;
      const items = Array.from(scroller.querySelectorAll('.process-step'));
      const target = items[index];
      if (!target) return;

      scroller.scrollTo({
        left: target.offsetLeft - (scroller.clientWidth - target.clientWidth) / 2,
        behavior: 'smooth'
      });
    };

    const startAutoScroll = () => {
      stopAutoScroll();
      if (!scroller || !mobileQuery.matches) return;

      intervalId = setInterval(() => {
        setActiveStep((current) => {
          const next = (current + 1) % steps.length;
          requestAnimationFrame(() => scrollToStep(next));
          return next;
        });
      }, 2000);
    };

    const pauseThenResume = () => {
      stopAutoScroll();
      resumeTimer = setTimeout(startAutoScroll, 2600);
    };

    const syncActiveStep = () => {
      if (!scroller || !mobileQuery.matches) return;
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(() => {
        const items = Array.from(scroller.querySelectorAll('.process-step'));
        const center = scroller.scrollLeft + scroller.clientWidth / 2;
        const nearestIndex = items.reduce((nearest, item, index) => {
          const itemCenter = item.offsetLeft + item.clientWidth / 2;
          const currentCenter = items[nearest].offsetLeft + items[nearest].clientWidth / 2;
          return Math.abs(itemCenter - center) < Math.abs(currentCenter - center) ? index : nearest;
        }, 0);
        setActiveStep(nearestIndex);
      });
    };

    startAutoScroll();

    if (scroller) {
      scroller.addEventListener('touchstart', pauseThenResume, { passive: true });
      scroller.addEventListener('scroll', syncActiveStep, { passive: true });
    }

    mobileQuery.addEventListener('change', startAutoScroll);

    return () => {
      stopAutoScroll();
      cancelAnimationFrame(scrollFrame);
      mobileQuery.removeEventListener('change', startAutoScroll);
      if (scroller) {
        scroller.removeEventListener('touchstart', pauseThenResume);
        scroller.removeEventListener('scroll', syncActiveStep);
      }
    };
  }, [steps.length]);

  const handleDotClick = (index) => {
    const scroller = processScrollerRef.current;
    const target = scroller?.querySelectorAll('.process-step')[index];
    if (!scroller || !target) return;

    scroller.scrollTo({
      left: target.offsetLeft - (scroller.clientWidth - target.clientWidth) / 2,
      behavior: 'smooth'
    });
    setActiveStep(index);
  };

  return (
    <section className="process">
      <div className="container">
        <div className="section-header reveal slide-up active">
          <span className="section-tag">Workflow Blueprint</span>
          <h2 className="section-title">Our Structured Software Creation Lifecycle</h2>
          <p className="section-desc">We maintain transparent, structured development timelines to ensure projects are delivered on time and within scope.</p>
        </div>

        <div className="process-timeline reveal scale-up active">
          <div ref={processScrollerRef} className="process-steps">
            {steps.map((step, idx) => (
              <div key={idx} className="process-step">
                <div className="process-number">{step.number}</div>
                <h4 className="process-name">{step.name}</h4>
                <p className="process-text">{step.text}</p>
                <div className="process-tags">
                  {step.tags.map((tag, tIdx) => (
                    <span key={tIdx}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="process-slider-dots" aria-label="Workflow step navigation">
            {steps.map((step, idx) => (
              <button
                type="button"
                key={step.number}
                className={activeStep === idx ? 'active' : ''}
                aria-label={`Show workflow step ${step.number}`}
                aria-current={activeStep === idx ? 'true' : undefined}
                onClick={() => handleDotClick(idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
