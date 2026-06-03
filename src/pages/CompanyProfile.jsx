import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const contact = {
  phone: '+91 99995 30797',
  phoneHref: 'tel:+919999530797',
  email: 'info@nexinfosoft.com',
  emailHref: 'mailto:info@nexinfosoft.com',
  website: 'nexinfosoft.com'
};

const metadata = [
  ['Organization', 'Nexinfosoft IT Solutions'],
  ['Focus Areas', 'Web Development, Mobile Applications, ERP, Enterprise Software, AI/ML, Digital Transformation'],
  ['Engagement Model', 'Agile methodology, sprint-based delivery, dedicated teams, QA-tested releases'],
  ['Contact', `${contact.phone} | ${contact.email} | ${contact.website}`]
];

const capabilities = [
  'Web Applications',
  'Mobile Solutions',
  'ERP Development',
  'Cloud Integration',
  'API Development',
  'UI/UX Design',
  'AI Solutions',
  'DevOps Support',
  'Performance Optimization',
  'Security Focused',
  'Custom Software',
  'Digital Transformation',
  'Agile Delivery',
  'QA Tested',
  'Enterprise Ready',
  'Scalable Architecture'
];

const competencies = [
  {
    title: 'Delivery Focus',
    text: 'Structured planning, sprint execution, and predictable milestones.'
  },
  {
    title: 'Quality Assurance',
    text: 'Functional, performance, and security validation across releases.'
  },
  {
    title: 'Enterprise Support',
    text: 'Deployment, handover, and documentation aligned to audit requirements.'
  }
];

const services = [
  {
    icon: 'ri-window-line',
    title: 'Web Applications',
    text: 'Secure, responsive web platforms with performance optimization and governance-ready documentation.'
  },
  {
    icon: 'ri-smartphone-line',
    title: 'Mobile Solutions',
    text: 'Business-grade applications with role-based access and scalable backend integration.'
  },
  {
    icon: 'ri-briefcase-4-line',
    title: 'ERP Development',
    text: 'Process automation for finance, HR, inventory, and operations with audit-friendly controls.'
  },
  {
    icon: 'ri-lock-password-line',
    title: 'Enterprise Software',
    text: 'Custom enterprise software with secure APIs and maintainable architecture.'
  },
  {
    icon: 'ri-line-chart-line',
    title: 'Digital Marketing',
    text: 'SEO and performance marketing with measurable reporting aligned to brand guidelines.'
  },
  {
    icon: 'ri-sparkling-line',
    title: 'AI & Automation',
    text: 'Practical AI/ML and workflow automation for analytics and operational efficiency.'
  }
];

const strengths = [
  ['Agile Methodology', 'Sprint planning, backlog control, and stakeholder alignment.'],
  ['Sprint Based Delivery', 'Incremental releases to reduce risk and enable timely reviews.'],
  ['Dedicated Team', 'Focused engineering and QA resources for project scope.'],
  ['Regular Reporting', 'Weekly status, metrics, and action items for decision makers.'],
  ['Deployment Support', 'Environment setup, release checklists, and operations handover.'],
  ['QA & Security Testing', 'Functional validation and security hardening per best practices.']
];

const processSteps = [
  ['01', 'Requirement Analysis', 'Stakeholder interviews, scope definition, and feasibility review.'],
  ['02', 'BRD / SRS Documentation', 'Business requirements and functional specification preparation.'],
  ['03', 'UI / UX Design', 'Wireframes, prototypes, and approval-ready interface designs.'],
  ['04', 'Development', 'Sprint execution with demos, code reviews, and progress tracking.'],
  ['05', 'Testing', 'QA cycles, defect management, and security validation.'],
  ['06', 'Deployment', 'Release execution, monitoring setup, and stakeholder handover.'],
  ['07', 'Support & Maintenance', 'Ongoing support, enhancements, and post-deployment assistance.']
];

const techStack = [
  ['Frontend Technologies', 'ReactJS, Angular, Vue.js, HTML5, CSS3, JavaScript, TypeScript, TailwindCSS, Bootstrap'],
  ['Backend Technologies', 'PHP, Laravel, Node.js, Python, Spring Boot, Java, REST APIs'],
  ['Mobile Technologies', 'Flutter, React Native, Android, iOS'],
  ['Database Technologies', 'MySQL, PostgreSQL, MongoDB, Firebase'],
  ['Cloud & DevOps', 'Docker, Jenkins, GitHub, CI/CD, VPS & Cloud Deployment'],
  ['AI & Analytics', 'AI/ML, Automation, Power BI, Data Analytics']
];

const qualityChecks = [
  ['Unit Testing', 'Validate core modules and reduce regression risk.'],
  ['Load Testing', 'Assess concurrency, throughput, and stability under load.'],
  ['Automation Testing', 'Repeatable suites for critical workflows and acceptance criteria.'],
  ['Security Testing', 'Secure coding validation and vulnerability assessment.'],
  ['UAT', 'User acceptance planning, defect triage, and release sign-off.']
];

const contents = [
  ['01', 'Company Overview', '#company-profile-overview'],
  ['02', 'Core Services', '#company-profile-services'],
  ['03', 'Delivery Strengths', '#company-profile-strengths'],
  ['04', 'Development Process', '#company-profile-process'],
  ['05', 'Technology Stack', '#company-profile-tech'],
  ['06', 'Quality & Testing', '#company-profile-quality'],
  ['07', 'Contact Information', '#company-profile-contact']
];

const CompanyProfile = () => {
  const [heroContent, setHeroContent] = useState({
    title: 'Nexinfosoft IT Solutions',
    subtitle: 'Enterprise Web & Software Solutions',
    description: 'Trusted technology partner for business and government organizations. We provide structured web, mobile, ERP, enterprise software, AI/ML and digital transformation services with clear documentation and measurable outcomes.'
  });
  const [profileSections, setProfileSections] = useState({});

  const getProfileSection = (id, fallback) => profileSections[id] || fallback;

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchHeroContent = async () => {
      try {
        const res = await fetch('/api/content/company_profile_hero');
        if (res.ok) {
          const data = await res.json();
          setHeroContent(prev => ({ ...prev, ...data }));
        }
      } catch (err) {}
    };

    const fetchProfileSections = async () => {
      const ids = [
        'company_profile_overview',
        'company_profile_capabilities',
        'company_profile_services',
        'company_profile_strengths',
        'company_profile_process',
        'company_profile_tech',
        'company_profile_quality',
        'company_profile_contact'
      ];

      try {
        const entries = await Promise.all(ids.map(async (id) => {
          const res = await fetch(`/api/content/${id}`);
          if (!res.ok) return null;
          const data = await res.json();
          return [id, data];
        }));
        setProfileSections(Object.fromEntries(entries.filter(Boolean)));
      } catch (err) {}
    };

    fetchHeroContent();
    fetchProfileSections();
  }, []);

  const overviewSection = getProfileSection('company_profile_overview', {
    title: 'About Nexinfosoft IT Solutions',
    subtitle: 'COMPANY OVERVIEW',
    description: 'Nexinfosoft IT Solutions provides enterprise-grade technology services for organizations that require clear documentation, structured execution, and measurable outcomes.',
    metadata: {
      paragraphs: [
        'We support business and government teams with web development, mobile applications, ERP solutions, enterprise software, AI/ML capabilities, and digital transformation services.',
        'Our delivery approach combines agile methodology with strong quality assurance, secure deployment support, and transparent reporting, ensuring stakeholders maintain confidence throughout the engagement lifecycle.'
      ]
    }
  });
  const capabilitiesSection = getProfileSection('company_profile_capabilities', { title: 'Business & Technology Scope', subtitle: 'CORE CAPABILITIES', description: '' });
  const servicesSection = getProfileSection('company_profile_services', { title: 'Service Capabilities And Scope', subtitle: 'CORE SERVICES', description: '' });
  const strengthsSection = getProfileSection('company_profile_strengths', { title: 'Why Organizations Partner With Nexinfosoft', subtitle: 'DELIVERY STRENGTHS', description: '' });
  const processSection = getProfileSection('company_profile_process', { title: 'Structured Project Lifecycle', subtitle: 'DEVELOPMENT PROCESS', description: '' });
  const techSection = getProfileSection('company_profile_tech', {
    title: 'Requirement-Based Technology Selection',
    subtitle: 'TECHNOLOGY STACK',
    description: 'Technology choices are finalized according to security, scale, maintainability, timeline, and integration needs.'
  });
  const qualitySection = getProfileSection('company_profile_quality', { title: 'Verification And Assurance Framework', subtitle: 'QUALITY & TESTING', description: '' });
  const contactSection = getProfileSection('company_profile_contact', {
    title: 'For project enquiries and tender discussions',
    subtitle: 'CONTACT INFORMATION',
    description: 'To discuss project requirements, timelines, or compliance needs, please contact Nexinfosoft IT Solutions.'
  });

  return (
    <div className="company-profile-page">
      <section className="company-profile-hero">
        <div className="container company-profile-hero-grid">
          <div className="company-profile-hero-content">
            <span className="section-tag-premium">PROFILE OVERVIEW</span>
            <h1 className="hero-title-premium">{heroContent.title}</h1>
            <p className="company-profile-subtitle">{heroContent.subtitle}</p>
            <p className="hero-desc-premium">
              {heroContent.description}
            </p>
            <div className="hero-cta-btns">
              <a href={contact.phoneHref} className="btn btn-primary">
                <span>Call Now</span>
                <i className="ri-phone-line"></i>
              </a>
              <a href={`https://wa.me/919999530797?text=${encodeURIComponent('Hello Nexinfosoft IT Solutions. I would like to discuss a project requirement.')}`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="company-profile-panel">
            <div className="company-profile-logo-card">
              <img src="/assets/nex-infotech-logo.png" alt="Nexinfosoft IT Solutions" />
            </div>
            <div className="company-profile-meta-table">
              {metadata.map(([label, value]) => (
                <div className="company-profile-meta-row" key={label}>
                  <strong>{label}</strong>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="company-profile-toc-sec">
        <div className="container">
          <nav className="company-profile-toc" aria-label="Company profile contents">
            <span>Contents</span>
            <div>
              {contents.map(([number, label, href]) => (
                <a href={href} key={label}>
                  <strong>{number}</strong>
                  {label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </section>

      <section className="company-profile-section" id="company-profile-overview">
        <div className="container">
          <div className="section-header-premium text-center">
            <span className="section-tag-premium text-center">{overviewSection.subtitle}</span>
            <h2 className="section-title-premium">{overviewSection.title}</h2>
            <p className="section-desc-premium">
              {overviewSection.description}
            </p>
          </div>

          <div className="company-profile-overview-grid">
            <div className="company-profile-copy-card">
              {(overviewSection.metadata?.paragraphs || []).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="company-profile-competency-grid">
              {competencies.map((item) => (
                <article className="company-profile-info-card" key={item.title}>
                  <i className="ri-checkbox-circle-line"></i>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="company-profile-section company-profile-capabilities-sec">
        <div className="container">
          <div className="section-header-premium text-center">
            <span className="section-tag-premium text-center">{capabilitiesSection.subtitle}</span>
            <h2 className="section-title-premium">{capabilitiesSection.title}</h2>
          </div>
          <div className="company-profile-capability-grid">
            {capabilities.map((capability) => (
              <div className="company-profile-capability" key={capability}>
                <i className="ri-check-line"></i>
                <span>{capability}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="company-profile-section" id="company-profile-services">
        <div className="container">
          <div className="section-header-premium text-center">
            <span className="section-tag-premium text-center">{servicesSection.subtitle}</span>
            <h2 className="section-title-premium">{servicesSection.title}</h2>
          </div>
          <div className="company-profile-services-grid">
            {services.map((service) => (
              <article className="company-profile-strength-card" key={service.title}>
                <div className="company-profile-strength-icon">
                  <i className={service.icon}></i>
                </div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="company-profile-section" id="company-profile-strengths">
        <div className="container">
          <div className="section-header-premium text-center">
            <span className="section-tag-premium text-center">{strengthsSection.subtitle}</span>
            <h2 className="section-title-premium">{strengthsSection.title}</h2>
          </div>
          <div className="company-profile-strength-list">
            {strengths.map(([title, text]) => (
              <article key={title}>
                <i className="ri-shield-check-line"></i>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="company-profile-section company-profile-process-sec" id="company-profile-process">
        <div className="container">
          <div className="section-header-premium text-center">
            <span className="section-tag-premium text-center">{processSection.subtitle}</span>
            <h2 className="section-title-premium">{processSection.title}</h2>
          </div>
          <div className="company-profile-process-grid">
            {processSteps.map(([number, title, text]) => (
              <article className="company-profile-process-card" key={title}>
                <strong>{number}</strong>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="company-profile-section" id="company-profile-tech">
        <div className="container">
          <div className="section-header-premium text-center">
            <span className="section-tag-premium text-center">{techSection.subtitle}</span>
            <h2 className="section-title-premium">{techSection.title}</h2>
            <p className="section-desc-premium">
              {techSection.description}
            </p>
          </div>
          <div className="company-profile-table-card">
            {techStack.map(([label, value]) => (
              <div className="company-profile-table-row" key={label}>
                <strong>{label}</strong>
                <span>{value}</span>
              </div>
            ))}
          </div>
          <p className="company-profile-note">
            Additional frameworks, libraries, and third-party services may be applied where they best support the project scope and delivery timeline.
          </p>
        </div>
      </section>

      <section className="company-profile-section" id="company-profile-quality">
        <div className="container">
          <div className="section-header-premium text-center">
            <span className="section-tag-premium text-center">{qualitySection.subtitle}</span>
            <h2 className="section-title-premium">{qualitySection.title}</h2>
          </div>
          <div className="company-profile-quality-grid">
            {qualityChecks.map(([title, text]) => (
              <article className="company-profile-quality-card" key={title}>
                <i className="ri-verified-badge-line"></i>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="company-profile-cta" id="company-profile-contact">
        <div className="container company-profile-cta-box">
          <div>
            <span className="section-tag-premium">{contactSection.subtitle}</span>
            <h2>{contactSection.title}</h2>
            <p>{contactSection.description}</p>
            <div className="company-profile-contact-list">
              <a href={contact.phoneHref}><i className="ri-phone-line"></i>{contact.phone}</a>
              <a href={contact.emailHref}><i className="ri-mail-line"></i>{contact.email}</a>
              <Link to="/"><i className="ri-global-line"></i>{contact.website}</Link>
            </div>
          </div>
          <Link to="/free-consultation.html" className="btn btn-primary">
            <span>Book Free Consultation</span>
            <i className="ri-calendar-check-line"></i>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CompanyProfile;
