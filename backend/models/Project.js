const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  tag: {
    type: String,
    trim: true
  },
  techs: {
    type: [String],
    default: []
  },
  desc: {
    type: String,
    trim: true
  },
  icon: {
    type: String,
    trim: true,
    default: 'ri-briefcase-4-line'
  },
  image_url: {
    type: String,
    trim: true,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
