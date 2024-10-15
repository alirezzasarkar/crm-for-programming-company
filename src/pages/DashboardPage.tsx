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
import AccessControl from "../components/Authentication/AccessControl"; // مسیر مناسب را تنظیم کنید
import Dashboard from "../components/Dashboard/Dashboard";
import MeetingEntryPage from "./MeetingEntryPage";
import MeetingListPage from "./MeetingListPage";
import MeetingDetailsPage from "./MeetingDetailsPage";
import { AddContentProductionPage } from "./AddContentProductionPage";

const DashboardPage: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile/:id"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="employee-info"
          element={
            <ProtectedRoute>
              <EmployeeInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="reports/entry"
          element={
            <ProtectedRoute>
              <ReportEntryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="reports/list"
          element={
            <ProtectedRoute>
              <ReportListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="reports/detail/:id"
          element={
            <ProtectedRoute>
              <ReportDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="tasks/entry"
          element={
            <ProtectedRoute>
              <TaskEntryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="tasks/list"
          element={
            <ProtectedRoute>
              <TaskListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="tasks/detail/:id"
          element={
            <ProtectedRoute>
              <TaskDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="projects/entry"
          element={
            <ProtectedRoute>
              <AddProjectPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="content-production/entry"
          element={
            <ProtectedRoute>
              <AddContentProductionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="projects/entry/:id"
          element={
            <ProtectedRoute>
              <AddProjectPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="projects/list"
          element={
            <ProtectedRoute>
              <ProjectListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="projects/detail/:id"
          element={
            <ProtectedRoute>
              <ProjectDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="work-time/entry"
          element={
            <ProtectedRoute>
              <AddWorkingHoursPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="work-time/list"
          element={
            <ProtectedRoute>
              <WorkingHoursListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="work-time/detail/:id"
          element={
            <ProtectedRoute>
              <WorkingHoursDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="tickets/new"
          element={
            <ProtectedRoute>
              <SendTicketPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="tickets/list"
          element={
            <ProtectedRoute>
              <TicketListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="tickets/detail/:id"
          element={
            <ProtectedRoute>
              <TicketDetailsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="meetings/entry"
          element={
            <ProtectedRoute>
              <MeetingEntryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="meetings/list"
          element={
            <ProtectedRoute>
              <MeetingListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="meetings/detail/:id"
          element={
            <ProtectedRoute>
              <MeetingDetailsPage />
            </ProtectedRoute>
          }
        />

        {/* مسیرهای حسابداری با استفاده از AccessControl برای نقش مدیر */}
        <Route
          path="/accounting/*"
          element={
            <ProtectedRoute>
              <AccessControl role="manager">
                <Routes>
                  <Route
                    path="dashboard"
                    element={<AccountingDashboardPage />}
                  />
                  <Route
                    path="add-transaction"
                    element={<AddTransactionPage />}
                  />
                  <Route
                    path="employee-salaries"
                    element={<EmployeeSalariesPage />}
                  />
                  <Route
                    path="transaction-list"
                    element={<TransactionListPage />}
                  />
                </Routes>
              </AccessControl>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  );
};

export default DashboardPage;
