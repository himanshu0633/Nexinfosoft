import React, { useEffect, useState } from 'react';

const initialFormData = {
  fullName: '',
  companyName: '',
  email: '',
  phone: '',
  service: '',
  budget: '',
  details: ''
};

const InquireSystemSection = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [captchaSvg, setCaptchaSvg] = useState('');
  const [captchaKey, setCaptchaKey] = useState('');
  const [captchaValue, setCaptchaValue] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [modalActive, setModalActive] = useState(false);

  const fetchNewCaptcha = async () => {
    try {
      const res = await fetch('/api/contact/captcha');
      const data = await res.json();
      if (res.ok) {
        setCaptchaSvg(data.captchaSvg);
        setCaptchaKey(data.captchaKey);
        setCaptchaValue('');
      }
    } catch (err) {
      setSubmitError('Unable to load security verification.');
    }
  };

  useEffect(() => {
    fetchNewCaptcha();
  }, []);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((current) => ({ ...current, [id]: value }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setSubmitError('');

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      formData.phone.trim().length !== 10 ||
      !formData.service ||
      !formData.budget ||
      !formData.details.trim()
    ) {
      setSubmitError('Please fill out all fields correctly.');
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, captchaKey, captchaValue })
      });
      const data = await res.json();

      if (!res.ok) {
        fetchNewCaptcha();
        throw new Error(data.error || 'Failed to submit form.');
      }

      setFormData(initialFormData);
      setCaptchaValue('');
      setModalActive(true);
      fetchNewCaptcha();
    } catch (err) {
      setSubmitError(err.message || 'Server error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="contact-form-map-sec">
        <div className="container">
          <div className="contact-form-map-grid">
            <div className="contact-form-wrapper reveal slide-left active">
              <h3>Inquire About Your System</h3>
              <p>Complete our strategic scope form to coordinate a free technical consultation.</p>

              <form onSubmit={handleFormSubmit}>
                <div className="form-double-row">
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name *</label>
                    <input type="text" id="fullName" placeholder="Amit Sharma" value={formData.fullName} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="companyName">Company Name</label>
                    <input type="text" id="companyName" placeholder="Nexinfosoft Agency" value={formData.companyName} onChange={handleInputChange} />
                  </div>
                </div>

                <div className="form-double-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input type="email" id="email" placeholder="amit@nexinfosoft.com" value={formData.email} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input type="tel" id="phone" placeholder="9999530797" pattern="[0-9]{10}" title="Please enter a 10 digit mobile number" value={formData.phone} onChange={handleInputChange} required />
                  </div>
                </div>

                <div className="form-double-row">
                  <div className="form-group">
                    <label htmlFor="service">Service Required *</label>
                    <select id="service" value={formData.service} onChange={handleInputChange} required>
                      <option value="" disabled>Select Service Category</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Mobile App">Mobile App</option>
                      <option value="ERP System">ERP System</option>
                      <option value="CRM Software">CRM Software</option>
                      <option value="AI Automation">AI Automation</option>
                      <option value="Digital Marketing">Digital Marketing</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="budget">Budget Range *</label>
                    <select id="budget" value={formData.budget} onChange={handleInputChange} required>
                      <option value="" disabled>Select Estimate Budget</option>
                      <option value="< ₹50k">&lt; ₹50,000</option>
                      <option value="₹50k - ₹1L">₹50,000 - ₹1,00,000</option>
                      <option value="₹1L - ₹3L">₹1,00,000 - ₹3,00,000</option>
                      <option value="₹3L - ₹5L">₹3,00,000 - ₹5,00,000</option>
                      <option value="> ₹5L">&gt; ₹5,00,000</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="details">Project Details & Objectives *</label>
                  <textarea id="details" placeholder="Briefly describe your software specifications, database integrations, or future objectives..." value={formData.details} onChange={handleInputChange} required />
                </div>

                {captchaSvg && (
                  <div className="form-group captcha-group animate-fade-in">
                    <label htmlFor="captchaValue">Security Verification *</label>
                    <div className="captcha-container-row">
                      <div className="captcha-image-wrapper" dangerouslySetInnerHTML={{ __html: captchaSvg }} onClick={fetchNewCaptcha} title="Click to refresh captcha" />
                      <button type="button" className="btn-captcha-refresh" onClick={fetchNewCaptcha} title="Refresh Captcha">
                        <i className="ri-refresh-line"></i>
                      </button>
                      <input type="text" id="captchaValue" placeholder="Enter captcha code" value={captchaValue} onChange={(event) => setCaptchaValue(event.target.value)} required maxLength="6" autoComplete="off" />
                    </div>
                  </div>
                )}

                {submitError && (
                  <div style={{ color: '#ef4444', fontSize: '13px', marginBottom: '14px', background: 'rgba(239, 68, 68, 0.05)', padding: '10px', borderRadius: '6px', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
                    <i className="ri-error-warning-line" style={{ marginRight: '6px' }}></i>{submitError}
                  </div>
                )}

                <button type="submit" className="btn btn-primary form-submit-btn" disabled={submitting}>
                  <span>{submitting ? 'Submitting...' : 'Get Free Consultation'}</span>
                </button>
              </form>
            </div>

            <div className="contact-location-wrapper reveal slide-right delay-200 active">
              <div className="interactive-office-card">
                <div className="card-top-accent"></div>
                <h3>Headquarters Location</h3>
                <div className="location-info-lines">
                  <div className="info-line"><i className="ri-map-pin-fill"></i><div><strong>Office Address</strong><p>Gurugram, Haryana, India</p></div></div>
                  <div className="info-line"><i className="ri-phone-fill"></i><div><strong>Direct Phone Lines</strong><p>+91 99995 30797</p></div></div>
                  <div className="info-line"><i className="ri-mail-fill"></i><div><strong>General Email Desk</strong><p>info@nexinfosoft.com</p></div></div>
                  <div className="info-line"><i className="ri-time-fill"></i><div><strong>Working Hours</strong><p>Mon - Sat (9:00 AM - 7:00 PM)</p></div></div>
                </div>
                <div className="office-map-embed">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112218.1724608316!2d77.026638!3d28.4594965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19d582e38859%3A0x2cf5b8e5c2e11e3d!2sGurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Google Maps Gurugram Office Location"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={`modal-overlay ${modalActive ? 'active' : ''}`} onClick={() => setModalActive(false)}>
        <div className="success-modal" onClick={(event) => event.stopPropagation()}>
          <div className="success-icon-box"><i className="ri-checkbox-circle-line"></i></div>
          <h3 className="success-title">Proposal Submitted!</h3>
          <p className="success-desc">Your system scope has been successfully logged. Our senior engineering architect will review it and follow up within 4 hours.</p>
          <button onClick={() => setModalActive(false)} className="btn btn-primary modal-close-btn"><span>Back to Form</span></button>
        </div>
      </div>
    </>
  );
};

export default InquireSystemSection;
