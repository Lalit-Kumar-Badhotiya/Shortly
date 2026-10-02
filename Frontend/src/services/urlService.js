import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

// Shorten a URL
export const shortenUrl = async (urlData) => {
  try {
    const response = await api.post(API_ENDPOINTS.SHORTEN, urlData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to shorten URL' };
  }
};

// Get all user's shortened URLs
export const getAllUrls = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.GET_CODES);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch URLs' };
  }
};

// Delete a URL
export const deleteUrl = async (id) => {
  try {
    const response = await api.delete(API_ENDPOINTS.DELETE_URL(id));
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to delete URL' };
  }
};

// Update a URL
export const updateUrl = async (id, urlData) => {
  try {
    const response = await api.put(API_ENDPOINTS.UPDATE_URL(id), urlData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to update URL' };
  }
};
