import React from 'react';
import { Link } from 'react-router-dom';

const FinalCTA = () => {
  return (
    <section className="final-cta">
      <div className="container reveal scale-up active">
        <div className="cta-banner">
          <h2 className="section-title">Ready To Build Your Next Digital Product?</h2>
          <p>Align with a product engineering team that can plan, design, build, launch, and scale your next SaaS, ERP, CRM, mobile app, or AI automation platform.</p>
          <div className="hero-btns" style={{ justifyContent: 'center' }}>
            <Link to="/contact" className="btn btn-primary"><span>Book Consultation</span></Link>
            <Link to="/services" className="btn btn-secondary"><span>View Services</span></Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
