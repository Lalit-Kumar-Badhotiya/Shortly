import React, { createContext, useState, useContext, useEffect } from 'react';
import { getToken, saveToken, getUser, saveUser, clearAuth } from '../utils/localStorage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on mount
    const existingToken = getToken();
    if (existingToken) {
      setToken(existingToken);
      // Restore the saved user profile (name/email/picture) if we have one
      setUser(getUser() || { authenticated: true });
    }
    setLoading(false);
  }, []);

  const login = (authToken, userData = null) => {
    saveToken(authToken);
    setToken(authToken);
    setUser(userData || { authenticated: true });
    if (userData) {
      saveUser(userData);
    }
  };

  const logout = () => {
    clearAuth();
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!token;
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
