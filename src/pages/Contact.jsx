import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import contactData from '../data/contactData';

// Custom scroll-triggered animated counter component
const AnimatedCounter = ({ value, duration = 1500 }) => {
  const [count, setCount] = useState('0');
  const ref = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    const match = value.toString().match(/^(\d+)(.*)$/);
    if (!match) {
      setCount(value);
      return;
    }
    const target = parseInt(match[1], 10);
    const suffix = match[2];

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          let currentStep = 0;
          const totalSteps = 40;
          const stepTime = duration / totalSteps;

          const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / totalSteps;
            const currentVal = Math.round(target * progress);
            if (currentStep >= totalSteps) {
              setCount(`${target}${suffix}`);
              clearInterval(timer);
            } else {
              setCount(`${currentVal}${suffix}`);
            }
          }, stepTime);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [value, duration]);

  return <span ref={ref}>{count}</span>;
};

const Contact = () => {
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    details: ''
  });

  const [modalActive, setModalActive] = useState(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);

  // Captcha states
  const [captchaSvg, setCaptchaSvg] = useState('');
  const [captchaKey, setCaptchaKey] = useState('');
  const [captchaValue, setCaptchaValue] = useState('');

  // Refs for tilt parallax
  const heroIllustrationRef = useRef(null);
  const ctaIllustrationRef = useRef(null);
  const contactMethodsScrollerRef = useRef(null);
  const contactWhyScrollerRef = useRef(null);
  const contactProcessScrollerRef = useRef(null);

  // Fetch new visual captcha from Express server
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

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
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
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          captchaKey,
          captchaValue
        })
      });

      const data = await res.json();
      if (!res.ok) {
        fetchNewCaptcha(); // Reset captcha on wrong submission to prevent reuse
        throw new Error(data.error || 'Failed to submit form.');
      }

      setModalActive(true);
      setFormData({
        fullName: '',
        companyName: '',
        email: '',
        phone: '',
        service: '',
        budget: '',
        details: ''
      });
      setCaptchaValue('');
      fetchNewCaptcha(); // Load new captcha for next use
    } catch (err) {
      setSubmitError(err.message || 'Server error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const closeModal = () => {
    setModalActive(false);
  };

  const toggleFaq = (index) => {
    if (activeFaqIndex === index) {
      setActiveFaqIndex(null);
    } else {
      setActiveFaqIndex(index);
    }
  };

  const handleCardMouseMove = (event, cardEl) => {
    if (!cardEl) return;
    const rect = cardEl.getBoundingClientRect();
    const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -6;
    const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 6;
    cardEl.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
  };

  const handleCardMouseLeave = (cardEl) => {
    if (!cardEl) return;
    cardEl.style.transform = '';
  };

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => el.classList.add('active'));
    window.scrollTo(0, 0);
    fetchNewCaptcha();
  }, []);

  useEffect(() => {
    const scrollers = [
      { ref: contactMethodsScrollerRef, itemSelector: '.contact-method-card' },
      { ref: contactWhyScrollerRef, itemSelector: '.why-glass-card' },
      { ref: contactProcessScrollerRef, itemSelector: '.contact-timeline-node-card' }
    ];
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    const timers = [];
    const resumeTimers = [];

    const stopAutoScroll = () => {
      timers.splice(0).forEach(clearInterval);
      resumeTimers.splice(0).forEach(clearTimeout);
    };

    const startAutoScroll = () => {
      stopAutoScroll();
      if (!mobileQuery.matches) return;

      scrollers.forEach(({ ref, itemSelector }) => {
        const scroller = ref.current;
        if (!scroller) return;

        const timer = setInterval(() => {
          const firstItem = scroller.querySelector(itemSelector);
          if (!firstItem) return;

          const cardWidth = firstItem.getBoundingClientRect().width;
          const gap = parseFloat(window.getComputedStyle(scroller).gap) || 0;
          const maxScroll = scroller.scrollWidth - scroller.clientWidth;
          const nextLeft = scroller.scrollLeft + cardWidth + gap;

          scroller.scrollTo({
            left: nextLeft >= maxScroll - 4 ? 0 : nextLeft,
            behavior: 'smooth'
          });
        }, 1000);

        timers.push(timer);
      });
    };

    const pauseThenResume = () => {
      stopAutoScroll();
      resumeTimers.push(setTimeout(startAutoScroll, 2200));
    };

    const pauseAutoScroll = () => stopAutoScroll();
    const resumeAutoScroll = () => startAutoScroll();

    startAutoScroll();

    scrollers.forEach(({ ref }) => {
      const scroller = ref.current;
      if (scroller) {
        scroller.addEventListener('touchstart', pauseThenResume, { passive: true });
        scroller.addEventListener('mouseenter', pauseAutoScroll);
        scroller.addEventListener('focusin', pauseAutoScroll);
        scroller.addEventListener('mouseleave', resumeAutoScroll);
        scroller.addEventListener('focusout', resumeAutoScroll);
      }
    });

    mobileQuery.addEventListener('change', startAutoScroll);

    return () => {
      stopAutoScroll();
      mobileQuery.removeEventListener('change', startAutoScroll);
      scrollers.forEach(({ ref }) => {
        const scroller = ref.current;
        if (scroller) {
          scroller.removeEventListener('touchstart', pauseThenResume);
          scroller.removeEventListener('mouseenter', pauseAutoScroll);
          scroller.removeEventListener('focusin', pauseAutoScroll);
          scroller.removeEventListener('mouseleave', resumeAutoScroll);
          scroller.removeEventListener('focusout', resumeAutoScroll);
        }
      });
    };
  }, []);

  return (
    <div className="contact-page-wrapper">
      {/* ==========================================================================
         SECTION 1: HERO SECTION
         ========================================================================== */}
      <section className="contact-hero-sec">
        {/* Soft glowing mesh background */}
        <div className="contact-mesh-grid"></div>
        <div className="contact-glow-accent glow-one"></div>
        <div className="contact-glow-accent glow-two"></div>

        <div className="container">
          <div className="contact-hero-grid">
            <div className="contact-hero-left reveal slide-left">
              <span className="section-tag-premium">CONTACT US</span>
              <h1 className="contact-hero-title">
                Let's Build Something Amazing Together
              </h1>
              <p className="contact-hero-desc">
                Have a project idea, need a business website, ERP system, mobile app, or custom software solution? Let's discuss your requirements.
              </p>

              {/* Action Buttons */}
              <div className="contact-hero-btns">
             
                <a href="#contact-methods" className="btn btn-secondary">
                  <span>Book Free Consultation</span>
                  <i className="ri-chat-smile-2-line"></i>
                </a>
                <a href="#contact-methods" className="btn btn-secondary">
                  <span>Schedule Call</span>
                  <i className="ri-phone-line"></i>
                </a>
              </div>

              {/* Stats Counters */}
              <div className="contact-hero-stats">
                <div className="con-stat-item">
                  <h3><AnimatedCounter value="300+" /></h3>
                  <span>Projects Delivered</span>
                </div>
                <div className="con-stat-item">
                  <h3><AnimatedCounter value="250+" /></h3>
                  <span>Happy Clients</span>
                </div>
                <div className="con-stat-item">
                  <h3><AnimatedCounter value="24/7" /></h3>
                  <span>Support Sync</span>
                </div>
              </div>
            </div>

            <div className="contact-hero-right reveal slide-right delay-200">
              <div 
                ref={heroIllustrationRef}
                className="contact-hero-illustration"
                onMouseMove={(e) => handleCardMouseMove(e, heroIllustrationRef.current)}
                onMouseLeave={() => handleCardMouseLeave(heroIllustrationRef.current)}
              >
                {/* 3D Dashboard Mockup Design representation */}
                <div className="contact-hero-3d-box">
                  <div className="con-3d-head">
                    <div className="con-dots">
                      <span></span><span></span><span></span>
                    </div>
                    <div className="con-title">Communication Telemetry</div>
                  </div>
                  <div className="con-3d-body">
                    <i className="ri-customer-service-2-fill"></i>
                  </div>
                </div>

                {/* Floating Cards */}
                <div className="con-floating-card c-card-one">
                  <i className="ri-phone-fill"></i>
                  <span>Call Us</span>
                </div>
                <div className="con-floating-card c-card-two">
                  <i className="ri-mail-fill"></i>
                  <span>Email Us</span>
                </div>
                <div className="con-floating-card c-card-three">
                  <i className="ri-whatsapp-fill"></i>
                  <span>WhatsApp Support</span>
                </div>
                <div className="con-floating-card c-card-four">
                  <i className="ri-map-pin-fill"></i>
                  <span>Visit Office</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 2: CONTACT METHODS SECTION (4 PREMIUM CARDS)
         ========================================================================== */}
      <section id="contact-methods" className="contact-methods-sec">
        <div className="container">
          <div ref={contactMethodsScrollerRef} className="contact-methods-grid contact-methods-mobile-scroll">
            {contactData.contactMethods.map((method, idx) => (
              <a 
                href={method.link} 
                target="_blank" 
                rel="noreferrer" 
                key={idx} 
                className="contact-method-card reveal slide-up"
                style={{ '--delay': `${idx * 100}ms` }}
              >
                <div className="method-icon-wrap" style={{ background: method.color }}>
                  <i className={method.icon}></i>
                </div>
                <h3>{method.title}</h3>
                <strong>{method.detail}</strong>
                <span>{method.sub}</span>
                <div className="method-card-glow"></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 3: CONTACT FORM + MAP LAYOUT
         ========================================================================== */}
      <section className="contact-form-map-sec">
        <div className="container">
          <div className="contact-form-map-grid">
            {/* Left Glass Form */}
            <div className="contact-form-wrapper reveal slide-left">
              <h3>Inquire About Your System</h3>
              <p>Complete our strategic scope form to coordinate a free technical consultation.</p>

              <form onSubmit={handleFormSubmit}>
                <div className="form-double-row">
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name *</label>
                    <input 
                      type="text" 
                      id="fullName" 
                      placeholder="Amit Sharma" 
                      value={formData.fullName} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="companyName">Company Name</label>
                    <input 
                      type="text" 
                      id="companyName" 
                      placeholder="Nexinfosoft Agency" 
                      value={formData.companyName} 
                      onChange={handleInputChange} 
                    />
                  </div>
                </div>

                <div className="form-double-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input 
                      type="email" 
                      id="email" 
                      placeholder="amit@nexinfosoft.com" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      placeholder="9999530797" 
                      pattern="[0-9]{10}"
                      title="Please enter a 10 digit mobile number"
                      value={formData.phone} 
                      onChange={handleInputChange} 
                      required 
                    />
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
                  <textarea 
                    id="details" 
                    placeholder="Briefly describe your software specifications, database integrations, or future objectives..." 
                    value={formData.details} 
                    onChange={handleInputChange} 
                    required
                  ></textarea>
                </div>

                {captchaSvg && (
                  <div className="form-group captcha-group animate-fade-in">
                    <label htmlFor="captchaValue">Security Verification *</label>
                    <div className="captcha-container-row">
                      <div 
                        className="captcha-image-wrapper"
                        dangerouslySetInnerHTML={{ __html: captchaSvg }}
                        onClick={fetchNewCaptcha}
                        title="Click to refresh captcha"
                      />
                      <button 
                        type="button" 
                        className="btn-captcha-refresh" 
                        onClick={fetchNewCaptcha}
                        title="Refresh Captcha"
                      >
                        <i className="ri-refresh-line"></i>
                      </button>
                      <input 
                        type="text" 
                        id="captchaValue" 
                        placeholder="Enter captcha code" 
                        value={captchaValue} 
                        onChange={(e) => setCaptchaValue(e.target.value)} 
                        required 
                        maxLength="6"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                )}

                {submitError && (
                  <div style={{ color: '#ef4444', fontSize: '13px', marginBottom: '14px', background: 'rgba(239, 68, 68, 0.05)', padding: '10px', borderRadius: '6px', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
                    <i className="ri-error-warning-line" style={{ marginRight: '6px' }}></i> {submitError}
                  </div>
                )}

                <button type="submit" className="btn btn-primary form-submit-btn" disabled={submitting}>
                  <span>{submitting ? '🚀 Submitting...' : '🚀 Get Free Consultation'}</span>
                </button>
              </form>
            </div>

            {/* Right Map & Location Card */}
            <div className="contact-location-wrapper reveal slide-right delay-200">
              <div className="interactive-office-card">
                <div className="card-top-accent"></div>
                <h3>Headquarters Location</h3>
                
                <div className="location-info-lines">
                  <div className="info-line">
                    <i className="ri-map-pin-fill"></i>
                    <div>
                      <strong>Office Address</strong>
                      <p>Gurugram, Haryana, India</p>
                    </div>
                  </div>
                  <div className="info-line">
                    <i className="ri-phone-fill"></i>
                    <div>
                      <strong>Direct Phone Lines</strong>
                      <p>+91 99995 30797</p>
                    </div>
                  </div>
                  <div className="info-line">
                    <i className="ri-mail-fill"></i>
                    <div>
                      <strong>General Email Desk</strong>
                      <p>info@nexinfosoft.com</p>
                    </div>
                  </div>
                  <div className="info-line">
                    <i className="ri-time-fill"></i>
                    <div>
                      <strong>Working Hours</strong>
                      <p>Mon - Sat (9:00 AM - 7:00 PM)</p>
                    </div>
                  </div>
                </div>

                {/* Google Map Embed */}
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

      {/* ==========================================================================
         SECTION 4: WHY CHOOSE NEXINFOSOFT
         ========================================================================== */}
      <section className="contact-why-sec">
        <div className="container">
          <div className="section-header-premium reveal slide-up">
            <span className="section-tag-premium text-center">WHY NEXINFOSOFT</span>
            <h2 className="section-title-premium text-center">
              Why Organizations Partner With Nexinfosoft
            </h2>
            <p className="section-desc-premium text-center">
              We merge modern architectural frameworks with strategic business development objectives.
            </p>
          </div>

          <div ref={contactWhyScrollerRef} className="why-choose-glass-grid contact-why-mobile-scroll">
            {contactData.whyChoose.map((item, idx) => (
              <div key={idx} className="why-glass-card reveal slide-up" style={{ '--delay': `${idx * 80}ms` }}>
                <div className="why-icon-badge">
                  <i className={item.icon}></i>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 5: PROJECT DISCUSSION PROCESS TIMELINE
         ========================================================================== */}
      <section className="contact-process-sec">
        <div className="container">
          <div className="section-header-premium reveal slide-up">
            <span className="section-tag-premium text-center">OUR ROADMAP</span>
            <h2 className="section-title-premium text-center">
              Project Discussion Process
            </h2>
            <p className="section-desc-premium text-center">
              A highly strategic workflow built to capture your objectives accurately from the very first call.
            </p>
          </div>

          {/* Timeline progress connector */}
          <div className="contact-timeline-wrapper reveal slide-up">
            <div className="timeline-connector-line"></div>

            <div ref={contactProcessScrollerRef} className="timeline-process-grid contact-process-mobile-scroll">
              {contactData.processTimeline.map((step, idx) => (
                <div key={idx} className="contact-timeline-node-card">
                  <div className="node-icon-circle-wrap">
                    <div className="node-badge-outer">
                      <div className="node-badge-number">{step.step}</div>
                    </div>
                  </div>
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 6: FAQ ACCORDIONS
         ========================================================================== */}
      <section className="contact-faq-sec">
        <div className="container">
          <div className="contact-faq-grid">
            <div className="faq-grid-left reveal slide-left">
              <span className="section-tag-premium">QUESTIONS</span>
              <h2 className="section-title-premium">
                Frequently Asked Questions
              </h2>
              <p className="section-desc-premium">
                Have questions regarding NDAs, project timelines, support agreements, or billing models? Explore our quick resources.
              </p>
            </div>

            <div className="faq-grid-right reveal slide-right delay-200">
              <div className="accordion-faq-list">
                {contactData.faqs.map((faq, idx) => (
                  <div 
                    key={idx} 
                    className={`accordion-faq-card ${activeFaqIndex === idx ? 'faq-active' : ''}`}
                    onClick={() => toggleFaq(idx)}
                  >
                    <div className="faq-card-head">
                      <h4>{faq.q}</h4>
                      <div className="faq-toggle-icon">
                        <i className="ri-add-line"></i>
                      </div>
                    </div>
                    
                    <div className="faq-card-body">
                      <p>{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 7: CTA SECTION (DARK GRADIENT)
         ========================================================================== */}
      <section className="contact-final-cta-sec">
        <div className="container">
          <div className="final-cta-dark-card reveal slide-up">
            <div className="final-cta-glow glow-one"></div>
            <div className="final-cta-glow glow-two"></div>

            <div className="final-cta-inner-grid">
              <div className="final-cta-left">
                <h2 className="final-cta-title">
                  Ready To Start Your Project?
                </h2>
                <p className="final-cta-desc">
                  Let's discuss your idea and build a scalable digital solution.
                </p>

                <div className="final-cta-buttons">
                  <Link to="/contact" className="btn btn-primary">
                    <span>Book Consultation</span>
                    <i className="ri-magic-line"></i>
                  </Link>
                  <a href="https://wa.me/919999530797" target="_blank" rel="noreferrer" className="btn btn-secondary">
                    <span>WhatsApp Us</span>
                    <i className="ri-whatsapp-line"></i>
                  </a>
                </div>
              </div>

              <div className="final-cta-right">
                <div 
                  ref={ctaIllustrationRef}
                  className="cta-illustration-container"
                  onMouseMove={(e) => handleCardMouseMove(e, ctaIllustrationRef.current)}
                  onMouseLeave={() => handleCardMouseLeave(ctaIllustrationRef.current)}
                >
                  <div className="cta-icon-glass-bubble tech-sphere-bubble">
                    <i className="ri-rocket-fill"></i>
                  </div>
                  
                  {/* Orbiting particles */}
                  <div className="tech-sphere-floating-logo t-logo-react"><i className="ri-global-line"></i></div>
                  <div className="tech-sphere-floating-logo t-logo-node"><i className="ri-flashlight-line"></i></div>
                  <div className="tech-sphere-floating-logo t-logo-aws"><i className="ri-shield-keyhole-line"></i></div>
                  <div className="tech-sphere-floating-logo t-logo-flutter"><i className="ri-code-box-line"></i></div>
                </div>
              </div>
            </div>
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
          <button onClick={closeModal} className="btn btn-primary modal-close-btn">
            <span>Back to Form</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
