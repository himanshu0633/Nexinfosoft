import React, { useEffect, useState } from 'react';
import DynamicPageSections from '../components/DynamicPageSections';

const Faqs = () => {
  const [faqsSec, setFaqsSec] = useState({
    title: 'Frequently Asked Questions',
    subtitle: 'Clear answers about project scope, pricing, delivery, support, and maintenance.',
    metadata: {
      items: [
        { question: 'What services does Nexinfosoft provide?', answer: 'We provide website development, web applications, mobile apps, CRM, ERP, UI/UX, cloud deployment, hosting, maintenance, and digital marketing services.' },
        { question: 'How much does a website or app cost?', answer: 'Cost depends on pages, features, integrations, design complexity, and support needs. After a free consultation, we share a practical estimate with scope and timeline.' },
        { question: 'Do you provide maintenance after launch?', answer: 'Yes. We can provide bug fixes, backups, hosting support, performance checks, content updates, and feature enhancements after deployment.' },
        { question: 'Can you redesign an existing website?', answer: 'Yes. We can improve layout, speed, responsiveness, SEO structure, content flow, and conversion points while keeping your business identity intact.' },
        { question: 'Do you build custom ERP or CRM software?', answer: 'Yes. We design role-based dashboards, reports, approvals, inventory, lead management, billing workflows, and custom modules as per your operations.' },
        { question: 'How do we start?', answer: 'Share your requirement through the free consultation form or contact page. We will discuss scope, suggest features, and prepare a roadmap.' }
      ]
    }
  });

  useEffect(() => {
    // Scroll reveal fallback for direct mounts
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => el.classList.add('active'));
    window.scrollTo(0, 0);

    const fetchFaqs = async () => {
      try {
        const res = await fetch('/api/content/faqs');
        if (res.ok) {
          const data = await res.json();
          setFaqsSec(data);
        }
      } catch (err) {
        // Keep static fallbacks on error
      }
    };
    fetchFaqs();
  }, []);

  return (
    <>
      <div className="page-hero">
        <div className="container reveal slide-up">
          <h1 className="page-hero-title">{faqsSec.title}</h1>
          <p className="page-hero-desc">{faqsSec.subtitle}</p>
        </div>
      </div>

      <section className="content-page">
        <div className="container faq-list">
          {(faqsSec.metadata?.items || []).map((faq, idx) => (
            <div className="faq-item reveal slide-up" key={idx}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
      <DynamicPageSections page="faqs" excludeIds={['faqs']} />
    </>
  );
};

export default Faqs;
