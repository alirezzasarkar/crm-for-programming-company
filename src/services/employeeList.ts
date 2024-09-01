// employeeApi.ts
import axios from 'axios';
import API_URL from './apiConfig';

// دریافت تمام کارمندان
export const getEmployees = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/profiles`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

// دریافت کارمند بر اساس شناسه
export const getEmployeeById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/employees/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching employee:', error);
    throw error;
  }
};

// حذف کارمند بر اساس شناسه
export const deleteEmployee = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/employees/${id}`);
  } catch (error) {
    console.error('Error deleting employee:', error);
    throw error;
  }
};

// ویرایش اطلاعات کارمند
export const updateEmployee = async (id: number, employeeData: any) => {
  try {
    const response = await axios.put(`${API_URL}/users/profiles/update/${id}/`, employeeData);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error updating employee:', error);
    throw error;
  }
};
