import React, {useEffect, useState} from 'react'
import { collection, getDocs, deleteDoc,updateDoc, doc } from 'firebase/firestore';
import {db} from '../configs/firebase'
import MapTracker from 'components/ui-elements/MapTracker';
import { GridRowModes,GridActionsCellItem } from '@mui/x-data-grid';
import DataGridTable from "components/ui-elements/DataGridTable";

import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import CardContainer from 'components/ui-elements/CardContainer';
import ReverseGeocode from 'components/ui-elements/ReverseGeocode';



function Reports() {
    
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [isAccepted, setIsAccepted] = useState(false);
  const [location, setLocation] = useState({ lat: 11.76939, lng: 121.91882 });
  const [selection ,setSelection] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);

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
  
  const deleteIncident = (id) => async () => {
    const validation = window.confirm('Are you sure you want to delete this incident?');
    const incidentDoc = doc(db, 'incidents', id);
    await deleteDoc(incidentDoc);
    const updatedIncidents = incidents.filter((incident) => incident.id !== id);

    setIncidents(updatedIncidents);
  };


  const AcceptIncident = (id) => async () => {
   try {
    const validation = window.confirm('Are you sure you want to accept this incident?');
    if (!validation) return;
    
    const incidentDoc = doc(db, 'incidents', id);
    await updateDoc(incidentDoc, { status: 'On-Going Rescue' });
    console.log('Document updated successfully');
    
    const updatedIncidents = incidents.filter((row) => row.id !== id);
    setIncidents((prevIncidents) =>
      prevIncidents.map((incident) =>
        incident.id === id ? { ...incident, status: 'On-Going Rescue' } : incident
      )
    );

    incidents.map(loc => {
      console.log(loc.location.latitude,loc.location.longitude);
      mapLocation(loc.location.latitude,loc.location.longitude);
    });
    
  } catch (error) {
    console.error('Error updating document:', error);
  }
  }

  const mapLocation = (lat, lng) => {
    setLocation({ lat: lat, lng: lng });
  }
  

  const handleSelectionChange = (selectionModel) => {
    const selectedData = incidents.filter((incident) =>
      selectionModel.includes(incident.id)
    );

    setSelectedRows(selectedData);

    if (selectedData.length === 1) {
      const selectedIncident = selectedData[0];
      const lat = selectedIncident.location.latitude;
      const lng = selectedIncident.location.longitude;
      setLocation({ lat: lat, lng: lng });
    }

  };

  const showLocation = (lat, lng) => () => {
    setLocation({ lat: lat, lng: lng });
  }
  
  // const pendingIncidents = incidents.filter((incident) => incident.status === 'Pending');

  const columns = [
  {field: 'id',headerName: 'ID', width: 100},
  {field: 'victimName',headerName: 'Victim', width: 150},
  {field: 'description',headerName: 'Description', width: 200},
  {field: 'status',headerName: 'Status', width: 150},
  {field: 'createdAt',headerName: 'Date', width: 150 },
  {field: 'action', type: 'actions',
  headerName: 'Actions',
  width: 100,
  cellClassName: 'actions',
      getActions: ({ id }) => {     
      const incident = incidents.find((incident) => incident.id === id);
      return [
        incident?.status !== 'Pending' && (
          <GridActionsCellItem
          icon={<LocationSearchingIcon />}
          label="Accept"
          className="textPrimary"
          onClick={showLocation(incident.location.latitude,incident.location.longitude)}
          color="green"
        />
        ),
        incident?.status !== 'On-Going Rescue' && (
          <>
          <GridActionsCellItem
          icon={<LocationSearchingIcon />}
          label="Accept"
          className="textPrimary"
          onClick={AcceptIncident(id)}
          color="green"
        />
          <GridActionsCellItem
            icon={<ThumbDownIcon />}
            label="Delete"
            onClick={deleteIncident(id)}
            color="inherit"
          />
          </>
        ),
      ].filter(Boolean);
      },
    }
  ];

  console.log(selectedRows);


  return (
    <CardContainer>
      <div className="flex flex-col">
        <div style={{ margin: 5 }}>
          {<MapTracker initialLat={location.lat} initialLng={location.lng} />}
        </div>
        <div className="flex">
          <div>
            <DataGridTable
              selectionRow={selection}
              col={columns}
              rowData={incidents}
              selectedRowData={handleSelectionChange} // Callback for row selection
            />
            {error && <p>Error: {error}</p>}
          </div>
          <div className="flex flex-col  max-w-1/2 ml-4 shadow-lg rounded-lg justify-evenly p-2 w-1/2" style={{ width: "100%" , backgroundColor: '#0B5A81'}}>

            <h2 className="text-4xl text-center text-white font-bold">Incident Details</h2>
            <h2 className='p-2 text-center'><strong className="text-white">Status:</strong> <strong style={{color: 'green'}}>{selectedRows[0]?.status}</strong></h2>
              <div className="flex">
              <div className="w-full">
              <img
                src={selectedRows[0]?.imageUrl || require('../assets/test.jpeg')}
                alt="Incident"
                style={{ width: "100%", objectPosition: "center", objectFit: "cover", borderRadius: "10px" }}
              />
            </div>
            <div className="flex flex-col w-full">

            <div>
            <div className="flex flex-col">
                    <div className="flex text-white flex-col m-2">
                    <h2 className='p-2'><strong>Description:</strong> {selectedRows[0]?.description}</h2>
                    <h2 className='p-2'><strong>Time:</strong> {selectedRows[0]?.createdAt.toDate().toLocaleTimeString()}</h2>
                    <h2 className='p-2'><strong>Date:</strong> {selectedRows[0]?.createdAt.toDate().toLocaleDateString()}</h2>
                    {/* <h2>Location: {ReverseGeocode({ lat: row.location.latitude, lng: row.location.longitude })}</h2> */}
                  </div>
                  <div className="flex flex-col text-white m-2">
                    <h2 className='p-2'><strong>Victim ID:</strong> {selectedRows[0]?.id}</h2>
                    <h2 className='p-2'><strong>Victim Name:</strong> {selectedRows[0]?.victimName}</h2>
                    <h2 className='p-2'><strong>Contact:</strong> {selectedRows[0]?.contact}</h2>
                  </div>
                  </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </CardContainer>
  );
}

export default Reports
