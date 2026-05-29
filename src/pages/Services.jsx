import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import servicesData from '../data/servicesData';

const Services = () => {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => el.classList.add('active'));
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* ==========================================
         PAGE HERO
         ========================================== */}
      <div className="page-hero services-list-hero">
        <div className="container reveal slide-up">
          <h1 className="page-hero-title">Our Services</h1>
          <p className="page-hero-desc">Everything we build to help your business look professional, work faster, attract leads, and grow with better digital systems.</p>
        </div>
      </div>

      <section className="services-index-section">
        <div className="container">
          <div className="section-header reveal slide-up">
            <span className="section-tag">View All</span>
            <h2 className="section-title">Choose the service your business needs</h2>
            <p className="section-desc">Each service page explains the business benefits, what we include, and how it supports your growth.</p>
          </div>

          <div className="services-index-grid">
            {servicesData.map((service) => (
              <Link 
                key={service.slug}
                to={`/service/${service.slug}`} 
                className="services-index-card reveal slide-up"
              >
                <i className={service.icon}></i>
                <h3>{service.title}</h3>
                <p>{service.subtitle}</p>
              </Link>
            ))}
          </div>

          <div className="service-benefits-strip reveal slide-up">
            <div><i className="ri-line-chart-line"></i><strong>More qualified leads</strong><span>Better pages and systems make enquiries easier.</span></div>
            <div><i className="ri-time-line"></i><strong>Less manual work</strong><span>Automated tools reduce repeated business tasks.</span></div>
            <div><i className="ri-shield-check-line"></i><strong>More trust</strong><span>Professional design improves customer confidence.</span></div>
            <div><i className="ri-bar-chart-box-line"></i><strong>Clearer reporting</strong><span>Dashboards help you understand performance.</span></div>
          </div>
        </div>
      </section>

      {/* ==========================================
         DETAILED SERVICES ROWS
         ========================================== */}
      <section className="services-detail-section">
        <div className="container">
          
          {/* Row 1: Web Development */}
          <div id="web-development" className="service-detail-row reveal slide-up">
            <div className="service-detail-img">
              <div style={{ textAlign: 'center', padding: '24px' }}>
                <i className="ri-global-line" style={{ fontSize: '72px', color: 'var(--primary)', opacity: 0.8, display: 'inline-block', marginBottom: '16px' }}></i>
                <h4 style={{ fontSize: '18px', fontWeight: 700 }}>Web Applications</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>Secure responsive platforms</p>
              </div>
            </div>
            <div className="service-detail-content">
              <span className="section-tag">Core Services</span>
              <h3>Web Development</h3>
              <p>
                Secure, responsive web platforms with performance optimization and governance-ready documentation. We build corporate websites, portals, dashboards, and custom web applications with scalable backend architecture.
              </p>
              <ul className="service-bullet-list">
                <li className="service-bullet-item"><i className="ri-checkbox-circle-line"></i> Responsive Website UI</li>
                <li className="service-bullet-item"><i className="ri-checkbox-circle-line"></i> Admin Dashboards</li>
                <li className="service-bullet-item"><i className="ri-checkbox-circle-line"></i> Performance Optimization</li>
                <li className="service-bullet-item"><i className="ri-checkbox-circle-line"></i> Secure Web Forms</li>
                <li className="service-bullet-item"><i className="ri-checkbox-circle-line"></i> SEO-ready Structure</li>
                <li className="service-bullet-item"><i className="ri-checkbox-circle-line"></i> Documentation Support</li>
              </ul>
            </div>
          </div>

          {/* Row 2: Mobile App Development */}
          <div id="mobile-app-development" className="service-detail-row reveal slide-up">
            <div className="service-detail-img">
              <div style={{ textAlign: 'center', padding: '24px' }}>
                <i className="ri-smartphone-line" style={{ fontSize: '72px', color: 'var(--accent)', opacity: 0.8, display: 'inline-block', marginBottom: '16px' }}></i>
                <h4 style={{ fontSize: '18px', fontWeight: 700 }}>Mobile Solutions</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>Business-grade applications</p>
              </div>
            </div>
            <div className="service-detail-content">
              <span className="section-tag">Core Services</span>
              <h3>Mobile App Development</h3>
              <p>
                Business-grade applications with role-based access and scalable backend integration. We create Android, iOS, and cross-platform mobile apps that support secure workflows and reliable user experiences.
              </p>
              <ul className="service-bullet-list">
                <li className="service-bullet-item"><i className="ri-checkbox-circle-line"></i> Android & iOS Apps</li>
                <li className="service-bullet-item"><i className="ri-checkbox-circle-line"></i> Role-based Access</li>
                <li className="service-bullet-item"><i className="ri-checkbox-circle-line"></i> API Integration</li>
                <li className="service-bullet-item"><i className="ri-checkbox-circle-line"></i> Push Notifications</li>
                <li className="service-bullet-item"><i className="ri-checkbox-circle-line"></i> Payment Flows</li>
                <li className="service-bullet-item"><i className="ri-checkbox-circle-line"></i> Store Publishing</li>
              </ul>
            </div>
          </div>

          {/* Row 3: ERP Solutions */}
          <div id="erp-solutions" className="service-detail-row reveal slide-up">
            <div className="service-detail-img">
              <div style={{ textAlign: 'center', padding: '24px' }}>
                <i className="ri-database-2-line" style={{ fontSize: '72px', color: 'var(--accent)', opacity: 0.8, display: 'inline-block', marginBottom: '16px' }}></i>
                <h4 style={{ fontSize: '18px', fontWeight: 700 }}>ERP Solutions</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>Audit-friendly controls</p>
              </div>
            </div>
            <div className="service-detail-content">
              <span className="section-tag">Core Services</span>
              <h3>ERP Solutions</h3>
              <p>
                Process automation for finance, HR, inventory, and operations with audit-friendly controls. Our ERP systems centralize workflows, approvals, reports, access permissions, and business-critical data.
              </p>
              <ul className="service-bullet-list">
                <li className="service-bullet-item"><i className="ri-checkbox-circle-line"></i> Finance Modules</li>
                <li className="service-bullet-item"><i className="ri-checkbox-circle-line"></i> HR Workflows</li>
                <li className="service-bullet-item"><i className="ri-checkbox-circle-line"></i> Inventory Tracking</li>
                <li className="service-bullet-item"><i className="ri-checkbox-circle-line"></i> Operations Reports</li>
                <li className="service-bullet-item"><i className="ri-checkbox-circle-line"></i> Approval Controls</li>
                <li className="service-bullet-item"><i className="ri-checkbox-circle-line"></i> Audit Logs</li>
              </ul>
            </div>
          </div>

          {/* Row 4: Custom Software */}
          <div id="software-development" className="service-detail-row reveal slide-up">
            <div className="service-detail-img">
              <div style={{ textAlign: 'center', padding: '24px' }}>
                <i className="ri-code-box-line" style={{ fontSize: '72px', color: 'var(--secondary)', opacity: 0.8, display: 'inline-block', marginBottom: '16px' }}></i>
                <h4 style={{ fontSize: '18px', fontWeight: 700 }}>Custom Software</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>Secure APIs & architecture</p>
              </div>
            </div>
            <div className="service-detail-content">
              <span className="section-tag">Core Services</span>
              <h3>Software Development</h3>
              <p>
                Custom enterprise software with secure APIs and maintainable architecture. We build tailored systems for internal operations, customer workflows, reporting, approvals, and secure business process automation.
              </p>
              <ul className="service-bullet-list">
                <li className="service-bullet-item"><i className="ri-checkbox-circle-line"></i> Secure API Design</li>
                <li className="service-bullet-item"><i className="ri-checkbox-circle-line"></i> CRM Platforms</li>
                <li className="service-bullet-item"><i className="ri-checkbox-circle-line"></i> Workflow Automation</li>
                <li className="service-bullet-item"><i className="ri-checkbox-circle-line"></i> Reporting Dashboards</li>
                <li className="service-bullet-item"><i className="ri-checkbox-circle-line"></i> Maintainable Codebase</li>
                <li className="service-bullet-item"><i className="ri-checkbox-circle-line"></i> Documentation Handover</li>
              </ul>
            </div>
          </div>

          {/* Row 5: Digital Marketing */}
          <div id="digital-marketing" className="service-detail-row reveal slide-up">
            <div className="service-detail-img">
              <div style={{ textAlign: 'center', padding: '24px' }}>
                <i className="ri-megaphone-line" style={{ fontSize: '72px', color: '#ec4899', opacity: 0.8, display: 'inline-block', marginBottom: '16px' }}></i>
                <h4 style={{ fontSize: '18px', fontWeight: 700 }}>Digital Marketing</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>Measurable brand growth</p>
              </div>
            </div>
            <div className="service-detail-content">
              <span className="section-tag">Core Services</span>
              <h3>Digital Marketing</h3>
              <p>
                SEO and performance marketing with measurable reporting aligned to brand guidelines. We support digital visibility, campaign tracking, lead generation, content planning, and conversion-focused execution.
              </p>
              <ul className="service-bullet-list">
                <li className="service-bullet-item"><i className="ri-checkbox-circle-line"></i> SEO Optimization</li>
                <li className="service-bullet-item"><i className="ri-checkbox-circle-line"></i> Performance Campaigns</li>
                <li className="service-bullet-item"><i className="ri-checkbox-circle-line"></i> Brand Guidelines</li>
                <li className="service-bullet-item"><i className="ri-checkbox-circle-line"></i> Lead Reporting</li>
                <li className="service-bullet-item"><i className="ri-checkbox-circle-line"></i> Content Strategy</li>
                <li className="service-bullet-item"><i className="ri-checkbox-circle-line"></i> Analytics Tracking</li>
              </ul>
            </div>
          </div>

          {/* Row 6: AI & Automation */}
          <div id="ai-automation" className="service-detail-row reveal slide-up">
            <div className="service-detail-img">
              <div style={{ textAlign: 'center', padding: '24px' }}>
                <i className="ri-brain-line" style={{ fontSize: '72px', color: '#f59e0b', opacity: 0.8, display: 'inline-block', marginBottom: '16px' }}></i>
                <h4 style={{ fontSize: '18px', fontWeight: 700 }}>AI & Automation</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>Analytics & efficiency workflows</p>
              </div>
            </div>
            <div className="service-detail-content">
              <span className="section-tag">Core Services</span>
              <h3>AI & Automation</h3>
              <p>
                Practical AI/ML and workflow automation for analytics and operational efficiency. We help teams automate repetitive workflows, build intelligent reporting, and connect cloud systems with secure integrations.
              </p>
              <ul className="service-bullet-list">
                <li className="service-bullet-item"><i className="ri-checkbox-circle-line"></i> Workflow Automation</li>
                <li className="service-bullet-item"><i className="ri-checkbox-circle-line"></i> AI/ML Prototypes</li>
                <li className="service-bullet-item"><i className="ri-checkbox-circle-line"></i> Data Analytics</li>
                <li className="service-bullet-item"><i className="ri-checkbox-circle-line"></i> Cloud Integration</li>
                <li className="service-bullet-item"><i className="ri-checkbox-circle-line"></i> QA Validation</li>
                <li className="service-bullet-item"><i className="ri-checkbox-circle-line"></i> Operational Efficiency</li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* ==========================================
         FINAL CALL TO ACTION
         ========================================== */}
      <section className="final-cta">
        <div className="container reveal scale-up">
          <div className="cta-banner">
            <h2 className="section-title">Ready to Kickstart Your Project?</h2>
            <p>Discuss your operational blueprints and requirements with our engineering team for a free structural quote.</p>
            <div className="hero-btns" style={{ justifyContent: 'center' }}>
              <Link to="/contact" className="btn btn-primary"><span>Book Consultation Session</span></Link>
              <Link to="/portfolio" className="btn btn-secondary"><span>Review Recent Works</span></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
