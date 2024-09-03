// axiosConfig.ts

import axios from 'axios';
import API_URL from './apiConfig';

// ایجاد یک نمونه از axios
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// اضافه کردن interceptor برای هدرها
apiClient.interceptors.request.use(
  (config) => {
    // دریافت توکن JWT از localStorage
    const token = localStorage.getItem('authToken');

    if (token) {
      // اضافه کردن توکن به هدر Authorization
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // اگر خطا در درخواست وجود داشته باشد
    return Promise.reject(error);
  }
);

export default apiClient;
