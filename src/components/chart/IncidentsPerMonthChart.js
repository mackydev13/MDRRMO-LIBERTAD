import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const IncidentsPerMonthChart = ({ incidents }) => {
  // Extract and group incidents by month
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const incidentsByMonth = Array(12).fill(0);

  incidents.forEach((incident) => {
    const date = new Date(incident.createdAt.toDate().toLocaleDateString()) // Ensure `incident.date` is a valid date string
    const monthIndex = date.getMonth();    
    incidentsByMonth[monthIndex]++;
  });

  // Chart data
  const data = {
    labels: months,
    datasets: [
      {
        label: 'Incidents',
        data: incidentsByMonth,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Incidents Per Month',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Incidents',
        },
      },
    },
  };

  return (
    <div className="w-full h-full">
      <Bar data={data} options={options} />
    </div>
  );
};

export default IncidentsPerMonthChart;
