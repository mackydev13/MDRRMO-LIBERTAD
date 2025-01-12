import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc } from 'firebase/firestore';
import { firestore } from '../../configs/firebase';
const IncidentHistory = ({ incidents }) => {
  const [allIncidents, setAllIncidents] = useState([]);
  const [ResolvedIncidents, setResolvedIncidents] = useState([]);
  const [rejectedIncidents, setRejectedIncidents] = useState([]);


  const printIncidentsHistory = () => {
    const printWindow = window.open("");

  // Creating the table structure
  printWindow.document.write("<h1>Incident Records</h1>");
  printWindow.document.write("<table border='1' cellpadding='5' cellspacing='0' style='border-collapse: collapse;'>");
  printWindow.document.write("<thead>");
  printWindow.document.write("<tr>");
  printWindow.document.write("<th>Incident ID</th>");
  printWindow.document.write("<th>Name</th>");
  printWindow.document.write("<th>Age</th>");
  printWindow.document.write("<th>Address</th>");
  printWindow.document.write("<th>Incident Type</th>");
  printWindow.document.write("<th>Description</th>");
  printWindow.document.write("<th>Emergency Level</th>");
  printWindow.document.write("<th>Status</th>");
  printWindow.document.write("<th>Date</th>");
  printWindow.document.write("</tr>");
  printWindow.document.write("</thead>");
  
  printWindow.document.write("<tbody>");
  incidents.forEach((incident) => {
    printWindow.document.write("<tr>");
    printWindow.document.write(`<td>${incident.incidentId}</td>`);
    printWindow.document.write(`<td>${incident.Name}</td>`);
    printWindow.document.write(`<td>${incident.Age}</td>`);
    printWindow.document.write(`<td>${incident.Address}</td>`);
    printWindow.document.write(`<td>${incident.Cost}</td>`);
    printWindow.document.write(`<td>${incident.description}</td>`);
    printWindow.document.write(`<td>${incident.statusLevel}</td>`);
    printWindow.document.write(`<td>${incident.status}</td>`);
    printWindow.document.write(`<td>${incident.createdAt.toDate().toLocaleDateString()}</td>`);
    printWindow.document.write("</tr>");
  });
  printWindow.document.write("</tbody>");
  printWindow.document.write("</table>");
  
  printWindow.document.close();
  printWindow.print();
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
       <div>
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
  console.log(data);
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
