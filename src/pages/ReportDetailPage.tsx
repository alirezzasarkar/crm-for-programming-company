import React from "react";
import { useParams } from "react-router-dom";
import ReportDetails from "../components/WorkReports/ReportDetail";

const ReportDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // استخراج ID گزارش از مسیر

  if (!id) {
    return <div>شناسه گزارش پیدا نشد.</div>; // مدیریت حالت undefined
  }

  return (
    <>
      <ReportDetails reportId={parseInt(id, 10)} />{" "}
      {/* ارسال reportId پارس شده */}
    </>
  );
};

export default ReportDetailPage;
