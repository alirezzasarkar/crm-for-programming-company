import axios from "axios";
import API_URL from './apiConfig';

// درخواست برای دریافت لیست تسک‌ها
export const fetchTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
  } catch (error) {
    console.error("خطا در دریافت داده‌ها:", error);
    throw error;
  }
};

// می‌توانید توابع دیگری نیز برای عملیات مختلف (ایجاد تسک، ویرایش تسک و غیره) ایجاد کنید.
