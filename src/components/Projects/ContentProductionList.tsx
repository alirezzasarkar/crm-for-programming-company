import React from "react";
import { FaEllipsisV, FaTrash, FaEdit } from "react-icons/fa";
import moment from "jalali-moment";
import { useAuth } from "../Authentication/AuthContext";

interface ContentProject {
  id: number;
  full_name: string;
  contact_number: string;
  start_date: string;
  end_date: string;
  project_status: string;
}

interface ContentProjectListProps {
  contentProjects: ContentProject[];
  onProjectClick: (projectId: number) => void;
  onDeleteProject: (projectId: number) => void;
  onEditProject: (projectId: number) => void;
}

const convertToJalali = (date: string) => {
  if (!date || isNaN(new Date(date).getTime())) {
    return "تاریخ نامعتبر"; // اگر تاریخ نامعتبر باشد
  }

  // تبدیل تاریخ میلادی به جلالی
  return moment(date, "YYYY-MM-DD").locale("fa").format("jYYYY/jMM/jDD");
};

const translateStatus = (status: string): string => {
  switch (status) {
    case "pending":
      return "شروع نشده";
    case "in_progress":
      return "در حال انجام";
    case "completed":
      return "انجام شده";
    default:
      return status;
  }
};

const ContentProjectList: React.FC<ContentProjectListProps> = ({
  contentProjects,
  onProjectClick,
  onDeleteProject,
  onEditProject,
}) => {
  const { user } = useAuth();

  return (
    <div className="bg-white p-6 rounded-lg rtl">
      <table className="min-w-full bg-white mt-2 border-separate border-spacing-y-3">
        <thead>
          <tr className="text-right">
            <th className="py-2 text-center text-sm font-medium pb-5">
              نام و نام خانوادگی
            </th>
            <th className="py-2 text-center text-sm font-medium pb-5">
              شماره تماس
            </th>
            <th className="py-2 text-center text-sm font-medium pb-5">
              تاریخ شروع
            </th>
            <th className="py-2 text-center text-sm font-medium pb-5">
              تاریخ پایان
            </th>
            <th className="py-2 text-center text-sm font-medium pb-5">
              وضعیت پروژه
            </th>
            <th className="py-2 text-center text-sm font-medium pb-5">
              نمایش جزئیات
            </th>
            {user?.role === "manager" && (
              <th className="py-2 text-center text-sm font-medium pb-5">
                حذف پروژه
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {contentProjects
            .slice()
            .reverse()
            .map((project) => (
              <tr
                key={project.id}
                className="bg-gray-100 hover:bg-gray-200 cursor-pointer"
                onClick={() => onProjectClick(project.id)}
              >
                <td className="py-3 text-sm text-center">
                  {project.full_name}
                </td>
                <td className="py-3 text-sm text-center text-blue-600">
                  {project.contact_number}
                </td>
                <td className="py-3 text-sm text-center text-yellow-500">
                  {convertToJalali(project.start_date)}
                </td>
                <td className="py-3 text-sm text-center text-yellow-500">
                  {convertToJalali(project.end_date)}
                </td>
                <td className="py-3 text-sm text-center">
                  {translateStatus(project.project_status)}
                </td>
                <td className="py-3 text-sm text-center">
                  <FaEllipsisV className="text-gray-500 mx-auto" />
                </td>
                {user?.role === "manager" && (
                  <td className="py-3 text-sm text-center">
                    <FaTrash
                      className="text-red-500 mx-auto cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteProject(project.id);
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

export default ContentProjectList;
