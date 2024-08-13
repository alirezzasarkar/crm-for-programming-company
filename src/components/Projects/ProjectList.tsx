import React, { useState } from "react";
import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Title from "../Common/Title";

// داده‌های پروژه‌ها
const projects = [
  {
    index: 1,
    projectName: "وبسایت ادکلای",
    domain: "adklay.co",
    manager: "محمد رودباری",
    team: "وردپرس",
    endDate: "18 مهر 1403",
  },
  {
    index: 2,
    projectName: "وبسایت ادکلای",
    domain: "adklay.co",
    manager: "محمد رودباری",
    team: "وردپرس",
    endDate: "18 مهر 1403",
  },
  {
    index: 3,
    projectName: "وبسایت ادکلای",
    domain: "adklay.co",
    manager: "محمد رودباری",
    team: "وردپرس",
    endDate: "18 مهر 1403",
  },
];

const ProjectListPage: React.FC = () => {
  const navigate = useNavigate();

  const handleProjectClick = (project: any) => {
    navigate(`/dashboard/projects/detail/${project.index}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md rtl">
      <Title title="لیست پروژه های من" />
      <table className="min-w-full bg-white border-separate border-spacing-y-3 mt-2">
        <thead>
          <tr className="text-right">
            <th className="py-2 text-center text-sm font-medium">نام پروژه</th>
            <th className="py-2 text-center text-sm font-medium">دامنه</th>
            <th className="py-2 text-center text-sm font-medium">مدیر پروژه</th>
            <th className="py-2 text-center text-sm font-medium">تیم</th>
            <th className="py-2 text-center text-sm font-medium">
              تاریخ اتمام
            </th>
            <th className="py-2 text-center text-sm font-medium">
              نمایش جزئیات
            </th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr
              key={project.index}
              className="bg-gray-100 hover:bg-gray-200 cursor-pointer"
            >
              <td className="py-3 text-sm text-center">
                {project.projectName}
              </td>
              <td className="py-3 text-sm text-center">{project.domain}</td>
              <td className="py-3 text-sm text-center">{project.manager}</td>
              <td className="py-3 text-sm text-center">{project.team}</td>
              <td className="py-3 text-sm text-center text-yellow-500">
                {project.endDate}
              </td>
              <td className="py-3 text-sm text-center">
                <FaEllipsisV
                  className="text-gray-500 mx-auto cursor-pointer"
                  onClick={() => handleProjectClick(project)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectListPage;
