import React, { useEffect } from "react";
import { MdClose } from "react-icons/md";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
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
      <div className="bg-white rounded-lg overflow-hidden shadow-lg w-11/12 md:w-1/3 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          aria-label="Close modal"
        >
          <MdClose className="h-6 w-6" />
        </button>
        <div className="p-6">
          <h2 id="modal-title" className="sr-only">
            Modal Title
          </h2>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
