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

// درخواست برای دریافت لیست تسک‌ها
export const fetchTasks = async () => {
  try {
    const response = await apiClient.get('/task/tasks/');
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// ایجاد تسک جدید
export const createTask = async (taskData: any) => {
  try {
    const response = await apiClient.post('/task/tasks/', taskData);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// ویرایش تسک
export const updateTask = async (id: number, taskData: any) => {
  try {
    const response = await apiClient.post(`/task/tasks/${id}/mark_as_done/`, taskData);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// حذف تسک بر اساس شناسه
export const deleteTask = async (id: number) => {
  try {
    await apiClient.delete(`/tasks/${id}`);
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};


// دریافت جزئیات تسک بر اساس شناسه
export const getTaskDetails = async (id: number) => {
  try {
    const response = await apiClient.get(`/task/tasks/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};
