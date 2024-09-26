import apiClient from './axiosConfig';
import { handleApiError } from './errorHandler';

// دریافت اطلاعات پروفایل کاربر
export const getUserProfile = async () => {
  try {
    const response = await apiClient.get(`/users/self/profile/`);  // آدرس درست
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// به‌روزرسانی اطلاعات پروفایل کاربر
export const updateUserProfile = async (profileData: FormData) => {
  try {
    const response = await apiClient.put('/users/self/profile/', profileData, {
      headers: {
        'Content-Type': 'multipart/form-data', // تعیین نوع محتوا
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};


// ارسال کد OTP برای تغییر رمز عبور
export const sendOtpCode = async () => {
  try {
    const response = await apiClient.post('/users/send-otp');
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// تغییر رمز عبور کاربر
export const changePassword = async (passwordData: any) => {
  try {
    const response = await apiClient.post('/users/change-password', passwordData);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};
