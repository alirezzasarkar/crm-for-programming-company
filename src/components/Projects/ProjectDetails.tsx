import React from "react";
import { FaTrash } from "react-icons/fa";
import moment from "jalali-moment"; // کتابخانه برای تبدیل تاریخ
import { useAuth } from "../Authentication/AuthContext";

interface ProjectDetailsProps {
  project: {
    id: number;
    project_name: string;
    domain: string;
    manager_full_name: string;
    phone_number: string;
    description: string;
    start_date: string;
    end_date: string;
    status: string;
    design_files: string;
    domain_end_date: string;
    host_end_date: string;
    contract_files: string;
    team_members: number[];
  };
  onDeleteProject: (projectId: number) => void;
}

// تابع تبدیل تاریخ به شمسی
const convertToJalali = (date: string) => {
  return moment(date, "YYYY-MM-DD").locale("fa").format("jYYYY/jMM/jDD");
};

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  project,
  onDeleteProject,
}) => {
  const {
    id,
    project_name,
    domain,
    manager_full_name,
    phone_number,
    description,
    start_date,
    end_date,
    status,
    design_files,
    domain_end_date,
    host_end_date,
    contract_files,
    team_members,
  } = project;

  // تابع ترجمه وضعیت پروژه به فارسی
  const translateStatus = (status: string) => {
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

  const { user } = useAuth(); // استفاده از context احراز هویت

  return (
    <div className="bg-white p-6 rounded-lg shadow-md rtl">
      <table className="min-w-full bg-white mt-4">
        <tbody>
          <tr className="w-full border-b border-gray-200">
            <td className="px-4 py-3 text-gray-700">نام پروژه:</td>
            <td className="px-4 py-3 text-gray-500">{project_name}</td>
          </tr>
          <tr className="w-full border-b border-gray-200">
            <td className="px-4 py-3 text-gray-700">مدیر پروژه:</td>
            <td className="px-4 py-3 text-gray-500">{manager_full_name}</td>
          </tr>
          {user?.role === "manager" && (
            <tr className="w-full border-b border-gray-200">
              <td className="px-4 py-3 text-gray-700">شماره تماس:</td>
              <td className="px-4 py-3 text-gray-500">{phone_number}</td>
            </tr>
          )}
          <tr className="w-full border-b border-gray-200">
            <td className="px-4 py-3 text-gray-700">دامنه:</td>
            <td className="px-4 py-3 text-gray-500">{domain}</td>
          </tr>
          <tr className="w-full border-b border-gray-200">
            <td className="px-4 py-3 text-gray-700">تاریخ شروع:</td>
            <td className="px-4 py-3 text-gray-500">
              {convertToJalali(start_date)} {/* تاریخ شروع به شمسی */}
            </td>
          </tr>
          <tr className="w-full border-b border-gray-200">
            <td className="px-4 py-3 text-gray-700">تاریخ پایان:</td>
            <td className="px-4 py-3 text-gray-500">
              {convertToJalali(end_date)} {/* تاریخ پایان به شمسی */}
            </td>
          </tr>
          <tr className="w-full border-b border-gray-200">
            <td className="px-4 py-3 text-gray-700">وضعیت پروژه:</td>
            <td className="px-4 py-3 text-gray-500">
              {translateStatus(status)}
            </td>
          </tr>
          <tr className="w-full border-b border-gray-200">
            <td className="px-4 py-3 text-gray-700">تاریخ پایان دامنه:</td>
            <td className="px-4 py-3 text-gray-500">
              {convertToJalali(domain_end_date)}{" "}
              {/* تاریخ پایان دامنه به شمسی */}
            </td>
          </tr>
          <tr className="w-full border-b border-gray-200">
            <td className="px-4 py-3 text-gray-700">تاریخ پایان هاست:</td>
            <td className="px-4 py-3 text-gray-500">
              {convertToJalali(host_end_date)} {/* تاریخ پایان هاست به شمسی */}
            </td>
          </tr>
          <tr className="w-full border-b border-gray-200">
            <td className="px-4 py-3 text-gray-700">فایل‌های دیزاین:</td>
            <td className="px-4 py-3 text-gray-500">
              <a
                href={design_files}
                className="text-blue-500 hover:text-blue-700"
                download
              >
                دانلود فایل‌ها
              </a>
            </td>
          </tr>
          {user?.role === "manager" && (
            <tr className="w-full border-b border-gray-200">
              <td className="px-4 py-3 text-gray-700">فایل‌های قرارداد:</td>
              <td className="px-4 py-3 text-gray-500">
                <a
                  href={contract_files}
                  className="text-blue-500 hover:text-blue-700"
                  download
                >
                  دانلود فایل‌ها
                </a>
              </td>
            </tr>
          )}
          <tr className="w-full border-b border-gray-200">
            <td className="px-4 py-3 text-gray-700">اعضای تیم:</td>
            <td className="px-4 py-3 text-gray-500">
              {team_members.join(", ")}
            </td>
          </tr>
          <tr className="w-full border-b border-gray-200">
            <td className="px-4 py-3 text-gray-700">توضیحات:</td>
            <td className="px-4 py-3 text-gray-500">{description}</td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-end mt-6">
        {user?.role === "manager" && ( // شرط نمایش دکمه حذف
          <button
            className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg"
            onClick={() => onDeleteProject(id)}
          >
            <FaTrash className="mr-2" />
            حذف پروژه
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
