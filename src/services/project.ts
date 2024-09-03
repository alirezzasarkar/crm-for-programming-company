import apiClient from './axiosConfig';
import { handleApiError } from './errorHandler';

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
    const response = await apiClient.get(`/projects/${projectId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};
