import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const CoreServices = () => {
  const capabilityRef = useRef(null);
  const [data, setData] = useState({
    title: 'Everything Your Business Needs To Build,',
    subtitle: 'Scale & Automate',
    description: 'From web apps to AI automation, we deliver secure and scalable digital solutions that help your business grow faster, operate smarter, and launch with confidence.',
    metadata: {
      badge: 'Core Services',
      capabilityStack: {
        kicker: 'Digital Capability Stack',
        title: 'Enterprise delivery console for modern product teams',
        description: 'End-to-end planning, design, development, cloud deployment, QA, security and optimization under one reliable delivery system.'
      }
    }
  });

  useEffect(() => {
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
    fetchServicesContent();
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

  return (
    <section id="services" className="core-services-premium">
      <div className="core-services-bg" aria-hidden="true">
        <span className="core-glow core-glow-one"></span>
        <span className="core-glow core-glow-two"></span>
        <span className="core-particle core-particle-one"></span>
        <span className="core-particle core-particle-two"></span>
        <span className="core-particle core-particle-three"></span>
      </div>

      <div className="container">
        <div className="section-header core-services-header reveal slide-up active">
          <span className="section-tag core-services-badge">{data.metadata?.badge || 'Core Services'}</span>
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
              <span className="capability-kicker">{data.metadata?.capabilityStack?.kicker || 'Digital Capability Stack'}</span>
              <h3>{data.metadata?.capabilityStack?.title || 'Enterprise delivery console for modern product teams'}</h3>
              <p>{data.metadata?.capabilityStack?.description || 'End-to-end planning, design, development, cloud deployment, QA, security and optimization under one reliable delivery system.'}</p>
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
                    <strong>Dashboard</strong>
                    <span>Live delivery health</span>
                  </div>
                  <div className="capability-users">
                    <i className="ri-user-3-line"></i>
                    <i className="ri-user-star-line"></i>
                  </div>
                </div>

                <div className="capability-mini-stats">
                  <div><span>Projects</span><strong>128+</strong></div>
                  <div><span>Clients</span><strong>87+</strong></div>
                  <div><span>Success</span><strong>99%</strong></div>
                  <div><span>Support</span><strong>24/7</strong></div>
                </div>

                <div className="capability-graph-row">
                  <div className="capability-chart">
                    <div className="capability-chart-title">Performance Overview</div>
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
                      <circle cx="304" cy="92" r="6" />
                    </svg>
                  </div>

                  <div className="capability-activity">
                    <strong>Recent Activities</strong>
                    <span><i className="ri-checkbox-circle-fill"></i> New project created</span>
                    <span><i className="ri-checkbox-circle-fill"></i> UI/UX sprint completed</span>
                    <span><i className="ri-checkbox-circle-fill"></i> API integration done</span>
                    <span><i className="ri-checkbox-circle-fill"></i> Deployment successful</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="capability-stat-strip">
              <div><i className="ri-time-line"></i><strong>99%</strong><span>On-time Delivery</span></div>
              <div><i className="ri-flashlight-line"></i><strong>98/100</strong><span>Speed Score</span></div>
              <div><i className="ri-shield-check-line"></i><strong>Secure</strong><span>Architecture</span></div>
              <div><i className="ri-cloud-line"></i><strong>Cloud</strong><span>Ready</span></div>
            </div>
          </article>

          <div className="core-service-grid">
            <Link to="/service/custom-web-development" className="core-service-card reveal slide-up active" style={{ '--delay': '0ms' }}>
              <span className="core-icon"><i className="ri-global-line"></i></span>
              <h3>Web Applications</h3>
              <p>Scalable, secure and high-performance web applications for modern teams.</p>
            </Link>
            <Link to="/service/mobile-applications" className="core-service-card reveal slide-up active" style={{ '--delay': '45ms' }}>
              <span className="core-icon"><i className="ri-smartphone-line"></i></span>
              <h3>Mobile Solutions</h3>
              <p>Android, iOS and cross-platform apps designed to engage users.</p>
            </Link>
            <Link to="/service/erp-development" className="core-service-card reveal slide-up active" style={{ '--delay': '90ms' }}>
              <span className="core-icon"><i className="ri-database-2-line"></i></span>
              <h3>ERP Development</h3>
              <p>Custom ERP systems for streamlined business operations.</p>
            </Link>
            <Link to="/service/custom-web-development" className="core-service-card reveal slide-up active" style={{ '--delay': '135ms' }}>
              <span className="core-icon"><i className="ri-cloud-line"></i></span>
              <h3>Cloud Integration</h3>
              <p>Cloud-ready solutions for storage, backup and scalability.</p>
            </Link>
            <Link to="/service/custom-web-development" className="core-service-card reveal slide-up active" style={{ '--delay': '180ms' }}>
              <span className="core-icon"><i className="ri-node-tree"></i></span>
              <h3>API Development</h3>
              <p>Secure APIs and third-party integrations for seamless connectivity.</p>
            </Link>
            <Link to="/service/branding-graphic-design" className="core-service-card reveal slide-up active" style={{ '--delay': '225ms' }}>
              <span className="core-icon"><i className="ri-pencil-ruler-2-line"></i></span>
              <h3>UI/UX Design</h3>
              <p>User-focused designs that create smooth and delightful experiences.</p>
            </Link>
            <Link to="/service/custom-web-development" className="core-service-card reveal slide-up active" style={{ '--delay': '270ms' }}>
              <span className="core-icon"><i className="ri-brain-line"></i></span>
              <h3>AI Solutions</h3>
              <p>AI automation, smart analytics and practical business intelligence.</p>
            </Link>
            <Link to="/service/custom-web-development" className="core-service-card reveal slide-up active" style={{ '--delay': '315ms' }}>
              <span className="core-icon"><i className="ri-infinity-line"></i></span>
              <h3>DevOps Support</h3>
              <p>CI/CD, deployment, monitoring and infrastructure management.</p>
            </Link>
            <Link to="/service/custom-web-development" className="core-service-card reveal slide-up active" style={{ '--delay': '360ms' }}>
              <span className="core-icon"><i className="ri-window-line"></i></span>
              <h3>SaaS Platforms</h3>
              <p>Custom multi-tenant cloud software with billing and subscriptions.</p>
            </Link>
            <Link to="/service/custom-web-development" className="core-service-card reveal slide-up active" style={{ '--delay': '405ms' }}>
              <span className="core-icon"><i className="ri-shield-flash-line"></i></span>
              <h3>QA &amp; Automation</h3>
              <p>Comprehensive automated testing, unit tests, and performance validation.</p>
            </Link>
            <Link to="/service/custom-web-development" className="core-service-card reveal slide-up active" style={{ '--delay': '450ms' }}>
              <span className="core-icon"><i className="ri-lock-password-line"></i></span>
              <h3>Cybersecurity</h3>
              <p>Vulnerability audits, secure auth, encryption, and access controls.</p>
            </Link>
            <Link to="/service/ecommerce-website" className="core-service-card reveal slide-up active" style={{ '--delay': '495ms' }}>
              <span className="core-icon"><i className="ri-shopping-cart-2-line"></i></span>
              <h3>E-commerce Systems</h3>
              <p>Multi-vendor marketplaces, payment gateways, inventory and analytics.</p>
            </Link>
            <Link to="/service/custom-crm-development" className="core-service-card reveal slide-up active" style={{ '--delay': '540ms' }}>
              <span className="core-icon"><i className="ri-user-shared-line"></i></span>
              <h3>CRM Development</h3>
              <p>Custom CRM tools, sales pipelines, integrations, and lead tracking.</p>
            </Link>
            <Link to="/service/custom-web-development" className="core-service-card reveal slide-up active" style={{ '--delay': '585ms' }}>
              <span className="core-icon"><i className="ri-server-fill"></i></span>
              <h3>Data Warehousing</h3>
              <p>Relational schema designs, large-scale migrations, and query speedups.</p>
            </Link>
            <Link to="/service/custom-web-development" className="core-service-card reveal slide-up active" style={{ '--delay': '630ms' }}>
              <span className="core-icon"><i className="ri-cpu-line"></i></span>
              <h3>IoT Solutions</h3>
              <p>Smart telemetry boards, real-time message pipelines, and IoT APIs.</p>
            </Link>
            <Link to="/service/digital-marketing" className="core-service-card reveal slide-up active" style={{ '--delay': '675ms' }}>
              <span className="core-icon"><i className="ri-bubble-chart-line"></i></span>
              <h3>Digital Growth</h3>
              <p>Search engine indexing optimizations and digital growth dashboard setups.</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreServices;
