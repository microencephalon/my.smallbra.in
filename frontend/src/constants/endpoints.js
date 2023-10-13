// frontend/src/constants/endpoints.js

// {BACKEND}/

export const ENDPOINTS = {
  BACKEND: {
    users: 'users',
    posts: 'posts',
    'post-categories': 'post-categories',
    artifacts: 'artifacts',
    'artifact-categories': 'artifact-categories',
    search: 'search',
  },
  FRONTEND: {
    home: '/',
    blog: '/blog',
    portfolio: '/portfolio',
    about: '/about',
  },
  STORAGE: {
    css: 'css',
    images: 'images',
    posts: 'posts',
    resumes: 'resumes',
    'test-files': 'testfiles',
    tmp: 'tmp',
  },
};

// New Endpoint class
export class Endpoint {
  constructor(base) {
    this.base = base + '/api';
  }

  // Generate search endpoint
  getSearch(item, prefix, moreParams) {
    let endpoint;
    const searchPath = ENDPOINTS.BACKEND.search;
    if (prefix) {
      let searchQuery = item.replace(...prefix.replace);
      if (prefix.splitQuery) {
        searchQuery = searchQuery.split(',').map((tag) => tag.trim());
      }
      endpoint = `${this.base}/${searchPath}?${prefix.endpointParam}=${searchQuery}`;
    } else {
      endpoint = `${this.base}/${searchPath}?query=${item}`;
    }

    const newParams = [];
    Object.entries(moreParams).forEach(([key, value]) => {
      if (value) newParams.push(`${key}=${value}`);
    });
    if (newParams.length > 0) {
      endpoint += `&${newParams.join('&')}`;
    }

    return endpoint;
  }
}
