import React, { useEffect } from 'react';

const TermsConditions = () => {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => el.classList.add('active'));
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="page-hero">
        <div className="container reveal slide-up">
          <h1 className="page-hero-title">Terms & Conditions</h1>
          <p className="page-hero-desc">Basic terms for website use, project discussions, proposals, and service delivery.</p>
        </div>
      </div>
      
      <section className="content-page">
        <div className="container policy-content">
          <div className="elegant-card">
            <h2>Website Use</h2>
            <p>By using this website, you agree to use it for lawful purposes and not attempt to misuse, disrupt, copy, or exploit website content or functionality.</p>
          </div>
          <div className="elegant-card">
            <h2>Consultations & Proposals</h2>
            <p>Consultation inputs and estimates are for planning. Final scope, cost, timeline, payment terms, and deliverables are confirmed through a written proposal or agreement.</p>
          </div>
          <div className="elegant-card">
            <h2>Project Delivery</h2>
            <p>Delivery depends on approved requirements, timely feedback, content availability, third-party access, and milestone payments where applicable.</p>
          </div>
          <div className="elegant-card">
            <h2>Intellectual Property</h2>
            <p>Client-owned content remains with the client. Project source files, licenses, and ownership transfer terms are defined in the project agreement.</p>
          </div>
          <div className="elegant-card">
            <h2>Limitation</h2>
            <p>Nexinfosoft is not responsible for losses caused by third-party services, hosting providers, payment gateways, policy changes, or delayed client approvals.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default TermsConditions;
