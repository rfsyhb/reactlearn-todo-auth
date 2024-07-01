/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import axios from 'axios';

const BASE_URL = 'https://hapitodov.vercel.app';

/**
 * 01 - apiClient
 */
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 02 - interceptor
 */
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * 03 - apiRequest
 */
const apiRequest = async (method, endpoint, data) => {
  try {
    const response = await apiClient({
      method,
      url: endpoint,
      data,
    });
    return response.data;
  } catch (error) {
    console.error('API request error: ', error.response || error.message);
    throw new Error(
      error.response?.data?.message || error.message || 'Something went wrong'
    );
  }
};

export default apiRequest;
