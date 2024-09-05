import apiClient from './axiosConfig';
import { handleApiError } from './errorHandler';

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

// دریافت کارمند بر اساس شناسه
export const getEmployeeById = async (id: number) => {
  try {
    const response = await apiClient.get(`/employees/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// حذف کارمند بر اساس شناسه
export const deleteEmployee = async (id: number) => {
  try {
    await apiClient.delete(`/users/${id}/delete/`);
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// ویرایش اطلاعات کارمند
export const updateEmployee = async (id: number, employeeData: any) => {
  try {
    const response = await apiClient.put(`/users/profiles/update/${id}/`, employeeData);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};
