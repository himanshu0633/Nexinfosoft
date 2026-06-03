import React, { useEffect, useRef } from 'react';

const Process = () => {
  const processScrollerRef = useRef(null);
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
        </div>
      </div>
    </section>
  );
};

export default Process;
