import apiClient from './axiosConfig';
import { handleApiError } from './errorHandler';

// درخواست برای دریافت لیست گزارش‌ها
export const fetchReports = async () => {
  try {
    const response = await apiClient.get('/workreport/workreports/');
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// ایجاد گزارش جدید
export const createReport = async (reportData: any) => {
  try {
    const response = await apiClient.post('/workreport/workreports/', reportData);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// ویرایش گزارش
export const updateReport = async (id: number, reportData: any) => {
  try {
    const response = await apiClient.put(`/workreport/workreports/${id}/`, reportData);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// حذف گزارش بر اساس شناسه
export const deleteReport = async (id: number) => {
  try {
    await apiClient.delete(`/workreport/workreports/${id}/`);
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};
