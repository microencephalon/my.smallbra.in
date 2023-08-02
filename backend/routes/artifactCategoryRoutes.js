// backend/routes/artifactCategoryRoutes.js

const express = require('express');
const {
  getArtifactCategories,
  getArtifactCategoryById,
  createArtifactCategory,
  updateArtifactCategory,
  deleteArtifactCategory,
} = require('../controllers/artifactCategoryController');

const { protect } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/adminMiddleware');

const router = express.Router();

router
  .route('/')
  .get(getArtifactCategories)
  .post(protect, isAdmin, createArtifactCategory);
router
  .route('/:id')
  .get(getArtifactCategoryById)
  .put(protect, isAdmin, updateArtifactCategory)
  .delete(protect, isAdmin, deleteArtifactCategory);

module.exports = router;
