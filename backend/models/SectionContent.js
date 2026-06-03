const mongoose = require('mongoose');

const sectionContentSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    trim: true
  },
  subtitle: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  image_url: {
    type: String,
    trim: true
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, { timestamps: true, _id: false }); // Disable automatic _id generation since we explicitly pass _id as string (e.g. 'hero')

module.exports = mongoose.model('SectionContent', sectionContentSchema);
