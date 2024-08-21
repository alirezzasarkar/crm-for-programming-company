import React from "react";
import Title from "../Common/Title";

interface ProjectDetailsProps {
  projectName: string;
  projectManager: string;
  domain: string;
  startDate: string;
  endDate: string;
  completionDate: string;
  hostingEndDate: string;
  platform: string;
  designTeam: string[];
  implementationTeam: string[];
  designFilesLink: string; // اضافه کردن prop جدید برای لینک دانلود فایل‌های دیزاین
  contractFile: string;
  description: string;
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
  designTeam,
  implementationTeam,
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
            <td className="px-4 py-3 text-gray-700">تاریخ اتمام دامنه:</td>
            <td className="px-4 py-3 text-gray-500">{completionDate}</td>
          </tr>
          <tr className="w-full border-b border-gray-200">
            <td className="px-4 py-3 text-gray-700">تاریخ اتمام هاست:</td>
            <td className="px-4 py-3 text-gray-500">{hostingEndDate}</td>
          </tr>
          <tr className="w-full border-b border-gray-200">
            <td className="px-4 py-3 text-gray-700">تیم:</td>
            <td className="px-4 py-3 text-gray-500">{platform}</td>
          </tr>
          <tr className="w-full border-b border-gray-200">
            <td className="px-4 py-3 text-gray-700">تیم دیزاین:</td>
            <td className="px-4 py-3 text-gray-500">{designTeam.join(", ")}</td>
          </tr>
          <tr className="w-full border-b border-gray-200">
            <td className="px-4 py-3 text-gray-700">تیم پیاده‌سازی:</td>
            <td className="px-4 py-3 text-gray-500">
              {implementationTeam.join(", ")}
            </td>
          </tr>
          <tr className="w-full border-b border-gray-200">
            <td className="px-4 py-3 text-gray-700">فایل های قرارداد:</td>
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
            <td className="px-4 py-3 text-gray-700"> فایل‌های دیزاین:</td>
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
            <td className="px-4 py-3 text-gray-700">توضیحات</td>
            <td className="px-4 py-3 text-gray-500">{description}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProjectDetails;
