// backend/models/resumeModel.js
const mongoose = require('mongoose');

const resumeSchema = mongoose.Schema({
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  dateModified: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
    default: 'N/A',
  },
  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  current: {
    type: Boolean,
    required: true,
  },
});

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;
