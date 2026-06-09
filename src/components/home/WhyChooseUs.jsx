import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const WhyChooseUs = ({ previewData = null }) => {
  const valueStageRef = useRef(null);
  const [data, setData] = useState({
    title: 'Why Global Businesses Choose',
    subtitle: 'Nexinfosoft',
    description: 'We align engineering with business outcomes through structured planning, secure implementation, clear reporting, and dependable support.',
    metadata: {
      badge: 'Value Proposition',
      checklist: [
        'Dedicated In-House Team',
        'Post-Deployment Support & Documentation',
        'Agile Iterations & 100% Code Ownership'
      ],

    }
  });

  useEffect(() => {
    if (previewData) {
      setData(previewData);
      return;
    }

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
  }, [previewData]);

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

  const card1 = data.metadata?.cards?.[0] || { title: 'Modern Stack', desc: 'Project-fit tools selected for maintainability, integrations, and performance.' };
  const card2 = data.metadata?.cards?.[1] || { title: 'Agile Speed', desc: 'Sprint-based delivery with predictable milestones and transparent updates.' };
  const card3 = data.metadata?.cards?.[2] || { title: 'Secure & Reliable', desc: 'Security validation, access controls, and reliable deployment support.' };
  const card4 = data.metadata?.cards?.[3] || { title: 'Priority Support', desc: 'Direct communication with project managers and support engineers.' };
  const card5 = data.metadata?.cards?.[4] || { title: 'Enterprise Ready Solutions', desc: 'Built for scalability, security and long-term growth. We help you stay future-ready.' };

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

       

          <div className="value-actions">
            <Link to="/contact" className="btn btn-primary"><span>Start Your Project</span> <i className="ri-arrow-right-line"></i></Link>
            <Link to="/contact" className="btn btn-secondary"><span>Book Free Consultation</span> <i className="ri-calendar-line"></i></Link>
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
              <h3>{card1.title}</h3>
              <p>{card1.desc}</p>
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
              <h3>{card2.title}</h3>
              <p>{card2.desc}</p>
              <div className="value-progress-head"><span>Sprint Progress</span><strong>72%</strong></div>
              <div className="value-progress"><span style={{ width: '72%' }}></span></div>
            </div>
          </article>

          <article className="value-float-card value-card-secure">
            <div className="value-secure-top">
              <span className="value-icon"><i className="ri-shield-keyhole-line"></i></span>
              <span className="value-status"><i></i> Protected</span>
            </div>
            <h3>{card3.title}</h3>
            <p>{card3.desc}</p>
            <div className="value-tech-tags"><span>SSL</span><span>HTTPS</span><span>Backup</span></div>
          </article>

          <article className="value-float-card value-card-support">
            <div className="value-card-dots"><span></span><span></span><span></span></div>
            <span className="value-icon"><i className="ri-customer-service-2-line"></i></span>
            <div>
              <h3>{card4.title}</h3>
              <p>{card4.desc}</p>
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
              <h3>{card5.title}</h3>
              <p>{card5.desc}</p>
            </div>
            <Link to="/services" aria-label="View enterprise solutions"><i className="ri-arrow-right-line"></i></Link>
          </article>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
