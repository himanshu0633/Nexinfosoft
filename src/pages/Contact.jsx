import React, { useState, useEffect } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    userPhone: '',
    userService: '',
    userMsg: ''
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
    
    // Natively validate pattern/fields in state
    if (
      formData.userName.trim() &&
      formData.userEmail.trim() &&
      formData.userPhone.trim().length === 10 &&
      formData.userService &&
      formData.userMsg.trim()
    ) {
      setModalActive(true);
      setFormData({
        userName: '',
        userEmail: '',
        userPhone: '',
        userService: '',
        userMsg: ''
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
          <h1 className="page-hero-title">Start Engineering Your Digital Future</h1>
          <p className="page-hero-desc">Have a system in mind or need a free technical estimate? Drop us a note, and our engineering desk will respond within 4 hours.</p>
        </div>
      </div>

      <section className="contact-section">
        <div className="container contact-grid">
          
          {/* Left Info Column */}
          <div className="glass-card contact-info-card reveal slide-left">
            <div className="contact-info-header">
              <h3>Office Headquarters</h3>
              <p>Stop by our design center or contact our lines directly for urgent project escalations.</p>
            </div>
            
            <div className="contact-detail-items">
              <div className="contact-detail-item">
                <div className="contact-detail-icon">
                  <i className="ri-map-pin-line"></i>
                </div>
                <div>
                  <div className="contact-detail-title">Address</div>
                  <div className="contact-detail-text" style={{ fontSize: '14px', lineHeight: 1.4 }}>
                    Nexinfosoft IT Solutions
                  </div>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-detail-icon">
                  <i className="ri-phone-line"></i>
                </div>
                <div>
                  <div className="contact-detail-title">Direct Call Support</div>
                  <div className="contact-detail-text">+91 99995 30797</div>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-detail-icon">
                  <i className="ri-mail-line"></i>
                </div>
                <div>
                  <div className="contact-detail-title">Email Inquiries</div>
                  <div className="contact-detail-text">info@nexinfosoft.com</div>
                </div>
              </div>
            </div>

            {/* Custom Map Placeholder */}
            <div className="map-container">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14026.046903823485!2d77.08643875323412!3d28.49424759080517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d193fdf6c63b1%3A0xc3cbcf79a781b0a!2sDLF%20Phase%203%2C%20Sector%2024%2C%20Gurugram%2C%20Haryana%20122022!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }} 
                allowFullScreen="" 
                loading="lazy" 
                title="Google Maps DLF Phase 3 Sector 24 Gurugram"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Form Column */}
          <div className="contact-form-card reveal slide-right delay-200">
            <form id="contactForm" onSubmit={handleFormSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="userName">Your Name *</label>
                  <input 
                    className="form-control" 
                    type="text" 
                    id="userName" 
                    placeholder="eg. Amit Sharma" 
                    value={formData.userName}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="userEmail">Email Address *</label>
                  <input 
                    className="form-control" 
                    type="email" 
                    id="userEmail" 
                    placeholder="eg. amit@company.com" 
                    value={formData.userEmail}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="userPhone">Phone Number *</label>
                  <input 
                    className="form-control" 
                    type="tel" 
                    id="userPhone" 
                    placeholder="eg. 9876543210" 
                    pattern="[0-9]{10}" 
                    title="Please enter 10 digit mobile number" 
                    value={formData.userPhone}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="userService">Required Service *</label>
                  <select 
                    className="form-control" 
                    id="userService" 
                    style={{ backgroundColor: '#0d1426' }} 
                    value={formData.userService}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>Select system area</option>
                    <option value="web">Web Application</option>
                    <option value="mobile">Android / iOS App</option>
                    <option value="erp">Modular ERP System</option>
                    <option value="crm">Custom CRM Platform</option>
                    <option value="marketing">Digital Marketing</option>
                    <option value="uiux">UI/UX Layout Design</option>
                  </select>
                </div>
              </div>

              <div className="form-group full-width">
                <label className="form-label" htmlFor="userMsg">Message & Scope Brief *</label>
                <textarea 
                  className="form-control" 
                  id="userMsg" 
                  placeholder="Briefly describe your software system specifications, timelines, or goals..." 
                  value={formData.userMsg}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button className="btn btn-primary" type="submit" style={{ width: '100%', border: 'none' }}>
                <span>Submit System Request</span>
                <i className="ri-send-plane-line"></i>
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
          <div className="success-icon-box">
            <i className="ri-checkbox-circle-line"></i>
          </div>
          <h3 className="success-title">Proposal Submitted!</h3>
          <p className="success-desc">
            Your system scope has been successfully logged. Our senior engineering architect will review it and follow up within 4 hours.
          </p>
          <button 
            onClick={closeModal} 
            className="btn btn-primary modal-close-btn" 
            style={{ width: '100%', border: 'none' }}
          >
            <span>Back to Form</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Contact;
