import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import moment from "jalali-moment"; // کتابخانه برای تبدیل تاریخ
import { useAuth } from "../Authentication/AuthContext";
import { getEmployees } from "../../services/meeting"; // Import the getEmployees API
import Title from "../Common/Title";
import RichTextEditor from "../Common/RichTextEditor"; // وارد کردن کامپوننت جدید

interface MeetingDetailsProps {
  meeting: {
    id: number;
    title: string;
    date: string; // تاریخ جلسه به فرمت مناسب
    description: string; // جزئیات جلسه
    attachment: string; // لینک دانلود فایل پیوست
    records: string; // صورت جلسه
    participants: number[]; // لیستی از شناسه‌های کارمندان شرکت‌کننده
  };
  onDeleteMeeting: (meetingId: number) => void;
  onAddrecords: (newrecords: string) => void; // تابع برای اضافه کردن صورت جلسه
}

// تابع تبدیل تاریخ به شمسی
const convertToJalali = (gregorianDate: string) => {
  const jalaliDate = moment(gregorianDate).locale("fa").format("jYYYY/jMM/jDD");
  return jalaliDate;
};

const MeetingDetails: React.FC<MeetingDetailsProps> = ({
  meeting,
  onDeleteMeeting,
  onAddrecords,
}) => {
  const { id, title, date, description, attachment, records, participants } =
    meeting;

  // وضعیت کارمندان
  const [employees, setEmployees] = useState<{ [key: number]: string }>({});
  const [showModal, setShowModal] = useState(false);
  const [newrecords, setNewrecords] = useState("");

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
            <td className="px-4 py-3 text-gray-500">{description}</td>
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
            <td className="px-4 py-3 text-gray-700">صورت جلسه:</td>
            <td
              className="px-4 py-3 text-gray-500"
              dangerouslySetInnerHTML={{ __html: records }}
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
            <FaTrash className="mr-1" />
            حذف
          </button>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
            <Title title="افزودن صورت جلسه" />
            <RichTextEditor data={newrecords} onChange={setNewrecords} />
            <div className="flex justify-end mt-6">
              <button
                className="px-4 ml-2 py-2 bg-blue-500 text-white rounded-lg mr-2"
                onClick={() => {
                  onAddrecords(newrecords); // استفاده از newrecords
                  setShowModal(false); // بستن modal پس از ذخیره
                }}
              >
                ذخیره
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
                onClick={() => setShowModal(false)}
              >
                لغو
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingDetails;
