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

    const response = await apiClient.post('/projects/projects/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set content type for form data
      },
    });
    return response.data;
  } catch (error) {
    console.error("خطا در ایجاد پروژه:", error);
    throw error; // Rethrow or handle as per your application logic
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

// ویرایش پروژه
export const updateProject = async (projectId: number, projectData: ProjectFormInputs) => {
  try {
    const response = await apiClient.put(`/projects/projects/${projectId}`, projectData);
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
