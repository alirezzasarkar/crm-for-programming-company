import apiClient from './axiosConfig';
import { handleApiError } from './errorHandler';
import { ProjectFormInputs } from '../pages/AddProjectPage'; // Adjust path as needed

// دریافت تمام کارمندان برای نام مدیر پروژه
export const getEmployees = async () => {
  try {
    const response = await apiClient.get('/users/profiles');
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// ایجاد پروژه جدید
export const createProject = async (projectData: ProjectFormInputs) => {
  try {
    const response = await apiClient.post('/projects/projects/', projectData);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// دریافت لیست پروژه‌ها
export const fetchProjects = async () => {
  try {
    const response = await apiClient.get('/projects/projects/');
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// دریافت جزئیات پروژه
export const fetchProjectDetails = async (projectId: number) => {
  try {
    const response = await apiClient.get(`/projects/projects/${projectId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// حذف پروژه
export const deleteProject = async (projectId: number) => {
  try {
    const response = await apiClient.delete(`/projects/projects/${projectId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};
