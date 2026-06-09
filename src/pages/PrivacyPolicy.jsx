import React, { useEffect, useState } from 'react';
import DynamicPageSections from '../components/DynamicPageSections';

const PrivacyPolicy = () => {
  const [content, setContent] = useState({
    title: 'Privacy Policy',
    description: 'How we collect, use, and protect information shared with Nexinfosoft.',
    metadata: {
      cards: [
        { title: 'Information We Collect', text: 'We may collect your name, phone number, email address, company details, website URL, and project requirement when you submit a form or contact us directly.' },
        { title: 'How We Use Information', text: 'Your information is used to respond to inquiries, prepare estimates, schedule consultations, provide services, and improve our communication and delivery process.' },
        { title: 'Data Sharing', text: 'We do not sell personal information. We may share limited details with trusted service partners only when needed for project delivery, hosting, communication, or legal compliance.' },
        { title: 'Security', text: 'We use reasonable technical and administrative measures to protect submitted information. No internet transmission is completely risk-free, so sensitive credentials should be shared through approved secure channels.' },
        { title: 'Contact', text: 'For privacy questions, contact us at info@nexinfosoft.com.' }
      ]
    }
  });

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => el.classList.add('active'));
    window.scrollTo(0, 0);

    const fetchContent = async () => {
      try {
        const res = await fetch('/api/content/privacy_policy');
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

export default PrivacyPolicy;
