import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc } from 'firebase/firestore';
import { firestore } from '../../configs/firebase';

import logo from '../../assets/libertad.png'

const IncidentHistory = ({ incidents }) => {
  const [allIncidents, setAllIncidents] = useState([]);
  const [ResolvedIncidents, setResolvedIncidents] = useState([]);
  const [rejectedIncidents, setRejectedIncidents] = useState([]);


  const printIncidentsHistory = () => {
    // Create a hidden iframe
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;

    // Write the print content with portrait orientation
    doc.write(`
      <html>
        <head>
          <title>Incident Records</title>
          <style>
            @page {
              size: A4 landscape;
              margin: 20mm;
            }

            body {
              text-align: center;
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
            }

            .logo {
              width: 100px;
              height: 100px;
              padding: 10px;
              border-radius: 50%;
              background-color: white;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }

            th, td {
              border: 1px solid #000;
              padding: 8px;
              text-align: center;
              font-size: 12px;
            }

            th {
              background-color: #f2f2f2;
            }

            hr {
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div style="display: flex; align-items: center; justify-content: center;">
            <img src="${logo}" class="logo" alt="logo" />
            <div>
              <h2 style="font-size: 24px; font-weight: 600; color: #1e3a8a;">MDRRMO LIBERTAD</h2>
              <p style="color: #4b5563; font-size: 14px;">Libertad, Antique, Philippines</p>
            </div>
          </div>
          <hr />
          <table>
            <thead>
              <tr>
                <th>Incident ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Address</th>
                <th>Incident Type</th>
                <th>Description</th>
                <th>Emergency Level</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              ${incidents.map(incident => `
                <tr>
                  <td>${incident.incidentId}</td>
                  <td>${incident.Name}</td>
                  <td>${incident.Age}</td>
                  <td>${incident.Address}</td>
                  <td>${incident.Cost}</td>
                  <td>${incident.description}</td>
                  <td>${incident.statusLevel}</td>
                  <td>${incident.status}</td>
                  <td>${new Date(incident.createdAt.toDate()).toLocaleDateString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `);

    doc.close();

    iframe.onload = () => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();

      // Clean up after printing
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
    };
  };


  const deleteAllIncidents = async () => {
    try {
      const incidentsRef = collection(firestore, "incidents");
      const snapshot = await getDocs(incidentsRef);
      const deletePromises = snapshot.docs.map((doc) =>
        deleteDoc(doc.ref) // Deleting each incident
      );
      await Promise.all(deletePromises);
      alert("All incidents deleted successfully!");
      setAllIncidents([]); // Clear local state
    } catch (error) {
      console.error("Error deleting incidents:", error);
      alert("Error deleting incidents.");
    }
  };

  // Process incidents to categorize by status
  useEffect(() => {
    setAllIncidents(incidents);

    const resolved = incidents.filter((incident) => incident.status === 'Resolved');
    setResolvedIncidents(resolved);

    const rejected = incidents.filter((incident) => incident.status === 'Rejected');
    setRejectedIncidents(rejected);
  }, [incidents]);


  return (
    <div className="p-4">
     
      <div className="flex justify-center items-center">
      <img src={logo} className="h-30 w-40 p-2 rounded-full bg-white" alt='logo' />
      <div className="flex flex-col items-center">
      <h2 className="text-5xl  font-semibold text-blue-800">MDRRMO LIBERTAD</h2>
      <p className="text-gray-600">Libertad, Antique, Philippines</p>
        </div>
      </div>
      <div className="flex justify-end mt-4">
      <button
        onClick={printIncidentsHistory}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Print Incident History
      </button>

      <button
        onClick={deleteAllIncidents}
        className="bg-red-500 text-white py-2 px-4 rounded ml-4"
      >
        Remove All Incidents
      </button>
    </div>
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
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Age</th>
            <th className="py-2 px-4 text-left">Address</th>
            <th className="py-2 px-4 text-left">Incident Type</th>
            <th className="py-2 px-4 text-left">Description</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr >
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No incidents found.
              </td>
            </tr>
          ) : (
            data.map((incident, index) => (
              <tr key={incident.id} className="border-b">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{incident.Name}</td>
                <td className="py-2 px-4">{incident.Age}</td>
                <td className="py-2 px-4">{incident.Address}</td>
                <td className="py-2 px-4">{incident.Cost}</td>
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
