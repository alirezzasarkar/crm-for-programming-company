import apiClient from './axiosConfig';
import { handleApiError } from './errorHandler';

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
export const createContentProjects = async (projectData: ProjectFormInputs) => {
  try {
    const formData = new FormData();

    // Append other project data fields
    for (const key in projectData) {
      if (Array.isArray(projectData[key])) {
        projectData[key].forEach((file: File) => {
          formData.append(key, file); // Append each file to the FormData
        });
      } else {
        formData.append(key, projectData[key as keyof ProjectFormInputs]); // Use key as keyof ProjectFormInputs
      }
    }

    const response = await apiClient.post('/projects/contentprojects/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set content type for form data
      },
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("خطا در ایجاد پروژه:", error);
    throw error; // Rethrow or handle as per your application logic
  }
};

// دریافت لیست پروژه‌ها
export const fetchContentProjects = async () => {
  try {
    const response = await apiClient.get('/projects/contentprojects/');
    console.log(response.data);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// دریافت جزئیات پروژه بر اساس شناسه
export const fetchContentProjectsDetails = async (projectId: number) => {
  try {
    const response = await apiClient.get(`/projects/contentprojects/${projectId}/`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// حذف پروژه بر اساس شناسه
export const contentProjectsDelete = async (projectId: number) => {
  try {
    const response = await apiClient.delete(`/projects/contentprojects/${projectId}/`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

