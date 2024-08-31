import axios from 'axios';
import API_URL from './apiConfig';

// نوع تراکنش
export interface Transaction {
  id: number;
  amount: string;
  date: string;
}

// تابع برای واکشی تراکنش‌ها از API
export const fetchTransactions = async (): Promise<Transaction[]> => {
  try {
    const response = await axios.get('');  // مسیر API را تنظیم کنید
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the transactions!", error);
    throw error;
  }
};

// تابع برای اضافه کردن تراکنش جدید
export const addTransaction = async (newTransaction: Transaction): Promise<Transaction> => {
  try {
    const response = await axios.post('', newTransaction);  // مسیر API را تنظیم کنید
    return response.data;
  } catch (error) {
    console.error("There was an error adding the transaction!", error);
    throw error;
  }
};
