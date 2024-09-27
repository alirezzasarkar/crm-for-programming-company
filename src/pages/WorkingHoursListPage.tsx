import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkingHoursList from "../components/WorkingHours/WorkingHoursList";
import {
  getWorkingHours,
  deleteWorkingHour,
  updateWorkingHour,
} from "../services/workingHours";
import { getEmployees } from "../services/workingHours"; // Import getEmployees
import moment from "jalali-moment"; // Import jalali-moment

interface WorkTimeEntry {
  id: number;
  user: string; // Last name of the user
  date: string;
  total_worked_time: string;
  jalali_date: string; // Add jalali_date for displaying the Persian date
}

const WorkingHoursListPage: React.FC = () => {
  const navigate = useNavigate();
  const [workTimeEntries, setWorkTimeEntries] = useState<WorkTimeEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [employeeMap, setEmployeeMap] = useState<{ [key: number]: string }>({}); // Mapping of user ID to last name

  const fetchEmployees = async () => {
    try {
      const employees = await getEmployees();
      // Create a map of user IDs to last names
      const map: { [key: number]: string } = {};
      employees.forEach((employee: any) => {
        map[employee.id] = employee.last_name; // Assuming last_name is the correct field
      });
      setEmployeeMap(map);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const fetchWorkingHours = async () => {
    try {
      const data = await getWorkingHours();
      // Convert dates to Jalali format and map user IDs to last names
      const entriesWithJalaliDate = data.map((entry: any) => ({
        ...entry,
        user: employeeMap[entry.user] || "نامشخص", // Use last name or default to "نامشخص"
        jalali_date: moment(entry.date).format("jYYYY/jMM/jDD"), // Convert to Jalali
        total_worked_time: entry.total_worked_time.split(".")[0], // Truncate milliseconds
      }));
      setWorkTimeEntries(entriesWithJalaliDate);
    } catch (error) {
      console.error("Error fetching working hours data:", error);
    }
  };

  useEffect(() => {
    fetchEmployees(); // Fetch employees when the component mounts
  }, []);

  useEffect(() => {
    fetchWorkingHours(); // Fetch working hours when employee map is updated
  }, [employeeMap]);

  const handleDelete = async (id: number) => {
    try {
      await deleteWorkingHour(id);
      setWorkTimeEntries(workTimeEntries.filter((entry) => entry.id !== id));
    } catch (error) {
      console.error("Error deleting working hour:", error);
    }
  };

  const handleUpdate = async (id: number, updatedData: WorkTimeEntry) => {
    try {
      const updatedEntry = await updateWorkingHour(id, updatedData);
      setWorkTimeEntries(
        workTimeEntries.map((entry) => (entry.id === id ? updatedEntry : entry))
      );
    } catch (error) {
      console.error("Error updating working hour:", error);
    }
  };

  const handleClick = (detail: WorkTimeEntry) => {
    navigate(`/dashboard/work-time/detail/${detail.id}`);
  };

  // Filter the work time entries based on the search query
  const filteredEntries = workTimeEntries.filter(
    (entry) => entry.user.includes(searchQuery) // Check if the last name includes the search query
  );

  return (
    <>
      <WorkingHoursList
        workTimeEntries={filteredEntries} // Pass the filtered entries
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onEntryClick={handleClick}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    </>
  );
};

export default WorkingHoursListPage;
