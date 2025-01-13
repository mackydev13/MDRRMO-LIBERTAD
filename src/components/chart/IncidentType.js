import React from 'react';
import { Bar } from 'react-chartjs-2';

const IncidentType = ({ incidents }) => {
  console.log(incidents, 'incidents');
  // Sample incident data
  // Process incident data with validation
  const incidentData = incidents.map((incident) => ({
    type: incident.causeOfIncident ? incident.causeOfIncident.trim() : 'Unknown', // Handle empty or undefined Cost
    date: incident.createdAt.toDate().toLocaleDateString(),
    location: incident.baranggay,
  }));

  // Function to count each incident type
  const countIncidentTypes = (data) => {
    const counts = {};
    data.forEach((incident) => {
      // Ensure consistent labeling (e.g., 'Motorcycle' and 'motorcycle' are the same)
      const type = incident.type.toLowerCase();
      counts[type] = (counts[type] || 0) + 1;
    });
    return counts;
  };

  const incidentCounts = countIncidentTypes(incidentData);

  console.log("Incident Data:", incidentData);
  console.log("Incident Counts:", incidentCounts);

  // Assign colors dynamically based on the number of incident types
  const colors = [
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 159, 64, 0.6)',
  ];

  const data = {
    labels: Object.keys(incidentCounts),
    datasets: [
      {
        label: Object.keys(incidentCounts) .length > 1 ? 'Most Common Incident Type' : 'No Common Incident Type',
        data: Object.values(incidentCounts), // Count of each type
        backgroundColor: colors.slice(0, Object.keys(incidentCounts).length),
        borderColor: colors.slice(0, Object.keys(incidentCounts).length).map(color =>
          color.replace('0.6', '1')
        ),
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
            stepSize: 1,
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

export default IncidentType;
