import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [rotatingWord, setRotatingWord] = useState('ERP Systems');
  const [data, setData] = useState({
    title: 'Build Scalable',
    subtitle: 'For Modern Teams',
    description: 'Nexinfosoft designs high-performance SaaS platforms, ERP systems, mobile apps, CRM workflows, and AI automation tools that help modern businesses move faster, reduce manual work, and unlock measurable growth.',
    image_url: '/assets/images/web_dev_poster.png',
    metadata: {
      tag: 'AI Powered Digital Transformation Studio',
      rotatingKeywords: ['ERP Systems', 'AI Automation', 'SaaS Platforms', 'Mobile Apps', 'CRM Solutions'],
      trustPills: ['Secure Architecture', 'Fast Delivery', 'Growth Focused'],
      stats: [
        { label: 'Digital projects', value: '100+' },
        { label: 'Business clients', value: '50+' },
        { label: 'Delivery health', value: '99%' }
      ]
    }
  });

  const dashboardRef = useRef(null);

  // Fetch Hero content from database API
  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        const res = await fetch('/api/content/hero');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        // Fallback is already handled by default state
      }
    };
    fetchHeroContent();
  }, []);

  // Rotating keywords effect
  useEffect(() => {
    const words = data.metadata?.rotatingKeywords || ['ERP Systems', 'AI Automation', 'SaaS Platforms', 'Mobile Apps', 'CRM Solutions'];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % words.length;
      setRotatingWord(words[idx]);
    }, 2200);

    return () => clearInterval(interval);
  }, [data.metadata?.rotatingKeywords]);

  const handleMouseMove = (event, element) => {
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -8;
    const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
    
    element.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    element.style.setProperty('--my', `${event.clientY - rect.top}px`);
    element.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  };

  const handleMouseLeave = (element) => {
    if (!element) return;
    element.style.transform = '';
  };

  const bgImage = data.image_url || '/assets/images/web_dev_poster.png';

  return (
    <section className="hero" style={{
      background: `linear-gradient(135deg, rgba(29, 92, 99, 0.09), rgba(198, 122, 55, 0.08)), url("${bgImage}") right 8% center / min(42vw, 560px) auto no-repeat, linear-gradient(180deg, #fbfcff 0%, #f3f8f7 100%)`
    }}>
      <div className="hero-decor hero-dots"></div>
      <div className="hero-decor hero-orbit"></div>
      <div className="hero-decor hero-planet"></div>
      <div className="hero-mesh hero-mesh-one" aria-hidden="true"></div>
      <div className="hero-mesh hero-mesh-two" aria-hidden="true"></div>
      <div className="hero-particles" aria-hidden="true">
        <span></span><span></span><span></span><span></span><span></span>
      </div>

      <div className="container hero-grid">
        <div className="hero-content reveal slide-left active">
          <div className="hero-tag">
            <span></span> {data.metadata?.tag || 'AI Powered Digital Transformation Studio'}
          </div>
          <h1 className="hero-title">
            <span className="hero-title-line">{data.title}</span>
            <span className="gradient-text-accent rotating-keyword">{rotatingWord}</span>
            <span className="hero-title-line">{data.subtitle}</span>
          </h1>
          <p className="hero-desc">{data.description}</p>
          <div className="hero-btns">
            <Link to="/contact" className="btn btn-primary">
              <span>Build Your Product</span>
              <i className="ri-arrow-right-line"></i>
            </Link>
            <Link to="/services" className="btn btn-secondary">
              <span>Explore Services</span>
              <i className="ri-arrow-right-s-line"></i>
            </Link>
          </div>
          <div className="hero-trust-row">
            {data.metadata?.trustPills?.map((pill, idx) => {
              const icons = ['ri-shield-check-line', 'ri-flashlight-line', 'ri-line-chart-line'];
              return (
                <div key={idx} className="trust-pill">
                  <i className={icons[idx] || 'ri-shield-check-line'}></i> {pill}
                </div>
              );
            })}
          </div>
          <div className="hero-stats-row">
            {data.metadata?.stats?.map((stat, idx) => (
              <div key={idx}><strong>{stat.value}</strong><span>{stat.label}</span></div>
            ))}
          </div>
        </div>
        
        <div className="hero-visual reveal slide-right delay-200 active">
          <div className="hero-reference-visual" aria-label="Digital transformation dashboard illustration">
            <div className="hero-globe"></div>
            <div className="hero-feature-card hero-feature-code">
              <i className="ri-code-s-slash-line"></i>
              <span>Custom<br />Development</span>
            </div>
            <div className="hero-feature-card hero-feature-mobile">
              <i className="ri-smartphone-line"></i>
              <span>Mobile<br />Applications</span>
            </div>
            <div className="hero-feature-card hero-feature-cloud">
              <i className="ri-cloud-line"></i>
              <span>Cloud<br />Solutions</span>
            </div>
            <div className="hero-feature-card hero-feature-analytics">
              <i className="ri-bar-chart-box-line"></i>
              <span>Data Analytics<br />&amp; AI</span>
            </div>
            <div className="hero-feature-card hero-feature-secure">
              <i className="ri-shield-check-line"></i>
              <span>Secure &amp;<br />Reliable</span>
            </div>
            <div className="hero-laptop-mockup">
              <div className="laptop-screen">
                <div className="mock-sidebar"></div>
                <div className="mock-content">
                  <div className="mock-topline">
                    <span>Dashboard</span>
                    <div><i className="ri-notification-3-line"></i><i className="ri-settings-3-line"></i></div>
                  </div>
                  <div className="mock-stat-grid">
                    <div><span>Total Projects</span><strong>128</strong></div>
                    <div><span>Active Clients</span><strong>87</strong></div>
                    <div><span>Tasks Completed</span><strong>1,245</strong></div>
                    <div><span>Revenue</span><strong>₹24.5L</strong></div>
                  </div>
                  <div className="mock-chart">
                    <svg viewBox="0 0 360 120" aria-hidden="true">
                      <path d="M8 92 C45 76, 68 90, 98 58 S155 36, 190 64 S250 104, 300 72 S335 48, 352 42" fill="none" stroke="#2563eb" strokeWidth="5" strokeLinecap="round"/>
                      <path d="M8 102 C64 90, 112 96, 164 72 S248 60, 352 32" fill="none" stroke="#14b8a6" strokeWidth="3" strokeLinecap="round" opacity=".55"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="laptop-base"></div>
            </div>
            <div className="hero-phone-mockup"></div>
            <div className="hero-mug-shape"></div>
            <div className="hero-plant-shape"></div>
          </div>

          <div 
            ref={dashboardRef}
            className="dashboard-wrapper"
            onMouseMove={(e) => handleMouseMove(e, dashboardRef.current)}
            onMouseLeave={() => handleMouseLeave(dashboardRef.current)}
          >
            <div className="dashboard-header">
              <div className="window-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="dashboard-title">Nexinfosoft Cloud Analytics</div>
              <div style={{ fontSize: '12px', color: 'var(--accent)' }}><i className="ri-pulse-line"></i> Live</div>
            </div>
            
            <div className="dashboard-grid">
              <div className="dashboard-main">
                <div>
                  <div className="chart-title">System Performance</div>
                  <div className="chart-subtitle">Real-time automation operations count</div>
                </div>
                
                <div className="chart-svg-container">
                  <svg viewBox="0 0 340 180" style={{ width: '100%', height: '100%' }} aria-hidden="true">
                    <line x1="0" y1="40" x2="340" y2="40" stroke="rgba(255,255,255,0.03)" />
                    <line x1="0" y1="90" x2="340" y2="90" stroke="rgba(255,255,255,0.03)" />
                    <line x1="0" y1="140" x2="340" y2="140" stroke="rgba(255,255,255,0.03)" />
                    <path d="M 0 160 Q 40 80, 80 120 T 160 50 T 240 110 T 340 30" fill="none" stroke="rgba(143, 184, 74, 0.2)" strokeWidth="6" className="chart-line" />
                    <path d="M 0 160 Q 40 120, 80 140 T 160 80 T 240 70 T 340 45" fill="none" stroke="rgba(107, 78, 155, 0.2)" strokeWidth="4" />
                    <path d="M 0 160 Q 40 80, 80 120 T 160 50 T 240 110 T 340 30" fill="none" stroke="var(--accent)" strokeWidth="3" className="chart-line" />
                    <path d="M 0 160 Q 40 120, 80 140 T 160 80 T 240 70 T 340 45" fill="none" stroke="var(--secondary)" strokeWidth="2" />
                    <circle cx="160" cy="50" r="6" fill="#fff" stroke="var(--accent)" strokeWidth="3" className="pulse-node" />
                    <circle cx="240" cy="110" r="4" fill="#fff" stroke="var(--secondary)" strokeWidth="2" />
                  </svg>
                </div>
              </div>
              
              <div className="dashboard-sidebar">
                <div className="metric-card">
                  <div className="metric-label">API Response</div>
                  <div className="metric-val">99.98%</div>
                  <div className="metric-change"><i className="ri-arrow-up-s-line"></i> Optimal</div>
                </div>
                <div className="metric-card">
                  <div className="metric-label">Speed Score</div>
                  <div className="metric-val">98/100</div>
                  <div className="metric-change"><i className="ri-flashlight-line"></i> Ultra</div>
                </div>
                <div className="metric-card">
                  <div className="metric-label">Tasks Active</div>
                  <div className="metric-val">1,420/s</div>
                  <div className="metric-change"><i className="ri-arrow-up-s-line"></i> +12%</div>
                </div>
              </div>
            </div>

            <div className="floating-card floating-card-1">
              <div className="icon-box-small" style={{ background: 'rgba(143, 184, 74, 0.2)' }}><i className="ri-shield-check-line" style={{ color: 'var(--accent)' }}></i></div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: '700' }}>Security Core</div>
                <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Active Guard 2.0</div>
              </div>
            </div>

            <div className="floating-card floating-card-2">
              <div className="icon-box-small" style={{ background: 'rgba(107, 78, 155, 0.2)' }}><i className="ri-smartphone-line" style={{ color: 'var(--secondary)' }}></i></div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: '700' }}>App Deployment</div>
                <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>iOS / Android Done</div>
              </div>
            </div>
            <div className="floating-card floating-card-3">
              <div className="icon-box-small"><i className="ri-sparkling-2-line"></i></div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: '700' }}>AI Workflow</div>
                <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Automation Ready</div>
              </div>
            </div>
            <div className="hero-review-card">
              <div className="review-stars"><i className="ri-star-fill"></i><i className="ri-star-fill"></i><i className="ri-star-fill"></i><i className="ri-star-fill"></i><i className="ri-star-fill"></i></div>
              <strong>Enterprise ready delivery</strong>
              <span>Strategy, design, development, QA and launch support in one team.</span>
            </div>
          </div>

          <div className="hero-service-strip">
            <Link to="/service/business-website" className="hero-mini-card">
              <div className="hero-mini-img">
                <img src="/assets/images/web_dev_poster.png" alt="Website Development" />
              </div>
            </Link>
            <Link to="/service/mobile-applications" className="hero-mini-card">
              <div className="hero-mini-img">
                <img src="/assets/images/mobile_dev_poster.png" alt="Mobile App Development" />
              </div>
            </Link>
            <Link to="/service/erp-development" className="hero-mini-card">
              <div className="hero-mini-img">
                <img src="/assets/images/erp_poster.png" alt="ERP Solutions" />
              </div>
            </Link>
            <Link to="/service/digital-marketing" className="hero-mini-card">
              <div className="hero-mini-img">
                <img src="/assets/images/crm_poster.png" alt="Digital Marketing" />
              </div>
            </Link>
            <Link to="/service/custom-crm-development" className="hero-mini-card">
              <div className="hero-mini-img">
                <img src="/assets/images/cloud_poster.png" alt="Cloud Deployment" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
