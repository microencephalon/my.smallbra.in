const oauthRoutes = require('../routes/oauthRoutes');
const userRoutes = require('../routes/userRoutes');
const postRoutes = require('../routes/postRoutes');
const postCategoryRoutes = require('../routes/postCategoryRoutes');
const artifactRoutes = require('../routes/artifactRoutes');
const artifactCategoryRoutes = require('../routes/artifactCategoryRoutes');
const resumeRoutes = require('../routes/resumeRoutes');
const searchRoutes = require('../routes/searchRoutes');

const routes = [
  { path: '/api/oauth', handler: oauthRoutes },
  { path: '/api/users', handler: userRoutes },
  { path: '/api/posts', handler: postRoutes },
  { path: '/api/post-categories', handler: postCategoryRoutes },
  { path: '/api/artifacts', handler: artifactRoutes },
  { path: '/api/artifact-categories', handler: artifactCategoryRoutes },
  { path: '/api/resumes', handler: resumeRoutes },
  { path: '/api/search', handler: searchRoutes },
];

module.exports = { routes };
