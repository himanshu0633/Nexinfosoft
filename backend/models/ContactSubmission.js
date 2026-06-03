const mongoose = require('mongoose');

const contactSubmissionSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  companyName: {
    type: String,
    trim: true,
    default: ''
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  service: {
    type: String,
    required: true,
    trim: true
  },
  budget: {
    type: String,
    required: true,
    trim: true
  },
  details: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'in-discussion', 'converted', 'rejected'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('ContactSubmission', contactSubmissionSchema);
