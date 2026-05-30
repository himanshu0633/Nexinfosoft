const techStackData = {
  categories: {
    frontend: {
      title: 'Modern Frontend Technologies',
      desc: 'Build beautiful, fast, and interactive user experiences with the best frontend technologies.',
      tag: 'FRONTEND TECHNOLOGIES',
      items: [
        {
          name: 'React',
          icon: 'ri-reactjs-line',
          desc: 'A powerful JavaScript library for building component-based, high-performance user interfaces.',
          bestFor: 'Dynamic Web Apps',
          projects: 'SPA, Dashboards, CRM, SaaS',
          performance: '98%',
          color: 'rgba(20, 184, 166, 0.1)'
        },
        {
          name: 'Next.js',
          icon: 'ri-nextjs-line',
          desc: 'Production-ready React framework offering server-side rendering, static generation, and absolute speed.',
          bestFor: 'SEO Friendly Apps',
          projects: 'PWA, Portals, Apps, Blogs',
          performance: '99%',
          color: 'rgba(15, 23, 42, 0.1)'
        },
        {
          name: 'Vue.js',
          icon: 'ri-vuejs-line',
          desc: 'Progressive, highly approachable JavaScript framework built for lightweight rendering speed.',
          bestFor: 'Interactive Interfaces',
          projects: 'Web Apps, Admin Panels, MVPs',
          performance: '92%',
          color: 'rgba(139, 92, 246, 0.1)'
        },
        {
          name: 'Angular',
          icon: 'ri-angularjs-line',
          desc: 'Structured, enterprise-level platform utilizing TypeScript for bulletproof app architectures.',
          bestFor: 'Large Scale Apps',
          projects: 'Enterprise, PWA Apps, Banking ERPs',
          performance: '90%',
          color: 'rgba(239, 68, 68, 0.1)'
        },
        {
          name: 'TypeScript',
          icon: 'ri-code-s-slash-line',
          desc: 'Typed superset of JavaScript giving you strict compile-time safety and long-term codebase sanity.',
          bestFor: 'Type-safe Apps',
          projects: 'Enterprise SaaS Platforms, Complex Portals',
          performance: '95%',
          color: 'rgba(59, 130, 246, 0.1)'
        },
        {
          name: 'TailwindCSS',
          icon: 'ri-palette-line',
          desc: 'Utility-first styling framework enabling rapid custom interface development directly in your code.',
          bestFor: 'Rapid UI Development',
          projects: 'All Types',
          performance: '99%',
          color: 'rgba(6, 182, 212, 0.1)'
        }
      ]
    },
    backend: {
      title: 'Robust Backend Technologies',
      desc: 'Power your applications with highly scalable, secure, and fast server-side technologies.',
      tag: 'BACKEND TECHNOLOGIES',
      items: [
        {
          name: 'Node.js',
          icon: 'ri-nodejs-line',
          desc: 'Asynchronous event-driven JavaScript runtime engineered to handle highly concurrent API loops.',
          apiPerf: 'Ultra Fast',
          scalability: 'Elastic',
          enterpriseReady: 'High',
          color: 'rgba(143, 184, 74, 0.1)'
        },
        {
          name: 'Laravel',
          icon: 'ri-laravel-line',
          desc: 'Clean, elegant PHP web framework containing robust routing, database migrations, and built-in security.',
          apiPerf: 'Fast',
          scalability: 'Very High',
          enterpriseReady: 'High',
          color: 'rgba(239, 68, 68, 0.1)'
        },
        {
          name: 'PHP',
          icon: 'ri-code-box-line',
          desc: 'The bedrock language of the web, powering millions of stable content management systems and custom backends.',
          apiPerf: 'Stable',
          scalability: 'High',
          enterpriseReady: 'Moderate',
          color: 'rgba(59, 130, 246, 0.1)'
        },
        {
          name: 'Python',
          icon: 'ri-terminal-box-line',
          desc: 'Expressive server language powering complex automation scripts, math frameworks, and AI routing pipelines.',
          apiPerf: 'Fast',
          scalability: 'Very High',
          enterpriseReady: 'High',
          color: 'rgba(245, 158, 11, 0.1)'
        },
        {
          name: 'Java',
          icon: 'ri-cup-line',
          desc: 'Class-based static language deployed for decades in multi-billion dollar banking and transaction databases.',
          apiPerf: 'Very Fast',
          scalability: 'Infinite',
          enterpriseReady: 'Maximum',
          color: 'rgba(236, 72, 153, 0.1)'
        },
        {
          name: 'Spring Boot',
          icon: 'ri-leaf-line',
          desc: 'Microservice-ready framework for Java built to eliminate bootstrap boilerplates and handle enterprise scales.',
          apiPerf: 'Very Fast',
          scalability: 'Infinite',
          enterpriseReady: 'Maximum',
          color: 'rgba(16, 185, 129, 0.1)'
        }
      ]
    },
    mobile: {
      title: 'Scalable Mobile Technologies',
      desc: 'Build native-performing mobile applications for iOS and Android devices.',
      tag: 'MOBILE TECHNOLOGIES',
      items: [
        {
          name: 'React Native',
          icon: 'ri-reactjs-line',
          desc: 'Accelerate mobile launches using familiar React codebases rendering to true native elements.',
          pros: 'Shared codebase, fast hot-reload, large plugin ecosystem',
          useCases: 'SaaS Mobile companions, Startup MVPs, Retail Apps',
          speed: '90%',
          maintenance: 'Low Cost'
        },
        {
          name: 'Flutter',
          icon: 'ri-flutter-line',
          desc: 'Compile visually stunning cross-platform apps at near-native speeds utilizing the Dart engine.',
          pros: 'Custom high-performance widgets, smooth animations, pixel control',
          useCases: 'Interactive interfaces, Fintech portals, Cross-platform tools',
          speed: '95%',
          maintenance: 'Low Cost'
        },
        {
          name: 'Android Native',
          icon: 'ri-android-line',
          desc: 'Strict Kotlin codebases built directly utilizing Google standard Android SDK parameters.',
          pros: 'Maximum hardware access, immediate updates, zero bridge delay',
          useCases: 'Bluetooth logs, high-load graphics, system integrations',
          speed: '100%',
          maintenance: 'High Cost'
        },
        {
          name: 'iOS Native',
          icon: 'ri-apple-line',
          desc: 'Swift codebases leveraging Apple strict Cocoa frameworks for absolute design clarity.',
          pros: 'Flawless iOS navigation, elite biometric safety, pure performance',
          useCases: 'Enterprise Apple networks, high-end consumer apps',
          speed: '100%',
          maintenance: 'High Cost'
        }
      ]
    },
    database: {
      title: 'Secure Database Technologies',
      desc: 'Store your structured and unstructured business information securely with rapid search indexing.',
      tag: 'DATABASE TECHNOLOGIES',
      items: [
        {
          name: 'MongoDB',
          icon: 'ri-leaf-line',
          desc: 'Highly scalable document-store NoSQL database storing records in flexible JSON formats.',
          bestFor: 'Real-time & Unstructured Data',
          performance: 'Excellent',
          scalability: 'Horizontal Scaling',
          useCases: 'SaaS Platforms, Activity Logs, Chat Systems'
        },
        {
          name: 'PostgreSQL',
          icon: 'ri-database-2-line',
          desc: 'Elite object-relational SQL database offering extensive JSON support alongside relational constraints.',
          bestFor: 'Complex Queries & Relations',
          performance: 'Outstanding',
          scalability: 'Vertical & Read Replicas',
          useCases: 'Financial ledgers, CRM databases, Multi-tenant apps'
        },
        {
          name: 'MySQL',
          icon: 'ri-database-line',
          desc: 'The global standard relational database, optimized for read-heavy portals and transaction security.',
          bestFor: 'Structured Relational Data',
          performance: 'High',
          scalability: 'Standard Clustering',
          useCases: 'ERP portals, E-commerce, Billing platforms'
        },
        {
          name: 'Firebase',
          icon: 'ri-fire-line',
          desc: 'Google hosted NoSQL database providing automated document syncing and immediate live changes.',
          bestFor: 'Rapid Launches & Live Syncing',
          performance: 'Real-time',
          scalability: 'Auto-Scaling',
          useCases: 'Live chats, startup MVPs, mobile app pipelines'
        },
        {
          name: 'Redis',
          icon: 'ri-flashlight-line',
          desc: 'In-memory data structure server utilized as a microsecond-level cache and session store.',
          bestFor: 'Caching & Session Storage',
          performance: 'Sub-millisecond',
          scalability: 'Redis Cluster ready',
          useCases: 'Session caching, API rate limits, live leaderboard scores'
        }
      ]
    },
    cloud: {
      title: 'DevOps & Cloud Orchestrations',
      desc: 'Deploy containerized, high-availability, scalable software pipelines globally.',
      tag: 'CLOUD & DEVOPS',
      items: [
        { name: 'AWS', icon: 'ri-amazon-line', desc: 'Secure cloud hosting, auto-scaling grids, and distributed file archives.' },
        { name: 'Docker', icon: 'ri-box-3-line', desc: 'Package applications into lightweight, identical container modules.' },
        { name: 'Kubernetes', icon: 'ri-settings-5-line', desc: 'Automate deployment, scaling, and operational management of container arrays.' },
        { name: 'CI/CD Pipelines', icon: 'ri-loop-left-line', desc: 'Continuous integration pipelines making testing and deployments fully automatic.' },
        { name: 'GitHub Actions', icon: 'ri-github-line', desc: 'Run automated build scripts right inside your code repository on every push.' },
        { name: 'VPS Deployments', icon: 'ri-server-line', desc: 'Dedicated customizable virtual servers optimized for balanced business costs.' },
        { name: 'Cloudflare', icon: 'ri-shield-flash-line', desc: 'Distributed global CDN shielding your systems from DDoS threats and speed delays.' }
      ]
    },
    ai: {
      title: 'Artificial Intelligence & Analytics',
      desc: 'Build smart operations utilizing predictive algorithms and machine learning dashboards.',
      tag: 'AI & ANALYTICS',
      items: [
        { name: 'AI Chatbots', icon: 'ri-robot-line', desc: 'Deploy automated natural language support agents answering customer queries 24/7.' },
        { name: 'Machine Learning', icon: 'ri-bubble-chart-line', desc: 'Train predictive data analytics algorithms that adapt to customer behavior logs.' },
        { name: 'Generative AI', icon: 'ri-brain-line', desc: 'Integrate LLM API nodes (OpenAI, Gemini) to generate custom textual or visual assets.' },
        { name: 'Workflow Automations', icon: 'ri-magic-line', desc: 'Chain services together (Zapier, custom scripts) to eliminate daily manual paperwork.' },
        { name: 'Power BI Integration', icon: 'ri-bar-chart-box-line', desc: 'Build enterprise-level business intelligence reports directly for executives.' },
        { name: 'Predictive Systems', icon: 'ri-line-chart-line', desc: 'Calculate inventory demands and target buying habits using historical database records.' }
      ]
    }
  },

  selectionProcess: [
    { step: '01', title: 'Business Analysis', desc: 'We start by understanding your industry, target audience, and business goals.' },
    { step: '02', title: 'Requirements Gathering', desc: 'Scoping direct functional loads, user volumes, and necessary API integrations.' },
    { step: '03', title: 'Architecture Planning', desc: 'Drawing secure database schemas, scaling models, and cloud network maps.' },
    { step: '04', title: 'Technology Selection', desc: 'Picking the absolute best, future-proof stack matching your precise budget constraints.' },
    { step: '05', title: 'Development', desc: 'Writing clean modular code utilizing structured frameworks and strict code standards.' },
    { step: '06', title: 'Optimization & Support', desc: 'Applying page optimizations, monitoring live telemetry logs, and pushing upgrades.' }
  ],

  comparisonTable: [
    { tech: 'React', bestFor: 'Dynamic Web Apps', scalability: 5, performance: 5, learning: 4, maintenance: 5 },
    { tech: 'Next.js', bestFor: 'SEO Friendly Apps', scalability: 5, performance: 5, learning: 3, maintenance: 5 },
    { tech: 'Node.js', bestFor: 'Backend Services', scalability: 5, performance: 5, learning: 4, maintenance: 4 },
    { tech: 'Laravel', bestFor: 'Web Applications', scalability: 4, performance: 4, learning: 5, maintenance: 4 },
    { tech: 'MongoDB', bestFor: 'Flexible Data Apps', scalability: 4, performance: 4, learning: 4, maintenance: 4 },
    { tech: 'PostgreSQL', bestFor: 'Enterprise Apps', scalability: 5, performance: 5, learning: 4, maintenance: 5 },
    { tech: 'Flutter', bestFor: 'Cross-Platform Apps', scalability: 5, performance: 5, learning: 3, maintenance: 4 },
    { tech: 'React Native', bestFor: 'Cross-Platform Apps', scalability: 4, performance: 5, learning: 3, maintenance: 4 }
  ],

  projectsBuilt: [
    { name: 'Clinic Management System', tech: 'React, Node.js, MongoDB', type: 'Health Portal', industry: 'Healthcare' },
    { name: 'ERP System', tech: 'Next.js, Laravel, MySQL', type: 'Enterprise Resource System', industry: 'Enterprise' },
    { name: 'CRM Platform', tech: 'React, Node.js, PostgreSQL', type: 'Client Pipeline CRM', industry: 'CRM' },
    { name: 'Real Estate Portal', tech: 'Next.js, MongoDB, AWS', type: 'Property Search Engine', industry: 'Real Estate' },
    { name: 'E-Commerce Platform', tech: 'React, Node.js, MongoDB', type: 'Online Catalog Retail', industry: 'E-Commerce' }
  ],

  whyTechnologyMatters: [
    { title: 'Faster Development', desc: 'Modular components and advanced frameworks cut standard build timelines in half.', icon: 'ri-flashlight-line' },
    { title: 'Better Security', desc: 'Secure coding standards, regular framework upgrades, and encryption defend customer data.', icon: 'ri-shield-keyhole-line' },
    { title: 'Scalable Architecture', desc: 'We build database models and API nodes designed to scale up smoothly as traffic rises.', icon: 'ri-node-tree' },
    { title: 'Lower Costs', desc: 'Optimize dev pipelines and utilize open-source frameworks to lower server footprints.', icon: 'ri-coin-line' },
    { title: 'Easy Maintenance', desc: 'Clean, well-documented code keeps post-launch updates easy, quick, and affordable.', icon: 'ri-settings-4-line' },
    { title: 'Future Ready', desc: 'We use modern, active developer technologies to ensure your systems remain relevant for years.', icon: 'ri-history-line' }
  ]
};

export default techStackData;
