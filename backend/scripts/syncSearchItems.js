// backend/scripts/syncSearchItems.js
const mongoose = require('mongoose');
const Post = require('../models/postModel');
const Artifact = require('../models/artifactModel');
const { createOrUpdateSearchItem } = require('../controllers/searchHelpers');

const run = async () => {
  // Set strictQuery option for Mongoose
  mongoose.set('strictQuery', true);

  // Connect to your MongoDB database
  await mongoose.connect('mongodb://localhost:27017/mysmallbrain', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Fetch all posts and artifacts
  const posts = await Post.find();
  const artifacts = await Artifact.find();

  // For each post, create or update the corresponding SearchItem
  for (const post of posts) {
    await createOrUpdateSearchItem(post, 'Post');
  }

  // For each artifact, create or update the corresponding SearchItem
  for (const artifact of artifacts) {
    await createOrUpdateSearchItem(artifact, 'Artifact');
  }

  console.log('Synchronization complete');

  // Close the database connection
  mongoose.connection.close();
};

run();
