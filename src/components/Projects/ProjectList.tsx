import React from "react";
import { FaEllipsisV, FaTrash } from "react-icons/fa";

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
}

const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  onProjectClick,
  onDeleteProject,
}) => {
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
            <th className="py-2 text-center text-sm font-medium pb-5">
              حذف پروژه
            </th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
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
                {project.end_date}
              </td>
              <td
                className={`py-3 text-sm text-center ${
                  project.status === "درحال انجام"
                    ? "text-orange-500"
                    : "text-green-500"
                }`}
              >
                {project.status}
              </td>
              <td className="py-3 text-sm text-center">
                <FaEllipsisV className="text-gray-500 mx-auto" />
              </td>
              <td className="py-3 text-sm text-center">
                <FaTrash
                  className="text-red-500 mx-auto cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // جلوگیری از کلیک روی ردیف
                    onDeleteProject(project.id); // ارسال index به تابع onDeleteProject
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;
