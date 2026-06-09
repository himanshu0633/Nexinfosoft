import React, { useState, useEffect } from 'react';
import Hero from '../components/home/Hero';

import CoreServices from '../components/home/CoreServices';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Technologies from '../components/home/Technologies';
import Industries from '../components/home/Industries';
import Process from '../components/home/Process';
import PortfolioPreview from '../components/home/PortfolioPreview';
import { CustomDynamicSection } from '../components/DynamicPageSections';

const Home = () => {
  const [sections, setSections] = useState([]);
  
  // Fallback defaults in case database is loading/disconnected
  const defaultHomeSections = [
    { _id: 'hero', visible: true, order: 0 },
    { _id: 'services', visible: true, order: 1 },
    { _id: 'whychooseus', visible: true, order: 2 },
    { _id: 'technologies', visible: true, order: 3 },
    { _id: 'industries', visible: true, order: 4 },
    { _id: 'process', visible: true, order: 5 },
    { _id: 'portfoliopreview', visible: true, order: 6 }
  ];

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await fetch('/api/content?page=home');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setSections(data);
            return;
          }
        }
        setSections(defaultHomeSections);
      } catch (err) {
        setSections(defaultHomeSections);
      }
    };

    fetchSections();

    // Scroll reveal fallback
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => el.classList.add('active'));
    window.scrollTo(0, 0);
  }, []);

  const componentsMap = {
    hero: Hero,

    services: CoreServices,
    whychooseus: WhyChooseUs,
    technologies: Technologies,
    industries: Industries,
    process: Process,
    portfoliopreview: PortfolioPreview
  };

  // Filter out non-visible sections, sort by order
  const activeSections = sections
    .filter(sec => sec.visible !== false)
    .filter(sec => sec._id !== 'stats')
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <>
      {activeSections.map((section) => {
        const Component = componentsMap[section._id];
        if (Component) {
          return <Component key={section._id} />;
        } else {
          return <CustomDynamicSection key={section._id} data={section} />;
        }
      })}
    </>
  );
};

export default Home;
