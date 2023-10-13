// frontend/src/constants/statusCodes.js
export const HTTP = {
  400: {
    issue: 'Bad Request',
    desc: '',
    reference: 'https://mzl.la/3YAZz1h',
  },
  401: {
    issue: 'Unauthorized',
    desc: 'Valid authentication required to attempt to access this resource.',
    reference: 'https://mzl.la/3lFd955',
  },
  403: {
    issue: 'Forbidden',
    desc: 'Your privileges do not allow you to access this resource.',
    reference: 'https://mzl.la/3YCQhSe',
  },
  404: {
    issue: 'Not Found',
    desc: "The requested path wasn't found.",
    reference: 'https://mzl.la/3XvPGRa',
  },
  409: {
    issue: 'Conflict',
    desc: '',
    reference: 'https://mzl.la/3YYXwUD',
  },
  410: {
    issue: 'Gone',
    desc: 'This resource is no longer available and this condition is likely to be permanent.',
    reference: 'https://mzl.la/413dQ8E',
  },
  429: {
    issue: 'Too Many Requests',
    desc: '',
    reference: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429',
  },
  499: {
    issue: 'Client Closed Request',
    desc: 'The operation was cancelled on the client side.',
    reference: 'https://http.dev/499',
  },
  500: {
    issue: 'Internal Server Error',
    desc: 'There was an internal server error.',
    reference: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500',
  },
  501: {
    issue: 'Not Implemented',
    desc: '',
    reference: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/501',
  },
  503: {
    issue: 'Service Unavailable',
    desc: 'Under maintenance.',
    reference: 'https://mzl.la/3EAQXjp',
  },
  504: {
    issue: 'Gateway Timeout',
    desc: '',
    reference: 'https://mzl.la/3K9LFyR',
  },
  default: {
    issue: 'Unknown Error',
    desc: 'An unknown error occurred.',
    reference: null,
  },
};
