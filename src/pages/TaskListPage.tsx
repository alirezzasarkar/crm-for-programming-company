import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TaskList from "../components/Tasks/TaskList";
import Search from "../components/Common/Search";
import TaskFilter from "../components/Tasks/TaskFilter";
import { fetchTasks, getUserProfile } from "../services/task";
import moment from "jalali-moment";
import { jwtDecode } from "jwt-decode";
import LoadingSpinner from "../components/Common/Loading"; // Import LoadingSpinner component

interface Task {
  id: number;
  sender: string;
  receiver: number;
  team: string;
  title: string;
  due_date: string;
  status: string;
  details: string;
  type: "sent" | "received";
}

interface JwtPayload {
  user_id: number;
}

const TaskListPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [usid, setUsId] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState<boolean>(true); // State for loading
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded: JwtPayload = jwtDecode(token);
        setUsId(decoded.user_id);
      } catch (error) {
        console.error("خطا در دیکود کردن JWT:", error);
      }
    }
  }, []);

  useEffect(() => {
    const getTasks = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const data = await fetchTasks();

        const updatedTasks = await Promise.all(
          data.map(async (task: any) => {
            const userProfile = await getUserProfile(task.sender);

            const persianDueDate = moment(task.due_date)
              .locale("fa")
              .format("YYYY/MM/DD");

            const type = task.receiver === usid ? "received" : "sent";

            return {
              ...task,
              sender: userProfile.last_name,
              due_date: persianDueDate,
              type: type,
            };
          })
        );

        setTasks(updatedTasks);
      } catch (error) {
        console.error("خطا در دریافت داده‌ها:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    getTasks();
  }, [usid]);

  // Filter tasks by type
  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((task) => task.type === filter);

  // Search tasks by sender's last name
  const searchedTasks = filteredTasks.filter((task) =>
    task.sender.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTaskClick = (id: number) => {
    navigate(`/dashboard/tasks/detail/${id}`);
  };

  if (loading) {
    return <LoadingSpinner />; // Show loading spinner while data is being fetched
  }

  return (
    <>
      <div className="flex justify-start mb-4 rtl">
        <Search searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <TaskFilter filter={filter} onFilterChange={setFilter} />
      </div>
      <TaskList tasks={searchedTasks} onTaskClick={handleTaskClick} />
    </>
  );
};

export default TaskListPage;
