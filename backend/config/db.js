const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

const dbPath = path.join(__dirname, '..', 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Connected to local SQLite database at:', dbPath);
    initializeTables();
  }
});

function initializeTables() {
  db.serialize(() => {
    // 1. Create Users Table
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      )
    `);

    // 2. Create Section Content Table
    db.run(`
      CREATE TABLE IF NOT EXISTS section_content (
        id TEXT PRIMARY KEY,
        title TEXT,
        subtitle TEXT,
        description TEXT,
        image_url TEXT,
        metadata TEXT
      )
    `);

    // 3. Seed Default Admin User
    db.get("SELECT * FROM users WHERE username = 'admin'", [], async (err, row) => {
      if (err) {
        console.error('Error checking admin user:', err.message);
        return;
      }
      if (!row) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        db.run("INSERT INTO users (username, password) VALUES (?, ?)", ['admin', hashedPassword], (insertErr) => {
          if (insertErr) {
            console.error('Failed to seed admin user:', insertErr.message);
          } else {
            console.log('Default admin user successfully seeded (username: admin, password: admin123)');
          }
        });
      }
    });

    // 4. Seed Default Section Contents
    const defaultContents = [
      {
        id: 'hero',
        title: 'Build Scalable',
        subtitle: 'For Modern Teams',
        description: 'Nexinfosoft designs high-performance SaaS platforms, ERP systems, mobile apps, CRM workflows, and AI automation tools that help modern businesses move faster, reduce manual work, and unlock measurable growth.',
        image_url: '/assets/images/web_dev_poster.png',
        metadata: JSON.stringify({
          tag: 'AI Powered Digital Transformation Studio',
          rotatingKeywords: ['ERP Systems', 'AI Automation', 'SaaS Platforms', 'Mobile Apps', 'CRM Solutions'],
          trustPills: ['Secure Architecture', 'Fast Delivery', 'Growth Focused'],
          stats: [
            { label: 'Digital projects', value: '100+' },
            { label: 'Business clients', value: '50+' },
            { label: 'Delivery health', value: '99%' }
          ]
        })
      },
      {
        id: 'stats',
        title: 'Our Track Record',
        subtitle: 'Key Metrics',
        description: 'Verified operations metrics',
        image_url: '',
        metadata: JSON.stringify({
          counters: [
            { target: 100, suffix: '+', label: 'Projects Completed' },
            { target: 50, suffix: '+', label: 'Happy Clients' },
            { target: 5, suffix: '+', label: 'Years Experience' },
            { target: 99, suffix: '%', label: 'Client Retention' }
          ]
        })
      },
      {
        id: 'services',
        title: 'Everything Your Business Needs To Build,',
        subtitle: 'Scale & Automate',
        description: 'From web apps to AI automation, we deliver secure and scalable digital solutions that help your business grow faster, operate smarter, and launch with confidence.',
        image_url: '',
        metadata: JSON.stringify({
          badge: 'Core Services',
          capabilityStack: {
            kicker: 'Digital Capability Stack',
            title: 'Enterprise delivery console for modern product teams',
            description: 'End-to-end planning, design, development, cloud deployment, QA, security and optimization under one reliable delivery system.'
          }
        })
      },
      {
        id: 'whychooseus',
        title: 'Why Global Businesses Choose',
        subtitle: 'Nexinfosoft',
        description: 'We align engineering with business outcomes through structured planning, secure implementation, clear reporting, and dependable support.',
        image_url: '',
        metadata: JSON.stringify({
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
        })
      }
    ];

    defaultContents.forEach((content) => {
      db.get("SELECT id FROM section_content WHERE id = ?", [content.id], (err, row) => {
        if (err) {
          console.error(`Error checking section ${content.id}:`, err.message);
          return;
        }
        if (!row) {
          db.run(
            `INSERT INTO section_content (id, title, subtitle, description, image_url, metadata) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [content.id, content.title, content.subtitle, content.description, content.image_url, content.metadata],
            (insertErr) => {
              if (insertErr) {
                console.error(`Failed to seed section ${content.id}:`, insertErr.message);
              } else {
                console.log(`Default content seeded successfully for section: ${content.id}`);
              }
            }
          );
        }
      });
    });
  });
}

module.exports = db;
