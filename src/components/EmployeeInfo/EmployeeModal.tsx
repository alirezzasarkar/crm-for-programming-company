// components/EmployeeModal.tsx
import React from "react";
import { FaTimes } from "react-icons/fa";
import { FiUser } from "react-icons/fi";

interface EmployeeModalProps {
  employee: {
    index: number;
    name: string;
    last_name: string;
    post_code: string;
    work_position: string;
    date_of_birth: string;
    phone_number: string;
    email: string;
    picture: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

const EmployeeModal: React.FC<EmployeeModalProps> = ({
  employee,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !employee) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
        <div className="bg-blue-100 p-4">
          <button onClick={onClose} className="float-right text-black">
            <FaTimes className="text-xl" />
          </button>
          <div className="text-center">
            {employee.picture ? (
              <img
                src={employee.picture}
                className="mx-auto rounded-full w-24 h-24 object-cover"
              />
            ) : (
              <FiUser className="mx-auto rounded-full w-24 h-24 text-blue-600" />
            )}
          </div>
        </div>
        <div className="p-6">
          <p className="text-right border border-gray-300 rounded-2xl p-1 px-3 mt-2 flex justify-between text-sm">
            <strong className="text-blue-600 text-sm">
              نام و نام خانوادگی:
            </strong>
            {employee.name}
          </p>
          <p className="text-right border border-gray-300 rounded-2xl p-1 px-3 mt-2 flex justify-between text-sm">
            <strong className="text-blue-600 text-sm">کد ملی:</strong>
            {employee.post_code}
          </p>
          <p className="text-right border border-gray-300 rounded-2xl p-1 px-3 mt-2 flex justify-between text-sm">
            <strong className="text-blue-600 text-sm">سمت شغلی:</strong>
            {employee.work_position}
          </p>
          <p className="text-right border border-gray-300 rounded-2xl p-1 px-3 mt-2 flex justify-between text-sm">
            <strong className="text-blue-600 text-sm">تاریخ تولد:</strong>
            {employee.date_of_birth}
          </p>
          <p className="text-right border border-gray-300 rounded-2xl p-1 px-3 mt-2 flex justify-between text-sm">
            <strong className="text-blue-600 text-sm">شماره تماس:</strong>
            {employee.phone_number}
          </p>
          <p className="text-right border border-gray-300 rounded-2xl p-1 px-3 mt-2 flex justify-between text-sm">
            <strong className="text-blue-600 text-sm">ایمیل:</strong>
            {employee.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal;
