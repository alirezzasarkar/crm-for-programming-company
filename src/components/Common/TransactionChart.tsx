import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ["۱ مهر", "۵ مهر", "۱۰ مهر", "۱۵ مهر", "۲۰ مهر"],
  datasets: [
    {
      data: [10, 25, 15, 35, 20],
      backgroundColor: "#2D2C84",
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false, // No legend
    },
  },
  scales: {
    x: {
      grid: {
        display: false, // Hide x-axis grid
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 5, // Step size for y-axis
      },
      grid: {
        color: "#e5e7eb", // Lighter grid lines
      },
    },
  },
};

const TransactionChart: React.FC = () => {
  return (
    <div className="p-3 bg-white rounded-xl shadow-md rtl max-w-full h-auto">
      <div className="flex justify-center items-center mb-4">
        <h2 className="text-md font-medium text-blue-600">
          تعداد تراکنش ها بر اساس تاریخ
        </h2>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default TransactionChart;
