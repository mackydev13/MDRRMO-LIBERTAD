import React, {useEffect, useState} from 'react'
import IncidentCard from 'components/ui-elements/IncidentCard'
import { collection, getDocs, deleteDoc,updateDoc, doc } from 'firebase/firestore';
import {db} from '../configs/firebase'
import MapTracker from 'components/ui-elements/MapTracker';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { GridRowModes,GridActionsCellItem } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import DaataGridTable from "components/ui-elements/DataGridTable";

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import CardContainer from 'components/ui-elements/CardContainer';
import { date } from 'yup';



function Reports() {
    
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [isAccepted, setIsAccepted] = useState(false);
  const [location, setLocation] = useState({ lat: 37.7749, lng: -122.4194 }); // Default to San Francisco
  
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyB7ETOwK6NMmiPXlHUAThIjfDbCxXq_A6c', // replace with your API key
  });




  useEffect(() => {
   
    fetchIncidents();
    
  }, []);

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
    await updateDoc(incidentDoc, {status: 'On-Going Rescue'});
    const updatedIncidents = incidents.filter((incident) => incident.id !== id);
    
  }

  console.log(incidents);
  
  const mapLocation = (lat, lng) => {
    setLocation({ lat: lat, lng: lng });
  }
  

 const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setIncidents(incidents.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = incidents.find((row) => row.id === id);
    if (editedRow.isNew) {
      setIncidents(incidents.filter((row) => row.id !== id));
    }
  };



  const columns = [
  {field: 'id', width: 100},
  {field: 'image', width: 100 },
  {field: 'victimName', width: 150},
  {field: 'description', width: 200},
  {field: 'status', width: 150},
  // {field: 'createdAt', width: 150 },
  {field: 'action', type: 'actions',
  headerName: 'Actions',
  width: 100,
  cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    }
  ];

   return (
      <CardContainer>
      <div className="flex">
      <div className='flex flex-col'>
      <h1>Emergency Reports</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
          <DaataGridTable col={columns} rowData={incidents}/>
      {/*      {incidents.map(incident => ( */}
      {/*       // <IncidentCard */}
      {/*   //   key={incident.id} */}
      {/*   //   user={incident.userId} */}
      {/*   //   imageUrl={ require('../assets/test.jpeg')} */}
      {/*   //   title={incident.victimName} */}
      {/*   //   location={incident.location} */}
      {/*   //   description={incident.description} */}
      {/*   //   onDelete={() => deleteIncident(incident.id)} */}
      {/*   //   onAccept={() => AcceptIncident(incident.id) && setLocation({lat: incident.location.latitude, lng: incident.location.longitude})} */}
      {/*   //   date={incident.createdAt.toDate().toLocaleDateString()} */}
      {/*   //   status={incident.status} */}
      {/*   // />  */}
      {/* ))} */}

      </div>
      <div style={{width:'150%', padding: '10px'}}  >
                <h1>Map</h1>
          {<MapTracker initialLat={location.lat} initialLng={location.lng}/>}
      </div>
     </div>

      </CardContainer>
  );
}

export default Reports
