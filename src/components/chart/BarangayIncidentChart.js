import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarangayIncidentChart = ({ BarangayIncidents }) => {


  const incidentsByBarangay = BarangayIncidents.reduce((acc, incident) => {
    const barangay = incident.Address;
    if (acc[barangay]) {
      acc[barangay]++;
    } else {
      acc[barangay] = 1;
    }
    return acc;
  }, {});
  
  const data = {
    labels: Object.keys(incidentsByBarangay),
    datasets: [
      {
        label: 'Number of Incidents',
        data: Object.values(incidentsByBarangay), // Incident counts per barangay
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1,
      }
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarangayIncidentChart;
