const mongoose = require('mongoose');
const Post = require('./models/postModel');
const Artifact = require('./models/artifactModel');
const { createOrUpdateSearchItem } = require('./controllers/searchHelpers');

const run = async () => {
  // Connect to your MongoDB database
  await mongoose.connect('mongodb://localhost:27017/mysmallbrain', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
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
