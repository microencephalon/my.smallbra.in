// frontend/craco.config.js
const process = require('process');
const path = require('path');

const isDev = process.env.NODE_ENV === 'development' ? true : false;
const isProd = process.env.NODE_ENV === 'production' ? true : false;

const headers = {
  'Cross-Origin-Embedder-Policy': 'unsafe-none',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
  'Origin-Agent-Cluster': '?1',
  'Referrer-Policy': 'no-referrer',
  'Strict-Transport-Security':
    'max-age=15552000; includSubDomains=true; preload=true',
  'X-Content-Type-Options': 'nosniff',
  'X-DNS-Prefetch-Control': 'off',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Permitted-Cross-Domain-Policies': 'none',
  'X-XSS-Protection': '1; mode=block',
  'Content-Security-Policy':
    "default-src 'self' 'unsafe-inline' ws://localhost:3000 wss://localhost:3000 https://cdn.jsdelivr.net https://unpkg.com http://localhost:8081 http://192.168.1.66:8081 http://localhost:3000 http://localhost:4500 https://fonts.gstatic.com https://fonts.cdnfonts.com https://fonts.googleapis.com https://applesocial.s3.amazonaws.com https://mdg.imgix.net/assets/images/san-juan-mountains.jpg https://www.youtube.com youtube.com https://i.ytimg.com i.ytimg.com ytimg.com https://www.google.com google.com https://yt3.ggpht.com yt3.ggpht.com 192.168.1.66 applesocial.s3.amazonaws.com fonts.cdnfonts.com localhost unpkg.com www.youtube.com;",
};

// https://webpack.js.org/configuration/
module.exports = {
  name: 'my.smallbra.in', // https://webpack.js.org/configuration/other-options/#name
  // extends: [path.resolve(__dirname, './webpackConfigName1.config.js'), path.resolve(__dirname, './webpackConfigName2.config.js')], // https://webpack.js.org/configuration/extending-configurations
  // context: {}, // https://webpack.js.org/configuration/entry-context/
  // entry: {},
  mode: isDev ? 'development' : isProd ? 'production' : 'none',
  // output: {}, // https://webpack.js.org/configuration/output/
  // module: {}, // https://webpack.js.org/configuration/module/
  // resolve: {}, // https://webpack.js.org/configuration/resolve
  // resolveLoader: {}, // https://webpack.js.org/configuration/resolve/#resolveloader
  // optimization: {}, // https://webpack.js.org/configuration/optimization
  // plugins: [], // https://webpack.js.org/configuration/plugins

  devServer: (cfg) => {
    cfg.allowedHosts = isDev ? 'all' : ['smallbra.in', 'my.smallbra.in'];

    cfg.bonjour = false;

    cfg.client = {
      logging: isDev ? 'verbose' : 'none',
      overlay: {
        errors: true,
        warnings: false,
        runtimeErrors: true,
      },
      progress: true,
      reconnect: true,
      webSocketTransport: 'sockjs',
      webSocketURL: {
        protocol: 'ws',
        port: 3000,
        hostname: 'localhost',
        pathname: '/ws',
        // username: '',
        // password: ''
      },
    };

    cfg.webSocketServer = 'sockjs';

    cfg.compress = true;

    cfg.devMiddleware = {
      // index: true,
      // mimeTypes: { phtml: 'text/html' },
      // publicPath: '',
      serverSideRender: true,
      // writeToDisk: true,
    };

    cfg.http2 = false;
    cfg.https = isDev ? false : true;

    cfg.headers = headers;

    // https://webpack.js.org/configuration/dev-server/#devserverhistoryapifallback
    // https://github.com/bripkens/connect-history-api-fallback
    // cfg.historyApiFallback = {
    //   index: 'public/index.html',
    //   rewrites: [{}],
    //   disableDotRule: false,
    //   verbose: true,
    //   htmlAcceptHeaders: ['text/html'],
    // };

    cfg.host = 'local-ipv4'; // https://webpack.js.org/configuration/dev-server/#devserverhost

    cfg.hot = true;

    // https://webpack.js.org/configuration/dev-server/#devserveripc
    // cfg.ipc = true;

    cfg.liveReload = true;

    cfg.magicHtml = true;

    cfg.onListening = function (devServer) {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }
      const port = devServer.server.address().port;
      console.log('Listening on port: ', port);
    };

    cfg.open = {
      app: {
        name: 'Safari',
        arguments: ['--incognito'],
      },
    };

    cfg.port = 3000;

    // https://webpack.js.org/configuration/dev-server/#devserverproxy
    // cfg.proxy = {};

    // https://webpack.js.org/configuration/dev-server/#devserverproxy
    cfg.server = isDev
      ? 'http'
      : {
          type: 'https',
          options: {
            minVersion: 'TLSv1.1',
            // key: fs.readFileSync(path.join(__dirname, './server.key')),
            // pfx: fs.readFileSync(path.join(__dirname, './server.pfx')),
            // cert: fs.readFileSync(path.join(__dirname, './server.crt')),
            // ca: fs.readFileSync(path.join(__dirname, './ca.pem')),
            // passphrase: 'webpack-dev-server',
            // requestCert: true,
          },
        };

    cfg.setupExitSignals = true;

    //Disable deprecated middleware strategies
    cfg.onBeforeSetupMiddleware = cfg.onAfterSetupMiddleware = undefined;

    // Set up middlewares
    cfg.setupMiddlewares = (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }
      // use .unshift() to do something before, use .push() for after
      middlewares.unshift((req, res, next) => {
        const originalSetHeader = res.setHeader;
        const blockedHeaders = ['ETag'];
        res.setHeader = (name, value) => {
          // List of headers to be blocked
          if (!blockedHeaders.includes(name)) {
            originalSetHeader.call(res, name, value);
          }
        };
        res.removeHeader('X-Powered-By');
        next();
      });

      return middlewares;
    };

    cfg.static = [
      {
        directory: path.join(__dirname, 'public'),
        staticOptions: { redirect: true },
        publicPath: '/',
        serveIndex: false,
        watch: true, // https://github.com/paulmillr/chokidar
      },
    ];

    cfg.watchFiles = {
      paths: ['**/*'],
      options: {},
    }; // https://github.com/paulmillr/chokidar

    return cfg;
  },
  // cache: {}, // https://webpack.js.org/configuration/cache
  // target: 'node20.5.1', // https://webpack.js.org/configuration/target
  // watch: true, // https://webpack.js.org/configuration/watch/
  // watchOptions: {}, // https://webpack.js.org/configuration/watch/
  // externals: {}, // https://webpack.js.org/configuration/externals
  // externalsType: '', // https://webpack.js.org/configuration/externals/#externalspresets
  // externalsPresets: '', // https://webpack.js.org/configuration/externals/#externalspresets
  // performance: {}, // https://webpack.js.org/configuration/performance/
  // node: {}, // https://webpack.js.org/configuration/node
  // stats: {}, // https://webpack.js.org/configuration/stats
  // experiments: {}, // https://webpack.js.org/configuration/experiments/
  // amd: false, // https://webpack.js.org/configuration/other-options/#amd
  // bail: true, // https://webpack.js.org/configuration/other-options/#bail
  // dependencies: ['', ''], // https://webpack.js.org/configuration/other-options/#dependencies
  // ignoreWarnings: [], // https://webpack.js.org/configuration/other-options/#ignorewarnings
  // infrastructureLoging: {colors: true, level: 'verbose', console: yourCustomConsole(), debug: [], stream: proces.stderr}, // https://webpack.js.org/configuration/other-options/#infrastructurelogging
  // loader: { answer: 42 }, // https://webpack.js.org/configuration/other-options/#loader // https://webpack.js.org/api/loaders/#the-loader-context
  // paralellism: 100, // https://webpack.js.org/configuration/other-options/#parallelism
  // profile: true, https://webpack.js.org/configuration/other-options/#profile
  // recordsInputPath: path.join(__dirname, 'newRecords.json'), // https://webpack.js.org/configuration/other-options/#recordsinputpath
  // recordsOutputPath: path.join(__dirname, 'newRecords.json'), // https://webpack.js.org/configuration/other-options/#recordsoutputpath
  // recordsPath: path.join(__dirname, 'records.json'), // https://webpack.js.org/configuration/other-options/#recordspath
  // snapshot: {managedPaths: [], immutablePaths: [], buildDependencies: {}, module: {}, resolve: {}, resolveBuildDependencies: {}}, // https://webpack.js.org/configuration/other-options/#snapshot
};
