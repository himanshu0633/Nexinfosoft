import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import servicesData from '../data/servicesData';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [techMenuOpen, setTechMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close menus on page navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setMegaMenuOpen(false);
    setTechMenuOpen(false);
  }, [location]);

  // Handle scroll events for blur progress and sticky styling
  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.querySelector('.hero, .page-hero');
      const heroHeight = heroEl ? heroEl.offsetHeight : 420;
      const scrollProgress = Math.min(Math.max(window.scrollY / Math.max(heroHeight * 0.55, 1), 0), 1);
      
      const headerEl = document.querySelector('.header');
      if (headerEl) {
        headerEl.style.setProperty('--nav-blur-progress', scrollProgress.toFixed(3));
      }

      if (window.scrollY > 12) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger initial call in case user loads page scrolled down

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMouseEnter = () => {
    if (window.innerWidth > 1180) {
      setMegaMenuOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 1180) {
      setMegaMenuOpen(false);
    }
  };

  const handleTechMouseEnter = () => {
    if (window.innerWidth > 1180) {
      setTechMenuOpen(true);
    }
  };

  const handleTechMouseLeave = () => {
    if (window.innerWidth > 1180) {
      setTechMenuOpen(false);
    }
  };

  const handleServicesClick = (e) => {
    if (window.innerWidth <= 1180) {
      e.preventDefault();
      setMegaMenuOpen(!megaMenuOpen);
    }
  };

  const handleTechClick = (e) => {
    if (window.innerWidth <= 1180) {
      e.preventDefault();
      setTechMenuOpen(!techMenuOpen);
    }
  };

  // Determine if a service subpage route is active
  const isServicesActive = location.pathname.startsWith('/service/') || location.pathname === '/services';

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="logo">
          <img src="/assets/nex-infotech-logo.png" alt="Nexinfosoft IT Solutions" className="logo-img" />
        </Link>
        
        <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              About
            </NavLink>
          </li>
          
          {/* Services Mega Menu Item */}
          <li 
            className={`nav-item has-mega-menu ${megaMenuOpen ? 'mega-open' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleMouseEnter}
            onBlur={handleMouseLeave}
          >
            <Link 
              to="/services" 
              className={`nav-link ${isServicesActive ? 'active' : ''}`}
              onClick={handleServicesClick}
            >
              Services <i className="ri-arrow-down-s-line" style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '2px', fontSize: '12px', transform: megaMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }}></i>
            </Link>
            <div className="services-mega-menu">
              <div className="mega-menu-head">
                <div>
                  <h3>Our Services</h3>
                  <p>Everything we build for your business</p>
                </div>
                <Link to="/services" className="mega-view-all">View all <i className="ri-arrow-right-s-line"></i></Link>
              </div>
              <div className="mega-services-grid">
                {servicesData.map((service) => (
                  <Link 
                    key={service.slug}
                    to={`/service/${service.slug}`} 
                    className="mega-service-link"
                  >
                    <span></span>
                    {service.title}
                  </Link>
                ))}
              </div>
              <div className="mega-menu-foot">
                <span></span>
                <p>Not sure which service you need?</p>
                <Link to="/contact">Get in touch <i className="ri-arrow-right-line"></i></Link>
              </div>
            </div>
          </li>

          {/* Tech Stack Mega Menu Item */}
          <li 
            className={`nav-item has-mega-menu ${techMenuOpen ? 'mega-open' : ''}`}
            onMouseEnter={handleTechMouseEnter}
            onMouseLeave={handleTechMouseLeave}
            onFocus={handleTechMouseEnter}
            onBlur={handleTechMouseLeave}
          >
            <Link 
              to="/technology-stack" 
              className={`nav-link ${location.pathname === '/technology-stack' ? 'active' : ''}`}
              onClick={handleTechClick}
            >
              Tech Stack <i className="ri-arrow-down-s-line" style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '2px', fontSize: '12px', transform: techMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }}></i>
            </Link>
            <div className="services-mega-menu">
              <div className="mega-menu-head">
                <div>
                  <h3>Technology Stack</h3>
                  <p>Our tools &amp; frameworks catalog</p>
                </div>
                <Link to="/technology-stack" className="mega-view-all">View all <i className="ri-arrow-right-s-line"></i></Link>
              </div>
              <div className="mega-services-grid">
                <Link to="/technology-stack?tab=frontend" className="mega-service-link">
                  <span></span>
                  Frontend Tech
                </Link>
                <Link to="/technology-stack?tab=backend" className="mega-service-link">
                  <span></span>
                  Backend Tech
                </Link>
                <Link to="/technology-stack?tab=mobile" className="mega-service-link">
                  <span></span>
                  Mobile Solutions
                </Link>
                <Link to="/technology-stack?tab=database" className="mega-service-link">
                  <span></span>
                  Database Systems
                </Link>
                <Link to="/technology-stack?tab=cloud" className="mega-service-link">
                  <span></span>
                  Cloud &amp; DevOps
                </Link>
                <Link to="/technology-stack?tab=ai" className="mega-service-link">
                  <span></span>
                  AI &amp; Analytics
                </Link>
              </div>
              <div className="mega-menu-foot">
                <span></span>
                <p>Need custom architecture consultation?</p>
                <Link to="/contact">Discuss stack <i className="ri-arrow-right-line"></i></Link>
              </div>
            </div>
          </li>
          <li className="nav-item">
            <NavLink to="/portfolio" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Portfolio
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Contact
            </NavLink>
          </li>
          {/* Mobile-Only Direct Call Trigger */}
          <li className="nav-item nav-mobile-only" style={{ width: '100%', marginTop: '16px' }}>
            <a href="tel:+919999530797" className="btn btn-primary nav-btn" style={{ width: '100%', justifyContent: 'center', boxSizing: 'border-box' }}>
              <i className="ri-phone-fill" style={{ marginRight: '6px' }}></i> Call Now
            </a>
          </li>
        </ul>

        <div className="nav-actions">
          <Link to="/contact" className="btn btn-primary nav-btn">
            <span>Get Started</span>
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>

        <button 
          onClick={toggleMobileMenu} 
          className={`hamburger ${mobileMenuOpen ? 'active' : ''}`} 
          aria-label="Toggle Menu"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
