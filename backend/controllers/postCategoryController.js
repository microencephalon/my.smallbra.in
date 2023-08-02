// backend/controllers/postCategoryController.js

const asyncHandler = require('express-async-handler');
const PostCategory = require('../models/postCategoryModel');

const getPostCategories = asyncHandler(async (req, res) => {
  const postCategories = await PostCategory.find({});
  res.json(postCategories);
});

const getPostCategoryById = asyncHandler(async (req, res) => {
  const postCategory = await PostCategory.findById(req.params.id);
  if (postCategory) {
    res.json(postCategory);
  } else {
    res.status(404);
    throw new Error('Post Category not found');
  }
});

const createPostCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const postCategory = new PostCategory({ name });
  const createdPostCategory = await postCategory.save();
  res.status(201).json(createdPostCategory);
});

const updatePostCategory = asyncHandler(async (req, res) => {
  const postCategory = await PostCategory.findById(req.params.id);
  if (postCategory) {
    postCategory.name = req.body.name || postCategory.name;
    const updatedPostCategory = await postCategory.save();
    res.json(updatedPostCategory);
  } else {
    res.status(404);
    throw new Error('Post Category not found');
  }
});

const deletePostCategory = asyncHandler(async (req, res) => {
  const postCategory = await PostCategory.findById(req.params.id);
  if (postCategory) {
    await postCategory.remove();
    res.json({ message: 'Post Category removed' });
  } else {
    res.status(404);
    throw new Error('Post Category not found');
  }
});

module.exports = {
  getPostCategories,
  getPostCategoryById,
  createPostCategory,
  updatePostCategory,
  deletePostCategory,
};
