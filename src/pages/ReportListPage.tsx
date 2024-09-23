import React, { useEffect, useState } from "react";
import ReportList from "../components/WorkReports/ReportList";
import { fetchReports, getEmployees } from "../services/report";
import { useNavigate } from "react-router-dom";

// Define the types for Report and Employee
interface Report {
  id: number;
  user: number; // Assuming this is the user ID
  date: string;
  content: string; // Required property
  is_approved: boolean;
  team: string; // Required property
  last_name?: string; // Optional property for last name
}

interface Employee {
  id: number; // Employee ID
  last_name: string; // Last name of the employee
}

const ReportListPage: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]); // State to hold employee data
  const [dateFilter, setDateFilter] = useState<string>("همه زمان‌ها");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  const dateOptions = ["همه زمان‌ها", "هفته گذشته", "ماه گذشته"];

  // Function to load reports and employees
  const loadData = async () => {
    try {
      const reportData = await fetchReports();
      const employeeData = await getEmployees();
      setReports(reportData);
      setEmployees(employeeData);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, []);

  // Function to get last name from user ID
  const getlastNameByUserId = (userId: number) => {
    const employee = employees.find((emp) => emp.id === userId);
    return employee ? employee.last_name : ""; // Default to empty string if not found
  };

  // Map reports to include last name instead of user ID
  const reportsWithlast_name = reports.map((report) => ({
    ...report,
    last_name: getlastNameByUserId(report.user), // Add last name
  }));

  const handleDateFilterChange = (date: string) => setDateFilter(date);
  const handleSearchChange = (query: string) => setSearchQuery(query);

  const handleReportClick = (report: Report) => {
    navigate(`/dashboard/reports/detail/${report.id}`);
  };

  return (
    <ReportList
      reports={reportsWithlast_name} // Pass the updated reports
      dateFilter={dateFilter}
      searchQuery={searchQuery}
      dateOptions={dateOptions}
      onDateFilterChange={handleDateFilterChange}
      onSearchChange={handleSearchChange}
      onReportClick={handleReportClick}
    />
  );
};

export default ReportListPage;
