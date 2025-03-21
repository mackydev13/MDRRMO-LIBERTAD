
import React, { useState } from 'react';
import CardContainer from 'components/ui-elements/CardContainer';
import { useSelector, useDispatch } from 'react-redux';
import { People, EmergencyShare, Report, LocationSearching, Height } from '@mui/icons-material';
import { fetchData as fetchDataUser, selectData as selectDataUser } from 'store/Data';
import { fetchData as fetchDataIncidents , selectData as selectDataIncidents } from 'store/IncidentStore';
import { useEffect } from 'react';
import { db } from '../configs/firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { set } from 'store';
import IncidentChart from 'components/chart/IncidentChart';
import ActiveUsersChart from 'components/chart/ActiveUsersChart';
import IncidentsPerMonthChart from 'components/chart/IncidentsPerMonthChart';
import BarangayIncidentChart from 'components/chart/BarangayIncidentChart';
import VictimAgeChart from 'components/chart/VictimAgeChart';
import IncidentType from 'components/chart/IncidentType';
import NotificationComponent from 'components/ui-elements/Notification';
import { Notification, handleCloseNotification} from 'services/reqres/requests';
import ActionNotification from 'components/ui-elements/ActionNotification';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
    const [user, setUser] = useState([]);
    const [incidents, setIncidents] = useState([]);
    const [involvedment, setInvolvedment] = useState([]);
    const [open ,setOpen] = useState(false);

  const totalActive = user.filter((item) => item.status === 'Active').length;
  const totalIncidents = incidents.filter((item) => item.status === 'Pending').length;
  const totalOnGoing = incidents.filter((item) => item.status === 'On-Going Rescue').length;  
  const totalResolved = incidents.filter((item) => item.status === 'Resolved').length;  

useEffect(() => {
    // console.log(Notification, 'notification');
    fetchDataUser();
    fetchDataIncidents();
    incidentDetails();
}, []);


const fetchDataUser = async () => {
    const snapshot = await getDocs(collection(db, 'users'));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setUser(data);
}

const fetchDataIncidents = async () => {
    const snapshot = await getDocs(collection(db, 'incidents'));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setIncidents(data);
}

const incidentDetails = async () => {
    const snapshot = await getDocs(collection(db, 'Involvedment_Details'));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setInvolvedment(data);
}


const CardData = [
    {
        index: 1,
        title: <span className="text-4xl font-bold text-white p-2">Total Incidents</span>,
        value: <span className="text-4xl font-bold text-white p-2">{totalIncidents}</span>,
        color: totalIncidents > 0 ? 'orange' : 'red',
        icon: <Report className="text-4xl font-bold text-white" />,
        link: '',
        data: [],
    },
    {
        index: 2,
        title: <span className="text-4xl font-bold text-white p-2">Total On-Going Rescue</span>,
        value: <span className="text-4xl font-bold text-white p-2">{totalOnGoing}</span>,
        color: totalOnGoing > 0 ? 'blue' : 'red',
        icon: <EmergencyShare className="text-4xl font-bold text-white" />,
        link: '',
        data: [],
    },
    {
        index: 3,
        title: <span className="text-4xl font-bold text-white p-2">Total Active Users</span>,
        value: <span className="text-4xl font-bold text-white p-2">{totalActive}</span>,
        color: totalActive > 0 ? 'green' : 'red',
        icon: <People className="font-bold text-white" />,
        link: '',
        data: [],
    }
]

    return(
        <div className="flex flex-col gap-4">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            { CardData.map((card) => (
                <CardContainer customStyle={{backgroundColor: card.color, height: '150px'}} color={card.color} key={card.index} title={card.title} value={card.value} icon={card.icon} link={card.link} data={card.data} />
            ))}
         </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
           <CardContainer title="Incident Chart" value={<IncidentChart incidents={incidents} />} />
           <CardContainer title="Months most incident" value={<IncidentsPerMonthChart incidents={incidents} />} />
           <CardContainer title="Active Users Chart" value={<ActiveUsersChart users={user} />} />
           <CardContainer title="Baranggay most incident chart" value={<BarangayIncidentChart BarangayIncidents={involvedment} />} />
           <CardContainer title="Age Involved Chart" value={<VictimAgeChart incidents={involvedment} />} />
           <CardContainer title="Incident Type Chart" value={<IncidentType incidents={involvedment} />} />
            </div>
            <ToastContainer />

        </div>
    );
}


export default Dashboard;
