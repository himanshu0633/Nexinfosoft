const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  subtitle: {
    type: String,
    trim: true
  },
  icon: {
    type: String,
    trim: true
  },
  intro: {
    type: String,
    trim: true
  },
  benefits: {
    type: [String],
    default: []
  },
  deliverables: {
    type: [String],
    default: []
  },
  image_url: {
    type: String,
    trim: true,
    default: ''
  },
  visible: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
