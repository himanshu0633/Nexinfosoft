import React, { useState, useEffect } from 'react';

const FreeConsultation = () => {
  const [formData, setFormData] = useState({
    consultName: '',
    consultPhone: '',
    consultEmail: '',
    consultService: '',
    consultMsg: ''
  });
  const [modalActive, setModalActive] = useState(false);

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => el.classList.add('active'));
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (
      formData.consultName.trim() &&
      formData.consultPhone.trim() &&
      formData.consultEmail.trim() &&
      formData.consultService
    ) {
      setModalActive(true);
      setFormData({
        consultName: '',
        consultPhone: '',
        consultEmail: '',
        consultService: '',
        consultMsg: ''
      });
    }
  };

  const closeModal = () => {
    setModalActive(false);
  };

  return (
    <>
      <div className="page-hero">
        <div className="container reveal slide-up">
          <h1 className="page-hero-title">Free IT & Business Consultation</h1>
          <p className="page-hero-desc">Get a clear, practical roadmap for your website, app, CRM, ERP, automation, or digital marketing requirement.</p>
        </div>
      </div>

      <section className="content-page">
        <div className="container split-grid">
          <div className="elegant-card reveal slide-left">
            <span className="section-tag">What You Get</span>
            <h2 className="section-title">A focused discovery call before you invest</h2>
            <p className="section-desc">We review your idea, business goal, required pages or features, technology fit, timeline, and expected budget range. The result is a simple action plan your team can understand.</p>
            <ul className="elegant-list">
              <li><i className="ri-check-line"></i><span>Website or app feature planning</span></li>
              <li><i className="ri-check-line"></i><span>Technology and hosting guidance</span></li>
              <li><i className="ri-check-line"></i><span>Budget and timeline estimate</span></li>
              <li><i className="ri-check-line"></i><span>SEO, conversion, and launch suggestions</span></li>
            </ul>
          </div>

          <div className="contact-form-card reveal slide-right delay-200">
            <form id="contactForm" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="consultName">Name *</label>
                <input 
                  className="form-control" 
                  type="text" 
                  id="consultName" 
                  placeholder="Your name" 
                  value={formData.consultName}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="consultPhone">Phone *</label>
                <input 
                  className="form-control" 
                  type="tel" 
                  id="consultPhone" 
                  placeholder="10 digit mobile number" 
                  value={formData.consultPhone}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="consultEmail">Email *</label>
                <input 
                  className="form-control" 
                  type="email" 
                  id="consultEmail" 
                  placeholder="you@company.com" 
                  value={formData.consultEmail}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="consultService">Service *</label>
                <select 
                  className="form-control" 
                  id="consultService" 
                  style={{ backgroundColor: '#0d1426' }}
                  value={formData.consultService}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>Select service</option>
                  <option value="Website Development">Website Development</option>
                  <option value="Mobile App Development">Mobile App Development</option>
                  <option value="CRM / ERP Software">CRM / ERP Software</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Hosting & Maintenance">Hosting & Maintenance</option>
                </select>
              </div>
              <div className="form-group full-width">
                <label className="form-label" htmlFor="consultMsg">Message</label>
                <textarea 
                  className="form-control" 
                  id="consultMsg" 
                  placeholder="Tell us what you want to build"
                  value={formData.consultMsg}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ border: 'none', width: '100%' }}>
                <span>Request Consultation</span>
                <i className="ri-arrow-right-line"></i>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ==========================================
         SUCCESS MODAL DIALOG
         ========================================== */}
      <div className={`modal-overlay ${modalActive ? 'active' : ''}`} onClick={closeModal}>
        <div className="success-modal" onClick={(e) => e.stopPropagation()}>
          <button 
            onClick={closeModal} 
            className="modal-close-btn" 
            style={{ position: 'absolute', top: '15px', right: '15px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '20px', color: 'var(--text)' }}
            aria-label="Close"
          >
            <i className="ri-close-line"></i>
          </button>
          <div className="success-icon-box">
            <i className="ri-check-line"></i>
          </div>
          <h3 className="success-title">Thank you</h3>
          <p className="success-desc">
            Your consultation request has been successfully received. We will connect with you shortly.
          </p>
          <button 
            onClick={closeModal} 
            className="btn btn-primary modal-close-btn" 
            style={{ width: '100%', border: 'none', marginTop: '10px' }}
          >
            <span>Okay</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default FreeConsultation;
