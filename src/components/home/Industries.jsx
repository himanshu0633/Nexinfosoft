import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Industries = () => {
  const industriesScrollerRef = useRef(null);
  const industries = [
    { title: 'Healthcare', icon: 'ri-heart-pulse-line' },
    { title: 'Real Estate', icon: 'ri-home-4-line' },
    { title: 'Education', icon: 'ri-book-open-line' },
    { title: 'E-commerce', icon: 'ri-shopping-cart-2-line' },
    { title: 'Restaurants', icon: 'ri-restaurant-2-line' },
    { title: 'Finance', icon: 'ri-bank-line' },
    { title: 'Government', icon: 'ri-government-line' },
    { title: 'Manufacturing', icon: 'ri-tools-line' }
  ];

  const visibleIndustries = industries.slice(0, 4);

  useEffect(() => {
    const scroller = industriesScrollerRef.current;
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
        const firstItem = scroller.querySelector('.industry-card');
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

    startAutoScroll();

    if (scroller) {
      scroller.addEventListener('touchstart', pauseThenResume, { passive: true });
    }

    mobileQuery.addEventListener('change', startAutoScroll);

    return () => {
      stopAutoScroll();
      mobileQuery.removeEventListener('change', startAutoScroll);
      if (scroller) {
        scroller.removeEventListener('touchstart', pauseThenResume);
      }
    };
  }, []);

  return (
    <section className="industries">
      <div className="container">
        <div className="section-header reveal slide-up active">
          <span className="section-tag">Our Verticals</span>
          <h2 className="section-title">Custom Ecosystems Built For Core Industries</h2>
          <p className="section-desc">We build purpose-driven architectures tailored for operational requirements across sectors.</p>
        </div>

        <div className="industries-carousel-block">
          <div ref={industriesScrollerRef} className="industries-grid">
            {visibleIndustries.map((industry, index) => (
              <div key={industry.title} className={`industry-card reveal slide-up delay-${(index + 1) * 100} active`}>
                <i className={`${industry.icon} industry-icon`}></i>
                <h4 className="industry-title">{industry.title}</h4>
              </div>
            ))}
          </div>
          <div className="industries-view-more-row reveal slide-up active">
            <Link to="/portfolio" className="btn btn-secondary industries-view-more-btn">
              View More
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Industries;
