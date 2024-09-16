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

// ارسال کد برای فراموشی رمز عبور همراه با رمز عبور جدید
export const requestResetPassword = async (phone_number: string, newPassword: string) => {
  try {
    const response = await axios.post(`${API_URL}/account/reset-password/`, { 
      phone_number, 
      new_password: newPassword 
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// تأیید کد و ثبت رمز عبور جدید
export const verifyResetPassword = async (otpCode: string, token: string) => {
  try {
    const response = await axios.post(`${API_URL}/account/reset-password/verify/${token}/`, {
      otp_code: otpCode,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};