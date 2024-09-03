import axios from 'axios';
import API_URL from './apiConfig';
import { handleApiError } from './errorHandler';

// دریافت تمام تیکت‌ها
export const getTickets = async () => {
  try {
    const response = await axios.get(`${API_URL}/tickets`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// دریافت تیکت بر اساس شناسه
export const getTicketById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/tickets/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// ایجاد یک تیکت جدید
export const createTicket = async (ticketData: any) => {
  try {
    const response = await axios.post(`${API_URL}/tickets`, ticketData);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// ویرایش یک تیکت
export const updateTicket = async (id: number, ticketData: any) => {
  try {
    const response = await axios.put(`${API_URL}/tickets/${id}`, ticketData);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// حذف تیکت بر اساس شناسه
export const deleteTicket = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/tickets/${id}`);
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};
