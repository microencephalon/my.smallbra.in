// backend/models/postCategoryModel.js
const mongoose = require('mongoose');

const postCategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: false,
    unique: true,
  },
});

const PostCategory = mongoose.model('PostCategory', postCategorySchema);

module.exports = PostCategory;
