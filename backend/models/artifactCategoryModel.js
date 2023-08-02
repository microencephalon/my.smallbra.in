// backend/models/artifactCategoryModel.js
const mongoose = require('mongoose');

const artifactCategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: false,
    unique: true,
  },
});

const ArtifactCategory = mongoose.model(
  'ArtifactCategory',
  artifactCategorySchema
);

module.exports = ArtifactCategory;
