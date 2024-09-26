import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import Title from "../Common/Title";

interface TaskDetailsProps {
  sender: string;
  team: string;
  due_date: string;
  status: string;
  title: string;
  description: string;
  fileUrl?: string; // لینک فایل اضافه شده
  onComplete: () => void;
  showCompleteButton: boolean;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({
  sender,
  team,
  due_date,
  status,
  title,
  description,
  fileUrl, // لینک فایل دریافت شده
  onComplete,
  showCompleteButton,
}) => {
  // تابع برای تبدیل وضعیت به متن فارسی
  const getStatusText = (status: string) => {
    switch (status) {
      case "done":
        return "انجام شده";
      case "undone":
        return "انجام نشده";
      default:
        return status;
    }
  };

  return (
    <div className="flex justify-around">
      <div className="bg-white p-6 rounded-lg shadow-md rtl w-1/4 h-1/3">
        <div className="p-3 rounded-md mt-3">
          <div className="mb-2">
            <span className="font-bold ml-3">تاریخ تحویل:</span> {due_date}
          </div>
          <div className="mb-2 flex items-center">
            <span className="font-bold ml-3">وضعیت:</span>
            {status === "done" ? (
              <>
                <span>{getStatusText(status)}</span>
                <FaCheckCircle className="text-green-500 ml-2" />
              </>
            ) : (
              <span className="ml-2 text-red-500">{getStatusText(status)}</span>
            )}
          </div>
        </div>
        {showCompleteButton && status !== "done" && (
          <button
            onClick={onComplete}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-xl w-full hover:bg-blue-600"
          >
            انجام شد
          </button>
        )}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md rtl w-8/12">
        <div>
          <Title title="جزئیات تسک" />
          <div className="mb-4 mt-4">
            <span className="font-bold text-gray-700 text-sm">عنوان</span>
            <div className="bg-gray-100 p-3 rounded-md mt-2">{title}</div>
          </div>
          <div className="mt-7">
            <span className="font-bold text-gray-700 text-sm">جزئیات</span>
            <div className="bg-gray-100 p-3 rounded-md mt-2">{description}</div>
          </div>
        </div>
        <div className="mt-10">
          {fileUrl ? (
            <a
              href={fileUrl}
              download
              className="px-10 py-2 bg-gray-200 text-blue-700 rounded-xl"
            >
              باز کردن فایل ارسال شده
            </a>
          ) : (
            <p className="text-gray-500">فایلی ارسال نشده است</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
