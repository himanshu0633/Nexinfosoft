import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const WhyChooseUs = () => {
  const valueStageRef = useRef(null);
  const [data, setData] = useState({
    title: 'Why Global Businesses Choose',
    subtitle: 'Nexinfosoft',
    description: 'We align engineering with business outcomes through structured planning, secure implementation, clear reporting, and dependable support.',
    metadata: {
      badge: 'Value Proposition',
      checklist: [
        'Gurugram-based Dedicated In-House Team',
        'Post-Deployment Support & Documentation',
        'Agile Iterations & 100% Code Ownership'
      ],
      metrics: [
        { label: 'Projects Delivered', value: '50+', icon: 'ri-briefcase-4-line' },
        { label: 'Client Satisfaction', value: '99%', icon: 'ri-emotion-happy-line' },
        { label: 'Support Available', value: '24/7', icon: 'ri-customer-service-2-line' },
        { label: 'Code Ownership', value: '100%', icon: 'ri-code-s-slash-line' }
      ]
    }
  });

  useEffect(() => {
    const fetchWhyChooseUsContent = async () => {
      try {
        const res = await fetch('/api/content/whychooseus');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        // Fallback is already handled by default state
      }
    };
    fetchWhyChooseUsContent();
  }, []);

  const handleMouseMove = (event, stageEl) => {
    if (!stageEl) return;
    const rect = stageEl.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    
    const cards = stageEl.querySelectorAll('.value-float-card');
    cards.forEach((card, index) => {
      const depth = (index + 1) * 5;
      card.style.transform = `translate(${x * depth}px, ${y * depth * -1}px)`;
    });
  };

  const handleMouseLeave = (stageEl) => {
    if (!stageEl) return;
    const cards = stageEl.querySelectorAll('.value-float-card');
    cards.forEach((card) => {
      card.style.transform = '';
    });
  };

  return (
    <section className="why-choose-us value-proposition-premium">
      <div className="value-bg" aria-hidden="true">
        <span className="value-glow value-glow-one"></span>
        <span className="value-glow value-glow-two"></span>
      </div>

      <div className="container value-grid">
        <div className="value-left reveal slide-left active">
          <span className="section-tag value-badge">{data.metadata?.badge || 'Value Proposition'}</span>
          <h2 className="section-title value-title">
            {data.title} <span>{data.subtitle}</span>
          </h2>
          <p className="section-desc value-desc">
            {data.description}
          </p>

          <div className="value-checklist">
            {data.metadata?.checklist?.map((item, idx) => (
              <div key={idx}><i className="ri-checkbox-circle-fill"></i><span>{item}</span></div>
            ))}
          </div>

          <div className="value-metrics">
            {data.metadata?.metrics?.map((metric, idx) => (
              <div key={idx}>
                <i className={metric.icon || 'ri-checkbox-blank-circle-line'}></i>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>

          <div className="value-actions">
            <Link to="/contact" className="btn btn-primary"><span>Start Your Project</span> <i className="ri-arrow-right-line"></i></Link>
            <Link to="/free-consultation" className="btn btn-secondary"><span>Book Free Consultation</span> <i className="ri-calendar-line"></i></Link>
          </div>

          <div className="value-timeline" aria-label="Delivery process timeline">
            <div><i className="ri-lightbulb-flash-line"></i><b>01</b><span>Plan</span></div>
            <div><i className="ri-pencil-ruler-2-line"></i><b>02</b><span>Design</span></div>
            <div><i className="ri-code-s-slash-line"></i><b>03</b><span>Develop</span></div>
            <div><i className="ri-rocket-line"></i><b>04</b><span>Deploy</span></div>
            <div><i className="ri-customer-service-2-line"></i><b>05</b><span>Support</span></div>
          </div>
        </div>

        <div 
          ref={valueStageRef}
          className="value-card-stage reveal slide-right delay-200 active" 
          onMouseMove={(e) => handleMouseMove(e, valueStageRef.current)}
          onMouseLeave={() => handleMouseLeave(valueStageRef.current)}
        >
          <div className="value-circuit" aria-hidden="true">
            <span></span><span></span><span></span>
          </div>
          <article className="value-float-card value-card-stack">
            <div className="value-card-dots"><span></span><span></span><span></span></div>
            <span className="value-icon"><i className="ri-box-3-line"></i></span>
            <div>
              <h3>Modern Stack</h3>
              <p>Project-fit tools selected for maintainability, integrations, and performance.</p>
              <div className="value-logo-strip">
                <span><i className="ri-reactjs-line"></i></span>
                <span>node</span>
                <span>aws</span>
                <span><i className="ri-ship-line"></i></span>
              </div>
            </div>
          </article>

          <article className="value-float-card value-card-speed">
            <div className="value-card-dots"><span></span><span></span><span></span></div>
            <span className="value-icon"><i className="ri-time-line"></i></span>
            <div>
              <h3>Agile Speed</h3>
              <p>Sprint-based delivery with predictable milestones and transparent updates.</p>
              <div className="value-progress-head"><span>Sprint Progress</span><strong>72%</strong></div>
              <div className="value-progress"><span style={{ width: '72%' }}></span></div>
            </div>
          </article>

          <article className="value-float-card value-card-secure">
            <div className="value-secure-top">
              <span className="value-icon"><i className="ri-shield-keyhole-line"></i></span>
              <span className="value-status"><i></i> Protected</span>
            </div>
            <h3>Secure &amp; Reliable</h3>
            <p>Security validation, access controls, and reliable deployment support.</p>
            <div className="value-tech-tags"><span>SSL</span><span>HTTPS</span><span>Backup</span></div>
          </article>

          <article className="value-float-card value-card-support">
            <div className="value-card-dots"><span></span><span></span><span></span></div>
            <span className="value-icon"><i className="ri-customer-service-2-line"></i></span>
            <div>
              <h3>Priority Support</h3>
              <p>Direct communication with project managers and support engineers.</p>
              <div className="value-avatars"><span>N</span><span>I</span><span>X</span><b>+12</b></div>
            </div>
          </article>

          <article className="value-float-card value-card-enterprise">
            <div className="value-enterprise-art" aria-hidden="true">
              <span className="art-main"><i className="ri-building-4-line"></i></span>
              <span><i className="ri-shield-check-line"></i></span>
              <span><i className="ri-cloud-line"></i></span>
              <span><i className="ri-line-chart-line"></i></span>
            </div>
            <div>
              <h3>Enterprise Ready Solutions</h3>
              <p>Built for scalability, security and long-term growth. We help you stay future-ready.</p>
            </div>
            <Link to="/services" aria-label="View enterprise solutions"><i className="ri-arrow-right-line"></i></Link>
          </article>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
