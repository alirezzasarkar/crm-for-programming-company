import React from "react";
import { Bar } from "react-chartjs-2";
import moment from "jalali-moment"; // Import moment-jalaali
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

const TransactionChart = ({ transactionsGroupedBy5Days }) => {
  // Convert dates to Jalali (Shamsi) format
  const labels = transactionsGroupedBy5Days.map((group) => {
    const startDateShamsi = moment(group.start_date).format("jMM/jDD");
    const endDateShamsi = moment(group.end_date).format("jMM/jDD");
    return `${startDateShamsi} تا ${endDateShamsi}`;
  });

  const dataPoints = transactionsGroupedBy5Days.map(
    (group) => group.transactions.length
  );

  const data = {
    labels,
    datasets: [
      {
        data: dataPoints,
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
          stepSize: 3, // Step size for y-axis
        },
        grid: {
          color: "#e5e7eb", // Lighter grid lines
        },
      },
    },
  };

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
