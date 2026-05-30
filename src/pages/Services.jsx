import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

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

const Services = () => {
  const heroMockupRef = useRef(null);
  const ctaRocketRef = useRef(null);

  // Parallax mouse tilt handler
  const handleMouseMove = (event, element, intensity = 6) => {
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -intensity;
    const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * intensity;
    
    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (element) => {
    if (!element) return;
    element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  useEffect(() => {
    // Scroll reveal fallbacks
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => el.classList.add('active'));
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="services-page-wrapper">
      {/* ==========================================================================
         SECTION 1: HERO SECTION
         ========================================================================== */}
      <section className="services-hero-sec">
        <div className="container">
          <div className="services-hero-grid">
            <div className="services-hero-left reveal slide-left">
              <span className="section-tag-premium">OUR EXPERTISE</span>
              <h1 className="hero-title-premium">
                Digital Solutions <br />
                <span className="gradient-text-accent">That Drive Business Growth</span>
              </h1>
              <p className="hero-desc-premium">
                We build scalable web applications, mobile apps, ERP systems, CRM solutions, AI automation platforms, and custom software that help businesses streamline operations and grow faster.
              </p>
              
              <div className="hero-cta-btns">
                <a href="#services-grid" className="btn btn-primary">
                  <span>Explore Services</span>
                </a>
                <Link to="/contact" className="btn btn-secondary">
                  <span>Schedule A Call</span>
                </Link>
              </div>

              {/* Statistics row */}
              <div className="hero-stats-row">
                <div className="hero-stat-box">
                  <h3><AnimatedCounter value="10+" /></h3>
                  <span>Years Experience</span>
                </div>
                <div className="hero-stat-box">
                  <h3><AnimatedCounter value="300+" /></h3>
                  <span>Projects Delivered</span>
                </div>
                <div className="hero-stat-box">
                  <h3><AnimatedCounter value="250+" /></h3>
                  <span>Happy Clients</span>
                </div>
                <div className="hero-stat-box">
                  <h3><AnimatedCounter value="50+" /></h3>
                  <span>Tech Experts</span>
                </div>
              </div>
            </div>

            <div className="services-hero-right reveal slide-right delay-200">
              <div 
                ref={heroMockupRef}
                className="saas-dashboard-mockup-wrapper"
                onMouseMove={(e) => handleMouseMove(e, heroMockupRef.current, 5)}
                onMouseLeave={() => handleMouseLeave(heroMockupRef.current)}
              >
                {/* Glowing gradients */}
                <div className="saas-mesh-glow glow-cyan"></div>
                <div className="saas-mesh-glow glow-magenta"></div>

                {/* Dashboard Box representation */}
                <div className="saas-dashboard-glass-frame">
                  <div className="saas-dashboard-head">
                    <div className="saas-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div className="saas-title">Dashboard Overview</div>
                    <div className="saas-pulse-badge">
                      <span className="pulse-dot"></span>
                      <span>System Online</span>
                    </div>
                  </div>

                  <div className="saas-dashboard-body">
                    <div className="saas-body-nav">
                      <div className="nav-item active"></div>
                      <div className="nav-item"></div>
                      <div className="nav-item"></div>
                    </div>
                    <div className="saas-body-main">
                      <div className="saas-kpis">
                        <div className="saas-kpi-card">
                          <span>Total Revenue</span>
                          <strong>$85,842</strong>
                          <span className="trend positive"><i className="ri-arrow-up-line"></i> +12.5%</span>
                        </div>
                        <div className="saas-kpi-card">
                          <span>New Accounts</span>
                          <strong>1,248</strong>
                          <span className="trend positive"><i className="ri-arrow-up-line"></i> +8.4%</span>
                        </div>
                        <div className="saas-kpi-card">
                          <span>Active Projects</span>
                          <strong>32</strong>
                          <span className="trend stable"><i className="ri-pulse-line"></i> Stable</span>
                        </div>
                      </div>
                      
                      <div className="saas-charts-grid">
                        <div className="chart-item flex-chart">
                          <svg viewBox="0 0 160 60" width="100%" height="100%">
                            <path d="M 0 50 Q 20 20, 40 40 T 80 15 T 120 45 T 160 10" fill="none" stroke="var(--accent)" strokeWidth="2.5" />
                          </svg>
                        </div>
                        <div className="chart-item pie-chart">
                          <svg viewBox="0 0 60 60" width="100%" height="100%">
                            <circle cx="30" cy="30" r="20" stroke="rgba(255,255,255,0.05)" strokeWidth="10" fill="none" />
                            <circle cx="30" cy="30" r="20" stroke="var(--secondary)" strokeWidth="10" fill="none" strokeDasharray="125" strokeDashoffset="42" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating service pills around it */}
                <div className="floating-service-pill pill-web">
                  <i className="ri-global-line"></i>
                  <span>Web Development</span>
                </div>

                <div className="floating-service-pill pill-mobile">
                  <i className="ri-smartphone-line"></i>
                  <span>Mobile Applications</span>
                </div>

                <div className="floating-service-pill pill-erp">
                  <i className="ri-database-2-line"></i>
                  <span>ERP Systems</span>
                </div>

                <div className="floating-service-pill pill-crm">
                  <i className="ri-user-shared-line"></i>
                  <span>CRM Solutions</span>
                </div>

                <div className="floating-service-pill pill-ai">
                  <i className="ri-brain-line"></i>
                  <span>AI Automation</span>
                </div>

                <div className="floating-service-pill pill-cloud">
                  <i className="ri-cloud-line"></i>
                  <span>Cloud Infrastructure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 2: SERVICES BENTO GRID SHOWCASE
         ========================================================================== */}
      <section id="services-grid" className="services-index-section">
        <div className="container">
          <div className="section-header-premium reveal slide-up">
            <span className="section-tag-premium text-center">OUR SERVICES</span>
            <h2 className="section-title-premium text-center">
              Choose The Service Your Business Needs
            </h2>
            <p className="section-desc-premium text-center">
              Explore our core competencies designed to boost your operational intelligence, streamline process delivery, and capture market authority.
            </p>
          </div>

          <div className="services-bento-grid">
            {/* Card 1: Business Website */}
            <div className="bento-card card-size-small reveal slide-up delay-100">
              <div className="bento-top-accent"></div>
              <div className="bento-icon-wrap" style={{ background: 'rgba(20, 184, 166, 0.1)', color: 'var(--accent)' }}>
                <i className="ri-window-line"></i>
              </div>
              <h3>Business Website</h3>
              <p>Modern, responsive websites that build trust and grow your business online.</p>
              <ul className="bento-checklist">
                <li><i className="ri-checkbox-circle-fill"></i> Responsive Design</li>
                <li><i className="ri-checkbox-circle-fill"></i> Fast & Secure</li>
                <li><i className="ri-checkbox-circle-fill"></i> SEO Friendly</li>
              </ul>
              <Link to="/service/business-website" className="bento-learn-btn">
                <span>Learn More</span>
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>

            {/* Card 2: E-Commerce Website */}
            <div className="bento-card card-size-small reveal slide-up delay-200">
              <div className="bento-top-accent accent-purple"></div>
              <div className="bento-icon-wrap" style={{ background: 'rgba(139, 92, 246, 0.1)', color: 'var(--secondary)' }}>
                <i className="ri-shopping-bag-3-line"></i>
              </div>
              <h3>E-Commerce Website</h3>
              <p>Secure, scalable and feature-rich eCommerce solutions that drive sales and conversions.</p>
              <ul className="bento-checklist">
                <li><i className="ri-checkbox-circle-fill"></i> Product Management</li>
                <li><i className="ri-checkbox-circle-fill"></i> Secure Checkout</li>
                <li><i className="ri-checkbox-circle-fill"></i> Order Tracking</li>
              </ul>
              <Link to="/service/ecommerce-website" className="bento-learn-btn">
                <span>Learn More</span>
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>

            {/* Card 3: Custom Web Development */}
            <div className="bento-card card-size-medium reveal slide-up delay-300">
              <div className="bento-top-accent accent-blue"></div>
              <div className="bento-icon-wrap" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)' }}>
                <i className="ri-code-s-slash-line"></i>
              </div>
              <h3>Custom Web Development</h3>
              <p>Custom websites and web apps built for performance, scalability and unique business needs.</p>
              <ul className="bento-checklist">
                <li><i className="ri-checkbox-circle-fill"></i> Tailored Solutions</li>
                <li><i className="ri-checkbox-circle-fill"></i> Dashboard & Portals</li>
                <li><i className="ri-checkbox-circle-fill"></i> API Integrations</li>
              </ul>
              <Link to="/service/custom-web-development" className="bento-learn-btn">
                <span>Learn More</span>
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>

            {/* Card 4: Mobile Applications */}
            <div className="bento-card card-size-medium reveal slide-up delay-100">
              <div className="bento-top-accent accent-green"></div>
              <div className="bento-icon-wrap" style={{ background: 'rgba(143, 184, 74, 0.1)', color: '#8fba4a' }}>
                <i className="ri-smartphone-line"></i>
              </div>
              <h3>Mobile Applications</h3>
              <p>Cross-platform mobile apps for iOS and Android that engage users and grow your brand.</p>
              <ul className="bento-checklist">
                <li><i className="ri-checkbox-circle-fill"></i> Native Performance</li>
                <li><i className="ri-checkbox-circle-fill"></i> User Friendly UI</li>
                <li><i className="ri-checkbox-circle-fill"></i> Push Notifications</li>
              </ul>
              <Link to="/service/mobile-applications" className="bento-learn-btn">
                <span>Learn More</span>
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>

            {/* Card 5: Branding & Design */}
            <div className="bento-card card-size-small reveal slide-up delay-200">
              <div className="bento-top-accent accent-yellow"></div>
              <div className="bento-icon-wrap" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                <i className="ri-palette-line"></i>
              </div>
              <h3>Branding & Design</h3>
              <p>Creative branding and graphic design that helps your business stand out and connect.</p>
              <ul className="bento-checklist">
                <li><i className="ri-checkbox-circle-fill"></i> Logo & Identity</li>
                <li><i className="ri-checkbox-circle-fill"></i> UI/UX Design</li>
                <li><i className="ri-checkbox-circle-fill"></i> Visual Consistency</li>
              </ul>
              <Link to="/service/branding-graphic-design" className="bento-learn-btn">
                <span>Learn More</span>
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>

            {/* Card 6: Digital Marketing */}
            <div className="bento-card card-size-small reveal slide-up delay-300">
              <div className="bento-top-accent accent-pink"></div>
              <div className="bento-icon-wrap" style={{ background: 'rgba(236, 72, 153, 0.1)', color: '#ec4899' }}>
                <i className="ri-megaphone-line"></i>
              </div>
              <h3>Digital Marketing</h3>
              <p>Data-driven marketing strategies to increase visibility, leads and business growth.</p>
              <ul className="bento-checklist">
                <li><i className="ri-checkbox-circle-fill"></i> SEO & SEM</li>
                <li><i className="ri-checkbox-circle-fill"></i> Social Media</li>
                <li><i className="ri-checkbox-circle-fill"></i> Lead Generation</li>
              </ul>
              <Link to="/service/digital-marketing" className="bento-learn-btn">
                <span>Learn More</span>
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>

            {/* Card 7: ERP Development */}
            <div className="bento-card card-size-medium reveal slide-up delay-100">
              <div className="bento-top-accent"></div>
              <div className="bento-icon-wrap" style={{ background: 'rgba(20, 184, 166, 0.1)', color: 'var(--accent)' }}>
                <i className="ri-database-2-line"></i>
              </div>
              <h3>ERP Development</h3>
              <p>Custom ERP systems to manage your operations, HR, finance and inventory efficiently.</p>
              <ul className="bento-checklist">
                <li><i className="ri-checkbox-circle-fill"></i> HR Management</li>
                <li><i className="ri-checkbox-circle-fill"></i> Inventory Control</li>
                <li><i className="ri-checkbox-circle-fill"></i> Reports & Analytics</li>
              </ul>
              <Link to="/service/erp-development" className="bento-learn-btn">
                <span>Learn More</span>
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>

            {/* Card 8: CRM Development */}
            <div className="bento-card card-size-medium reveal slide-up delay-200">
              <div className="bento-top-accent accent-purple"></div>
              <div className="bento-icon-wrap" style={{ background: 'rgba(139, 92, 246, 0.1)', color: 'var(--secondary)' }}>
                <i className="ri-user-shared-line"></i>
              </div>
              <h3>CRM Development</h3>
              <p>CRM solutions to manage leads, sales, customer support and strengthen relationships.</p>
              <ul className="bento-checklist">
                <li><i className="ri-checkbox-circle-fill"></i> Lead Management</li>
                <li><i className="ri-checkbox-circle-fill"></i> Sales Pipeline</li>
                <li><i className="ri-checkbox-circle-fill"></i> Reports & Insights</li>
              </ul>
              <Link to="/service/custom-crm-development" className="bento-learn-btn">
                <span>Learn More</span>
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>

            {/* Card 9: Video Editing & Promotional Content */}
            <div className="bento-card card-size-small reveal slide-up delay-300">
              <div className="bento-top-accent accent-blue"></div>
              <div className="bento-icon-wrap" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)' }}>
                <i className="ri-video-chat-line"></i>
              </div>
              <h3>Video & Promotional Content</h3>
              <p>Engaging videos and content that tell your brand story and drive more engagement.</p>
              <ul className="bento-checklist">
                <li><i className="ri-checkbox-circle-fill"></i> Promotional Videos</li>
                <li><i className="ri-checkbox-circle-fill"></i> Explainer Videos</li>
                <li><i className="ri-checkbox-circle-fill"></i> Social Media Reels</li>
              </ul>
              <Link to="/service/video-editing-promotional-content" className="bento-learn-btn">
                <span>Learn More</span>
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>

            {/* Card 10: MVP Development */}
            <div className="bento-card card-size-small reveal slide-up delay-100">
              <div className="bento-top-accent accent-green"></div>
              <div className="bento-icon-wrap" style={{ background: 'rgba(143, 184, 74, 0.1)', color: '#8fba4a' }}>
                <i className="ri-lightbulb-line"></i>
              </div>
              <h3>MVP Development</h3>
              <p>Quick MVP development for startups to validate ideas and launch faster.</p>
              <ul className="bento-checklist">
                <li><i className="ri-checkbox-circle-fill"></i> Rapid Prototyping</li>
                <li><i className="ri-checkbox-circle-fill"></i> Feature Prioritization</li>
                <li><i className="ri-checkbox-circle-fill"></i> Scalable Architecture</li>
              </ul>
              <Link to="/service/mvp-development" className="bento-learn-btn">
                <span>Learn More</span>
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 3: BUSINESS BENEFITS SECTION (HORIZONTAL CARD STRIP)
         ========================================================================== */}
      <section className="services-benefits-sec">
        <div className="container">
          <div className="section-header-premium reveal slide-up">
            <span className="section-tag-premium text-center">BUSINESS BENEFITS</span>
            <h2 className="section-title-premium text-center">
              Everything Your Business Needs To Build, Scale & Automate
            </h2>
          </div>

          <div className="benefits-premium-horizontal-grid">
            <div className="benefit-horizontal-card reveal slide-up delay-100">
              <div className="benefit-left-icon" style={{ background: 'rgba(20, 184, 166, 0.08)', color: 'var(--accent)' }}>
                <i className="ri-line-chart-line"></i>
              </div>
              <div>
                <h4>More qualified leads</h4>
                <p>Attract the right audience and grow consistently.</p>
              </div>
            </div>

            <div className="benefit-horizontal-card reveal slide-up delay-200">
              <div className="benefit-left-icon" style={{ background: 'rgba(139, 92, 246, 0.08)', color: 'var(--secondary)' }}>
                <i className="ri-time-line"></i>
              </div>
              <div>
                <h4>Less manual work</h4>
                <p>Automate processes and save valuable time.</p>
              </div>
            </div>

            <div className="benefit-horizontal-card reveal slide-up delay-300">
              <div className="benefit-left-icon" style={{ background: 'rgba(59, 130, 246, 0.08)', color: 'var(--primary)' }}>
                <i className="ri-shield-check-line"></i>
              </div>
              <div>
                <h4>More trust</h4>
                <p>Build customer confidence with reliable solutions.</p>
              </div>
            </div>

            <div className="benefit-horizontal-card reveal slide-up delay-100">
              <div className="benefit-left-icon" style={{ background: 'rgba(143, 184, 74, 0.08)', color: '#8fba4a' }}>
                <i className="ri-bar-chart-box-line"></i>
              </div>
              <div>
                <h4>Clearer reporting</h4>
                <p>Get insights that help you make better decisions.</p>
              </div>
            </div>

            <div className="benefit-horizontal-card reveal slide-up delay-200">
              <div className="benefit-left-icon" style={{ background: 'rgba(245, 158, 11, 0.08)', color: '#f59e0b' }}>
                <i className="ri-loop-left-line"></i>
              </div>
              <div>
                <h4>Better Automation</h4>
                <p>Integrate tools to run workflows autonomously.</p>
              </div>
            </div>

            <div className="benefit-horizontal-card reveal slide-up delay-300">
              <div className="benefit-left-icon" style={{ background: 'rgba(236, 72, 153, 0.08)', color: '#ec4899' }}>
                <i className="ri-pulse-line"></i>
              </div>
              <div>
                <h4>Scalable Operations</h4>
                <p>Expand capability as transaction volume rises.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 4: DEVELOPMENT PROCESS TIMELINE
         ========================================================================== */}
      <section className="services-process-sec">
        <div className="container">
          <div className="section-header-premium reveal slide-up">
            <span className="section-tag-premium text-center">OUR PROCESS</span>
            <h2 className="section-title-premium text-center">
              Our Proven Process For Your Success
            </h2>
            <p className="section-desc-premium text-center">
              A clear and agile process that ensures quality, transparency and on-time delivery every single time.
            </p>
          </div>

          <div className="timeline-horizontal-wrapper reveal slide-up delay-200">
            <div className="timeline-progress-line-container">
              <div className="timeline-progress-line-active"></div>
            </div>

            <div className="timeline-nodes-horizontal">
              <div className="timeline-node-card">
                <div className="node-icon-circle">
                  <i className="ri-chat-voice-line"></i>
                  <span className="node-step-number">01</span>
                </div>
                <h4>Consultation</h4>
                <p>We understand your business goals and requirements.</p>
              </div>

              <div className="timeline-node-card">
                <div className="node-icon-circle">
                  <i className="ri-draft-line"></i>
                  <span className="node-step-number">02</span>
                </div>
                <h4>Planning</h4>
                <p>We analyze and plan the best solution for your needs.</p>
              </div>

              <div className="timeline-node-card">
                <div className="node-icon-circle">
                  <i className="ri-palette-line"></i>
                  <span className="node-step-number">03</span>
                </div>
                <h4>Design</h4>
                <p>We create user-friendly designs focused on experience.</p>
              </div>

              <div className="timeline-node-card">
                <div className="node-icon-circle">
                  <i className="ri-code-box-line"></i>
                  <span className="node-step-number">04</span>
                </div>
                <h4>Development</h4>
                <p>We build scalable and high-performance solutions.</p>
              </div>

              <div className="timeline-node-card">
                <div className="node-icon-circle">
                  <i className="ri-shield-flash-line"></i>
                  <span className="node-step-number">05</span>
                </div>
                <h4>Testing</h4>
                <p>We ensure quality, security and flawless functionality.</p>
              </div>

              <div className="timeline-node-card">
                <div className="node-icon-circle">
                  <i className="ri-rocket-line"></i>
                  <span className="node-step-number">06</span>
                </div>
                <h4>Launch</h4>
                <p>We deploy your solution and make it live for users.</p>
              </div>

              <div className="timeline-node-card">
                <div className="node-icon-circle">
                  <i className="ri-customer-service-2-line"></i>
                  <span className="node-step-number">07</span>
                </div>
                <h4>Support</h4>
                <p>We provide ongoing support and continuous improvement.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 5: TECHNOLOGY STACK SECTION
         ========================================================================== */}
      <section className="services-tech-sec">
        <div className="container">
          <div className="section-header-premium reveal slide-up">
            <span className="section-tag-premium text-center">TECHNOLOGY WE USE</span>
            <h2 className="section-title-premium text-center">
              Powering Solutions With Modern Technologies
            </h2>
          </div>

          <div className="tech-stack-cards-grid">
            {/* Category 1: Frontend */}
            <div className="tech-category-card reveal slide-up delay-100">
              <h4>Frontend</h4>
              <div className="tech-chips-flex">
                <div className="tech-chip-item"><i className="ri-reactjs-line color-react"></i><span>React</span></div>
                <div className="tech-chip-item"><i className="ri-javascript-line color-next"></i><span>Next.js</span></div>
                <div className="tech-chip-item"><i className="ri-angularjs-line color-angular"></i><span>Angular</span></div>
                <div className="tech-chip-item"><i className="ri-vuejs-line color-vue"></i><span>Vue</span></div>
              </div>
            </div>

            {/* Category 2: Backend */}
            <div className="tech-category-card reveal slide-up delay-200">
              <h4>Backend</h4>
              <div className="tech-chips-flex">
                <div className="tech-chip-item"><i className="ri-nodejs-line color-node"></i><span>Node.js</span></div>
                <div className="tech-chip-item"><i className="ri-bard-line color-laravel"></i><span>Laravel</span></div>
                <div className="tech-chip-item"><i className="ri-code-line color-php"></i><span>PHP</span></div>
                <div className="tech-chip-item"><i className="ri-instance-line color-python"></i><span>Python</span></div>
              </div>
            </div>

            {/* Category 3: Database */}
            <div className="tech-category-card reveal slide-up delay-300">
              <h4>Database</h4>
              <div className="tech-chips-flex">
                <div className="tech-chip-item"><i className="ri-leaf-line color-mongo"></i><span>MongoDB</span></div>
                <div className="tech-chip-item"><i className="ri-database-line color-mysql"></i><span>MySQL</span></div>
                <div className="tech-chip-item"><i className="ri-database-2-line color-postgres"></i><span>PostgreSQL</span></div>
                <div className="tech-chip-item"><i className="ri-google-fill color-firebase"></i><span>Firebase</span></div>
              </div>
            </div>

            {/* Category 4: Cloud & DevOps */}
            <div className="tech-category-card reveal slide-up delay-400">
              <h4>Cloud & DevOps</h4>
              <div className="tech-chips-flex">
                <div className="tech-chip-item"><i className="ri-cloud-line color-aws"></i><span>AWS</span></div>
                <div className="tech-chip-item"><i className="ri-coreos-line color-docker"></i><span>Docker</span></div>
                <div className="tech-chip-item"><i className="ri-instance-line color-kube"></i><span>Kubernetes</span></div>
                <div className="tech-chip-item"><i className="ri-server-line color-vps"></i><span>VPS</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 6: PORTFOLIO SHOWCASE
         ========================================================================== */}
      <section className="services-portfolio-sec">
        <div className="container">
          <div className="section-header-premium reveal slide-up">
            <span className="section-tag-premium text-center">RECENT SOLUTIONS</span>
            <h2 className="section-title-premium text-center">
              Explore Our Recent Success Stories
            </h2>
          </div>

          <div className="portfolio-showcase-grid">
            {/* Project 1: Clinic Management System */}
            <div className="portfolio-glass-card reveal slide-up delay-100">
              <div className="portfolio-mockup-screen background-clinic">
                <div className="window-decor-dots"><span></span><span></span><span></span></div>
                <i className="ri-heart-pulse-line big-decor-icon"></i>
              </div>
              <div className="portfolio-card-desc">
                <span className="proj-cat-pill">Web Application</span>
                <h3>Clinic Management System</h3>
                <p>A complete solution for managing appointments, patients and billing efficiently.</p>
                <Link to="/portfolio" className="btn-view-project">
                  <span>View Project</span>
                  <i className="ri-arrow-right-line"></i>
                </Link>
              </div>
            </div>

            {/* Project 2: ERP System */}
            <div className="portfolio-glass-card reveal slide-up delay-200">
              <div className="portfolio-mockup-screen background-erp-mock">
                <div className="window-decor-dots"><span></span><span></span><span></span></div>
                <i className="ri-cpu-line big-decor-icon"></i>
              </div>
              <div className="portfolio-card-desc">
                <span className="proj-cat-pill">Web Application</span>
                <h3>ERP System</h3>
                <p>Custom ERP platform to manage inventory, HR, finance and operations.</p>
                <Link to="/portfolio" className="btn-view-project">
                  <span>View Project</span>
                  <i className="ri-arrow-right-line"></i>
                </Link>
              </div>
            </div>

            {/* Project 3: Real Estate Platform */}
            <div className="portfolio-glass-card reveal slide-up delay-300">
              <div className="portfolio-mockup-screen background-re">
                <div className="window-decor-dots"><span></span><span></span><span></span></div>
                <i className="ri-home-4-line big-decor-icon"></i>
              </div>
              <div className="portfolio-card-desc">
                <span className="proj-cat-pill">Web Platform</span>
                <h3>Real Estate Platform</h3>
                <p>Property listing database featuring advanced search and agent controls.</p>
                <Link to="/portfolio" className="btn-view-project">
                  <span>View Project</span>
                  <i className="ri-arrow-right-line"></i>
                </Link>
              </div>
            </div>

            {/* Project 4: E-Commerce Solution */}
            <div className="portfolio-glass-card reveal slide-up delay-100">
              <div className="portfolio-mockup-screen background-ecom">
                <div className="window-decor-dots"><span></span><span></span><span></span></div>
                <i className="ri-shopping-cart-2-line big-decor-icon"></i>
              </div>
              <div className="portfolio-card-desc">
                <span className="proj-cat-pill">Web Application</span>
                <h3>E-Commerce Solution</h3>
                <p>Full-featured eCommerce engine equipped with secure checkouts and metrics.</p>
                <Link to="/portfolio" className="btn-view-project">
                  <span>View Project</span>
                  <i className="ri-arrow-right-line"></i>
                </Link>
              </div>
            </div>

            {/* Project 5: Mobile Application */}
            <div className="portfolio-glass-card reveal slide-up delay-200">
              <div className="portfolio-mockup-screen background-mobile-mock">
                <div className="window-decor-dots"><span></span><span></span><span></span></div>
                <i className="ri-smartphone-line big-decor-icon"></i>
              </div>
              <div className="portfolio-card-desc">
                <span className="proj-cat-pill">Mobile App</span>
                <h3>Mobile Application</h3>
                <p>Cross-platform mobile application providing biometric setups and unified sync.</p>
                <Link to="/portfolio" className="btn-view-project">
                  <span>View Project</span>
                  <i className="ri-arrow-right-line"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 7: PREMIUM CTA SECTION
         ========================================================================== */}
      <section className="services-premium-cta">
        <div className="container">
          <div 
            ref={ctaRocketRef}
            className="cta-banner-premium reveal scale-up"
            onMouseMove={(e) => handleMouseMove(e, ctaRocketRef.current, 3)}
            onMouseLeave={() => handleMouseLeave(ctaRocketRef.current)}
          >
            {/* Background glowing bubbles */}
            <div className="cta-mesh-bubble bubble-cyan"></div>
            <div className="cta-mesh-bubble bubble-purple"></div>

            <div className="cta-content-left">
              <h2 className="cta-title-premium">
                Ready To Kickstart <br />
                <span className="gradient-text-accent">Your Project?</span>
              </h2>
              <p className="cta-desc-premium">
                Let's build a scalable digital solution tailored for your business goals. Discuss your architecture blueprints with our tech architects.
              </p>
              <div className="cta-buttons-premium">
                <Link to="/contact" className="btn btn-primary">
                  <span>Book Consultation</span>
                </Link>
                <Link to="/portfolio" className="btn btn-secondary">
                  <span>View Our Work</span>
                </Link>
              </div>
            </div>

            <div className="cta-illustration-right">
              {/* Drifting 3D Rocket */}
              <div className="rocket-toy-container">
                <div className="rocket-body-shape">
                  <div className="rocket-window-glass"></div>
                  <div className="rocket-wing wing-left"></div>
                  <div className="rocket-wing wing-right"></div>
                  <div className="rocket-thruster-fire">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                {/* Orbital particles */}
                <div className="floating-cosmic-node planet-one"></div>
                <div className="floating-cosmic-node planet-two"></div>
                <div className="floating-cosmic-node star-one"><i className="ri-star-fill"></i></div>
                <div className="floating-cosmic-node star-two"><i className="ri-star-fill"></i></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
