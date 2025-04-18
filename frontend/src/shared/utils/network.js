// frontend/src/shared/utils/network.js

export function getPathRoot(pathname) {
  if (pathname.startsWith('/blog')) {
    return 'blog';
  } else if (pathname.startsWith('/portfolio')) {
    return 'portfolio';
  } else if (pathname.startsWith('/resume')) {
    return 'resume';
  } else if (pathname.startsWith('/about')) {
    return 'about';
  } else if (pathname.startsWith('/')) {
    return 'home';
  } else {
    return null;
  }
}

export const handleInternalClick = (navigate, endpoint) => {
  navigate(endpoint);
  window.scrollTo(0, 0);
};
