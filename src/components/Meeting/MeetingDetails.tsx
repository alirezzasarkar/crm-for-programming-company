import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import moment from "jalali-moment"; // کتابخانه برای تبدیل تاریخ
import { useAuth } from "../Authentication/AuthContext";
import { getEmployees } from "../../services/project"; // مسیر صحیح فایل API خود را وارد کنید
import Title from "../Common/Title";
import RichTextEditor from "../Common/RichTextEditor"; // وارد کردن کامپوننت جدید

interface MeetingDetailsProps {
  meeting: {
    id: number;
    title: string;
    date: string; // تاریخ جلسه به فرمت مناسب
    details: string; // جزئیات جلسه
    attachment: string; // لینک دانلود فایل پیوست
    minutes: string; // صورت جلسه
    participants: number[]; // لیستی از شناسه‌های کارمندان شرکت‌کننده
  };
  onDeleteMeeting: (meetingId: number) => void;
  onAddMinutes: (newMinutes: string) => void; // تابع برای اضافه کردن صورت جلسه
}

// تابع تبدیل تاریخ به شمسی
const convertToJalali = (date: string) => {
  return moment(date, "YYYY-MM-DD").locale("fa").format("jYYYY/jMM/jDD");
};

const MeetingDetails: React.FC<MeetingDetailsProps> = ({
  meeting,
  onDeleteMeeting,
  onAddMinutes,
}) => {
  const { id, title, date, details, attachment, minutes, participants } =
    meeting;

  // وضعیت کارمندان
  const [employees, setEmployees] = useState<{ [key: number]: string }>({});
  const [showModal, setShowModal] = useState(false);
  const [newMinutes, setNewMinutes] = useState("");

  // دریافت کارمندان
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeesData = await getEmployees();
        const employeeMap: { [key: number]: string } = {};
        employeesData.forEach((employee: { id: number; last_name: string }) => {
          employeeMap[employee.id] = employee.last_name; // ایجاد دیکشنری از ID به نام خانوادگی
        });
        setEmployees(employeeMap);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const { user } = useAuth(); // استفاده از context احراز هویت

  const handleAddMinutes = () => {
    onAddMinutes(newMinutes);
    setNewMinutes("");
    setShowModal(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md rtl">
      <table className="min-w-full bg-white mt-4">
        <tbody>
          <tr className="w-full border-b border-gray-200">
            <td className="px-4 py-3 text-gray-700">عنوان جلسه:</td>
            <td className="px-4 py-3 text-gray-500">{title}</td>
          </tr>
          <tr className="w-full border-b border-gray-200">
            <td className="px-4 py-3 text-gray-700">تاریخ جلسه:</td>
            <td className="px-4 py-3 text-gray-500">{convertToJalali(date)}</td>
          </tr>
          <tr className="w-full border-b border-gray-200">
            <td className="px-4 py-3 text-gray-700">جزئیات:</td>
            <td className="px-4 py-3 text-gray-500">{details}</td>
          </tr>
          <tr className="w-full border-b border-gray-200">
            <td className="px-4 py-3 text-gray-700">اعضای شرکت‌کننده:</td>
            <td className="px-4 py-3 text-gray-500">
              {participants
                .map((participantId) => employees[participantId] || "ناشناخته")
                .join(", ")}
            </td>
          </tr>
          <tr className="w-full border-b border-gray-200">
            <td className="px-4 py-3 text-gray-700">فایل پیوست:</td>
            <td className="px-4 py-3 text-gray-500">
              {attachment && (
                <a
                  href={attachment}
                  className="text-blue-500 hover:text-blue-700"
                  download
                >
                  دانلود فایل
                </a>
              )}
            </td>
          </tr>
          <tr className="w-full border-b border-gray-200">
            <td className="px-4 py-3 text-gray-700">صورت جلسه:</td>
            <td
              className="px-4 py-3 text-gray-500"
              dangerouslySetInnerHTML={{ __html: minutes }}
            />
          </tr>
        </tbody>
      </table>
      <div className="flex justify-end mt-6">
        {user?.role === "manager" && ( // شرط نمایش دکمه صورت جلسه
          <button
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={() => setShowModal(true)}
          >
            صورت جلسه
          </button>
        )}
        {user?.role === "manager" && ( // شرط نمایش دکمه حذف
          <button
            className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg mr-2"
            onClick={() => onDeleteMeeting(id)}
          >
            <FaTrash className="mr-2" />
            حذف جلسه
          </button>
        )}
      </div>

      {/* مدال صورت جلسه */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full h-full">
            <Title title="صورت جلسه را وارد کنید" />
            <RichTextEditor // استفاده از کامپوننت CKEditor جدید
              data={newMinutes}
              onChange={setNewMinutes}
            />
            <div className="flex justify-end mt-4">
              <button
                className="ml-2 px-4 py-2 bg-green-500 text-white rounded-lg mr-2"
                onClick={handleAddMinutes}
              >
                تایید
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={() => setShowModal(false)}
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingDetails;
