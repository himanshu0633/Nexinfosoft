const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const mongoose = require('mongoose');
const SectionContent = require('./models/SectionContent');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nexinfosoft';

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to DB. Fetching about_why and company_profile_strengths...');
    const doc1 = await SectionContent.findById('about_why');
    const doc2 = await SectionContent.findById('company_profile_strengths');
    console.log('--- about_why ---');
    console.log(JSON.stringify(doc1, null, 2));
    console.log('--- company_profile_strengths ---');
    console.log(JSON.stringify(doc2, null, 2));
    process.exit(0);
  })
  .catch(err => {
    console.error('Connection failed:', err);
    process.exit(1);
  });
