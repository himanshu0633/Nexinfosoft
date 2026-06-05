const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load Mongoose models
const User = require('../models/User');
const SectionContent = require('../models/SectionContent');
const Service = require('../models/Service');
const Project = require('../models/Project');
const TechItem = require('../models/TechItem');
const projectDetails = require('../scripts/seedProjectDetails');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nexinfosoft';
const DB_CONNECT_TIMEOUT_MS = Number(process.env.DB_CONNECT_TIMEOUT_MS || 5000);

mongoose.set('bufferCommands', false);

const dbState = {
  isConnected: false,
  error: null,
  uri: maskMongoUri(MONGODB_URI)
};

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: DB_CONNECT_TIMEOUT_MS
})
  .then(async () => {
    dbState.isConnected = true;
    dbState.error = null;
    console.log('Successfully connected to MongoDB database.');
    await initializeDatabase();
  })
  .catch((err) => {
    dbState.isConnected = false;
    dbState.error = err.message;
    console.error('MongoDB connection failed:', err.message);
    console.error(getMongoConnectionHelp(err, MONGODB_URI));
  });

mongoose.connection.on('disconnected', () => {
  dbState.isConnected = false;
});

mongoose.connection.on('connected', () => {
  dbState.isConnected = true;
  dbState.error = null;
});

function maskMongoUri(uri) {
  return uri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@');
}

function getMongoConnectionHelp(err, uri) {
  if (uri.startsWith('mongodb+srv://') && /querySrv|ENOTFOUND|ECONNREFUSED/.test(err.message)) {
    return [
      'Atlas DNS lookup failed for the mongodb+srv URI.',
      'Fix: use a working internet/DNS connection for Atlas, or set MONGODB_URI=mongodb://localhost:27017/nexinfosoft and start local MongoDB.'
    ].join(' ');
  }

  if (uri.startsWith('mongodb://localhost') || uri.startsWith('mongodb://127.0.0.1')) {
    return 'Local MongoDB is not reachable. Start MongoDB locally, then restart the backend.';
  }

  return 'Check MONGODB_URI, network access, Atlas IP allowlist, and database credentials.';
}

async function initializeDatabase() {
  try {
    // 1. Seed Default Admin User
    const adminUser = await User.findOne({ username: 'admin' });
    if (!adminUser) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        username: 'admin',
        password: hashedPassword
      });
      console.log('Default admin user successfully seeded (username: admin, password: admin123)');
    }

    // 2. Seed Default Section Contents
    // 2. Seed Default Section Contents
    const sections = [
      {
        _id: 'hero',
        title: 'Build Scalable',
        subtitle: 'For Modern Teams',
        description: 'Nexinfosoft designs high-performance SaaS platforms, ERP systems, mobile apps, CRM workflows, and AI automation tools that help modern businesses move faster, reduce manual work, and unlock measurable growth.',
        image_url: '/assets/images/web_dev_poster.png',
        page: 'home',
        order: 0,
        visible: true,
        metadata: {
          tag: 'AI Powered Digital Transformation Studio',
          rotatingKeywords: ['ERP Systems', 'AI Automation', 'SaaS Platforms', 'Mobile Apps', 'CRM Solutions'],
          trustPills: ['Secure Architecture', 'Fast Delivery', 'Growth Focused'],
          stats: [
            { label: 'Digital projects', value: '100+' },
            { label: 'Business clients', value: '50+' },
            { label: 'Delivery health', value: '99%' }
          ]
        }
      },
      {
        _id: 'services',
        title: 'Everything Your Business Needs To Build,',
        subtitle: 'Scale & Automate',
        description: 'From web apps to AI automation, we deliver secure and scalable digital solutions that help your business grow faster, operate smarter, and launch with confidence.',
        image_url: '',
        page: 'home',
        order: 1,
        visible: true,
        metadata: {
          badge: 'Core Services',
          capabilityStack: {
            kicker: 'Digital Capability Stack',
            title: 'Enterprise delivery console for modern product teams',
            description: 'End-to-end planning, design, development, cloud deployment, QA, security and optimization under one reliable delivery system.'
          }
        }
      },
      {
        _id: 'whychooseus',
        title: 'Why Global Businesses Choose',
        subtitle: 'Nexinfosoft',
        description: 'We align engineering with business outcomes through structured planning, secure implementation, clear reporting, and dependable support.',
        image_url: '',
        page: 'home',
        order: 2,
        visible: true,
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
      {
        _id: 'technologies',
        title: 'Requirement-Based Technology Selection',
        subtitle: 'Technology Stack',
        description: 'We choose tools around business goals, integrations, performance requirements, and long-term maintainability.',
        image_url: '',
        page: 'home',
        order: 3,
        visible: true,
        metadata: {}
      },
      {
        _id: 'industries',
        title: 'Custom Ecosystems Built For Core Industries',
        subtitle: 'Our Verticals',
        description: 'We build purpose-driven architectures tailored for operational requirements across sectors.',
        image_url: '',
        page: 'home',
        order: 4,
        visible: true,
        metadata: {
          industries: [
            { title: 'Healthcare', icon: 'ri-heart-pulse-line' },
            { title: 'Real Estate', icon: 'ri-home-4-line' },
            { title: 'Education', icon: 'ri-book-open-line' },
            { title: 'E-commerce', icon: 'ri-shopping-cart-2-line' },
            { title: 'Restaurants', icon: 'ri-restaurant-2-line' },
            { title: 'Finance', icon: 'ri-bank-line' },
            { title: 'Government', icon: 'ri-government-line' },
            { title: 'Manufacturing', icon: 'ri-tools-line' }
          ]
        }
      },
      {
        _id: 'process',
        title: 'Our Structured Software Creation Lifecycle',
        subtitle: 'Workflow Blueprint',
        description: 'We maintain transparent, structured development timelines to ensure projects are delivered on time and within scope.',
        image_url: '',
        page: 'home',
        order: 5,
        visible: true,
        metadata: {
          steps: [
            { number: '01', name: 'Analysis', text: 'Understanding system flows and detailed scope.', tags: ['Scope Doc', 'Flowcharts'] },
            { number: '02', name: 'UI/UX Design', text: 'Creating wireframes and interactive mockups.', tags: ['Figma UI', 'Wireframes'] },
            { number: '03', name: 'Coding', text: 'Frontend, backend, APIs, and integrations.', tags: ['Clean Code', 'APIs          .'] },
            { number: '04', name: 'Testing', text: 'Functional, performance, and responsive QA.', tags: ['QA Report', 'Bug Fixes'] },
            { number: '05', name: 'Deployment', text: 'Publishing systems to secure hosting.', tags: ['Live Server', 'SSL Setup'] },
            { number: '06', name: 'Support', text: 'Ongoing tuning, patches, and feature updates.', tags: ['Uptime Check', 'Updates'] }
          ]
        }
      },
      {
        _id: 'portfoliopreview',
        title: 'Digital Products Built For Real Operations',
        subtitle: 'Recent Work',
        description: 'A quick look at specialized software categories our team designs, builds, and maintains.',
        image_url: '',
        page: 'home',
        order: 6,
        visible: true,
        metadata: {}
      },
      {
        _id: 'corporate_hero',
        title: 'Fastest Way To Grow Your Business Is Being With Us.',
        subtitle: 'UNIQUE OUTCOMES FROM EXPERIENCED DEVELOPERS',
        description: 'We strive to provide highly customized and reliable IT solutions for various business aspects.',
        image_url: '/assets/images/corporate_hero.png',
        page: 'corporate',
        order: 0,
        visible: true,
        metadata: {}
      },
      {
        _id: 'corporate_about',
        title: 'Top Class IT Services Provider',
        subtitle: 'ABOUT US',
        description: 'Nexinfosoft is a full-service Digital agency based in India. We are professional, experienced and forward thinking, and our great strength is decoding our client\'s needs into effective solutions.',
        image_url: '/assets/images/corporate_about.png',
        page: 'corporate',
        order: 1,
        visible: true,
        metadata: {
          paragraphs: [
            "Nexinfosoft is a full-service Digital agency based in India. We are professional, experienced and forward thinking, and our great strength is decoding our client's needs into effective solutions.",
            "We live in the digital gamut and stay there round the clock to address your needs. We are uncommonly unique because we build tomorrow by developing premium brands, web portals and mobile apps seeing the future.",
            "We integrate marketing and branding with digital innovations. At Nexinfosoft, we believe in bringing more with a persistent search for triumph, and we begin where other agencies stop."
          ]
        }
      },
      {
        _id: 'corporate_mission',
        title: 'Functional Websites That Move Businesses Forward',
        subtitle: 'OUR MISSION',
        description: 'To deliver the most functional and attractive websites to our clients and help them take their businesses to the next level.',
        image_url: '/assets/images/corporate_mission.png',
        page: 'corporate',
        order: 2,
        visible: true,
        metadata: {
          vision: {
            title: 'Innovative And Dedicated IT Solutions',
            desc: 'To provide clients with the most innovative and dedicated IT solutions through continuous learning efforts.'
          }
        }
      },
      {
        _id: 'about_hero',
        title: 'Empowering Businesses Through Technology',
        subtitle: 'ABOUT NEXINFOSOFT',
        description: 'We build enterprise-grade software architectures, premium web systems, and custom workflow automations designed to scale operations and unlock new market values.',
        image_url: '',
        page: 'pages',
        order: 10,
        visible: true,
        metadata: {}
      },
      {
        _id: 'about_overview',
        title: 'A Modern Technological Solutions Agency Built on Predictability',
        subtitle: 'COMPANY OVERVIEW',
        description: 'Nexinfosoft IT Solutions provides enterprise-grade technology services for organizations that require clear documentation, structured execution, and measurable outcomes. We support business and government teams with custom software development, mobile application deployment, ERP solutions, and digital transformation. Our approach merges agile developmental practices with rigorous quality assurance checks, ensuring your business platforms scale smoothly across critical performance spikes.',
        image_url: '',
        page: 'pages',
        order: 11,
        visible: true,
        metadata: {
          stats: [
            { label: 'Years Experience', value: '10+' },
            { label: 'Projects Completed', value: '300+' },
            { label: 'Happy Clients', value: '250+' },
            { label: 'Experts In-house', value: '50+' }
          ]
        }
      },
      {
        _id: 'about_partner',
        title: 'A Unified Platform Built For Scaling Technology Assets',
        subtitle: 'SOFTWARE DEVELOPMENT PARTNER',
        description: 'We design and program customized digital ecosystems that streamline core business processes. Over the years, we have emerged as a trusted technology engineering partner.',
        image_url: '',
        page: 'pages',
        order: 12,
        visible: true,
        metadata: {
          checklist: ['Web Apps', 'Mobile Apps', 'ERP Systems', 'Cloud Solutions', 'AI Automation']
        }
      },
      {
        _id: 'about_why',
        title: 'Why Organizations Partner With Nexinfosoft',
        subtitle: 'DELIVERY STRENGTHS',
        description: 'Our delivery framework prioritizes structural predictability, complete security pipelines, and direct transparency.',
        image_url: '',
        page: 'pages',
        order: 13,
        visible: true,
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
      },
      {
        _id: 'about_lifecycle',
        title: 'Structured Project Lifecycle',
        subtitle: 'DEVELOPMENT PROCESS',
        description: 'Our structured path maps out product design and system engineering milestones to maximize predictability.',
        image_url: '',
        page: 'pages',
        order: 14,
        visible: true,
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
      },
      {
        _id: 'about_qa',
        title: 'Verification And Quality Assurance Framework',
        subtitle: 'QUALITY CONTROL',
        description: 'Every software build undergoes rigorous, automated and manual checks to ensure complete system performance and absolute security.',
        image_url: '',
        page: 'pages',
        order: 15,
        visible: true,
        metadata: {
          cards: [
            { title: 'Unit Testing', text: 'Validation of separate micro-modules to eliminate regression vulnerabilities.', icon: 'ri-checkbox-circle-line' },
            { title: 'Integration Testing', text: 'Validation of system pipelines, API nodes, and database connections.', icon: 'ri-checkbox-circle-line' },
            { title: 'Security Testing', text: 'Continuous secure code scans, threat checks, and vulnerability resolution.', icon: 'ri-checkbox-circle-line' },
            { title: 'Performance Testing', text: 'Stress evaluations under simulated client traffic peaks to optimize latency.', icon: 'ri-checkbox-circle-line' },
            { title: 'UAT (User Acceptance)', text: 'Collaborative beta rounds, client review sessions, and system sign-off.', icon: 'ri-checkbox-circle-line' }
          ]
        }
      },
      {
        _id: 'about_values',
        title: 'The Foundation Behind Every Line of Code',
        subtitle: 'OUR VALUES',
        description: 'Our decisions and structural engineering plans are driven by professional principles to ensure client success.',
        image_url: '',
        page: 'pages',
        order: 17,
        visible: true,
        metadata: {
          cards: [
            { title: 'Integrity', text: 'We commit to absolute intellectual property ownership, detailed contracts, and complete developmental transparency.', icon: 'ri-shield-keyhole-line' },
            { title: 'Innovation', text: 'We consistently inject modern tools, cloud structures, and AI workflows to maximize product shelf life.', icon: 'ri-lightbulb-line' },
            { title: 'Customer Success', text: 'Direct communication paths with scrum managers, weekly status presentations, and standard operations handover checklists.', icon: 'ri-user-heart-line' }
          ]
        }
      },
      {
        _id: 'about_achievements',
        title: 'Trusted Delivery Metrics',
        subtitle: 'ACHIEVEMENTS',
        description: 'We consistently deliver projects on time, within budget, and to the highest quality standards.',
        image_url: '',
        page: 'pages',
        order: 18,
        visible: true,
        metadata: {
          stats: [
            { label: 'Projects Delivered', value: '100+' },
            { label: 'International Clients', value: '50+' },
            { label: 'Active Support Desk', value: '24/7' },
            { label: 'Code Ownership', value: '100%' }
          ]
        }
      },
      {
        _id: 'about_cta',
        title: 'Let\'s Build Something <br /> <span class="gradient-text-accent">Amazing Together</span>',
        subtitle: 'CTA',
        description: 'Discuss your technical layout, database design, or core system flow with a senior solutions architect today.',
        image_url: '',
        page: 'pages',
        order: 19,
        visible: true,
        metadata: {}
      },
      {
        _id: 'faqs',
        title: 'Frequently Asked Questions',
        subtitle: 'FAQS',
        description: 'Clear answers about project scope, pricing, delivery, support, and maintenance.',
        image_url: '',
        page: 'pages',
        order: 20,
        visible: true,
        metadata: {
          items: [
            { question: 'What services does Nexinfosoft provide?', answer: 'We provide website development, web applications, mobile apps, CRM, ERP, UI/UX, cloud deployment, hosting, maintenance, and digital marketing services.' },
            { question: 'How much does a website or app cost?', answer: 'Cost depends on pages, features, integrations, design complexity, and support needs. After a free consultation, we share a practical estimate with scope and timeline.' },
            { question: 'Do you provide maintenance after launch?', answer: 'Yes. We can provide bug fixes, backups, hosting support, performance checks, content updates, and feature enhancements after deployment.' },
            { question: 'Can you redesign an existing website?', answer: 'Yes. We can improve layout, speed, responsiveness, SEO structure, content flow, and conversion points while keeping your business identity intact.' },
            { question: 'Do you build custom ERP or CRM software?', answer: 'Yes. We design role-based dashboards, reports, approvals, inventory, lead management, billing workflows, and custom modules as per your operations.' },
            { question: 'How do we start?', answer: 'Share your requirement through the free consultation form or contact page. We will discuss scope, suggest features, and prepare a roadmap.' }
          ]
        }
      },
      {
        _id: 'company_profile_hero',
        title: 'Nexinfosoft IT Solutions',
        subtitle: 'Enterprise Web & Software Solutions',
        description: 'Trusted technology partner for business and government organizations. We provide structured web, mobile, ERP, enterprise software, AI/ML and digital transformation services with clear documentation and measurable outcomes.',
        image_url: '',
        page: 'company_profile',
        order: 0,
        visible: true,
        metadata: {}
      },
      {
        _id: 'company_profile_overview',
        title: 'About Nexinfosoft IT Solutions',
        subtitle: 'COMPANY OVERVIEW',
        description: 'Nexinfosoft IT Solutions provides enterprise-grade technology services for organizations that require clear documentation, structured execution, and measurable outcomes.',
        image_url: '',
        page: 'company_profile',
        order: 1,
        visible: true,
        metadata: {
          paragraphs: [
            'We support business and government teams with web development, mobile applications, ERP solutions, enterprise software, AI/ML capabilities, and digital transformation services.',
            'Our delivery approach combines agile methodology with strong quality assurance, secure deployment support, and transparent reporting, ensuring stakeholders maintain confidence throughout the engagement lifecycle.'
          ],
          competencies: [
            { title: 'Delivery Focus', text: 'Structured planning, sprint execution, and predictable milestones.' },
            { title: 'Quality Assurance', text: 'Functional, performance, and security validation across releases.' },
            { title: 'Enterprise Support', text: 'Deployment, handover, and documentation aligned to audit requirements.' }
          ]
        }
      },
      {
        _id: 'company_profile_capabilities',
        title: 'Business & Technology Scope',
        subtitle: 'CORE CAPABILITIES',
        description: 'Business and technology capabilities covered by Nexinfosoft.',
        image_url: '',
        page: 'company_profile',
        order: 2,
        visible: true,
        metadata: {
          capabilities: [
            'Web Applications', 'Mobile Solutions', 'ERP Development', 'Cloud Integration',
            'API Development', 'UI/UX Design', 'AI Solutions', 'DevOps Support',
            'Performance Optimization', 'Security Focused', 'Custom Software', 'Digital Transformation',
            'Agile Delivery', 'QA Tested', 'Enterprise Ready', 'Scalable Architecture'
          ]
        }
      },
      {
        _id: 'company_profile_services',
        title: 'Service Capabilities And Scope',
        subtitle: 'CORE SERVICES',
        description: 'Service capabilities available for business and government technology requirements.',
        image_url: '',
        page: 'company_profile',
        order: 3,
        visible: true,
        metadata: {
          services: [
            { icon: 'ri-window-line', title: 'Web Applications', text: 'Secure, responsive web platforms with performance optimization and governance-ready documentation.' },
            { icon: 'ri-smartphone-line', title: 'Mobile Solutions', text: 'Business-grade applications with role-based access and scalable backend integration.' },
            { icon: 'ri-briefcase-4-line', title: 'ERP Development', text: 'Process automation for finance, HR, inventory, and operations with audit-friendly controls.' },
            { icon: 'ri-lock-password-line', title: 'Enterprise Software', text: 'Custom enterprise software with secure APIs and maintainable architecture.' },
            { icon: 'ri-line-chart-line', title: 'Digital Marketing', text: 'SEO and performance marketing with measurable reporting aligned to brand guidelines.' },
            { icon: 'ri-sparkling-line', title: 'AI & Automation', text: 'Practical AI/ML and workflow automation for analytics and operational efficiency.' }
          ]
        }
      },
      {
        _id: 'company_profile_strengths',
        title: 'Why Organizations Partner With Nexinfosoft',
        subtitle: 'DELIVERY STRENGTHS',
        description: 'Structured delivery strengths and governance-focused execution.',
        image_url: '',
        page: 'company_profile',
        order: 4,
        visible: true,
        metadata: {
          strengths: [
            { title: 'Agile Methodology', text: 'Sprint planning, backlog control, and stakeholder alignment.' },
            { title: 'Sprint Based Delivery', text: 'Incremental releases to reduce risk and enable timely reviews.' },
            { title: 'Dedicated Team', text: 'Focused engineering and QA resources for project scope.' },
            { title: 'Regular Reporting', text: 'Weekly status, metrics, and action items for decision makers.' },
            { title: 'Deployment Support', text: 'Environment setup, release checklists, and operations handover.' },
            { title: 'QA & Security Testing', text: 'Functional validation and security hardening per best practices.' }
          ]
        }
      },
      {
        _id: 'company_profile_process',
        title: 'Structured Project Lifecycle',
        subtitle: 'DEVELOPMENT PROCESS',
        description: 'A structured delivery process from requirement analysis to support and maintenance.',
        image_url: '',
        page: 'company_profile',
        order: 5,
        visible: true,
        metadata: {
          steps: [
            { number: '01', title: 'Requirement Analysis', text: 'Stakeholder interviews, scope definition, and feasibility review.' },
            { number: '02', title: 'BRD / SRS Documentation', text: 'Business requirements and functional specification preparation.' },
            { number: '03', title: 'UI / UX Design', text: 'Wireframes, prototypes, and approval-ready interface designs.' },
            { number: '04', title: 'Development', text: 'Sprint execution with demos, code reviews, and progress tracking.' },
            { number: '05', title: 'Testing', text: 'QA cycles, defect management, and security validation.' },
            { number: '06', title: 'Deployment', text: 'Release execution, monitoring setup, and stakeholder handover.' },
            { number: '07', title: 'Support & Maintenance', text: 'Ongoing support, enhancements, and post-deployment assistance.' }
          ]
        }
      },
      {
        _id: 'company_profile_tech',
        title: 'Requirement-Based Technology Selection',
        subtitle: 'TECHNOLOGY STACK',
        description: 'Technology choices are finalized according to security, scale, maintainability, timeline, and integration needs.',
        image_url: '',
        page: 'company_profile',
        order: 6,
        visible: true,
        metadata: {
          techs: [
            { label: 'Frontend Technologies', value: 'ReactJS, Angular, Vue.js, HTML5, CSS3, JavaScript, TypeScript, TailwindCSS, Bootstrap' },
            { label: 'Backend Technologies', value: 'PHP, Laravel, Node.js, Python, Spring Boot, Java, REST APIs' },
            { label: 'Mobile Technologies', value: 'Flutter, React Native, Android, iOS' },
            { label: 'Database Technologies', value: 'MySQL, PostgreSQL, MongoDB, Firebase' },
            { label: 'Cloud & DevOps', value: 'Docker, Jenkins, GitHub, CI/CD, VPS & Cloud Deployment' },
            { label: 'AI & Analytics', value: 'AI/ML, Automation, Power BI, Data Analytics' }
          ]
        }
      },
      {
        _id: 'company_profile_quality',
        title: 'Verification And Assurance Framework',
        subtitle: 'QUALITY & TESTING',
        description: 'Quality checks and validation framework for reliable releases.',
        image_url: '',
        page: 'company_profile',
        order: 7,
        visible: true,
        metadata: {
          checks: [
            { title: 'Unit Testing', text: 'Validate core modules and reduce regression risk.' },
            { title: 'Load Testing', text: 'Assess concurrency, throughput, and stability under load.' },
            { title: 'Automation Testing', text: 'Repeatable suites for critical workflows and acceptance criteria.' },
            { title: 'Security Testing', text: 'Secure coding validation and vulnerability assessment.' },
            { title: 'UAT', text: 'User acceptance planning, defect triage, and release sign-off.' }
          ]
        }
      },
      {
        _id: 'company_profile_contact',
        title: 'For project enquiries and tender discussions',
        subtitle: 'CONTACT INFORMATION',
        description: 'To discuss project requirements, timelines, or compliance needs, please contact Nexinfosoft IT Solutions.',
        image_url: '',
        page: 'company_profile',
        order: 8,
        visible: true,
        metadata: {
          phone: '+91 99995 30797',
          email: 'info@nexinfosoft.com',
          website: 'nexinfosoft.com'
        }
      },
      {
        _id: 'contact_hero',
        title: 'Inquire About Your System',
        subtitle: 'GET IN TOUCH',
        description: 'Complete our strategic scope form to coordinate a free technical consultation.',
        image_url: '',
        page: 'contact',
        order: 0,
        visible: true,
        metadata: {}
      },
      {
        _id: 'contact_methods',
        title: 'Direct Connection Channels',
        subtitle: 'CONTACT METHODS',
        description: 'Reach out to our engineering desks directly for immediate response times.',
        image_url: '',
        page: 'contact',
        order: 1,
        visible: true,
        metadata: {
          methods: [
            {
              title: 'Phone Support',
              detail: '+91 99995 30797',
              sub: 'Direct calling helpdesk',
              icon: 'ri-phone-line',
              color: 'linear-gradient(135deg, #14b8a6, #0d9488)',
              link: 'tel:+919999530797'
            },
            {
              title: 'Email Support',
              detail: 'info@nexinfosoft.com',
              sub: 'Urgent project scopes',
              icon: 'ri-mail-line',
              color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
              link: 'mailto:info@nexinfosoft.com'
            },
            {
              title: 'WhatsApp Chat',
              detail: 'Instant Response',
              sub: 'Chat live with an expert',
              icon: 'ri-whatsapp-line',
              color: 'linear-gradient(135deg, #10b981, #059669)',
              link: 'https://wa.me/919999530797'
            },
            {
              title: 'Office Address',
              detail: 'Gurugram, Haryana, India',
              sub: 'Stop by our design center',
              icon: 'ri-map-pin-line',
              color: 'linear-gradient(135deg, #f59e0b, #d97706)',
              link: 'https://maps.google.com'
            }
          ]
        }
      },
      {
        _id: 'contact_why',
        title: 'Why Organizations Partner With Nexinfosoft',
        subtitle: 'WHY NEXINFOSOFT',
        description: 'We merge modern architectural frameworks with strategic business development objectives.',
        image_url: '',
        page: 'contact',
        order: 2,
        visible: true,
        metadata: {
          cards: [
            { title: '10+ Years Experience', desc: 'A decade of delivering bulletproof enterprise software architectures globally.', icon: 'ri-award-line' },
            { title: '300+ Projects Delivered', desc: 'Custom resource systems, portal networks, and apps driving active business scales.', icon: 'ri-flashlight-line' },
            { title: '250+ Happy Clients', desc: 'Validated by long-term partner retainers and high-end agency reviews.', icon: 'ri-team-line' },
            { title: '24/7 Dedicated Support', desc: 'Direct access to senior developers and quick system maintenance SLA cycles.', icon: 'ri-customer-service-2-line' },
            { title: '100% Code Ownership', desc: 'You retain complete ownership of the repository code and database setups.', icon: 'ri-folder-keyhole-line' },
            { title: 'Dedicated Tech Team', desc: 'Certified full-stack engineers and creative designers locked to your scope.', icon: 'ri-group-line' }
          ]
        }
      },
      {
        _id: 'contact_timeline',
        title: 'Project Discussion Process',
        subtitle: 'OUR ROADMAP',
        description: 'A highly strategic workflow built to capture your objectives accurately from the very first call.',
        image_url: '',
        page: 'contact',
        order: 3,
        visible: true,
        metadata: {
          steps: [
            { step: '01', title: 'Submit Inquiry', desc: 'Submit your requirements brief and technical objectives via our glass form.' },
            { step: '02', title: 'Requirement Discussion', desc: 'A senior software architect contacts you within 4 hours to review systems.' },
            { step: '03', title: 'Proposal & Planning', desc: 'We deliver a structured project blueprint, roadmap schedule, and transparent price plans.' },
            { step: '04', title: 'Development Starts', desc: 'Our dedicated engineers start building your modules with clean codes.' },
            { step: '05', title: 'Delivery & Support', desc: 'Your system goes live with complete AWS configurations and support.' }
          ]
        }
      },
      {
        _id: 'contact_faqs',
        title: 'Frequently Asked Questions',
        subtitle: 'QUESTIONS',
        description: 'Have questions regarding NDAs, project timelines, support agreements, or billing models? Explore our quick resources.',
        image_url: '',
        page: 'contact',
        order: 4,
        visible: true,
        metadata: {
          items: [
            { question: 'How quickly do you respond?', answer: 'We respond to all direct contact inquiries and custom system scopes within 4 hours. You will receive a call from a dedicated strategic technology architect.' },
            { question: 'Do you sign Non-Disclosure Agreements (NDAs)?', answer: 'Absolutely. We respect your proprietary processes and business intelligence. We execute strict standard NDAs before scoping detailed layouts.' },
            { question: 'Do you provide maintenance and hosting support?', answer: 'Yes, we handle complete server migrations, setup AWS / Vercel networks, configure backups, and offer ongoing technical support packages.' },
            { question: 'Can you work internationally?', answer: 'Yes! Nexinfosoft works with startups and established business groups across North America, Europe, the Middle East, and Asia.' },
            { question: 'What industries do you specialize in?', answer: 'We engineer robust solutions for Healthcare, Real Estate, E-Commerce, Logistics, Finance, Enterprise ERPs, and B2B SaaS portals.' }
          ]
        }
      },
      {
        _id: 'consultation_hero',
        title: 'Free IT & Business Consultation',
        subtitle: 'CONSULTATION',
        description: 'Get a clear, practical roadmap for your website, app, CRM, ERP, automation, or digital marketing requirement.',
        image_url: '',
        page: 'consultation',
        order: 0,
        visible: true,
        metadata: {}
      },
      {
        _id: 'consultation_info',
        title: 'A focused discovery call before you invest',
        subtitle: 'WHAT YOU GET',
        description: 'We review your idea, business goal, required pages or features, technology fit, timeline, and expected budget range. The result is a simple action plan your team can understand.',
        image_url: '',
        page: 'consultation',
        order: 1,
        visible: true,
        metadata: {
          checklist: [
            'Website or app feature planning',
            'Technology and hosting guidance',
            'Budget and timeline estimate',
            'SEO, conversion, and launch suggestions'
          ]
        }
      }
    ];


    for (const section of sections) {
      const existing = await SectionContent.findById(section._id);
      if (!existing) {
        await SectionContent.create(section);
        console.log(`Seeded section content: ${section._id}`);
      } else {
        let hasChanges = false;
        if (existing.order === undefined || (existing.order === 0 && section.order !== 0)) {
          existing.order = section.order;
          hasChanges = true;
        }
        if (existing.page === undefined || existing.page !== section.page) {
          existing.page = section.page;
          hasChanges = true;
        }
        if (existing.visible === undefined) {
          existing.visible = section.visible;
          hasChanges = true;
        }
        if (!existing.metadata || Object.keys(existing.metadata).length === 0) {
          existing.metadata = section.metadata;
          hasChanges = true;
        }
        if (hasChanges) {
          await existing.save();
          console.log(`Updated section config: ${section._id}`);
        }
      }
    }

    // 3. Seed Default Services
    const servicesCount = await Service.countDocuments();
    if (servicesCount === 0) {
      const defaultServices = [
        {
          slug: 'business-website',
          title: 'Business Website',
          subtitle: 'A refined, trust-building website for service businesses, consultants, local brands, and growing companies.',
          icon: 'ri-window-line',
          intro: 'We design business websites that explain your services clearly, build credibility, and convert visitors into genuine enquiries.',
          benefits: [
            'Creates a professional first impression for your brand',
            'Helps customers understand your services quickly',
            'Generates calls, WhatsApp messages, and form leads',
            'Improves Google presence with SEO-ready structure'
          ],
          deliverables: ['Responsive pages', 'Lead enquiry forms', 'Service sections', 'SEO basics', 'Speed optimization', 'Launch support'],
          image_url: ''
        },
        {
          slug: 'ecommerce-website',
          title: 'E-Commerce Website',
          subtitle: 'Online stores built for product discovery, secure checkout, and smooth order management.',
          icon: 'ri-shopping-bag-3-line',
          intro: 'We build e-commerce websites that help businesses sell products online with clean catalogs, payment flows, and easy admin control.',
          benefits: [
            'Opens a 24/7 digital sales channel',
            'Makes product browsing and checkout simple',
            'Reduces manual order handling',
            'Supports offers, inventory, and customer growth'
          ],
          deliverables: ['Product catalog', 'Cart and checkout', 'Payment gateway', 'Order dashboard', 'Coupon setup', 'Mobile shopping flow'],
          image_url: ''
        },
        {
          slug: 'custom-web-development',
          title: 'Custom Web Development',
          subtitle: 'Tailored web platforms for dashboards, portals, workflows, and unique business requirements.',
          icon: 'ri-code-s-slash-line',
          intro: 'We create custom web systems for teams that need more than a standard website, including portals, dashboards, and workflow tools.',
          benefits: [
            'Fits your exact business process',
            'Automates repeated manual work',
            'Centralizes important data and users',
            'Scales better as operations grow'
          ],
          deliverables: ['Custom UI', 'Backend APIs', 'Admin panel', 'User roles', 'Reports', 'Secure deployment'],
          image_url: ''
        },
        {
          slug: 'mobile-applications',
          title: 'Mobile Applications',
          subtitle: 'Android, iOS, and cross-platform mobile apps for customers, staff, and business operations.',
          icon: 'ri-smartphone-line',
          intro: 'We build mobile apps that keep your customers and teams connected through fast, reliable, and easy-to-use digital experiences.',
          benefits: [
            'Keeps your brand on the customer device',
            'Improves customer engagement and retention',
            'Enables real-time alerts and updates',
            'Supports business workflows from anywhere'
          ],
          deliverables: ['App UI/UX', 'Android/iOS build', 'API integration', 'Push notifications', 'Login system', 'Store publishing support'],
          image_url: ''
        },
        {
          slug: 'branding-graphic-design',
          title: 'Branding & Graphic Design',
          subtitle: 'Identity, social creatives, brochures, and visual systems that make your business look consistent.',
          icon: 'ri-palette-line',
          intro: 'We create brand visuals that make your business look polished across website, social media, sales material, and campaigns.',
          benefits: [
            'Builds stronger brand recall',
            'Makes marketing material look consistent',
            'Improves trust before a customer talks to you',
            'Supports campaigns with professional creatives'
          ],
          deliverables: ['Logo support', 'Brand colors', 'Social posts', 'Brochures', 'Ad creatives', 'Business collateral'],
          image_url: ''
        },
        {
          slug: 'video-editing-promotional-content',
          title: 'Video Editing & Promotional Content',
          subtitle: 'Reels, promotional videos, product explainers, and campaign-ready content for digital platforms.',
          icon: 'ri-movie-2-line',
          intro: 'We edit promotional videos that explain your offer, improve social presence, and help your audience remember your business.',
          benefits: [
            'Makes your message easier to understand',
            'Improves social media engagement',
            'Helps products and services feel more premium',
            'Supports ads, launches, and sales campaigns'
          ],
          deliverables: ['Reels editing', 'Promo videos', 'Motion text', 'Sound cleanup', 'Thumbnail support', 'Platform-ready exports'],
          image_url: ''
        },
        {
          slug: 'digital-marketing',
          title: 'Digital Marketing',
          subtitle: 'SEO, campaigns, content planning, and lead generation built around measurable business growth.',
          icon: 'ri-megaphone-line',
          intro: 'We plan and run digital marketing activities that increase visibility, attract leads, and improve your customer acquisition flow.',
          benefits: [
            'Brings more relevant visitors to your business',
            'Improves lead generation and enquiry quality',
            'Tracks performance with measurable reporting',
            'Supports long-term brand and search growth'
          ],
          deliverables: ['SEO planning', 'Campaign setup', 'Content calendar', 'Lead tracking', 'Analytics', 'Monthly reporting'],
          image_url: ''
        },
        {
          slug: 'erp-development',
          title: 'ERP Development',
          subtitle: 'Custom ERP systems for inventory, finance, HR, approvals, operations, and reporting.',
          icon: 'ri-database-2-line',
          intro: 'We build ERP systems that bring scattered operations into one controlled platform for better visibility and faster decisions.',
          benefits: [
            'Reduces duplicate manual data entry',
            'Improves control over operations and approvals',
            'Gives owners and managers real-time reports',
            'Creates a scalable system for growing teams'
          ],
          deliverables: ['ERP modules', 'Role access', 'Inventory flow', 'Finance reports', 'Approval workflow', 'Audit logs'],
          image_url: ''
        },
        {
          slug: 'custom-crm-development',
          title: 'Custom CRM Development',
          subtitle: 'Lead, sales, follow-up, customer support, and reporting systems tailored to your team.',
          icon: 'ri-customer-service-2-line',
          intro: 'We build CRM platforms that help your sales and support teams manage leads, follow-ups, customers, and performance from one place.',
          benefits: [
            'Prevents leads from getting missed',
            'Improves sales follow-up discipline',
            'Tracks customer conversations and status',
            'Gives clear visibility into team performance'
          ],
          deliverables: ['Lead dashboard', 'Follow-up reminders', 'Customer records', 'Sales pipeline', 'Team reports', 'Role permissions'],
          image_url: ''
        },
        {
          slug: 'mvp-development',
          title: 'MVP Development',
          subtitle: 'Fast, focused product builds for startups and businesses that need to validate an idea.',
          icon: 'ri-rocket-line',
          intro: 'We build MVPs that focus on the core product idea, so you can launch faster, collect feedback, and improve with less waste.',
          benefits: [
            'Launches your idea faster with core features',
            'Reduces upfront development cost',
            'Helps validate market demand early',
            'Creates a base for future product scaling'
          ],
          deliverables: ['Feature planning', 'Prototype UI', 'Core product build', 'Admin basics', 'Testing', 'Launch roadmap'],
          image_url: ''
        }
      ];

      await Service.insertMany(defaultServices);
      console.log('Default services successfully seeded in MongoDB.');
    }

    // 4. Seed Default Projects
    const projectsCount = await Project.countDocuments();
    if (projectsCount === 0) {
      const defaultProjects = [
        {
          name: 'Clinic Management System',
          ...projectDetails['Clinic Management System'],
          category: 'healthcare',
          tag: 'Healthcare',
          techs: ['React', 'Node.js', 'MongoDB'],
          desc: 'Cloud patient logs dashboard, doctor scheduler calendar, automated digital invoices, and secure records storage.',
          icon: 'ri-heart-pulse-line',
          image_url: '/assets/images/analytics_mockup.png'
        },
        {
          name: 'Real Estate Portal',
          ...projectDetails['Real Estate Portal'],
          category: 'real-estate',
          tag: 'Real Estate',
          techs: ['Next.js', 'MongoDB', 'AWS'],
          desc: 'High speed property search engine, interactive spatial maps, and direct client inquiry funnels.',
          icon: 'ri-home-4-line',
          image_url: '/assets/images/portal_mockup.png'
        },
        {
          name: 'ERP Management System',
          ...projectDetails['ERP Management System'],
          category: 'erp',
          tag: 'Enterprise ERP',
          techs: ['React', 'Laravel', 'MySQL'],
          desc: 'Centralized resource system tracking inventory logs, employee logs, billing workflows, and approval streams.',
          icon: 'ri-database-2-line',
          image_url: '/assets/images/erp_mockup.png'
        },
        {
          name: 'E-Commerce Platform',
          ...projectDetails['E-Commerce Platform'],
          category: 'ecommerce',
          tag: 'E-Commerce',
          techs: ['React', 'Node.js', 'MongoDB'],
          desc: 'Dynamic catalog shop, shopping cart, payment gateway checkout, and automatic email transaction setups.',
          icon: 'ri-shopping-bag-3-line',
          image_url: '/assets/images/ecommerce_mockup.png'
        },
        {
          name: 'CRM Dashboard',
          ...projectDetails['CRM Dashboard'],
          category: 'crm',
          tag: 'CRM Solutions',
          techs: ['React', 'Node.js', 'PostgreSQL'],
          desc: 'Interactive sales pipelines, lead cards tracker, team target graphs, and automated email follow-up alerts.',
          icon: 'ri-contacts-line',
          image_url: ''
        },
        {
          name: 'Restaurant Booking App',
          ...projectDetails['Restaurant Booking App'],
          category: 'mobile',
          tag: 'Mobile Apps',
          techs: ['Flutter', 'Node.js', 'Firebase'],
          desc: 'High performance restaurant booking app featuring live interactive seat layouts and calendar schedules.',
          icon: 'ri-restaurant-line',
          image_url: '/assets/images/mobile_mockup.png'
        },
        {
          name: 'Hyperlocal Delivery App',
          ...projectDetails['Hyperlocal Delivery App'],
          category: 'mobile',
          tag: 'Mobile Apps',
          techs: ['React Native', 'Node.js', 'Redis'],
          desc: 'Instant delivery request tracking, live driver GPS navigation coordinates, and automatic SMS pushes.',
          icon: 'ri-truck-line',
          image_url: ''
        },
        {
          name: 'School ERP',
          ...projectDetails['School ERP'],
          category: 'erp',
          tag: 'Enterprise ERP',
          techs: ['Angular', 'Java', 'PostgreSQL'],
          desc: 'Centralized educational database, fee management workflows, report cards, and student records vaults.',
          icon: 'ri-graduation-cap-line',
          image_url: ''
        },
        {
          name: 'HRMS Portal',
          ...projectDetails['HRMS Portal'],
          category: 'crm',
          tag: 'CRM Solutions',
          techs: ['React', 'Laravel', 'MySQL'],
          desc: 'Employee attendance tracker, payroll calculators, custom leave approval flows, and digital asset rosters.',
          icon: 'ri-user-settings-line',
          image_url: ''
        },
        {
          name: 'Property Listing Platform',
          ...projectDetails['Property Listing Platform'],
          category: 'real-estate',
          tag: 'Real Estate',
          techs: ['Next.js', 'PostgreSQL', 'Cloudflare'],
          desc: 'Responsive real estate search listing hub, agent chat boxes, and vector map listing layouts.',
          icon: 'ri-building-line',
          image_url: ''
        }
      ];

      await Project.insertMany(defaultProjects);
      console.log('Default portfolio projects successfully seeded in MongoDB.');
    }

    // 5. Seed Default Tech Stack Items
    const techItemsCount = await TechItem.countDocuments();
    if (techItemsCount === 0) {
      const defaultTechs = [
        // Frontend
        { category: 'frontend', name: 'React', icon: 'ri-reactjs-line', desc: 'A powerful JavaScript library for building component-based, high-performance user interfaces.', color: 'rgba(20, 184, 166, 0.1)', metadata: { bestFor: 'Dynamic Web Apps', projects: 'SPA, Dashboards, CRM, SaaS', performance: '98%' } },
        { category: 'frontend', name: 'Next.js', icon: 'ri-nextjs-line', desc: 'Production-ready React framework offering server-side rendering, static generation, and absolute speed.', color: 'rgba(15, 23, 42, 0.1)', metadata: { bestFor: 'SEO Friendly Apps', projects: 'PWA, Portals, Apps, Blogs', performance: '99%' } },
        { category: 'frontend', name: 'Vue.js', icon: 'ri-vuejs-line', desc: 'Progressive, highly approachable JavaScript framework built for lightweight rendering speed.', color: 'rgba(139, 92, 246, 0.1)', metadata: { bestFor: 'Interactive Interfaces', projects: 'Web Apps, Admin Panels, MVPs', performance: '92%' } },
        { category: 'frontend', name: 'Angular', icon: 'ri-angularjs-line', desc: 'Structured, enterprise-level platform utilizing TypeScript for bulletproof app architectures.', color: 'rgba(239, 68, 68, 0.1)', metadata: { bestFor: 'Large Scale Apps', projects: 'Enterprise, PWA Apps, Banking ERPs', performance: '90%' } },
        { category: 'frontend', name: 'TypeScript', icon: 'ri-code-s-slash-line', desc: 'Typed superset of JavaScript giving you strict compile-time safety and long-term codebase sanity.', color: 'rgba(59, 130, 246, 0.1)', metadata: { bestFor: 'Type-safe Apps', projects: 'Enterprise SaaS Platforms, Complex Portals', performance: '95%' } },
        { category: 'frontend', name: 'TailwindCSS', icon: 'ri-palette-line', desc: 'Utility-first styling framework enabling rapid custom interface development directly in your code.', color: 'rgba(6, 182, 212, 0.1)', metadata: { bestFor: 'Rapid UI Development', projects: 'All Types', performance: '99%' } },
        
        // Backend
        { category: 'backend', name: 'Node.js', icon: 'ri-nodejs-line', desc: 'Asynchronous event-driven JavaScript runtime engineered to handle highly concurrent API loops.', color: 'rgba(143, 184, 74, 0.1)', metadata: { apiPerf: 'Ultra Fast', scalability: 'Elastic', enterpriseReady: 'High' } },
        { category: 'backend', name: 'Laravel', icon: 'ri-laravel-line', desc: 'Clean, elegant PHP web framework containing robust routing, database migrations, and built-in security.', color: 'rgba(239, 68, 68, 0.1)', metadata: { apiPerf: 'Fast', scalability: 'Very High', enterpriseReady: 'High' } },
        { category: 'backend', name: 'PHP', icon: 'ri-code-box-line', desc: 'The bedrock language of the web, powering millions of stable content management systems and custom backends.', color: 'rgba(59, 130, 246, 0.1)', metadata: { apiPerf: 'Stable', scalability: 'High', enterpriseReady: 'Moderate' } },
        { category: 'backend', name: 'Python', icon: 'ri-terminal-box-line', desc: 'Expressive server language powering complex automation scripts, math frameworks, and AI routing pipelines.', color: 'rgba(245, 158, 11, 0.1)', metadata: { apiPerf: 'Fast', scalability: 'Very High', enterpriseReady: 'High' } },
        { category: 'backend', name: 'Java', icon: 'ri-cup-line', desc: 'Class-based static language deployed for decades in multi-billion dollar banking and transaction databases.', color: 'rgba(236, 72, 153, 0.1)', metadata: { apiPerf: 'Very Fast', scalability: 'Infinite', enterpriseReady: 'Maximum' } },
        { category: 'backend', name: 'Spring Boot', icon: 'ri-leaf-line', desc: 'Microservice-ready framework for Java built to eliminate bootstrap boilerplates and handle enterprise scales.', color: 'rgba(16, 185, 129, 0.1)', metadata: { apiPerf: 'Very Fast', scalability: 'Infinite', enterpriseReady: 'Maximum' } },
        
        // Mobile
        { category: 'mobile', name: 'React Native', icon: 'ri-reactjs-line', desc: 'Accelerate mobile launches using familiar React codebases rendering to true native elements.', color: 'rgba(20, 184, 166, 0.1)', metadata: { pros: 'Shared codebase, fast hot-reload, large plugin ecosystem', useCases: 'SaaS Mobile companions, Startup MVPs, Retail Apps', speed: '90%', maintenance: 'Low Cost' } },
        { category: 'mobile', name: 'Flutter', icon: 'ri-flutter-line', desc: 'Compile visually stunning cross-platform apps at near-native speeds utilizing the Dart engine.', color: 'rgba(20, 184, 166, 0.1)', metadata: { pros: 'Custom high-performance widgets, smooth animations, pixel control', useCases: 'Interactive interfaces, Fintech portals, Cross-platform tools', speed: '95%', maintenance: 'Low Cost' } },
        { category: 'mobile', name: 'Android Native', icon: 'ri-android-line', desc: 'Strict Kotlin codebases built directly utilizing Google standard Android SDK parameters.', color: 'rgba(20, 184, 166, 0.1)', metadata: { pros: 'Maximum hardware access, immediate updates, zero bridge delay', useCases: 'Bluetooth logs, high-load graphics, system integrations', speed: '100%', maintenance: 'High Cost' } },
        { category: 'mobile', name: 'iOS Native', icon: 'ri-apple-line', desc: 'Swift codebases leveraging Apple strict Cocoa frameworks for absolute design clarity.', color: 'rgba(20, 184, 166, 0.1)', metadata: { pros: 'Flawless iOS navigation, elite biometric safety, pure performance', useCases: 'Enterprise Apple networks, high-end consumer apps', speed: '100%', maintenance: 'High Cost' } },

        // Database
        { category: 'database', name: 'MongoDB', icon: 'ri-leaf-line', desc: 'Highly scalable document-store NoSQL database storing records in flexible JSON formats.', color: 'rgba(20, 184, 166, 0.1)', metadata: { bestFor: 'Real-time & Unstructured Data', performance: 'Excellent', scalability: 'Horizontal Scaling', useCases: 'SaaS Platforms, Activity Logs, Chat Systems' } },
        { category: 'database', name: 'PostgreSQL', icon: 'ri-database-2-line', desc: 'Elite object-relational SQL database offering extensive JSON support alongside relational constraints.', color: 'rgba(20, 184, 166, 0.1)', metadata: { bestFor: 'Complex Queries & Relations', performance: 'Outstanding', scalability: 'Vertical & Read Replicas', useCases: 'Financial ledgers, CRM databases, Multi-tenant apps' } },
        { category: 'database', name: 'MySQL', icon: 'ri-database-line', desc: 'The global standard relational database, optimized for read-heavy portals and transaction security.', color: 'rgba(20, 184, 166, 0.1)', metadata: { bestFor: 'Structured Relational Data', performance: 'High', scalability: 'Standard Clustering', useCases: 'ERP portals, E-commerce, Billing platforms' } },
        { category: 'database', name: 'Firebase', icon: 'ri-fire-line', desc: 'Google hosted NoSQL database providing automated document syncing and immediate live changes.', color: 'rgba(20, 184, 166, 0.1)', metadata: { bestFor: 'Rapid Launches & Live Syncing', performance: 'Real-time', scalability: 'Auto-Scaling', useCases: 'Live chats, startup MVPs, mobile app pipelines' } },
        { category: 'database', name: 'Redis', icon: 'ri-flashlight-line', desc: 'In-memory data structure server utilized as a microsecond-level cache and session store.', color: 'rgba(20, 184, 166, 0.1)', metadata: { bestFor: 'Caching & Session Storage', performance: 'Sub-millisecond', scalability: 'Redis Cluster ready', useCases: 'Session caching, API rate limits, live leaderboard scores' } },

        // Cloud & DevOps
        { category: 'cloud', name: 'AWS', icon: 'ri-amazon-line', desc: 'Secure cloud hosting, auto-scaling grids, and distributed file archives.', color: 'rgba(245, 158, 11, 0.1)' },
        { category: 'cloud', name: 'Docker', icon: 'ri-box-3-line', desc: 'Package applications into lightweight, identical container modules.', color: 'rgba(59, 130, 246, 0.1)' },
        { category: 'cloud', name: 'Kubernetes', icon: 'ri-settings-5-line', desc: 'Automate deployment, scaling, and operational management of container arrays.', color: 'rgba(139, 92, 246, 0.1)' },
        { category: 'cloud', name: 'CI/CD Pipelines', icon: 'ri-loop-left-line', desc: 'Continuous integration pipelines making testing and deployments fully automatic.', color: 'rgba(16, 185, 129, 0.1)' },
        { category: 'cloud', name: 'GitHub Actions', icon: 'ri-github-line', desc: 'Run automated build scripts right inside your code repository on every push.', color: 'rgba(15, 23, 42, 0.1)' },
        { category: 'cloud', name: 'VPS Deployments', icon: 'ri-server-line', desc: 'Dedicated customizable virtual servers optimized for balanced business costs.', color: 'rgba(239, 68, 68, 0.1)' },
        { category: 'cloud', name: 'Cloudflare', icon: 'ri-shield-flash-line', desc: 'Distributed global CDN shielding your systems from DDoS threats and speed delays.', color: 'rgba(6, 182, 212, 0.1)' },

        // AI & Analytics
        { category: 'ai', name: 'AI Chatbots', icon: 'ri-robot-line', desc: 'Deploy automated natural language support agents answering customer queries 24/7.', color: 'rgba(139, 92, 246, 0.1)' },
        { category: 'ai', name: 'Machine Learning', icon: 'ri-bubble-chart-line', desc: 'Train predictive data analytics algorithms that adapt to customer behavior logs.', color: 'rgba(20, 184, 166, 0.1)' },
        { category: 'ai', name: 'Generative AI', icon: 'ri-brain-line', desc: 'Integrate LLM API nodes (OpenAI, Gemini) to generate custom textual or visual assets.', color: 'rgba(245, 158, 11, 0.1)' },
        { category: 'ai', name: 'Workflow Automations', icon: 'ri-magic-line', desc: 'Chain services together (Zapier, custom scripts) to eliminate daily manual paperwork.', color: 'rgba(143, 184, 74, 0.1)' },
        { category: 'ai', name: 'Power BI Integration', icon: 'ri-bar-chart-box-line', desc: 'Build enterprise-level business intelligence reports directly for executives.', color: 'rgba(236, 72, 153, 0.1)' },
        { category: 'ai', name: 'Predictive Systems', icon: 'ri-line-chart-line', desc: 'Calculate inventory demands and target buying habits using historical database records.', color: 'rgba(59, 130, 246, 0.1)' }
      ];

      await TechItem.insertMany(defaultTechs);
      console.log('Default tech stack items successfully seeded in MongoDB.');
    }
  } catch (err) {
    console.error('Error during database initialization:', err.message);
  }
}

module.exports = mongoose.connection;
