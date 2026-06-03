import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const CoreServices = ({ previewData = null }) => {
  const capabilityRef = useRef(null);
  const serviceScrollerRef = useRef(null);
  const [data, setData] = useState({
    title: 'Everything Your Business Needs To Build,',
    subtitle: 'Scale & Automate',
    description: 'From web applications to AI automation, we deliver secure and scalable digital solutions that help businesses grow faster and operate smarter.',
    metadata: {
      badge: 'Core Services',
      capabilityStack: {
        kicker: 'Digital Capability Stack',
        title: 'Enterprise delivery console for modern product teams',
        description: 'End-to-end planning, design, development, cloud deployment, QA, security and optimization under one reliable delivery system.'
      }
    }
  });

  const [services, setServices] = useState([
    {
      title: 'Web Applications',
      description: 'Scalable web apps for modern teams.',
      count: '20+ Projects Delivered',
      icon: 'ri-global-line',
      to: '/service/custom-web-development',
      size: 'compact'
    },
    {
      title: 'Mobile Solutions',
      description: 'Native and cross-platform mobile apps.',
      count: '18+ Apps Launched',
      icon: 'ri-smartphone-line',
      to: '/service/mobile-applications',
      size: 'compact'
    },
    {
      title: 'ERP Development',
      description: 'Custom ERP systems for operations.',
      count: '15+ Enterprise Systems',
      icon: 'ri-database-2-line',
      to: '/service/erp-development',
      size: 'compact'
    },
    {
      title: 'Cloud Integration',
      description: 'Cloud-ready scalable infrastructure.',
      count: '10+ Deployments',
      icon: 'ri-cloud-line',
      to: '/service/custom-web-development',
      size: 'compact'
    },
    {
      title: 'API Development',
      description: 'Secure APIs and integrations.',
      count: '30+ Integrations',
      icon: 'ri-node-tree',
      to: '/service/custom-web-development',
      size: 'compact'
    },
    {
      title: 'UI/UX Design',
      description: 'Clean interfaces users understand.',
      count: '25+ Interfaces',
      icon: 'ri-pencil-ruler-2-line',
      to: '/service/branding-graphic-design',
      size: 'compact'
    },
    {
      title: 'AI Solutions',
      description: 'Automation and practical intelligence.',
      count: '12+ Automations Built',
      icon: 'ri-brain-line',
      to: '/service/custom-web-development',
      size: 'compact'
    },
    {
      title: 'DevOps Support',
      description: 'CI/CD, deployment and monitoring.',
      count: '16+ Pipelines',
      icon: 'ri-infinity-line',
      to: '/service/custom-web-development',
      size: 'compact'
    }
  ]);

  useEffect(() => {
    if (previewData) {
      setData(previewData);
      return;
    }

    const fetchServicesContent = async () => {
      try {
        const res = await fetch('/api/content/services');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        // Fallback is already handled by default state
      }
    };

    const fetchServicesList = async () => {
      try {
        const res = await fetch('/api/services');
        if (res.ok) {
          const json = await res.json();
          if (json && json.length > 0) {
            const mapped = json
              .filter(item => item.slug !== 'recruitment-services')
              .map(item => ({
                title: item.title,
                description: item.subtitle || item.intro,
                count: 'Active Service',
                icon: item.icon || 'ri-window-line',
                to: `/service/${item.slug}`,
                size: 'compact'
              }));
            setServices(mapped);
          }
        }
      } catch (err) {
        // Fallback is already default state
      }
    };

    fetchServicesContent();
    fetchServicesList();
  }, [previewData]);

  useEffect(() => {
    const scroller = serviceScrollerRef.current;
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    let frameId;
    let lastTime = 0;
    let resumeTimer;

    const stopAutoScroll = () => {
      cancelAnimationFrame(frameId);
      clearTimeout(resumeTimer);
    };

    const startAutoScroll = () => {
      stopAutoScroll();

      const step = (time) => {
        if (!mobileQuery.matches || !scroller) return;

        if (time - lastTime > 24) {
          const maxScroll = scroller.scrollWidth - scroller.clientWidth;
          scroller.scrollLeft = scroller.scrollLeft >= maxScroll - 2 ? 0 : scroller.scrollLeft + 0.7;
          lastTime = time;
        }

        frameId = requestAnimationFrame(step);
      };

      frameId = requestAnimationFrame(step);
    };

    const pauseThenResume = () => {
      stopAutoScroll();
      resumeTimer = setTimeout(startAutoScroll, 2200);
    };

    const pauseAutoScroll = () => stopAutoScroll();
    const resumeAutoScroll = () => startAutoScroll();

    if (scroller && mobileQuery.matches) {
      startAutoScroll();
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

  const handleMouseMove = (event, element) => {
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    
    element.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    element.style.setProperty('--my', `${event.clientY - rect.top}px`);
    element.style.transform = `perspective(1100px) rotateX(${y * -5}deg) rotateY(${x * 5}deg) translateY(-4px)`;
  };

  const handleMouseLeave = (element) => {
    if (!element) return;
    element.style.transform = '';
  };

  const dashboardStats = [
    { value: '128+', label: 'Projects', icon: 'ri-rocket-line' },
    { value: '87+', label: 'Clients', icon: 'ri-team-line' },
    { value: '99%', label: 'Success Rate', icon: 'ri-shield-check-line' },
    { value: '24/7', label: 'Support', icon: 'ri-customer-service-2-line' }
  ];

  const floatingBadges = [
    { label: 'Enterprise Ready', icon: 'ri-checkbox-circle-fill', className: 'badge-enterprise' },
    { label: 'AI Powered', icon: 'ri-sparkling-2-fill', className: 'badge-ai' },
    { label: 'Secure Infrastructure', icon: 'ri-shield-keyhole-fill', className: 'badge-secure' }
  ];

  return (
    <section id="services" className="core-services-premium">
      <div className="core-services-bg" aria-hidden="true">
        <span className="core-glow core-glow-one"></span>
        <span className="core-glow core-glow-two"></span>
        <span className="core-particle core-particle-one"></span>
        <span className="core-particle core-particle-two"></span>
        <span className="core-particle core-particle-three"></span>
        <span className="core-particle core-particle-four"></span>
        <span className="core-particle core-particle-five"></span>
      </div>

      <div className="container">
        <div className="section-header core-services-header reveal slide-up active">
          <span className="section-tag core-services-badge">CORE SERVICES</span>
          <h2 className="section-title core-services-title">
            {data.title}
            <span>{data.subtitle}</span>
          </h2>
          <p className="section-desc core-services-desc">
            {data.description}
          </p>
        </div>

        <div className="core-services-layout">
          <article 
            ref={capabilityRef}
            className="capability-stack reveal slide-left active" 
            onMouseMove={(e) => handleMouseMove(e, capabilityRef.current)}
            onMouseLeave={() => handleMouseLeave(capabilityRef.current)}
          >
            <div className="capability-glow"></div>

            <div className="capability-copy">
              <span className="capability-kicker">Live Analytics Dashboard</span>
              <h3>Interactive delivery console for ambitious software teams</h3>
              <p>Track active projects, client health, revenue movement, delivery velocity and release progress from one premium operating layer.</p>
            </div>
            <div className="delivery-badge-row">
              {floatingBadges.map((badge) => (
                <span className="delivery-floating-badge" key={badge.label}>
                  <i className={badge.icon}></i>
                  {badge.label}
                </span>
              ))}
            </div>

            <div className="capability-dashboard">
              <aside className="capability-sidebar" aria-hidden="true">
                <span className="capability-logo"><i className="ri-stack-line"></i></span>
                <i className="ri-dashboard-line"></i>
                <i className="ri-code-box-line"></i>
                <i className="ri-cloud-line"></i>
                <i className="ri-shield-check-line"></i>
                <i className="ri-line-chart-line"></i>
              </aside>

              <div className="capability-panel">
                <div className="capability-panel-top">
                  <div>
                    <strong>Nexinfosoft OS</strong>
                    <span>Live delivery health</span>
                  </div>
                  <div className="success-indicator">
                    <span></span>
                    99% Success
                  </div>
                </div>

                <div className="capability-mini-stats">
                  {dashboardStats.map((stat) => (
                    <div key={stat.label}>
                      <i className={stat.icon}></i>
                      <span>{stat.label}</span>
                      <strong>{stat.value}</strong>
                    </div>
                  ))}
                </div>

                <div className="capability-graph-row">
                  <div className="capability-chart">
                    <div className="capability-chart-title">
                      <span>Revenue Chart</span>
                      <strong>+42%</strong>
                    </div>
                    <svg viewBox="0 0 360 180" aria-hidden="true">
                      <defs>
                        <linearGradient id="coreChartGradient" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#14b8a6" />
                          <stop offset="100%" stopColor="#0f766e" />
                        </linearGradient>
                      </defs>
                      <line x1="0" y1="34" x2="360" y2="34" />
                      <line x1="0" y1="76" x2="360" y2="76" />
                      <line x1="0" y1="118" x2="360" y2="118" />
                      <line x1="0" y1="160" x2="360" y2="160" />
                      <path className="capability-chart-shadow" d="M10 150 C48 116, 72 132, 104 94 S158 52, 198 82 S256 144, 304 92 S334 54, 352 38" />
                      <path className="capability-chart-line" d="M10 150 C48 116, 72 132, 104 94 S158 52, 198 82 S256 144, 304 92 S334 54, 352 38" />
                      <path className="capability-chart-line-secondary" d="M10 132 C52 126, 86 98, 126 112 S196 126, 234 78 S304 52, 352 64" />
                      <circle cx="304" cy="92" r="6" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <div ref={serviceScrollerRef} className="core-service-grid">
            {services.map((service, index) => (
              <Link
                to={service.to}
                className={`core-service-card core-service-card-${service.size} reveal slide-up active`}
                style={{ '--delay': `${index * 45}ms` }}
                key={service.title}
              >
                <span className="core-icon"><i className={service.icon}></i></span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreServices;
