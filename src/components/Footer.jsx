import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link to="/" className="logo">
            <img src="/assets/nex-infotech-logo.png" alt="Nexinfosoft IT Solutions" className="logo-img" />
          </Link>
          <p className="footer-desc">
            Nexinfosoft is a certified software development agency committed to engineering highly responsive websites, apps, ERP integrations, and CRM software ecosystems.
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
            <li><Link to="/service/custom-web-development" className="footer-link">Web Development</Link></li>
            <li><Link to="/service/mobile-applications" className="footer-link">Mobile Applications</Link></li>
            <li><Link to="/service/erp-development" className="footer-link">ERP Systems</Link></li>
            <li><Link to="/service/custom-crm-development" className="footer-link">CRM Software</Link></li>
            <li><Link to="/service/branding-graphic-design" className="footer-link">UI/UX Design</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-title">Links</h4>
          <ul className="footer-links">
            <li><Link to="/about" className="footer-link">About Us</Link></li>
            <li><Link to="/portfolio" className="footer-link">Client Projects</Link></li>
            <li><Link to="/services" className="footer-link">Detailed Services</Link></li>
            <li><Link to="/technology-stack" className="footer-link">Technology Stack</Link></li>
            <li><Link to="/contact" className="footer-link">Get in Touch</Link></li>
            <li><Link to="/privacy-policy" className="footer-link">Privacy Policy</Link></li>
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
          <Link to="/terms-conditions">Terms & Conditions</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
