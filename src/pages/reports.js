import React, {useEffect, useState} from 'react'
import IncidentCard from 'components/ui-elements/IncidentCard'
import { collection, getDocs, deleteDoc,updateDoc, doc } from 'firebase/firestore';
import {db} from '../configs/firebase'

function Reports() {

   const incident = {
    title: "Fire in Building",
    description: "A fire broke out on the third floor of the building. Immediate assistance required.",
    date: "2024-11-03",
    location: "Downtown Street, Block A",
    status: "Pending"
  };
  
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const incidentsCollection = collection(db, 'incidents'); // Ensure 'incidents' is the correct collection name 
        const incidentsSnapshot = await getDocs(incidentsCollection);
        const incidentsList = incidentsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setIncidents(incidentsList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);
  

  const deleteIncident = async (id) => {
    const validation = window.confirm('Are you sure you want to delete this incident?');
    const incidentDoc = doc(db, 'incidents', id);
    await deleteDoc(incidentDoc);
    const updatedIncidents = incidents.filter((incident) => incident.id !== id);
    setIncidents(updatedIncidents);
  };

  const AcceptIncident = async (id) => {
    const validation = window.confirm('Are you sure you want to accept this incident?');
    const incidentDoc = doc(db, 'incidents', id);
    await updateDoc(incidentDoc, {description: 'Rescue Is Comming'});
    const updatedIncidents = incidents.filter((incident) => incident.id !== id);
    setIncidents(updatedIncidents);
  }

   return (
    <div className="bg-gray-100">
       {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {incidents.map(incident => (
        <IncidentCard
          key={incident.id}
          user={incident.userId}
          imageUrl={ require('../assets/test.jpeg')}
          title={incident.victimName}
          location={incident.location}
          description={incident.description}
          onDelete={() => deleteIncident(incident.id)}
          onAccept={() => AcceptIncident(incident.id)}
          date={incident.createdAt.toDate().toLocaleDateString()}
          status={'pending'}
        />
      ))}
     </div>
  );
}

export default Reports
