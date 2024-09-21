import apiClient from './axiosConfig';
import { handleApiError } from './errorHandler';

// ایجاد تراکنش جدید
export const createTransaction = async (transactionData: any) => {
  try {
    const response = await apiClient.post('/accounting/transactions/', transactionData);
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