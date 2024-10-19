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
export const createMeeting = async (meetingData: {
  title: string;
  description: string;
  meeting_date: string | null;
  participants: number[];
}) => {
  try {
    const response = await apiClient.post('/meetings/meetings/', meetingData, {
      headers: {
        'Content-Type': 'application/json', // تنظیم هدر مناسب برای ارسال JSON
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
    const response = await apiClient.get("/meetings/meetings/");
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// دریافت جزئیات یک جلسه
export const fetchMeetingDetails = async (meetingId: string) => {
  try {
    const response = await apiClient.get(`/meetings/meetings/${meetingId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// وارد کردن صورت جلسه
export const updateMeetingMinutes = async (meetingId: number, minutesData: { records: string }) => {
  try {
    const response = await apiClient.patch(`/meetings/meetings/${meetingId}/`, minutesData);
    return response.data;
  } catch (error) {
    handleApiError(error); // مدیریت خطا
    throw error;
  }
};

// حذف جلسه
export const deleteMeeting = async (meetingId: number) => {
  try {
    const response = await apiClient.delete(`/meetings/meetings/${meetingId}/`);
    return response.data; // ممکن است نیاز داشته باشید که این مقدار را بررسی کنید
  } catch (error) {
    handleApiError(error); // مدیریت خطا
    throw error;
  }
};



