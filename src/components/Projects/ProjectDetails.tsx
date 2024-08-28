import React from "react";
import Title from "../Common/Title";

interface ProjectDetailsProps {
  projectName: string;
  projectManager: string;
  domain: string;
  startDate: string;
  endDate: string;
  completionDate: string; // تاریخ اتمام پروژه
  hostingEndDate: string; // تاریخ اتمام هاست
  platform: string; // پلتفرم
  clientName: string; // نام کارفرما
  clientContact: string; // شماره تماس کارفرما
  projectStatus: string; // وضعیت پروژه
  teamMembers: string; // اعضای تیم
  designFilesLink: string; // لینک فایل‌های دیزاین
  contractFile: string; // لینک فایل‌های قرارداد
  description: string; // توضیحات
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  projectName,
  projectManager,
  domain,
  startDate,
  endDate,
  completionDate,
  hostingEndDate,
  platform,
  clientName,
  clientContact,
  projectStatus,
  teamMembers,
  designFilesLink,
  contractFile,
  description,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md rtl">
      <Title title="جزئیات پروژه" />
      <table className="min-w-full bg-white mt-4">
        <tbody>
          <tr className="w-full border-b border-gray-200">
            <td className="px-4 py-3 text-gray-700">نام پروژه:</td>
            <td className="px-4 py-3 text-gray-500">{projectName}</td>
          </tr>
          <tr className="w-full border-b border-gray-200">
            <td className="px-4 py-3 text-gray-700">مدیر پروژه:</td>
            <td className="px-4 py-3 text-gray-500">{projectManager}</td>
          </tr>
          <tr className="w-full border-b border-gray-200">
            <td className="px-4 py-3 text-gray-700">دامنه:</td>
            <td className="px-4 py-3 text-gray-500">{domain}</td>
          </tr>
          <tr className="w-full border-b border-gray-200">
            <td className="px-4 py-3 text-gray-700">تاریخ شروع:</td>
            <td className="px-4 py-3 text-gray-500">{startDate}</td>
          </tr>
          <tr className="w-full border-b border-gray-200">
            <td className="px-4 py-3 text-gray-700">تاریخ پایان:</td>
            <td className="px-4 py-3 text-gray-500">{endDate}</td>
          </tr>
          <tr className="w-full border-b border-gray-200">
            <td className="px-4 py-3 text-gray-700">تاریخ اتمام پروژه:</td>
            <td className="px-4 py-3 text-gray-500">{completionDate}</td>
          </tr>
          <tr className="w-full border-b border-gray-200">
            <td className="px-4 py-3 text-gray-700">تاریخ اتمام هاست:</td>
            <td className="px-4 py-3 text-gray-500">{hostingEndDate}</td>
          </tr>
          <tr className="w-full border-b border-gray-200">
            <td className="px-4 py-3 text-gray-700">پلتفرم:</td>
            <td className="px-4 py-3 text-gray-500">{platform}</td>
          </tr>
          <tr className="w-full border-b border-gray-200">
            <td className="px-4 py-3 text-gray-700">نام کارفرما:</td>
            <td className="px-4 py-3 text-gray-500">{clientName}</td>
          </tr>
          <tr className="w-full border-b border-gray-200">
            <td className="px-4 py-3 text-gray-700">شماره تماس کارفرما:</td>
            <td className="px-4 py-3 text-gray-500">{clientContact}</td>
          </tr>
          <tr className="w-full border-b border-gray-200">
            <td className="px-4 py-3 text-gray-700">وضعیت پروژه:</td>
            <td className="px-4 py-3 text-gray-500">{projectStatus}</td>
          </tr>
          <tr className="w-full border-b border-gray-200">
            <td className="px-4 py-3 text-gray-700">اعضای تیم:</td>
            <td className="px-4 py-3 text-gray-500">{teamMembers}</td>
          </tr>
          <tr className="w-full border-b border-gray-200">
            <td className="px-4 py-3 text-gray-700">فایل‌های دیزاین:</td>
            <td className="px-4 py-3 text-gray-500">
              <a
                href={designFilesLink}
                className="text-blue-500 hover:text-blue-700"
                download
              >
                دانلود فایل‌ها
              </a>
            </td>
          </tr>
          <tr className="w-full border-b border-gray-200">
            <td className="px-4 py-3 text-gray-700">فایل‌های قرارداد:</td>
            <td className="px-4 py-3 text-gray-500">
              <a
                href={contractFile}
                className="text-blue-500 hover:text-blue-700"
                download
              >
                دانلود فایل‌ها
              </a>
            </td>
          </tr>
          <tr className="w-full border-b border-gray-200">
            <td className="px-4 py-3 text-gray-700">توضیحات:</td>
            <td className="px-4 py-3 text-gray-500">{description}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProjectDetails;
