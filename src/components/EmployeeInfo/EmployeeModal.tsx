// components/EmployeeModal.tsx
import React from "react";
import { FaTimes } from "react-icons/fa";

interface EmployeeModalProps {
  employee: {
    index: number;
    name: string;
    nationalId: string;
    jobTitle: string;
    birthDate: string;
    contactNumber: string;
    email: string;
    profileImage: string;
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
            <img
              src={employee.profileImage}
              alt={`${employee.name} profile`}
              className="mx-auto rounded-full w-24 h-24 object-cover"
            />
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
            {employee.nationalId}
          </p>
          <p className="text-right border border-gray-300 rounded-2xl p-1 px-3 mt-2 flex justify-between text-sm">
            <strong className="text-blue-600 text-sm">سمت شغلی:</strong>
            {employee.jobTitle}
          </p>
          <p className="text-right border border-gray-300 rounded-2xl p-1 px-3 mt-2 flex justify-between text-sm">
            <strong className="text-blue-600 text-sm">تاریخ تولد:</strong>
            {employee.birthDate}
          </p>
          <p className="text-right border border-gray-300 rounded-2xl p-1 px-3 mt-2 flex justify-between text-sm">
            <strong className="text-blue-600 text-sm">شماره تماس:</strong>
            {employee.contactNumber}
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
