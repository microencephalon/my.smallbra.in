// backend/controllers/artifactController.js
const asyncHandler = require('express-async-handler');
const Artifact = require('../models/artifactModel');
const { createOrUpdateSearchItem } = require('./searchHelpers');
const SearchItem = require('../models/searchItemModel');

// DESC: Get all artifacts
// @route GET /api/artifacts
// @access Public
const getArtifacts = asyncHandler(async (req, res) => {
  const artifacts = await Artifact.find({});
  res.json(artifacts);
});

// DESC: Get a artifact by ID
// @route GET /api/artifacts/:id
// @access Public
const getArtifactById = asyncHandler(async (req, res) => {
  const artifact = await Artifact.findById(req.params.id);

  if (artifact) {
    res.header('Set-Cookie', 'dummy-cookie=12345');
    res.status(200).json(artifact);
  } else {
    res.status(404);
    throw new Error('Artifact not found');
  }
});

// DESC: Get metadata for a artifact
// @route HEAD '/api/artifacts/:id' || '/api/artifacts'
// @access Public
const getArtifactHead = asyncHandler(async (req, res) => {
  let artifact;

  if (req.params.id) {
    artifact = await Artifact.findById(req.params.id);
  } else {
    artifact = await Artifact.find({});
  }

  if (artifact) {
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

// DESC: Get options for a artifact
// @route OPTIONS /api/artifacts/:id
// @access Public
const getOptions = asyncHandler(async (req, res) => {
  res.header('Allow', 'GET, POST, PATCH, PATCH, HEAD, OPTIONS');
  res.status(204).end();
});

// DESC: Create a artifact
// @route POST /api/artifacts
// @access Public // TODO: @access Private <--- set it so there is protection later
const createArtifact = asyncHandler(async (req, res) => {
  const {
    title,
    teaser,
    description,
    author,
    category,
    url,
    repository,
    visible,
    previewImage,
    media,
    tags,
    views,
    relatedArtifacts,
  } = req.body;

  if (!title || !author || !category || visible === undefined) {
    res.status(400);
    throw new Error('Please include all fields');
  }

  const slug =
    req.body.slug ||
    (title ? `${title.replace(/\s/g, '-').toLowerCase()}` : '');

  // As the user field is required, we are using a placeholder user ID.
  // const placeholderUserId = mongoose.Types.ObjectId();

  const artifact = new Artifact({
    user: req.user._id,
    title,
    teaser,
    description,
    author,
    category,
    url,
    repository,
    slug,
    visible,
    previewImage,
    media,
    tags,
    views,
    relatedArtifacts,
  });

  const createdArtifact = await artifact.save();

  // NOTE: Add this line after creating the artifact
  await createOrUpdateSearchItem(createdArtifact, 'Artifact');

  res.status(201).json(createdArtifact);
});

// DESC: Update a artifact partially
// @route PATCH /api/artifacts/:id
// access Private
const patchArtifact = asyncHandler(async (req, res) => {
  try {
    const { title } = req.body;

    // If title is provided in the request body, update the slug and file name
    if (title) {
      const slug = title.replace(/\s/g, '-').toLowerCase();
      req.body.slug = slug;
    }

    const updatedFields = { ...req.body, dateModified: new Date() };
    const artifact = await Artifact.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true, runValidators: true, context: 'query' } // Options
    );

    // NOTE: Add this line after updating the artifact
    await createOrUpdateSearchItem(artifact, 'Artifact');

    if (!artifact) {
      return res.status(404).json({ error: 'Artifact not found' });
    }

    res.json(artifact);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
});

// DESC: Delete a artifact
// @route DELETE /api/artifacts/:id
// @access Private
// backend/controllers/artifactController.js
const deleteArtifact = asyncHandler(async (req, res) => {
  const artifact = await Artifact.findById(req.params.id);
  if (artifact) {
    // NOTE: Add this line before removing the artifact
    await SearchItem.findOneAndDelete({ refId: req.params.id });

    await artifact.remove();
    res.json({ message: 'Artifact removed' });
  } else {
    res.status(404);
    throw new Error('Artifact not found');
  }
});

module.exports = {
  getArtifacts,
  getArtifactById,
  createArtifact,
  patchArtifact,
  deleteArtifact,
  getArtifactHead,
  getOptions,
};
