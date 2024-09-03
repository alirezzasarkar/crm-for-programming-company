import React, { useEffect, useState } from "react";
import ReportList from "../components/WorkReports/ReportList";
import { fetchReports } from "../services/report"; // وارد کردن تابع fetchReports از فایل API
import { useNavigate } from "react-router-dom";

const ReportListPage: React.FC = () => {
  const [reports, setReports] = useState([]);
  const [teamFilter, setTeamFilter] = useState<string>("همه تیم‌ها");
  const [dateFilter, setDateFilter] = useState<string>("همه زمان‌ها");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  const teamOptions = ["همه تیم‌ها", "تیم طراحی وبسایت", "تیم تولید محتوا"];
  const dateOptions = ["همه زمان‌ها", "هفته گذشته", "ماه گذشته"];

  // تابع برای دریافت داده‌ها از API
  const loadReports = async () => {
    try {
      const data = await fetchReports();
      setReports(data);
    } catch (error) {
      console.error("Failed to fetch reports", error);
    }
  };

  // بارگذاری داده‌ها هنگام بارگذاری کامپوننت
  useEffect(() => {
    loadReports();
  }, []);

  const handleTeamFilterChange = (team: string) => setTeamFilter(team);
  const handleDateFilterChange = (date: string) => setDateFilter(date);
  const handleSearchChange = (query: string) => setSearchQuery(query);

  const handleReportClick = (report: any) => {
    navigate(`/dashboard/reports/detail/${report.index}`);
  };

  return (
    <ReportList
      reports={reports}
      teamFilter={teamFilter}
      dateFilter={dateFilter}
      searchQuery={searchQuery}
      teamOptions={teamOptions}
      dateOptions={dateOptions}
      onTeamFilterChange={handleTeamFilterChange}
      onDateFilterChange={handleDateFilterChange}
      onSearchChange={handleSearchChange}
      onReportClick={handleReportClick}
    />
  );
};

export default ReportListPage;
