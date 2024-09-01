import React from "react";
import { FaEllipsisV } from "react-icons/fa";

// تعریف نوع پروژه
interface Project {
  index: number;
  projectName: string;
  domain: string;
  manager: string;
  endDate: string;
  status: string;
}

interface ProjectListProps {
  projects: Project[];
  onProjectClick: (projectId: number) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  onProjectClick,
}) => {
  return (
    <>
      <div className="bg-white p-6 rounded-lg rtl">
        <table className="min-w-full bg-white mt-2 border-separate border-spacing-y-3">
          <thead>
            <tr className="text-right">
              <th className="py-2 text-center text-sm font-medium pb-5">
                نام پروژه
              </th>
              <th className="py-2 text-center text-sm font-medium pb-5">
                دامنه
              </th>
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
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr
                key={project.index}
                className="bg-gray-100 hover:bg-gray-200"
                onClick={() => onProjectClick(project.index)}
              >
                <td className="py-3 text-sm text-center">
                  {project.projectName}
                </td>
                <td className="py-3 text-sm text-center text-blue-600">
                  {project.domain}
                </td>
                <td className="py-3 text-sm text-center">{project.manager}</td>
                <td className="py-3 text-sm text-center text-yellow-500">
                  {project.endDate}
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
                  <FaEllipsisV
                    className="text-gray-500 mx-auto cursor-pointer"
                    onClick={() => onProjectClick(project.index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProjectList;
