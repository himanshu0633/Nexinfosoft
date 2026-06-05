import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [footerData, setFooterData] = useState({
    description: 'Nexinfosoft is a certified software development agency committed to engineering highly responsive websites, apps, ERP integrations, and CRM software ecosystems.',
    metadata: {
      services: [
        { label: 'Web Development', url: '/service/custom-web-development' },
        { label: 'Mobile Applications', url: '/service/mobile-applications' },
        { label: 'ERP Systems', url: '/service/erp-development' },
        { label: 'CRM Software', url: '/service/custom-crm-development' },
        { label: 'UI/UX Design', url: '/service/branding-graphic-design' }
      ],
      links: [
        { label: 'About Us', url: '/about' },
        { label: 'Client Projects', url: '/portfolio' },
        { label: 'Detailed Services', url: '/services' },
        { label: 'Technology Stack', url: '/technology-stack' },
        { label: 'Get in Touch', url: '/contact' },
        { label: 'Privacy Policy', url: '/privacy-policy' }
      ],
      bottomLinks: [
        { label: 'Terms & Conditions', url: '/terms-conditions' },
        { label: 'Privacy Policy', url: '/privacy-policy' }
      ]
    }
  });

  useEffect(() => {
    const applyFooterData = (data) => {
      setFooterData(prev => ({ ...prev, ...data, metadata: { ...prev.metadata, ...(data.metadata || {}) } }));
    };

    const fetchFooterLinks = async () => {
      try {
        const res = await fetch(`/api/content/footer_links?t=${Date.now()}`, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          applyFooterData(data);
        }
      } catch (err) {
        // Static footer fallback remains available.
      }
    };

    const handleFooterUpdate = (event) => {
      if (event.detail) {
        applyFooterData(event.detail);
      } else {
        fetchFooterLinks();
      }
    };

    const handleVisibilityRefresh = () => {
      if (document.visibilityState === 'visible') {
        fetchFooterLinks();
      }
    };

    fetchFooterLinks();

    window.addEventListener('footer-links-updated', handleFooterUpdate);
    window.addEventListener('focus', fetchFooterLinks);
    document.addEventListener('visibilitychange', handleVisibilityRefresh);

    return () => {
      window.removeEventListener('footer-links-updated', handleFooterUpdate);
      window.removeEventListener('focus', fetchFooterLinks);
      document.removeEventListener('visibilitychange', handleVisibilityRefresh);
    };
  }, []);

  const renderFooterLink = (link) => (
    <li key={`${link.label}-${link.url}`}>
      <Link to={link.url || '/'} className="footer-link">{link.label}</Link>
    </li>
  );

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link to="/" className="logo">
            <img src="/assets/nex-infotech-logo.png" alt="Nexinfosoft IT Solutions" className="logo-img" />
          </Link>
          <p className="footer-desc">
            {footerData.description}
          </p>
          <div className="social-links">
            <a href="#" className="social-link" aria-label="Facebook"><i className="ri-facebook-fill"></i></a>
            <a href="#" className="social-link" aria-label="Twitter"><i className="ri-twitter-x-fill"></i></a>
            <a href="#" className="social-link" aria-label="LinkedIn"><i className="ri-linkedin-fill"></i></a>
            <a href="#" className="social-link" aria-label="Instagram"><i className="ri-instagram-line"></i></a>
          </div>
        </div>

        <div>
          <h4 className="footer-title">Services</h4>
          <ul className="footer-links">
            {(footerData.metadata?.services || []).map(renderFooterLink)}
          </ul>
        </div>

        <div>
          <h4 className="footer-title">Links</h4>
          <ul className="footer-links">
            {(footerData.metadata?.links || []).map(renderFooterLink)}
          </ul>
        </div>

        <div>
          <h4 className="footer-title">Contact</h4>
          <ul className="contact-info-list">
            <li className="contact-info-item">
              <i className="ri-map-pin-line"></i>
              <span>Nexinfosoft IT Solutions</span>
            </li>
            <li className="contact-info-item">
              <i className="ri-mail-line"></i>
              <span>info@nexinfosoft.com</span>
            </li>
            <li className="contact-info-item">
              <i className="ri-phone-line"></i>
              <span>+91 99995 30797</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <div>
          &copy; {currentYear} Nexinfosoft. All rights reserved.
        </div>
        <div className="footer-bottom-links">
          {(footerData.metadata?.bottomLinks || []).map(link => (
            <Link to={link.url || '/'} key={`${link.label}-${link.url}`}>{link.label}</Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
