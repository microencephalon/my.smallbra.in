// backend/routes/resumeRoutes.js
const express = require('express');
const {
  getResumes,
  getResumeById,
  createResume,
  upload,
  updateContent,
  patchResume,
  deleteResume,
  getResumeHead,
  getOptions,
  getCurrent,
} = require('../controllers/resumeController');

const { protect } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/adminMiddleware');

const { setUniqueCurrentResume } = require('../middleware/resumeMiddleware');

const router = express.Router();

router
  .route('/')
  .get(getResumes)
  .post(
    protect,
    isAdmin,
    upload.single('file'),
    setUniqueCurrentResume,
    createResume
  )
  .head(getResumeHead)
  .options(getOptions);

router.route('/current').get(getCurrent);

router
  .route('/:id')
  .get(getResumeById)
  .patch(protect, isAdmin, setUniqueCurrentResume, patchResume) // TODO: Need to update client-side axios.patch() for resume
  .delete(protect, isAdmin, deleteResume) // TODO: Need to update client-side axios.patch() for resume
  .head(getResumeHead)
  .options(getOptions);

router.route('/update-resume/:id').post(protect, isAdmin, updateContent);

module.exports = router;
