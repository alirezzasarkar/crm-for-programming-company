import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import moment from "jalali-moment";
import { useAuth } from "../Authentication/AuthContext";
import { getEmployees } from "../../services/project";

interface ContentProductionDetailsProps {
  project: {
    id: number;
    full_name: string;
    phone_number: string;
    start_date: string;
    end_date: string;
    status: string;
    team_members: number[];
    photos_per_month: number;
    videos_per_month: number;
    organization_colors: string;
    collaboration_duration: string;
    contract_file: string | null;
    damage: string;
    consultation: boolean;
    caption_writing: boolean;
    cover_design: boolean;
    post_scenario_writing: boolean;
    teaser: boolean;
    drone_shot: boolean;
    outside_shoot: boolean;
    out_of_city_shoot: boolean;
  };
  onDeleteProject: (projectId: number) => void;
}

const convertToJalali = (date: string) => {
  return moment(date, "YYYY-MM-DD").locale("fa").format("jYYYY/jMM/jDD");
};

const ContentProductionDetails: React.FC<ContentProductionDetailsProps> = ({
  project,
  onDeleteProject,
}) => {
  const {
    id,
    full_name,
    phone_number,
    start_date,
    end_date,
    status,
    team_members,
    photos_per_month,
    videos_per_month,
    organization_colors,
    collaboration_duration,
    contract_file,
    damage,
    consultation,
    caption_writing,
    cover_design,
    post_scenario_writing,
    teaser,
    drone_shot,
    outside_shoot,
    out_of_city_shoot,
  } = project;

  const [employees, setEmployees] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeesData = await getEmployees();
        const employeeMap: { [key: number]: string } = {};
        employeesData.forEach((employee: { id: number; last_name: string }) => {
          employeeMap[employee.id] = employee.last_name;
        });
        setEmployees(employeeMap);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const { user } = useAuth();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md rtl">
      <table className="min-w-full bg-white mt-4">
        <tbody>
          <tr className="border-b">
            <td className="px-4 py-3 text-gray-700">نام پروژه:</td>
            <td className="px-4 py-3 text-gray-500">{full_name}</td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-3 text-gray-700">شماره تماس:</td>
            <td className="px-4 py-3 text-gray-500">{phone_number}</td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-3 text-gray-700">تاریخ شروع:</td>
            <td className="px-4 py-3 text-gray-500">
              {convertToJalali(start_date)}
            </td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-3 text-gray-700">تاریخ پایان:</td>
            <td className="px-4 py-3 text-gray-500">
              {convertToJalali(end_date)}
            </td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-3 text-gray-700">وضعیت پروژه:</td>
            <td className="px-4 py-3 text-gray-500">{status}</td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-3 text-gray-700">اعضای تیم:</td>
            <td className="px-4 py-3 text-gray-500">
              {team_members
                .map((memberId) => employees[memberId] || "ناشناخته")
                .join(", ")}
            </td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-3 text-gray-700">تعداد عکس‌ها در ماه:</td>
            <td className="px-4 py-3 text-gray-500">{photos_per_month}</td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-3 text-gray-700">تعداد ویدیوها در ماه:</td>
            <td className="px-4 py-3 text-gray-500">{videos_per_month}</td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-3 text-gray-700">رنگ‌های سازمانی:</td>
            <td className="px-4 py-3 text-gray-500">{organization_colors}</td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-3 text-gray-700">مدت زمان همکاری:</td>
            <td className="px-4 py-3 text-gray-500">
              {collaboration_duration}
            </td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-3 text-gray-700">فایل قرارداد:</td>
            <td className="px-4 py-3 text-gray-500">
              {contract_file ? (
                <a
                  href={contract_file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  مشاهده فایل
                </a>
              ) : (
                "فایلی بارگذاری نشده"
              )}
            </td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-3 text-gray-700">خسارت:</td>
            <td className="px-4 py-3 text-gray-500">
              {damage || "بدون خسارت"}
            </td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-3 text-gray-700">مشاوره:</td>
            <td className="px-4 py-3 text-gray-500">
              {consultation ? "بله" : "خیر"}
            </td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-3 text-gray-700">کپشن نویسی:</td>
            <td className="px-4 py-3 text-gray-500">
              {caption_writing ? "بله" : "خیر"}
            </td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-3 text-gray-700">طراحی کاور:</td>
            <td className="px-4 py-3 text-gray-500">
              {cover_design ? "بله" : "خیر"}
            </td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-3 text-gray-700">سناریو نویسی پست‌ها:</td>
            <td className="px-4 py-3 text-gray-500">
              {post_scenario_writing ? "بله" : "خیر"}
            </td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-3 text-gray-700">تیزر:</td>
            <td className="px-4 py-3 text-gray-500">
              {teaser ? "بله" : "خیر"}
            </td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-3 text-gray-700">نیاز به هلی‌شات:</td>
            <td className="px-4 py-3 text-gray-500">
              {drone_shot ? "بله" : "خیر"}
            </td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-3 text-gray-700">
              تصویربرداری بیرون از مجموعه:
            </td>
            <td className="px-4 py-3 text-gray-500">
              {outside_shoot ? "بله" : "خیر"}
            </td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-3 text-gray-700">
              تصویربرداری خارج از شهر:
            </td>
            <td className="px-4 py-3 text-gray-500">
              {out_of_city_shoot ? "بله" : "خیر"}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-end mt-6">
        {user?.role === "manager" && (
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

export default ContentProductionDetails;
