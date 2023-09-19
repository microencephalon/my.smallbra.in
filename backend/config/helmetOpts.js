const helmetOptions = {
  contentSecurityPolicy: {
    useDefaults: false,
    directives: {
      'default-src': ["'self'"],
      'base-uri': ["'self'"],
      'font-src': ["'self'", 'https:', 'data:'],
      'form-action': ["'self'"],
      'frame-ancestors': ["'self'"],
      'img-src': ["'self'", 'data:'],
      'object-src': ["'none'"],
      'script-src': ["'self'"],
      'script-src-attr': ["'none'"],
      'style-src': ["'self'", 'https:', "'unsafe-inline'"],
      'upgrade-insecure-requests': [], // No sources needed for this directive
    },
    reportOnly: false,
  },
  crossOriginEmbedderPolicy: {
    policy: 'credentialless', // unsafe-none | credentialless | require-corp
  },
  crossOriginOpenerPolicy: {
    policy: 'same-origin', // unsafe-none | same-origin-allow-popups | same-origin
  },
  crossOriginResourcePolicy: {
    policy: 'same-origin', // same-site | same-origin | cross-origin
  },
  originAgentCluster: true, // boolean
  referrerPolicy: {
    policy: ['no-referrer'], // no-referrer | no-referrer-when-downgrade | origin | origin-when-cross-origin | same-origin | strict-origin | strict-origin-when-cross-origin | unsafe-url
  },
  strictTransportSecurity: {
    maxAge: 15552000,
    includeSubDomains: true,
    preload: true,
  },
  xContentTypeOptions: true,
  xDnsPrefetchControl: {
    allow: false,
  },
  xDownloadOptions: true,
  xFrameOptions: {
    action: 'sameorigin', // deny -> DENY | sameorigin -> SAMEORIGIN
  },
  xPermittedCrossDomainPolicies: {
    permittedPolicies: 'none', // none | master-only | by-content-type | all
  },
  xPoweredBy: false, // boolean
  xXssProtection: true, // boolean
};

module.exports = { helmetOptions };
