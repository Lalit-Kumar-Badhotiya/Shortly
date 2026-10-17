import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

// Signup user
export const signup = async (userData) => {
  try {
    const response = await api.post(API_ENDPOINTS.SIGNUP, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Signup failed' };
  }
};

// Login user
export const login = async (credentials) => {
  try {
    const response = await api.post(API_ENDPOINTS.LOGIN, credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Login failed' };
  }
};

// Google sign-in / sign-up (credential comes from the Google button itself)
export const googleAuth = async (credential) => {
  try {
    const response = await api.post(API_ENDPOINTS.GOOGLE_AUTH, { credential });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Google sign-in failed' };
  }
};
