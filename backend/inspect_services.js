require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nexinfosoft';

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to DB. Fetching all Service records...');
    const services = await Service.find({});
    console.log('Total services found in DB:', services.length);
    services.forEach((s, idx) => {
      console.log(`${idx + 1}. Title: "${s.title}", Slug: "${s.slug}", Visible: ${s.visible}, CreatedAt: ${s.createdAt}`);
    });
    process.exit(0);
  })
  .catch(err => {
    console.error('Connection failed:', err);
    process.exit(1);
  });
