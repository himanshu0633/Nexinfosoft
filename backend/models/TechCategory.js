const mongoose = require('mongoose');

const techCategorySchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  desc: {
    type: String,
    trim: true,
    default: ''
  },
  tag: {
    type: String,
    trim: true,
    default: ''
  },
  icon: {
    type: String,
    trim: true,
    default: 'ri-code-s-slash-line'
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('TechCategory', techCategorySchema);
