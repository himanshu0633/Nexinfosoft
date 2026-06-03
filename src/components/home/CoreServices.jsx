import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { normalizeVisibleServices } from '../../utils/services';

const CoreServices = ({ previewData = null }) => {
  const serviceScrollerRef = useRef(null);
  const [data, setData] = useState({
    title: 'Everything Your Business Needs To Build,',
    subtitle: 'Scale & Automate',
    description: 'From web applications to AI automation, we deliver secure and scalable digital solutions that help businesses grow faster and operate smarter.',
    metadata: {
      badge: 'Core Services',
      capabilityStack: {
        kicker: 'Digital Capability Stack',
        title: 'Enterprise delivery console for modern product teams',
        description: 'End-to-end planning, design, development, cloud deployment, QA, security and optimization under one reliable delivery system.'
      }
    }
  });

  const [services, setServices] = useState([
    {
      title: 'Web Applications',
      description: 'Scalable web apps for modern teams.',
      count: '20+ Projects Delivered',
      icon: 'ri-global-line',
      to: '/service/custom-web-development',
      size: 'compact'
    },
    {
      title: 'Mobile Solutions',
      description: 'Native and cross-platform mobile apps.',
      count: '18+ Apps Launched',
      icon: 'ri-smartphone-line',
      to: '/service/mobile-applications',
      size: 'compact'
    },
    {
      title: 'ERP Development',
      description: 'Custom ERP systems for operations.',
      count: '15+ Enterprise Systems',
      icon: 'ri-database-2-line',
      to: '/service/erp-development',
      size: 'compact'
    },
    {
      title: 'Cloud Integration',
      description: 'Cloud-ready scalable infrastructure.',
      count: '10+ Deployments',
      icon: 'ri-cloud-line',
      to: '/service/custom-web-development',
      size: 'compact'
    },
    {
      title: 'API Development',
      description: 'Secure APIs and integrations.',
      count: '30+ Integrations',
      icon: 'ri-node-tree',
      to: '/service/custom-web-development',
      size: 'compact'
    },
    {
      title: 'UI/UX Design',
      description: 'Clean interfaces users understand.',
      count: '25+ Interfaces',
      icon: 'ri-pencil-ruler-2-line',
      to: '/service/branding-graphic-design',
      size: 'compact'
    },
    {
      title: 'AI Solutions',
      description: 'Automation and practical intelligence.',
      count: '12+ Automations Built',
      icon: 'ri-brain-line',
      to: '/service/custom-web-development',
      size: 'compact'
    },
    {
      title: 'DevOps Support',
      description: 'CI/CD, deployment and monitoring.',
      count: '16+ Pipelines',
      icon: 'ri-infinity-line',
      to: '/service/custom-web-development',
      size: 'compact'
    }
  ]);

  useEffect(() => {
    if (previewData) {
      setData(previewData);
      return;
    }

    const fetchServicesContent = async () => {
      try {
        const res = await fetch('/api/content/services');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        // Fallback is already handled by default state
      }
    };

    const fetchServicesList = async () => {
      try {
        const res = await fetch('/api/services');
        if (res.ok) {
          const json = await res.json();
          if (json && json.length > 0) {
            const mapped = json
              .filter(item => item.slug !== 'recruitment-services')
              .map(item => ({
                slug: item.slug,
                title: item.title,
                description: item.subtitle || item.intro,
                count: 'Active Service',
                icon: item.icon || 'ri-window-line',
                to: `/service/${item.slug}`,
                size: 'compact'
              }));
            setServices(normalizeVisibleServices(mapped));
          }
        }
      } catch (err) {
        // Fallback is already default state
      }
    };

    fetchServicesContent();
    fetchServicesList();
  }, [previewData]);

  useEffect(() => {
    const scroller = serviceScrollerRef.current;
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    let frameId;
    let lastTime = 0;
    let resumeTimer;

    const stopAutoScroll = () => {
      cancelAnimationFrame(frameId);
      clearTimeout(resumeTimer);
    };

    const startAutoScroll = () => {
      stopAutoScroll();

      const step = (time) => {
        if (!mobileQuery.matches || !scroller) return;

        if (time - lastTime > 24) {
          const maxScroll = scroller.scrollWidth - scroller.clientWidth;
          scroller.scrollLeft = scroller.scrollLeft >= maxScroll - 2 ? 0 : scroller.scrollLeft + 0.7;
          lastTime = time;
        }

        frameId = requestAnimationFrame(step);
      };

      frameId = requestAnimationFrame(step);
    };

    const pauseThenResume = () => {
      stopAutoScroll();
      resumeTimer = setTimeout(startAutoScroll, 2200);
    };

    const pauseAutoScroll = () => stopAutoScroll();
    const resumeAutoScroll = () => startAutoScroll();

    if (scroller && mobileQuery.matches) {
      startAutoScroll();
      scroller.addEventListener('touchstart', pauseThenResume, { passive: true });
      scroller.addEventListener('mouseenter', pauseAutoScroll);
      scroller.addEventListener('focusin', pauseAutoScroll);
      scroller.addEventListener('mouseleave', resumeAutoScroll);
      scroller.addEventListener('focusout', resumeAutoScroll);
    }

    mobileQuery.addEventListener('change', startAutoScroll);

    return () => {
      stopAutoScroll();
      mobileQuery.removeEventListener('change', startAutoScroll);
      if (scroller) {
        scroller.removeEventListener('touchstart', pauseThenResume);
        scroller.removeEventListener('mouseenter', pauseAutoScroll);
        scroller.removeEventListener('focusin', pauseAutoScroll);
        scroller.removeEventListener('mouseleave', resumeAutoScroll);
        scroller.removeEventListener('focusout', resumeAutoScroll);
      }
    };
  }, []);

  return (
    <section id="services" className="core-services-premium">
      <div className="core-services-bg" aria-hidden="true">
        <span className="core-glow core-glow-one"></span>
        <span className="core-glow core-glow-two"></span>
        <span className="core-particle core-particle-one"></span>
        <span className="core-particle core-particle-two"></span>
        <span className="core-particle core-particle-three"></span>
        <span className="core-particle core-particle-four"></span>
        <span className="core-particle core-particle-five"></span>
      </div>

      <div className="container">
        <div className="section-header core-services-header reveal slide-up active">
          <span className="section-tag core-services-badge">CORE SERVICES</span>
          <h2 className="section-title core-services-title">
            {data.title}
            <span>{data.subtitle}</span>
          </h2>
          <p className="section-desc core-services-desc">
            {data.description}
          </p>
        </div>

        <div className="core-services-layout">
          <div ref={serviceScrollerRef} className="core-service-grid">
            {services.map((service, index) => (
              <Link
                to={service.to}
                className={`core-service-card core-service-card-${service.size} reveal slide-up active`}
                style={{ '--delay': `${index * 45}ms` }}
                key={service.title}
              >
                <span className="core-icon" aria-hidden="true"><i className={service.icon}></i></span>
                <span className="core-service-count">{service.count}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <span className="core-service-link">
                  Learn More <i className="ri-arrow-right-line"></i>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreServices;
