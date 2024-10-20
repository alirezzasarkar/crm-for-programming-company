import apiClient from './axiosConfig';
import { handleApiError } from './errorHandler';
import { ContentProjectFormInputs } from './../components/Projects/AddContentProduction';

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

export const createContentProjects = async (projectData: ContentProjectFormInputs) => {
  try {
    const formData = new FormData();

    // Append other project data fields
    for (const key in projectData) {
      if (projectData.hasOwnProperty(key)) {
        const value = projectData[key as keyof ContentProjectFormInputs];

        // مدیریت فایل (اگر key مربوط به فایل باشد)
        if (key === "contract_file" && value instanceof FileList) {
          if (value.length > 0) {
            formData.append(key, value[0]); // افزودن فایل به فرم دیتا
          }
        }
        // اگر آرایه باشد (مثلاً اعضای تیم)
        else if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(key, item.toString()); // هر آیتم آرایه را اضافه و به رشته تبدیل می‌کنیم
          });
        }
        // تبدیل مقدار boolean به true/false
        else if (typeof value === "boolean") {
          formData.append(key, value ? "true" : "false");
        }
        // اگر مقدار عددی باشد، آن را به رشته تبدیل می‌کنیم
        else if (typeof value === "number") {
          formData.append(key, value.toString());
        }
        // بررسی اینکه مقدار نباید null یا undefined باشد
        else if (value !== undefined && value !== null) {
          formData.append(key, value as string); // به رشته تبدیل می‌شود
        }
      }
    }

    const response = await apiClient.post('/projects/contentprojects/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error("خطا در ایجاد پروژه:", error);
    throw error;
  }
};




// دریافت لیست پروژه‌ها
export const fetchContentProjects = async () => {
  try {
    const response = await apiClient.get('/projects/contentprojects/');
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

