import apiClient from './axiosConfig';
import { handleApiError } from './errorHandler';

// دریافت تمام زمان‌های کاری
export const getWorkingHours = async () => {
  try {
    const response = await apiClient.get('/working-hours');
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// دریافت یک زمان کاری بر اساس شناسه
export const getWorkingHourById = async (id: number) => {
  try {
    const response = await apiClient.get(`/working-hours/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// حذف یک زمان کاری بر اساس شناسه
export const deleteWorkingHour = async (id: number) => {
  try {
    await apiClient.delete(`/working-hours/${id}`);
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// ویرایش اطلاعات یک زمان کاری
export const updateWorkingHour = async (id: number, workingHourData: any) => {
  try {
    const response = await apiClient.put(`/working-hours/${id}`, workingHourData);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};
