// backend/controllers/postController.js
const asyncHandler = require('express-async-handler');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Post = require('../models/postModel');
const mongoose = require('mongoose');

// Multer Configuration

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { category } = req.body;

    // Get today's date and format it
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = date.getDate().toString().padStart(2, '0');
    const datePath = `${year}/${month}/${day}`;

    const dir = path.join(
      __dirname,
      '..',
      '..',
      'storage',
      'posts',
      datePath,
      category
    );

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const { title } = req.body;
    const slug = req.body.slug || `${title.replace(/\s/g, '-').toLowerCase()}`;
    const fileExtension = path.extname(file.originalname);
    cb(null, `${slug}${fileExtension}`);
  },
});

const upload = multer({ storage: storage });

// DESC: Get all posts
// @route GET /api/posts
// @access Public
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({});
  res.json(posts);
});

// DESC: Get a post by ID
// @route GET /api/posts/:id
// @access Public
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    res.json(post);
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

// DESC: Get metadata for a post
// @route HEAD '/api/posts/:id' || '/api/posts'
// @access Public
const getPostHead = asyncHandler(async (req, res) => {
  let post;

  if (req.params.id) {
    post = await Post.findById(req.params.id);
  } else {
    post = await Post.find({});
  }

  if (post) {
    res.status(200).end();
  } else {
    res.status(404).end();
  }
});

// DESC: Get options for a post
// @route OPTIONS /api/posts/:id
// @access Public
const getOptions = asyncHandler(async (req, res) => {
  res.header('Allow', 'GET, POST, PATCH, PATCH, HEAD, OPTIONS');
  res.status(204).end();
});

// DESC: Create a post
// @route POST /api/posts
// @access Public // TODO: @access Private <--- set it so there is protection later
const createPost = asyncHandler(async (req, res) => {
  const date = new Date();
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const day = date.getDate().toString().padStart(2, '0');

  const { title, author, category, visible } = req.body;
  const slug = req.body.slug || `${title.replace(/\s/g, '-').toLowerCase()}`;

  // As the user field is required, we are using a placeholder user ID.
  const placeholderUserId = mongoose.Types.ObjectId();

  const fileExtension = path.extname(req.file.originalname);
  const content = `/storage/posts/${year}/${month}/${day}/${category}/${slug}${fileExtension}`;

  const post = new Post({
    user: placeholderUserId, // TODO: user: req.user._id <-- add back later when auth set up
    title,
    author,
    category,
    content,
    slug,
    visible,
  });

  const createdPost = await post.save();

  // Get the _id of the created post
  const postId = createdPost._id;

  // Generate the new file name with the _id appended to the slug
  const newFileName = `${postId}-${slug}${fileExtension}`;

  // Get the current file path
  const currentFilePath = path.join(
    __dirname,
    '../../',
    'storage',
    'posts',
    `${year}`,
    `${month}`,
    `${day}`,
    category,
    `${slug}${fileExtension}`
  );

  // Generate the new file path with the updated file name
  const newFilePath = path.join(
    __dirname,
    '../../',
    'storage',
    'posts',
    `${year}`,
    `${month}`,
    `${day}`,
    category,
    newFileName
  );

  // Rename the file on the file system
  fs.renameSync(currentFilePath, newFilePath);

  // Update the content field of the post with the new file path
  createdPost.content = `/storage/posts/${year}/${month}/${day}/${category}/${newFileName}`;

  // Save the updated post back to the database
  await createdPost.save();

  res.status(201).json(createdPost);
});

// DESC: Update Markdown content of a post
// @route POST /api/posts/update-post/:id
// access Private
const updateContent = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const filePath = path.join(__dirname, '../../', post.content);
    fs.writeFileSync(filePath, req.body.markdown);
    res.status(200).send('Markdown content updated successfully');
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

// DESC: Update a post partially
// @route PATCH /api/posts/:id
// access Private
const patchPost = asyncHandler(async (req, res) => {
  try {
    const { title } = req.body;

    // If title is provided in the request body, update the slug and file name
    if (title) {
      const slug = title.replace(/\s/g, '-').toLowerCase();
      const oldPost = await Post.findById(req.params.id);
      const fileExtension = path.extname(oldPost.content);
      const oldDatePath = oldPost.content.match(
        /\/posts\/(\d{4}\/\d{2}\/\d{2})\/[^/]*\/[^/]*$/
      )[1];
      const postId = oldPost._id;
      const oldFilePath = path.join(__dirname, '../../', oldPost.content);
      const newFilePath = path.join(
        __dirname,
        '../../',
        'storage',
        'posts',
        oldDatePath,
        oldPost.category,
        `${postId}-${slug}${fileExtension}`
      );

      // Rename the file in local storage
      fs.renameSync(oldFilePath, newFilePath);

      req.body.slug = slug;
      req.body.content = `/storage/posts/${oldDatePath}/${oldPost.category}/${postId}-${slug}${fileExtension}`;
    }

    // Update the dateModified field
    req.body.dateModified = new Date();

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true, context: 'query' } // Options
    );

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
});

// DESC: Delete a post
// @route DELETE /api/posts/:id
// @access Private
// backend/controllers/postController.js
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    const filePath = path.join(__dirname, '../../', post.content);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await post.remove();

    // remove empty directories
    let dirPath = path.dirname(filePath);
    let postsDir = path.join(__dirname, '../../', 'storage', 'posts');
    while (dirPath !== postsDir) {
      const files = fs.readdirSync(dirPath);
      if (files.length === 0) {
        fs.rmdirSync(dirPath);
        dirPath = path.dirname(dirPath);
      } else {
        break;
      }
    }

    res.json({ message: 'Post removed' });
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

module.exports = {
  getPosts,
  getPostById,
  createPost,
  upload,
  updateContent,
  patchPost,
  deletePost,
  getPostHead,
  getOptions,
};
