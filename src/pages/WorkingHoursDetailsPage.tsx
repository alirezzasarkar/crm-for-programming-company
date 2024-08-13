import React from "react";
import { useParams } from "react-router-dom";
import WorkingHoursDetails from "../components/WorkingHours/WorkingHoursDetails";

const WorkingHoursDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Dummy data for the details; in a real app, you'd fetch this data based on the ID
  const workDetails = {
    date: "1403/03/21",
    recordedTime: "5 ساعت و 45 دقیقه",
  };

  return (
    <div className="container mx-auto p-4">
      <WorkingHoursDetails
        date={workDetails.date}
        recordedTime={workDetails.recordedTime}
      />
    </div>
  );
};

export default WorkingHoursDetailsPage;
