import React from "react";
import { MdClose } from "react-icons/md"; // Import the close icon from react-icons

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void; // Add an onClose prop to handle closing the modal
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg w-11/12 md:w-1/3 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          aria-label="Close modal"
        >
          <MdClose className="h-6 w-6" />
        </button>
        {/* Modal content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
