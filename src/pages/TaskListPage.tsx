import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TaskList from "../components/Tasks/TaskList";
import Search from "../components/Common/Search";
import TaskFilter from "../components/Tasks/TaskFilter";
import { fetchTasks } from "../services/taskList"; // ایمپورت تابع API

interface Task {
  index: number;
  sender: string;
  team: string;
  title: string;
  deliveryDate: string;
  status: string;
  details: string;
  type: "sent" | "received";
}

const TaskListPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>("sent");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // استفاده از تابع fetchTasks برای دریافت داده‌ها
  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (error) {
        console.error("خطا در دریافت داده‌ها:", error);
      }
    };

    getTasks();
  }, []);

  // فیلتر کردن تسک‌ها براساس نوع آن‌ها
  const filteredTasks = tasks.filter((task) => task.type === filter);

  // تابع کلیک بر روی تسک
  const handleTaskClick = (task: Task) => {
    navigate(`/dashboard/tasks/detail/${task.index}`);
  };

  return (
    <>
      <div className="flex justify-start mb-4 rtl">
        <Search searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <TaskFilter filter={filter} onFilterChange={setFilter} />
      </div>
      <TaskList tasks={filteredTasks} onTaskClick={handleTaskClick} />
    </>
  );
};

export default TaskListPage;
