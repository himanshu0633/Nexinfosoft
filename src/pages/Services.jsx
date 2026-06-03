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
  const servicesProcessScrollerRef = useRef(null);

  const [services, setServices] = useState([
    {
      slug: 'business-website',
      title: 'Business Website',
      subtitle: 'A refined, trust-building website for service businesses.',
      icon: 'ri-window-line',
      intro: 'Modern, responsive websites that build trust and grow your business online.',
      benefits: ['Responsive Design', 'Fast & Secure', 'SEO Friendly'],
      deliverables: ['Responsive pages', 'Lead enquiry forms', 'Service sections']
    },
    {
      slug: 'ecommerce-website',
      title: 'E-Commerce Website',
      subtitle: 'Online stores built for product discovery and checkout.',
      icon: 'ri-shopping-bag-3-line',
      intro: 'Secure, scalable and feature-rich eCommerce solutions that drive sales and conversions.',
      benefits: ['Product Management', 'Secure Checkout', 'Order Tracking'],
      deliverables: ['Product catalog', 'Cart and checkout', 'Payment gateway']
    },
    {
      slug: 'custom-web-development',
      title: 'Custom Web Development',
      subtitle: 'Tailored web platforms for unique business requirements.',
      icon: 'ri-code-s-slash-line',
      intro: 'Custom websites and web apps built for performance, scalability and unique business needs.',
      benefits: ['Tailored Solutions', 'Dashboard & Portals', 'API Integrations'],
      deliverables: ['Custom UI', 'Backend APIs', 'Admin panel']
    },
    {
      slug: 'mobile-applications',
      title: 'Mobile Applications',
      subtitle: 'Android, iOS, and cross-platform mobile apps.',
      icon: 'ri-smartphone-line',
      intro: 'Cross-platform mobile apps for iOS and Android that engage users and grow your brand.',
      benefits: ['Native Performance', 'User Friendly UI', 'Push Notifications'],
      deliverables: ['App UI/UX', 'Android/iOS build', 'API integration']
    },
    {
      slug: 'branding-graphic-design',
      title: 'Branding & Design',
      subtitle: 'Identity, social creatives, and visual systems.',
      icon: 'ri-palette-line',
      intro: 'Creative branding and graphic design that helps your business stand out and connect.',
      benefits: ['Logo & Identity', 'UI/UX Design', 'Visual Consistency'],
      deliverables: ['Logo support', 'Brand colors', 'Social posts']
    },
    {
      slug: 'digital-marketing',
      title: 'Digital Marketing',
      subtitle: 'SEO, campaigns, content, and lead generation.',
      icon: 'ri-megaphone-line',
      intro: 'Data-driven marketing strategies to increase visibility, leads and business growth.',
      benefits: ['SEO & SEM', 'Social Media', 'Lead Generation'],
      deliverables: ['SEO planning', 'Campaign setup', 'Content calendar']
    },
    {
      slug: 'erp-development',
      title: 'ERP Development',
      subtitle: 'Custom ERP systems for inventory, HR, and operations.',
      icon: 'ri-database-2-line',
      intro: 'Custom ERP systems to manage your operations, HR, finance and inventory efficiently.',
      benefits: ['HR Management', 'Inventory Control', 'Reports & Analytics'],
      deliverables: ['ERP modules', 'Role access', 'Inventory flow']
    },
    {
      slug: 'custom-crm-development',
      title: 'CRM Development',
      subtitle: 'Lead, sales, follow-up, and reporting CRM.',
      icon: 'ri-user-shared-line',
      intro: 'CRM solutions to manage leads, sales, customer support and strengthen relationships.',
      benefits: ['Lead Management', 'Sales Pipeline', 'Reports & Insights'],
      deliverables: ['Lead dashboard', 'Follow-up reminders', 'Customer records']
    },
    {
      slug: 'video-editing-promotional-content',
      title: 'Video & Promotional Content',
      subtitle: 'Reels, promotional videos, and product explainers.',
      icon: 'ri-video-chat-line',
      intro: 'Engaging videos and content that tell your brand story and drive more engagement.',
      benefits: ['Promotional Videos', 'Explainer Videos', 'Social Media Reels'],
      deliverables: ['Reels editing', 'Promo videos', 'Motion text']
    },

  ]);

  const [projects, setProjects] = useState([
    {
      name: 'Clinic Management System',
      category: 'healthcare',
      tag: 'Web Application',
      desc: 'A complete solution for managing appointments, patients and billing efficiently.',
      image_url: '/assets/images/analytics_mockup.png'
    },
    {
      name: 'ERP System',
      category: 'erp',
      tag: 'Web Application',
      desc: 'Custom ERP platform to manage inventory, HR, finance and operations.',
      image_url: '/assets/images/erp_mockup.png'
    },
    {
      name: 'Real Estate Platform',
      category: 'real-estate',
      tag: 'Web Platform',
      desc: 'Property listing database featuring advanced search and agent controls.',
      image_url: '/assets/images/portal_mockup.png'
    },
    {
      name: 'E-Commerce Solution',
      category: 'ecommerce',
      tag: 'Web Application',
      desc: 'Full-featured eCommerce engine equipped with secure checkouts and metrics.',
      image_url: '/assets/images/ecommerce_mockup.png'
    },
    {
      name: 'Mobile Application',
      category: 'mobile',
      tag: 'Mobile App',
      desc: 'Cross-platform mobile application providing biometric setups and unified sync.',
      image_url: '/assets/images/mobile_mockup.png'
    }
  ]);

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

    const fetchDynamicData = async () => {
      // Fetch dynamic services
      try {
        const res = await fetch('/api/services');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setServices(data.filter(service => service.slug !== 'recruitment-services'));
          }
        }
      } catch (err) {
        // Safe fallback active
      }

      // Fetch dynamic projects
      try {
        const res = await fetch('/api/projects');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setProjects(data.slice(0, 5));
          }
        }
      } catch (err) {
        // Safe fallback active
      }
    };

    fetchDynamicData();
  }, []);

  useEffect(() => {
    const scroller = servicesProcessScrollerRef.current;
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    let intervalId;
    let resumeTimer;

    const stopAutoScroll = () => {
      clearInterval(intervalId);
      clearTimeout(resumeTimer);
    };

    const startAutoScroll = () => {
      stopAutoScroll();
      if (!scroller || !mobileQuery.matches) return;

      intervalId = setInterval(() => {
        const firstItem = scroller.querySelector('.timeline-node-card');
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
    };

    const pauseThenResume = () => {
      stopAutoScroll();
      resumeTimer = setTimeout(startAutoScroll, 2200);
    };

    const pauseAutoScroll = () => stopAutoScroll();
    const resumeAutoScroll = () => startAutoScroll();

    startAutoScroll();

    if (scroller) {
      scroller.addEventListener('touchstart', pauseThenResume, { passive: true });
      scroller.addEventListener('mouseenter', pauseAutoScroll);
      scroller.addEventListener('focusin', pauseAutoScroll);
      scroller.addEventListener('mouseleave', resumeAutoScroll);
      scroller.addEventListener('focusout', resumeAutoScroll);
    }

    mobileQuery.addEventListener('change', startAutoScroll);

    return () => {
      stopAutoScroll();
      mobileQuery.removeEventListener('change', startAutoScroll);
      if (scroller) {
        scroller.removeEventListener('touchstart', pauseThenResume);
        scroller.removeEventListener('mouseenter', pauseAutoScroll);
        scroller.removeEventListener('focusin', pauseAutoScroll);
        scroller.removeEventListener('mouseleave', resumeAutoScroll);
        scroller.removeEventListener('focusout', resumeAutoScroll);
      }
    };
  }, []);

  // Helper arrays for aesthetic styling
  const getBentoColors = (index) => {
    const colors = [
      { bg: 'rgba(20, 184, 166, 0.1)', text: 'var(--accent)', border: '' },
      { bg: 'rgba(139, 92, 246, 0.1)', text: 'var(--secondary)', border: 'accent-purple' },
      { bg: 'rgba(59, 130, 246, 0.1)', text: 'var(--primary)', border: 'accent-blue' },
      { bg: 'rgba(143, 184, 74, 0.1)', text: '#8fba4a', border: 'accent-green' },
      { bg: 'rgba(245, 158, 11, 0.1)', text: '#f59e0b', border: 'accent-yellow' },
      { bg: 'rgba(236, 72, 153, 0.1)', text: '#ec4899', border: 'accent-pink' }
    ];
    return colors[index % colors.length];
  };

  const getBentoSize = (index) => {
    const sizes = [
      'card-size-small',
      'card-size-small',
      'card-size-small',
      'card-size-medium',
      'card-size-small',
      'card-size-small',
      'card-size-medium',
      'card-size-medium',
      'card-size-small',
      'card-size-large'
    ];
    return sizes[index % sizes.length];
  };

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
            {services.map((service, index) => {
              const styles = getBentoColors(index);
              const cardSize = getBentoSize(index);
              return (
                <div key={service.slug || index} className={`bento-card ${cardSize} reveal slide-up`}>
                  <div className={`bento-top-accent ${styles.border}`}></div>
                  <div className="bento-icon-wrap" style={{ background: styles.bg, color: styles.text }}>
                    <i className={service.icon || 'ri-window-line'}></i>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.intro || service.subtitle}</p>
                  <ul className="bento-checklist">
                    {(service.benefits && service.benefits.length > 0 ? service.benefits : service.deliverables).slice(0, 3).map((item, idx) => (
                      <li key={idx}><i className="ri-checkbox-circle-fill"></i> {item}</li>
                    ))}
                  </ul>
                  <Link to={`/service/${service.slug}`} className="bento-learn-btn">
                    <span>Learn More</span>
                    <i className="ri-arrow-right-line"></i>
                  </Link>
                </div>
              );
            })}
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

            <div className="timeline-nodes-horizontal services-process-mobile-scroll" ref={servicesProcessScrollerRef}>
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
            {projects.map((project, index) => {
              const bgClasses = ['background-clinic', 'background-erp-mock', 'background-re', 'background-ecom', 'background-mobile-mock'];
              const bgClass = bgClasses[index % bgClasses.length];
              return (
                <div key={project.name || index} className="portfolio-glass-card reveal slide-up">
                  <div className={`portfolio-mockup-screen ${bgClass}`}>
                    <div className="window-decor-dots"><span></span><span></span><span></span></div>
                    {project.image_url ? (
                      <img src={project.image_url} alt={project.name} className="portfolio-screenshot-img" />
                    ) : (
                      <div className="portfolio-mockup-placeholder" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.01)', color: 'var(--text-muted)' }}>
                        <i className={`${project.icon || 'ri-briefcase-4-line'} style-24`} style={{ fontSize: '48px' }}></i>
                      </div>
                    )}
                  </div>
                  <div className="portfolio-card-desc">
                    <span className="proj-cat-pill">{project.tag || project.category.toUpperCase()}</span>
                    <h3>{project.name}</h3>
                    <p>{project.desc}</p>
                    <Link to="/portfolio" className="btn-view-project">
                      <span>View Project</span>
                      <i className="ri-arrow-right-line"></i>
                    </Link>
                  </div>
                </div>
              );
            })}
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
