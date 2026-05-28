import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const TechStack = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('frontend');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['frontend', 'backend', 'mobile', 'database', 'cloud', 'ai'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => el.classList.add('active'));
    window.scrollTo(0, 0);
  }, [activeTab]);

  const handleTabClick = (tabKey) => {
    setActiveTab(tabKey);
  };

  return (
    <>
      <div className="page-hero">
        <div className="container reveal slide-up">
          <h1 className="page-hero-title">Technology Stack</h1>
          <p className="page-hero-desc">Requirement-based technology selection for secure, scalable, and maintainable digital products.</p>
        </div>
      </div>

      <section className="technology-stack-section">
        <div className="container">
          <div className="tech-stack-intro reveal slide-up">
            <div>
              <span className="section-tag">Technology Stack</span>
              <h2 className="section-title">Requirement-Based Technology Selection</h2>
              <p className="section-desc">
                Nexinfosoft selects technologies based on your business goals, performance needs, integration scope, and long-term scalability.
              </p>
            </div>
            <div className="tech-stack-badge">
              <i className="ri-sparkling-line"></i>
              <span>Custom Stack For Every Project</span>
            </div>
          </div>

          <div className="tech-stack-panel reveal slide-up delay-100">
            <div className="tech-tabs" role="tablist" aria-label="Technology categories">
              <button 
                className={`tech-tab ${activeTab === 'frontend' ? 'active' : ''}`} 
                type="button" 
                onClick={() => handleTabClick('frontend')}
              >
                <i className="ri-layout-4-line"></i>
                <span>Frontend</span>
              </button>
              <button 
                className={`tech-tab ${activeTab === 'backend' ? 'active' : ''}`} 
                type="button" 
                onClick={() => handleTabClick('backend')}
              >
                <i className="ri-server-line"></i>
                <span>Backend</span>
              </button>
              <button 
                className={`tech-tab ${activeTab === 'mobile' ? 'active' : ''}`} 
                type="button" 
                onClick={() => handleTabClick('mobile')}
              >
                <i className="ri-smartphone-line"></i>
                <span>Mobile</span>
              </button>
              <button 
                className={`tech-tab ${activeTab === 'database' ? 'active' : ''}`} 
                type="button" 
                onClick={() => handleTabClick('database')}
              >
                <i className="ri-database-2-line"></i>
                <span>Database</span>
              </button>
              <button 
                className={`tech-tab ${activeTab === 'cloud' ? 'active' : ''}`} 
                type="button" 
                onClick={() => handleTabClick('cloud')}
              >
                <i className="ri-cloud-line"></i>
                <span>Cloud & DevOps</span>
              </button>
              <button 
                className={`tech-tab ${activeTab === 'ai' ? 'active' : ''}`} 
                type="button" 
                onClick={() => handleTabClick('ai')}
              >
                <i className="ri-brain-line"></i>
                <span>AI & Analytics</span>
              </button>
            </div>

            <div className="tech-tab-content">
              {activeTab === 'frontend' && (
                <div className="tech-card-grid active">
                  <article className="tech-info-card"><i className="ri-reactjs-line"></i><h3>ReactJS</h3><p>Best for fast, scalable, and interactive web applications.</p><small>Use for: Admin panels, dashboards, SaaS platforms, CRM, ERP frontend, dynamic websites.</small><div><span>Scalable</span><span>Fast</span><span>Modern</span></div></article>
                  <article className="tech-info-card"><i className="ri-angularjs-line"></i><h3>Angular</h3><p>Best for enterprise-grade applications with strong architecture.</p><small>Use for: Large business systems, ERP software, enterprise dashboards, complex portals.</small><div><span>Enterprise</span><span>Structured</span><span>Robust</span></div></article>
                  <article className="tech-info-card"><i className="ri-vuejs-line"></i><h3>Vue.js</h3><p>Best for lightweight and high-performance UI development.</p><small>Use for: Landing pages, small business apps, modern interfaces, quick MVPs.</small><div><span>Lightweight</span><span>Fast</span><span>MVP</span></div></article>
                  <article className="tech-info-card"><i className="ri-html5-line"></i><h3>HTML5</h3><p>Best for building the structure of modern websites.</p><small>Use for: Website layouts, forms, content structure, SEO-friendly pages.</small><div><span>Semantic</span><span>SEO</span><span>Core</span></div></article>
                  <article className="tech-info-card"><i className="ri-css3-line"></i><h3>CSS3</h3><p>Best for designing attractive and responsive interfaces.</p><small>Use for: Animations, layouts, responsive design, visual styling.</small><div><span>Responsive</span><span>Visual</span><span>Animated</span></div></article>
                  <article className="tech-info-card"><i className="ri-javascript-line"></i><h3>JavaScript</h3><p>Best for dynamic and interactive web experiences.</p><small>Use for: User interactions, sliders, forms, API calls, animations.</small><div><span>Dynamic</span><span>Interactive</span><span>Flexible</span></div></article>
                  <article className="tech-info-card"><i className="ri-code-s-slash-line"></i><h3>TypeScript</h3><p>Best for scalable and maintainable development.</p><small>Use for: Enterprise apps, large React/Angular projects, safer coding structure.</small><div><span>Typed</span><span>Maintainable</span><span>Safe</span></div></article>
                  <article className="tech-info-card"><i className="ri-palette-line"></i><h3>TailwindCSS</h3><p>Best for modern custom UI design with faster development.</p><small>Use for: SaaS websites, dashboards, premium UI, responsive systems.</small><div><span>Custom</span><span>Fast UI</span><span>Modern</span></div></article>
                  <article className="tech-info-card"><i className="ri-bootstrap-line"></i><h3>Bootstrap</h3><p>Best for rapid responsive website development.</p><small>Use for: Business websites, admin panels, quick UI prototypes.</small><div><span>Rapid</span><span>Responsive</span><span>Prototype</span></div></article>
                </div>
              )}

              {activeTab === 'backend' && (
                <div className="tech-card-grid active">
                  <article className="tech-info-card"><i className="ri-code-box-line"></i><h3>PHP</h3><p>Best for server-side web development and dynamic websites.</p><small>Use for: Business portals, CMS systems, custom web applications.</small><div><span>Stable</span><span>Dynamic</span><span>Web</span></div></article>
                  <article className="tech-info-card"><i className="ri-shield-keyhole-line"></i><h3>Laravel</h3><p>Best for secure and scalable PHP application development.</p><small>Use for: CRM, ERP, ecommerce systems, admin panels, APIs.</small><div><span>Secure</span><span>Scalable</span><span>APIs</span></div></article>
                  <article className="tech-info-card"><i className="ri-nodejs-line"></i><h3>Node.js</h3><p>Best for fast and real-time backend systems.</p><small>Use for: APIs, chat applications, booking systems, scalable backend services.</small><div><span>Realtime</span><span>Fast</span><span>API</span></div></article>
                  <article className="tech-info-card"><i className="ri-terminal-box-line"></i><h3>Python</h3><p>Best for AI, automation, and data-driven applications.</p><small>Use for: Machine learning, automation tools, analytics systems, backend services.</small><div><span>AI-ready</span><span>Automation</span><span>Data</span></div></article>
                  <article className="tech-info-card"><i className="ri-leaf-line"></i><h3>Spring Boot</h3><p>Best for enterprise-level backend architecture.</p><small>Use for: Large business systems, banking software, enterprise APIs.</small><div><span>Enterprise</span><span>Robust</span><span>Secure</span></div></article>
                  <article className="tech-info-card"><i className="ri-cup-line"></i><h3>Java</h3><p>Best for high-performance and secure enterprise applications.</p><small>Use for: Enterprise software, Android systems, backend processing.</small><div><span>Secure</span><span>Performant</span><span>Enterprise</span></div></article>
                  <article className="tech-info-card"><i className="ri-route-line"></i><h3>REST APIs</h3><p>Best for communication between applications and platforms.</p><small>Use for: Mobile apps, frontend-backend integration, third-party services.</small><div><span>Connected</span><span>Reusable</span><span>Integrations</span></div></article>
                </div>
              )}

              {activeTab === 'mobile' && (
                <div className="tech-card-grid active">
                  <article className="tech-info-card"><i className="ri-flutter-line"></i><h3>Flutter</h3><p>Best for building high-performance cross-platform apps from a single codebase.</p><small>Use for: Android & iOS apps, business apps, ecommerce apps, modern UI apps.</small><div><span>Cross-platform</span><span>Fast</span><span>Modern</span></div></article>
                  <article className="tech-info-card"><i className="ri-reactjs-line"></i><h3>React Native</h3><p>Best for native-feeling mobile apps with faster development.</p><small>Use for: Android & iOS apps, startup MVPs, scalable mobile applications.</small><div><span>Native feel</span><span>MVP</span><span>Scalable</span></div></article>
                  <article className="tech-info-card"><i className="ri-android-line"></i><h3>Android</h3><p>Best for apps focused on Android ecosystem users.</p><small>Use for: Android mobile applications, enterprise mobility solutions.</small><div><span>Android</span><span>Enterprise</span><span>Native</span></div></article>
                  <article className="tech-info-card"><i className="ri-apple-line"></i><h3>iOS</h3><p>Best for premium Apple ecosystem applications.</p><small>Use for: iPhone & iPad applications, secure business apps, premium mobile solutions.</small><div><span>Premium</span><span>Secure</span><span>Native</span></div></article>
                </div>
              )}

              {activeTab === 'database' && (
                <div className="tech-card-grid active">
                  <article className="tech-info-card"><i className="ri-database-line"></i><h3>MySQL</h3><p>Best for structured and reliable relational databases.</p><small>Use for: ERP, CRM, ecommerce, billing systems, business applications.</small><div><span>Reliable</span><span>Structured</span><span>Business</span></div></article>
                  <article className="tech-info-card"><i className="ri-database-2-line"></i><h3>PostgreSQL</h3><p>Best for advanced and high-performance relational databases.</p><small>Use for: Enterprise systems, analytics platforms, scalable applications.</small><div><span>Advanced</span><span>Scalable</span><span>Analytics</span></div></article>
                  <article className="tech-info-card"><i className="ri-leaf-line"></i><h3>MongoDB</h3><p>Best for flexible and scalable NoSQL data storage.</p><small>Use for: Real-time apps, dynamic systems, SaaS platforms, mobile backend.</small><div><span>NoSQL</span><span>Flexible</span><span>Realtime</span></div></article>
                  <article className="tech-info-card"><i className="ri-fire-line"></i><h3>Firebase</h3><p>Best for real-time databases and quick backend integration.</p><small>Use for: Mobile apps, authentication, notifications, live applications.</small><div><span>Realtime</span><span>Auth</span><span>Quick</span></div></article>
                </div>
              )}

              {activeTab === 'cloud' && (
                <div className="tech-card-grid active">
                  <article className="tech-info-card"><i className="ri-box-3-line"></i><h3>Docker</h3><p>Best for containerized and portable application deployment.</p><small>Use for: Server deployment, scalable hosting, microservices architecture.</small><div><span>Portable</span><span>Containers</span><span>Scalable</span></div></article>
                  <article className="tech-info-card"><i className="ri-settings-5-line"></i><h3>Jenkins</h3><p>Best for automated development and deployment workflows.</p><small>Use for: CI/CD pipelines, automated testing, deployment automation.</small><div><span>Automated</span><span>CI/CD</span><span>DevOps</span></div></article>
                  <article className="tech-info-card"><i className="ri-github-line"></i><h3>GitHub</h3><p>Best for version control and collaborative development.</p><small>Use for: Source code management, team collaboration, project repositories.</small><div><span>Versioning</span><span>Teams</span><span>Code</span></div></article>
                  <article className="tech-info-card"><i className="ri-loop-left-line"></i><h3>CI/CD</h3><p>Best for automated build, testing, and deployment processes.</p><small>Use for: Faster releases, DevOps workflows, continuous deployment.</small><div><span>Release</span><span>Testing</span><span>Pipeline</span></div></article>
                  <article className="tech-info-card"><i className="ri-server-line"></i><h3>VPS Deployment</h3><p>Best for dedicated and customizable server hosting.</p><small>Use for: Web hosting, business applications, custom server environments.</small><div><span>Dedicated</span><span>Custom</span><span>Hosting</span></div></article>
                  <article className="tech-info-card"><i className="ri-cloud-line"></i><h3>Cloud Deployment</h3><p>Best for scalable, secure, and high-availability infrastructure.</p><small>Use for: SaaS platforms, enterprise apps, global application hosting.</small><div><span>Secure</span><span>Available</span><span>Global</span></div></article>
                </div>
              )}

              {activeTab === 'ai' && (
                <div className="tech-card-grid active">
                  <article className="tech-info-card"><i className="ri-brain-line"></i><h3>AI/ML</h3><p>Best for intelligent automation and predictive systems.</p><small>Use for: Chatbots, recommendation systems, automation, smart analytics.</small><div><span>Smart</span><span>Predictive</span><span>Modern</span></div></article>
                  <article className="tech-info-card"><i className="ri-robot-2-line"></i><h3>Automation</h3><p>Best for reducing manual work through smart workflows.</p><small>Use for: Business process automation, repetitive task management, integrations.</small><div><span>Efficient</span><span>Workflow</span><span>Integrations</span></div></article>
                  <article className="tech-info-card"><i className="ri-bar-chart-box-line"></i><h3>Power BI</h3><p>Best for advanced business intelligence and reporting dashboards.</p><small>Use for: Data visualization, analytics reports, performance monitoring.</small><div><span>BI</span><span>Dashboards</span><span>Reports</span></div></article>
                  <article className="tech-info-card"><i className="ri-line-chart-line"></i><h3>Data Analytics</h3><p>Best for extracting insights and improving business decisions.</p><small>Use for: Reporting systems, customer analysis, growth tracking, business intelligence.</small><div><span>Insights</span><span>Growth</span><span>Tracking</span></div></article>
                </div>
              )}
            </div>
          </div>

          <div className="tech-stack-cta reveal slide-up delay-200">
            <div>
              <h3>Not sure which technology is right for your project?</h3>
              <p>Our team can suggest a practical stack after reviewing your scope, users, integrations, and budget.</p>
            </div>
            <Link to="/contact" className="btn btn-primary">Get Free Consultation</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default TechStack;
