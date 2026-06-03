const mongoose = require('mongoose');

const techItemSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String,
    trim: true
  },
  desc: {
    type: String,
    trim: true
  },
  color: {
    type: String,
    trim: true,
    default: 'rgba(255,255,255,0.05)'
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, { timestamps: true });

module.exports = mongoose.model('TechItem', techItemSchema);
