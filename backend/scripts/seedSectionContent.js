require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const mongoose = require('mongoose');
const SectionContent = require('../models/SectionContent');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nexinfosoft';

const sections = [
  {
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
    description: 'Nexinfosoft is a full-service Digital agency based in India.',
    image_url: '/assets/images/corporate_about.png',
    metadata: {
      paragraphs: [
        "Nexinfosoft is a full-service Digital agency based in India. We are professional, experienced and forward thinking, and our great strength is decoding our client's needs into effective solutions.",
        'We live in the digital gamut and stay there round the clock to address your needs.',
        'We integrate marketing and branding with digital innovations.'
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
  },
  {
    _id: 'footer_links',
    title: 'Footer Links',
    subtitle: 'Website Footer',
    description: 'Nexinfosoft is a certified software development agency committed to engineering highly responsive websites, apps, ERP integrations, and CRM software ecosystems.',
    image_url: '',
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
        { label: 'Client Projects', url: '/portfolio' },
        { label: 'Detailed Services', url: '/services' },
        { label: 'Technology Stack', url: '/technology-stack' },
        { label: 'Get in Touch', url: '/contact' },
        { label: 'Privacy Policy', url: '/privacy-policy' }
      ],
      bottomLinks: [
        { label: 'Terms & Conditions', url: '/terms-conditions' },
        { label: 'Privacy Policy', url: '/privacy-policy' }
      ]
    }
  },
  {
    _id: 'privacy_policy',
    title: 'Privacy Policy',
    subtitle: 'Legal Page',
    description: 'How we collect, use, and protect information shared with Nexinfosoft.',
    image_url: '',
    metadata: {
      cards: [
        { title: 'Information We Collect', text: 'We may collect your name, phone number, email address, company details, website URL, and project requirement when you submit a form or contact us directly.' },
        { title: 'How We Use Information', text: 'Your information is used to respond to inquiries, prepare estimates, schedule consultations, provide services, and improve our communication and delivery process.' },
        { title: 'Data Sharing', text: 'We do not sell personal information. We may share limited details with trusted service partners only when needed for project delivery, hosting, communication, or legal compliance.' },
        { title: 'Security', text: 'We use reasonable technical and administrative measures to protect submitted information. No internet transmission is completely risk-free, so sensitive credentials should be shared through approved secure channels.' },
        { title: 'Contact', text: 'For privacy questions, contact us at info@nexinfosoft.com.' }
      ]
    }
  },
  {
    _id: 'terms_conditions',
    title: 'Terms & Conditions',
    subtitle: 'Legal Page',
    description: 'Basic terms for website use, project discussions, proposals, and service delivery.',
    image_url: '',
    metadata: {
      cards: [
        { title: 'Website Use', text: 'By using this website, you agree to use it for lawful purposes and not attempt to misuse, disrupt, copy, or exploit website content or functionality.' },
        { title: 'Consultations & Proposals', text: 'Consultation inputs and estimates are for planning. Final scope, cost, timeline, payment terms, and deliverables are confirmed through a written proposal or agreement.' },
        { title: 'Project Delivery', text: 'Delivery depends on approved requirements, timely feedback, content availability, third-party access, and milestone payments where applicable.' },
        { title: 'Intellectual Property', text: 'Client-owned content remains with the client. Project source files, licenses, and ownership transfer terms are defined in the project agreement.' },
        { title: 'Limitation', text: 'Nexinfosoft is not responsible for losses caused by third-party services, hosting providers, payment gateways, policy changes, or delayed client approvals.' }
      ]
    }
  },
  {
    _id: 'company_profile_hero',
    title: 'Nexinfosoft IT Solutions',
    subtitle: 'Enterprise Web & Software Solutions',
    description: 'Trusted technology partner for business and government organizations. We provide structured web, mobile, ERP, enterprise software, AI/ML and digital transformation services with clear documentation and measurable outcomes.',
    image_url: '',
    metadata: {}
  },
  {
    _id: 'company_profile_overview',
    title: 'About Nexinfosoft IT Solutions',
    subtitle: 'COMPANY OVERVIEW',
    description: 'Nexinfosoft IT Solutions provides enterprise-grade technology services for organizations that require clear documentation, structured execution, and measurable outcomes.',
    image_url: '',
    metadata: {
      paragraphs: [
        'We support business and government teams with web development, mobile applications, ERP solutions, enterprise software, AI/ML capabilities, and digital transformation services.',
        'Our delivery approach combines agile methodology with strong quality assurance, secure deployment support, and transparent reporting.'
      ]
    }
  },
  {
    _id: 'company_profile_capabilities',
    title: 'Business & Technology Scope',
    subtitle: 'CORE CAPABILITIES',
    description: 'Business and technology capabilities covered by Nexinfosoft.',
    image_url: '',
    metadata: {}
  },
  {
    _id: 'company_profile_services',
    title: 'Service Capabilities And Scope',
    subtitle: 'CORE SERVICES',
    description: 'Service capabilities available for business and government technology requirements.',
    image_url: '',
    metadata: {}
  },
  {
    _id: 'company_profile_strengths',
    title: 'Why Organizations Partner With Nexinfosoft',
    subtitle: 'DELIVERY STRENGTHS',
    description: 'Structured delivery strengths and governance-focused execution.',
    image_url: '',
    metadata: {}
  },
  {
    _id: 'company_profile_process',
    title: 'Structured Project Lifecycle',
    subtitle: 'DEVELOPMENT PROCESS',
    description: 'A structured delivery process from requirement analysis to support and maintenance.',
    image_url: '',
    metadata: {}
  },
  {
    _id: 'company_profile_tech',
    title: 'Requirement-Based Technology Selection',
    subtitle: 'TECHNOLOGY STACK',
    description: 'Technology choices are finalized according to security, scale, maintainability, timeline, and integration needs.',
    image_url: '',
    metadata: {}
  },
  {
    _id: 'company_profile_quality',
    title: 'Verification And Assurance Framework',
    subtitle: 'QUALITY & TESTING',
    description: 'Quality checks and validation framework for reliable releases.',
    image_url: '',
    metadata: {}
  },
  {
    _id: 'company_profile_contact',
    title: 'For project enquiries and tender discussions',
    subtitle: 'CONTACT INFORMATION',
    description: 'To discuss project requirements, timelines, or compliance needs, please contact Nexinfosoft IT Solutions.',
    image_url: '',
    metadata: {}
  }
];

async function run() {
  await mongoose.connect(MONGODB_URI);

  for (const section of sections) {
    await SectionContent.findByIdAndUpdate(section._id, section, {
      upsert: true,
      returnDocument: 'after',
      setDefaultsOnInsert: true
    });
  }

  console.log(`Seeded ${sections.length} section content records.`);
  await mongoose.disconnect();
}

run().catch(async (err) => {
  console.error(err.message);
  await mongoose.disconnect();
  process.exit(1);
});
