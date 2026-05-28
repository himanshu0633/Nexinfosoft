const express = require('express');
const cors = require('cors');
const path = require('path');

// Initialize database connection
require('./config/db');

const app = express();
const PORT = process.env.PORT || 5001;

// Enable CORS and JSON body parses
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register routes
const authRoutes = require('./routes/auth');
const contentRoutes = require('./routes/content');
const uploadRoutes = require('./routes/upload');

app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/upload', uploadRoutes);

// Simple backend status route
app.get('/api/status', (req, res) => {
  res.json({ status: 'active', message: 'Nexinfosoft Express backend is running smoothly.' });
});

// Start Express server
app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`  NEXINFOSOFT BACKEND SERVER IS RUNNING`);
  console.log(`  Local Address: http://localhost:${PORT}`);
  console.log(`==================================================`);
});
