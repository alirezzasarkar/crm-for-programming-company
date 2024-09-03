import apiClient from './axiosConfig';
import { handleApiError } from './errorHandler';

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
    const response = await apiClient.post('/tasks', taskData);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// ویرایش تسک
export const updateTask = async (id: number, taskData: any) => {
  try {
    const response = await apiClient.put(`/tasks/${id}`, taskData);
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
