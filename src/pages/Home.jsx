import React, { useState, useEffect } from 'react';
import Hero from '../components/home/Hero';

import CoreServices from '../components/home/CoreServices';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Technologies from '../components/home/Technologies';
import Industries from '../components/home/Industries';
import Process from '../components/home/Process';
import PortfolioPreview from '../components/home/PortfolioPreview';

// Premium custom fallback layout for dynamically added sections
const CustomSection = ({ data }) => {
  if (!data) return null;
  const { title, subtitle, description, image_url } = data;

  return (
    <section className="custom-dynamic-section" style={{
      padding: '100px 0',
      background: 'linear-gradient(180deg, #fbfcff 0%, #f3f8f7 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: image_url ? '1fr 1fr' : '1fr', gap: '40px', alignItems: 'center' }}>
        <div className="reveal active">
          {subtitle && (
            <span className="section-tag" style={{
              display: 'inline-block',
              background: 'rgba(20, 184, 166, 0.1)',
              color: 'var(--accent)',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '16px'
            }}>
              {subtitle}
            </span>
          )}
          <h2 className="section-title" style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: '800',
            lineHeight: '1.2',
            color: 'var(--text-main)',
            marginBottom: '20px'
          }}>
            {title}
          </h2>
          {description && (
            <p className="section-desc" style={{
              fontSize: '16px',
              color: 'var(--text-muted)',
              lineHeight: '1.6',
              margin: '0'
            }}>
              {description}
            </p>
          )}
        </div>
        {image_url && (
          <div className="reveal active" style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
              border: '1px solid rgba(255,255,255,0.4)',
              background: 'var(--bg-card)'
            }}>
              <img src={image_url} alt={title} style={{ maxWidth: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const Home = () => {
  const [sections, setSections] = useState([]);
  
  // Fallback defaults in case database is loading/disconnected
  const defaultHomeSections = [
    { _id: 'hero', visible: true, order: 0 },
    { _id: 'services', visible: true, order: 1 },
    { _id: 'whychooseus', visible: true, order: 2 },
    { _id: 'technologies', visible: true, order: 3 },
    { _id: 'industries', visible: true, order: 4 },
    { _id: 'process', visible: true, order: 5 },
    { _id: 'portfoliopreview', visible: true, order: 6 }
  ];

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await fetch('/api/content?page=home');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setSections(data);
            return;
          }
        }
        setSections(defaultHomeSections);
      } catch (err) {
        setSections(defaultHomeSections);
      }
    };

    fetchSections();

    // Scroll reveal fallback
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => el.classList.add('active'));
    window.scrollTo(0, 0);
  }, []);

  const componentsMap = {
    hero: Hero,

    services: CoreServices,
    whychooseus: WhyChooseUs,
    technologies: Technologies,
    industries: Industries,
    process: Process,
    portfoliopreview: PortfolioPreview
  };

  // Filter out non-visible sections, sort by order
  const activeSections = sections
    .filter(sec => sec.visible !== false)
    .filter(sec => sec._id !== 'stats')
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <>
      {activeSections.map((section) => {
        const Component = componentsMap[section._id];
        if (Component) {
          return <Component key={section._id} />;
        } else {
          return <CustomSection key={section._id} data={section} />;
        }
      })}
    </>
  );
};

export default Home;
