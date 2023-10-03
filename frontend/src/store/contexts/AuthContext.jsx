// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false); // set this to true upon successful admin login
  const [token, setToken] = useState(null);

  return (
    <AuthContext.Provider value={{ isAdmin, setIsAdmin, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
