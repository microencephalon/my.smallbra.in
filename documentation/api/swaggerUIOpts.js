// documentation/api/swaggerUIOpts.js
// https://github.com/scottie1984/swagger-ui-express

async function getJWT() {
  const loginRequestObj = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: process.env.SWAGGER_EMAIL,
      password: process.env.SWAGGER_PASSWORD,
    }),
  };

  const response = await fetch(process.env.LOGIN_ENDPOINT, loginRequestObj);

  if (!response.ok) {
    throw new Error('Failed to fetch token');
  }

  const data = await response.json();
  return data.token;
}

async function initializeSwagger() {
  const useBearerAuth = JSON.parse(process.env.PRESET_SWAGGER_BEARER_AUTH);
  let bearerToken, bearerAuthObj;

  if (useBearerAuth) {
    bearerToken = await getJWT();

    bearerAuthObj = {
      name: 'JWT',
      schema: {
        type: 'http',
        in: 'header',
        name: 'Authorization',
      },
      value: `${bearerToken}`,
    };
  }

  const swaggerUIExprOpts = {
    explorer: true,
    swaggerOptions: {
      authAction: {
        bearerAuth: useBearerAuth ? bearerAuthObj : false,
      },
      // https://github.com/swagger-api/swagger-ui/blob/master/docs/usage/configuration.md
      // Core
      // configUrl: 'https://url.com/configDocForm',
      // dom_id: 'idGoesHere',
      // domNode: ElementGoesHere,
      // url: 'https://www.example.com/swagger.json',
      // urls: [{url: 'https://www.example.com/swagger1.json', name: 'First swagger doc'}, {url: 'https://www.example.com/swagger2.yaml', name: 'Second swagger doc'}],
      queryConfigEnabled: false,
      // Display
      deepLinking: false,
      displayOperationId: false,
      defaultModelsExpandDepth: 1,
      defaultModelRendering: 'model', // "example"* | "model"
      displayRequestDuration: false,
      docExpansion: 'list', // 'list'* | 'full' | 'none'
      filter: false, // false | true | '<filterExpression>'
      maxDisplayedTags: Number.POSITIVE_INFINITY,
      // operationsSorter: () => { return 1; },
      showExtensions: true,
      showCommonExtensions: true,
      // tagsSorter: () => { return 1; },
      useUnsafeMarkdown: false,
      // onComplete: () => { return 1; },

      syntaxHighlight: { activate: true, theme: 'agate' },
      tryItOutEnabled: false,
      requestSnippetsEnabled: false,

      // Network
      // oauth2RedirectUrl: 'https://www.what.com/',
      requestInterceptor: (request) => {
        if (request.method && request.method.toLowerCase() === 'options') {
          request.curlOptions = ['-I'];
        } else if (request.method && request.method.toLowerCase() === 'post') {
          request.curlOptions = ['-g', '--limit-rate 20k'];
        } else {
          request.curlOptions = ['-g', '--limit-rate 20k'];
        }
        return request;
      },
      responseInterceptor: (response) => {
        return response;
      },
      showMutatedRequest: true,
      supportSubmitMethods: [
        'get',
        'post',
        'patch',
        'delete',
        'head',
        'options',
      ],
      validatorUrl: 'none',
      withCredentials: false,
      // Macros
      // modelPropertyMacro: (property) => {
      //   console.log(property);
      //   return true;
      // },
      // parameterMacro: (operation, parameter) => {
      //   console.log(operation);
      //   console.log(parameter);
      //   return true;
      // },
      // Authorization
      persistAuthorization: false,
      // Instance Methods
      // https://github.com/swagger-api/swagger-ui/blob/master/docs/usage/configuration.md#instance-methods
      // https://github.com/swagger-api/swagger-ui/blob/master/docs/usage/oauth2.md
      // initOAuth: (configObj) => { return true; },
      // preauthorizeBasic: (authDefinitionKey, username, password) => { return true; },
      // preauthorizeApiKey: (authDefinitionKey, apiKeyValue) => { return true; },
    },
    customCssUrl: ['/ui-config-files/custom-swagger.css'],
    // customJs: ['/ui-config-files/custom.js'],
  };

  // swaggerUIExprOpts.urls.primaryName = 'Second swagger doc';

  return swaggerUIExprOpts;
}

const swaggerUIExprOptsPromise = initializeSwagger();

module.exports = { swaggerUIExprOptsPromise };
