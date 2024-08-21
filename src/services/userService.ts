import axios from 'axios';
import API_URL from './apiConfig';

export const login = async (credentials: { phone_number: string; password: string }) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};

export const register = async (userData: { full_name: string; phone_number: string; password: string }) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};
