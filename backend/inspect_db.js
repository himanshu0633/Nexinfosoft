require('dotenv').config();
const mongoose = require('mongoose');
const SectionContent = require('./models/SectionContent');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nexinfosoft';

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to DB. Fetching all SectionContent records...');
    const sections = await SectionContent.find({});
    console.log('Total sections found:', sections.length);
    sections.forEach(sec => {
      console.log(`- ID: ${sec._id}, Page: ${sec.page}, Visible: ${sec.visible}, Order: ${sec.order}, Title: "${sec.title}"`);
    });
    process.exit(0);
  })
  .catch(err => {
    console.error('Connection failed:', err);
    process.exit(1);
  });
