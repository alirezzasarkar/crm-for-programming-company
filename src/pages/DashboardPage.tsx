import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/layout";
import ProfilePage from "./ProfilePage";
import EmployeeInfo from "./EmployeeListPage";
import ReportEntryPage from "./ReportEntryPage";
import ReportListPage from "./ReportListPage";
import ReportDetailPage from "./ReportDetailPage";
import TaskEntryPage from "./AddTaskPage";
import TaskListPage from "./TaskListPage";
import TaskDetailsPage from "./TaskDetailsPage";
import AddProjectPage from "./AddProjectPage";
import ProjectListPage from "./ProjectListPage";
import ProjectDetailsPage from "./ProjectDetailsPage";
import AddWorkingHoursPage from "./AddWorkingHoursPage";
import WorkingHoursListPage from "./WorkingHoursListPage";
import WorkingHoursDetailsPage from "./WorkingHoursDetailsPage";
import SendTicketPage from "./SendTicketPage";
import TicketListPage from "./TicketListPage";
import TicketDetailsPage from "./TicketDetailsPage";
import AccountingDashboardPage from "./AccountingDashboardPage";
import AddTransactionPage from "./AddTransactionPage";
import EmployeeSalariesPage from "./EmployeeSalariesPage";
import TransactionListPage from "./TransactionListPage";
import ProtectedRoute from "../components/Authentication/ProtectedRoutes";
import Dashboard from "../components/Dashboard/Dashboard";

const DashboardPage: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={<ProtectedRoute allowedRoles={["employee", "manager"]} />}
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="profile/:id" element={<ProfilePage />} />
          <Route path="employee-info" element={<EmployeeInfo />} />
          <Route path="reports/entry" element={<ReportEntryPage />} />
          <Route path="reports/list" element={<ReportListPage />} />
          <Route path="reports/detail/:id" element={<ReportDetailPage />} />
          <Route path="tasks/entry" element={<TaskEntryPage />} />
          <Route path="tasks/list" element={<TaskListPage />} />
          <Route path="tasks/detail/:id" element={<TaskDetailsPage />} />
          <Route path="projects/entry" element={<AddProjectPage />} />
          <Route path="projects/list" element={<ProjectListPage />} />
          <Route path="projects/detail/:id" element={<ProjectDetailsPage />} />
          <Route path="work-time/entry" element={<AddWorkingHoursPage />} />
          <Route path="work-time/list" element={<WorkingHoursListPage />} />
          <Route
            path="work-time/detail/:id"
            element={<WorkingHoursDetailsPage />}
          />
          <Route path="tickets/new" element={<SendTicketPage />} />
          <Route path="tickets/list" element={<TicketListPage />} />
          <Route path="tickets/detail/:id" element={<TicketDetailsPage />} />
        </Route>

        <Route
          path="/accounting"
          element={<ProtectedRoute allowedRoles={["manager"]} />}
        >
          <Route path="dashboard" element={<AccountingDashboardPage />} />
          <Route path="add-transaction" element={<AddTransactionPage />} />
          <Route path="employee-salaries" element={<EmployeeSalariesPage />} />
          <Route path="transaction-list" element={<TransactionListPage />} />
        </Route>
      </Routes>
    </Layout>
  );
};

export default DashboardPage;
