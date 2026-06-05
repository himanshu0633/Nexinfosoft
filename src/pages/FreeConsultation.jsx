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
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Captcha states
  const [captchaSvg, setCaptchaSvg] = useState('');
  const [captchaKey, setCaptchaKey] = useState('');
  const [captchaValue, setCaptchaValue] = useState('');

  // Dynamic content states
  const [hero, setHero] = useState({
    title: 'Free IT & Business Consultation',
    subtitle: 'CONSULTATION',
    description: 'Get a clear, practical roadmap for your website, app, CRM, ERP, automation, or digital marketing requirement.'
  });

  const [info, setInfo] = useState({
    title: 'A focused discovery call before you invest',
    subtitle: 'WHAT YOU GET',
    description: 'We review your idea, business goal, required pages or features, technology fit, timeline, and expected budget range. The result is a simple action plan your team can understand.',
    metadata: {
      checklist: [
        'Website or app feature planning',
        'Technology and hosting guidance',
        'Budget and timeline estimate',
        'SEO, conversion, and launch suggestions'
      ]
    }
  });

  const fetchNewCaptcha = async () => {
    try {
      const res = await fetch('/api/contact/captcha');
      const data = await res.json();
      if (res.ok) {
        setCaptchaSvg(data.captchaSvg);
        setCaptchaKey(data.captchaKey);
        setCaptchaValue(''); // clear previous input
      }
    } catch (err) {
      console.error('Error fetching captcha:', err);
    }
  };

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => el.classList.add('active'));
    window.scrollTo(0, 0);
    fetchNewCaptcha();

    // Fetch dynamic content from database
    const fetchConsultationData = async () => {
      const ids = ['consultation_hero', 'consultation_info'];
      try {
        const entries = await Promise.all(ids.map(async (id) => {
          const res = await fetch(`/api/content/${id}`);
          if (!res.ok) return null;
          const data = await res.json();
          return [id, data];
        }));
        const dataMap = Object.fromEntries(entries.filter(Boolean));
        if (dataMap.consultation_hero) {
          setHero({
            title: dataMap.consultation_hero.title,
            subtitle: dataMap.consultation_hero.subtitle,
            description: dataMap.consultation_hero.description
          });
        }
        if (dataMap.consultation_info) {
          setInfo({
            title: dataMap.consultation_info.title,
            subtitle: dataMap.consultation_info.subtitle,
            description: dataMap.consultation_info.description,
            metadata: dataMap.consultation_info.metadata || { checklist: [] }
          });
        }
      } catch (err) {
        // Fallbacks are configured in state
      }
    };
    fetchConsultationData();
  }, []);


  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');


    if (
      !formData.consultName.trim() ||
      formData.consultPhone.trim().length !== 10 ||
      !formData.consultEmail.trim() ||
      !formData.consultService
    ) {
      setSubmitError('Please fill out all fields correctly (phone must be 10 digits).');
      return;
    }

    if (!captchaValue.trim()) {
      setSubmitError('Please fill out the security verification.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName: formData.consultName,
          phone: formData.consultPhone,
          email: formData.consultEmail,
          service: formData.consultService,
          details: formData.consultMsg || 'Free Consultation Request',
          budget: 'Not Specified',
          captchaKey,
          captchaValue
        })
      });

      const data = await res.json();
      if (!res.ok) {
        fetchNewCaptcha(); // Reset captcha on wrong submission
        throw new Error(data.error || 'Failed to submit consultation request.');
      }

      setModalActive(true);
      setFormData({
        consultName: '',
        consultPhone: '',
        consultEmail: '',
        consultService: '',
        consultMsg: ''
      });
      setCaptchaValue('');
      fetchNewCaptcha();
    } catch (err) {
      setSubmitError(err.message || 'Server error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const closeModal = () => {
    setModalActive(false);
  };

  return (
    <>
      <div className="page-hero">
        <div className="container reveal slide-up">
          <h1 className="page-hero-title">{hero.title}</h1>
          <p className="page-hero-desc">{hero.description}</p>
        </div>
      </div>

      <section className="content-page">
        <div className="container split-grid">
          <div className="elegant-card reveal slide-left">
            <span className="section-tag">{info.subtitle}</span>
            <h2 className="section-title">{info.title}</h2>
            <p className="section-desc">{info.description}</p>
            <ul className="elegant-list">
              {(info.metadata?.checklist || []).map((item, idx) => (
                <li key={idx}><i className="ri-check-line"></i><span>{item}</span></li>
              ))}
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
                <label className="form-label" htmlFor="consultPhone">Phone (10 digits) *</label>
                <input 
                  className="form-control" 
                  type="tel" 
                  id="consultPhone" 
                  placeholder="10 digit mobile number" 
                  pattern="[0-9]{10}"
                  title="Please enter a 10 digit mobile number"
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

              {captchaSvg && (
                <div className="form-group captcha-group animate-fade-in" style={{ gridColumn: '1 / -1' }}>
                  <label htmlFor="captchaValue">Security Verification *</label>
                  <div className="captcha-container-row" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <div 
                      className="captcha-image-wrapper"
                      dangerouslySetInnerHTML={{ __html: captchaSvg }}
                      onClick={fetchNewCaptcha}
                      style={{ cursor: 'pointer', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '6px', padding: '6px' }}
                      title="Click to refresh captcha"
                    />
                    <button 
                      type="button" 
                      className="btn-captcha-refresh" 
                      onClick={fetchNewCaptcha}
                      style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: '18px' }}
                      title="Refresh Captcha"
                    >
                      <i className="ri-refresh-line"></i>
                    </button>
                    <input 
                      type="text" 
                      id="captchaValue" 
                      className="form-control"
                      placeholder="Enter code" 
                      value={captchaValue} 
                      onChange={(e) => setCaptchaValue(e.target.value)} 
                      required 
                      maxLength="6"
                      autoComplete="off"
                      style={{ flex: 1, margin: 0 }}
                    />
                  </div>
                </div>
              )}

              {submitError && (
                <div style={{ color: '#ef4444', fontSize: '13px', gridColumn: '1 / -1', marginTop: '10px', background: 'rgba(239, 68, 68, 0.05)', padding: '10px', borderRadius: '6px', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
                  <i className="ri-error-warning-line" style={{ marginRight: '6px' }}></i> {submitError}
                </div>
              )}

              <button type="submit" className="btn btn-primary" style={{ border: 'none', width: '100%', marginTop: '14px' }} disabled={submitting}>
                <span>{submitting ? 'Requesting...' : 'Request Consultation'}</span>
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
