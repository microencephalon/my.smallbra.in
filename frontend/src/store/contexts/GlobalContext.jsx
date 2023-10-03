// frontend/src/contexts/OmnibarContext.jsx
import { createContext, useState, useEffect } from 'react';

// Initialize the context with default values
export const GlobalContext = createContext({
  blur: false,
  setBlur: () => {},
  isNavMenuOpen: false,
  setIsNavMenuOpen: () => {},
  windowWidth: 0,
  setWindowWidth: () => {},
  isPageNarrow: false,
});

export const GlobalProvider = ({ children }) => {
  const [blur, setBlur] = useState(false);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
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
