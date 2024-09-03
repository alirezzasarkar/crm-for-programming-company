import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkingHoursList from "../components/WorkingHours/WorkingHoursList";
import {
  getWorkingHours,
  deleteWorkingHour,
  updateWorkingHour,
} from "../services/workingHours";

interface WorkTimeEntry {
  id: number;
  name: string;
  team: string;
  timeRecorded: string;
}

const WorkingHoursListPage: React.FC = () => {
  const navigate = useNavigate();
  const [workTimeEntries, setWorkTimeEntries] = useState<WorkTimeEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // تابع برای دریافت لیست زمان‌های کاری از API
  const fetchWorkingHours = async () => {
    try {
      const data = await getWorkingHours();
      setWorkTimeEntries(data);
    } catch (error) {
      console.error("Error fetching working hours data:", error);
    }
  };

  useEffect(() => {
    fetchWorkingHours(); // دریافت داده‌ها هنگام بارگذاری کامپوننت
  }, []);

  // تابع برای حذف یک ورودی
  const handleDelete = async (id: number) => {
    try {
      await deleteWorkingHour(id);
      setWorkTimeEntries(workTimeEntries.filter((entry) => entry.id !== id));
    } catch (error) {
      console.error("Error deleting working hour:", error);
    }
  };

  // تابع برای ویرایش یک ورودی
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

  return (
    <>
      <WorkingHoursList
        workTimeEntries={workTimeEntries}
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
