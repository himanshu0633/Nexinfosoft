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

  useEffect(() => {
    const scroller = portfolioScrollerRef.current;
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
        const firstItem = scroller.querySelector('.portfolio-glass-card');
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
  }, [projects]);

  const visibleProjects = projects.slice(0, 3);
  const hasMoreProjects = projects.length > 3;

  return (
    <section className="services-portfolio-sec home-recent-solutions-sec">
      <div className="container">
        <div className="section-header-premium reveal slide-up active">
          <span className="section-tag-premium text-center">RECENT SOLUTIONS</span>
          <h2 className="section-title-premium text-center">
            Explore Our Recent Success Stories
          </h2>
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
