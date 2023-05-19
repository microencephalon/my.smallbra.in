// backend/models/postModel.js
const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  dateModified: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
    required: true,
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
