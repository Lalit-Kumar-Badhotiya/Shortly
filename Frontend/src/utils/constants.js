// API endpoint constants
export const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  // Auth endpoints
  SIGNUP: '/user/signup',
  LOGIN: '/user/login',
  
  // URL endpoints
  SHORTEN: '/shorten',
  GET_CODES: '/codes',
  SHORT_CODE: (code) => `/${code}`,
  DELETE_URL: (id) => `/${id}`,
  UPDATE_URL: (id) => `/${id}`,
};
