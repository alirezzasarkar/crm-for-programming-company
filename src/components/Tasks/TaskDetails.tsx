import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import Title from "../Common/Title";

interface TaskDetailsProps {
  sender: string;
  team: string;
  deliveryDate: string;
  status: string;
  title: string;
  details: string;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({
  sender,
  team,
  deliveryDate,
  status,
  title,
  details,
}) => {
  return (
    <div className="flex justify-around">
      <div className="bg-white p-6 rounded-lg shadow-md rtl w-1/4 h-1/3">
        <h2 className="text-blue-600 text-md font-bold">
          ارسال شده از {sender}
          <div className="border-t border-gray-300 w-full mt-4"></div>
        </h2>
        <div className=" p-3 rounded-md mt-3">
          <div className="mb-2">
            <span className="font-bold">تیم:</span> {team}
          </div>
          <div className="mb-2">
            <span className="font-bold ml-3">تاریخ تحویل:</span> {deliveryDate}
          </div>
          <div className="mb-2 flex items-center">
            <span className="font-bold ml-3">وضعیت:</span>
            {status === "انجام شده" ? (
              <>
                <span>انجام شده</span>
                <FaCheckCircle className="text-green-500 ml-2" />
              </>
            ) : (
              <span className="ml-2 text-red-500">{status}</span>
            )}
          </div>
        </div>
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
            <div className="bg-gray-100 p-3 rounded-md mt-2">{details}</div>
          </div>
        </div>
        <div className="mt-10">
          <button className="px-10 py-2 bg-gray-200 text-blue-700 rounded-xl">
            باز کردن فایل ارسال شده
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
