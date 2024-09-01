import axios from 'axios';
import API_URL from './apiConfig';

// دریافت لیست پروژه‌ها
export const fetchProjects = async () => {
  try {
    const response = await axios.get(`${API_URL}/projects/projects/`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

// دریافت جزئیات پروژه
export const fetchProjectDetails = async (projectId: number) => {
  try {
    const response = await axios.get(`${API_URL}/projects/${projectId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for project ${projectId}:`, error);
    throw error;
  }
};
