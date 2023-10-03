// backend/controllers/artifactCategoryController.js

const asyncHandler = require('express-async-handler');
const ArtifactCategory = require('../models/artifactCategoryModel');
const PostCategory = require('../models/postCategoryModel');

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
    throw new Error('Category not found');
  }
});

const createArtifactCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400);
    throw new Error('Please include all fields');
  }
  const artifactCategory = new ArtifactCategory({ name });

  try {
    const createdArtifactCategory = await artifactCategory.save();
    res.status(201).json(createdArtifactCategory);
  } catch (error) {
    if (error.code === 11000) {
      const existingCategory = await ArtifactCategory.findOne({ name });
      res.status(409).json({
        message:
          "Database conflict. Unable to create new post category, duplicate entry detected. See 'conflictingData' field.",
        conflictingData: existingCategory,
      });
    }
  }
});

const updateArtifactCategory = asyncHandler(async (req, res) => {
  const artifactCategory = await ArtifactCategory.findById(req.params.id);
  if (artifactCategory) {
    if (artifactCategory.name === req.body.name) {
      res.status(200).json({
        message:
          'No modifications made as the input value was the same as the current value.',
        unmodifiedData: artifactCategory,
      });
    } else {
      artifactCategory.name = req.body.name || artifactCategory.name;
      const updatedArtifactCategory = await artifactCategory.save();
      res.json(updatedArtifactCategory);
    }
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

const deleteArtifactCategory = asyncHandler(async (req, res) => {
  const artifactCategory = await ArtifactCategory.findById(req.params.id);
  if (artifactCategory) {
    await artifactCategory.remove();
    res.json({ message: 'Category removed' });
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

module.exports = {
  getArtifactCategories,
  getArtifactCategoryById,
  createArtifactCategory,
  updateArtifactCategory,
  deleteArtifactCategory,
};
