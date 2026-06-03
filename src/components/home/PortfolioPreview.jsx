import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const PortfolioPreview = ({ previewData = null }) => {
  const portfolioScrollerRef = useRef(null);
  
  const [data, setData] = useState({
    title: 'Digital Products Built For Real Operations',
    subtitle: 'Recent Work',
    description: 'A quick look at specialized software categories our team designs, builds, and maintains.'
  });

  const [projects, setProjects] = useState([
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
  ]);

  useEffect(() => {
    if (previewData) {
      setData(previewData);
      return;
    }

    const fetchHeaders = async () => {
      try {
        const res = await fetch('/api/content/portfoliopreview');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (e) {}
    };

    fetchHeaders();
  }, [previewData]);

  useEffect(() => {
    const fetchDynamicProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        if (res.ok) {
          const dbProjects = await res.json();
          if (dbProjects && dbProjects.length > 0) {
            const mapped = dbProjects.map(proj => ({
              tag: proj.tag || proj.category.toUpperCase(),
              title: proj.name,
              desc: proj.desc,
              img: proj.image_url || '/assets/images/analytics_mockup.png'
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
        const firstItem = scroller.querySelector('.portfolio-card');
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

  const visibleProjects = projects.slice(0, 2);
  const hasMoreProjects = projects.length > 2;

  return (
    <section className="portfolio">
      <div className="container">
        <div className="section-header reveal slide-up active">
          <span className="section-tag">{data.subtitle || 'Recent Work'}</span>
          <h2 className="section-title">{data.title}</h2>
          <p className="section-desc">{data.description}</p>
        </div>

        <div ref={portfolioScrollerRef} className="portfolio-grid">
          {visibleProjects.map((project, idx) => (
            <div 
              key={idx} 
              className={`portfolio-card reveal slide-up delay-${(idx + 1) * 100} active`}
            >
              <div className="portfolio-img-box" style={{ background: 'rgba(255,255,255,0.01)' }}>
                <img src={project.img} alt={project.title} loading="lazy" style={{ objectFit: 'cover' }} />
              </div>
              <div className="portfolio-content">
                <span className="portfolio-tag">{project.tag}</span>
                <h3 className="portfolio-title">{project.title}</h3>
                <p className="portfolio-desc">{project.desc}</p>
              </div>
            </div>
          ))}
          {hasMoreProjects && (
            <div className="portfolio-view-more-card reveal slide-up active">
              <Link to="/portfolio" className="btn btn-secondary portfolio-view-more-btn">
                View More
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          )}
        </div>

        {hasMoreProjects && (
          <div className="portfolio-view-more-mobile">
            <Link to="/portfolio" className="btn btn-secondary portfolio-view-more-btn">
              View More
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioPreview;
