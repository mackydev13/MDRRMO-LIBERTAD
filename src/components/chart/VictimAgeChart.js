import React from 'react';
import { Bar } from 'react-chartjs-2';

const VictimAgeChart = ({incidents}) => {


  const incidentsByAge = incidents.reduce((acc, incident) => {
    const age = incident.Age;
    if (age) {
      if (age >= 0 && age <= 10) {
        acc[0]++;
      } else if (age >= 11 && age <= 20) {
        acc[1]++;
      } else if (age >= 21 && age <= 30) {
        acc[2]++;
      } else if (age >= 31 && age <= 40) {
        acc[3]++;
      } else if (age >= 41 && age <= 50) {
        acc[4]++;
      } else if (age >= 51) {
        acc[5]++;
      }
    }
    return acc;
  }, [0, 0, 0, 0, 0, 0]);


  const data = {
    labels: ['0-10', '11-20', '21-30', '31-40', '41-50', '51+'], // Age groups
    datasets: [
      {
        label: 'Age Commonly Involved',
        data: incidentsByAge, // Number of victims in each age group
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            stepSize: 5, // Increment step
          },
          scaleLabel: {
            display: true,
            labelString: 'Age Involved',
          },
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Age Groups',
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

export default VictimAgeChart;
