import React, { useEffect } from 'react';
import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import CoreServices from '../components/home/CoreServices';
import WhyChooseUs from '../components/home/WhyChooseUs';
import CoreCapabilities from '../components/home/CoreCapabilities';
import Technologies from '../components/home/Technologies';
import Industries from '../components/home/Industries';
import Process from '../components/home/Process';
import PortfolioPreview from '../components/home/PortfolioPreview';

const Home = () => {
  useEffect(() => {
    // Scroll reveal fallback
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => el.classList.add('active'));
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Hero />
      <CoreServices />
      <WhyChooseUs />
      <Technologies />
      <Industries />
      <Process />
      <PortfolioPreview />
    </>
  );
};

export default Home;
