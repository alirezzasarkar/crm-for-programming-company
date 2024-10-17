import { ContentProjectFormInputs } from '../components/Projects/AddContentProduction';
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
export const createContentProjects = async (projectData: ContentProjectFormInputs) => {
  try {
    const formData = new FormData();

    // Append other project data fields
    for (const key in projectData) {
      const value = projectData[key as keyof ContentProjectFormInputs];

      // بررسی و مدیریت انواع مختلف داده‌ها
      if (Array.isArray(value)) {
        // اگر مقدار یک آرایه از فایل‌ها باشد
        value.forEach((file: File) => {
          formData.append(key, file); // اضافه کردن هر فایل به formData
        });
      } else if (value instanceof File) {
        formData.append(key, value); // اضافه کردن فایل به formData
      } else if (typeof value === 'number' || typeof value === 'boolean') {
        formData.append(key, String(value)); // تبدیل number/boolean به string
      } else if (typeof value === 'string' && value !== '') {
        formData.append(key, value); // اضافه کردن string به formData
      }
      // اگر مقدار null یا undefined باشد، آن را نادیده می‌گیریم.
    }

    const response = await apiClient.post('/projects/contentprojects/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // تنظیم نوع محتوا برای formData
      },
    });
    
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("خطا در ایجاد پروژه:", error);
    throw error; // پرتاب دوباره یا مدیریت خطا
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

