// backend/controllers/resumeController.js

const asyncHandler = require('express-async-handler');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Resume = require('../models/resumeModel');
const mongoose = require('mongoose');

// Multer Configuration
const date = new Date();
const year = date.getFullYear().toString();
const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
const day = date.getDate().toString().padStart(2, '0');
const dateString = `${year}-${month}-${day}`;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Get today's date and format it

    const dir = path.join(__dirname, '..', '..', 'storage', 'resumes');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const { title } = req.body;
    const semanticNameString = `${title.replace(/\s/g, '-').toLowerCase()}`;
    const fileExtension = path.extname(file.originalname);
    cb(null, `${dateString}-${semanticNameString}${fileExtension}`);
  },
});

const upload = multer({ storage: storage });

// DESC: Get all resumes
// @route GET /api/resumes
// @access Public
const getResumes = asyncHandler(async (req, res) => {
  const resumes = await Resume.find({});
  res.json(resumes);
});

// DESC: Get a resume by ID
// @route GET /api/resumes/:id
// @access Public
const getResumeById = asyncHandler(async (req, res) => {
  const resume = await Resume.findById(req.params.id);

  if (resume) {
    res.json(resume);
  } else {
    res.status(404);
    throw new Error('Resume not found');
  }
});

// DESC: Create a resume
// @route POST /api/resumes
// @access Public
const createResume = asyncHandler(async (req, res) => {
  const date = new Date();
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const day = date.getDate().toString().padStart(2, '0');
  const dateString = `${year}-${month}-${day}`;

  const { title, author, current } = req.body;

  // As the user field is required, we are using a placeholder user ID.
  // const placeholderUserId = mongoose.Types.ObjectId();

  const fileExtension = path.extname(req.file.originalname);
  const semanticNameString = `${title.replace(/\s/g, '-').toLowerCase()}`;
  const content = `/storage/resumes/${dateString}-${semanticNameString}${fileExtension}`;

  const resume = new Resume({
    user: req.user._id,
    title,
    author,
    content,
    current,
  });

  const createdResume = await resume.save();

  res.status(201).json(createdResume);
});

// DESC: Update a resume partially
// @route PATCH /api/resumes/:id
// access Private
const patchResume = asyncHandler(async (req, res) => {
  try {
    const { title } = req.body;

    if (title) {
      const newSemanticNameString = `${title
        .replace(/\s/g, '-')
        .toLowerCase()}`;
      const oldResume = await Resume.findById(req.params.id);
      const fileExtension = path.extname(oldResume.content);
      const oldDatePath = oldResume.content.match(
        /\/(\d{4}-\d{2}-\d{2})-/
      )?.[1];
      const oldFilePath = path.join(__dirname, '../../', oldResume.content);
      const newFilePath = path.join(
        __dirname,
        '../../',
        'storage',
        'resumes',
        `${oldDatePath}-${newSemanticNameString}${fileExtension}`
      );
      // Rename the file in local storage
      fs.renameSync(oldFilePath, newFilePath);
      req.body.content = `/storage/resumes/${oldDatePath}-${newSemanticNameString}${fileExtension}`;
    }
    // Update the dateModified field
    req.body.dateModified = new Date();

    const resume = await Resume.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      context: 'query',
    });

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    res.json(resume);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
});

// DESC: Delete a resume
// @route DELETE /api/resumes/:id
// @access Private
const deleteResume = asyncHandler(async (req, res) => {
  const resume = await Resume.findById(req.params.id);

  if (resume) {
    const filePath = path.join(__dirname, '../../', resume.content);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await resume.remove();
    res.json({ message: 'Resume removed' });
  } else {
    res.status(404);
    throw new Error('Resume not found');
  }
});

// DESC: Update a resume's content
// @route POST /api/resumes/update-resume/:id
// @access Private
const updateContent = asyncHandler(async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ error: 'Post not found' });
    }
    const filePath = path.join(__dirname, '../../', resume.content);
    fs.writeFileSync(filePath, req.body.markdown);
    res.status(200).send('Markdown content updated successfully');
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

// DESC: Get a resume head by ID
// @route HEAD /api/resumes/:id
// @access Public
const getResumeHead = asyncHandler(async (req, res) => {
  const resume = await Resume.findById(req.params.id);

  if (resume) {
    res.status(200).end();
  } else {
    res.status(404).end();
  }
});

// DESC: Get options for the resumes API
// @route OPTIONS /api/resumes
// @access Public
const getOptions = (req, res) => {
  res.header('Allow', 'GET, POST, PATCH, DELETE, HEAD, OPTIONS');
  res.status(200).end();
};

const getCurrent = async (req, res) => {
  try {
    const resume = await Resume.findOne({ current: true });
    if (!resume) {
      res.status(404);
      throw new Error('No current resume found');
    }
    res.json(resume);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
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
};
