import React, { useEffect } from 'react';

const PrivacyPolicy = () => {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => el.classList.add('active'));
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="page-hero">
        <div className="container reveal slide-up">
          <h1 className="page-hero-title">Privacy Policy</h1>
          <p className="page-hero-desc">How we collect, use, and protect information shared with Nexinfosoft.</p>
        </div>
      </div>
      
      <section className="content-page">
        <div className="container policy-content">
          <div className="elegant-card">
            <h2>Information We Collect</h2>
            <p>We may collect your name, phone number, email address, company details, website URL, and project requirement when you submit a form or contact us directly.</p>
          </div>
          <div className="elegant-card">
            <h2>How We Use Information</h2>
            <p>Your information is used to respond to inquiries, prepare estimates, schedule consultations, provide services, and improve our communication and delivery process.</p>
          </div>
          <div className="elegant-card">
            <h2>Data Sharing</h2>
            <p>We do not sell personal information. We may share limited details with trusted service partners only when needed for project delivery, hosting, communication, or legal compliance.</p>
          </div>
          <div className="elegant-card">
            <h2>Security</h2>
            <p>We use reasonable technical and administrative measures to protect submitted information. No internet transmission is completely risk-free, so sensitive credentials should be shared through approved secure channels.</p>
          </div>
          <div className="elegant-card">
            <h2>Contact</h2>
            <p>For privacy questions, contact us at info@nexinfosoft.com.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;
