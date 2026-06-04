const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    trim: true,
    lowercase: true
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
  },
  overview: {
    type: String,
    required: true,
    trim: true,
  },
  challenges: {
    type: [String],
    required: true,
    validate: {
      validator: (items) => items.length > 0,
      message: 'At least one project challenge is required.'
    }
  },
  solution: {
    type: String,
    required: true,
    trim: true,
  },
  results: {
    type: [String],
    required: true,
    validate: {
      validator: (items) => items.length > 0,
      message: 'At least one project result is required.'
    }
  },
  clientName: {
    type: String,
    required: true,
    trim: true,
  },
  clientRole: {
    type: String,
    trim: true,
    default: ''
  },
  clientCompany: {
    type: String,
    trim: true,
    default: ''
  },
  clientReview: {
    type: String,
    required: true,
    trim: true,
  },
  clientRating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
