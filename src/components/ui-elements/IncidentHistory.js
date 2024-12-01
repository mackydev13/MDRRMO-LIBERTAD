import React, { useEffect, useState } from 'react';

const IncidentHistory = ({ incidents }) => {
  const [allIncidents, setAllIncidents] = useState([]);
  const [ResolvedIncidents, setResolvedIncidents] = useState([]);
  const [rejectedIncidents, setRejectedIncidents] = useState([]);

  // Process incidents to categorize by status
  useEffect(() => {
    setAllIncidents(incidents);

    const resolved = incidents.filter((incident) => incident.status === 'Resolved');
    setResolvedIncidents(resolved);

    const rejected = incidents.filter((incident) => incident.status === 'On-Going Rescue');
    setRejectedIncidents(rejected);
  }, [incidents]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Incident History</h1>
      
      {/* All Incidents */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">All Incidents</h2>
        <Table data={allIncidents} />
      </section>

      {/* Approved Incidents */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-green-600">Resolved Incidents</h2>
        <Table data={ResolvedIncidents} />
      </section>

      {/* Rejected Incidents */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-red-600">Rejected Incidents</h2>
        <Table data={rejectedIncidents} />
      </section>
    </div>
  );
};

// Table Component for displaying incidents
const Table = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="py-2 px-4 text-left">#</th>
            <th className="py-2 px-4 text-left">Incident</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No incidents found.
              </td>
            </tr>
          ) : (
            data.map((incident, index) => (
              <tr key={incident.id} className="border-b">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{incident.description || 'Unnamed Incident'}</td>
                <td className="py-2 px-4">{incident.status}</td>
                <td className="py-2 px-4">{incident.createdAt.toDate().toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default IncidentHistory;
