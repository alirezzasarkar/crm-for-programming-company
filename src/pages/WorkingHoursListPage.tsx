// WorkingHoursListPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkingHoursList from "../components/WorkingHours/WorkingHoursList";
import {
  getWorkingHours,
  deleteWorkingHour,
  updateWorkingHour,
  getWeeklyWorkingHours,
  getMonthlyWorkingHours,
} from "../services/workingHours";
import { getEmployees } from "../services/workingHours";
import moment from "jalali-moment";

interface WorkTimeEntry {
  id: number;
  user: string;
  date: string;
  total_worked_time: string;
  jalali_date: string;
}

const WorkingHoursListPage: React.FC = () => {
  const navigate = useNavigate();
  const [workTimeEntries, setWorkTimeEntries] = useState<WorkTimeEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [employeeMap, setEmployeeMap] = useState<{ [key: number]: string }>({});
  const [period, setPeriod] = useState<"week" | "month" | "all">("all");

  const fetchEmployees = async () => {
    try {
      const employees = await getEmployees();
      console.log("Fetched employees:", employees);
      const map: { [key: number]: string } = {};
      employees.forEach((employee: any) => {
        map[employee.id] = employee.last_name;
      });
      setEmployeeMap(map);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const fetchWorkingHours = async () => {
    try {
      let data;
      if (period === "week") {
        data = await getWeeklyWorkingHours();
      } else if (period === "month") {
        data = await getMonthlyWorkingHours();
      } else {
        data = await getWorkingHours();
      }

      console.log(`Fetched working hours for period: ${period}`, data);

      const entriesWithJalaliDate = data.map((entry: any) => ({
        ...entry,
        user: employeeMap[entry.user] || "نامشخص",
        jalali_date: moment(entry.date).format("jYYYY/jMM/jDD"),
        total_worked_time: entry.total_worked_time.split(".")[0],
      }));
      setWorkTimeEntries(entriesWithJalaliDate);
    } catch (error) {
      console.error("Error fetching working hours data:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    fetchWorkingHours();
  }, [period]);

  useEffect(() => {
    if (employeeMap) {
      fetchWorkingHours();
    }
  }, [employeeMap]);

  const handleDelete = async (id: number) => {
    try {
      await deleteWorkingHour(id);
      console.log(`Deleted working hour with ID: ${id}`);
      setWorkTimeEntries(workTimeEntries.filter((entry) => entry.id !== id));
    } catch (error) {
      console.error("Error deleting working hour:", error);
    }
  };

  const handleUpdate = async (id: number, updatedData: WorkTimeEntry) => {
    try {
      const updatedEntry = await updateWorkingHour(id, updatedData);
      console.log(`Updated working hour with ID: ${id}`, updatedEntry);
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

  const filteredEntries = workTimeEntries.filter((entry) =>
    entry.user.includes(searchQuery)
  );

  return (
    <>
      <WorkingHoursList
        workTimeEntries={filteredEntries}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onEntryClick={handleClick}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        setPeriod={setPeriod} // ارسال setPeriod به عنوان پروپ
      />
    </>
  );
};

export default WorkingHoursListPage;
