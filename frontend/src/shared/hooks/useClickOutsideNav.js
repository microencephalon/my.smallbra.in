import { useEffect } from 'react';

const useClickOutsideNav = (context) => {
  const { setIsNavMenuOpen } = context;
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        event.target.closest('#narrow-nav-current-btn') ||
        event.target.closest(
          'div.bp5-portal:has(a.narrow-nav-menu-item) .bp5-popover-transition-container'
        )
      ) {
        return; // Do nothing
      }
      setIsNavMenuOpen(false);
    };

    // Attach the click event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useClickOutsideNav;
