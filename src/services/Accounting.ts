import apiClient from './axiosConfig';
import { handleApiError } from './errorHandler';

// ایجاد تراکنش جدید
export const createTransaction = async (transactionData: any, selectedFile: File | null) => {
  try {
    const formData = new FormData();

    // اضافه کردن داده‌ها به FormData
    formData.append('transaction_type', transactionData.transaction_type);
    formData.append('amount', transactionData.amount);
    formData.append('description', transactionData.description);

    // اضافه کردن فایل به FormData اگر فایل انتخاب شده باشد
    if (selectedFile) {
      formData.append('file', selectedFile); // اضافه کردن فایل به عنوان 'file'
    }

    // ارسال درخواست با استفاده از axios
    const response = await apiClient.post('/accounting/transactions/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // اطمینان از اینکه نوع محتوای درخواست صحیح است
      },
    });

    return response.data;
  } catch (error) {
    handleApiError(error); // مدیریت خطا
    throw error;
  }
};


// دریافت اطلاعات داشبورد
export const dashboardInfo = async () => {
  try {
    const response = await apiClient.get('/accounting/accounting-overview/');
    console.log(response.data)
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};



// دریافت لیست حقوق کارمندان
export const fetchSalaries = async () => {
    try {
      const response = await apiClient.get('/accounting/salaries/');
      console.log(response.data)
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
};


// دریافت لیست تراکنش‌های واریزی و برداشتی
export const fetchTransactions = async () => {
    try {
      const response = await apiClient.get('/accounting/transactions/');
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
};