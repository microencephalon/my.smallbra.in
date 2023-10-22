const path = require('path');
const STAGE = process.env.NODE_ENV;

const routing = {
  isCaseSensitive: false,
  isStrict: false,
};

// DESC: express.disable() options
function getExpressDisableOpts() {
  let options;
  if (STAGE === 'development') {
    options = ['x-powered-by', 'etag', 'view cache'];
  } else if (STAGE === 'production') {
    options = ['x-powered-by', 'etag'];
  }

  if (!routing.isCaseSensitive) options.push('case sensitive routing');
  if (!routing.isStrict) options.push('strict routing');

  return options;
}

const disable = getExpressDisableOpts(STAGE);

// DESC: express.enable() options
function getExpressEnableOpts() {
  let options;
  if (STAGE === 'development') {
    options = [];
  } else if (STAGE === 'production') {
    options = ['trust proxy', 'view-cache'];
  }

  if (routing.isCaseSensitive) options.push('case sensitive routing');
  if (routing.isStrict) options.push('strict routing');

  return options;
}

const enable = getExpressEnableOpts(STAGE);

// DESC: express.json() options
function getExpressJSONOpts() {
  const options = {
    inflate: true,
    limit: '100kb',
    reviver: null,
    strict: true,
    type: 'application/json',
    verify: undefined,
  };

  return options;
}

const json = getExpressJSONOpts();

// DESC: express.raw() options
function getExpressRawOpts() {
  const options = {
    inflate: true,
    limit: '100kb',
    type: 'application/octet-stream',
    verify: undefined,
  };

  return options;
}

const raw = getExpressRawOpts();

// DESC: express.Router() options
function getExpressRouterOpts(routerOpts) {
  const isValidRouterOpts = (obj) => {
    if (!obj) {
      console.error(
        'Invalid object argument. Must pass in an object with this structure: ' +
          '{caseSensitive: Boolean, mergeParams: Boolean, strict: Boolean }'
      );
      return false;
    }
    const keys = ['caseSensitive', 'mergeParams', 'strict'];
    return keys.every(
      (key) => obj.hasOwnProperty(key) && typeof obj[key] === 'boolean'
    );
  };

  let options;
  if (!isValidRouterOpts(routerOpts)) {
    options = {
      caseSensitive: routing.isCaseSensitive,
      mergeParams: false,
      strict: routing.isStrict,
    };
  } else {
    options = routerOpts;
  }

  return options;
}

const router = getExpressRouterOpts;

// DESC: express.static() root and options
function getExpressStaticOpts() {
  const root = path.join(__dirname, '../../frontend/build');
  const options = {
    dotfiles: 'ignore',
    etag: !disable.includes('etag'), // if 'etag' in disable opts, then set false
    extensions: false,
    fallthrough: true,
    immutable: false,
    index: 'index.html',
    lastModified: true,
    maxAge: 0,
    redirect: true,
    setHeaders: function (res, path, stat) {
      res.set('x-timestamp', Date.now());
    },
  };

  return { root, options };
}

const statick = getExpressStaticOpts();

// DESC: express.text() options
function getExpressTextOpts() {
  const options = {
    defaultCharset: 'utf-8',
    inflate: true,
    limit: '100kb',
    type: 'text/plain',
    verify: undefined,
  };

  return options;
}

const text = getExpressTextOpts();

// DESC: express.urlencoded() options
function getUrlEncodedOpts() {
  const options = {
    extended: false,
    inflate: true,
    limit: '100kb',
    parameterLimit: 1000,
    type: 'application/x-www-form-urlencoded',
    verify: undefined,
  };

  return options;
}

const urlencoded = getUrlEncodedOpts();

module.exports = {
  enable,
  disable,
  json,
  raw,
  router,
  static: statick,
  text,
  urlencoded,
};
