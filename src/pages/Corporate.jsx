import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const defaultServiceHighlights = [
  { icon: 'ri-code-box-line', title: 'Custom Web Development', text: 'We offer interactive and visually rich responsive websites.' },
  { icon: 'ri-smartphone-line', title: 'Custom Application Development', text: 'We provide full-stack mobile application development services.' },
  { icon: 'ri-building-4-line', title: 'ERP Solutions', text: 'We provide ERP solutions that automate your business.' },
  { icon: 'ri-tools-line', title: 'Customized Software Development', text: 'We help you build high-quality software solutions.' }
];

const defaultWorkAreas = ['Web Development', 'Software Development', 'Application Development C.A.'];
const defaultStrengths = ['Custom Solutions', 'Reliable Service', 'Technical Intelligence', 'Resource Availability', 'Agile Process', 'Responsibility'];

const defaultProcessSteps = [
  { number: '01', title: 'Discussion', text: 'We understand your goals, challenges and business requirements before planning the solution.' },
  { number: '02', title: 'Development & Testing', text: 'We build the solution through agile execution and validate quality across key workflows.' },
  { number: '03', title: 'On Time Delivery', text: 'We deliver with clear milestones, handover support and practical launch readiness.' }
];

const Corporate = () => {
  // Default values as robust static fallbacks
  const [hero, setHero] = useState({
    title: 'Fastest Way To Grow Your Business Is Being With Us.',
    subtitle: 'UNIQUE OUTCOMES FROM EXPERIENCED DEVELOPERS',
    description: 'We strive to provide highly customized and reliable IT solutions for various business aspects.',
    image_url: '/assets/images/corporate_hero.png'
  });

  const [about, setAbout] = useState({
    title: 'Top Class IT Services Provider',
    subtitle: 'ABOUT US',
    description: 'Nexinfosoft is a full-service Digital agency based in India. We are professional, experienced and forward thinking, and our great strength is decoding our client\'s needs into effective solutions.',
    image_url: '/assets/images/corporate_about.png',
    metadata: {
      paragraphs: [
        "Nexinfosoft is a full-service Digital agency based in India. We are professional, experienced and forward thinking, and our great strength is decoding our client's needs into effective solutions.",
        "We live in the digital gamut and stay there round the clock to address your needs. We are uncommonly unique because we build tomorrow by developing premium brands, web portals and mobile apps seeing the future.",
        "We integrate marketing and branding with digital innovations. At Nexinfosoft, we believe in bringing more with a persistent search for triumph, and we begin where other agencies stop."
      ]
    }
  });

  const [mission, setMission] = useState({
    title: 'Functional Websites That Move Businesses Forward',
    subtitle: 'OUR MISSION',
    description: 'To deliver the most functional and attractive websites to our clients and help them take their businesses to the next level.',
    image_url: '/assets/images/corporate_mission.png',
    metadata: {
      vision: {
        title: 'Innovative And Dedicated IT Solutions',
        desc: 'To provide clients with the most innovative and dedicated IT solutions through continuous learning efforts.'
      }
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchCorporateData = async () => {
      // 1. Fetch Corporate Hero
      try {
        const res = await fetch('/api/content/corporate_hero');
        if (res.ok) {
          const data = await res.json();
          setHero(data);
        }
      } catch (err) {
        // Fallback is already configured
      }

      // 2. Fetch Corporate About
      try {
        const res = await fetch('/api/content/corporate_about');
        if (res.ok) {
          const data = await res.json();
          setAbout(data);
        }
      } catch (err) {
        // Fallback is already configured
      }

      // 3. Fetch Corporate Mission
      try {
        const res = await fetch('/api/content/corporate_mission');
        if (res.ok) {
          const data = await res.json();
          setMission(data);
        }
      } catch (err) {
        // Fallback is already configured
      }
    };

    fetchCorporateData();
  }, []);

  return (
    <div className="corporate-page">
      {/* ==========================================
          HERO SECTION
          ========================================== */}
      <section className="corporate-hero">
        {/* Dynamic Animated Background Blobs */}
        <div className="hero-bg-blobs">
          <div className="bg-blob blob-teal"></div>
          <div className="bg-blob blob-purple"></div>
          <div className="bg-blob blob-orange"></div>
        </div>

        <div className="container corporate-hero-grid">
          <div className="corporate-hero-content">
            <span className="section-tag-premium">{hero.subtitle || 'UNIQUE OUTCOMES FROM EXPERIENCED DEVELOPERS'}</span>
            <h1 className="hero-title-premium">{hero.title}</h1>
            <p className="hero-desc-premium">{hero.description}</p>
            <div className="hero-cta-btns">
              <Link to="/contact" className="btn btn-primary">
                <span>Get In Touch</span>
                <i className="ri-arrow-right-line"></i>
              </Link>
              <Link to="/free-consultation.html" className="btn btn-secondary">
                <span>Free Consultation</span>
              </Link>
            </div>
          </div>

          <div className="corporate-hero-image-container">
            <div className="corporate-hero-image-wrap">
              <img src={hero.image_url || '/assets/images/corporate_hero.png'} alt="Corporate IT Solutions" className="corporate-hero-image" />
              <div className="corporate-hero-image-overlay"></div>
            </div>
            {/* Floating visual badges */}
            <div className="corporate-floating-badge badge-reliability">
              <div className="badge-icon-circle">
                <i className="ri-shield-check-line"></i>
              </div>
              <div>
                <strong>100% Reliable</strong>
                <span>IT Support Partner</span>
              </div>
            </div>
            <div className="corporate-floating-badge badge-growth">
              <div className="badge-icon-circle green">
                <i className="ri-line-chart-line"></i>
              </div>
              <div>
                <strong>300+ Projects</strong>
                <span>Successfully Delivered</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SERVICES HIGHLIGHTS
          ========================================== */}
      <section className="corporate-section corporate-services-sec">
        <div className="container">
          <div className="corporate-service-grid">
            {(about.metadata?.serviceHighlights || defaultServiceHighlights).map((service, idx) => (
              <article className="corporate-service-card" key={idx}>
                <i className={service.icon}></i>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          ABOUT US SECTION
          ========================================== */}
      <section className="corporate-section corporate-about-sec">
        <div className="container corporate-about-grid">
          <div className="corporate-about-image-wrap">
            <img src={about.image_url || '/assets/images/corporate_about.png'} alt="Collaborative IT Development Team" className="corporate-about-image" />
            <div className="corporate-about-image-glow"></div>
          </div>

          <div className="corporate-about-copy">
            <span className="section-tag-premium">{about.subtitle || 'ABOUT US'}</span>
            <h2 className="section-title-premium">{about.title}</h2>
            {about.metadata?.paragraphs && Array.isArray(about.metadata.paragraphs) ? (
              about.metadata.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))
            ) : (
              <p>{about.description}</p>
            )}
          </div>
        </div>
      </section>

      {/* ==========================================
          WORK AREAS STRIP
          ========================================== */}
      <section className="corporate-work-strip-sec">
        <div className="container">
          <div className="corporate-work-strip-grid">
            {(about.metadata?.workAreas || defaultWorkAreas).map((area, index) => (
              <div className="corporate-work-strip-card" key={index}>
                <strong>{String(index + 1).padStart(2, '0')}</strong>
                <span>{area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          MISSION & VISION SECTION
          ========================================== */}
      <section className="corporate-section corporate-mission-sec">
        <div className="container corporate-mission-grid">
          <div className="corporate-mission-image-wrap">
            <img src={mission.image_url || '/assets/images/corporate_mission.png'} alt="Nexinfosoft Strategic Mission and Vision" className="corporate-mission-image" />
            <div className="corporate-mission-image-glow"></div>
          </div>

          <div className="corporate-mission-cards-stack">
            <article className="corporate-mission-card">
              <i className="ri-focus-3-line"></i>
              <span className="section-tag-premium">{mission.subtitle || 'OUR MISSION'}</span>
              <h3>{mission.title}</h3>
              <p>{mission.description}</p>
            </article>
            <article className="corporate-mission-card">
              <i className="ri-eye-line"></i>
              <span className="section-tag-premium">OUR VISION</span>
              <h3>{mission.metadata?.vision?.title || 'Innovative And Dedicated IT Solutions'}</h3>
              <p>{mission.metadata?.vision?.desc || 'To provide clients with the most innovative and dedicated IT solutions through continuous learning efforts.'}</p>
            </article>
          </div>
        </div>
      </section>

      {/* ==========================================
          STRENGTHS SECTION
          ========================================== */}
      <section className="corporate-section corporate-strength-sec">
        <div className="container">
          <div className="section-header-premium text-center">
            <span className="section-tag-premium text-center">HOW WE CAN BE THE BEST?</span>
            <h2 className="section-title-premium">We Provide The Best Way To Succeed</h2>
          </div>
          <div className="corporate-strength-grid">
            {(about.metadata?.strengths || defaultStrengths).map((strength, index) => (
              <div className="corporate-strength-pill" key={index}>
                <i className="ri-checkbox-circle-line"></i>
                <span>{strength}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          WORK PROCESS SECTION
          ========================================== */}
      <section className="corporate-section corporate-process-sec">
        <div className="container">
          <div className="section-header-premium text-center">
            <span className="section-tag-premium text-center">OUR WORK PROCESS</span>
            <h2 className="section-title-premium">We Follow Agile Methodology In Our Projects</h2>
          </div>
          <div className="corporate-process-grid">
            {(mission.metadata?.processSteps || defaultProcessSteps).map((step, idx) => (
              <article className="corporate-process-card" key={idx}>
                <strong>{step.number}</strong>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          DEDICATED PREMIUM CONSULTATION SECTION
          ========================================== */}
      <section className="corporate-consult-sec" id="consultation">
        <div className="container">
          <div className="corporate-consult-grid-premium">
            <div className="corporate-consult-info">
              <span className="section-tag-premium">READY TO START?</span>
              <h2 className="section-title-premium">Get A FREE Consultation Today</h2>
              <p className="section-desc-premium">
                Let us know what you want to build, and our expert IT consultants will get back to you with a comprehensive technical framework and custom solution blueprint within 24 hours.
              </p>
              <div className="corporate-consult-bullets">
                <div className="consult-bullet-item">
                  <i className="ri-checkbox-circle-fill"></i>
                  <span>Expert Technical Consultation</span>
                </div>
                <div className="consult-bullet-item">
                  <i className="ri-checkbox-circle-fill"></i>
                  <span>Custom Solution Architecture</span>
                </div>
                <div className="consult-bullet-item">
                  <i className="ri-checkbox-circle-fill"></i>
                  <span>No-obligation, Transparent Proposal</span>
                </div>
              </div>
            </div>

            <div className="corporate-consult-card">
              <span>Get In Touch With Us</span>
              <h2>Get A FREE Consultation Now!</h2>
              <p>Share your requirement and our team will help you choose the right technology approach.</p>
              <div className="corporate-mini-form">
                <div>Full name</div>
                <div>Your Email</div>
                <div>Phone no.</div>
                <div>Requirement</div>
              </div>
              <Link to="/contact" className="btn btn-primary">
                <span>Get A Call Back</span>
                <i className="ri-phone-line"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          BOTTOM CTA SECTION
          ========================================== */}
      <section className="corporate-cta">
        <div className="container corporate-cta-box">
          <div>
            <span className="section-tag-premium">LET'S BUILD TOGETHER</span>
            <h2>Ready to grow with a reliable IT partner?</h2>
            <p>Nexinfosoft is professional, experienced and forward thinking, with strength in decoding client needs into effective digital solutions.</p>
          </div>
          <Link to="/contact" className="btn btn-primary">
            <span>Contact Us</span>
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Corporate;
