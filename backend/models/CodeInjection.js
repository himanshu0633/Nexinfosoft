const mongoose = require('mongoose');

const codeInjectionSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true,
    unique: true
  },
  headCode: {
    type: String,
    default: ''
  },
  bodyCode: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('CodeInjection', codeInjectionSchema);
