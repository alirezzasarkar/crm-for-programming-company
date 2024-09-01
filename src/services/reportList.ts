import axios from 'axios';
import API_URL from './apiConfig';

// درخواست برای دریافت لیست گزارش‌ها
export const fetchReports = async () => {
  try {
    const response = await axios.get(`${API_URL}/reports`);
    return response.data;
  } catch (error) {
    console.error("خطا در دریافت داده‌ها:", error);
    throw error;
  }
};

// شما می‌توانید توابع دیگری نیز برای عملیات مختلف (ایجاد گزارش، ویرایش گزارش و غیره) ایجاد کنید.
