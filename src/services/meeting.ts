import apiClient from "./axiosConfig";
import { handleApiError } from "./errorHandler";

// دریافت تمام کارمندان
export const getEmployees = async () => {
    try {
      const response = await apiClient.get('/users/profiles');
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  };
  

  // ایجاد جلسه جدید
export const createMeeting = async (meetingData: FormData) => {
    try {
      const response = await apiClient.post('/meeting/meetings/', meetingData, {
        headers: {
          'Content-Type': 'multipart/form-data', // تنظیم هدر مناسب برای ارسال فایل
        },
      });
      return response.data;
    } catch (error) {
      handleApiError(error); // مدیریت خطا
      throw error;
    }
  };

// دریافت تمام جلسات
export const fetchMeetings = async () => {
  try {
    const response = await apiClient.get("/meeting/meetings/");
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};