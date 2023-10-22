const endpoints = require('../store/endpoints');
const oauthRoutes = require('../routes/oauthRoutes');
const userRoutes = require('../routes/userRoutes');
const postRoutes = require('../routes/postRoutes');
const postCategoryRoutes = require('../routes/postCategoryRoutes');
const artifactRoutes = require('../routes/artifactRoutes');
const artifactCategoryRoutes = require('../routes/artifactCategoryRoutes');
const resumeRoutes = require('../routes/resumeRoutes');
const searchRoutes = require('../routes/searchRoutes');

const routes = [
  { path: endpoints['oauth'], handler: oauthRoutes },
  { path: endpoints['users'], handler: userRoutes },
  { path: endpoints['blog'], handler: postRoutes },
  { path: endpoints['blog-categories'], handler: postCategoryRoutes },
  { path: endpoints['portfolio'], handler: artifactRoutes },
  { path: endpoints['portfolio-categories'], handler: artifactCategoryRoutes },
  { path: endpoints['resumes'], handler: resumeRoutes },
  { path: endpoints['search'], handler: searchRoutes },
];

module.exports = { routes };
