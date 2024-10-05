import apiClient from './axiosConfig';
import { handleApiError } from './errorHandler';

// دریافت پروفایل کاربر بر اساس id
export const getUserProfile = async (id: number) => {
  try {
    const response = await apiClient.get(`/users/profiles/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

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

// دریافت جزئیات گزارش کار بر اساس id
export const getReportDetails = async (id: number) => {
  try {
    const response = await apiClient.get(`/workreport/workreports/${id}/`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// تایید گزارش کار
export const approveReport = async (id: number) => {
  try {
    const response = await apiClient.post(`/workreport/workreports/${id}/approve/`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};
