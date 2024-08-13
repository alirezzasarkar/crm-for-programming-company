import React from "react";
import { useParams } from "react-router-dom";
import TaskDetails from "../components/Tasks/TaskDetails";

// Mock data for demonstration
const tasks = [
  {
    index: 1,
    sender: "سجاد باقریان",
    team: "وردپرس",
    title: "این یک متن تستی است",
    deliveryDate: "1403/03/01",
    status: "انجام شده",
    details: "این یک متن تستی از طرف سجاد باقریان، به علیرضا سرکار می باشد",
  },
  {
    index: 2,
    sender: "علی مرادی",
    team: "فرانت اند",
    title: "این یک متن تستی است",
    deliveryDate: "1403/03/01",
    status: "در حال انجام",
    details: "این یک متن تستی از طرف علی مرادی، به علیرضا سرکار می باشد",
  },
  // More tasks...
];

const TaskDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const task = tasks.find((task) => task.index.toString() === id);

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <TaskDetails
      sender={task.sender}
      team={task.team}
      deliveryDate={task.deliveryDate}
      status={task.status}
      title={task.title}
      details={task.details}
    />
  );
};

export default TaskDetailsPage;
