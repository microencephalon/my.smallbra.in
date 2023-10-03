// backend/scripts/syncSearchItems.js
const mongoose = require('mongoose');
const Post = require('../models/postModel');
const Artifact = require('../models/artifactModel');
const SearchItem = require('../models/searchItemModel'); // Import the SearchItem model
const { createOrUpdateSearchItem } = require('../controllers/searchHelpers');

// Function to remove stale search items
const removeStaleSearchItems = async () => {
  // Fetch all search items
  const searchItems = await SearchItem.find({});

  // Loop through each search item to check if it exists in the actual database
  for (const searchItem of searchItems) {
    const refId = searchItem.refId;
    const onModel = searchItem.onModel;

    let item;
    if (onModel === 'Post') {
      item = await Post.findById(refId);
    } else if (onModel === 'Artifact') {
      item = await Artifact.findById(refId);
    }

    // If not found, remove the search item from the SearchItem collection
    if (!item) {
      await SearchItem.deleteOne({ _id: searchItem._id });
      console.log(`Deleted stale search item with refId: ${refId}`);
    }
  }
};

const syncSearchItems = async () => {
  console.log('Syncing search items in database...');
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

  // Remove stale search items
  await removeStaleSearchItems();

  console.log('Synchronization of search items complete.');

  // Close the database connection
  mongoose.connection.close();
};

module.exports = syncSearchItems;
