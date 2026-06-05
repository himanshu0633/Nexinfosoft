const mongoose = require('mongoose');
const Project = require('../models/Project');

const projectDetails = {
  'Clinic Management System': {
    slug: 'clinic-management-system',
    overview: 'A cloud-based clinic management platform designed to centralize patient records, appointments, billing, prescriptions, and doctor schedules in one secure workflow. The system helps clinic teams reduce manual paperwork and serve patients faster.',
    challenges: [
      'Patient records were spread across manual registers and disconnected files.',
      'Appointment scheduling caused delays and frequent double bookings.',
      'Billing and prescription workflows needed better accuracy and traceability.'
    ],
    solution: 'We built a role-based healthcare dashboard with digital patient profiles, appointment calendars, automated invoices, prescription records, and secure admin controls.',
    results: [
      'Reduced front-desk administrative workload by digitizing daily clinic operations.',
      'Improved appointment visibility for doctors and reception teams.',
      'Created a reliable patient history system for faster follow-up consultations.'
    ],
    clientName: 'Clinic Operations Team',
    clientRole: 'Operations Head',
    clientCompany: 'Healthcare Practice',
    clientReview: 'The platform made our clinic operations more organized, faster, and easier to manage for both doctors and staff.',
    clientRating: 5
  },
  'Real Estate Portal': {
    slug: 'real-estate-portal',
    overview: 'A responsive real estate portal built for property discovery, lead capture, map-based search, and agent communication. The platform helps buyers explore listings quickly while giving agents a stronger inquiry pipeline.',
    challenges: [
      'Property listings needed advanced filtering without slowing down the user experience.',
      'Agents required a clear lead management flow for incoming inquiries.',
      'The platform needed SEO-friendly pages for location-based property discovery.'
    ],
    solution: 'We delivered a fast listing portal with property filters, map-ready listing layouts, inquiry forms, media galleries, and optimized pages for search visibility.',
    results: [
      'Improved property discovery through structured filters and listing pages.',
      'Increased qualified inquiries from buyers and renters.',
      'Gave agents a cleaner workflow for handling property leads.'
    ],
    clientName: 'Property Sales Team',
    clientRole: 'Sales Manager',
    clientCompany: 'Real Estate Agency',
    clientReview: 'The portal helped us present properties professionally and made it much easier to capture serious buyer inquiries.',
    clientRating: 5
  },
  'ERP Management System': {
    slug: 'erp-management-system',
    overview: 'An enterprise ERP system built to connect inventory, billing, approvals, employee operations, and reporting into one centralized business platform. It gives leadership real-time visibility across departments.',
    challenges: [
      'Teams were using disconnected tools for inventory, billing, and approvals.',
      'Manual reporting created delays in decision-making.',
      'Role-based access and workflow accountability were required across departments.'
    ],
    solution: 'We developed a modular ERP with inventory tracking, billing workflows, approval queues, employee records, dashboard analytics, and permission-based access.',
    results: [
      'Centralized core business operations into one system.',
      'Reduced manual reporting effort with live operational dashboards.',
      'Improved process accountability through role-based approvals.'
    ],
    clientName: 'Enterprise Admin Team',
    clientRole: 'Managing Director',
    clientCompany: 'Operations Business',
    clientReview: 'The ERP gave us one place to manage daily operations and track business activity with much better control.',
    clientRating: 5
  },
  'E-Commerce Platform': {
    slug: 'e-commerce-platform',
    overview: 'A scalable e-commerce platform for product catalogs, shopping carts, secure checkout, customer accounts, and order management. The build focused on smooth buying journeys and reliable admin control.',
    challenges: [
      'The catalog needed to support multiple product categories and frequent updates.',
      'Checkout had to be simple, secure, and reliable for customers.',
      'Admins needed clear order, inventory, and transaction visibility.'
    ],
    solution: 'We built a product storefront with cart management, payment-ready checkout flow, order tracking, customer notifications, and a clean admin management layer.',
    results: [
      'Created a smoother online purchase experience for customers.',
      'Improved catalog and order management for the admin team.',
      'Prepared the platform for future marketing and payment integrations.'
    ],
    clientName: 'Online Store Team',
    clientRole: 'Business Owner',
    clientCompany: 'Retail Brand',
    clientReview: 'The new platform made our online selling process simpler, cleaner, and much easier to operate.',
    clientRating: 5
  },
  'CRM Dashboard': {
    slug: 'crm-dashboard',
    overview: 'A CRM dashboard designed to manage leads, sales pipelines, follow-ups, team targets, and customer communication from one interactive workspace.',
    challenges: [
      'Sales teams needed a single view of leads and follow-up stages.',
      'Managers lacked clear visibility into team performance and target progress.',
      'Manual reminders caused missed follow-ups and slower conversions.'
    ],
    solution: 'We implemented lead boards, pipeline stages, follow-up reminders, performance charts, team assignment tools, and customer activity tracking.',
    results: [
      'Improved lead tracking from first inquiry to closure.',
      'Gave managers clearer visibility into sales performance.',
      'Reduced missed follow-ups with structured reminder workflows.'
    ],
    clientName: 'Sales Team',
    clientRole: 'Sales Lead',
    clientCompany: 'Service Business',
    clientReview: 'The CRM dashboard helped our sales team stay organized and follow up with customers at the right time.',
    clientRating: 5
  },
  'Restaurant Booking App': {
    slug: 'restaurant-booking-app',
    overview: 'A mobile-first restaurant booking application for table availability, reservation scheduling, customer details, and real-time booking updates.',
    challenges: [
      'Restaurant staff needed to reduce phone-based reservation handling.',
      'Customers required an easy way to check availability and book quickly.',
      'Booking conflicts had to be prevented during busy hours.'
    ],
    solution: 'We built a reservation app with table availability views, calendar scheduling, customer booking forms, admin controls, and booking status updates.',
    results: [
      'Reduced manual reservation calls for restaurant staff.',
      'Improved customer convenience through quick digital bookings.',
      'Minimized booking conflicts with centralized reservation tracking.'
    ],
    clientName: 'Restaurant Team',
    clientRole: 'Restaurant Manager',
    clientCompany: 'Hospitality Business',
    clientReview: 'The booking app made reservations easier for our customers and gave our staff better control during peak hours.',
    clientRating: 5
  },
  'Hyperlocal Delivery App': {
    slug: 'hyperlocal-delivery-app',
    overview: 'A delivery management application for local order requests, rider assignment, live tracking, delivery status updates, and customer notifications.',
    challenges: [
      'Delivery requests needed fast assignment to nearby riders.',
      'Customers expected live updates during the delivery journey.',
      'Operations teams needed visibility into rider activity and delays.'
    ],
    solution: 'We created a delivery platform with order intake, rider assignment, live GPS-ready tracking, status updates, SMS-ready notifications, and admin monitoring.',
    results: [
      'Improved delivery coordination between customers, riders, and admins.',
      'Reduced manual status calls through automated delivery updates.',
      'Gave operations teams better visibility into active deliveries.'
    ],
    clientName: 'Delivery Operations Team',
    clientRole: 'Operations Manager',
    clientCompany: 'Local Delivery Service',
    clientReview: 'The app helped us manage delivery requests faster and keep customers updated throughout the process.',
    clientRating: 5
  },
  'School ERP': {
    slug: 'school-erp',
    overview: 'A school ERP platform for student records, fee management, attendance, academic reports, staff workflows, and parent communication.',
    challenges: [
      'Student and fee records were difficult to maintain manually.',
      'Academic reports needed a faster and more reliable preparation flow.',
      'School admins required better access control for staff responsibilities.'
    ],
    solution: 'We built a school management system with student profiles, fee workflows, attendance records, report card modules, staff access, and admin dashboards.',
    results: [
      'Digitized core school administration workflows.',
      'Reduced time spent on fee and student record management.',
      'Improved academic reporting accuracy and staff coordination.'
    ],
    clientName: 'School Administration',
    clientRole: 'Principal',
    clientCompany: 'Educational Institute',
    clientReview: 'The ERP simplified our administrative work and gave us a better way to manage student and fee records.',
    clientRating: 5
  },
  'HRMS Portal': {
    slug: 'hrms-portal',
    overview: 'An HRMS portal built for employee records, attendance, leave approvals, payroll inputs, asset tracking, and HR reporting.',
    challenges: [
      'HR teams needed one place to manage employee data and attendance.',
      'Leave approvals and payroll inputs required better workflow control.',
      'Asset assignment records were difficult to track manually.'
    ],
    solution: 'We developed an HR portal with employee profiles, attendance tracking, leave management, payroll-ready records, asset rosters, and HR dashboards.',
    results: [
      'Centralized employee data and HR operations.',
      'Reduced manual effort in attendance and leave tracking.',
      'Improved visibility into employee assets and HR records.'
    ],
    clientName: 'HR Department',
    clientRole: 'HR Manager',
    clientCompany: 'Growing Business',
    clientReview: 'The HRMS portal made our HR work more structured and gave us quick access to employee information.',
    clientRating: 5
  },
  'Property Listing Platform': {
    slug: 'property-listing-platform',
    overview: 'A property listing platform designed for responsive property browsing, agent profiles, listing management, inquiry forms, and map-friendly layouts.',
    challenges: [
      'Listings needed to look polished across mobile and desktop devices.',
      'Agents required a simple way to publish and manage properties.',
      'Users needed quick inquiry paths from every listing page.'
    ],
    solution: 'We built a responsive listing platform with property cards, detailed listing pages, agent information, inquiry forms, and scalable listing management.',
    results: [
      'Improved listing presentation across all screen sizes.',
      'Made property publishing easier for agents and admins.',
      'Increased inquiry opportunities from listing detail pages.'
    ],
    clientName: 'Listing Operations Team',
    clientRole: 'Business Manager',
    clientCompany: 'Property Services',
    clientReview: 'The platform gave our property listings a professional look and made it easier for users to contact our agents.',
    clientRating: 5
  }
};

async function seedProjectDetails() {
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nexinfosoft';

  await mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: Number(process.env.DB_CONNECT_TIMEOUT_MS || 5000)
  });

  const operations = Object.entries(projectDetails).map(([name, details]) => ({
    updateOne: {
      filter: { name },
      update: { $set: details },
      upsert: false
    }
  }));

  const result = await Project.bulkWrite(operations);
  console.log(`Project details seeded. Matched: ${result.matchedCount}, modified: ${result.modifiedCount}`);
}

if (require.main === module) {
  require('dotenv').config();

  seedProjectDetails()
    .catch((err) => {
      console.error('Failed to seed project details:', err);
      process.exitCode = 1;
    })
    .finally(async () => {
      await mongoose.disconnect();
    });
}

module.exports = projectDetails;
