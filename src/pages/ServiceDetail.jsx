import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import servicesData from '../data/servicesData';

const ServiceDetail = () => {
  const { slug } = useParams();
  
  // Find matching service
  const service = servicesData.find(item => item.slug === slug);

  useEffect(() => {
    if (service) {
      document.title = `${service.title} | Nexinfosoft`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', service.subtitle);
      }
    }

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => el.classList.add('active'));
    window.scrollTo(0, 0);
  }, [service, slug]);

  if (!service) {
    // If not found, redirect to services overview
    return <Navigate to="/services" replace />;
  }

  return (
    <>
      <div className="page-hero service-single-hero">
        <div className="container reveal slide-up">
          <span className="section-tag">Service</span>
          <h1 className="page-hero-title">{service.title}</h1>
          <p className="page-hero-desc">{service.subtitle}</p>
        </div>
      </div>

      <section className="service-single-section">
        <div className="container service-single-grid">
          <div className="elegant-card service-single-main reveal slide-left">
            <div className="service-single-icon">
              <i className={service.icon}></i>
            </div>
            <h2 className="section-title">How this helps your business</h2>
            <p className="section-desc">{service.intro}</p>
            
            <div className="benefit-grid">
              {service.benefits.map((benefit, index) => (
                <div key={index} className="benefit-card">
                  <i className="ri-check-line"></i>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="elegant-card service-single-side reveal slide-right delay-200">
            <h3>What we include</h3>
            <ul className="elegant-list">
              {service.deliverables.map((item, index) => (
                <li key={index}>
                  <i className="ri-checkbox-circle-line"></i>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/free-consultation" className="btn btn-primary service-cta-btn">
              <span>Get Free Guidance</span>
              <i className="ri-arrow-right-line"></i>
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
};

export default ServiceDetail;
