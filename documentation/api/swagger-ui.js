// documentation/swagger-ui.js
const express = require('express');
const swaggerUIExpress = require('swagger-ui-express');
require('dotenv').config();
const { readFileSync } = require('fs');
const { parse: parseYAML } = require('yaml');
const { swaggerUIExprOptsPromise } = require('./swaggerUIOpts');
const path = require('path');

const app = express();

// If your Swagger file is in YAML format
const openAPIYAML = readFileSync(path.join(__dirname, 'openapi.yaml'), 'utf8');
const openAPIDocument = parseYAML(openAPIYAML);

// Serve the scripts
app.use(
  '/ui-config-files',
  express.static(path.join(__dirname, 'ui-config-files'))
);

swaggerUIExprOptsPromise.then((swaggerUIExprOpts) => {
  app.use(
    '/',
    swaggerUIExpress.serve,
    swaggerUIExpress.setup(openAPIDocument, swaggerUIExprOpts)
  );

  app.listen(4000, () => {
    console.log('Server is running on port 4000, http://localhost:4000');
  });
});
