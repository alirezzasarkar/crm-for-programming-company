import apiClient from './axiosConfig';
import { handleApiError } from './errorHandler';

// دریافت پروفایل کاربر بر اساس id
export const getUserProfile = async (id: number) => {
  try {
    const response = await apiClient.get(`/users/profiles/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// دریافت تمام کارمندان
export const getEmployees = async () => {
  try {
    const response = await apiClient.get('/users/profiles');
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};


// دریافت تمام زمان‌های کاری
export const getWorkingHours = async () => {
  try {
    const response = await apiClient.get('/timesheet/list_for_admin/');
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// دریافت تمام زمان‌های کاری
export const getWorkingHoursEmployee = async () => {
  try {
    const response = await apiClient.get('/timesheet/list/');
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// دریافت تایم کاری هفتگی
export const getWeeklyWorkingHours = async () => {
  try {
    const response = await apiClient.get('/timesheet/list_for_admin/?period=week/');
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// دریافت تایم کاری ماهیانه
export const getMonthlyWorkingHours = async () => {
  try {
    const response = await apiClient.get('/timesheet/list_for_admin/?period=month/');
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};


// دریافت یک زمان کاری بر اساس شناسه
export const getWorkingHourById = async (id: number) => {
  try {
    const response = await apiClient.get(`/working-hours/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// حذف یک زمان کاری بر اساس شناسه
export const deleteWorkingHour = async (id: number) => {
  try {
    await apiClient.delete(`/working-hours/${id}`);
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// ویرایش اطلاعات یک زمان کاری
export const updateWorkingHour = async (id: number, workingHourData: any) => {
  try {
    const response = await apiClient.put(`/working-hours/${id}`, workingHourData);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};


// شروع زمان کاری
export const startWorking = async () => {
  try {
    const response = await apiClient.post('/timesheet/start/');
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// وقفه زمان کاری
export const pauseWorking = async () => {
  try {
    const response = await apiClient.post('/timesheet/pause/');
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// ادامه زمان کاری
export const resumeWorking = async () => {
  try {
    const response = await apiClient.post('/timesheet/resume/');
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// ثبت پایان زمان کاری
export const stopWorking = async () => {
  try {
    const response = await apiClient.post('/timesheet/stop/');
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};