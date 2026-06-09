require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nexinfosoft';

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected.');
    const filter = { slug: { $ne: 'recruitment-services' } };
    filter.visible = { $ne: false };
    
    const services = await Service.find(filter).sort({ createdAt: 1 });
    console.log('Query result length:', services.length);
    services.forEach((s, idx) => {
      console.log(`${idx + 1}. Title: "${s.title}", Slug: "${s.slug}", Visible: ${s.visible}, CreatedAt: ${s.createdAt}`);
    });
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
