// frontend/src/shared/hooks/useNavbarjs
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { getPathRoot } from '../utils/network';

const useNavbar = (width = 'isWide') => {
  const getNavHeadingClass = (pathname, currentClass, activeMenu) => {
    if (pathname === '/') {
      return currentClass !== 'remain-out' ? 'slide-out' : 'remain-out';
    } else {
      if (currentClass !== 'remain-in' && activeMenu) {
        return 'slide-in';
      } else {
        return 'remain-in';
      }
    }
  };

  const location = useLocation();

  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const [navHeadingClass, setNavHeadingClass] = useState(
    location.pathname === '/' ? 'remain-in' : 'remain-out'
  );

  useEffect(() => {
    const currentPath = location.pathname;
    const newActiveMenuItem = getPathRoot(currentPath);
    setActiveMenuItem(newActiveMenuItem);

    if (width === 'isWide') {
      const newNavHeadingClass = getNavHeadingClass(
        currentPath,
        navHeadingClass,
        newActiveMenuItem
      );
      setNavHeadingClass(newNavHeadingClass);
    }
  }, [location.pathname, navHeadingClass, width]);

  return width ? { activeMenuItem, navHeadingClass } : { activeMenuItem };
};

export default useNavbar;
