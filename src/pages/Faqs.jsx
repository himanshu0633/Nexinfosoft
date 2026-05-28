import React, { useEffect } from 'react';

const Faqs = () => {
  useEffect(() => {
    // Scroll reveal fallback for direct mounts
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => el.classList.add('active'));
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="page-hero">
        <div className="container reveal slide-up">
          <h1 className="page-hero-title">Frequently Asked Questions</h1>
          <p className="page-hero-desc">Clear answers about project scope, pricing, delivery, support, and maintenance.</p>
        </div>
      </div>

      <section className="content-page">
        <div className="container faq-list">
          <div className="faq-item reveal slide-up">
            <h3>What services does Nexinfosoft provide?</h3>
            <p>We provide website development, web applications, mobile apps, CRM, ERP, UI/UX, cloud deployment, hosting, maintenance, and digital marketing services.</p>
          </div>
          <div className="faq-item reveal slide-up">
            <h3>How much does a website or app cost?</h3>
            <p>Cost depends on pages, features, integrations, design complexity, and support needs. After a free consultation, we share a practical estimate with scope and timeline.</p>
          </div>
          <div className="faq-item reveal slide-up">
            <h3>Do you provide maintenance after launch?</h3>
            <p>Yes. We can provide bug fixes, backups, hosting support, performance checks, content updates, and feature enhancements after deployment.</p>
          </div>
          <div className="faq-item reveal slide-up">
            <h3>Can you redesign an existing website?</h3>
            <p>Yes. We can improve layout, speed, responsiveness, SEO structure, content flow, and conversion points while keeping your business identity intact.</p>
          </div>
          <div className="faq-item reveal slide-up">
            <h3>Do you build custom ERP or CRM software?</h3>
            <p>Yes. We design role-based dashboards, reports, approvals, inventory, lead management, billing workflows, and custom modules as per your operations.</p>
          </div>
          <div className="faq-item reveal slide-up">
            <h3>How do we start?</h3>
            <p>Share your requirement through the free consultation form or contact page. We will discuss scope, suggest features, and prepare a roadmap.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Faqs;
