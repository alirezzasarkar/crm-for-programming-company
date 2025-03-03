import React from "react";
import { FaEllipsisV, FaTrash, FaEdit } from "react-icons/fa";
import moment from "jalali-moment"; // اضافه کردن کتابخانه برای تبدیل تاریخ
import { useAuth } from "../Authentication/AuthContext";

interface Project {
  id: number;
  project_name: string;
  domain: string;
  manager_full_name: string;
  end_date: string;
  status: string;
}

interface ProjectListProps {
  projects: Project[];
  onProjectClick: (projectId: number) => void;
  onDeleteProject: (projectId: number) => void;
  onEditProject: (projectId: number) => void; // تابع جدید برای ویرایش
}

// تابع تبدیل تاریخ به شمسی
const convertToJalali = (date: string) => {
  return moment(date, "YYYY-MM-DD").locale("fa").format("jYYYY/jMM/jDD");
};

// تابع ترجمه وضعیت پروژه به فارسی
const translateStatus = (status: string): string => {
  switch (status) {
    case "not_started":
      return "شروع نشده";
    case "in_progress":
      return "در حال انجام";
    case "completed":
      return "انجام شده";
    default:
      return status;
  }
};

const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  onProjectClick,
  onDeleteProject,
  onEditProject, // اضافه کردن تابع جدید
}) => {
  const { user } = useAuth();

  return (
    <div className="bg-white p-6 rounded-lg rtl">
      <table className="min-w-full bg-white mt-2 border-separate border-spacing-y-3">
        <thead>
          <tr className="text-right">
            <th className="py-2 text-center text-sm font-medium pb-5">
              نام پروژه
            </th>
            <th className="py-2 text-center text-sm font-medium pb-5">دامنه</th>
            <th className="py-2 text-center text-sm font-medium pb-5">
              مدیر پروژه
            </th>
            <th className="py-2 text-center text-sm font-medium pb-5">
              تاریخ اتمام
            </th>
            <th className="py-2 text-center text-sm font-medium pb-5">
              وضعیت پروژه
            </th>
            <th className="py-2 text-center text-sm font-medium pb-5">
              نمایش جزئیات
            </th>
            {/* <th className="py-2 text-center text-sm font-medium pb-5">
              ویرایش
            </th> */}
            {user?.role === "manager" && (
              <th className="py-2 text-center text-sm font-medium pb-5">
                حذف پروژه
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {projects
            .slice()
            .reverse()
            .map((project) => (
              <tr
                key={project.id}
                className="bg-gray-100 hover:bg-gray-200 cursor-pointer"
                onClick={() => onProjectClick(project.id)}
              >
                <td className="py-3 text-sm text-center">
                  {project.project_name}
                </td>
                <td className="py-3 text-sm text-center text-blue-600">
                  {project.domain}
                </td>
                <td className="py-3 text-sm text-center">
                  {project.manager_full_name}
                </td>
                <td className="py-3 text-sm text-center text-yellow-500">
                  {convertToJalali(project.end_date)}{" "}
                  {/* تبدیل تاریخ به شمسی */}
                </td>
                <td className="py-3 text-sm text-center">
                  {translateStatus(project.status)}
                </td>
                <td className="py-3 text-sm text-center">
                  <FaEllipsisV className="text-gray-500 mx-auto" />
                </td>
                {/* <td className="py-3 text-sm text-center">
                <FaEdit
                  className="text-blue-500 mx-auto cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // جلوگیری از کلیک روی ردیف
                    onEditProject(project.id); // ارسال id به تابع onEditProject
                  }}
                />
              </td> */}
                {user?.role === "manager" && (
                  <td className="py-3 text-sm text-center">
                    <FaTrash
                      className="text-red-500 mx-auto cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation(); // جلوگیری از کلیک روی ردیف
                        onDeleteProject(project.id); // ارسال id به تابع onDeleteProject
                      }}
                    />
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;
