import React from "react";
import { useParams } from "react-router-dom";
import ReportDetails from "../components/WorkReports/ReportDetail";

const ReportDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <ReportDetails />
    </>
  );
};

export default ReportDetailPage;
