import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Hero from '../components/home/Hero';
import CoreServices from '../components/home/CoreServices';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Technologies from '../components/home/Technologies';
import Industries from '../components/home/Industries';
import Process from '../components/home/Process';
import PortfolioPreview from '../components/home/PortfolioPreview';

const AdminDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'sections';
  const activeSection = searchParams.get('section') || (activeTab === 'sections' ? 'hero' : activeTab === 'pages' ? 'footer_links' : 'corporate_hero');

  const setActiveTab = (tab) => {
    setSearchParams({ tab });
  };

  const setActiveSection = (section) => {
    setSearchParams({ tab: activeTab, section });
  };
  
  // Dynamic lists
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [techItems, setTechItems] = useState([]);
  const [leads, setLeads] = useState([]);

  // Editor states
  const [sectionContent, setSectionContent] = useState(null);
  const [serviceForm, setServiceForm] = useState({ slug: '', title: '', subtitle: '', icon: 'ri-window-line', intro: '', benefits: '', deliverables: '', image_url: '' });
  const [projectForm, setProjectForm] = useState({ name: '', category: 'web', tag: '', techs: '', desc: '', icon: 'ri-briefcase-4-line', image_url: '' });
  const [techForm, setTechForm] = useState({ category: 'frontend', name: '', icon: 'ri-code-line', desc: '', color: 'rgba(20, 184, 166, 0.1)', bestFor: '', projects: '', performance: '95%' });
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [customCategory, setCustomCategory] = useState('');
  const [leadFilter, setLeadFilter] = useState('all');
  const [managerPageFilter, setManagerPageFilter] = useState('all');

  const [editingId, setEditingId] = useState(null); // ID of item being updated
  
  // Custom section states
  const [allSections, setAllSections] = useState([]);
  const [customSectionForm, setCustomSectionForm] = useState({ _id: '', title: '', subtitle: '', description: '', image_url: '', page: 'home', order: 0, visible: true });
  
  // Loading & UI states
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  const getSectionLabel = () => {
    const labels = {
      hero: 'Home Hero Banner',
      services: 'Core Services Header',
      whychooseus: 'Why Choose Us',
      technologies: 'Home Technologies Stack',
      industries: 'Home Verticals/Industries',
      process: 'Home Process Blueprint',
      portfoliopreview: 'Home Portfolio Preview',
      sections_manager: 'Sections Manager',
      corporate_hero: 'Corporate Hero',
      corporate_about: 'Corporate About',
      corporate_mission: 'Corporate Mission & Vision',
      footer_links: 'Footer Links',
      company_profile_hero: 'Company Profile',
      company_profile_overview: 'Company Profile Overview',
      company_profile_capabilities: 'Company Profile Capabilities',
      company_profile_services: 'Company Profile Services',
      company_profile_strengths: 'Company Profile Strengths',
      company_profile_process: 'Company Profile Process',
      company_profile_tech: 'Company Profile Tech Stack',
      company_profile_quality: 'Company Profile Quality',
      company_profile_contact: 'Company Profile Contact',
      privacy_policy: 'Privacy Policy',
      terms_conditions: 'Terms & Conditions'
    };
    return labels[activeSection] || activeSection;
  };

  const getDefaultSectionContent = (sectionId) => {
    const defaults = {
      hero: {
        _id: 'hero',
        title: 'Build Scalable',
        subtitle: 'For Modern Teams',
        description: 'Nexinfosoft designs high-performance SaaS platforms, ERP systems, mobile apps, CRM workflows, and AI automation tools that help modern businesses move faster, reduce manual work, and unlock measurable growth.',
        image_url: '/assets/images/herobanner.png',
        metadata: {
          tag: 'AI Powered Digital Transformation Studio',
          rotatingKeywords: ['CRM Solutions', 'ERP Systems', 'AI Automation', 'SaaS Platforms', 'Mobile Apps'],
          trustPills: ['Secure Architecture', 'Fast Delivery', 'Growth Focused'],
          stats: [
            { label: 'Digital projects', value: '100+' },
            { label: 'Business clients', value: '50+' },
            { label: 'Delivery health', value: '99%' }
          ]
        }
      },
      services: {
        _id: 'services',
        title: 'Everything Your Business Needs To Build,',
        subtitle: 'Scale & Automate',
        description: 'From web apps to AI automation, we deliver secure and scalable digital solutions that help your business grow faster, operate smarter, and launch with confidence.',
        metadata: {
          badge: 'Core Services',
          capabilityStack: {
            kicker: 'Digital Capability Stack',
            title: 'Enterprise delivery console for modern product teams',
            description: 'End-to-end planning, design, development, cloud deployment, QA, security and optimization under one reliable delivery system.'
          }
        }
      },
      whychooseus: {
        _id: 'whychooseus',
        title: 'Why Global Businesses Choose',
        subtitle: 'Nexinfosoft',
        description: 'We align engineering with business outcomes through structured planning, secure implementation, clear reporting, and dependable support.',
        metadata: {
          badge: 'Value Proposition',
          checklist: [
            'Gurugram-based Dedicated In-House Team',
            'Post-Deployment Support & Documentation',
            'Agile Iterations & 100% Code Ownership'
          ],
          metrics: [
            { label: 'Projects Delivered', value: '50+', icon: 'ri-briefcase-4-line' },
            { label: 'Client Satisfaction', value: '99%', icon: 'ri-emotion-happy-line' },
            { label: 'Support Available', value: '24/7', icon: 'ri-customer-service-2-line' },
            { label: 'Code Ownership', value: '100%', icon: 'ri-code-s-slash-line' }
          ]
        }
      },
      corporate_hero: {
        _id: 'corporate_hero',
        title: 'Fastest Way To Grow Your Business Is Being With Us.',
        subtitle: 'UNIQUE OUTCOMES FROM EXPERIENCED DEVELOPERS',
        description: 'We strive to provide highly customized and reliable IT solutions for various business aspects.',
        image_url: '/assets/images/corporate_hero.png',
        metadata: {}
      },
      corporate_about: {
        _id: 'corporate_about',
        title: 'Top Class IT Services Provider',
        subtitle: 'ABOUT US',
        description: 'Nexinfosoft is a full-service Digital agency based in India.',
        image_url: '/assets/images/corporate_about.png',
        metadata: {
          paragraphs: [
            "Nexinfosoft is a full-service Digital agency based in India. We are professional, experienced and forward thinking, and our great strength is decoding our client's needs into effective solutions.",
            "We live in the digital gamut and stay there round the clock to address your needs.",
            "We integrate marketing and branding with digital innovations."
          ]
        }
      },
      corporate_mission: {
        _id: 'corporate_mission',
        title: 'Functional Websites That Move Businesses Forward',
        subtitle: 'OUR MISSION',
        description: 'To deliver the most functional and attractive websites to our clients and help them take their businesses to the next level.',
        image_url: '/assets/images/corporate_mission.png',
        metadata: {
          vision: {
            title: 'Innovative And Dedicated IT Solutions',
            desc: 'To provide clients with the most innovative and dedicated IT solutions through continuous learning efforts.'
          }
        }
      },
      footer_links: {
        _id: 'footer_links',
        title: 'Footer Links',
        subtitle: 'Website Footer',
        description: 'Nexinfosoft is a certified software development agency committed to engineering highly responsive websites, apps, ERP integrations, and CRM software ecosystems.',
        metadata: {
          services: [
            { label: 'Web Development', url: '/service/custom-web-development' },
            { label: 'Mobile Applications', url: '/service/mobile-applications' },
            { label: 'ERP Systems', url: '/service/erp-development' },
            { label: 'CRM Software', url: '/service/custom-crm-development' },
            { label: 'UI/UX Design', url: '/service/branding-graphic-design' }
          ],
          links: [
            { label: 'About Us', url: '/about' },
            { label: 'Company Profile', url: '/company-profile' },
            { label: 'Corporate', url: '/corporate' },
            { label: 'Client Projects', url: '/portfolio' },
            { label: 'Detailed Services', url: '/services' },
            { label: 'Technology Stack', url: '/technology-stack' }
          ],
          bottomLinks: [
            { label: 'Terms & Conditions', url: '/terms-conditions' },
            { label: 'Privacy Policy', url: '/privacy-policy' }
          ]
        }
      },
      privacy_policy: {
        _id: 'privacy_policy',
        title: 'Privacy Policy',
        subtitle: 'Legal Page',
        description: 'How we collect, use, and protect information shared with Nexinfosoft.',
        metadata: {
          cards: [
            { title: 'Information We Collect', text: 'We may collect your name, phone number, email address, company details, website URL, and project requirement when you submit a form or contact us directly.' },
            { title: 'How We Use Information', text: 'Your information is used to respond to inquiries, prepare estimates, schedule consultations, provide services, and improve our communication and delivery process.' }
          ]
        }
      },
      terms_conditions: {
        _id: 'terms_conditions',
        title: 'Terms & Conditions',
        subtitle: 'Legal Page',
        description: 'Basic terms for website use, project discussions, proposals, and service delivery.',
        metadata: {
          cards: [
            { title: 'Website Use', text: 'By using this website, you agree to use it for lawful purposes and not attempt to misuse, disrupt, copy, or exploit website content or functionality.' },
            { title: 'Consultations & Proposals', text: 'Consultation inputs and estimates are for planning. Final scope, cost, timeline, payment terms, and deliverables are confirmed through a written proposal or agreement.' }
          ]
        }
      },
      company_profile_hero: {
        _id: 'company_profile_hero',
        title: 'Nexinfosoft IT Solutions',
        subtitle: 'Enterprise Web & Software Solutions',
        description: 'Trusted technology partner for business and government organizations. We provide structured web, mobile, ERP, enterprise software, AI/ML and digital transformation services with clear documentation and measurable outcomes.',
        metadata: {}
      },
      technologies: {
        _id: 'technologies',
        title: 'Requirement-Based Technology Selection',
        subtitle: 'Technology Stack',
        description: 'We choose tools around business goals, integrations, performance requirements, and long-term maintainability.',
        metadata: {}
      },
      industries: {
        _id: 'industries',
        title: 'Custom Ecosystems Built For Core Industries',
        subtitle: 'Our Verticals',
        description: 'We build purpose-driven architectures tailored for operational requirements across sectors.',
        metadata: {
          industries: [
            { title: 'Healthcare', icon: 'ri-heart-pulse-line' },
            { title: 'Real Estate', icon: 'ri-home-4-line' },
            { title: 'Education', icon: 'ri-book-open-line' },
            { title: 'E-commerce', icon: 'ri-shopping-cart-2-line' }
          ]
        }
      },
      process: {
        _id: 'process',
        title: 'Our Structured Software Creation Lifecycle',
        subtitle: 'Workflow Blueprint',
        description: 'We maintain transparent, structured development timelines to ensure projects are delivered on time and within scope.',
        metadata: {
          steps: [
            { number: '01', name: 'Analysis', text: 'Understanding system flows and detailed scope.', tags: ['Scope Doc', 'Flowcharts'] },
            { number: '02', name: 'UI/UX Design', text: 'Creating wireframes and interactive mockups.', tags: ['Figma UI', 'Wireframes'] }
          ]
        }
      },
      portfoliopreview: {
        _id: 'portfoliopreview',
        title: 'Digital Products Built For Real Operations',
        subtitle: 'Recent Work',
        description: 'A quick look at specialized software categories our team designs, builds, and maintains.',
        metadata: {}
      }
    };

    return defaults[sectionId] || {
      _id: sectionId,
      title: '',
      subtitle: '',
      description: '',
      image_url: '',
      metadata: {}
    };
  };

  const renderSectionPreview = () => {
    if (!sectionContent) return null;

    if (activeSection === 'hero') {
      return <Hero previewData={sectionContent} />;
    }

    if (activeSection === 'services') {
      return <CoreServices previewData={sectionContent} />;
    }

    if (activeSection === 'whychooseus') {
      return <WhyChooseUs previewData={sectionContent} />;
    }

    if (activeSection === 'technologies') {
      return <Technologies previewData={sectionContent} />;
    }

    if (activeSection === 'industries') {
      return <Industries previewData={sectionContent} />;
    }

    if (activeSection === 'process') {
      return <Process previewData={sectionContent} />;
    }

    if (activeSection === 'portfoliopreview') {
      return <PortfolioPreview previewData={sectionContent} />;
    }

    const title = sectionContent.title || 'Preview title';
    const subtitle = sectionContent.subtitle || sectionContent.metadata?.badge || 'SECTION BADGE';
    const description = sectionContent.description || 'Preview description will appear here while admin edits this section.';
    const imageUrl = sectionContent.image_url || '/assets/images/herobanner.png';

    if (activeSection === 'corporate_hero') {
      return (
        <div className="corporate-page admin-real-section-preview">
          <section className="corporate-hero">
            <div className="hero-bg-blobs">
              <div className="bg-blob blob-teal"></div>
              <div className="bg-blob blob-purple"></div>
              <div className="bg-blob blob-orange"></div>
            </div>
            <div className="container corporate-hero-grid">
              <div className="corporate-hero-content">
                <span className="section-tag-premium">{subtitle || 'UNIQUE OUTCOMES FROM EXPERIENCED DEVELOPERS'}</span>
                <h1 className="hero-title-premium">{title}</h1>
                <p className="hero-desc-premium">{description}</p>
                <div className="hero-cta-btns">
                  <Link to="/contact" className="btn btn-primary">
                    <span>Get In Touch</span>
                    <i className="ri-arrow-right-line"></i>
                  </Link>
                  <Link to="/free-consultation.html" className="btn btn-secondary">
                    <span>Free Consultation</span>
                  </Link>
                </div>
              </div>
              <div className="corporate-hero-image-container">
                <div className="corporate-hero-image-wrap">
                  <img src={imageUrl || '/assets/images/corporate_hero.png'} alt="Corporate IT Solutions" className="corporate-hero-image" />
                  <div className="corporate-hero-image-overlay"></div>
                </div>
                <div className="corporate-floating-badge badge-reliability">
                  <div className="badge-icon-circle"><i className="ri-shield-check-line"></i></div>
                  <div><strong>100% Reliable</strong><span>IT Support Partner</span></div>
                </div>
                <div className="corporate-floating-badge badge-growth">
                  <div className="badge-icon-circle green"><i className="ri-line-chart-line"></i></div>
                  <div><strong>300+ Projects</strong><span>Successfully Delivered</span></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      );
    }

    if (activeSection === 'corporate_about') {
      const paragraphs = sectionContent.metadata?.paragraphs || [description];
      return (
        <div className="corporate-page admin-real-section-preview">
          <section className="corporate-section corporate-about-sec">
            <div className="container corporate-about-grid">
              <div className="corporate-about-image-wrap">
                <img src={imageUrl || '/assets/images/corporate_about.png'} alt="Collaborative IT Development Team" className="corporate-about-image" />
                <div className="corporate-about-image-glow"></div>
              </div>
              <div className="corporate-about-copy">
                <span className="section-tag-premium">{subtitle || 'ABOUT US'}</span>
                <h2 className="section-title-premium">{title}</h2>
                {paragraphs.map((paragraph, idx) => <p key={idx}>{paragraph}</p>)}
              </div>
            </div>
          </section>
        </div>
      );
    }

    if (activeSection === 'corporate_mission') {
      return (
        <div className="corporate-page admin-real-section-preview">
          <section className="corporate-section corporate-mission-sec">
            <div className="container corporate-mission-grid">
              <div className="corporate-mission-image-wrap">
                <img src={imageUrl || '/assets/images/corporate_mission.png'} alt="Nexinfosoft Strategic Mission and Vision" className="corporate-mission-image" />
                <div className="corporate-mission-image-glow"></div>
              </div>
              <div className="corporate-mission-cards-stack">
                <article className="corporate-mission-card">
                  <i className="ri-focus-3-line"></i>
                  <span className="section-tag-premium">{subtitle || 'OUR MISSION'}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
                <article className="corporate-mission-card">
                  <i className="ri-eye-line"></i>
                  <span className="section-tag-premium">OUR VISION</span>
                  <h3>{sectionContent.metadata?.vision?.title || 'Innovative And Dedicated IT Solutions'}</h3>
                  <p>{sectionContent.metadata?.vision?.desc || 'To provide clients with the most innovative and dedicated IT solutions through continuous learning efforts.'}</p>
                </article>
              </div>
            </div>
          </section>
        </div>
      );
    }

    if (activeSection === 'footer_links') {
      const services = sectionContent.metadata?.services || [];
      const links = sectionContent.metadata?.links || [];
      const bottomLinks = sectionContent.metadata?.bottomLinks || [];
      return (
        <div className="admin-footer-links-preview">
          <div>
            <h3>Services</h3>
            {services.map((link) => <span key={`${link.label}-${link.url}`}>{link.label}<small>{link.url}</small></span>)}
          </div>
          <div>
            <h3>Links</h3>
            {links.map((link) => <span key={`${link.label}-${link.url}`}>{link.label}<small>{link.url}</small></span>)}
          </div>
          <div>
            <h3>Bottom Links</h3>
            {bottomLinks.map((link) => <span key={`${link.label}-${link.url}`}>{link.label}<small>{link.url}</small></span>)}
          </div>
        </div>
      );
    }

    if (activeSection === 'privacy_policy' || activeSection === 'terms_conditions') {
      return (
        <div className="admin-policy-preview">
          <div className="page-hero">
            <div className="container">
              <h1 className="page-hero-title">{title}</h1>
              <p className="page-hero-desc">{description}</p>
            </div>
          </div>
          <section className="content-page">
            <div className="container policy-content">
              {(sectionContent.metadata?.cards || []).map((card) => (
                <div className="elegant-card" key={card.title}>
                  <h2>{card.title}</h2>
                  <p>{card.text}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      );
    }

    if (activeSection === 'company_profile_hero') {
      return (
        <div className="company-profile-page admin-real-section-preview">
          <section className="company-profile-hero">
            <div className="container company-profile-hero-grid">
              <div className="company-profile-hero-content">
                <span className="section-tag-premium">PROFILE OVERVIEW</span>
                <h1 className="hero-title-premium">{title}</h1>
                <p className="company-profile-subtitle">{subtitle}</p>
                <p className="hero-desc-premium">{description}</p>
              </div>
              <div className="company-profile-panel">
                <div className="company-profile-logo-card">
                  <img src="/assets/nex-infotech-logo.png" alt="Nexinfosoft IT Solutions" />
                </div>
              </div>
            </div>
          </section>
        </div>
      );
    }

    if (activeSection.startsWith('company_profile_')) {
      return (
        <div className="company-profile-page admin-real-section-preview">
          <section className="company-profile-section">
            <div className="container">
              <div className="section-header-premium text-center">
                <span className="section-tag-premium text-center">{subtitle || 'COMPANY PROFILE'}</span>
                <h2 className="section-title-premium">{title}</h2>
                <p className="section-desc-premium">{description}</p>
              </div>
            </div>
          </section>
        </div>
      );
    }

    return null;
  };

  const renderServiceFormPreview = () => {
    const benefits = typeof serviceForm.benefits === 'string' ? serviceForm.benefits.split(',').map(item => item.trim()).filter(Boolean) : (serviceForm.benefits || []);
    return (
      <article className="admin-form-preview-card admin-service-preview-card">
        <span className="core-icon"><i className={serviceForm.icon || 'ri-window-line'}></i></span>
        <h3>{serviceForm.title || 'Service Title'}</h3>
        <p>{serviceForm.intro || serviceForm.subtitle || 'Service intro will preview here.'}</p>
        <div>
          {benefits.slice(0, 3).map((benefit, idx) => <span key={idx}><i className="ri-checkbox-circle-line"></i>{benefit}</span>)}
        </div>
      </article>
    );
  };

  const renderProjectFormPreview = () => {
    const techs = typeof projectForm.techs === 'string' ? projectForm.techs.split(',').map(item => item.trim()).filter(Boolean) : (projectForm.techs || []);
    return (
      <article className="admin-form-preview-card admin-project-preview-card">
        {projectForm.image_url ? <img src={projectForm.image_url} alt="Project preview" /> : <div className="admin-preview-image-placeholder"><i className={projectForm.icon || 'ri-briefcase-4-line'}></i></div>}
        <span>{projectForm.tag || projectForm.category || 'Project Category'}</span>
        <h3>{projectForm.name || 'Project Name'}</h3>
        <p>{projectForm.desc || 'Project description preview will appear here.'}</p>
        <div>{techs.slice(0, 4).map((tech, idx) => <small key={idx}>{tech}</small>)}</div>
      </article>
    );
  };

  const renderTechFormPreview = () => {
    const finalCategory = techForm.category === 'custom' ? customCategory || 'custom' : techForm.category;
    return (
      <article className="admin-form-preview-card admin-tech-preview-card" style={{ '--previewAccent': techForm.color || 'rgba(20, 184, 166, 0.1)' }}>
        <span><i className={techForm.icon || 'ri-code-line'}></i></span>
        <small>{finalCategory}</small>
        <h3>{techForm.name || 'Technology Name'}</h3>
        <p>{techForm.desc || 'Technology summary preview will appear here.'}</p>
        <div>
          <strong>{techForm.performance || '95%'}</strong>
          <small>{techForm.bestFor || 'Best use case'}</small>
        </div>
      </article>
    );
  };

  // Verify authorization
  useEffect(() => {
    if (!token) {
      navigate('/admin-login');
    }
  }, [token, navigate]);

  const loadAllSections = async () => {
    try {
      const res = await fetch('/api/content');
      if (res.ok) {
        const data = await res.json();
        setAllSections(data);
      }
    } catch (e) {}
  };

  const handleAutoFixSections = async () => {
    if (!window.confirm('This will automatically fix incorrect page category assignments (e.g., moving Corporate sections to "corporate" page) and set correct display orders for all homepage sections in the database. Proceed?')) return;
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const fixes = [
        { id: 'hero', page: 'home', order: 0 },
        { id: 'services', page: 'home', order: 1 },
        { id: 'whychooseus', page: 'home', order: 2 },
        { id: 'technologies', page: 'home', order: 3 },
        { id: 'industries', page: 'home', order: 4 },
        { id: 'process', page: 'home', order: 5 },
        { id: 'portfoliopreview', page: 'home', order: 6 },
        { id: 'corporate_hero', page: 'corporate', order: 0 },
        { id: 'corporate_about', page: 'corporate', order: 1 },
        { id: 'corporate_mission', page: 'corporate', order: 2 },
        { id: 'footer_links', page: 'global', order: 0 },
        { id: 'privacy_policy', page: 'policy', order: 0 },
        { id: 'terms_conditions', page: 'policy', order: 0 },
        { id: 'company_profile_hero', page: 'company_profile', order: 0 },
        { id: 'company_profile_overview', page: 'company_profile', order: 1 },
        { id: 'company_profile_capabilities', page: 'company_profile', order: 2 },
        { id: 'company_profile_services', page: 'company_profile', order: 3 },
        { id: 'company_profile_strengths', page: 'company_profile', order: 4 },
        { id: 'company_profile_process', page: 'company_profile', order: 5 },
        { id: 'company_profile_tech', page: 'company_profile', order: 6 },
        { id: 'company_profile_quality', page: 'company_profile', order: 7 },
        { id: 'company_profile_contact', page: 'company_profile', order: 8 }
      ];

      let successCount = 0;
      for (const fix of fixes) {
        const sec = allSections.find(s => s._id === fix.id);
        if (sec) {
          const updatedSec = { ...sec, page: fix.page, order: fix.order };
          const res = await fetch(`/api/content/${fix.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedSec)
          });
          if (res.ok) {
            successCount++;
          }
        }
      }
      
      setMessage(`Successfully fixed ${successCount} database sections! Your Hero section and homepage layout flow are restored.`);
      loadAllSections();
    } catch (err) {
      setError('Auto-fix failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSectionVisibility = async (sec) => {
    try {
      const updatedSec = { ...sec, visible: !sec.visible };
      const res = await fetch(`/api/content/${sec._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedSec)
      });
      if (res.ok) {
        loadAllSections();
        setMessage('Section visibility updated successfully.');
      } else {
        const errData = await res.json();
        setError(errData.error || 'Failed to update section visibility.');
      }
    } catch (err) {
      setError('Server error.');
    }
  };

  const handleUpdateSectionOrder = async (sec, newOrder) => {
    try {
      const updatedSec = { ...sec, order: parseInt(newOrder, 10) || 0 };
      const res = await fetch(`/api/content/${sec._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedSec)
      });
      if (res.ok) {
        loadAllSections();
        setMessage('Section order updated successfully.');
      } else {
        const errData = await res.json();
        setError(errData.error || 'Failed to update section order.');
      }
    } catch (err) {
      setError('Server error.');
    }
  };

  const handleDeleteSection = async (id) => {
    if (!window.confirm(`Are you sure you want to delete the section "${id}"?`)) return;
    try {
      const res = await fetch(`/api/content/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        loadAllSections();
        setMessage('Section deleted successfully.');
      } else {
        const errData = await res.json();
        setError(errData.error || 'Failed to delete section.');
      }
    } catch (err) {
      setError('Server error.');
    }
  };

  const handleAddCustomSection = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(customSectionForm)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create custom section.');
      
      setMessage('Custom section successfully created!');
      setCustomSectionForm({ _id: '', title: '', subtitle: '', description: '', image_url: '', page: 'home', order: 0, visible: true });
      loadAllSections();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data depending on active tab
  useEffect(() => {
    if (!token) return;
    if (activeTab === 'sections' || activeTab === 'corporate' || activeTab === 'pages') {
      loadAllSections();
    }
  }, [activeTab, token]);

  useEffect(() => {
    if (!token) return;

    const fetchSection = async () => {
      setLoading(true);
      setError('');
      setMessage('');
      setSectionContent(null);
      try {
        const res = await fetch(`/api/content/${activeSection}`);
        const data = await res.json();
        if (!res.ok) {
          if (res.status === 404) {
            setSectionContent(getDefaultSectionContent(activeSection));
            setMessage('This section is not in the database yet. Edit and save once to create it.');
            return;
          }
          throw new Error(data.error || 'Failed to retrieve section.');
        }
        setSectionContent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if ((activeTab === 'sections' || activeTab === 'corporate' || activeTab === 'pages') && activeSection !== 'sections_manager') {
      fetchSection();
    }
  }, [activeSection, activeTab, token]);

  // Fetch Services, Projects, Tech Items
  const loadServices = async () => {
    try {
      const res = await fetch('/api/services');
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      }
    } catch (e) {}
  };

  const loadProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (e) {}
  };

  const loadTechItems = async () => {
    try {
      const res = await fetch('/api/techstack');
      if (res.ok) {
        const data = await res.json();
        setTechItems(data);
      }
    } catch (e) {}
  };

  const loadLeads = async () => {
    try {
      const res = await fetch('/api/contact', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } catch (e) {}
  };

  useEffect(() => {
    if (!token) return;
    if (activeTab === 'services') loadServices();
    if (activeTab === 'projects') loadProjects();
    if (activeTab === 'techstack') loadTechItems();
    if (activeTab === 'leads') loadLeads();
  }, [activeTab, token]);

  // Inputs Handlers
  const handleInputChange = (field, value) => {
    setSectionContent(prev => ({ ...prev, [field]: value }));
  };

  const handleMetadataChange = (key, value) => {
    setSectionContent(prev => ({
      ...prev,
      metadata: { ...prev.metadata, [key]: value }
    }));
  };

  const handleArrayMetadataChange = (key, index, value) => {
    setSectionContent(prev => {
      const arr = [...(prev.metadata[key] || [])];
      arr[index] = value;
      return {
        ...prev,
        metadata: { ...prev.metadata, [key]: arr }
      };
    });
  };

  const updateMetadataArrayObject = (key, index, field, value) => {
    setSectionContent(prev => {
      const arr = [...(prev.metadata?.[key] || [])];
      arr[index] = { ...(arr[index] || {}), [field]: value };
      return {
        ...prev,
        metadata: { ...prev.metadata, [key]: arr }
      };
    });
  };

  const addMetadataArrayObject = (key, item) => {
    setSectionContent(prev => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        [key]: [...(prev.metadata?.[key] || []), item]
      }
    }));
  };

  const removeMetadataArrayObject = (key, index) => {
    setSectionContent(prev => {
      const arr = [...(prev.metadata?.[key] || [])];
      arr.splice(index, 1);
      return {
        ...prev,
        metadata: { ...prev.metadata, [key]: arr }
      };
    });
  };

  const addRotatingKeyword = () => {
    setSectionContent(prev => {
      const keywords = [...(prev.metadata?.rotatingKeywords || [])];
      keywords.push('');
      return {
        ...prev,
        metadata: {
          ...prev.metadata,
          rotatingKeywords: keywords
        }
      };
    });
  };

  const removeRotatingKeyword = (index) => {
    setSectionContent(prev => {
      const keywords = [...(prev.metadata?.rotatingKeywords || [])];
      keywords.splice(index, 1);
      return {
        ...prev,
        metadata: {
          ...prev.metadata,
          rotatingKeywords: keywords
        }
      };
    });
  };

  // Image upload handler
  const handleImageUpload = async (e, targetField, setter = null, isForm = false) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError('');
    setMessage('');

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'File upload failed.');

      if (isForm && setter) {
        setter(prev => ({ ...prev, [targetField]: data.imageUrl }));
      } else {
        handleInputChange(targetField, data.imageUrl);
      }
      setMessage('Image uploaded successfully! Make sure to save changes.');
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  // Save Section Content Updates
  const handleSaveSection = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await fetch(`/api/content/${activeSection}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(sectionContent)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save section.');

      setMessage('Changes successfully saved in the database!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // CRUD handlers: Services
  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    // Parse array strings
    const benefitsArr = typeof serviceForm.benefits === 'string' ? serviceForm.benefits.split(',').map(s => s.trim()).filter(Boolean) : serviceForm.benefits;
    const deliverablesArr = typeof serviceForm.deliverables === 'string' ? serviceForm.deliverables.split(',').map(s => s.trim()).filter(Boolean) : serviceForm.deliverables;

    const payload = { ...serviceForm, benefits: benefitsArr, deliverables: deliverablesArr };

    const url = editingId ? `/api/services/${editingId}` : '/api/services';
    const method = editingId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit service.');

      setMessage(editingId ? 'Service successfully updated!' : 'Service successfully created!');
      setServiceForm({ slug: '', title: '', subtitle: '', icon: 'ri-window-line', intro: '', benefits: '', deliverables: '', image_url: '' });
      setEditingId(null);
      loadServices();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditService = (srv) => {
    setEditingId(srv._id);
    setServiceForm({
      slug: srv.slug,
      title: srv.title,
      subtitle: srv.subtitle || '',
      icon: srv.icon || 'ri-window-line',
      intro: srv.intro || '',
      benefits: (srv.benefits || []).join(', '),
      deliverables: (srv.deliverables || []).join(', '),
      image_url: srv.image_url || ''
    });
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm('Are you absolutely sure you want to delete this service?')) return;
    try {
      const res = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setMessage('Service deleted successfully.');
        loadServices();
      }
    } catch (e) {}
  };

  // CRUD handlers: Projects
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    const techsArr = typeof projectForm.techs === 'string' ? projectForm.techs.split(',').map(s => s.trim()).filter(Boolean) : projectForm.techs;
    const payload = { ...projectForm, techs: techsArr };

    const url = editingId ? `/api/projects/${editingId}` : '/api/projects';
    const method = editingId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit project.');

      setMessage(editingId ? 'Project successfully updated!' : 'Project successfully created!');
      setProjectForm({ name: '', category: 'web', tag: '', techs: '', desc: '', icon: 'ri-briefcase-4-line', image_url: '' });
      setEditingId(null);
      loadProjects();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProject = (proj) => {
    setEditingId(proj._id);
    setProjectForm({
      name: proj.name,
      category: proj.category,
      tag: proj.tag || '',
      techs: (proj.techs || []).join(', '),
      desc: proj.desc || '',
      icon: proj.icon || 'ri-briefcase-4-line',
      image_url: proj.image_url || ''
    });
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you absolutely sure you want to delete this project?')) return;
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setMessage('Project deleted successfully.');
        loadProjects();
      }
    } catch (e) {}
  };

  // CRUD handlers: Tech Stack Items
  const handleTechSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    const finalCategory = techForm.category === 'custom' ? customCategory.trim().toLowerCase() : techForm.category;

    if (!finalCategory) {
      setError('Please provide a valid Category Group.');
      setLoading(false);
      return;
    }

    const payload = {
      category: finalCategory,
      name: techForm.name,
      icon: techForm.icon,
      desc: techForm.desc,
      color: techForm.color,
      metadata: {
        bestFor: techForm.bestFor,
        projects: techForm.projects,
        performance: techForm.performance
      }
    };

    const url = editingId ? `/api/techstack/${editingId}` : '/api/techstack';
    const method = editingId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit tech item.');

      setMessage(editingId ? 'Tech stack item successfully updated!' : 'Tech stack item successfully created!');
      setTechForm({ category: 'frontend', name: '', icon: 'ri-code-line', desc: '', color: 'rgba(20, 184, 166, 0.1)', bestFor: '', projects: '', performance: '95%' });
      setCustomCategory('');
      setShowCustomCategory(false);
      setEditingId(null);
      loadTechItems();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditTech = (tech) => {
    setEditingId(tech._id);
    const standardCats = ['frontend', 'backend', 'mobile', 'database', 'cloud', 'ai'];
    const isCustom = !standardCats.includes(tech.category.toLowerCase());

    setTechForm({
      category: isCustom ? 'custom' : tech.category,
      name: tech.name,
      icon: tech.icon || 'ri-code-line',
      desc: tech.desc || '',
      color: tech.color || 'rgba(20, 184, 166, 0.1)',
      bestFor: tech.metadata?.bestFor || '',
      projects: tech.metadata?.projects || '',
      performance: tech.metadata?.performance || '95%'
    });

    if (isCustom) {
      setCustomCategory(tech.category);
      setShowCustomCategory(true);
    } else {
      setCustomCategory('');
      setShowCustomCategory(false);
    }
  };

  const handleDeleteTech = async (id) => {
    if (!window.confirm('Are you absolutely sure you want to delete this tech item?')) return;
    try {
      const res = await fetch(`/api/techstack/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setMessage('Tech item deleted successfully.');
        loadTechItems();
      }
    } catch (e) {}
  };

  const handleDeleteLead = async (id) => {
    if (!window.confirm('Are you absolutely sure you want to delete this inquiry?')) return;
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setMessage('Inquiry deleted successfully.');
        loadLeads();
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to delete inquiry.');
      }
    } catch (e) {
      setError('Server error.');
    }
  };

  const handleUpdateLeadStatus = async (id, newStatus) => {
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const res = await fetch(`/api/contact/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update status.');
      
      setMessage('Lead status updated successfully.');
      loadLeads();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    const printWindow = window.open('', '_blank');
    
    const rows = leads.map((lead, idx) => `
      <tr>
        <td>${idx + 1}</td>
        <td>
          <strong>${lead.fullName}</strong>
          ${lead.companyName ? `<br><small style="color:#666">Co: ${lead.companyName}</small>` : ''}
        </td>
        <td>
          <a href="mailto:${lead.email}">${lead.email}</a><br>
          <a href="tel:${lead.phone}">${lead.phone}</a>
        </td>
        <td>${lead.service}</td>
        <td>${lead.budget}</td>
        <td>
          <span class="status-badge status-${lead.status || 'pending'}">
            ${(lead.status || 'pending').toUpperCase().replace('-', ' ')}
          </span>
        </td>
        <td style="font-size:11px; max-width:250px; white-space:pre-wrap;">${lead.details}</td>
        <td style="font-size:11px">${new Date(lead.createdAt).toLocaleDateString()}</td>
      </tr>
    `).join('');

    printWindow.document.write(`
      <html>
        <head>
          <title>Nexinfosoft IT Solutions - Leads Report</title>
          <style>
            body { font-family: 'Segoe UI', Roboto, sans-serif; margin: 30px; color: #333; }
            h1 { font-size: 24px; color: #14b8a6; margin-bottom: 5px; }
            p { margin: 0 0 20px 0; font-size: 13px; color: #666; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12px; }
            th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
            th { background-color: #f3f4f6; color: #374151; font-weight: bold; }
            .status-badge { display: inline-block; padding: 3px 8px; border-radius: 4px; font-size: 10px; font-weight: bold; }
            .status-pending { background-color: #fef3c7; color: #d97706; }
            .status-in-discussion { background-color: #dbeafe; color: #2563eb; }
            .status-converted { background-color: #d1fae5; color: #059669; }
            .status-rejected { background-color: #fee2e2; color: #dc2626; }
            @media print {
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #14b8a6; padding-bottom:10px; margin-bottom:20px;">
            <div>
              <h1>NEXINFOSOFT IT SOLUTIONS</h1>
              <p>Corporate Customer Leads & Inquiries Report</p>
            </div>
            <button class="no-print" onclick="window.print()" style="background:#14b8a6; color:#fff; border:none; padding:10px 20px; border-radius:6px; font-weight:bold; cursor:pointer; font-size:13px;">
              🖨️ Print / Save as PDF
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Client Name</th>
                <th>Contact info</th>
                <th>Service Required</th>
                <th>Budget Range</th>
                <th>Workflow Status</th>
                <th>Project Objective Specs</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
          <div style="margin-top:30px; text-align:center; font-size:10px; color:#999; border-top:1px solid #eee; padding-top:10px;">
            Report generated automatically on ${new Date().toLocaleString()} | Nexinfosoft Control Panel
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin-login');
  };

  return (
    <>
      <section className="content-page" style={{ paddingTop: '130px', paddingBottom: '120px' }}>
        {(activeTab === 'sections' || activeTab === 'corporate' || activeTab === 'pages') && (
          <div className="container">
            <div className="glass-card admin-section-subnav">
              <div className="admin-section-subnav-title">
                <span>{activeTab === 'sections' ? 'Home Pages' : activeTab === 'corporate' ? 'Corporate Pages' : 'Site Pages'}</span>
              </div>
              <div className="admin-section-subnav-scroll">
                {activeTab === 'sections' ? (
                  <>
                    <button onClick={() => setActiveSection('hero')} className={`tech-tab ${activeSection === 'hero' ? 'active' : ''}`}>
                      <i className="ri-home-line"></i> Hero Banner
                    </button>
                    <button onClick={() => setActiveSection('services')} className={`tech-tab ${activeSection === 'services' ? 'active' : ''}`}>
                      <i className="ri-database-2-line"></i> Core Services Header
                    </button>
                    <button onClick={() => setActiveSection('whychooseus')} className={`tech-tab ${activeSection === 'whychooseus' ? 'active' : ''}`}>
                      <i className="ri-star-line"></i> Why Choose Us
                    </button>
                    <button onClick={() => setActiveSection('technologies')} className={`tech-tab ${activeSection === 'technologies' ? 'active' : ''}`}>
                      <i className="ri-cpu-line"></i> Technologies Stack
                    </button>
                    <button onClick={() => setActiveSection('industries')} className={`tech-tab ${activeSection === 'industries' ? 'active' : ''}`}>
                      <i className="ri-building-4-line"></i> Verticals/Industries
                    </button>
                    <button onClick={() => setActiveSection('process')} className={`tech-tab ${activeSection === 'process' ? 'active' : ''}`}>
                      <i className="ri-route-line"></i> Process Blueprint
                    </button>
                    <button onClick={() => setActiveSection('portfoliopreview')} className={`tech-tab ${activeSection === 'portfoliopreview' ? 'active' : ''}`}>
                      <i className="ri-briefcase-line"></i> Portfolio Preview Header
                    </button>
                    <button onClick={() => setActiveSection('sections_manager')} className={`tech-tab ${activeSection === 'sections_manager' ? 'active' : ''}`} style={{ borderLeft: '2px solid var(--accent)' }}>
                      <i className="ri-settings-line"></i> Section Manager
                    </button>
                  </>
                ) : activeTab === 'corporate' ? (
                  <>
                    <button onClick={() => setActiveSection('corporate_hero')} className={`tech-tab ${activeSection === 'corporate_hero' ? 'active' : ''}`}>
                      <i className="ri-flag-line"></i> Corporate Hero
                    </button>
                    <button onClick={() => setActiveSection('corporate_about')} className={`tech-tab ${activeSection === 'corporate_about' ? 'active' : ''}`}>
                      <i className="ri-building-line"></i> About Us Section
                    </button>
                    <button onClick={() => setActiveSection('corporate_mission')} className={`tech-tab ${activeSection === 'corporate_mission' ? 'active' : ''}`}>
                      <i className="ri-eye-line"></i> Mission & Vision
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setActiveSection('footer_links')} className={`tech-tab ${activeSection === 'footer_links' ? 'active' : ''}`}>
                      <i className="ri-links-line"></i> Footer Links
                    </button>
                    <button onClick={() => setActiveSection('company_profile_hero')} className={`tech-tab ${activeSection === 'company_profile_hero' ? 'active' : ''}`}>
                      <i className="ri-profile-line"></i> Company Profile
                    </button>
                    <button onClick={() => setActiveSection('company_profile_overview')} className={`tech-tab ${activeSection === 'company_profile_overview' ? 'active' : ''}`}>
                      <i className="ri-building-2-line"></i> Profile Overview
                    </button>
                    <button onClick={() => setActiveSection('company_profile_capabilities')} className={`tech-tab ${activeSection === 'company_profile_capabilities' ? 'active' : ''}`}>
                      <i className="ri-checkbox-multiple-line"></i> Capabilities
                    </button>
                    <button onClick={() => setActiveSection('company_profile_services')} className={`tech-tab ${activeSection === 'company_profile_services' ? 'active' : ''}`}>
                      <i className="ri-service-line"></i> Profile Services
                    </button>
                    <button onClick={() => setActiveSection('company_profile_strengths')} className={`tech-tab ${activeSection === 'company_profile_strengths' ? 'active' : ''}`}>
                      <i className="ri-shield-check-line"></i> Strengths
                    </button>
                    <button onClick={() => setActiveSection('company_profile_process')} className={`tech-tab ${activeSection === 'company_profile_process' ? 'active' : ''}`}>
                      <i className="ri-route-line"></i> Process
                    </button>
                    <button onClick={() => setActiveSection('company_profile_tech')} className={`tech-tab ${activeSection === 'company_profile_tech' ? 'active' : ''}`}>
                      <i className="ri-stack-line"></i> Tech Stack
                    </button>
                    <button onClick={() => setActiveSection('company_profile_quality')} className={`tech-tab ${activeSection === 'company_profile_quality' ? 'active' : ''}`}>
                      <i className="ri-verified-badge-line"></i> Quality
                    </button>
                    <button onClick={() => setActiveSection('company_profile_contact')} className={`tech-tab ${activeSection === 'company_profile_contact' ? 'active' : ''}`}>
                      <i className="ri-contacts-book-line"></i> Profile Contact
                    </button>
                    <button onClick={() => setActiveSection('privacy_policy')} className={`tech-tab ${activeSection === 'privacy_policy' ? 'active' : ''}`}>
                      <i className="ri-shield-user-line"></i> Privacy Policy
                    </button>
                    <button onClick={() => setActiveSection('terms_conditions')} className={`tech-tab ${activeSection === 'terms_conditions' ? 'active' : ''}`}>
                      <i className="ri-file-list-3-line"></i> Terms & Conditions
                    </button>
                  </>
                )}
              </div>
            </div>

            {sectionContent && (
              <div className="glass-card admin-section-preview-block">
                <div className="admin-preview-heading">
                  <span>{getSectionLabel()}</span>
                  <small>Website style live preview</small>
                </div>
                <div className="admin-preview-device">
                  {renderSectionPreview()}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="container admin-dashboard-layout">
          {/* MAIN FORM OR DATA MANAGER */}
          <div className="glass-card" style={{ padding: '34px', borderRadius: '12px', gridColumn: '1 / -1' }}>
            
            {/* Status alerts */}
            {message && (
              <div style={{ background: 'rgba(143, 184, 74, 0.1)', border: '1px solid rgba(143, 184, 74, 0.2)', color: 'var(--accent)', padding: '12px', borderRadius: '8px', fontSize: '13px', marginBottom: '20px' }}>
                <i className="ri-checkbox-circle-line" style={{ marginRight: '6px' }}></i> {message}
              </div>
            )}
            {error && (
              <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', padding: '12px', borderRadius: '8px', fontSize: '13px', marginBottom: '20px' }}>
                <i className="ri-error-warning-line" style={{ marginRight: '6px' }}></i> {error}
              </div>
            )}

            {/* =========================================================
                TAB 1 & 2: SECTIONS FORM EDITORS
                ========================================================= */}
            {(activeTab === 'sections' || activeTab === 'corporate' || activeTab === 'pages') && sectionContent && (
              <form onSubmit={handleSaveSection} style={{ display: 'grid', gap: '22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h2 style={{ fontSize: '20px', fontWeight: 800 }}>Edit {activeSection.toUpperCase().replace('_', ' ')}</h2>
                  {loading && <span style={{ fontSize: '13px', color: 'var(--primary)' }}><i className="ri-loader-4-line ri-spin"></i> Saving...</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Title / Kicker *</label>
                  <input className="form-control" type="text" value={sectionContent.title || ''} onChange={(e) => handleInputChange('title', e.target.value)} required />
                </div>

                <div className="form-group">
                  <label className="form-label">Subtitle / Badge</label>
                  <input className="form-control" type="text" value={sectionContent.subtitle || ''} onChange={(e) => handleInputChange('subtitle', e.target.value)} />
                </div>

                <div className="form-group">
                  <label className="form-label">Description Text</label>
                  <textarea className="form-control" style={{ minHeight: '100px' }} value={sectionContent.description || ''} onChange={(e) => handleInputChange('description', e.target.value)} />
                </div>

                {/* Section settings: Page, Order, Visibility */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '18px', background: 'rgba(255,255,255,0.01)', padding: '20px', borderRadius: '10px', border: '1px solid var(--border)' }}>
                  <div className="form-group">
                    <label className="form-label">Page Category *</label>
                    <select 
                      className="form-control" 
                      value={sectionContent.page || 'home'} 
                      onChange={(e) => handleInputChange('page', e.target.value)}
                      style={{ background: 'var(--bg-card)', color: 'var(--text-main)', border: '1px solid var(--border)', borderRadius: '6px', height: '42px', padding: '0 12px' }}
                      required
                    >
                      <option value="home">Home Page (home)</option>
                      <option value="corporate">Corporate Page (corporate)</option>
                      <option value="policy">Policies Page (policy)</option>
                      <option value="global">Global / Footer (global)</option>
                      <option value="company_profile">Company Profile (company_profile)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Display Order</label>
                    <input 
                      className="form-control" 
                      type="number" 
                      value={sectionContent.order !== undefined ? sectionContent.order : 0} 
                      onChange={(e) => handleInputChange('order', parseInt(e.target.value, 10) || 0)}
                      style={{ background: 'var(--bg-card)', color: 'var(--text-main)', border: '1px solid var(--border)', borderRadius: '6px', height: '42px', padding: '0 12px' }}
                    />
                  </div>
                  <div className="form-group" style={{ display: 'flex', alignItems: 'center', height: '42px', marginTop: '28px' }}>
                    <input 
                      type="checkbox" 
                      id="sectionVisibleInput" 
                      checked={sectionContent.visible !== false} 
                      onChange={(e) => handleInputChange('visible', e.target.checked)} 
                      style={{ width: '18px', height: '18px', marginRight: '8px', cursor: 'pointer' }}
                    />
                    <label htmlFor="sectionVisibleInput" style={{ cursor: 'pointer', fontSize: '13px', color: 'var(--text-main)', fontWeight: 'bold' }}>Visible on Website</label>
                  </div>
                </div>

                {/* Section Image Uploader (Editable for all photo sections!) */}
                {['hero', 'corporate_hero', 'corporate_about', 'corporate_mission'].includes(activeSection) && (
                  <div className="form-group" style={{ background: 'rgba(255,255,255,0.01)', padding: '20px', borderRadius: '10px', border: '1px dashed var(--border)' }}>
                    <label className="form-label" style={{ marginBottom: '8px', display: 'block' }}>Section Artwork / Photo (Image upload)</label>
                    {sectionContent.image_url && (
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Current Path:</span>
                        <code style={{ display: 'block', fontSize: '11px', background: 'rgba(0,0,0,0.2)', padding: '6px', margin: '4px 0', borderRadius: '4px' }}>{sectionContent.image_url}</code>
                        <img src={sectionContent.image_url} alt="preview" style={{ maxHeight: '80px', marginTop: '10px', borderRadius: '6px', border: '1px solid var(--border)' }} />
                      </div>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'image_url')} style={{ display: 'none' }} id="sectionImageUpload" />
                      <label htmlFor="sectionImageUpload" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '13px', margin: 0, cursor: 'pointer' }}>
                        <i className="ri-upload-cloud-line"></i> <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Meta-items conditional inputs for hero lists */}
                {activeSection === 'hero' && sectionContent.metadata && (
                  <div style={{ display: 'grid', gap: '18px', borderTop: '1px solid var(--border)', paddingTop: '22px' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: 700 }}>Hero Extra metadata</h4>
                    <div className="form-group">
                      <label className="form-label">Studio Kicker Tag *</label>
                      <input className="form-control" type="text" value={sectionContent.metadata.tag || ''} onChange={(e) => handleMetadataChange('tag', e.target.value)} />
                    </div>

                    <div>
                      <label className="form-label" style={{ marginBottom: '8px', display: 'block' }}>Rotating Keywords</label>
                      <div style={{ display: 'grid', gap: '10px' }}>
                        {(sectionContent.metadata.rotatingKeywords || []).map((keyword, idx) => (
                          <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <input className="form-control" type="text" value={keyword || ''} onChange={(e) => handleArrayMetadataChange('rotatingKeywords', idx, e.target.value)} placeholder={`Keyword #${idx + 1}`} />
                            <button type="button" onClick={() => removeRotatingKeyword(idx)} className="btn btn-secondary" style={{ padding: '0 12px', height: '48px', margin: 0, color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.2)', background: 'rgba(239, 68, 68, 0.05)' }} title="Remove Keyword">
                              <i className="ri-delete-bin-line"></i>
                            </button>
                          </div>
                        ))}
                      </div>
                      <button type="button" onClick={addRotatingKeyword} className="btn btn-secondary" style={{ marginTop: '12px', padding: '8px 16px', fontSize: '13px' }}>
                        <i className="ri-add-line"></i> Add Rotating Keyword
                      </button>
                    </div>
                  </div>
                )}

                {/* Metadata vertical industries for industries section */}
                {activeSection === 'industries' && sectionContent.metadata && (
                  <div style={{ display: 'grid', gap: '18px', borderTop: '1px solid var(--border)', paddingTop: '22px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>Vertical Industries List</h4>
                      <button type="button" className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', margin: 0 }} onClick={() => addMetadataArrayObject('industries', { title: 'New Industry', icon: 'ri-tools-line' })}>
                        <i className="ri-add-line"></i> Add Industry
                      </button>
                    </div>
                    
                    <div style={{ display: 'grid', gap: '12px' }}>
                      {(sectionContent.metadata.industries || []).map((industry, idx) => (
                        <div key={idx} style={{ background: 'rgba(255,255,255,0.01)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border)', display: 'grid', gridTemplateColumns: '1fr 1fr 40px', gap: '10px', alignItems: 'center' }}>
                          <div>
                            <label className="form-label" style={{ fontSize: '11px', marginBottom: '4px' }}>Industry Title *</label>
                            <input className="form-control" type="text" value={industry.title || ''} onChange={(e) => updateMetadataArrayObject('industries', idx, 'title', e.target.value)} required />
                          </div>
                          <div>
                            <label className="form-label" style={{ fontSize: '11px', marginBottom: '4px' }}>Remixicon Icon Class</label>
                            <input className="form-control" type="text" value={industry.icon || 'ri-tools-line'} onChange={(e) => updateMetadataArrayObject('industries', idx, 'icon', e.target.value)} />
                          </div>
                          <button type="button" onClick={() => removeMetadataArrayObject('industries', idx)} className="btn btn-secondary" style={{ padding: 0, height: '48px', marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.2)', background: 'rgba(239, 68, 68, 0.05)' }} title="Remove Industry">
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Metadata steps for process section */}
                {activeSection === 'process' && sectionContent.metadata && (
                  <div style={{ display: 'grid', gap: '18px', borderTop: '1px solid var(--border)', paddingTop: '22px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>Development Lifecycle Steps</h4>
                      <button type="button" className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', margin: 0 }} onClick={() => addMetadataArrayObject('steps', { number: '', name: 'New Step', text: '', tags: [] })}>
                        <i className="ri-add-line"></i> Add Step
                      </button>
                    </div>

                    <div style={{ display: 'grid', gap: '16px' }}>
                      {(sectionContent.metadata.steps || []).map((step, idx) => (
                        <div key={idx} style={{ background: 'rgba(255,255,255,0.01)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border)', display: 'grid', gap: '12px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <strong style={{ fontSize: '13px' }}>Step #{idx + 1}</strong>
                            <button type="button" onClick={() => removeMetadataArrayObject('steps', idx)} className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '11px', margin: 0, color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.2)', background: 'rgba(239, 68, 68, 0.05)' }} title="Remove Step">
                              <i className="ri-delete-bin-line"></i> Remove
                            </button>
                          </div>
                          
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '12px' }}>
                            <div>
                              <label className="form-label" style={{ fontSize: '11px' }}>Step Number</label>
                              <input className="form-control" type="text" placeholder="e.g. 01" value={step.number || ''} onChange={(e) => updateMetadataArrayObject('steps', idx, 'number', e.target.value)} />
                            </div>
                            <div>
                              <label className="form-label" style={{ fontSize: '11px' }}>Step Name *</label>
                              <input className="form-control" type="text" placeholder="e.g. Analysis" value={step.name || ''} onChange={(e) => updateMetadataArrayObject('steps', idx, 'name', e.target.value)} required />
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="form-label" style={{ fontSize: '11px' }}>Step Description</label>
                            <input className="form-control" type="text" placeholder="Explain the phase..." value={step.text || ''} onChange={(e) => updateMetadataArrayObject('steps', idx, 'text', e.target.value)} />
                          </div>

                          <div className="form-group">
                            <label className="form-label" style={{ fontSize: '11px' }}>Checklist Tags (comma-separated)</label>
                            <input 
                              className="form-control" 
                              type="text" 
                              placeholder="Scope Doc, Wireframes, Figma" 
                              value={Array.isArray(step.tags) ? step.tags.join(', ') : (step.tags || '')} 
                              onChange={(e) => updateMetadataArrayObject('steps', idx, 'tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))} 
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'pages' && sectionContent.metadata && (
                  <div className="admin-direct-page-editor">
                    <h4>Page Details</h4>

                    {activeSection === 'footer_links' && (
                      <>
                        {[
                          ['services', 'Footer Services Links'],
                          ['links', 'Footer Website Links'],
                          ['bottomLinks', 'Footer Bottom Links']
                        ].map(([key, title]) => (
                          <div className="admin-page-edit-group" key={key}>
                            <div className="admin-page-edit-heading">
                              <strong>{title}</strong>
                              <button type="button" className="btn btn-secondary" onClick={() => addMetadataArrayObject(key, { label: 'New Link', url: '/' })}>
                                <i className="ri-add-line"></i> Add Link
                              </button>
                            </div>
                            {(sectionContent.metadata?.[key] || []).map((link, idx) => (
                              <div className="admin-page-edit-row" key={`${key}-${idx}`}>
                                <div>
                                  <label className="form-label">Label</label>
                                  <input className="form-control" type="text" value={link.label || ''} onChange={(e) => updateMetadataArrayObject(key, idx, 'label', e.target.value)} />
                                </div>
                                <div>
                                  <label className="form-label">URL</label>
                                  <input className="form-control" type="text" value={link.url || ''} onChange={(e) => updateMetadataArrayObject(key, idx, 'url', e.target.value)} />
                                </div>
                                <button type="button" className="btn btn-secondary admin-remove-row-btn" onClick={() => removeMetadataArrayObject(key, idx)} title="Remove">
                                  <i className="ri-delete-bin-line"></i>
                                </button>
                              </div>
                            ))}
                          </div>
                        ))}
                      </>
                    )}

                    {(activeSection === 'privacy_policy' || activeSection === 'terms_conditions') && (
                      <div className="admin-page-edit-group">
                        <div className="admin-page-edit-heading">
                          <strong>Page Content Cards</strong>
                          <button type="button" className="btn btn-secondary" onClick={() => addMetadataArrayObject('cards', { title: 'New Section', text: '' })}>
                            <i className="ri-add-line"></i> Add Card
                          </button>
                        </div>
                        {(sectionContent.metadata?.cards || []).map((card, idx) => (
                          <div className="admin-page-card-editor" key={`card-${idx}`}>
                            <div className="admin-page-edit-heading">
                              <strong>Card #{idx + 1}</strong>
                              <button type="button" className="btn btn-secondary admin-remove-row-btn" onClick={() => removeMetadataArrayObject('cards', idx)} title="Remove">
                                <i className="ri-delete-bin-line"></i>
                              </button>
                            </div>
                            <label className="form-label">Card Title</label>
                            <input className="form-control" type="text" value={card.title || ''} onChange={(e) => updateMetadataArrayObject('cards', idx, 'title', e.target.value)} />
                            <label className="form-label">Card Text</label>
                            <textarea className="form-control" style={{ minHeight: '100px' }} value={card.text || ''} onChange={(e) => updateMetadataArrayObject('cards', idx, 'text', e.target.value)} />
                          </div>
                        ))}
                      </div>
                    )}

                    {activeSection === 'company_profile_overview' && (
                      <div className="admin-page-edit-group">
                        <div className="admin-page-edit-heading">
                          <strong>Overview Paragraphs</strong>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => handleMetadataChange('paragraphs', [...(sectionContent.metadata?.paragraphs || []), ''])}
                          >
                            <i className="ri-add-line"></i> Add Paragraph
                          </button>
                        </div>
                        {(sectionContent.metadata?.paragraphs || []).map((paragraph, idx) => (
                          <div className="admin-page-card-editor" key={`paragraph-${idx}`}>
                            <div className="admin-page-edit-heading">
                              <strong>Paragraph #{idx + 1}</strong>
                              <button
                                type="button"
                                className="btn btn-secondary admin-remove-row-btn"
                                onClick={() => {
                                  const paragraphs = [...(sectionContent.metadata?.paragraphs || [])];
                                  paragraphs.splice(idx, 1);
                                  handleMetadataChange('paragraphs', paragraphs);
                                }}
                                title="Remove"
                              >
                                <i className="ri-delete-bin-line"></i>
                              </button>
                            </div>
                            <textarea className="form-control" style={{ minHeight: '90px' }} value={paragraph || ''} onChange={(e) => handleArrayMetadataChange('paragraphs', idx, e.target.value)} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <button type="submit" className="btn btn-primary" style={{ width: '100%', height: '54px', border: 'none' }} disabled={loading}>
                  <span>{loading ? 'Saving changes...' : 'Save Section Content'}</span>
                  <i className="ri-save-line"></i>
                </button>
              </form>
            )}

            {/* =========================================================
                SECTION MANAGER TAB
                ========================================================= */}
            {activeTab === 'sections' && activeSection === 'sections_manager' && (
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '20px' }}>Master Section Manager</h2>
                <div className="admin-lead-filter-panel" style={{ display: 'block', padding: '20px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border)', borderRadius: '8px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <label style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--text-muted)' }}>Filter by Page:</label>
                      <select 
                        value={managerPageFilter} 
                        onChange={(e) => setManagerPageFilter(e.target.value)}
                        style={{ height: '38px', padding: '0 12px', background: 'var(--bg-card)', color: 'var(--text-main)', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '13px' }}
                      >
                        <option value="all">All Pages</option>
                        <option value="home">Home Page (home)</option>
                        <option value="corporate">Corporate Page (corporate)</option>
                        <option value="policy">Policies Page (policy)</option>
                        <option value="global">Global (global)</option>
                        <option value="company_profile">Company Profile (company_profile)</option>
                      </select>
                    </div>

                    <button 
                      onClick={handleAutoFixSections} 
                      className="btn btn-secondary" 
                      style={{ height: '38px', margin: 0, padding: '0 16px', background: 'rgba(20, 184, 166, 0.15)', color: 'var(--accent)', borderColor: 'rgba(20, 184, 166, 0.3)' }}
                    >
                      <i className="ri-magic-line"></i> Auto-Fix Database Sections
                    </button>
                  </div>

                  <p style={{ fontSize: '13px', margin: '0 0 16px 0', color: 'var(--text-muted)' }}>
                    Here you can view, add, hide/show, delete, and reorder sections for all pages. Toggle a section's visibility checkbox or change its order input to save changes immediately.
                  </p>
                  
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
                          <th style={{ padding: '12px' }}>ID / Type</th>
                          <th style={{ padding: '12px' }}>Title</th>
                          <th style={{ padding: '12px' }}>Page</th>
                          <th style={{ padding: '12px', width: '100px' }}>Order</th>
                          <th style={{ padding: '12px', width: '100px' }}>Visible</th>
                          <th style={{ padding: '12px', width: '160px', textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allSections
                          .filter(sec => managerPageFilter === 'all' || sec.page === managerPageFilter)
                          .sort((a,b) => {
                            if (a.page !== b.page) {
                              return a.page.localeCompare(b.page);
                            }
                            return (a.order || 0) - (b.order || 0);
                          })
                          .map((sec) => (
                            <tr key={sec._id} style={{ borderBottom: '1px solid var(--border)' }}>
                              <td style={{ padding: '12px' }}>
                                <strong>{sec._id}</strong>
                              </td>
                              <td style={{ padding: '12px' }}>{sec.title || <span style={{ color: 'var(--text-muted)' }}>No title</span>}</td>
                              <td style={{ padding: '12px' }}><span className="section-tag" style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', fontSize: '11px' }}>{sec.page}</span></td>
                              <td style={{ padding: '12px' }}>
                                <input 
                                  type="number" 
                                  className="form-control" 
                                  value={sec.order !== undefined ? sec.order : 0} 
                                  onChange={(e) => handleUpdateSectionOrder(sec, e.target.value)}
                                  style={{ width: '70px', height: '34px', padding: '0 8px', margin: 0, background: 'var(--bg-card)', color: 'var(--text-main)', border: '1px solid var(--border)', borderRadius: '6px' }}
                                />
                              </td>
                              <td style={{ padding: '12px' }}>
                                <input 
                                  type="checkbox" 
                                  checked={sec.visible !== false} 
                                  onChange={() => handleToggleSectionVisibility(sec)}
                                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                                />
                              </td>
                              <td style={{ padding: '12px', textAlign: 'right' }}>
                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                  <button 
                                    onClick={() => setActiveSection(sec._id)} 
                                    className="btn btn-secondary" 
                                    style={{ padding: '4px 10px', fontSize: '11px', height: '30px', margin: 0 }}
                                  >
                                    Edit Content
                                  </button>
                                  {!['hero', 'services', 'whychooseus', 'technologies', 'industries', 'process', 'portfoliopreview'].includes(sec._id) && (
                                    <button 
                                      onClick={() => handleDeleteSection(sec._id)} 
                                      className="btn btn-secondary" 
                                      style={{ padding: '4px 10px', fontSize: '11px', height: '30px', margin: 0, background: 'rgba(239,68,68,0.1)', color: '#ef4444', borderColor: 'rgba(239,68,68,0.2)' }}
                                    >
                                      Delete
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px' }}>Add New Custom Section</h3>
                <form onSubmit={handleAddCustomSection} style={{ display: 'grid', gap: '18px', background: 'rgba(255,255,255,0.01)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                    <div className="form-group">
                      <label className="form-label">Section ID (Unique, lowercase URL key) *</label>
                      <input 
                        className="form-control" 
                        type="text" 
                        placeholder="e.g. features-banner" 
                        value={customSectionForm._id} 
                        onChange={(e) => setCustomSectionForm(prev => ({ ...prev, _id: e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, '') }))} 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Title / Heading *</label>
                      <input 
                        className="form-control" 
                        type="text" 
                        placeholder="e.g. Scalable Tech Infrastructure" 
                        value={customSectionForm.title} 
                        onChange={(e) => setCustomSectionForm(prev => ({ ...prev, title: e.target.value }))} 
                        required 
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                    <div className="form-group">
                      <label className="form-label">Subtitle / Badge</label>
                      <input 
                        className="form-control" 
                        type="text" 
                        placeholder="e.g. ADVANCED CAPABILITIES" 
                        value={customSectionForm.subtitle} 
                        onChange={(e) => setCustomSectionForm(prev => ({ ...prev, subtitle: e.target.value }))} 
                      />
                    </div>
                    <div className="form-group" style={{ background: 'rgba(255,255,255,0.01)', padding: '20px', borderRadius: '10px', border: '1px dashed var(--border)' }}>
                      <label className="form-label" style={{ marginBottom: '8px', display: 'block' }}>Section Artwork / Photo (Image upload)</label>
                      {customSectionForm.image_url && (
                        <div style={{ marginBottom: '14px' }}>
                          <code style={{ display: 'block', fontSize: '11px', background: 'rgba(0,0,0,0.2)', padding: '6px', margin: '4px 0', borderRadius: '4px' }}>{customSectionForm.image_url}</code>
                        </div>
                      )}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'image_url', setCustomSectionForm, true)} style={{ display: 'none' }} id="customSectionImageUpload" />
                        <label htmlFor="customSectionImageUpload" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '13px', margin: 0, cursor: 'pointer' }}>
                          <i className="ri-upload-cloud-line"></i> <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Description Text</label>
                    <textarea 
                      className="form-control" 
                      style={{ minHeight: '80px' }} 
                      placeholder="Enter the body copy for this custom section..."
                      value={customSectionForm.description} 
                      onChange={(e) => setCustomSectionForm(prev => ({ ...prev, description: e.target.value }))} 
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                    <div className="form-group">
                      <label className="form-label">Display Order</label>
                      <input 
                        className="form-control" 
                        type="number" 
                        value={customSectionForm.order} 
                        onChange={(e) => setCustomSectionForm(prev => ({ ...prev, order: parseInt(e.target.value, 10) || 0 }))} 
                      />
                    </div>
                    <div className="form-group" style={{ display: 'flex', alignItems: 'center', height: '48px', marginTop: '28px' }}>
                      <input 
                        type="checkbox" 
                        id="customVisible" 
                        checked={customSectionForm.visible} 
                        onChange={(e) => setCustomSectionForm(prev => ({ ...prev, visible: e.target.checked }))} 
                        style={{ width: '18px', height: '18px', marginRight: '8px', cursor: 'pointer' }}
                      />
                      <label htmlFor="customVisible" style={{ cursor: 'pointer', fontSize: '13px' }}>Visible instantly on Website</label>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ padding: '12px 30px', border: 'none', height: '48px' }}>
                    <span>Add Custom Section</span>
                  </button>
                </form>
              </div>
            )}

            {/* =========================================================
                TAB 3: SERVICES CRUD MANAGER
                ========================================================= */}
            {activeTab === 'services' && (
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '18px' }}>
                  {editingId ? 'Edit Service' : 'Add New Service'}
                </h2>

                <div className="admin-inline-live-preview admin-inline-live-preview-top">
                  <div className="admin-preview-heading">
                    <span>Website Card Preview</span>
                    <small>Live while creating/updating</small>
                  </div>
                  {renderServiceFormPreview()}
                </div>
                
                <form onSubmit={handleServiceSubmit} style={{ display: 'grid', gap: '18px', background: 'rgba(255,255,255,0.01)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', marginBottom: '36px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                    <div className="form-group">
                      <label className="form-label">Service Slug (URL route key) *</label>
                      <input className="form-control" type="text" placeholder="e.g. custom-software-development" value={serviceForm.slug} onChange={(e) => setServiceForm(prev => ({ ...prev, slug: e.target.value }))} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Service Title *</label>
                      <input className="form-control" type="text" placeholder="e.g. Custom Software" value={serviceForm.title} onChange={(e) => setServiceForm(prev => ({ ...prev, title: e.target.value }))} required />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                    <div className="form-group">
                      <label className="form-label">Subtitle / Description kicker</label>
                      <input className="form-control" type="text" placeholder="A brief tag subtitle" value={serviceForm.subtitle} onChange={(e) => setServiceForm(prev => ({ ...prev, subtitle: e.target.value }))} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Remixicon Icon Class</label>
                      <input className="form-control" type="text" placeholder="e.g. ri-window-line" value={serviceForm.icon} onChange={(e) => setServiceForm(prev => ({ ...prev, icon: e.target.value }))} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Intro Description (Bento card short intro) *</label>
                    <textarea className="form-control" style={{ minHeight: '80px' }} value={serviceForm.intro} onChange={(e) => setServiceForm(prev => ({ ...prev, intro: e.target.value }))} required />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                    <div className="form-group">
                      <label className="form-label">Benefits Checklist (Comma separated list)</label>
                      <input className="form-control" type="text" placeholder="Responsive Design, Fast & Secure, SEO Friendly" value={serviceForm.benefits} onChange={(e) => setServiceForm(prev => ({ ...prev, benefits: e.target.value }))} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Deliverables Checklist (Comma separated list)</label>
                      <input className="form-control" type="text" placeholder="UI Mockups, REST APIs, deployment" value={serviceForm.deliverables} onChange={(e) => setServiceForm(prev => ({ ...prev, deliverables: e.target.value }))} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <button type="submit" className="btn btn-primary" style={{ padding: '12px 30px', border: 'none', height: '48px' }}>
                      <span>{editingId ? 'Update Service' : 'Add Service'}</span>
                    </button>
                    {editingId && (
                      <button type="button" onClick={() => { setEditingId(null); setServiceForm({ slug: '', title: '', subtitle: '', icon: 'ri-window-line', intro: '', benefits: '', deliverables: '', image_url: '' }); }} className="btn btn-secondary" style={{ padding: '12px 20px', height: '48px' }}>
                        Cancel
                      </button>
                    )}
                  </div>
                </form>

                <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '14px' }}>Current Services List</h3>
                <div style={{ display: 'grid', gap: '12px' }}>
                  {services.map((srv) => (
                    <div key={srv._id} className="glass-card" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid var(--border)', borderRadius: '10px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontSize: '18px', color: 'var(--accent)' }}><i className={srv.icon}></i></span>
                          <strong style={{ fontSize: '16px' }}>{srv.title}</strong>
                        </div>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>Slug: {srv.slug}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => handleEditService(srv)} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>Edit</button>
                        <button onClick={() => handleDeleteService(srv._id)} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', background: 'rgba(239,68,68,0.1)', color: '#ef4444', borderColor: 'rgba(239,68,68,0.2)' }}>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* =========================================================
                TAB 4: PROJECTS CRUD MANAGER
                ========================================================= */}
            {activeTab === 'projects' && (
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '18px' }}>
                  {editingId ? 'Edit Project' : 'Add New Portfolio Project'}
                </h2>

                <div className="admin-inline-live-preview admin-inline-live-preview-top">
                  <div className="admin-preview-heading">
                    <span>Portfolio Card Preview</span>
                    <small>Live while creating/updating</small>
                  </div>
                  {renderProjectFormPreview()}
                </div>

                <form onSubmit={handleProjectSubmit} style={{ display: 'grid', gap: '18px', background: 'rgba(255,255,255,0.01)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', marginBottom: '36px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                    <div className="form-group">
                      <label className="form-label">Project Name *</label>
                      <input className="form-control" type="text" placeholder="e.g. School Portal" value={projectForm.name} onChange={(e) => setProjectForm(prev => ({ ...prev, name: e.target.value }))} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Project Category *</label>
                      <select className="form-control" style={{ background: 'var(--bg-card)', color: 'var(--text-main)', border: '1px solid var(--border)', borderRadius: '6px', height: '48px', padding: '0 12px' }} value={projectForm.category} onChange={(e) => setProjectForm(prev => ({ ...prev, category: e.target.value }))} required>
                        <option value="web">Web Application</option>
                        <option value="mobile">Mobile App</option>
                        <option value="erp">ERP System</option>
                        <option value="crm">CRM Solution</option>
                        <option value="ai">AI Solution</option>
                        <option value="ecommerce">E-Commerce Platform</option>
                        <option value="real-estate">Real Estate</option>
                        <option value="healthcare">Healthcare</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                    <div className="form-group">
                      <label className="form-label">Project Tag (Industry label)</label>
                      <input className="form-control" type="text" placeholder="e.g. Enterprise ERP" value={projectForm.tag} onChange={(e) => setProjectForm(prev => ({ ...prev, tag: e.target.value }))} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Technologies (Comma separated list)</label>
                      <input className="form-control" type="text" placeholder="React, Node.js, MongoDB" value={projectForm.techs} onChange={(e) => setProjectForm(prev => ({ ...prev, techs: e.target.value }))} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Description Text</label>
                    <textarea className="form-control" style={{ minHeight: '80px' }} value={projectForm.desc} onChange={(e) => setProjectForm(prev => ({ ...prev, desc: e.target.value }))} />
                  </div>

                  {/* Dynamic image uploader for Projects! */}
                  <div className="form-group" style={{ background: 'rgba(255,255,255,0.01)', padding: '20px', borderRadius: '10px', border: '1px dashed var(--border)' }}>
                    <label className="form-label" style={{ marginBottom: '8px', display: 'block' }}>Project Screenshot / Poster</label>
                    {projectForm.image_url && (
                      <div style={{ marginBottom: '14px' }}>
                        <code style={{ display: 'block', fontSize: '11px', background: 'rgba(0,0,0,0.2)', padding: '6px', margin: '4px 0', borderRadius: '4px' }}>{projectForm.image_url}</code>
                        <img src={projectForm.image_url} alt="preview" style={{ maxHeight: '80px', marginTop: '10px', borderRadius: '6px', border: '1px solid var(--border)' }} />
                      </div>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'image_url', setProjectForm, true)} style={{ display: 'none' }} id="projectImageUpload" />
                      <label htmlFor="projectImageUpload" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '13px', margin: 0, cursor: 'pointer' }}>
                        <i className="ri-upload-cloud-line"></i> <span>{uploading ? 'Uploading...' : 'Upload Screenshot'}</span>
                      </label>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <button type="submit" className="btn btn-primary" style={{ padding: '12px 30px', border: 'none', height: '48px' }}>
                      <span>{editingId ? 'Update Project' : 'Add Project'}</span>
                    </button>
                    {editingId && (
                      <button type="button" onClick={() => { setEditingId(null); setProjectForm({ name: '', category: 'web', tag: '', techs: '', desc: '', icon: 'ri-briefcase-4-line', image_url: '' }); }} className="btn btn-secondary" style={{ padding: '12px 20px', height: '48px' }}>
                        Cancel
                      </button>
                    )}
                  </div>
                </form>

                <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '14px' }}>Current Portfolio Projects</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                  {projects.map((proj) => (
                    <div key={proj._id} className="glass-card" style={{ padding: '18px', border: '1px solid var(--border)', borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyBetween: 'space-between' }}>
                      <div>
                        {proj.image_url && (
                          <img src={proj.image_url} alt="project thumbnail" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px', marginBottom: '12px', border: '1px solid var(--border)' }} />
                        )}
                        <strong style={{ fontSize: '16px', display: 'block' }}>{proj.name}</strong>
                        <span style={{ fontSize: '11px', color: 'var(--accent)', background: 'rgba(20,184,166,0.1)', padding: '2px 8px', borderRadius: '4px', display: 'inline-block', marginTop: '6px' }}>
                          {proj.category.toUpperCase()}
                        </span>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>{proj.desc?.slice(0, 80)}...</p>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                        <button onClick={() => handleEditProject(proj)} className="btn btn-secondary" style={{ flex: 1, padding: '6px 0', fontSize: '12px' }}>Edit</button>
                        <button onClick={() => handleDeleteProject(proj._id)} className="btn btn-secondary" style={{ flex: 1, padding: '6px 0', fontSize: '12px', background: 'rgba(239,68,68,0.1)', color: '#ef4444', borderColor: 'rgba(239,68,68,0.2)' }}>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* =========================================================
                TAB 5: TECH STACK CRUD MANAGER
                ========================================================= */}
            {activeTab === 'techstack' && (
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '18px' }}>
                  {editingId ? 'Edit Tech Stack Item' : 'Add New Technology Item'}
                </h2>

                <div className="admin-inline-live-preview admin-inline-live-preview-top">
                  <div className="admin-preview-heading">
                    <span>Tech Card Preview</span>
                    <small>Live while creating/updating</small>
                  </div>
                  {renderTechFormPreview()}
                </div>

                <form onSubmit={handleTechSubmit} style={{ display: 'grid', gap: '18px', background: 'rgba(255,255,255,0.01)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', marginBottom: '36px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                    <div className="form-group">
                      <label className="form-label">Technology Name *</label>
                      <input className="form-control" type="text" placeholder="e.g. React" value={techForm.name} onChange={(e) => setTechForm(prev => ({ ...prev, name: e.target.value }))} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Category Group *</label>
                      <select 
                        className="form-control" 
                        style={{ background: 'var(--bg-card)', color: 'var(--text-main)', border: '1px solid var(--border)', borderRadius: '6px', height: '48px', padding: '0 12px' }} 
                        value={techForm.category} 
                        onChange={(e) => {
                          const val = e.target.value;
                          setTechForm(prev => ({ ...prev, category: val }));
                          if (val === 'custom') {
                            setShowCustomCategory(true);
                          } else {
                            setShowCustomCategory(false);
                          }
                        }} 
                        required
                      >
                        <option value="frontend">Frontend</option>
                        <option value="backend">Backend</option>
                        <option value="mobile">Mobile</option>
                        <option value="database">Database</option>
                        <option value="cloud">Cloud & DevOps</option>
                        <option value="ai">AI & Analytics</option>
                        <option value="custom">+ Add Custom Category...</option>
                      </select>
                    </div>
                  </div>

                  {showCustomCategory && (
                    <div className="form-group" style={{ marginTop: '-4px' }}>
                      <label className="form-label">Custom Category Group Name *</label>
                      <input 
                        className="form-control" 
                        type="text" 
                        placeholder="e.g. cybersecurity, blockchain, testing" 
                        value={customCategory} 
                        onChange={(e) => setCustomCategory(e.target.value)} 
                        required 
                      />
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                    <div className="form-group">
                      <label className="form-label">Remixicon Icon Class</label>
                      <input className="form-control" type="text" placeholder="e.g. ri-reactjs-line" value={techForm.icon} onChange={(e) => setTechForm(prev => ({ ...prev, icon: e.target.value }))} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Custom Styling Accent Color</label>
                      <input className="form-control" type="text" placeholder="rgba(20, 184, 166, 0.1)" value={techForm.color} onChange={(e) => setTechForm(prev => ({ ...prev, color: e.target.value }))} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Description / Feature Summary</label>
                    <textarea className="form-control" style={{ minHeight: '60px' }} value={techForm.desc} onChange={(e) => setTechForm(prev => ({ ...prev, desc: e.target.value }))} />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '11px' }}>Best For</label>
                      <input className="form-control" type="text" placeholder="Dynamic Web Apps" value={techForm.bestFor} onChange={(e) => setTechForm(prev => ({ ...prev, bestFor: e.target.value }))} />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '11px' }}>Projects</label>
                      <input className="form-control" type="text" placeholder="SPA, Dashboards" value={techForm.projects} onChange={(e) => setTechForm(prev => ({ ...prev, projects: e.target.value }))} />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '11px' }}>Performance Score</label>
                      <input className="form-control" type="text" placeholder="e.g. 99%" value={techForm.performance} onChange={(e) => setTechForm(prev => ({ ...prev, performance: e.target.value }))} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <button type="submit" className="btn btn-primary" style={{ padding: '12px 30px', border: 'none', height: '48px' }}>
                      <span>{editingId ? 'Update Tech Item' : 'Add Tech Item'}</span>
                    </button>
                    {editingId && (
                      <button 
                        type="button" 
                        onClick={() => { 
                          setEditingId(null); 
                          setTechForm({ category: 'frontend', name: '', icon: 'ri-code-line', desc: '', color: 'rgba(20, 184, 166, 0.1)', bestFor: '', projects: '', performance: '95%' }); 
                          setCustomCategory('');
                          setShowCustomCategory(false);
                        }} 
                        className="btn btn-secondary" 
                        style={{ padding: '12px 20px', height: '48px' }}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>

                <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '14px' }}>Current Technologies List</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
                  {techItems.map((tech) => (
                    <div key={tech._id} className="glass-card" style={{ padding: '14px', border: '1px solid var(--border)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ color: 'var(--accent)' }}><i className={tech.icon}></i></span>
                          <strong style={{ fontSize: '14px' }}>{tech.name}</strong>
                        </div>
                        <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>Category: {tech.category}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button onClick={() => handleEditTech(tech)} className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '11px' }}>Edit</button>
                        <button onClick={() => handleDeleteTech(tech._id)} className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '11px', background: 'rgba(239,68,68,0.1)', color: '#ef4444', borderColor: 'rgba(239,68,68,0.2)' }}>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* =========================================================
                TAB 6: LEADS/INQUIRIES CRUD MANAGER
                ========================================================= */}
            {activeTab === 'leads' && (() => {
              const filteredLeads = leads.filter(lead => {
                if (leadFilter === 'all') return true;
                return (lead.status || 'pending') === leadFilter;
              });

              const getStatusStyle = (status) => {
                const s = status || 'pending';
                if (s === 'converted') return { bg: 'rgba(143,184,74,0.1)', color: 'var(--accent)' };
                if (s === 'rejected') return { bg: 'rgba(239,68,68,0.1)', color: '#ef4444' };
                if (s === 'in-discussion') return { bg: 'rgba(59,130,246,0.1)', color: '#3b82f6' };
                return { bg: 'rgba(245,158,11,0.1)', color: '#f59e0b' };
              };

              return (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '14px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 800, margin: 0 }}>Customer Leads & Inquiries</h2>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button onClick={handleDownloadPDF} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '12px', border: 'none', background: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <i className="ri-file-pdf-line"></i> Download Leads PDF
                      </button>
                      <button onClick={loadLeads} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '12px' }}>
                        <i className="ri-refresh-line"></i> Refresh
                      </button>
                    </div>
                  </div>

                  {/* Filter controls */}
                  <div className="glass-card admin-lead-filter-panel">
                    <span>STATUS FILTER:</span>
                    <button onClick={() => setLeadFilter('all')} className={`tech-tab ${leadFilter === 'all' ? 'active' : ''}`}>
                      All Leads ({leads.length})
                    </button>
                    <button onClick={() => setLeadFilter('pending')} className={`tech-tab ${leadFilter === 'pending' ? 'active' : ''}`}>
                      Pending ({leads.filter(l => (l.status || 'pending') === 'pending').length})
                    </button>
                    <button onClick={() => setLeadFilter('in-discussion')} className={`tech-tab ${leadFilter === 'in-discussion' ? 'active' : ''}`}>
                      In Discussion ({leads.filter(l => l.status === 'in-discussion').length})
                    </button>
                    <button onClick={() => setLeadFilter('converted')} className={`tech-tab ${leadFilter === 'converted' ? 'active' : ''}`}>
                      Converted ({leads.filter(l => l.status === 'converted').length})
                    </button>
                    <button onClick={() => setLeadFilter('rejected')} className={`tech-tab ${leadFilter === 'rejected' ? 'active' : ''}`}>
                      Rejected ({leads.filter(l => l.status === 'rejected').length})
                    </button>
                  </div>

                  {filteredLeads.length === 0 ? (
                    <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border)', borderRadius: '12px', padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                      <i className="ri-inbox-archive-line" style={{ fontSize: '36px', display: 'block', marginBottom: '10px', color: 'var(--accent)' }}></i>
                      <p>No leads found matching the selected filter status.</p>
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gap: '16px' }}>
                      {filteredLeads.map((lead) => {
                        const statusStyle = getStatusStyle(lead.status);
                        return (
                          <div key={lead._id} className="glass-card" style={{ padding: '24px', border: '1px solid var(--border)', borderRadius: '12px', display: 'grid', gap: '14px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', alignItems: 'flex-start', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                              <div>
                                <strong style={{ fontSize: '18px', display: 'block' }}>{lead.fullName}</strong>
                                {lead.companyName && (
                                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Company: {lead.companyName}</span>
                                )}
                              </div>
                              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                                <span style={{ fontSize: '11px', color: 'var(--accent)', background: 'rgba(20,184,166,0.1)', padding: '4px 10px', borderRadius: '6px', fontWeight: 600 }}>
                                  {lead.service}
                                </span>
                                <span style={{ fontSize: '11px', color: 'var(--primary)', background: 'rgba(143,184,74,0.1)', padding: '4px 10px', borderRadius: '6px', fontWeight: 600 }}>
                                  {lead.budget}
                                </span>
                                
                                <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginLeft: '8px' }}>Status:</span>
                                <select
                                  value={lead.status || 'pending'}
                                  onChange={(e) => handleUpdateLeadStatus(lead._id, e.target.value)}
                                  style={{ 
                                    background: statusStyle.bg,
                                    color: statusStyle.color,
                                    border: '1px solid var(--border)', 
                                    padding: '4px 8px', 
                                    borderRadius: '6px', 
                                    fontSize: '11px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    outline: 'none'
                                  }}
                                >
                                  <option value="pending" style={{ background: 'var(--bg-card)', color: '#f59e0b' }}>Pending</option>
                                  <option value="in-discussion" style={{ background: 'var(--bg-card)', color: '#3b82f6' }}>In Discussion</option>
                                  <option value="converted" style={{ background: 'var(--bg-card)', color: 'var(--accent)' }}>Converted</option>
                                  <option value="rejected" style={{ background: 'var(--bg-card)', color: '#ef4444' }}>Rejected</option>
                                </select>
                              </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', fontSize: '13px' }}>
                              <div>
                                <span style={{ color: 'var(--text-muted)', display: 'block' }}>Email Address</span>
                                <a href={`mailto:${lead.email}`} style={{ color: 'var(--accent)', textDecoration: 'underline' }}>{lead.email}</a>
                              </div>
                              <div>
                                <span style={{ color: 'var(--text-muted)', display: 'block' }}>Phone Number</span>
                                <a href={`tel:${lead.phone}`} style={{ color: 'var(--accent)', textDecoration: 'underline' }}>{lead.phone}</a>
                              </div>
                              <div>
                                <span style={{ color: 'var(--text-muted)', display: 'block' }}>Submitted On</span>
                                <span style={{ color: 'var(--text-main)' }}>{new Date(lead.createdAt).toLocaleString()}</span>
                              </div>
                            </div>

                            <div style={{ background: 'rgba(0,0,0,0.15)', padding: '14px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                              <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', textTransform: 'uppercase', fontWeight: 700 }}>Project Details</span>
                              <p style={{ fontSize: '13px', margin: 0, whiteSpace: 'pre-wrap', lineHeight: '1.5', color: 'var(--text-main)' }}>{lead.details}</p>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
                              <a href={`mailto:${lead.email}?subject=Regarding your Inquiry at Nexinfosoft`} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', margin: 0 }}>
                                <i className="ri-mail-send-line"></i> Email Client
                              </a>
                              <a href={`tel:${lead.phone}`} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', margin: 0 }}>
                                <i className="ri-phone-line"></i> Call Client
                              </a>
                              <button onClick={() => handleDeleteLead(lead._id)} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', margin: 0, background: 'rgba(239,68,68,0.1)', color: '#ef4444', borderColor: 'rgba(239,68,68,0.2)' }}>
                                <i className="ri-delete-bin-line"></i> Delete
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })()}

          </div>
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
