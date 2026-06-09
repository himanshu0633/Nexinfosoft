import React, { useEffect, useState } from 'react';
import DynamicPageSections from '../components/DynamicPageSections';

const TermsConditions = () => {
  const [content, setContent] = useState({
    title: 'Terms & Conditions',
    description: 'Basic terms for website use, project discussions, proposals, and service delivery.',
    metadata: {
      cards: [
        { title: 'Website Use', text: 'By using this website, you agree to use it for lawful purposes and not attempt to misuse, disrupt, copy, or exploit website content or functionality.' },
        { title: 'Consultations & Proposals', text: 'Consultation inputs and estimates are for planning. Final scope, cost, timeline, payment terms, and deliverables are confirmed through a written proposal or agreement.' },
        { title: 'Project Delivery', text: 'Delivery depends on approved requirements, timely feedback, content availability, third-party access, and milestone payments where applicable.' },
        { title: 'Intellectual Property', text: 'Client-owned content remains with the client. Project source files, licenses, and ownership transfer terms are defined in the project agreement.' },
        { title: 'Limitation', text: 'Nexinfosoft is not responsible for losses caused by third-party services, hosting providers, payment gateways, policy changes, or delayed client approvals.' }
      ]
    }
  });

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => el.classList.add('active'));
    window.scrollTo(0, 0);

    const fetchContent = async () => {
      try {
        const res = await fetch('/api/content/terms_conditions');
        if (res.ok) {
          const data = await res.json();
          setContent(prev => ({ ...prev, ...data, metadata: { ...prev.metadata, ...data.metadata } }));
        }
      } catch (err) {}
    };

    fetchContent();
  }, []);

  return (
    <>
      <div className="page-hero">
        <div className="container reveal slide-up">
          <h1 className="page-hero-title">{content.title}</h1>
          <p className="page-hero-desc">{content.description}</p>
        </div>
      </div>
      
      <section className="content-page">
        <div className="container policy-content">
          {(content.metadata?.cards || []).map((card) => (
            <div className="elegant-card" key={card.title}>
              <h2>{card.title}</h2>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      </section>
      <DynamicPageSections page="policy" excludeIds={['privacy_policy', 'terms_conditions']} />
    </>
  );
};

export default TermsConditions;
