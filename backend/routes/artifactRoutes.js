// backend/routes/artifactRoutes.js
const express = require('express');
const {
  getArtifacts,
  getArtifactById,
  createArtifact,
  patchArtifact,
  deleteArtifact,
  getArtifactHead,
  getOptions,
} = require('../controllers/artifactController');

const { protect } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/adminMiddleware');
const validateCategory = require('../middleware/categoryMiddleware');

const ArtifactCategory = require('../models/artifactCategoryModel');

const router = express.Router();

// TODO: For authentication
// router.route('/').get(getArtifacts).artifact(protect, ...createArtifact);
router
  .route('/')
  .get(getArtifacts)
  .post(protect, isAdmin, validateCategory(ArtifactCategory), createArtifact)
  .head(getArtifactHead)
  .options(getOptions);

router
  .route('/:id')
  .get(getArtifactById)
  .patch(protect, isAdmin, validateCategory(ArtifactCategory), patchArtifact)
  .delete(protect, isAdmin, deleteArtifact)
  .head(getArtifactHead)
  .options(getOptions);

module.exports = router;
