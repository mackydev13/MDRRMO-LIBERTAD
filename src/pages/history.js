import { useEffect, useState } from 'react'
import IncidentHistory from 'components/ui-elements/IncidentHistory'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../configs/firebase';
import CardContainer from 'components/ui-elements/CardContainer';

const History = () => {

 const [incidents, setIncidents] = useState([])
 const [loading, setLoading] = useState(true)
 const [error, setError] = useState(null)

 useEffect(() => {
    fetchIncidents()
 }, [])

 const fetchIncidents = async () => {
    try {
      const incidentsCollection = collection(db, 'incidents'); // Ensure 'incidents' is the corr/ect collection name 
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
    return (
        <CardContainer>
            <IncidentHistory incidents={incidents} loading={loading} error={error} />
        </CardContainer>
    )
}

export default History