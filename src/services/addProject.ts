import axios from 'axios';

import API_URL from './apiConfig';

// تابع کمکی برای ایجاد FormData از داده‌های متنی و فایل‌ها
const createFormData = (data: any, files: { [key: string]: FileList | undefined }) => {
  const formData = new FormData();
  
  // افزودن فیلدهای متنی به FormData
  Object.keys(data).forEach(key => {
    if (data[key] !== undefined && data[key] !== null) {
      formData.append(key, data[key]);
    }
  });

  // افزودن فایل‌ها به FormData
  Object.keys(files).forEach(key => {
    if (files[key] && files[key].length > 0) {
      formData.append(key, files[key][0]); // فرض بر این است که فقط یک فایل ارسال می‌شود
    }
  });

  return formData;
};

// تابع برای ایجاد پروژه
export const createProject = async (data: any, files: { [key: string]: FileList | undefined }) => {
  try {
    const formData = createFormData(data, files);

    const response = await axios.post(`${API_URL}/projects`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data; // بازگشت داده‌های پاسخ از سرور
  } catch (error) {
    console.error('خطا در ایجاد پروژه:', error);
    throw error;
  }
};
