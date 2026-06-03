import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// Custom high-performance Animated Counter triggered when element enters the viewport
const AnimatedCounter = ({ value, duration = 1500 }) => {
  const [count, setCount] = useState('0');
  const ref = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    const match = value.toString().match(/^(\d+)(.*)$/);
    if (!match) {
      setCount(value);
      return;
    }
    const target = parseInt(match[1], 10);
    const suffix = match[2];

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          let currentStep = 0;
          const totalSteps = 40;
          const stepTime = duration / totalSteps;

          const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / totalSteps;
            const currentVal = Math.round(target * progress);
            if (currentStep >= totalSteps) {
              setCount(`${target}${suffix}`);
              clearInterval(timer);
            } else {
              setCount(`${currentVal}${suffix}`);
            }
          }, stepTime);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [value, duration]);

  return <span ref={ref}>{count}</span>;
};

const About = () => {
  const heroStageRef = useRef(null);
  const partnerStageRef = useRef(null);
  const qaDashboardRef = useRef(null);
  const rocketRef = useRef(null);
  const deliveryStrengthsScrollerRef = useRef(null);
  const lifecycleScrollerRef = useRef(null);

  const cardStyles = [
    { borderClass: '', bg: 'rgba(20, 184, 166, 0.1)', color: 'var(--accent)' },
    { borderClass: 'border-purple', bg: 'rgba(139, 92, 246, 0.1)', color: 'var(--secondary)' },
    { borderClass: 'border-blue', bg: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)' },
    { borderClass: 'border-green', bg: 'rgba(143, 184, 74, 0.1)', color: '#8fba4a' },
    { borderClass: 'border-yellow', bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' },
    { borderClass: 'border-pink', bg: 'rgba(236, 72, 153, 0.1)', color: '#ec4899' }
  ];

  const valueStyles = [
    { glowClass: '', bg: 'rgba(20, 184, 166, 0.1)', color: 'var(--accent)' },
    { glowClass: 'glowing-purple', bg: 'rgba(139, 92, 246, 0.1)', color: 'var(--secondary)' },
    { glowClass: 'glowing-blue', bg: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)' }
  ];

  // Dynamic states with fallback defaults
  const [hero, setHero] = useState({
    title: 'Empowering Businesses Through Technology',
    subtitle: 'ABOUT NEXINFOSOFT',
    description: 'We build enterprise-grade software architectures, premium web systems, and custom workflow automations designed to scale operations and unlock new market values.'
  });

  const [overview, setOverview] = useState({
    title: 'A Modern Technological Solutions Agency Built on Predictability',
    subtitle: 'COMPANY OVERVIEW',
    description: 'Nexinfosoft IT Solutions provides enterprise-grade technology services for organizations that require clear documentation, structured execution, and measurable outcomes. We support business and government teams with custom software development, mobile application deployment, ERP solutions, and digital transformation. Our approach merges agile developmental practices with rigorous quality assurance checks, ensuring your business platforms scale smoothly across critical performance spikes.',
    metadata: {
      stats: [
        { label: 'Years Experience', value: '10+' },
        { label: 'Projects Completed', value: '300+' },
        { label: 'Happy Clients', value: '250+' },
        { label: 'Experts In-house', value: '50+' }
      ]
    }
  });

  const [partner, setPartner] = useState({
    title: 'A Unified Platform Built For Scaling Technology Assets',
    subtitle: 'SOFTWARE DEVELOPMENT PARTNER',
    description: 'We design and program customized digital ecosystems that streamline core business processes. Over the years, we have emerged as a trusted technology engineering partner.',
    metadata: {
      checklist: ['Web Apps', 'Mobile Apps', 'ERP Systems', 'Cloud Solutions', 'AI Automation']
    }
  });

  const [why, setWhy] = useState({
    title: 'Why Organizations Partner With Nexinfosoft',
    subtitle: 'DELIVERY STRENGTHS',
    description: 'Our delivery framework prioritizes structural predictability, complete security pipelines, and direct transparency.',
    metadata: {
      cards: [
        { title: 'Agile Methodology', text: 'Continuous progress tracking, bi-weekly milestone evaluations, and flexible feature adjustments.', icon: 'ri-loop-left-line' },
        { title: 'Sprint Delivery', text: 'Predictable deliverables every sprint, enabling complete validation and incremental product growth.', icon: 'ri-calendar-check-line' },
        { title: 'Dedicated Team', text: 'Dedicated full-stack software engineers, QA technicians, and scrum leads assigned exclusively to your target scope.', icon: 'ri-team-line' },
        { title: 'Deployment Support', text: 'Production infrastructure provisioning, CI/CD pipeline automation, and post-deployment handover documents.', icon: 'ri-rocket-line' },
        { title: 'QA & Testing', text: 'Comprehensive unit, integration, and security checks covering every code deployment prior to delivery.', icon: 'ri-shield-check-line' },
        { title: 'Reporting & Metrics', text: 'Weekly project updates, active velocity tracking reports, and total budget burn transparency dashboards.', icon: 'ri-bar-chart-grouped-line' }
      ]
    }
  });

  const [lifecycle, setLifecycle] = useState({
    title: 'Structured Project Lifecycle',
    subtitle: 'DEVELOPMENT PROCESS',
    description: 'Our structured path maps out product design and system engineering milestones to maximize predictability.',
    metadata: {
      steps: [
        { number: '1', title: 'Discovery', text: 'Stakeholder interviews, requirements extraction, and scope alignment.', icon: 'ri-search-line' },
        { number: '2', title: 'Planning', text: 'Architectural drafting, technology selections, and SRS documentation.', icon: 'ri-file-list-3-line' },
        { number: '3', title: 'UI/UX', text: 'Interactive wireframes, layout patterns, and brand designs.', icon: 'ri-palette-line' },
        { number: '4', title: 'Development', text: 'Modular agile coding cycles, peer code audits, and sprint review demos.', icon: 'ri-code-box-line' },
        { number: '5', title: 'Testing', text: 'Comprehensive functional verification, load tests, and security hardening.', icon: 'ri-shield-flash-line' },
        { number: '6', title: 'Deployment', text: 'Automated server setup, CI/CD pipeline pushes, and system run logs.', icon: 'ri-ship-line' },
        { number: '7', title: 'Support', text: 'System monitoring, standard upgrades, and post-delivery SLA desk.', icon: 'ri-customer-service-2-line' }
      ]
    }
  });

  const [qa, setQa] = useState({
    title: 'Verification And Quality Assurance Framework',
    subtitle: 'QUALITY CONTROL',
    description: 'Every software build undergoes rigorous, automated and manual checks to ensure complete system performance and absolute security.',
    metadata: {
      cards: [
        { title: 'Unit Testing', text: 'Validation of separate micro-modules to eliminate regression vulnerabilities.', icon: 'ri-checkbox-circle-line' },
        { title: 'Integration Testing', text: 'Validation of system pipelines, API nodes, and database connections.', icon: 'ri-checkbox-circle-line' },
        { title: 'Security Testing', text: 'Continuous secure code scans, threat checks, and vulnerability resolution.', icon: 'ri-checkbox-circle-line' },
        { title: 'Performance Testing', text: 'Stress evaluations under simulated client traffic peaks to optimize latency.', icon: 'ri-checkbox-circle-line' },
        { title: 'UAT (User Acceptance)', text: 'Collaborative beta rounds, client review sessions, and system sign-off.', icon: 'ri-checkbox-circle-line' }
      ]
    }
  });

  const [valuesSec, setValuesSec] = useState({
    title: 'The Foundation Behind Every Line of Code',
    subtitle: 'OUR VALUES',
    description: 'Our decisions and structural engineering plans are driven by professional principles to ensure client success.',
    metadata: {
      cards: [
        { title: 'Integrity', text: 'We commit to absolute intellectual property ownership, detailed contracts, and complete developmental transparency.', icon: 'ri-shield-keyhole-line' },
        { title: 'Innovation', text: 'We consistently inject modern tools, cloud structures, and AI workflows to maximize product shelf life.', icon: 'ri-lightbulb-line' },
        { title: 'Customer Success', text: 'Direct communication paths with scrum managers, weekly status presentations, and standard operations handover checklists.', icon: 'ri-user-heart-line' }
      ]
    }
  });

  const [ctaSec, setCtaSec] = useState({
    title: 'Let\'s Build Something Amazing Together',
    description: 'Discuss your technical layout, database design, or core system flow with a senior solutions architect today.'
  });

  // Parallax Tilt Effects
  const handleMouseMove = (event, element, intensity = 8) => {
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -intensity;
    const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * intensity;
    
    element.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    element.style.setProperty('--my', `${event.clientY - rect.top}px`);
    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (element) => {
    if (!element) return;
    element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  useEffect(() => {
    // Scroll reveal fallback
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => el.classList.add('active'));
    window.scrollTo(0, 0);

    // Fetch About Page content from backend Mongoose DB
    const fetchAboutData = async () => {
      const ids = ['about_hero', 'about_overview', 'about_partner', 'about_why', 'about_lifecycle', 'about_qa', 'about_values', 'about_cta'];
      try {
        const entries = await Promise.all(ids.map(async (id) => {
          const res = await fetch(`/api/content/${id}`);
          if (!res.ok) return null;
          const data = await res.json();
          return [id, data];
        }));
        const dataMap = Object.fromEntries(entries.filter(Boolean));
        if (dataMap.about_hero) setHero(dataMap.about_hero);
        if (dataMap.about_overview) setOverview(dataMap.about_overview);
        if (dataMap.about_partner) setPartner(dataMap.about_partner);
        if (dataMap.about_why) setWhy(dataMap.about_why);
        if (dataMap.about_lifecycle) setLifecycle(dataMap.about_lifecycle);
        if (dataMap.about_qa) setQa(dataMap.about_qa);
        if (dataMap.about_values) setValuesSec(dataMap.about_values);
        if (dataMap.about_cta) setCtaSec(dataMap.about_cta);
      } catch (err) {
        // Fallbacks are already configured in state
      }
    };
    fetchAboutData();
  }, []);

  useEffect(() => {
    const scroller = deliveryStrengthsScrollerRef.current;
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
        const firstItem = scroller.querySelector('.why-premium-card');
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

    const pauseAutoScroll = () => stopAutoScroll();
    const resumeAutoScroll = () => startAutoScroll();

    startAutoScroll();

    if (scroller) {
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

  useEffect(() => {
    const scroller = lifecycleScrollerRef.current;
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
        const firstItem = scroller.querySelector('.timeline-node-card');
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

    const pauseAutoScroll = () => stopAutoScroll();
    const resumeAutoScroll = () => startAutoScroll();

    startAutoScroll();

    if (scroller) {
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
    <div className="about-page-wrapper">
      {/* ==========================================================================
         SECTION 1: HERO SECTION
         ========================================================================== */}
      <section className="about-hero-sec">
        <div className="container">
          <div className="about-hero-grid">
            <div className="about-hero-left reveal slide-left">
              <span className="section-tag-premium">{hero.subtitle}</span>
              <h1 className="hero-title-premium">{hero.title}</h1>
              <p className="hero-desc-premium">{hero.description}</p>
              <div className="hero-cta-btns">
                <Link to="/services" className="btn btn-secondary">
                  <span>View Services</span>
                </Link>
              </div>
            </div>

            <div className="about-hero-right reveal slide-right delay-200">
              <div 
                ref={heroStageRef}
                className="illustration-stage-premium"
                onMouseMove={(e) => handleMouseMove(e, heroStageRef.current, 6)}
                onMouseLeave={() => handleMouseLeave(heroStageRef.current)}
              >
                {/* Glow effects */}
                <div className="mesh-glow mesh-glow-one"></div>
                <div className="mesh-glow mesh-glow-two"></div>
                <div className="animated-radial-circle"></div>

                {/* Team Illustration Mockup */}
                <div className="team-mockup-frame">
                  <div className="team-illustration-graphics">
                    {/* Visual abstract representation of professional group working */}
                    <div className="circle-avatar avatar-lead">
                      <div className="avatar-dot"></div>
                      <i className="ri-team-fill"></i>
                    </div>
                    <div className="circle-avatar avatar-eng">
                      <i className="ri-code-s-slash-line"></i>
                    </div>
                    <div className="circle-avatar avatar-qa">
                      <i className="ri-shield-check-line"></i>
                    </div>
                    <div className="circle-avatar avatar-ui">
                      <i className="ri-palette-line"></i>
                    </div>
                    <div className="connection-vector-lines">
                      <svg width="100%" height="100%" viewBox="0 0 300 200" fill="none">
                        <path d="M 60 120 L 150 70 L 240 130" stroke="rgba(20, 184, 166, 0.25)" strokeWidth="2" strokeDasharray="5 5" />
                        <path d="M 150 70 L 150 160" stroke="rgba(139, 92, 246, 0.25)" strokeWidth="2" strokeDasharray="3 3" />
                        <circle cx="60" cy="120" r="4" fill="var(--accent)" />
                        <circle cx="150" cy="70" r="5" fill="var(--primary)" />
                        <circle cx="240" cy="130" r="4" fill="var(--secondary)" />
                        <circle cx="150" cy="160" r="4" fill="#8fba4a" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Floating statistics badges */}
                <div className="floating-hero-badge badge-projects">
                  <div className="badge-icon-wrap" style={{ background: 'rgba(20, 184, 166, 0.15)', color: 'var(--accent)' }}>
                    <i className="ri-briefcase-line"></i>
                  </div>
                  <div>
                    <strong>300+</strong>
                    <span>Projects Finished</span>
                  </div>
                </div>

                <div className="floating-hero-badge badge-experience">
                  <div className="badge-icon-wrap" style={{ background: 'rgba(139, 92, 246, 0.15)', color: 'var(--secondary)' }}>
                    <i className="ri-time-line"></i>
                  </div>
                  <div>
                    <strong>10+ Yrs</strong>
                    <span>Tech Expertise</span>
                  </div>
                </div>

                {/* Floating Tech Icons Orbiting */}
                <div className="orbiting-tech-icon icon-react">
                  <i className="ri-reactjs-line"></i>
                </div>
                <div className="orbiting-tech-icon icon-node">
                  <i className="ri-nodejs-line"></i>
                </div>
                <div className="orbiting-tech-icon icon-cloud">
                  <i className="ri-cloud-line"></i>
                </div>
                <div className="orbiting-tech-icon icon-db">
                  <i className="ri-database-2-line"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 2: COMPANY OVERVIEW
         ========================================================================== */}
      <section className="about-overview-sec">
        <div className="container">
          <div className="about-overview-grid">
            <div className="about-overview-left reveal slide-left">
              <span className="section-tag-premium">{overview.subtitle}</span>
              <h2 className="section-title-premium">{overview.title}</h2>
              <p className="overview-desc-premium">{overview.description}</p>
            </div>

            <div className="about-overview-right reveal slide-right delay-200">
              <div className="stats-glass-grid">
                {(overview.metadata?.stats || []).map((stat, idx) => {
                  const colors = [
                    { border: '', bg: 'rgba(20, 184, 166, 0.12)', text: 'var(--accent)', icon: 'ri-calendar-todo-line' },
                    { border: 'accent-purple', bg: 'rgba(139, 92, 246, 0.12)', text: 'var(--secondary)', icon: 'ri-code-box-line' },
                    { border: 'accent-blue', bg: 'rgba(59, 130, 246, 0.12)', text: 'var(--primary)', icon: 'ri-user-smile-line' },
                    { border: 'accent-green', bg: 'rgba(143, 184, 74, 0.12)', text: '#8fba4a', icon: 'ri-team-line' }
                  ];
                  const style = colors[idx % colors.length] || colors[0];
                  return (
                    <div className="glass-stat-card" key={idx}>
                      <div className={`card-top-accent ${style.border}`}></div>
                      <div className="stat-icon-wrapper" style={{ background: style.bg, color: style.text }}>
                        <i className={style.icon}></i>
                      </div>
                      <h3>
                        <AnimatedCounter value={stat.value} />
                      </h3>
                      <p>{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 3: SOFTWARE DEVELOPMENT PARTNER
         ========================================================================== */}
      <section className="about-partner-sec">
        <div className="container">
          <div className="about-partner-grid">
            <div className="about-partner-left reveal slide-left">
              <span className="section-tag-premium">{partner.subtitle}</span>
              <h2 className="section-title-premium">{partner.title}</h2>
              <p className="partner-desc-premium">{partner.description}</p>
              
              <div className="checklist-features-grid">
                {(partner.metadata?.checklist || []).map((item) => (
                  <div className="feature-item-pill" key={item}>
                    <i className="ri-checkbox-circle-fill"></i>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="about-partner-right reveal slide-right delay-200">
              <div 
                ref={partnerStageRef}
                className="premium-dashboard-mockup-wrapper"
                onMouseMove={(e) => handleMouseMove(e, partnerStageRef.current, 5)}
                onMouseLeave={() => handleMouseLeave(partnerStageRef.current)}
              >
                {/* Backdrop lighting */}
                <div className="dashboard-light light-cyan"></div>
                <div className="dashboard-light light-magenta"></div>

                {/* Dashboard Frame */}
                <div className="dashboard-glass-console">
                  <div className="console-header">
                    <div className="header-window-buttons">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div className="console-title">Nexinfosoft Control Console</div>
                    <div className="console-status-pulse">
                      <span className="pulse-circle"></span>
                      <span>Active</span>
                    </div>
                  </div>

                  <div className="console-body">
                    <div className="console-sidebar">
                      <div className="sidebar-avatar">N</div>
                      <div className="sidebar-nav-items">
                        <span className="active"><i className="ri-dashboard-3-line"></i></span>
                        <span><i className="ri-git-branch-line"></i></span>
                        <span><i className="ri-server-line"></i></span>
                        <span><i className="ri-shield-check-line"></i></span>
                      </div>
                    </div>

                    <div className="console-main-panel">
                      <div className="kpi-mini-cards">
                        <div className="kpi-mini-card">
                          <span>Build Time</span>
                          <strong>42.1s</strong>
                        </div>
                        <div className="kpi-mini-card">
                          <span>Deploy Rate</span>
                          <strong>99.8%</strong>
                        </div>
                      </div>

                      <div className="mock-waveforms">
                        <svg viewBox="0 0 280 80" width="100%" height="100%">
                          <defs>
                            <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="rgba(20, 184, 166, 0.4)" />
                              <stop offset="100%" stopColor="rgba(20, 184, 166, 0)" />
                            </linearGradient>
                          </defs>
                          <path d="M 0 65 Q 35 15, 70 45 T 140 20 T 210 55 T 280 15 L 280 80 L 0 80 Z" fill="url(#waveGradient)" />
                          <path d="M 0 65 Q 35 15, 70 45 T 140 20 T 210 55 T 280 15" stroke="var(--accent)" strokeWidth="2.5" fill="none" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Orbiting Glass Service Cards */}
                <div className="orbiting-glass-badge badge-web">
                  <div className="badge-glow-border"></div>
                  <i className="ri-global-line"></i>
                  <span>Web Apps</span>
                </div>

                <div className="orbiting-glass-badge badge-mobile">
                  <div className="badge-glow-border"></div>
                  <i className="ri-smartphone-line"></i>
                  <span>Mobile Apps</span>
                </div>

                <div className="orbiting-glass-badge badge-erp">
                  <div className="badge-glow-border"></div>
                  <i className="ri-database-2-line"></i>
                  <span>ERP Systems</span>
                </div>

                <div className="orbiting-glass-badge badge-cloud">
                  <div className="badge-glow-border"></div>
                  <i className="ri-cloud-line"></i>
                  <span>Cloud Solutions</span>
                </div>

                <div className="orbiting-glass-badge badge-ai">
                  <div className="badge-glow-border"></div>
                  <i className="ri-brain-line"></i>
                  <span>AI Automation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 4: WHY ORGANIZATIONS PARTNER WITH NEXINFOSOFT
         ========================================================================== */}
      <section className="about-why-sec">
        <div className="container">
          <div className="section-header-premium reveal slide-up">
            <span className="section-tag-premium">{why.subtitle}</span>
            <h2 className="section-title-premium text-center">
              {why.title}
            </h2>
            <p className="section-desc-premium text-center">
              {why.description}
            </p>
          </div>

          <div ref={deliveryStrengthsScrollerRef} className="why-premium-grid">
            {(why.metadata?.cards || []).map((card, idx) => {
              const style = cardStyles[idx % cardStyles.length];
              return (
                <div key={idx} className={`why-premium-card reveal slide-up delay-${((idx % 3) + 1) * 100}`}>
                  <div className={`card-hover-border ${style.borderClass}`}></div>
                  <div className="why-icon-wrap" style={{ background: style.bg, color: style.color }}>
                    <i className={card.icon || 'ri-checkbox-circle-line'}></i>
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 5: INTERACTIVE PROJECT LIFECYCLE
         ========================================================================== */}
      <section className="about-lifecycle-sec">
        <div className="container">
          <div className="section-header-premium reveal slide-up">
            <span className="section-tag-premium">{lifecycle.subtitle}</span>
            <h2 className="section-title-premium text-center">
              {lifecycle.title}
            </h2>
            <p className="section-desc-premium text-center">
              {lifecycle.description}
            </p>
          </div>

          <div className="timeline-horizontal-wrapper reveal slide-up delay-200">
            <div className="timeline-progress-line-container">
              <div className="timeline-progress-line-active"></div>
            </div>

            <div ref={lifecycleScrollerRef} className="timeline-nodes-horizontal">
              {(lifecycle.metadata?.steps || []).map((step, idx) => (
                <div className="timeline-node-card" key={idx}>
                  <div className="node-icon-circle">
                    <i className={step.icon || 'ri-checkbox-circle-line'}></i>
                    <span className="node-step-number">{step.number}</span>
                  </div>
                  <h4>{step.title}</h4>
                  <p>{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 6: VERIFICATION & QUALITY ASSURANCE
         ========================================================================== */}
      <section className="about-qa-sec">
        <div className="container">
          <div className="about-qa-grid">
            <div className="qa-left-content reveal slide-left">
              <span className="section-tag-premium">{qa.subtitle}</span>
              <h2 className="section-title-premium">
                {qa.title}
              </h2>
              <p className="qa-desc-premium">
                {qa.description}
              </p>

              <div className="qa-frosted-cards">
                {(qa.metadata?.cards || []).map((card, idx) => (
                  <div className="qa-frosted-card" key={idx}>
                    <i className={`${card.icon || 'ri-checkbox-circle-line'} card-check-green`}></i>
                    <div>
                      <h4>{card.title}</h4>
                      <p>{card.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="qa-right-dashboard reveal slide-right delay-200">
              <div 
                ref={qaDashboardRef}
                className="qa-dashboard-stage"
                onMouseMove={(e) => handleMouseMove(e, qaDashboardRef.current, 4)}
                onMouseLeave={() => handleMouseLeave(qaDashboardRef.current)}
              >
                <div className="qa-dashboard-lighting"></div>

                <div className="qa-dashboard-body">
                  <div className="qa-dashboard-head">
                    <span><i className="ri-line-chart-line"></i> QA Validation Console</span>
                    <span className="qa-pass-label">ALL STABLE</span>
                  </div>

                  <div className="qa-dashboard-charts">
                    {/* Circle Score Gauge */}
                    <div className="qa-score-gauge-wrap">
                      <svg className="score-circle-svg" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" className="circle-bg" />
                        <circle cx="50" cy="50" r="40" className="circle-progress" />
                      </svg>
                      <div className="score-inner-text">
                        <strong>98%</strong>
                        <span>Score</span>
                      </div>
                    </div>

                    {/* Progress indicators */}
                    <div className="qa-metrics-progress-list">
                      <div className="qa-progress-item">
                        <div className="qa-progress-labels">
                          <span>Build Health</span>
                          <strong>100%</strong>
                        </div>
                        <div className="qa-progress-track">
                          <div className="qa-progress-fill" style={{ width: '100%' }}></div>
                        </div>
                      </div>

                      <div className="qa-progress-item">
                        <div className="qa-progress-labels">
                          <span>Test Coverage</span>
                          <strong>94.2%</strong>
                        </div>
                        <div className="qa-progress-track">
                          <div className="qa-progress-fill" style={{ width: '94.2%', background: 'var(--secondary)' }}></div>
                        </div>
                      </div>

                      <div className="qa-progress-item">
                        <div className="qa-progress-labels">
                          <span>Security Grade</span>
                          <strong>A+</strong>
                        </div>
                        <div className="qa-progress-track">
                          <div className="qa-progress-fill" style={{ width: '98%', background: '#8fba4a' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SVG drawn Analytics line chart */}
                  <div className="qa-live-chart-svg">
                    <svg viewBox="0 0 320 100" width="100%" height="100%">
                      <path d="M 10 90 Q 60 20, 110 70 T 210 30 T 310 10" fill="none" stroke="url(#cyanGlowGrad)" strokeWidth="3" strokeLinecap="round" />
                      <defs>
                        <linearGradient id="cyanGlowGrad" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="var(--accent)" />
                          <stop offset="100%" stopColor="var(--secondary)" />
                        </linearGradient>
                      </defs>
                      <circle cx="110" cy="70" r="5" fill="var(--accent)" />
                      <circle cx="210" cy="30" r="5" fill="var(--secondary)" />
                      <circle cx="310" cy="10" r="5" fill="var(--primary)" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 7: COMPANY VALUES
         ========================================================================== */}
      <section className="about-values-sec">
        <div className="container">
          <div className="section-header-premium reveal slide-up">
            <span className="section-tag-premium">{valuesSec.subtitle}</span>
            <h2 className="section-title-premium text-center">
              {valuesSec.title}
            </h2>
            <p className="section-desc-premium text-center">
              {valuesSec.description}
            </p>
          </div>

          <div className="values-premium-grid">
            {(valuesSec.metadata?.cards || []).map((card, idx) => {
              const style = valueStyles[idx % valueStyles.length];
              return (
                <div key={idx} className={`value-premium-card reveal slide-up delay-${((idx % 3) + 1) * 100}`}>
                  <div className={`value-gradient-glow ${style.glowClass}`}></div>
                  <div className="value-pattern-bg"></div>
                  <div className="value-icon-circle" style={{ background: style.bg, color: style.color }}>
                    <i className={card.icon || 'ri-checkbox-circle-line'}></i>
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 8: PREMIUM CTA SECTION
         ========================================================================== */}
      <section className="about-premium-cta">
        <div className="container">
          <div 
            ref={rocketRef}
            className="cta-banner-premium reveal scale-up"
            onMouseMove={(e) => handleMouseMove(e, rocketRef.current, 3)}
            onMouseLeave={() => handleMouseLeave(rocketRef.current)}
          >
            {/* Background glowing mesh */}
            <div className="cta-mesh-bubble bubble-cyan"></div>
            <div className="cta-mesh-bubble bubble-purple"></div>

            <div className="cta-content-left">
              <h2 className="cta-title-premium" dangerouslySetInnerHTML={{ __html: ctaSec.title || 'Let\'s Build Something <br /> <span class="gradient-text-accent">Amazing Together</span>' }}>
              </h2>
              <p className="cta-desc-premium">
                {ctaSec.description}
              </p>
              <div className="cta-buttons-premium">
                <Link to="/contact" className="btn btn-primary">
                  <span>Get Free Consultation</span>
                </Link>
                <Link to="/services" className="btn btn-secondary">
                  <span>View Services</span>
                </Link>
              </div>
            </div>

            <div className="cta-illustration-right">
              {/* Sleek CSS-drawn 3D Rocket */}
              <div className="rocket-toy-container">
                <div className="rocket-body-shape">
                  <div className="rocket-window-glass"></div>
                  <div className="rocket-wing wing-left"></div>
                  <div className="rocket-wing wing-right"></div>
                  <div className="rocket-thruster-fire">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                {/* Floating planetary elements */}
                <div className="floating-cosmic-node planet-one"></div>
                <div className="floating-cosmic-node planet-two"></div>
                <div className="floating-cosmic-node star-one"><i className="ri-star-fill"></i></div>
                <div className="floating-cosmic-node star-two"><i className="ri-star-fill"></i></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
