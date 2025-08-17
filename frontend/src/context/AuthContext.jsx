import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Create the context
const AuthContext = createContext(null);

// 2. Create the provider component
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

  useEffect(() => {
    // This effect ensures the state stays in sync with localStorage
    const token = localStorage.getItem('authToken');
    setAuthToken(token);
  }, []);

  const login = (token) => {
    localStorage.setItem('authToken', token);
    setAuthToken(token);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
  };

  const isAuthenticated = !!authToken;

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Create a custom hook for easy access to the context
export const useAuth = () => {
  return useContext(AuthContext);
};