// backend/routes/postCategoryRoutes.js

const express = require('express');
const {
  getPostCategories,
  getPostCategoryById,
  createPostCategory,
  updatePostCategory,
  deletePostCategory,
} = require('../controllers/postCategoryController');

const { protect } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/adminMiddleware');

const router = express.Router();

router
  .route('/')
  .get(getPostCategories)
  .post(protect, isAdmin, createPostCategory);
router
  .route('/:id')
  .get(getPostCategoryById)
  .put(protect, isAdmin, updatePostCategory)
  .delete(protect, isAdmin, deletePostCategory);

module.exports = router;
