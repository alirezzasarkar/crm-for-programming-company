import React, { useEffect, useState } from "react";
import ReportList from "../components/WorkReports/ReportList";
import LoadingSpinner from "../components/Common/Loading"; // Import LoadingSpinner component
import { fetchReports, getEmployees } from "../services/report";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2

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
  const [loading, setLoading] = useState<boolean>(true); // State for loading status
  const navigate = useNavigate();

  const dateOptions = ["همه زمان‌ها", "هفته گذشته", "ماه گذشته"];

  // Function to load reports and employees
  const loadData = async () => {
    setLoading(true); // Set loading to true before fetching data
    try {
      const reportData = await fetchReports();
      const employeeData = await getEmployees();
      setReports(reportData);
      setEmployees(employeeData);
    } catch (error) {
      console.error("Failed to fetch data", error);
      Swal.fire({
        icon: "error",
        title: "خطا",
        text: "مشکلی در بارگیری داده‌ها پیش آمد.",
        confirmButtonText: "باشه",
      });
    } finally {
      setLoading(false); // Set loading to false after fetching data
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

  // Filter reports based on search query
  const filteredReports = reportsWithlast_name.filter((report) =>
    report.last_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDateFilterChange = (date: string) => setDateFilter(date);
  const handleSearchChange = (query: string) => setSearchQuery(query);

  const handleReportClick = (report: Report) => {
    navigate(`/dashboard/reports/detail/${report.id}`);
  };

  if (loading) {
    return <LoadingSpinner />; // Show loading spinner while data is being fetched
  }

  return (
    <ReportList
      reports={filteredReports} // Pass the filtered reports
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
