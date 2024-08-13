import React from "react";

interface TimerDisplayProps {
  time: string;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ time }) => {
  return <div className="text-center text-4xl text-blue-600 my-6">{time}</div>;
};

export default TimerDisplay;
