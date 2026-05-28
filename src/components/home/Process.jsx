import React from 'react';

const Process = () => {
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
            <div className="process-step"><div className="process-number">01</div><h4 className="process-name">Analysis</h4><p className="process-text">Understanding system flows and detailed scope.</p></div>
            <div className="process-step"><div className="process-number">02</div><h4 className="process-name">UI/UX Design</h4><p className="process-text">Creating wireframes and interactive mockups.</p></div>
            <div className="process-step"><div className="process-number">03</div><h4 className="process-name">Coding</h4><p className="process-text">Frontend, backend, APIs, and integrations.</p></div>
            <div className="process-step"><div className="process-number">04</div><h4 className="process-name">Testing</h4><p className="process-text">Functional, performance, and responsive QA.</p></div>
            <div className="process-step"><div className="process-number">05</div><h4 className="process-name">Deployment</h4><p className="process-text">Publishing systems to secure hosting.</p></div>
            <div className="process-step"><div className="process-number">06</div><h4 className="process-name">Support</h4><p className="process-text">Ongoing tuning, patches, and feature updates.</p></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
