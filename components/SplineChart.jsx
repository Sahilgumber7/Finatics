"use client";

import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";

// Registering required Chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const SplineChart = ({ labels, incomeData, expenseData }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        borderColor: "rgb(34, 197, 94)", // Green
        backgroundColor: "rgba(34, 197, 94, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Expense",
        data: expenseData,
        borderColor: "rgb(239, 68, 68)", // Red
        backgroundColor: "rgba(239, 68, 68, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Prevent the chart from maintaining aspect ratio
    plugins: {
      title: {
        display: false,
        text: "Income vs Expense",
      },
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount (₹)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="h-72"> {/* Set height to make it smaller */}
      <Line data={data} options={options} />
    </div>
  );
};

export default SplineChart;
