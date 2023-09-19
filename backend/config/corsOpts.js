const STAGE = process.env.NODE_ENV;

const exposedHeaders = [
  'Content-Security-Policy',
  'Cross-Origin-Embedder-Policy',
  'Cross-Origin-Opener-Policy',
  'Cross-Origin-Resource-Policy',
  'Origin-Agent-Cluster',
  'Referrer-Policy',
  'Strict-Transport-Security',
  'X-Content-Type-Options',
  'X-DNS_Prefetch-Control',
  'X-Download-Options',
  'X-Frame-Options',
  'X-Permitted-Cross-Domain-Policies',
  'X-XSS-Protection',
  'Access-Control-Allow-Origin',
  'Vary',
  'Access-Control-Allow-Credentials',
  'Content-Type',
  'Content-Length',
  'Date',
  'Connection',
  'Keep-Alive',
  'Access-Control-Allow-Methods',
];

const allowedOrigins = [];

if (STAGE) {
  let origins;
  if (STAGE === 'development') {
    origins = ['http://localhost:3000', 'http://localhost:4000'];
  } else if (STAGE === 'production') {
    origins = ['https://my.smallbra.in', 'https://my.smallbra.in/api-docs'];
  }
  origins.forEach((origin) => allowedOrigins.push(origin));
}

const corsOptions = {
  credentials: true,
  exposedHeaders: exposedHeaders,
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'));
    }
  },
};

module.exports = { corsOptions };
