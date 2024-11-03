import React, {useEffect, useState} from 'react'
import IncidentCard from 'components/ui-elements/IncidentCard'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
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
  
  console.log(incidents);

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
          date={incident.createdAt.toDate().toLocaleDateString()}
          status={'pending'}
        />
      ))}
     </div>
  );
}

export default Reports
