import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import servicesDetailedData from '../data/servicesDetailedData';

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

const ServiceDetail = () => {
  const { slug } = useParams();
  
  // Find matching service from detailed data map
  const service = servicesDetailedData[slug];

  // Refs for tilt animations
  const heroMockupRef = useRef(null);
  const ctaIllustrationRef = useRef(null);

  // FAQ Accordion State
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);

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

  const toggleFaq = (index) => {
    if (activeFaqIndex === index) {
      setActiveFaqIndex(null);
    } else {
      setActiveFaqIndex(index);
    }
  };

  useEffect(() => {
    if (service) {
      document.title = `${service.title} | Nexinfosoft`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', service.subtitle);
      }
    }

    // Scroll reveal fallbacks
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => el.classList.add('active'));
    window.scrollTo(0, 0);
  }, [service, slug]);

  if (!service) {
    // If service slug is not in detailed dictionary, redirect to services overview
    return <Navigate to="/services" replace />;
  }

  return (
    <div className="service-detail-page-wrapper">
      {/* ==========================================================================
         SECTION 1: HERO SECTION
         ========================================================================== */}
      <section className="service-hero-sec">
        {/* Soft glowing mesh background */}
        <div className="service-mesh-grid"></div>
        <div className="service-glow-accent glow-one"></div>
        <div className="service-glow-accent glow-two"></div>

        <div className="container">
          {/* Breadcrumb Navigation */}
          <div className="service-breadcrumb reveal slide-up">
            <Link to="/">Home</Link>
            <i className="ri-arrow-right-s-line"></i>
            <Link to="/services">Services</Link>
            <i className="ri-arrow-right-s-line"></i>
            <span>{service.title}</span>
          </div>

          <div className="service-hero-grid">
            <div className="service-hero-left reveal slide-left">
              <span className="section-tag-premium">{service.badge}</span>
              <h1 className="service-hero-title">
                {service.title}
              </h1>
              <p className="service-hero-desc">
                {service.subtitle}
              </p>

              {/* Feature Tags Checklist */}
              <div className="service-feature-tags">
                {service.features.map((tag, idx) => (
                  <span key={idx} className="feature-tag-pill">
                    <i className="ri-checkbox-circle-fill"></i> {tag}
                  </span>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="service-hero-btns">
                <Link to="/contact" className="btn btn-primary">
                  <span>Get Free Consultation</span>
                  <i className="ri-chat-smile-2-line"></i>
                </Link>
                <Link to="/portfolio" className="btn btn-secondary">
                  <span>View Portfolio</span>
                  <i className="ri-layout-grid-line"></i>
                </Link>
              </div>
            </div>

            <div className="service-hero-right reveal slide-right delay-200">
              <div 
                ref={heroMockupRef}
                className="service-mockup-container"
                onMouseMove={(e) => handleMouseMove(e, heroMockupRef.current, 5)}
                onMouseLeave={() => handleMouseLeave(heroMockupRef.current)}
              >
                {/* Browser Mockup Glass Panel */}
                <div className="browser-mockup-frame">
                  <div className="browser-mockup-header">
                    <div className="browser-dots">
                      <span className="dot-red"></span>
                      <span className="dot-yellow"></span>
                      <span className="dot-green"></span>
                    </div>
                    <div className="browser-address-bar">{service.heroMockupTitle || 'nexinfosoft.com/project'}</div>
                  </div>

                  <div className="browser-mockup-body">
                    {/* Inner Mockup Illustration Design */}
                    <div className="mockup-content-skeleton">
                      <div className="skel-nav">
                        <div className="skel-logo"></div>
                        <div className="skel-menu-items">
                          <span></span><span></span><span></span>
                        </div>
                      </div>
                      <div className="skel-hero">
                        <div className="skel-hero-left">
                          <div className="skel-line title-line"></div>
                          <div className="skel-line sub-line"></div>
                          <div className="skel-line btn-line"></div>
                        </div>
                        <div className="skel-hero-right">
                          <div className="skel-box"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Orbiting Floating Cards with Glassmorphism */}
                {service.floatingCards && service.floatingCards.map((card, idx) => (
                  <div key={idx} className={`floating-orbit-card float-card-${idx + 1}`}>
                    <i className={card.icon}></i>
                    <span>{card.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 2: BENEFITS SECTION
         ========================================================================== */}
      <section className="service-benefits-sec">
        <div className="container">
          <div className="section-header-premium reveal slide-up">
            <span className="section-tag-premium text-center">BENEFITS</span>
            <h2 className="section-title-premium text-center">
              How This Helps Your Business
            </h2>
            <p className="section-desc-premium text-center">
              Deploy intelligent solutions tailored directly to drive key brand conversions, establish market dominance, and accelerate operations.
            </p>
          </div>

          <div className="benefits-premium-grid">
            {service.benefits.map((benefit, idx) => (
              <div key={idx} className="benefit-premium-card reveal slide-up" style={{ '--delay': `${idx * 100}ms` }}>
                <div className="benefit-card-bg-gradient" style={{ background: benefit.color }}></div>
                <div className="benefit-icon-wrapper">
                  <i className={benefit.icon}></i>
                </div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
                <div className="benefit-card-border-glow"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 3: WHAT'S INCLUDED SECTION (SPLIT STICKY ROW)
         ========================================================================== */}
      <section className="service-included-sec">
        <div className="container">
          <div className="service-included-grid">
            <div className="service-included-left reveal slide-left">
              <span className="section-tag-premium">DELIVERABLES</span>
              <h2 className="section-title-premium">
                Comprehensive Solutions Crafted For High Performance
              </h2>
              <p className="section-desc-premium">
                Every service comes integrated with our rigorous engineering protocols, elite UI standards, and complete post-launch technical backing. We handle the heavy lifting so you can focus on scale.
              </p>
              
              <div className="included-perks-list">
                <div className="perk-item">
                  <i className="ri-flashlight-fill"></i>
                  <div>
                    <h4>Industry-Leading Speeds</h4>
                    <p>Optimized bundle loading ensuring quick responsiveness on all devices.</p>
                  </div>
                </div>
                <div className="perk-item">
                  <i className="ri-shield-keyhole-fill"></i>
                  <div>
                    <h4>Enterprise Grade Security</h4>
                    <p>Rigorous script parameter cleanups and complete SSL token configurations.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="service-included-right reveal slide-right delay-200">
              {/* Frosted glass sticky card */}
              <div className="whats-included-sticky-card">
                <div className="card-top-accent"></div>
                <h3>What's Included</h3>
                
                <ul className="included-checklist-ul">
                  {service.whatsIncluded.map((item, idx) => (
                    <li key={idx}>
                      <i className="ri-checkbox-circle-line"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/contact" className="btn btn-primary sticky-card-cta">
                  <span>Get Free Consultation</span>
                  <i className="ri-arrow-right-line"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 4: PROCESS SECTION (INTERACTIVE TIMELINE)
         ========================================================================== */}
      <section className="service-process-sec">
        <div className="container">
          <div className="section-header-premium reveal slide-up">
            <span className="section-tag-premium text-center">OUR WORKFLOW</span>
            <h2 className="section-title-premium text-center">
              Our Process
            </h2>
            <p className="section-desc-premium text-center">
              A highly disciplined, transparent workflow structured to deliver top-tier engineering assets on schedule.
            </p>
          </div>

          {/* Interactive Process timeline */}
          <div className="process-timeline-wrapper reveal slide-up">
            {/* Connection Line */}
            <div className="timeline-connector-line"></div>

            <div className="timeline-items-grid">
              {service.process.map((stage, idx) => (
                <div key={idx} className="timeline-node-card">
                  <div className="node-badge-outer">
                    <div className="node-badge-number">{stage.step}</div>
                  </div>
                  <h4>{stage.title}</h4>
                  <p>{stage.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 5: WHY CHOOSE NEXINFOSOFT
         ========================================================================== */}
      <section className="service-why-sec">
        <div className="container">
          <div className="section-header-premium reveal slide-up">
            <span className="section-tag-premium text-center">WHY CHOOSE US</span>
            <h2 className="section-title-premium text-center">
              Why Organizations Partner With Nexinfosoft
            </h2>
            <p className="section-desc-premium text-center">
              We merge enterprise-grade development processes with high-conversion aesthetic designs.
            </p>
          </div>

          <div className="why-choose-glass-grid">
            {service.whyChoose.map((item, idx) => (
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
         SECTION 6: PORTFOLIO SHOWCASE
         ========================================================================== */}
      <section className="service-portfolio-sec">
        <div className="container">
          <div className="section-header-premium reveal slide-up">
            <span className="section-tag-premium text-center">SUCCESS STORIES</span>
            <h2 className="section-title-premium text-center">
              Projects We Have Built
            </h2>
            <p className="section-desc-premium text-center">
              Examine our real-world system deployments engineered for speed, utility, and market authority.
            </p>
          </div>

          <div className="portfolio-showcase-grid">
            {service.portfolio.map((project, idx) => (
              <div key={idx} className="portfolio-premium-card reveal slide-up" style={{ '--delay': `${idx * 120}ms` }}>
                <div className="portfolio-img-sandbox">
                  <div className="portfolio-glass-icon-wrapper">
                    <i className={project.image}></i>
                  </div>
                  <div className="portfolio-img-overlay-glow"></div>
                </div>
                <div className="portfolio-card-info">
                  <span className="portfolio-card-industry">{project.industry}</span>
                  <h3>{project.name}</h3>
                  <p>{project.desc}</p>
                  <Link to="/portfolio" className="btn-view-project-link">
                    <span>View Project</span>
                    <i className="ri-arrow-right-up-line"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 7: PRICING SECTION
         ========================================================================== */}
      <section className="service-pricing-sec">
        <div className="container">
          <div className="section-header-premium reveal slide-up">
            <span className="section-tag-premium text-center">TRANSPARENT PRICING</span>
            <h2 className="section-title-premium text-center">
              Choose The Plan That Fits Your Goals
            </h2>
            <p className="section-desc-premium text-center">
              No hidden fees. Premium engineering scoped to match your immediate launch timelines.
            </p>
          </div>

          <div className="pricing-cards-container">
            {service.pricing.map((plan, idx) => (
              <div 
                key={idx} 
                className={`pricing-premium-card reveal slide-up ${plan.recommended ? 'recommended-pricing-card' : ''}`}
                style={{ '--delay': `${idx * 150}ms` }}
              >
                {plan.recommended && <div className="recommended-ribbon">RECOMMENDED</div>}
                
                <div className="pricing-card-header">
                  <span className="pricing-plan-name">{plan.name}</span>
                  <h3 className="pricing-plan-price">{plan.price}</h3>
                  <span className="pricing-plan-timeline"><i className="ri-time-line"></i> {plan.timeline}</span>
                </div>

                <div className="pricing-card-body">
                  <ul className="pricing-features-list">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx}>
                        <i className="ri-checkbox-circle-fill"></i>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="pricing-support-tier">
                    <i className="ri-customer-service-2-fill"></i>
                    <span>{plan.support}</span>
                  </div>
                </div>

                <div className="pricing-card-footer">
                  <Link 
                    to="/contact" 
                    className={`btn ${plan.recommended ? 'btn-primary' : 'btn-secondary'} pricing-cta-btn`}
                  >
                    <span>Get Started Now</span>
                    <i className="ri-arrow-right-line"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 8: FAQ SECTION
         ========================================================================== */}
      <section className="service-faq-sec">
        <div className="container">
          <div className="service-faq-grid">
            <div className="faq-grid-left reveal slide-left">
              <span className="section-tag-premium">QUESTIONS</span>
              <h2 className="section-title-premium">
                Frequently Asked Questions
              </h2>
              <p className="section-desc-premium">
                Have questions regarding timelines, asset handovers, security parameters, or ongoing support cycles? Explore our quick resources or connect with a dedicated project manager.
              </p>
              
              <Link to="/contact" className="btn btn-secondary contact-faq-btn">
                <span>Talk To An Expert</span>
                <i className="ri-phone-fill"></i>
              </Link>
            </div>

            <div className="faq-grid-right reveal slide-right delay-200">
              <div className="accordion-faq-list">
                {service.faqs.map((faq, idx) => (
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
         SECTION 9: CTA SECTION (DARK PREMIUM)
         ========================================================================== */}
      <section className="service-final-cta-sec">
        <div className="container">
          <div className="final-cta-dark-card reveal slide-up">
            <div className="final-cta-glow glow-one"></div>
            <div className="final-cta-glow glow-two"></div>

            <div className="final-cta-inner-grid">
              <div className="final-cta-left">
                <h2 className="final-cta-title">
                  Ready To Build Your <br />
                  <span className="gradient-text-accent">{service.title.replace(' Development', '')}?</span>
                </h2>
                <p className="final-cta-desc">
                  Let's create an industry-leading digital asset that attracts organic customers, streamlines operational logic, and builds long-term brand authority.
                </p>

                <div className="final-cta-buttons">
                  <Link to="/contact" className="btn btn-primary">
                    <span>Get Free Consultation</span>
                    <i className="ri-chat-smile-3-line"></i>
                  </Link>
                  <Link to="/portfolio" className="btn btn-secondary">
                    <span>View Our Work</span>
                    <i className="ri-layout-masonry-line"></i>
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
                  {/* Premium drifting rocket/3D dashboard icon illustration */}
                  <div className="cta-icon-glass-bubble">
                    <i className="ri-rocket-2-line"></i>
                  </div>
                  <div className="cta-orbiting-stats stats-one">
                    <span>Speed optimized</span>
                  </div>
                  <div className="cta-orbiting-stats stats-two">
                    <span>SEO Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
