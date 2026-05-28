import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Portfolio = () => {
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => el.classList.add('active'));
    window.scrollTo(0, 0);
  }, []);

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

    const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -8;
    const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
    cardEl.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  };

  const handleCardMouseLeave = (cardEl) => {
    if (!cardEl) return;
    cardEl.style.transform = '';
  };

  const projects = [
    {
      id: 1,
      category: 'web',
      type: 'Web Portal',
      tech: 'React',
      title: 'Real Estate Platform',
      desc: 'High speed property catalog, interactive spatial mapping layouts, and instant agent WhatsApp channels integration.',
      bg: 'linear-gradient(135deg, rgba(6,182,212,0.6) 0%, rgba(37,99,235,0.8) 100%)',
      icon: 'ri-global-line'
    },
    {
      id: 2,
      category: 'erp',
      type: 'ERP System',
      tech: 'NodeJS',
      title: 'Clinic Management System',
      desc: 'Cloud patient registration dashboard, doctor scheduler calendar, automated digital invoices, and secure records storage.',
      bg: 'linear-gradient(135deg, rgba(124,58,237,0.6) 0%, rgba(236,72,153,0.8) 100%)',
      icon: 'ri-database-line'
    },
    {
      id: 3,
      category: 'apps',
      type: 'Mobile App',
      tech: 'React Native',
      title: 'Hyperlocal Delivery App',
      desc: 'High performance live GPS driver location tracking application, integrated secure payments, and notifications pushes.',
      bg: 'linear-gradient(135deg, rgba(59,130,246,0.6) 0%, rgba(6,182,212,0.8) 100%)',
      icon: 'ri-smartphone-line'
    },
    {
      id: 4,
      category: 'web',
      type: 'E-commerce',
      tech: 'Next.js',
      title: 'B2B E-commerce Website',
      desc: 'Dynamic multi-vendor wholesale marketplace with unified payment gateway checkout processing and real-time shipping APIs.',
      bg: 'linear-gradient(135deg, rgba(236,72,153,0.6) 0%, rgba(124,58,237,0.8) 100%)',
      icon: 'ri-shopping-bag-3-line'
    },
    {
      id: 5,
      category: 'erp',
      type: 'CRM System',
      tech: 'MongoDB',
      title: 'Sales Lead CRM Dashboard',
      desc: 'Sales pipelines automation CRM, central customer log sheets, automated lead task triggers, and conversion rate visualizations.',
      bg: 'linear-gradient(135deg, rgba(16,185,129,0.6) 0%, rgba(59,130,246,0.8) 100%)',
      icon: 'ri-dashboard-3-line'
    },
    {
      id: 6,
      category: 'apps',
      type: 'Mobile App',
      tech: 'Flutter App',
      title: 'Restaurant Table Booking App',
      desc: 'High performance restaurant pre-booking application with live visual interactive seat maps layouts, and POS billing sync.',
      bg: 'linear-gradient(135deg, rgba(245,158,11,0.6) 0%, rgba(236,72,153,0.8) 100%)',
      icon: 'ri-calendar-todo-line'
    }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <>
      <div className="page-hero">
        <div className="container reveal slide-up">
          <h1 className="page-hero-title">Selected Case Studies & Deployments</h1>
          <p className="page-hero-desc">Explore custom systems currently driving automation, increasing conversion, and scaling client operations worldwide.</p>
        </div>
      </div>

      <section className="portfolio-page-section">
        <div className="container">
          {/* Category Filters */}
          <div className="portfolio-filters reveal slide-up">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => handleFilterClick('all')}
            >
              All Systems
            </button>
            <button 
              className={`filter-btn ${filter === 'web' ? 'active' : ''}`}
              onClick={() => handleFilterClick('web')}
            >
              Web Portals
            </button>
            <button 
              className={`filter-btn ${filter === 'apps' ? 'active' : ''}`}
              onClick={() => handleFilterClick('apps')}
            >
              Mobile Apps
            </button>
            <button 
              className={`filter-btn ${filter === 'erp' ? 'active' : ''}`}
              onClick={() => handleFilterClick('erp')}
            >
              ERP & CRM
            </button>
          </div>

          {/* Portfolio Cards Grid */}
          <div className="portfolio-grid">
            {filteredProjects.map((project) => {
              let cardRef = null;
              return (
                <div 
                  key={project.id}
                  ref={el => cardRef = el}
                  className="portfolio-card reveal slide-up active"
                  style={{ animation: 'scalePulse 0.4s ease forwards' }}
                  onMouseMove={(e) => handleCardMouseMove(e, cardRef)}
                  onMouseLeave={() => handleCardMouseLeave(cardRef)}
                >
                  <div 
                    className="portfolio-img-box" 
                    style={{ backgroundImage: project.bg }}
                  >
                    <div className="portfolio-img-overlay"></div>
                    <i className={project.icon} style={{ position: 'absolute', top: '40%', left: '45%', transform: 'translate(-50%, -50%)', fontSize: '56px', opacity: 0.15, color: '#fff' }}></i>
                  </div>
                  <div className="portfolio-content">
                    <div className="portfolio-tags">
                      <span className="portfolio-tag">{project.type}</span>
                      <span className="portfolio-tag">{project.tech}</span>
                    </div>
                    <h4 className="portfolio-title">{project.title}</h4>
                    <p className="portfolio-desc">{project.desc}</p>
                    <Link to="/contact" className="portfolio-btn">
                      <span>Get Free Architecture Quote</span> <i className="ri-arrow-right-line"></i>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Portfolio;
