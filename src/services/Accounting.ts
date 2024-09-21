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
