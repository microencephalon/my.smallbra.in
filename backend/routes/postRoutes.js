// backend/routes/postRoutes.js
const express = require('express');
const {
  getPosts,
  getPostById,
  createPost,
  upload,
  updateContent,
  patchPost,
  deletePost,
  getPostHead,
  getOptions,
} = require('../controllers/postController');

// TODO: Use authentication middleware
// const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// TODO: For authentication
// router.route('/').get(getPosts).post(protect, ...createPost);
router
  .route('/')
  .get(getPosts)
  .post(upload.single('file'), createPost)
  .head(getPostHead)
  .options(getOptions);

router
  .route('/:id')
  .get(getPostById)
  .patch(patchPost)
  .delete(deletePost)
  .head(getPostHead)
  .options(getOptions);

router.route('/update-post/:id').post(updateContent);

module.exports = router;
