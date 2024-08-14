import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Title from "../Common/Title";
import Filter from "./ProjectFilter";
import SearchBox from "../Common/Search";
import { filterProjectsByDate } from "../Common/DateFilter";

// داده‌های پروژه‌ها
const projects = [
  {
    index: 1,
    projectName: "وبسایت ادکلای",
    domain: "adklay.co",
    manager: "محمد رودباری",
    team: "وردپرس",
    endDate: "21 مهر 1403",
    status: "درحال انجام",
  },
  {
    index: 2,
    projectName: "وبسایت ادکلای",
    domain: "adklay.co",
    manager: "محمد رودباری",
    team: "وردپرس",
    endDate: "19 مهر 1403",
    status: "انجام شده",
  },
  {
    index: 3,
    projectName: "وبسایت ادکلای",
    domain: "adklay.co",
    manager: "محمد رودباری",
    team: "وردپرس",
    endDate: "18 مهر 1403",
    status: "درحال انجام",
  },
];

const statusOptions = ["تمام پروژه‌ها", "درحال انجام", "انجام شده"];
const dateOptions = ["تمام پروژه‌ها", "این هفته", "این ماه", "این سال"];

const ProjectListPage: React.FC = () => {
  const navigate = useNavigate();

  // وضعیت فیلترها
  const [statusFilter, setStatusFilter] = useState("تمام پروژه‌ها");
  const [dateFilter, setDateFilter] = useState("تمام پروژه‌ها");
  const [searchQuery, setSearchQuery] = useState("");

  // فیلتر کردن پروژه‌ها
  let filteredProjects = projects.filter((project) => {
    const matchesStatus =
      statusFilter === "تمام پروژه‌ها" || project.status === statusFilter;
    const matchesSearch = project.projectName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  filteredProjects = filterProjectsByDate(filteredProjects, dateFilter);

  const handleProjectClick = (project: any) => {
    navigate(`/dashboard/projects/detail/${project.index}`);
  };

  return (
    <>
      <div className="flex justify-start mb-4 rtl">
        <SearchBox searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <Filter
          filter={statusFilter}
          options={statusOptions}
          label="وضعیت"
          onFilterChange={setStatusFilter}
        />
        <Filter
          filter={dateFilter}
          options={dateOptions}
          label="تاریخ"
          onFilterChange={setDateFilter}
        />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md rtl">
        <Title title="لیست پروژه های من" />
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
              <th className="py-2 text-center text-sm font-medium pb-5">تیم</th>
              <th className="py-2 text-center text-sm font-medium pb-5">
                تاریخ اتمام
              </th>
              <th className="py-2 text-center text-sm font-medium pb-5">
                نمایش جزئیات
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project) => (
              <tr
                key={project.index}
                className="bg-gray-100 hover:bg-gray-200"
                onClick={() => handleProjectClick(project)}
              >
                <td className="py-3 text-sm text-center">
                  {project.projectName}
                </td>
                <td className="py-3 text-sm text-center text-blue-600">
                  {project.domain}
                </td>
                <td className="py-3 text-sm text-center">{project.manager}</td>
                <td className="py-3 text-sm text-center">{project.team}</td>
                <td className="py-3 text-sm text-center text-yellow-500">
                  {project.endDate}
                </td>
                <td className="py-3 text-sm text-center">
                  <FaEllipsisV className="text-gray-500 mx-auto cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProjectListPage;
