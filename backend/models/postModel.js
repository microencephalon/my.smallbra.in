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
    ref: 'PostCategory',
    required: false,
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
  summary: {
    type: String,
    required: false,
  },
  previewImage: {
    type: String,
    required: false,
  },
  tags: [
    {
      type: String,
    },
  ],
  likes: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  relatedPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
  facebookShares: {
    type: Number,
    default: 0,
  },
  twitterShares: {
    type: Number,
    default: 0,
  },
  pinterestPins: {
    type: Number,
    default: 0,
  },
});

postSchema.index(
  {
    title: 'text',
    author: 'text',
    category: 'text',
    summary: 'text',
  },
  { name: 'GeneralIndex' }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
