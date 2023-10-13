// frontend/src/store/contexts/GlobalContext.jsx
import { createContext, useState, useEffect } from 'react';

// Initialize the context with default values
export const GlobalContext = createContext({
  blur: false,
  setBlur: () => {},
  blurNarrowNav: false,
  setBlurNarrowNav: () => {},
  isNavMenuOpen: false,
  setIsNavMenuOpen: () => {},
  windowWidth: 0,
  setWindowWidth: () => {},
  isPageNarrow: false,
});

export const GlobalProvider = ({ children }) => {
  const GLOBAL_RESETS = {
    blur: false,
    blurNarrowNav: false,
    isNavMenuOpen: false,
    isPageNarrow: false,
    // omit windowWidth from a reset value
  };
  const [blur, setBlur] = useState(GLOBAL_RESETS.blur);
  const [blurNarrowNav, setBlurNarrowNav] = useState(
    GLOBAL_RESETS.blurNarrowNav
  );
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(
    GLOBAL_RESETS.isNavMenuOpen
  );
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isPageNarrow = windowWidth <= 800;

  return (
    <GlobalContext.Provider
      value={{
        blur,
        setBlur,
        blurNarrowNav,
        setBlurNarrowNav,
        isNavMenuOpen,
        setIsNavMenuOpen,
        windowWidth,
        setWindowWidth,
        isPageNarrow,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
