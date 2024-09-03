import axios from 'axios';
import API_URL from './apiConfig';
import { handleApiError } from './errorHandler';

// ورود
export const login = async (credentials: { phone_number: string; password: string }) => {
  try {
    const response = await axios.post(`${API_URL}/account/login/`, credentials);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// ثبت‌نام
export const register = async (userData: { first_name: string; last_name: string; phone_number: string; password: string }) => {
  try {
    const response = await axios.post(`${API_URL}/account/register/`, userData);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};
