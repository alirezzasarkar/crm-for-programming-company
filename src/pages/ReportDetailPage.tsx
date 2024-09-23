import React from "react";
import { useParams } from "react-router-dom";
import ReportDetails from "../components/WorkReports/ReportDetail";

const ReportDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Extract report ID from route

  return (
    <>
      <ReportDetails reportId={parseInt(id, 10)} /> {/* ارسال reportId */}
    </>
  );
};

export default ReportDetailPage;
