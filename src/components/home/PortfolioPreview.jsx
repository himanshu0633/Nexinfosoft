import React from 'react';

const PortfolioPreview = () => {
  return (
    <section className="portfolio">
      <div className="container">
        <div className="section-header reveal slide-up active">
          <span className="section-tag">Recent Work</span>
          <h2 className="section-title">Digital Products Built For Real Operations</h2>
          <p className="section-desc">A quick look at software categories our team supports across web, mobile, ERP, and cloud.</p>
        </div>

        <div className="portfolio-grid">
          <div className="portfolio-card reveal slide-up delay-100 active">
            <div className="portfolio-img"><i className="ri-dashboard-3-line"></i></div>
            <div className="portfolio-content">
              <span className="portfolio-tag">ERP Platform</span>
              <h3 className="portfolio-title">Operations Management Dashboard</h3>
              <p className="portfolio-desc">Centralized workflows for inventory, reporting, approvals, and team access.</p>
            </div>
          </div>
          <div className="portfolio-card reveal slide-up delay-200 active">
            <div className="portfolio-img"><i className="ri-smartphone-line"></i></div>
            <div className="portfolio-content">
              <span className="portfolio-tag">Mobile App</span>
              <h3 className="portfolio-title">Retail Customer Application</h3>
              <p className="portfolio-desc">Role-based mobile app with APIs, notifications, and payment-ready flows.</p>
            </div>
          </div>
          <div className="portfolio-card reveal slide-up delay-300 active">
            <div className="portfolio-img"><i className="ri-global-line"></i></div>
            <div className="portfolio-content">
              <span className="portfolio-tag">Web Portal</span>
              <h3 className="portfolio-title">Secure Client Service Portal</h3>
              <p className="portfolio-desc">Responsive web portal with dashboards, documentation, and secure forms.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioPreview;
