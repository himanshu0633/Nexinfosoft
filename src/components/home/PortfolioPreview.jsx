import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const PortfolioPreview = () => {
  const portfolioScrollerRef = useRef(null);

  const [projects, setProjects] = useState([
    {
      name: 'Clinic Management System',
      category: 'healthcare',
      tag: 'E-Commerce Platform',
      title: 'Clinic Management System',
      desc: 'High-conversion checkout, secure payment gateways, modular shopping cart, and automatic inventory synchronizations.',
      image_url: '/assets/images/ecommerce_mockup.png'
    },
    {
      name: 'ERP System',
      category: 'erp',
      tag: 'ERP System',
      title: 'Operations & Resource Management ERP',
      desc: 'Centralized enterprise workflows for resource scheduling, production tracking, costing audits, and team approvals.',
      image_url: '/assets/images/erp_mockup.png'
    },
    {
      name: 'Real Estate Platform',
      category: 'real-estate',
      tag: 'CRM Console',
      title: 'Sales Automation CRM Platform',
      desc: 'Automated lead tracking, customer pipelines, unified communications, and interactive support ticketing desks.',
      image_url: '/assets/images/crm_mockup.png'
    }
  ]);

  useEffect(() => {
    const fetchDynamicProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        if (res.ok) {
          const dbProjects = await res.json();
          if (dbProjects && dbProjects.length > 0) {
            const mapped = dbProjects.map(proj => ({
              ...proj,
              tag: proj.tag || proj.category.toUpperCase(),
              title: proj.name,
              desc: proj.desc,
              image_url: proj.image_url || '/assets/images/analytics_mockup.png'
            }));
            setProjects(mapped);
          }
        }
      } catch (err) {
        // Fallback active
      }
    };

    fetchDynamicProjects();
  }, []);

  const visibleProjects = projects.slice(0, 3);
  const hasMoreProjects = projects.length > 3;

  const scrollPortfolio = (direction) => {
    const scroller = portfolioScrollerRef.current;
    const firstItem = scroller?.querySelector('.portfolio-glass-card');
    if (!scroller || !firstItem) return;

    const gap = parseFloat(window.getComputedStyle(scroller).gap) || 0;
    const cardWidth = firstItem.getBoundingClientRect().width + gap;
    const maxScroll = scroller.scrollWidth - scroller.clientWidth;
    const nextLeft = direction === 'next'
      ? Math.min(scroller.scrollLeft + cardWidth, maxScroll)
      : Math.max(scroller.scrollLeft - cardWidth, 0);

    scroller.scrollTo({ left: nextLeft, behavior: 'smooth' });
  };

  return (
    <section className="services-portfolio-sec home-recent-solutions-sec">
      <div className="container">
        <div className="section-header-premium reveal slide-up active">
          <span className="section-tag-premium text-center">RECENT SOLUTIONS</span>
          <h2 className="section-title-premium text-center">
            Explore Our Recent Success Stories
          </h2>
        </div>

        <div className="recent-solutions-controls" aria-label="Recent solutions slider controls">
          <button type="button" className="recent-solutions-arrow" aria-label="Previous project" onClick={() => scrollPortfolio('prev')}>
            <i className="ri-arrow-left-s-line"></i>
          </button>
          <button type="button" className="recent-solutions-arrow" aria-label="Next project" onClick={() => scrollPortfolio('next')}>
            <i className="ri-arrow-right-s-line"></i>
          </button>
        </div>

        <div ref={portfolioScrollerRef} className="portfolio-showcase-grid">
          {visibleProjects.map((project, index) => {
            const bgClasses = ['background-clinic', 'background-erp-mock', 'background-re', 'background-ecom', 'background-mobile-mock'];
            const bgClass = bgClasses[index % bgClasses.length];
            const projectName = project.name || project.title;
            const projectCategory = project.tag || (project.category ? project.category.toUpperCase() : 'PROJECT');
            return (
              <div key={project._id || projectName || index} className="portfolio-glass-card reveal slide-up active">
                <div className={`portfolio-mockup-screen ${bgClass}`}>
                  <div className="window-decor-dots"><span></span><span></span><span></span></div>
                  {project.image_url ? (
                    <img src={project.image_url} alt={projectName} className="portfolio-screenshot-img" loading="lazy" />
                  ) : (
                    <div className="portfolio-mockup-placeholder" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.01)', color: 'var(--text-muted)' }}>
                      <i className={`${project.icon || 'ri-briefcase-4-line'} style-24`} style={{ fontSize: '48px' }}></i>
                    </div>
                  )}
                </div>
                <div className="portfolio-card-desc">
                  <span className="proj-cat-pill">{projectCategory}</span>
                  <h3>{projectName}</h3>
                  <p>{project.desc}</p>
                  <Link to="/portfolio" className="btn-view-project">
                    <span>View Project</span>
                    <i className="ri-arrow-right-line"></i>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {hasMoreProjects && (
          <div className="services-portfolio-view-more reveal slide-up active">
            <Link to="/portfolio" className="btn btn-primary">
              <span>View More</span>
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioPreview;
