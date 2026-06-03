import React, { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import techStackData from '../data/techStackData';

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

// Helper component to render stars for ratings
const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<i key={i} className="ri-star-fill star-active"></i>);
    } else {
      stars.push(<i key={i} className="ri-star-line star-inactive"></i>);
    }
  }
  return <div className="comparison-stars">{stars}</div>;
};

const TechStack = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('frontend');
  const [data, setData] = useState(techStackData);

  // Refs for tilt parallax
  const heroIllustrationRef = useRef(null);
  const ctaIllustrationRef = useRef(null);
  const stackSelectionScrollerRef = useRef(null);
  const techProjectsScrollerRef = useRef(null);
  const techMattersScrollerRef = useRef(null);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab.toLowerCase());
    }
  }, [searchParams]);

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => el.classList.add('active'));
    window.scrollTo(0, 0);
  }, [activeTab]);

  useEffect(() => {
    const fetchDynamicTechStack = async () => {
      try {
        const res = await fetch('/api/techstack');
        if (res.ok) {
          const dbItems = await res.json();
          if (dbItems && dbItems.length > 0) {
            // Clone default fallback
            const base = JSON.parse(JSON.stringify(techStackData));
            
            // Build grouped mapping dynamically
            const grouped = {};
            
            // Initialize with empty arrays for standard categories
            const standardCats = ['frontend', 'backend', 'mobile', 'database', 'cloud', 'ai'];
            standardCats.forEach(cat => {
              grouped[cat] = [];
            });

            dbItems.forEach(item => {
              const cat = item.category.toLowerCase().trim();
              if (!grouped[cat]) {
                grouped[cat] = [];
              }
              grouped[cat].push({
                name: item.name,
                icon: item.icon,
                desc: item.desc,
                color: item.color,
                ...(item.metadata || {})
              });
            });

            Object.keys(grouped).forEach(cat => {
              if (grouped[cat].length > 0) {
                if (!base.categories[cat]) {
                  // Custom dynamic category header setup
                  const formattedName = cat.charAt(0).toUpperCase() + cat.slice(1);
                  base.categories[cat] = {
                    title: `${formattedName} Solutions`,
                    desc: `Explore our advanced ${cat} technologies and enterprise tools catalog.`,
                    tag: `${cat.toUpperCase()} TECHNOLOGIES`,
                    items: []
                  };
                }
                base.categories[cat].items = grouped[cat];
              }
            });

            setData(base);
          }
        }
      } catch (err) {
        // Fallback active
      }
    };

    fetchDynamicTechStack();
  }, []);

  useEffect(() => {
    const scroller = stackSelectionScrollerRef.current;
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
        const firstItem = scroller.querySelector('.tech-process-node-card');
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

  useEffect(() => {
    const scroller = techProjectsScrollerRef.current;
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
        const firstItem = scroller.querySelector('.tech-project-showcase-card');
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

  useEffect(() => {
    const scroller = techMattersScrollerRef.current;
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
        const firstItem = scroller.querySelector('.why-glass-card');
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

  // Parallax mouse tilt handler
  const handleMouseMove = (event, element, intensity = 6) => {
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -intensity;
    const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * intensity;
    
    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
  };

  const handleMouseLeave = (element) => {
    if (!element) return;
    element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <div className="tech-page-wrapper">
      {/* ==========================================================================
         SECTION 1: HERO SECTION
         ========================================================================== */}
      <section className="tech-hero-sec">
        {/* Glowing visual background */}
        <div className="tech-mesh-grid"></div>
        <div className="tech-glow-accent glow-one"></div>
        <div className="tech-glow-accent glow-two"></div>

        <div className="container">
          <div className="tech-hero-grid">
            <div className="tech-hero-left reveal slide-left">
              <span className="section-tag-premium">TECHNOLOGY STACK</span>
              <h1 className="tech-hero-title">
                Technology Chosen For Performance, Scale & Growth
              </h1>
              <p className="tech-hero-desc">
                Every project is different. We select technologies based on business goals, scalability requirements, integrations, security, and future growth.
              </p>

              {/* Action Buttons */}
              <div className="tech-hero-btns">
                <a href="#tech-panel" className="btn btn-primary">
                  <span>Explore Technologies</span>
                  <i className="ri-arrow-down-line"></i>
                </a>
                <Link to="/contact" className="btn btn-secondary">
                  <span>Book Consultation</span>
                  <i className="ri-calendar-event-line"></i>
                </Link>
              </div>

              {/* Counters Row */}
              <div className="tech-hero-stats">
                <div className="tech-stat-item">
                  <h3><AnimatedCounter value="300+" /></h3>
                  <span>Projects Delivered</span>
                </div>
                <div className="tech-stat-item">
                  <h3><AnimatedCounter value="50+" /></h3>
                  <span>Experts Team</span>
                </div>
                <div className="tech-stat-item">
                  <h3><AnimatedCounter value="20+" /></h3>
                  <span>Technologies</span>
                </div>
                <div className="tech-stat-item">
                  <h3><AnimatedCounter value="10+" /></h3>
                  <span>Years Experience</span>
                </div>
              </div>
            </div>

            <div className="tech-hero-right reveal slide-right delay-200">
              <div 
                ref={heroIllustrationRef}
                className="tech-hero-illustration"
                onMouseMove={(e) => handleMouseMove(e, heroIllustrationRef.current, 5)}
                onMouseLeave={() => handleMouseLeave(heroIllustrationRef.current)}
              >
                {/* 3D Stacked Container Graphic */}
                <div className="tech-stacked-container">
                  <div className="tech-stack-layer layer-one">
                    <span>Applications Interface Layer</span>
                  </div>
                  <div className="tech-stack-layer layer-two">
                    <span>Scalable Microservices API</span>
                  </div>
                  <div className="tech-stack-layer layer-three">
                    <span>Secure Distributed Databases</span>
                  </div>
                </div>

                {/* Orbiting Icons */}
                <div className="tech-orbit-icon icon-react">
                  <i className="ri-reactjs-line"></i>
                  <span className="tooltip-tag">React</span>
                </div>
                <div className="tech-orbit-icon icon-node">
                  <i className="ri-nodejs-line"></i>
                  <span className="tooltip-tag">Node.js</span>
                </div>
                <div className="tech-orbit-icon icon-mongo">
                  <i className="ri-leaf-line"></i>
                  <span className="tooltip-tag">MongoDB</span>
                </div>
                <div className="tech-orbit-icon icon-aws">
                  <i className="ri-amazon-line"></i>
                  <span className="tooltip-tag">AWS</span>
                </div>
                <div className="tech-orbit-icon icon-flutter">
                  <i className="ri-flutter-line"></i>
                  <span className="tooltip-tag">Flutter</span>
                </div>
                <div className="tech-orbit-icon icon-python">
                  <i className="ri-terminal-box-line"></i>
                  <span className="tooltip-tag">Python</span>
                </div>
                <div className="tech-orbit-icon icon-ai">
                  <i className="ri-brain-line"></i>
                  <span className="tooltip-tag">AI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 2: INTERACTIVE TECHNOLOGY CATEGORIES (SPLIT TABS VIEW)
         ========================================================================== */}
      <section id="tech-panel" className="tech-showcase-sec">
        <div className="container">
          <div className="tech-split-container">
            {/* Left Sidebar Menu */}
            {/* Left Sidebar Menu */}
            <aside className="tech-sidebar reveal slide-left">
              <div className="tech-sidebar-sticky">
                <span className="sidebar-title-tag">CATEGORIES</span>
                <nav className="tech-sidebar-nav">
                  {Object.keys(data.categories).map((catKey) => {
                    const cat = data.categories[catKey];
                    // Map default categories to their specific icons, or fall back to code icon
                    const categoryIcons = {
                      frontend: 'ri-layout-4-line',
                      backend: 'ri-server-line',
                      mobile: 'ri-smartphone-line',
                      database: 'ri-database-2-line',
                      cloud: 'ri-cloud-line',
                      ai: 'ri-brain-line'
                    };
                    const iconClass = categoryIcons[catKey] || 'ri-shield-flash-line';
                    const label = catKey.charAt(0).toUpperCase() + catKey.slice(1);
                    return (
                      <button 
                        key={catKey}
                        className={`sidebar-nav-btn ${activeTab === catKey ? 'active' : ''}`}
                        onClick={() => setActiveTab(catKey)}
                      >
                        <i className={iconClass}></i>
                        <span>{catKey === 'ai' ? 'AI & Analytics' : catKey === 'cloud' ? 'Cloud & DevOps' : label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Right Side Content (Dynamic Panels) */}
            <main className="tech-content-area reveal slide-right delay-100">
              {/* Specialized Mobile View */}
              {activeTab === 'mobile' && data.categories.mobile && (
                <div className="tech-panel-content">
                  <span className="section-tag-premium">{data.categories.mobile.tag}</span>
                  <h2 className="tech-panel-heading">{data.categories.mobile.title}</h2>
                  <p className="tech-panel-desc">{data.categories.mobile.desc}</p>

                  <div className="tech-comparison-stack">
                    {data.categories.mobile.items.map((tech, idx) => (
                      <div key={idx} className="tech-mobile-comparison-card">
                        <div className="mobile-comp-left">
                          <div className="tech-icon-wrap">
                            <i className={tech.icon}></i>
                          </div>
                          <h3>{tech.name}</h3>
                          <p>{tech.desc}</p>
                        </div>
                        <div className="mobile-comp-right">
                          <div className="comp-meta-item">
                            <strong>Pros:</strong>
                            <p>{tech.pros || 'Fast development, shared codebases.'}</p>
                          </div>
                          <div className="comp-meta-item">
                            <strong>Best Use Cases:</strong>
                            <p>{tech.useCases || 'Startup apps, SaaS products.'}</p>
                          </div>
                          <div className="comp-meta-row-split">
                            <div className="comp-split-field">
                              <strong>Speed Rating:</strong>
                              <div className="perf-bar-outer">
                                <div className="perf-bar-inner" style={{ width: tech.speed || '90%' }}></div>
                              </div>
                            </div>
                            <div className="comp-split-field">
                              <strong>Maintenance:</strong>
                              <span className="maintenance-level-badge">{tech.maintenance || 'Low Cost'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Specialized Cloud View */}
              {activeTab === 'cloud' && data.categories.cloud && (
                <div className="tech-panel-content">
                  <span className="section-tag-premium">{data.categories.cloud.tag}</span>
                  <h2 className="tech-panel-heading">{data.categories.cloud.title}</h2>
                  <p className="tech-panel-desc">{data.categories.cloud.desc}</p>

                  {/* Cloud Architecture Diagram Showcase */}
                  <div className="cloud-architecture-wrapper">
                    <span className="diag-title">Floating Architecture Visualization</span>
                    
                    <div className="cloud-diagram-sandbox">
                      <div className="diag-node node-dns">
                        <i className="ri-shield-flash-line"></i>
                        <span>Cloudflare DNS</span>
                      </div>
                      
                      <div className="diag-connector">
                        <div className="connector-pulse"></div>
                      </div>
                      
                      <div className="diag-node node-lb">
                        <i className="ri-git-merge-line"></i>
                        <span>AWS Elastic Load Balancer</span>
                      </div>

                      <div className="diag-connector-split">
                        <div className="split-connector line-left"></div>
                        <div className="split-connector line-right"></div>
                      </div>

                      <div className="diag-nodes-row">
                        <div className="diag-node node-app">
                          <i className="ri-box-3-line"></i>
                          <span>Docker App Container A</span>
                        </div>
                        <div className="diag-node node-app">
                          <i className="ri-box-3-line"></i>
                          <span>Docker App Container B</span>
                        </div>
                      </div>

                      <div className="diag-connector-join"></div>

                      <div className="diag-node node-db">
                        <i className="ri-database-2-line"></i>
                        <span>AWS RDS / PostgreSQL Database</span>
                      </div>
                    </div>
                  </div>

                  <div className="tech-cards-grid mt-4">
                    {data.categories.cloud.items.map((tech, idx) => (
                      <div key={idx} className="tech-detailed-card">
                        <div className="tech-card-head">
                          <div className="tech-icon-wrap" style={{ background: tech.color || 'rgba(255, 255, 255, 0.05)' }}>
                            <i className={tech.icon || 'ri-cloud-line'}></i>
                          </div>
                          <h3>{tech.name}</h3>
                        </div>
                        <p className="tech-card-desc">{tech.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Standard Dynamic Tab View (Frontend, Backend, Database, AI, & any Custom category) */}
              {!['mobile', 'cloud'].includes(activeTab) && data.categories[activeTab] && (
                <div className="tech-panel-content">
                  <span className="section-tag-premium">{data.categories[activeTab].tag}</span>
                  <h2 className="tech-panel-heading">{data.categories[activeTab].title}</h2>
                  <p className="tech-panel-desc">{data.categories[activeTab].desc}</p>

                  <div className="tech-cards-grid">
                    {data.categories[activeTab].items.map((tech, idx) => (
                      <div key={idx} className="tech-detailed-card">
                        <div className="tech-card-head">
                          <div className="tech-icon-wrap" style={{ background: tech.color || 'rgba(255, 255, 255, 0.05)' }}>
                            <i className={tech.icon || 'ri-code-s-slash-line'}></i>
                          </div>
                          <h3>{tech.name}</h3>
                        </div>
                        <p className="tech-card-desc">{tech.desc}</p>
                        
                        <div className="tech-card-meta">
                          <div className="meta-row">
                            <strong>Best For:</strong>
                            <span>{tech.bestFor || 'Custom Solutions'}</span>
                          </div>
                          <div className="meta-row">
                            <strong>Projects:</strong>
                            <span>{tech.projects || 'Enterprise Apps'}</span>
                          </div>
                          <div className="meta-row performance-row">
                            <strong>Performance:</strong>
                            <div className="perf-bar-outer">
                              <div className="perf-bar-inner" style={{ width: tech.performance || '95%' }}></div>
                            </div>
                            <span className="perf-number">{tech.performance || '95%'}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 3: TECHNOLOGY SELECTION PROCESS
         ========================================================================== */}
      <section className="tech-process-sec">
        <div className="container">
          <div className="section-header-premium reveal slide-up">
            <span className="section-tag-premium text-center">STACK SELECTION</span>
            <h2 className="section-title-premium text-center">
              How We Choose The Right Stack
            </h2>
            <p className="section-desc-premium text-center">
              We never enforce generic templates. We follow a highly structured engineering checklist to identify the perfect tools for your needs.
            </p>
          </div>

          <div className="tech-process-timeline-wrap reveal slide-up">
            <div className="timeline-connector-line"></div>
            
            <div ref={stackSelectionScrollerRef} className="timeline-process-grid stack-selection-grid-mobile">
              {data.selectionProcess.map((item, idx) => (
                <div key={idx} className="tech-process-node-card">
                  <div className="node-icon-circle-wrap">
                    <div className="node-badge-outer">
                      <div className="node-badge-number">{item.step}</div>
                    </div>
                  </div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 4: COMPARISON MATRIX SECTION
         ========================================================================== */}
      <section className="tech-comparison-sec">
        <div className="container">
          <div className="section-header-premium reveal slide-up">
            <span className="section-tag-premium text-center">TECHNOLOGY COMPARISON</span>
            <h2 className="section-title-premium text-center">
              Compare & Choose The Best Fit For Your Project
            </h2>
            <p className="section-desc-premium text-center">
              Analyze the engineering differences between core languages and frameworks to find your ideal match.
            </p>
          </div>

          {/* Table split view */}
          <div className="comparison-flex-layout reveal slide-up delay-100">
            <div className="comparison-table-wrapper">
              <table className="premium-comparison-table">
                <thead>
                  <tr>
                    <th>Technology</th>
                    <th>Best For</th>
                    <th>Scalability</th>
                    <th>Performance</th>
                    <th>Learning Curve</th>
                    <th>Maintenance</th>
                  </tr>
                </thead>
                <tbody>
                  {data.comparisonTable.map((row, idx) => (
                    <tr key={idx}>
                      <td className="tech-td-bold">
                        <span>{row.tech}</span>
                      </td>
                      <td className="tech-td-muted">{row.bestFor}</td>
                      <td><StarRating rating={row.scalability} /></td>
                      <td><StarRating rating={row.performance} /></td>
                      <td><StarRating rating={row.learning} /></td>
                      <td><StarRating rating={row.maintenance} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="comparison-side-sticky-box">
              <h3>Not sure which technology is best?</h3>
              <p>Our experts will help you choose the perfect stack for performance, security, and scalability.</p>
              
              <ul className="comparison-side-checklist">
                <li><i className="ri-checkbox-circle-fill"></i> Free Consultation</li>
                <li><i className="ri-checkbox-circle-fill"></i> Customized Recommendation</li>
                <li><i className="ri-checkbox-circle-fill"></i> Future Ready Solutions</li>
                <li><i className="ri-checkbox-circle-fill"></i> Budget Friendly</li>
              </ul>

              <Link to="/contact" className="btn btn-primary sticky-comparison-cta">
                <span>Get Free Consultation</span>
                <i className="ri-chat-smile-2-line"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 5: PROJECTS SHOWCASE
         ========================================================================== */}
      <section className="tech-projects-sec">
        <div className="container">
          <div className="section-header-premium reveal slide-up">
            <span className="section-tag-premium text-center">PROJECTS BUILT WITH MODERN STACK</span>
            <h2 className="section-title-premium text-center">
              Real Solutions. Real Impact.
            </h2>
            <p className="section-desc-premium text-center">
              Check out these live, highly robust platforms built utilizing our premium technology frameworks.
            </p>
          </div>

          <div ref={techProjectsScrollerRef} className="tech-projects-grid">
            {data.projectsBuilt.map((proj, idx) => (
              <div key={idx} className="tech-project-showcase-card reveal slide-up" style={{ '--delay': `${idx * 100}ms` }}>
                <div className="proj-card-icon-banner">
                  <i className="ri-window-line"></i>
                  <span className="proj-card-industry-tag">{proj.industry}</span>
                </div>
                <div className="proj-card-body">
                  <h3>{proj.name}</h3>
                  <span className="proj-card-type">{proj.type}</span>
                  
                  <div className="proj-card-tech-strip">
                    <strong>Technologies Used:</strong>
                    <p>{proj.tech}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="tech-projects-footer text-center">
            <Link to="/portfolio" className="btn btn-secondary">
              <span>View More Projects</span>
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 6: WHY TECHNOLOGY MATTERS
         ========================================================================== */}
      <section className="tech-matters-sec">
        <div className="container">
          <div className="section-header-premium reveal slide-up">
            <span className="section-tag-premium text-center">WHY TECHNOLOGY MATTERS</span>
            <h2 className="section-title-premium text-center">
              Why Choice of Tech Stack Defines Success
            </h2>
            <p className="section-desc-premium text-center">
              Picking modern tech tools protects your investments, guarantees scalability, and accelerates development.
            </p>
          </div>

          <div ref={techMattersScrollerRef} className="why-choose-glass-grid tech-matters-grid">
            {data.whyTechnologyMatters.map((item, idx) => (
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
         SECTION 7: CTA SECTION
         ========================================================================== */}
      <section className="tech-final-cta-sec">
        <div className="container">
          <div className="final-cta-dark-card reveal slide-up">
            <div className="final-cta-glow glow-one"></div>
            <div className="final-cta-glow glow-two"></div>

            <div className="final-cta-inner-grid">
              <div className="final-cta-left">
                <h2 className="final-cta-title">
                  Not Sure Which Technology Is Right For Your Project?
                </h2>
                <p className="final-cta-desc">
                  Our experts will suggest the perfect technology stack based on your goals, budget, integrations, and future plans.
                </p>

                <div className="final-cta-buttons">
                  <Link to="/contact" className="btn btn-primary">
                    <span>Get Free Consultation</span>
                    <i className="ri-chat-smile-3-line"></i>
                  </Link>
                  <Link to="/contact" className="btn btn-secondary">
                    <span>Talk To Experts</span>
                    <i className="ri-phone-fill"></i>
                  </Link>
                </div>
              </div>

              <div className="final-cta-right">
                <div 
                  ref={ctaIllustrationRef}
                  className="cta-illustration-container"
                  onMouseMove={(e) => handleMouseMove(e, ctaIllustrationRef.current, 7)}
                  onMouseLeave={() => handleMouseLeave(ctaIllustrationRef.current)}
                >
                  {/* Premium Orbiting Tech Sphere */}
                  <div className="cta-icon-glass-bubble tech-sphere-bubble">
                    <i className="ri-bubble-chart-line"></i>
                  </div>
                  
                  {/* Orbiting Technology mini icons */}
                  <div className="tech-sphere-floating-logo t-logo-react"><i className="ri-reactjs-line"></i></div>
                  <div className="tech-sphere-floating-logo t-logo-node"><i className="ri-nodejs-line"></i></div>
                  <div className="tech-sphere-floating-logo t-logo-aws"><i className="ri-amazon-line"></i></div>
                  <div className="tech-sphere-floating-logo t-logo-flutter"><i className="ri-flutter-line"></i></div>
                </div>
              </div>
            </div>

            {/* Micro stats banner inside CTA */}
            <div className="cta-micro-stats-banner">
              <div className="micro-stat">
                <strong><AnimatedCounter value="300+" /></strong>
                <span>Projects</span>
              </div>
              <div className="micro-stat">
                <strong><AnimatedCounter value="50+" /></strong>
                <span>Experts Team</span>
              </div>
              <div className="micro-stat">
                <strong>24/7</strong>
                <span>Support Sync</span>
              </div>
              <div className="micro-stat">
                <strong>100%</strong>
                <span>Client Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TechStack;
