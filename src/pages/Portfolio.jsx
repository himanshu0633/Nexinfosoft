import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import portfolioData from '../data/portfolioData';

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

const Portfolio = () => {
  const [filter, setFilter] = useState('all');

  // Refs for tilt parallax
  const heroIllustrationRef = useRef(null);
  const ctaIllustrationRef = useRef(null);

  // Filter Pills mapping
  const filterPills = [
    { key: 'all', label: 'All Projects' },
    { key: 'web', label: 'Web Applications' },
    { key: 'mobile', label: 'Mobile Apps' },
    { key: 'erp', label: 'ERP Systems' },
    { key: 'crm', label: 'CRM Solutions' },
    { key: 'ai', label: 'AI Solutions' },
    { key: 'ecommerce', label: 'E-commerce' },
    { key: 'real-estate', label: 'Real Estate' },
    { key: 'healthcare', label: 'Healthcare' }
  ];

  const handleFilterClick = (filterVal) => {
    setFilter(filterVal);
  };

  const handleCardMouseMove = (event, cardEl) => {
    if (!cardEl) return;
    const rect = cardEl.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    cardEl.style.setProperty('--mx', `${x}px`);
    cardEl.style.setProperty('--my', `${y}px`);

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
  }, [filter]);

  const filteredProjects = filter === 'all' 
    ? portfolioData.projects 
    : portfolioData.projects.filter(p => p.category === filter);

  return (
    <div className="portfolio-page-wrapper">
      {/* ==========================================================================
         SECTION 1: HERO SECTION
         ========================================================================== */}
      <section className="portfolio-hero-sec">
        {/* Soft glowing visual background */}
        <div className="portfolio-mesh-grid"></div>
        <div className="portfolio-glow-accent glow-one"></div>
        <div className="portfolio-glow-accent glow-two"></div>

        <div className="container">
          <div className="portfolio-hero-grid">
            <div className="portfolio-hero-left reveal slide-left">
              <span className="section-tag-premium">OUR PORTFOLIO</span>
              <h1 className="portfolio-hero-title">
                Real Projects. Real Results.
              </h1>
              <p className="portfolio-hero-desc">
                Explore custom software solutions, web applications, mobile apps, ERP systems, CRM platforms, and AI-powered products built for businesses across multiple industries.
              </p>

              {/* Action Buttons */}
              <div className="portfolio-hero-btns">
                <a href="#portfolio-section" className="btn btn-primary">
                  <span>View Projects</span>
                  <i className="ri-arrow-down-line"></i>
                </a>
                <Link to="/free-consultation" className="btn btn-secondary">
                  <span>Book Consultation</span>
                  <i className="ri-calendar-event-line"></i>
                </Link>
              </div>

              {/* Micro Stats Counter Row */}
              <div className="portfolio-hero-stats">
                <div className="port-stat-item">
                  <h3><AnimatedCounter value="300+" /></h3>
                  <span>Projects Delivered</span>
                </div>
                <div className="port-stat-item">
                  <h3><AnimatedCounter value="250+" /></h3>
                  <span>Happy Clients</span>
                </div>
                <div className="port-stat-item">
                  <h3><AnimatedCounter value="50+" /></h3>
                  <span>Experts Team</span>
                </div>
                <div className="port-stat-item">
                  <h3><AnimatedCounter value="10+" /></h3>
                  <span>Years Experience</span>
                </div>
              </div>
            </div>

            <div className="portfolio-hero-right reveal slide-right delay-200">
              <div 
                ref={heroIllustrationRef}
                className="portfolio-hero-illustration"
                onMouseMove={(e) => handleCardMouseMove(e, heroIllustrationRef.current)}
                onMouseLeave={() => handleCardMouseLeave(heroIllustrationRef.current)}
              >
                {/* 3D Dashboard Mockup Design representation */}
                <div className="hero-3d-dashboard-glass">
                  <div className="glass-dash-head">
                    <div className="glass-dots">
                      <span></span><span></span><span></span>
                    </div>
                    <div className="glass-title">Enterprise System Analytics</div>
                  </div>
                  <div className="glass-dash-body">
                    <div className="vis-bar-skeleton">
                      <div className="vis-bar-col" style={{ height: '70%', background: 'var(--accent)' }}></div>
                      <div className="vis-bar-col" style={{ height: '40%' }}></div>
                      <div className="vis-bar-col" style={{ height: '90%', background: 'var(--secondary)' }}></div>
                      <div className="vis-bar-col" style={{ height: '55%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Floating Cards */}
                <div className="port-floating-tag tag-one">
                  <i className="ri-checkbox-circle-fill"></i>
                  <span>ERP Config Active</span>
                </div>
                <div className="port-floating-tag tag-two">
                  <i className="ri-flashlight-line"></i>
                  <span>Speed: 99/100</span>
                </div>
                <div className="port-floating-tag tag-three">
                  <i className="ri-heart-pulse-line"></i>
                  <span>Healthcare API Synced</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 2: PORTFOLIO FILTER SECTION
         ========================================================================== */}
      <section id="portfolio-section" className="portfolio-showcase-section">
        <div className="container">
          <div className="portfolio-filters-wrapper reveal slide-up">
            <span className="filters-title">FILTER SYSTEMS</span>
            <div className="portfolio-interactive-pills">
              {filterPills.map((pill) => (
                <button
                  key={pill.key}
                  className={`filter-pill-btn ${filter === pill.key ? 'active' : ''}`}
                  onClick={() => handleFilterClick(pill.key)}
                >
                  <span>{pill.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ==========================================================================
             SECTION 3: FEATURED CASE STUDY
             ========================================================================== */}
          {filter === 'all' && (
            <div className="featured-case-study-sec reveal slide-up delay-100">
              <span className="featured-case-badge">FEATURED CASE STUDY</span>
              
              <div className="featured-case-grid" style={{ background: portfolioData.featuredCaseStudy.bg }}>
                <div className="featured-case-left">
                  <div className="featured-case-illustration">
                    <i className={portfolioData.featuredCaseStudy.icon}></i>
                    <div className="featured-pulsing-rings">
                      <span></span><span></span>
                    </div>
                  </div>
                </div>

                <div className="featured-case-right">
                  <span className="featured-industry-tag">{portfolioData.featuredCaseStudy.industry}</span>
                  <h2>{portfolioData.featuredCaseStudy.name}</h2>
                  
                  <div className="featured-case-specs">
                    <div className="spec-block">
                      <strong>Problem Statement:</strong>
                      <p>{portfolioData.featuredCaseStudy.problem}</p>
                    </div>
                    
                    <div className="spec-block">
                      <strong>Our Solution:</strong>
                      <p>{portfolioData.featuredCaseStudy.solution}</p>
                    </div>

                    <div className="spec-block">
                      <strong>Technology Stack:</strong>
                      <div className="featured-tech-chips">
                        {portfolioData.featuredCaseStudy.techStack.map((tech, idx) => (
                          <span key={idx} className="tech-chip-item">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Results achieved metrics */}
                  <div className="featured-case-metrics">
                    {portfolioData.featuredCaseStudy.metrics.map((metric, idx) => (
                      <div key={idx} className="featured-metric-box">
                        <h3>{metric.value}</h3>
                        <span>{metric.label}</span>
                      </div>
                    ))}
                  </div>

                  <Link to="/contact" className="btn btn-primary featured-case-cta">
                    <span>View Case Study</span>
                    <i className="ri-arrow-right-line"></i>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* ==========================================================================
             SECTION 4: PROJECT GRID
             ========================================================================== */}
          <div className="portfolio-grid-premium">
            {filteredProjects.map((project) => {
              let cardRef = null;
              return (
                <div 
                  key={project.id}
                  ref={el => cardRef = el}
                  className="portfolio-premium-card reveal slide-up"
                  onMouseMove={(e) => handleCardMouseMove(e, cardRef)}
                  onMouseLeave={() => handleCardMouseLeave(cardRef)}
                >
                  <div className="portfolio-img-sandbox">
                    <div className="portfolio-glass-icon-wrapper">
                      <i className={project.icon}></i>
                    </div>
                    <div className="portfolio-img-overlay-glow"></div>
                  </div>

                  <div className="portfolio-card-info">
                    <span className="portfolio-card-industry">{project.tag}</span>
                    <h3>{project.name}</h3>
                    <p>{project.desc}</p>
                    
                    <div className="portfolio-card-techs">
                      {project.techs.map((tech, tIdx) => (
                        <span key={tIdx} className="card-tech-chip">{tech}</span>
                      ))}
                    </div>

                    <Link to="/contact" className="btn-view-project-link">
                      <span>View Details</span>
                      <i className="ri-arrow-right-up-line"></i>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 5: TECHNOLOGY USED SECTION
         ========================================================================== */}
      <section className="portfolio-techs-sec">
        <div className="container">
          <div className="section-header-premium reveal slide-up">
            <span className="section-tag-premium text-center">OUR ENGINE</span>
            <h2 className="section-title-premium text-center">
              Technologies Behind Our Solutions
            </h2>
            <p className="section-desc-premium text-center">
              We leverage the most stable, performant, and advanced technology stacks to secure and scale your software assets.
            </p>
          </div>

          {/* Floating technology logos */}
          <div className="portfolio-techs-floating-row reveal slide-up delay-100">
            {portfolioData.technologies.map((tech, idx) => (
              <div key={idx} className="floating-tech-logo-card">
                <i className={tech.icon} style={{ color: tech.color }}></i>
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 6: CLIENT SUCCESS METRICS
         ========================================================================== */}
      <section className="portfolio-metrics-sec">
        <div className="container">
          <div className="section-header-premium reveal slide-up">
            <span className="section-tag-premium text-center">METRICS</span>
            <h2 className="section-title-premium text-center">
              Client Success Metrics
            </h2>
            <p className="section-desc-premium text-center">
              Our engineering achievements validated by real-world telemetry and cost improvements.
            </p>
          </div>

          <div className="success-metrics-grid">
            {portfolioData.successMetrics.map((met, idx) => (
              <div key={idx} className="metric-premium-box reveal slide-up" style={{ '--delay': `${idx * 100}ms` }}>
                <h3><AnimatedCounter value={met.value} /></h3>
                <span>{met.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 7: DEVELOPMENT PROCESS TIMELINE
         ========================================================================== */}
      <section className="portfolio-process-sec">
        <div className="container">
          <div className="section-header-premium reveal slide-up">
            <span className="section-tag-premium text-center">OUR BLUEPRINT</span>
            <h2 className="section-title-premium text-center">
              Our Development Process
            </h2>
            <p className="section-desc-premium text-center">
              A highly disciplined, multi-step pipeline built to prevent scope creeping and deliver pixel-perfect digital systems.
            </p>
          </div>

          {/* Timeline progress connector */}
          <div className="portfolio-timeline-wrapper reveal slide-up">
            <div className="timeline-connector-line"></div>

            <div className="timeline-process-grid">
              {portfolioData.timeline.map((step, idx) => (
                <div key={idx} className="portfolio-timeline-node-card">
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
         SECTION 8: TESTIMONIALS
         ========================================================================== */}
      <section className="portfolio-testimonials-sec">
        <div className="container">
          <div className="section-header-premium reveal slide-up">
            <span className="section-tag-premium text-center">TESTIMONIALS</span>
            <h2 className="section-title-premium text-center">
              What Our Clients Say
            </h2>
            <p className="section-desc-premium text-center">
              Nexinfosoft reviewed by company leaders and startup founders driving automation workflows.
            </p>
          </div>

          <div className="testimonials-glass-grid">
            {portfolioData.testimonials.map((test, idx) => (
              <div key={idx} className="testimonial-glass-card reveal slide-up" style={{ '--delay': `${idx * 150}ms` }}>
                <div className="test-card-head">
                  <div className="test-avatar">
                    <i className={test.avatar}></i>
                  </div>
                  <div>
                    <h4>{test.clientName}</h4>
                    <span>{test.role} at {test.company}</span>
                  </div>
                </div>
                
                <p className="test-review-text">"{test.review}"</p>

                <div className="test-rating-stars">
                  {Array.from({ length: test.rating }).map((_, rIdx) => (
                    <i key={rIdx} className="ri-star-fill star-active"></i>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 9: INDUSTRIES SERVED
         ========================================================================== */}
      <section className="portfolio-industries-sec">
        <div className="container">
          <div className="section-header-premium reveal slide-up">
            <span className="section-tag-premium text-center">INDUSTRIES</span>
            <h2 className="section-title-premium text-center">
              Industries We Serve
            </h2>
            <p className="section-desc-premium text-center">
              We engineer specialized software systems for diverse global business categories.
            </p>
          </div>

          <div className="industries-icon-grid">
            {portfolioData.industries.map((ind, idx) => (
              <div key={idx} className="industry-icon-card reveal slide-up" style={{ '--delay': `${idx * 80}ms` }}>
                <div className="industry-icon-badge" style={{ background: ind.color }}>
                  <i className={ind.icon}></i>
                </div>
                <h3>{ind.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 10: CTA SECTION (DARK GRADIENT)
         ========================================================================== */}
      <section className="portfolio-final-cta-sec">
        <div className="container">
          <div className="final-cta-dark-card reveal slide-up">
            <div className="final-cta-glow glow-one"></div>
            <div className="final-cta-glow glow-two"></div>

            <div className="final-cta-inner-grid">
              <div className="final-cta-left">
                <h2 className="final-cta-title">
                  Ready To Build Your Next Digital Product?
                </h2>
                <p className="final-cta-desc">
                  Let's transform your idea into a scalable digital solution.
                </p>

                <div className="final-cta-buttons">
                  <Link to="/contact" className="btn btn-primary">
                    <span>Start Your Project</span>
                    <i className="ri-magic-line"></i>
                  </Link>
                  <Link to="/free-consultation" className="btn btn-secondary">
                    <span>Book Consultation</span>
                    <i className="ri-chat-voice-line"></i>
                  </Link>
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
    </div>
  );
};

export default Portfolio;
