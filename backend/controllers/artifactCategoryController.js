// backend/controllers/artifactCategoryController.js

const asyncHandler = require('express-async-handler');
const ArtifactCategory = require('../models/artifactCategoryModel');

const getArtifactCategories = asyncHandler(async (req, res) => {
  const artifactCategories = await ArtifactCategory.find({});
  res.json(artifactCategories);
});

const getArtifactCategoryById = asyncHandler(async (req, res) => {
  const artifactCategory = await ArtifactCategory.findById(req.params.id);
  if (artifactCategory) {
    res.json(artifactCategory);
  } else {
    res.status(404);
    throw new Error('Artifact Category not found');
  }
});

const createArtifactCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const artifactCategory = new ArtifactCategory({ name });
  const createdArtifactCategory = await artifactCategory.save();
  res.status(201).json(createdArtifactCategory);
});

const updateArtifactCategory = asyncHandler(async (req, res) => {
  const artifactCategory = await ArtifactCategory.findById(req.params.id);
  if (artifactCategory) {
    artifactCategory.name = req.body.name || artifactCategory.name;
    const updatedArtifactCategory = await artifactCategory.save();
    res.json(updatedArtifactCategory);
  } else {
    res.status(404);
    throw new Error('Artifact Category not found');
  }
});

const deleteArtifactCategory = asyncHandler(async (req, res) => {
  const artifactCategory = await ArtifactCategory.findById(req.params.id);
  if (artifactCategory) {
    await artifactCategory.remove();
    res.json({ message: 'Artifact Category removed' });
  } else {
    res.status(404);
    throw new Error('Artifact Category not found');
  }
});

module.exports = {
  getArtifactCategories,
  getArtifactCategoryById,
  createArtifactCategory,
  updateArtifactCategory,
  deleteArtifactCategory,
};
