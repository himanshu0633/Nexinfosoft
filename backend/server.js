require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// Initialize database connection
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 4001;

// Enable CORS and JSON body parses
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register routes
const authRoutes = require('./routes/auth');
const contentRoutes = require('./routes/content');
const uploadRoutes = require('./routes/upload');
const servicesRoutes = require('./routes/services');
const projectsRoutes = require('./routes/projects');
const techstackRoutes = require('./routes/techstack');
const techcategoriesRoutes = require('./routes/techcategories');
const contactRoutes = require('./routes/contact');

app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/techstack', techstackRoutes);
app.use('/api/techcategories', techcategoriesRoutes);
app.use('/api/contact', contactRoutes);

// Simple backend status route
app.get('/api/status', (req, res) => {
  res.json({
    status: 'active',
    database: {
      connected: db.readyState === 1,
      state: ['disconnected', 'connected', 'connecting', 'disconnecting'][db.readyState] || 'unknown'
    },
    message: 'Nexinfosoft Express backend is running.'
  });
});

// Export app for serverless deployment
module.exports = app;

// Start Express server if run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(`  NEXINFOSOFT BACKEND SERVER IS RUNNING`);
    console.log(`  Local Address: http://localhost:${PORT}`);
    console.log(`  MongoDB: configured (${db.readyState === 1 ? 'connected' : 'connecting'})`);
    console.log(`==================================================`);
  });
}

