import axios from 'axios';

const API_URL = 'https://7cc6-79-127-241-55.ngrok-free.app/account'; // آدرس واقعی API را وارد کنید

export const login = async (credentials: { phone_number: string; password: string }) => {
  const response = await axios.post(`${API_URL}/login/`, credentials);
  return response.data;
};

export const register = async (userData: { full_name: string; phone_number: string; password: string }) => {
  const response = await axios.post(`${API_URL}/register/`, userData);
  console.log(response)
  return response.data;
};
