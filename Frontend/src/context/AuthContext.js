import React, { createContext, useState, useContext, useEffect } from 'react';
import { getToken, saveToken, removeToken, clearAuth } from '../utils/localStorage';

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
      // You could decode the JWT here to get user info
      // For now, we'll just mark the user as authenticated
      setUser({ authenticated: true });
    }
    setLoading(false);
  }, []);

  const login = (authToken, userData = null) => {
    saveToken(authToken);
    setToken(authToken);
    setUser(userData || { authenticated: true });
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
