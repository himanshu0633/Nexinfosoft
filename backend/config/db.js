const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load Mongoose models
const User = require('../models/User');
const SectionContent = require('../models/SectionContent');
const Service = require('../models/Service');
const Project = require('../models/Project');
const TechItem = require('../models/TechItem');

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
    const defaultSectionsCount = await SectionContent.countDocuments();
    if (defaultSectionsCount === 0) {
      const sections = [
        {
          _id: 'hero',
          title: 'Build Scalable',
          subtitle: 'For Modern Teams',
          description: 'Nexinfosoft designs high-performance SaaS platforms, ERP systems, mobile apps, CRM workflows, and AI automation tools that help modern businesses move faster, reduce manual work, and unlock measurable growth.',
          image_url: '/assets/images/web_dev_poster.png',
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
          _id: 'stats',
          title: 'Our Track Record',
          subtitle: 'Key Metrics',
          description: 'Verified operations metrics',
          image_url: '',
          metadata: {
            counters: [
              { target: 100, suffix: '+', label: 'Projects Completed' },
              { target: 50, suffix: '+', label: 'Happy Clients' },
              { target: 5, suffix: '+', label: 'Years Experience' },
              { target: 99, suffix: '%', label: 'Client Retention' }
            ]
          }
        },
        {
          _id: 'services',
          title: 'Everything Your Business Needs To Build,',
          subtitle: 'Scale & Automate',
          description: 'From web apps to AI automation, we deliver secure and scalable digital solutions that help your business grow faster, operate smarter, and launch with confidence.',
          image_url: '',
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
          _id: 'corporate_hero',
          title: 'Fastest Way To Grow Your Business Is Being With Us.',
          subtitle: 'UNIQUE OUTCOMES FROM EXPERIENCED DEVELOPERS',
          description: 'We strive to provide highly customized and reliable IT solutions for various business aspects.',
          image_url: '/assets/images/corporate_hero.png',
          metadata: {}
        },
        {
          _id: 'corporate_about',
          title: 'Top Class IT Services Provider',
          subtitle: 'ABOUT US',
          description: 'Nexinfosoft is a full-service Digital agency based in India. We are professional, experienced and forward thinking, and our great strength is decoding our client\'s needs into effective solutions.',
          image_url: '/assets/images/corporate_about.png',
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
          metadata: {
            vision: {
              title: 'Innovative And Dedicated IT Solutions',
              desc: 'To provide clients with the most innovative and dedicated IT solutions through continuous learning efforts.'
            }
          }
        }
      ];

      await SectionContent.insertMany(sections);
      console.log('Default section contents successfully seeded in MongoDB.');
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
        },
        {
          slug: 'recruitment-services',
          title: 'Recruitment Services',
          subtitle: 'Hiring support for technology, operations, sales, and digital roles as your business scales.',
          icon: 'ri-user-search-line',
          intro: 'We help businesses identify and shortlist suitable talent for key roles so teams can scale with less hiring friction.',
          benefits: [
            'Saves time in candidate sourcing',
            'Improves shortlist quality',
            'Supports business expansion with the right people',
            'Reduces hiring coordination load on founders'
          ],
          deliverables: ['Role understanding', 'Candidate sourcing', 'Profile screening', 'Shortlisting', 'Interview coordination', 'Hiring support'],
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
          category: 'healthcare',
          tag: 'Healthcare',
          techs: ['React', 'Node.js', 'MongoDB'],
          desc: 'Cloud patient logs dashboard, doctor scheduler calendar, automated digital invoices, and secure records storage.',
          icon: 'ri-heart-pulse-line',
          image_url: '/assets/images/analytics_mockup.png'
        },
        {
          name: 'Real Estate Portal',
          category: 'real-estate',
          tag: 'Real Estate',
          techs: ['Next.js', 'MongoDB', 'AWS'],
          desc: 'High speed property search engine, interactive spatial maps, and direct client inquiry funnels.',
          icon: 'ri-home-4-line',
          image_url: '/assets/images/portal_mockup.png'
        },
        {
          name: 'ERP Management System',
          category: 'erp',
          tag: 'Enterprise ERP',
          techs: ['React', 'Laravel', 'MySQL'],
          desc: 'Centralized resource system tracking inventory logs, employee logs, billing workflows, and approval streams.',
          icon: 'ri-database-2-line',
          image_url: '/assets/images/erp_mockup.png'
        },
        {
          name: 'E-Commerce Platform',
          category: 'ecommerce',
          tag: 'E-Commerce',
          techs: ['React', 'Node.js', 'MongoDB'],
          desc: 'Dynamic catalog shop, shopping cart, payment gateway checkout, and automatic email transaction setups.',
          icon: 'ri-shopping-bag-3-line',
          image_url: '/assets/images/ecommerce_mockup.png'
        },
        {
          name: 'CRM Dashboard',
          category: 'crm',
          tag: 'CRM Solutions',
          techs: ['React', 'Node.js', 'PostgreSQL'],
          desc: 'Interactive sales pipelines, lead cards tracker, team target graphs, and automated email follow-up alerts.',
          icon: 'ri-contacts-line',
          image_url: ''
        },
        {
          name: 'Restaurant Booking App',
          category: 'mobile',
          tag: 'Mobile Apps',
          techs: ['Flutter', 'Node.js', 'Firebase'],
          desc: 'High performance restaurant booking app featuring live interactive seat layouts and calendar schedules.',
          icon: 'ri-restaurant-line',
          image_url: '/assets/images/mobile_mockup.png'
        },
        {
          name: 'Hyperlocal Delivery App',
          category: 'mobile',
          tag: 'Mobile Apps',
          techs: ['React Native', 'Node.js', 'Redis'],
          desc: 'Instant delivery request tracking, live driver GPS navigation coordinates, and automatic SMS pushes.',
          icon: 'ri-truck-line',
          image_url: ''
        },
        {
          name: 'School ERP',
          category: 'erp',
          tag: 'Enterprise ERP',
          techs: ['Angular', 'Java', 'PostgreSQL'],
          desc: 'Centralized educational database, fee management workflows, report cards, and student records vaults.',
          icon: 'ri-graduation-cap-line',
          image_url: ''
        },
        {
          name: 'HRMS Portal',
          category: 'crm',
          tag: 'CRM Solutions',
          techs: ['React', 'Laravel', 'MySQL'],
          desc: 'Employee attendance tracker, payroll calculators, custom leave approval flows, and digital asset rosters.',
          icon: 'ri-user-settings-line',
          image_url: ''
        },
        {
          name: 'Property Listing Platform',
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
