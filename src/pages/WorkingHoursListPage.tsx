import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkingHoursList from "../components/WorkingHours/WorkingHoursList";
import {
  getWorkingHours,
  getWorkingHoursEmployee,
  deleteWorkingHour,
  updateWorkingHour,
  getWeeklyWorkingHours,
  getMonthlyWorkingHours,
  getEmployees,
} from "../services/workingHours";
import moment from "jalali-moment";
import { useAuth } from "../components/Authentication/AuthContext";

interface WorkTimeEntry {
  id: number;
  user: string; // نام خانوادگی کارمند
  team: string; // تیم کارمند
  date: string; // تاریخ
  total_worked_time: string; // زمان کار کرده
  jalali_date: string; // تاریخ به فرمت جلالی
}

const WorkingHoursListPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [workTimeEntries, setWorkTimeEntries] = useState<WorkTimeEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [employeeMap, setEmployeeMap] = useState<{ [key: number]: string }>({});
  const [period, setPeriod] = useState<"week" | "month" | "all">("all");

  const fetchEmployees = async () => {
    try {
      const employees = await getEmployees();
      const map: { [key: number]: string } = {};
      employees.forEach((employee: any) => {
        map[employee.id] = employee.last_name; // نام خانوادگی را نگه‌داری می‌کند
      });
      setEmployeeMap(map);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const fetchWorkingHours = async () => {
    try {
      let data;
      if (user?.role === "employee") {
        data = await getWorkingHoursEmployee();
      } else {
        if (period === "week") {
          data = await getWeeklyWorkingHours();
        } else if (period === "month") {
          data = await getMonthlyWorkingHours();
        } else {
          data = await getWorkingHours();
        }
      }

      if (!Array.isArray(data.timesheets)) {
        console.error("Received data is not an array:", data);
        return;
      }

      const entriesWithJalaliDate = data.timesheets.map((entry: any) => ({
        ...entry,
        user: employeeMap[entry.user], // اینجا باید نام خانوادگی درست نمایش داده شود
        team: entry.team,
        jalali_date: moment(entry.date).format("jYYYY/jMM/jDD"),
        total_worked_time: entry.total_worked_time.split(".")[0],
      }));

      setWorkTimeEntries(entriesWithJalaliDate);
    } catch (error) {
      console.error("Error fetching working hours:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteWorkingHour(id);
      setWorkTimeEntries(workTimeEntries.filter((entry) => entry.id !== id));
    } catch (error) {
      console.error("Error deleting working hour:", error);
    }
  };

  const handleUpdate = async (id: number, updatedEntry: WorkTimeEntry) => {
    try {
      const updatedData = await updateWorkingHour(id, updatedEntry);
      setWorkTimeEntries(
        workTimeEntries.map((entry) => (entry.id === id ? updatedData : entry))
      );
    } catch (error) {
      console.error("Error updating working hour:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchEmployees(); // Fetch employees first
      fetchWorkingHours(); // Then fetch working hours
    };

    fetchData();
  }, [period]);

  useEffect(() => {
    if (Object.keys(employeeMap).length > 0) {
      fetchWorkingHours(); // Fetch working hours after employeeMap is populated
    }
  }, [employeeMap]);

  return (
    <WorkingHoursList
      workTimeEntries={workTimeEntries}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      // onEntryClick={(entry) =>
      //   navigate(`/dashboard/work-time/detail/${entry.id}`)
      // }
      onDelete={handleDelete}
      onUpdate={handleUpdate}
      setPeriod={setPeriod}
    />
  );
};

export default WorkingHoursListPage;
