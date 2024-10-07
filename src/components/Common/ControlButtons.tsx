import React from "react";

interface ControlButtonsProps {
  onStart: () => void;
  onPause: () => void;
  onSubmit: () => void;
  onResume: () => void;
  isRunning: boolean;
  isPaused: boolean;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
  onStart,
  onPause,
  onSubmit,
  onResume,
  isRunning,
  isPaused,
}) => {
  return (
    <div className="flex justify-center mt-4">
      {!isRunning && !isPaused && (
        <button
          className="px-6 py-2 mx-2 bg-blue-600 text-white rounded"
          onClick={onStart}
        >
          شروع
        </button>
      )}
      {isRunning && (
        <button
          className="px-6 py-2 mx-2 bg-yellow-500 text-white rounded"
          onClick={onPause}
        >
          وقفه
        </button>
      )}
      {isPaused && (
        <button
          className="px-6 py-2 mx-2 bg-blue-600 text-white rounded"
          onClick={onResume}
        >
          ادامه
        </button>
      )}
      {/* دکمه توقف حذف شده است */}
      <button
        className="px-6 py-2 mx-2 bg-green-600 text-white rounded"
        onClick={onSubmit}
      >
        ثبت
      </button>
    </div>
  );
};

export default ControlButtons;
