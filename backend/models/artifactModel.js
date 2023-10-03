// backend/models/artifactModel.js
const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  format: {
    type: String,
    enum: ['video', 'image'],
    required: true,
  },
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
  },
  caption: {
    type: String,
  },
});

const artifactSchema = mongoose.Schema({
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
  teaser: {
    type: String,
    required: false,
    default: 'N/A',
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
  category: {
    type: String,
    ref: 'ArtifactCategory',
    required: false,
  },
  url: {
    type: String,
    required: false,
    default: 'N/A',
  },
  repository: {
    type: String,
    required: false,
    default: 'N/A',
  },
  slug: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
    required: true,
  },
  previewImage: {
    type: String,
    required: false,
  },
  media: [mediaSchema],
  tags: [
    {
      type: String,
    },
  ],
  views: {
    type: Number,
    default: 0,
  },
  relatedArtifacts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artifact',
    },
  ],
});

artifactSchema.index(
  {
    title: 'text',
    teaser: 'text',
    description: 'text',
    author: 'text',
    category: 'text',
  },
  { name: 'GeneralIndex' }
);

const Artifact = mongoose.model('Artifact', artifactSchema);

module.exports = Artifact;
