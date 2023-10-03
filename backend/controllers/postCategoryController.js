// backend/controllers/postCategoryController.js

const asyncHandler = require('express-async-handler');
const PostCategory = require('../models/postCategoryModel');

const getPostCategories = asyncHandler(async (req, res) => {
  const postCategories = await PostCategory.find({});
  res.status(200).json(postCategories);
});

const getPostCategoryById = asyncHandler(async (req, res) => {
  const postCategory = await PostCategory.findById(req.params.id);
  if (postCategory) {
    res.status(200).json(postCategory);
  } else {
    res.status(404).json({ message: 'Category not found' });
    throw new Error('Category not found');
  }
});

const createPostCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400);
    throw new Error('Please include all fields');
  }
  const postCategory = new PostCategory({ name });

  try {
    const createdPostCategory = await postCategory.save();
    res.status(201).json(createdPostCategory);
  } catch (error) {
    if (error.code === 11000) {
      const existingCategory = await PostCategory.findOne({ name });
      res.status(409).json({
        message:
          "Database conflict. Unable to create new post category, duplicate entry detected. See 'conflictingData' field.",
        conflictingData: existingCategory,
      });
    }
  }
});

const updatePostCategory = asyncHandler(async (req, res) => {
  const postCategory = await PostCategory.findById(req.params.id);
  if (postCategory) {
    postCategory.name = req.body.name || postCategory.name;
    const updatedPostCategory = await postCategory.save();
    res.status(200).json(updatedPostCategory);
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

const deletePostCategory = asyncHandler(async (req, res) => {
  const postCategory = await PostCategory.findById(req.params.id);
  if (postCategory) {
    await postCategory.remove();
    res.status(200).json({ message: 'Category removed' });
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

module.exports = {
  getPostCategories,
  getPostCategoryById,
  createPostCategory,
  updatePostCategory,
  deletePostCategory,
};
