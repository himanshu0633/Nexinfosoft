import React from 'react';

const PortfolioPreview = () => {
  const projects = [
    {
      tag: 'E-Commerce Platform',
      title: 'Multi-Vendor Marketplace Storefront',
      desc: 'High-conversion checkout, secure payment gateways, modular shopping cart, and automatic inventory synchronizations.',
      img: '/assets/images/ecommerce_mockup.png'
    },
    {
      tag: 'ERP System',
      title: 'Operations & Resource Management ERP',
      desc: 'Centralized enterprise workflows for resource scheduling, production tracking, costing audits, and team approvals.',
      img: '/assets/images/erp_mockup.png'
    },
    {
      tag: 'CRM Console',
      title: 'Sales Automation CRM Platform',
      desc: 'Automated lead tracking, customer pipelines, unified communications, and interactive support ticketing desks.',
      img: '/assets/images/crm_mockup.png'
    },
    {
      tag: 'Mobile App',
      title: 'B2C Retail Customer Application',
      desc: 'High-performance iOS & Android mobile apps featuring push alerts, offline storage, and secure biometric authentication.',
      img: '/assets/images/mobile_mockup.png'
    },
    {
      tag: 'Web Portal',
      title: 'Secure B2B Client Service Portal',
      desc: 'Glassmorphic client reporting dashboard with documentation repositories and highly secure multi-tenant form flows.',
      img: '/assets/images/portal_mockup.png'
    },
    {
      tag: 'AI & Analytics',
      title: 'Intelligent BI Reporting Dashboard',
      desc: 'Real-time database visualization, automated report generation, and predictive business intelligence widgets.',
      img: '/assets/images/analytics_mockup.png'
    }
  ];

  return (
    <section className="portfolio">
      <div className="container">
        <div className="section-header reveal slide-up active">
          <span className="section-tag">Recent Work</span>
          <h2 className="section-title">Digital Products Built For Real Operations</h2>
          <p className="section-desc">A quick look at specialized software categories our team designs, builds, and maintains.</p>
        </div>

        <div className="portfolio-grid">
          {projects.map((project, idx) => (
            <div 
              key={idx} 
              className={`portfolio-card reveal slide-up delay-${(idx + 1) * 100} active`}
            >
              <div className="portfolio-img-box">
                <img src={project.img} alt={project.title} loading="lazy" />
              </div>
              <div className="portfolio-content">
                <span className="portfolio-tag">{project.tag}</span>
                <h3 className="portfolio-title">{project.title}</h3>
                <p className="portfolio-desc">{project.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioPreview;
