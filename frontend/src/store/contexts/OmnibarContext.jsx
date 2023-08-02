// frontend/src/contexts/OmnibarContext.jsx
import { createContext, useState } from 'react';

export const OmnibarContext = createContext();

export const OmnibarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const handleOmnibar = () => setOpen((open) => !open);
  const handleOmnibarClose = () => setOpen(false);
  const handleOmnibarToggle = () => setOpen(!open);

  return (
    <OmnibarContext.Provider
      value={{
        open,
        setOpen,
        handleOmnibar,
        handleOmnibarClose,
        handleOmnibarToggle,
      }}
    >
      {children}
    </OmnibarContext.Provider>
  );
};
