import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Title from "../Common/Title";
import moment from "jalali-moment";
import Swal from "sweetalert2"; // Import SweetAlert2
import { getReportDetails, approveReport } from "../../services/report";

interface Report {
  id: number;
  user: number;
  date: string;
  content: string;
  is_approved: boolean;
}

const ReportDetails: React.FC<{ reportId: number }> = ({ reportId }) => {
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const fetchedReport = await getReportDetails(reportId);
        setReport(fetchedReport);
      } catch (error) {
        console.error("Failed to fetch report details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [reportId]);

  const handleApprove = async () => {
    if (report && !report.is_approved) {
      try {
        await approveReport(reportId);
        setReport(
          (prevReport) => prevReport && { ...prevReport, is_approved: true }
        );

        // نمایش پیغام تایید شده با استفاده از SweetAlert2
        Swal.fire({
          icon: "success",
          title: "گزارش بررسی شد!",
          text: "گزارش با موفقیت تایید شد.",
          confirmButtonText: "باشه",
        });
      } catch (error) {
        console.error("Failed to approve report", error);

        // نمایش پیغام خطا در صورت وجود مشکل
        Swal.fire({
          icon: "error",
          title: "خطا",
          text: "تایید گزارش با مشکل مواجه شد.",
          confirmButtonText: "باشه",
        });
      }
    }
  };

  if (loading) {
    return <p>در حال بارگذاری...</p>;
  }

  if (!report) {
    return <p>گزارش کار یافت نشد.</p>;
  }

  return (
    <div className="p-4 bg-white rounded shadow-md rtl">
      <Title title="جزئیات گزارش کار" />

      <div className="bg-gray-100 p-4 rounded mt-4">
        <p className="text-sm text-gray-700 leading-relaxed">
          {report.content || "محتوای گزارش یافت نشد."}
        </p>
        <div className="text-right mt-2 text-gray-500 text-xs">
          {moment(report.date).format("jYYYY/jMM/jDD")}
          {/* تبدیل تاریخ به شمسی */}
        </div>
      </div>

      <button
        className={`px-6 py-2 rounded mt-4 ${
          report.is_approved ? "bg-green-500" : "bg-orange-600"
        } text-white`}
        onClick={handleApprove}
        disabled={report.is_approved} // دکمه غیر فعال می‌شود اگر تایید شده باشد
      >
        {report.is_approved ? "بررسی شده" : "گزارش کار تایید نشده"}
      </button>
    </div>
  );
};

export default ReportDetails;
