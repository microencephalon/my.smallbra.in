// backend/routes/postRoutes.js
const express = require('express');
const {
  getPosts,
  getPaginatedPosts,
  getPostById,
  createPost,
  upload,
  updateContent,
  patchPost,
  deletePost,
  getPostHead,
  getOptions,
} = require('../controllers/postController');

const { protect } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/adminMiddleware');
const validateCategory = require('../middleware/categoryMiddleware');

const PostCategory = require('../models/postCategoryModel');

const router = express.Router();
router
  .route('/')
  .get(getPosts)
  .post(
    protect,
    isAdmin,
    upload.single('file'),
    validateCategory(PostCategory),
    createPost
  )
  .head(getPostHead)
  .options(getOptions);

router.route('/pg').get(getPaginatedPosts);

router
  .route('/:id')
  .get(getPostById)
  .patch(protect, isAdmin, validateCategory(PostCategory), patchPost)
  .delete(protect, isAdmin, deletePost)
  .head(getPostHead)
  .options(getOptions);

router.route('/update-post/:id').post(protect, isAdmin, updateContent);

module.exports = router;
