const portfolioData = {
  featuredCaseStudy: {
    name: 'MedVitals Clinic Portal',
    industry: 'Healthcare',
    problem: 'Manual medical patient registration and schedules triggered heavy booking delays, file losses, and data entry errors.',
    solution: 'An automated cloud clinic portal with interactive doctor scheduler grids, real-time secure patient records upload, and direct billing APIs.',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'AWS Cloud'],
    metrics: [
      { label: 'Leads Generated', value: '+200%' },
      { label: 'Faster Operations', value: '+65%' },
      { label: 'Revenue Growth', value: '+40%' }
    ],
    bg: 'linear-gradient(135deg, rgba(20, 184, 166, 0.08), rgba(59, 130, 246, 0.08))',
    icon: 'ri-heart-pulse-line'
  },

  projects: [
    {
      id: 1,
      name: 'Clinic Management System',
      category: 'healthcare',
      tag: 'Healthcare',
      techs: ['React', 'Node.js', 'MongoDB'],
      desc: 'Cloud patient logs dashboard, doctor scheduler calendar, automated digital invoices, and secure records storage.',
      icon: 'ri-heart-pulse-line'
    },
    {
      id: 2,
      name: 'Real Estate Portal',
      category: 'real-estate',
      tag: 'Real Estate',
      techs: ['Next.js', 'MongoDB', 'AWS'],
      desc: 'High speed property search engine, interactive spatial maps, and direct client inquiry funnels.',
      icon: 'ri-home-4-line'
    },
    {
      id: 3,
      name: 'ERP Management System',
      category: 'erp',
      tag: 'Enterprise ERP',
      techs: ['React', 'Laravel', 'MySQL'],
      desc: 'Centralized resource system tracking inventory logs, employee logs, billing workflows, and approval streams.',
      icon: 'ri-database-2-line'
    },
    {
      id: 4,
      name: 'E-Commerce Platform',
      category: 'ecommerce',
      tag: 'E-Commerce',
      techs: ['React', 'Node.js', 'MongoDB'],
      desc: 'Dynamic catalog shop, shopping cart, payment gateway checkout, and automatic email transaction setups.',
      icon: 'ri-shopping-bag-3-line'
    },
    {
      id: 5,
      name: 'CRM Dashboard',
      category: 'crm',
      tag: 'CRM Solutions',
      techs: ['React', 'Node.js', 'PostgreSQL'],
      desc: 'Interactive sales pipelines, lead cards tracker, team target graphs, and automated email follow-up alerts.',
      icon: 'ri-contacts-line'
    },
    {
      id: 6,
      name: 'Restaurant Booking App',
      category: 'mobile',
      tag: 'Mobile Apps',
      techs: ['Flutter', 'Node.js', 'Firebase'],
      desc: 'High performance restaurant booking app featuring live interactive seat layouts and calendar schedules.',
      icon: 'ri-restaurant-line'
    },
    {
      id: 7,
      name: 'Hyperlocal Delivery App',
      category: 'mobile',
      tag: 'Mobile Apps',
      techs: ['React Native', 'Node.js', 'Redis'],
      desc: 'Instant delivery request tracking, live driver GPS navigation coordinates, and automatic SMS pushes.',
      icon: 'ri-truck-line'
    },
    {
      id: 8,
      name: 'School ERP',
      category: 'erp',
      tag: 'Enterprise ERP',
      techs: ['Angular', 'Java', 'PostgreSQL'],
      desc: 'Centralized educational database, fee management workflows, report cards, and student records vaults.',
      icon: 'ri-graduation-cap-line'
    },
    {
      id: 9,
      name: 'HRMS Portal',
      category: 'crm',
      tag: 'CRM Solutions',
      techs: ['React', 'Laravel', 'MySQL'],
      desc: 'Employee attendance tracker, payroll calculators, custom leave approval flows, and digital asset rosters.',
      icon: 'ri-user-settings-line'
    },
    {
      id: 10,
      name: 'Property Listing Platform',
      category: 'real-estate',
      tag: 'Real Estate',
      techs: ['Next.js', 'PostgreSQL', 'Cloudflare'],
      desc: 'Responsive real estate search listing hub, agent chat boxes, and vector map listing layouts.',
      icon: 'ri-building-line'
    }
  ],

  technologies: [
    { name: 'React', icon: 'ri-reactjs-line', color: '#06b6d4' },
    { name: 'Next.js', icon: 'ri-nextjs-line', color: '#0f172a' },
    { name: 'Node.js', icon: 'ri-nodejs-line', color: '#10b981' },
    { name: 'MongoDB', icon: 'ri-leaf-line', color: '#10b981' },
    { name: 'PostgreSQL', icon: 'ri-database-2-line', color: '#3b82f6' },
    { name: 'React Native', icon: 'ri-reactjs-line', color: '#06b6d4' },
    { name: 'Flutter', icon: 'ri-flutter-line', color: '#06b6d4' },
    { name: 'AWS', icon: 'ri-amazon-line', color: '#f59e0b' },
    { name: 'Docker', icon: 'ri-box-3-line', color: '#3b82f6' },
    { name: 'AI Solutions', icon: 'ri-brain-line', color: '#8b5cf6' },
    { name: 'Power BI', icon: 'ri-bar-chart-box-line', color: '#f59e0b' }
  ],

  successMetrics: [
    { value: '300+', label: 'Projects Delivered' },
    { value: '250+', label: 'Happy Clients' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '24/7', label: 'Support Sync' },
    { value: '100%', label: 'Code Ownership' }
  ],

  timeline: [
    { step: '01', title: 'Discovery', desc: 'Understanding your business problem, mapping target users, and framing timelines.' },
    { step: '02', title: 'Planning', desc: 'Isolating must-have features, mapping relational databases, and planning server networks.' },
    { step: '03', title: 'Design', desc: 'Creating premium visual UI wireframes and high-fidelity interactive figma screens.' },
    { step: '04', title: 'Development', desc: 'Writing clean modular code in high-speed, modern React/Node backend environments.' },
    { step: '05', title: 'Testing', desc: 'Rigorous QA cycles across target device resolutions, simulator tests, and role security checks.' },
    { step: '06', title: 'Deployment', desc: 'Configuring safe AWS / Vercel cloud servers, SSL pipelines, and taking systems live.' },
    { step: '07', title: 'Support', desc: 'Providing ongoing server telemetry monitoring, backup configs, and scheduled feature upgrades.' }
  ],

  testimonials: [
    {
      company: 'Zenith Logistics',
      clientName: 'MR. HIMANSHU',
      role: 'Founder',
      avatar: 'ri-user-3-line',
      review: 'Nexinfosoft custom hyperlocal delivery portal reduced our order schedule delays by 65% in the first month. The mobile tracking features are incredibly smooth and fast.',
      rating: 5
    },
    {
      company: 'PropFinder Realty',
      clientName: 'MR. RAHUL',
      role: 'Founder',
      avatar: 'ri-user-3-line',
      review: 'The real estate search application they built handles thousands of listing updates instantly. We saw an immediate 40% growth in client lead inquiries.',
      rating: 5
    },
    {
      company: 'Alpha MedGroup',
      clientName: 'Dr. Ananya Mehta',
      role: 'Chief Medical Officer',
      avatar: 'ri-user-3-line',
      review: 'Highly professional software team. The clinic scheduler system they built eliminated patient registration bottlenecks entirely. Flawlessly secure and compliant.',
      rating: 5
    }
  ],

  industries: [
    { name: 'Healthcare', icon: 'ri-heart-pulse-line', color: 'rgba(20, 184, 166, 0.08)' },
    { name: 'Real Estate', icon: 'ri-home-4-line', color: 'rgba(59, 130, 246, 0.08)' },
    { name: 'Education', icon: 'ri-graduation-cap-line', color: 'rgba(139, 92, 246, 0.08)' },
    { name: 'Manufacturing', icon: 'ri-settings-4-line', color: 'rgba(245, 158, 11, 0.08)' },
    { name: 'Finance', icon: 'ri-bank-line', color: 'rgba(16, 185, 129, 0.08)' },
    { name: 'Retail', icon: 'ri-shopping-bag-line', color: 'rgba(236, 72, 153, 0.08)' },
    { name: 'Logistics', icon: 'ri-truck-line', color: 'rgba(6, 182, 212, 0.08)' },
    { name: 'E-Commerce', icon: 'ri-shopping-cart-2-line', color: 'rgba(239, 68, 68, 0.08)' }
  ]
};

export default portfolioData;
