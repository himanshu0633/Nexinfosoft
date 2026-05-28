import React from 'react';

const Industries = () => {
  return (
    <section className="industries">
      <div className="container">
        <div className="section-header reveal slide-up active">
          <span className="section-tag">Our Verticals</span>
          <h2 className="section-title">Custom Ecosystems Built For Core Industries</h2>
          <p className="section-desc">We build purpose-driven architectures tailored for operational requirements across sectors.</p>
        </div>

        <div className="industries-grid">
          <div className="industry-card reveal slide-up delay-100 active"><i className="ri-heart-pulse-line industry-icon"></i><h4 className="industry-title">Healthcare</h4></div>
          <div className="industry-card reveal slide-up delay-200 active"><i className="ri-home-4-line industry-icon"></i><h4 className="industry-title">Real Estate</h4></div>
          <div className="industry-card reveal slide-up delay-300 active"><i className="ri-book-open-line industry-icon"></i><h4 className="industry-title">Education</h4></div>
          <div className="industry-card reveal slide-up delay-400 active"><i className="ri-shopping-cart-2-line industry-icon"></i><h4 className="industry-title">E-commerce</h4></div>
          <div className="industry-card reveal slide-up delay-100 active"><i className="ri-restaurant-2-line industry-icon"></i><h4 className="industry-title">Restaurants</h4></div>
          <div className="industry-card reveal slide-up delay-200 active"><i className="ri-bank-line industry-icon"></i><h4 className="industry-title">Finance</h4></div>
          <div className="industry-card reveal slide-up delay-300 active"><i className="ri-government-line industry-icon"></i><h4 className="industry-title">Government</h4></div>
          <div className="industry-card reveal slide-up delay-400 active"><i className="ri-tools-line industry-icon"></i><h4 className="industry-title">Manufacturing</h4></div>
        </div>
      </div>
    </section>
  );
};

export default Industries;
