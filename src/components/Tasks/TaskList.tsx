import React from "react";
import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import Title from "../Common/Title";

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

interface TaskListProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskClick }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md rtl">
      <Title title="لیست تسک ها" />
      <table className="min-w-full bg-white mt-2 border-separate border-spacing-y-3">
        <thead>
          <tr className="text-right">
            <th className="py-2 text-center text-sm font-medium pb-5">ردیف</th>
            <th className="py-2 text-center text-sm font-medium pb-5">
              ارسال شده از
            </th>
            <th className="py-2 text-center text-sm font-medium pb-5">عنوان</th>
            <th className="py-2 text-center text-sm font-medium pb-5">
              زمان تحویل
            </th>
            <th className="py-2 text-center text-sm font-medium pb-5">وضعیت</th>
            <th className="py-2 text-center text-sm font-medium pb-5">
              نمایش جزئیات
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr
              key={index}
              className="bg-gray-100 hover:bg-gray-200 cursor-pointer"
              onClick={() => onTaskClick(task)}
            >
              <td className="py-3 text-sm text-center">{task.index}</td>
              <td className="py-3 text-sm text-center">{task.sender}</td>
              <td className="py-3 text-sm text-center">{task.title}</td>
              <td className="py-3 text-sm text-center">{task.deliveryDate}</td>
              <td className="py-3 text-sm text-center flex justify-center items-center">
                {task.status}
                <FaCheckCircle className="text-green-500 mr-2" />
              </td>
              <td className="py-3 text-sm text-center">
                <FaEllipsisV className="text-gray-500 mx-auto cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
