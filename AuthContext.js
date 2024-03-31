

import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const userToken = () => { // Use 'userToken' for consistency
    const storedToken = localStorage.getItem('authToken');
    setToken(storedToken);
  };

  useEffect(() => {
    userToken(); // Fetch token on mount
  }, []); // Empty dependency array to run only once

  const loginUser = (newToken) => {
    setToken(newToken);
    localStorage.setItem('authToken', newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('authToken');
  };

  const isLoggedIn = !!token; // Check if token exists

  return (
    <AuthContext.Provider value={{ userToken, setToken, loginUser, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
