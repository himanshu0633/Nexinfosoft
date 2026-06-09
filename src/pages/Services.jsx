import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { normalizeVisibleServices } from '../utils/services';
import Process from '../components/home/Process';
import DynamicPageSections from '../components/DynamicPageSections';

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

const defaultBenefits = [
  { icon: 'ri-line-chart-line', title: 'More qualified leads', text: 'Attract the right audience and grow consistently.', color: 'var(--accent)', bg: 'rgba(20, 184, 166, 0.08)' },
  { icon: 'ri-time-line', title: 'Less manual work', text: 'Automate processes and save valuable time.', color: 'var(--secondary)', bg: 'rgba(139, 92, 246, 0.08)' },
  { icon: 'ri-shield-check-line', title: 'More trust', text: 'Build customer confidence with reliable solutions.', color: 'var(--primary)', bg: 'rgba(59, 130, 246, 0.08)' },
  { icon: 'ri-bar-chart-box-line', title: 'Clearer reporting', text: 'Get insights that help you make better decisions.', color: '#8fba4a', bg: 'rgba(143, 184, 74, 0.08)' },
  { icon: 'ri-loop-left-line', title: 'Better Automation', text: 'Integrate tools to run workflows autonomously.', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.08)' },
  { icon: 'ri-pulse-line', title: 'Scalable Operations', text: 'Expand capability as transaction volume rises.', color: '#ec4899', bg: 'rgba(236, 72, 153, 0.08)' }
];

const colorPresets = [
  { color: 'var(--accent)', bg: 'rgba(20, 184, 166, 0.08)' },
  { color: 'var(--secondary)', bg: 'rgba(139, 92, 246, 0.08)' },
  { color: 'var(--primary)', bg: 'rgba(59, 130, 246, 0.08)' },
  { color: '#8fba4a', bg: 'rgba(143, 184, 74, 0.08)' },
  { color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.08)' },
  { color: '#ec4899', bg: 'rgba(236, 72, 153, 0.08)' }
];

const Services = () => {
  const heroMockupRef = useRef(null);
  const ctaRocketRef = useRef(null);
  const [pageContent, setPageContent] = useState({
    hero: {
      title: 'Digital Solutions <br /><span class="gradient-text-accent">That Drive Business Growth</span>',
      subtitle: 'OUR EXPERTISE',
      description: 'We build scalable web applications, mobile apps, ERP systems, CRM solutions, AI automation platforms, and custom software that help businesses streamline operations and grow faster.'
    },
    index: {
      title: 'Choose The Service Your Business Needs',
      subtitle: 'OUR SERVICES',
      description: 'Explore our core competencies designed to boost your operational intelligence, streamline process delivery, and capture market authority.'
    },
    benefits: {
      title: 'Everything Your Business Needs To Build, Scale & Automate',
      subtitle: 'BUSINESS BENEFITS'
    },
    tech: {
      title: 'Powering Solutions With Modern Technologies',
      subtitle: 'TECHNOLOGY WE USE'
    },
    portfolio: {
      title: 'Recent Solutions Delivered By Our Team',
      subtitle: 'RECENT SOLUTIONS',
      description: 'A quick look at practical systems we build for operations, automation, and growth.'
    },
    cta: {
      title: 'Ready To Build A Scalable Digital Solution?',
      description: "Let's build a scalable digital solution tailored for your business goals. Discuss your architecture blueprints with our tech architects."
    }
  });

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
    {
      slug: 'mvp-development',
      title: 'MVP Development',
      subtitle: 'Fast, focused product builds for startups and businesses that need to validate an idea.',
      icon: 'ri-rocket-line',
      intro: 'We build MVPs that focus on the core product idea, so you can launch faster, collect feedback, and improve with less waste.',
      benefits: ['Launch faster with core features', 'Reduce upfront development cost', 'Validate market demand early'],
      deliverables: ['Feature planning', 'Prototype UI', 'Core product build']
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
      const contentMap = {
        services_page_hero: 'hero',
        services_page_index: 'index',
        services_page_benefits: 'benefits',
        services_page_tech: 'tech',
        services_page_portfolio: 'portfolio',
        services_page_cta: 'cta'
      };

      try {
        const entries = await Promise.all(Object.keys(contentMap).map(async (id) => {
          const res = await fetch(`/api/content/${id}?t=${Date.now()}`, { cache: 'no-store' });
          if (!res.ok) return null;
          const data = await res.json();
          if (data.visible === false) return null;
          return [contentMap[id], data];
        }));
        const nextContent = Object.fromEntries(entries.filter(Boolean));
        if (Object.keys(nextContent).length > 0) {
          setPageContent(prev => ({ ...prev, ...nextContent }));
        }
      } catch (err) {
        // Safe fallback active
      }

      // Fetch dynamic services
      try {
        console.log("Services.jsx: Fetching dynamic services...");
        const res = await fetch(`/api/services?t=${Date.now()}`, { cache: 'no-store' });
        console.log("Services.jsx: Fetch response status:", res.status);
        if (res.ok) {
          const data = await res.json();
          console.log("Services.jsx: Total services fetched:", data.length, data);
          if (data && data.length > 0) {
            const normalized = normalizeVisibleServices(data);
            console.log("Services.jsx: Normalized services:", normalized);
            setServices(normalized);
          }
        } else {
          console.error("Services.jsx: API response not ok:", res.statusText);
        }
      } catch (err) {
        console.error("Services.jsx: Fetch failed:", err);
      }

      // Fetch dynamic projects
      try {
        const res = await fetch(`/api/projects?t=${Date.now()}`, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setProjects(data.slice(0, 3));
          }
        }
      } catch (err) {
        // Safe fallback active
      }
    };

    fetchDynamicData();
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

  const getBentoSize = () => 'card-size-small';

  return (
    <div className="services-page-wrapper">
      {/* ==========================================================================
         SECTION 1: HERO SECTION
         ========================================================================== */}
      <section className="services-hero-sec">
        <div className="container">
          <div className="services-hero-grid">
            <div className="services-hero-left reveal slide-left">
              <span className="section-tag-premium">{pageContent.hero.subtitle}</span>
              <h1 className="hero-title-premium" dangerouslySetInnerHTML={{ __html: pageContent.hero.title }}></h1>
              <p className="hero-desc-premium">
                {pageContent.hero.description}
              </p>
              
              <div className="hero-cta-btns">
                <a href="#services-grid" className="btn btn-primary">
                  <span>Explore Services</span>
                </a>
                <Link to="/contact" className="btn btn-secondary">
                  <span>Schedule A Call</span>
                </Link>
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
            <span className="section-tag-premium text-center">{pageContent.index.subtitle}</span>
            <h2 className="section-title-premium text-center">
              {pageContent.index.title}
            </h2>
            <p className="section-desc-premium text-center">
              {pageContent.index.description}
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
            <span className="section-tag-premium text-center">{pageContent.benefits.subtitle}</span>
            <h2 className="section-title-premium text-center">
              {pageContent.benefits.title}
            </h2>
          </div>

          <div className="benefits-premium-horizontal-grid">
            {(pageContent.benefits?.metadata?.cards || defaultBenefits).map((card, idx) => {
              const preset = colorPresets[idx % colorPresets.length];
              const delayClass = `delay-${((idx % 3) + 1) * 100}`;
              return (
                <div key={idx} className={`benefit-horizontal-card reveal slide-up ${delayClass}`}>
                  <div className="benefit-left-icon" style={{ background: preset.bg, color: preset.color }}>
                    <i className={card.icon || 'ri-checkbox-circle-line'}></i>
                  </div>
                  <div>
                    <h4>{card.title}</h4>
                    <p>{card.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 4: WORKFLOW BLUEPRINT
         ========================================================================== */}
      <Process />

      {/* ==========================================================================
         SECTION 5: TECHNOLOGY STACK SECTION
         ========================================================================== */}
      <section className="services-tech-sec">
        <div className="container">
          <div className="section-header-premium reveal slide-up">
            <span className="section-tag-premium text-center">{pageContent.tech.subtitle}</span>
            <h2 className="section-title-premium text-center">
              {pageContent.tech.title}
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
            <span className="section-tag-premium text-center">{pageContent.portfolio.subtitle}</span>
            <h2 className="section-title-premium text-center">
              {pageContent.portfolio.title}
            </h2>
            {pageContent.portfolio.description && (
              <p className="section-desc-premium text-center">{pageContent.portfolio.description}</p>
            )}
          </div>

          <div className="portfolio-showcase-grid">
            {projects.map((project, index) => {
              const bgClasses = ['background-clinic', 'background-erp-mock', 'background-re', 'background-ecom', 'background-mobile-mock'];
              const bgClass = bgClasses[index % bgClasses.length];
              return (
                <div key={project._id || project.name || index} className="portfolio-glass-card reveal slide-up active">
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

          <div className="services-portfolio-view-more reveal slide-up active">
            <Link to="/portfolio" className="btn btn-primary">
              <span>View More</span>
              <i className="ri-arrow-right-line"></i>
            </Link>
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
              <h2 className="cta-title-premium" dangerouslySetInnerHTML={{ __html: pageContent.cta.title }}></h2>
              <p className="cta-desc-premium">
                {pageContent.cta.description}
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
      <DynamicPageSections
        page="services"
        excludeIds={['services_page_hero', 'services_page_index', 'services_page_benefits', 'services_page_tech', 'services_page_portfolio', 'services_page_cta']}
      />
    </div>
  );
};

export default Services;
