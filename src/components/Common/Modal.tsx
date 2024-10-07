import React, { useEffect } from "react";
import { MdClose } from "react-icons/md";

interface ModalProps {
  onClose: () => void;
  children?: React.ReactNode; // اضافه کردن ویژگی children
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  // Handle escape key press to close modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-lg w-11/12 md:w-1/3 relative p-6">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          aria-label="Close modal"
        >
          <MdClose className="h-6 w-6" />
        </button>
        <div className="space-y-4 mt-5">
          <input
            type="text"
            placeholder="شماره تماس خود را وارد کنید"
            className="w-full px-4 py-2 rounded-md border border-gray-300 text-gray-700"
          />
          <input
            type="password"
            placeholder="رمز جدید را وارد کنید"
            className="w-full px-4 py-2 rounded-md border border-gray-300 text-gray-700"
          />
          <button className="w-full bg-blue-400 text-white py-2 rounded-md hover:bg-blue-500">
            ارسال کد
          </button>
          <input
            type="text"
            placeholder="کد ارسال شده را وارد کنید"
            className="w-full px-4 py-2 rounded-md border border-gray-300 text-gray-700"
          />
          <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600">
            ثبت اطلاعات
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
