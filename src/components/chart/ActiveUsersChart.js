import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const ActiveUsersChart = ({ users }) => {
  // Count active and inactive users
  const activeCount = users.filter((user) => user.status === 'Active').length;
  const inactiveCount = users.filter((user) => user.status === 'Inactive').length;

  // Chart data
  const data = {
    labels: ['Active Users', 'Inactive Users'],
    datasets: [
      {
        label: 'Users %',
        data: [activeCount, inactiveCount],
        backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
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
        text: 'Active vs Inactive Users',
      },
    },
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Pie data={data} options={options} />
    </div>
  );
};

export default ActiveUsersChart;
