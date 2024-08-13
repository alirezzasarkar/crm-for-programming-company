import React from "react";

interface ControlButtonsProps {
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
  onSubmit: () => void;
  isRunning: boolean;
  isPaused: boolean;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
  onStart,
  onPause,
  onStop,
  onSubmit,
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
          onClick={onStart}
        >
          ادامه
        </button>
      )}
      {(isRunning || isPaused) && (
        <button
          className="px-6 py-2 mx-2 bg-red-600 text-white rounded"
          onClick={onStop}
        >
          توقف
        </button>
      )}
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
