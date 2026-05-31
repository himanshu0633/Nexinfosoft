import React from 'react';

const Process = () => {
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

  return (
    <section className="process">
      <div className="container">
        <div className="section-header reveal slide-up active">
          <span className="section-tag">Workflow Blueprint</span>
          <h2 className="section-title">Our Structured Software Creation Lifecycle</h2>
          <p className="section-desc">We maintain transparent, structured development timelines to ensure projects are delivered on time and within scope.</p>
        </div>

        <div className="process-timeline reveal scale-up active">
          <div className="process-steps">
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
