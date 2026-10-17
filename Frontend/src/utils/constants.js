// API endpoint constants
export const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

// Google OAuth client id for "Continue with Google" (from .env)
export const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';

export const API_ENDPOINTS = {
  // Auth endpoints
  SIGNUP: '/user/signup',
  LOGIN: '/user/login',
  GOOGLE_AUTH: '/user/auth/google',
  
  // URL endpoints
  SHORTEN: '/shorten',
  GET_CODES: '/codes',
  SHORT_CODE: (code) => `/${code}`,
  DELETE_URL: (id) => `/${id}`,
  UPDATE_URL: (id) => `/${id}`,
};
