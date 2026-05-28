import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  useEffect(() => {
    // Scroll reveal fallback
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => el.classList.add('active'));
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="page-hero">
        <div className="container reveal slide-up">
          <h1 className="page-hero-title">Empowering Businesses Through Technology</h1>
          <p className="page-hero-desc">We build enterprise grade digital ecosystems designed to scale operations and unlock new market values.</p>
        </div>
      </div>

      <section className="company-overview">
        <div className="container overview-grid">
          <div className="overview-content reveal slide-left">
            <h2 className="section-title">About Nexinfosoft IT Solutions</h2>
            <p className="section-desc">
              Nexinfosoft IT Solutions provides enterprise-grade technology services for organizations that require clear documentation, structured execution, and measurable outcomes. We support business and government teams with web development, mobile applications, ERP solutions, enterprise software, AI/ML capabilities, and digital transformation services.
            </p>
            <p className="section-desc">
              Our delivery approach combines agile methodology with strong quality assurance, secure deployment support, and transparent reporting ensuring stakeholders maintain confidence throughout the engagement lifecycle.
            </p>
          </div>

          <div className="overview-table-wrap reveal slide-right delay-200">
            <div className="overview-table">
              <div className="overview-table-head">
                <span>Competency</span>
                <span>Description</span>
              </div>
              <div className="overview-table-row">
                <strong>Delivery Focus</strong>
                <span>Structured planning, sprint execution, and predictable milestones.</span>
              </div>
              <div className="overview-table-row">
                <strong>Quality Assurance</strong>
                <span>Functional, performance, and security validation across releases.</span>
              </div>
              <div className="overview-table-row">
                <strong>Enterprise Support</strong>
                <span>Deployment, handover, and documentation aligned to audit requirements.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
         ABOUT STORY
         ========================================== */}
      <section className="about-story">
        <div className="container about-intro-grid">
          <div className="reveal slide-left">
            <span className="section-tag">Our Profile</span>
            <h2 className="section-title">A Modern Software Development Partner</h2>
            <p className="section-desc" style={{ marginBottom: '18px' }}>
              Nexinfosoft is a certified technological solutions agency focused on designing, coding, and deploying bespoke software assets. Over the years, we have emerged as a trusted engineering partner for ambitious startups, SMEs, and global corporate giants.
            </p>
            <p className="section-desc" style={{ marginBottom: '28px' }}>
              Our delivery approach combines agile methodology with strong quality assurance, secure deployment support, and transparent reporting, ensuring stakeholders maintain confidence throughout the engagement lifecycle.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--accent)', marginBottom: '8px' }}><i className="ri-lightbulb-line"></i> Our Mission</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>To engineer custom digital solutions that streamline complex business processes and spark visual brand authority.</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '8px' }}><i className="ri-eye-line"></i> Our Vision</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>To become the premier trusted global development partner driven by clean code, client success, and modern technology.</p>
              </div>
            </div>
          </div>
          
          <div className="reveal slide-right delay-200">
            <div className="about-img-frame">
              <div className="about-img-box">
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <i className="ri-code-box-line" style={{ fontSize: '80px', color: 'var(--accent)', opacity: 0.8, marginBottom: '24px', display: 'inline-block' }}></i>
                  <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '12px' }}>Make it Simple</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Enterprise web, mobile, ERP, cloud and AI solutions with structured delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
         DELIVERY STRENGTHS SECTION
         ========================================== */}
      <section className="delivery-strengths">
        <div className="container">
          <div className="section-header reveal slide-up">
            <span className="section-tag">Delivery Strengths</span>
            <h2 className="section-title">Why Organizations Partner With Nexinfosoft</h2>
            <p className="section-desc">Our delivery model is built around predictable execution, clear reporting, focused resources, and secure releases.</p>
          </div>

          <div className="delivery-strengths-grid">
            <div className="delivery-strength-card reveal slide-up delay-100">
              <div className="delivery-strength-icon"><i className="ri-loop-left-line"></i></div>
              <h3>Agile Methodology</h3>
              <p>Sprint planning, backlog control, and stakeholder alignment.</p>
            </div>
            <div className="delivery-strength-card reveal slide-up delay-200">
              <div className="delivery-strength-icon"><i className="ri-calendar-check-line"></i></div>
              <h3>Sprint Based Delivery</h3>
              <p>Incremental releases to reduce risk and enable timely reviews.</p>
            </div>
            <div className="delivery-strength-card reveal slide-up delay-300">
              <div className="delivery-strength-icon"><i className="ri-team-line"></i></div>
              <h3>Dedicated Team</h3>
              <p>Focused engineering and QA resources for project scope.</p>
            </div>
            <div className="delivery-strength-card reveal slide-up delay-100">
              <div className="delivery-strength-icon"><i className="ri-bar-chart-grouped-line"></i></div>
              <h3>Regular Reporting</h3>
              <p>Weekly status, metrics, and action items for decision makers.</p>
            </div>
            <div className="delivery-strength-card reveal slide-up delay-200">
              <div className="delivery-strength-icon"><i className="ri-rocket-line"></i></div>
              <h3>Deployment Support</h3>
              <p>Environment setup, release checklists, and operations handover.</p>
            </div>
            <div className="delivery-strength-card reveal slide-up delay-300">
              <div className="delivery-strength-icon"><i className="ri-shield-check-line"></i></div>
              <h3>QA & Security Testing</h3>
              <p>Functional validation and security hardening per best practices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
         DEVELOPMENT LIFECYCLE SECTION
         ========================================== */}
      <section className="development-lifecycle">
        <div className="container">
          <div className="section-header reveal slide-up">
            <span className="section-tag">Development Process</span>
            <h2 class="section-title">Structured Project Lifecycle</h2>
            <p className="section-desc">A clear delivery path from discovery to post-deployment support, built for stakeholder visibility and controlled execution.</p>
          </div>

          <div className="lifecycle-grid">
            <div className="lifecycle-step reveal slide-up delay-100">
              <div className="lifecycle-number">1</div>
              <h3>Requirement Analysis</h3>
              <p>Stakeholder interviews, scope definition, and feasibility review.</p>
            </div>
            <div className="lifecycle-step reveal slide-up delay-200">
              <div className="lifecycle-number">2</div>
              <h3>BRD / SRS Documentation</h3>
              <p>Business requirements and functional specification preparation.</p>
            </div>
            <div className="lifecycle-step reveal slide-up delay-300">
              <div className="lifecycle-number">3</div>
              <h3>UI / UX Design</h3>
              <p>Wireframes, prototypes, and approval-ready interface designs.</p>
            </div>
            <div className="lifecycle-step reveal slide-up delay-100">
              <div className="lifecycle-number">4</div>
              <h3>Development</h3>
              <p>Sprint execution with demos, code reviews, and progress tracking.</p>
            </div>
            <div className="lifecycle-step reveal slide-up delay-200">
              <div className="lifecycle-number">5</div>
              <h3>Testing</h3>
              <p>QA cycles, defect management, and security validation.</p>
            </div>
            <div className="lifecycle-step reveal slide-up delay-300">
              <div className="lifecycle-number">6</div>
              <h3>Deployment</h3>
              <p>Release execution, monitoring setup, and stakeholder handover.</p>
            </div>
            <div className="lifecycle-step lifecycle-step-wide reveal slide-up delay-100">
              <div className="lifecycle-number">7</div>
              <h3>Support & Maintenance</h3>
              <p>Ongoing support, enhancements, and post-deployment assistance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
         QUALITY & TESTING SECTION
         ========================================== */}
      <section className="quality-testing">
        <div className="container quality-grid">
          <div className="quality-content reveal slide-left">
            <span className="section-tag">Quality & Testing</span>
            <h2 className="section-title">Verification And Assurance Framework</h2>
            <p className="section-desc">Every release is validated through structured testing practices designed to reduce risk, improve stability, and support confident stakeholder sign-off.</p>
          </div>

          <div className="quality-table-wrap reveal slide-right delay-200">
            <div className="quality-table">
              <div className="quality-table-head">
                <span>Test Type</span>
                <span>Purpose</span>
              </div>
              <div className="quality-table-row">
                <strong>Unit Testing</strong>
                <span>Validate core modules and reduce regression risk.</span>
              </div>
              <div className="quality-table-row">
                <strong>Load Testing</strong>
                <span>Assess concurrency, throughput, and stability under load.</span>
              </div>
              <div className="quality-table-row">
                <strong>Automation Testing</strong>
                <span>Repeatable suites for critical workflows and acceptance criteria.</span>
              </div>
              <div className="quality-table-row">
                <strong>Security Testing</strong>
                <span>Secure coding validation and vulnerability assessment.</span>
              </div>
              <div className="quality-table-row">
                <strong>UAT</strong>
                <span>User acceptance planning, defect triage, and release sign-off.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
         CORE VALUES SECTION
         ========================================== */}
      <section className="values" style={{ background: '#0c0a10', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-header reveal slide-up">
            <span className="section-tag">Our Culture</span>
            <h2 className="section-title">The Foundation Behind Every Line of Code</h2>
            <p className="section-desc">Our team operates on core professional principles to maintain flawless project timelines and robust system architectures.</p>
          </div>

          <div className="values-grid">
            <div className="glass-card value-card reveal slide-up delay-100">
              <div className="value-icon">
                <i className="ri-medal-line"></i>
              </div>
              <h3 style={{ fontSize: '18px', marginBottom: '12px' }}>Elite Quality</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>We write highly commented, structured, and modular source code matching global programming standards.</p>
            </div>

            <div className="glass-card value-card reveal slide-up delay-200">
              <div className="value-icon" style={{ color: 'var(--accent)', background: 'rgba(6,182,212,0.1)', borderColor: 'rgba(6,182,212,0.2)' }}>
                <i className="ri-shield-user-line"></i>
              </div>
              <h3 style={{ fontSize: '18px', marginBottom: '12px' }}>Absolute Integrity</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>100% intellectual property ownership, complete client confidentiality, and transparent developmental fees.</p>
            </div>

            <div className="glass-card value-card reveal slide-up delay-300">
              <div className="value-icon" style={{ color: 'var(--primary)', background: 'rgba(59,130,246,0.1)', borderColor: 'rgba(59,130,246,0.2)' }}>
                <i className="ri-customer-service-line"></i>
              </div>
              <h3 style={{ fontSize: '18px', marginBottom: '12px' }}>Customer Centricity</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Direct channels of communication with project leaders, scheduled weekly updates, and lifetime hosting setups.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
         STATS HIGHLIGHT (Observer count triggered in Home, static here as simple stats layout)
         ========================================== */}
      <section className="stats">
        <div className="container stats-grid reveal scale-up">
          <div className="stat-item">
            <div className="stat-num">100+</div>
            <div className="stat-label">Software Deliveries</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">50+</div>
            <div className="stat-label">International Clients</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">12/7</div>
            <div className="stat-label">Active Support Desk</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">100%</div>
            <div className="stat-label">Code Ownership</div>
          </div>
        </div>
      </section>

      {/* ==========================================
         FINAL CALL TO ACTION
         ========================================== */}
      <section className="final-cta">
        <div className="container reveal scale-up">
          <div className="cta-banner">
            <h2 className="section-title">Ready to Partner With Us?</h2>
            <p>Discuss your system architecture or application design wireframes with a senior systems analyst today.</p>
            <div className="hero-btns" style={{ justifyContent: 'center' }}>
              <Link to="/contact" className="btn btn-primary">Book Technical Consultation</Link>
              <Link to="/technology-stack" className="btn btn-secondary">Review Our Stack</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
