import React, {useEffect, useState} from 'react'
import { collection,updateDoc, doc } from 'firebase/firestore';
import {db, onSnapshot} from '../configs/firebase'
import MapTracker from 'components/ui-elements/MapTracker';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DataGridTable from "components/ui-elements/DataGridTable";

import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { AddTask } from '@mui/icons-material';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import CardContainer from 'components/ui-elements/CardContainer';
import FetchImageFromS3 from 'components/ui-elements/FetchImageFromS3';
import IncidentMapComponent from 'components/ui-elements/IncidentMapComponent';



function Reports() {
    
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState({ lat: 11.76939, lng: 121.91882 });
  const [selection ,setSelection] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [resolveDetails, setResolveDetails] = useState("");
  const [Name, setName] = useState("");
  const [Age, setAge] = useState("");
  const [Address, setAddress] = useState("");
  const [Cost, setCost] = useState("");
  const [currentIncidentId, setCurrentIncidentId] = useState(null);

  useEffect(() => {
   
    fetchIncidents();
  
  }, []);

   const fetchIncidents = async () => {
    const incidentsCollection = collection(db, 'incidents');
    const unsubscribe = onSnapshot(
      incidentsCollection,
      (snapshot) => {
        const incidentsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setIncidents(incidentsList);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
    };
  
  const deleteIncident = (id) => async () => {
    const validation = window.confirm('Are you sure you want to reject this incident?');
    const incidentDoc = doc(db, 'incidents', id);
    await updateDoc(incidentDoc, { status: 'Rejected' });
    const updatedIncidents = incidents.filter((incident) => incident.id !== id);

    setIncidents(updatedIncidents);
  };


  const AcceptIncident = (id) => async () => {
   try {
    const validation = window.confirm('Are you sure you want to accept this incident?');
    if (!validation) return;
    
    // await sendNotification( "csjqJUtqTrSPnNL_M_GOgo:APA91bGtLtfS_mw2oeUN3NIFDe6iBMP7-QQy-cFaTwLIPsgTDg671xn-d44cVmJQrruNXvx85WuqcDqAWGOPvcJfOadUgo3TtP0SOSpsNCd-43svAEx-pDA", 'Incident Accepted', 'Incident accepted by the responders');  


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
      // console.log(loc.location.latitude,loc.location.longitude);
      mapLocation(loc.location.latitude,loc.location.longitude);
    });
    
  } catch (error) {
    console.error('Error updating document:', error);
  }
  }




  const mapLocation = (lat, lng) => {
    setLocation({ lat: lat, lng: lng });
  }
  
  const rejectIncident = (id) => {
    // Logic to reject the incident
    const updatedIncidents = incidents.map((incident) =>
      incident.id === id ? { ...incident, status: 'Rejected' } : incident
  );

    setIncidents(updatedIncidents); // Assuming you use state to manage incidents
    alert(`Incident ${id} has been rejected.`);
  };
  
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


  const handleResolveClick = (id) => {
    setModalVisible(true);
    setCurrentIncidentId(id);
  };

  const handleResolveSubmit = async () => {
    // if (!resolveDetails.trim()) {
    //   alert("Please enter details about the resolution.");
    //   return;
    // }

    try {
      console.log(Name,Age,Address,Cost,currentIncidentId);
      const incidentDoc = doc(db, "incidents", currentIncidentId);
    
      await updateDoc(incidentDoc, {
        Name: Name,
        Age: Age,
        Address: Address,
        Cost: Cost,
        status: "Resolved",
      });
      console.log("Document updated successfully");

      setIncidents((prevIncidents) =>
        prevIncidents.map((incident) =>
          incident.id === currentIncidentId
            ? { ...incident, status: "Resolved", Name: Name, Age: Age, Address: Address, Cost: Cost}
            : incident
        )
      );

      setModalVisible(false);
      setResolveDetails("");
      setCurrentIncidentId(null);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };


  const columns = [
  // {field: 'id', width: 100},
  {field: 'incidentId', headerName: 'Incident ID' , width: 100},

  // {field: 'victimName',headerName: 'Victim', width: 150},
  {field: 'description',headerName: 'Description', width: 200}, 
  {field: 'statusLevel',headerName: 'Emergency Level', width: 200}, 
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
          <>
          <GridActionsCellItem
          icon={<LocationSearchingIcon />}
          label="Accept"
          className="textPrimary"
          onClick={showLocation(incident.location.latitude,incident.location.longitude)}
          color="green"
        />
          <GridActionsCellItem
            icon={<AddTask />}
            label="Resolve"
            className="textPrimary"
            onClick={() => handleResolveClick(id)}
            color="green"
          />
          </>
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

  console.log(selectedRows, 'selectedRows');

  const incidentLocations = [
    { lat: 11.76939, lng: 121.91882 }, // Example: Libertad
    { lat: 11.76456, lng: 121.92376 }, // Example: Nearby Incident
    { lat: 11.75987, lng: 121.91543 }, // Example: Another Incident
  ];

  const [Baranggay, setBaranggay] = useState([
    { label: 'Barusbus', value: 'Barusbus' },
    { label: 'Bulanao', value: 'Bulanao' },
    { label: 'Codiong', value: 'Codiong' },
    { label: 'Cubay', value: 'Cubay' },
    { label: 'Igcagay', value: 'Igcagay' },
    { label: 'Inyawan', value: 'Inyawan' },
    { label: 'Lindero', value: 'Lindero' },
    { label: 'Maramig', value: 'Maramig' },
    { label: 'Pucio', value: 'Pucio' },
    { label: 'Pajo', value: 'Pajo' },
    { label: 'Panangkilon', value: 'Panangkilon' },
    { label: 'Paz', value: 'Paz' },
    { label: 'Centro Este (Pob.)', value: 'Centro Este (Pob.)' },
    { label: 'Centro Weste (Pob.)', value: 'Centro Weste (Pob.)' },
    { label: 'San Roque', value: 'San Roque' },
    { label: 'Tinigbas', value: 'Tinigbas' },
    { label: 'Tinindugan', value: 'Tinindugan' },
    { label: 'Taboc', value: 'Taboc' },
    { label: 'Union', value: 'Union' },
  ]);


  return (
    <CardContainer>
      <div className="flex flex-col">
        <div style={{ margin: 5 }}>
          {<IncidentMapComponent incidents={incidents} selectedLocation={location} />}
        </div>
        <div className="flex">
          <div>
            <DataGridTable
              selectionRow={selection}
              col={columns}
              rowData={incidents.filter((incident) => incident.status !== 'Resolved' && incident.status !== 'Rejected')}
              selectedRowData={handleSelectionChange} // Callback for row selection
            />
            {error && <p>Error: {error}</p>}
          </div>
          <div className="flex flex-col  max-w-1/2 ml-4 shadow-lg rounded-lg justify-evenly p-2 w-1/2" style={{ width: "100%" , backgroundColor: '#0B5A81'}}>

            <h2 className="text-4xl text-center text-white font-bold">Incident Details</h2>
            <h2 className='p-2 text-center'><strong className="text-white">Status:</strong> <strong style={{color: 'green'}}>{selectedRows[0]?.status}</strong></h2>
              <div className="flex">
              <div className="w-full">

              <FetchImageFromS3 bucketName={'libertadimages'} imageKey={selectedRows[0]?.image.split('/').pop() || ''}/>                
            </div>
            <div className="flex flex-col w-full">

            <div>
            <div className="flex flex-col">
                    <div className="flex text-white flex-col m-2">
                    <h2 className='p-2'><strong>Description:</strong> {selectedRows[0]?.description}</h2>
                    <h2 className='p-2'><strong>Status Level:</strong> {selectedRows[0]?.statusLevel}</h2>
                    <h2 className='p-2'><strong>Time:</strong> {selectedRows[0]?.createdAt.toDate().toLocaleTimeString()}</h2>
                    <h2 className='p-2'><strong>Date:</strong> {selectedRows[0]?.createdAt.toDate().toLocaleDateString()}</h2>
                    {/* <h2>Location: {ReverseGeocode({ lat: row.location.latitude, lng: row.location.longitude })}</h2> */}
                  </div>
                  <div className="flex flex-col text-white m-2">
                    {/* <h2 className='p-2'><strong>Victim ID:</strong> {selectedRows[0]?.id}</h2> */}
                    {/* <h2 className='p-2'><strong>Victim Name:</strong> {selectedRows[0]?.victimName}</h2>
                    <h2 className='p-2'><strong>Contact:</strong> {selectedRows[0]?.contact}</h2> */}
                  </div>
                  </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
        {/* Modal */}
        {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <h2 className='text-center text-2xl font-bold'>Resolve Incident</h2>
            <input
              type="text"
              className='w-full p-2 m-1 bg-gray-200 rounded-lg' 
              value={Name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name of Liable"
            />
             <input
              type="text"
              className='w-full p-2 m-1 bg-gray-200 rounded-lg'
              value={Age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter Age of Victim"
            />
             <select
              className="w-full p-2 m-1 bg-gray-200 rounded-lg"
              value={Address}
              onChange={(e) => setAddress(e.target.value)}
            >
            <option value="" disabled>Select Cause of Incident</option>
            {Baranggay.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
            <select
              className="w-full p-2 m-1 bg-gray-200 rounded-lg"
              value={Cost}
              onChange={(e) => setCost(e.target.value)}
            >
            <option value="" disabled>Select Cause of Incident</option>
            <option value="Motorcycle Accident">Motorcycle Accident</option>
            <option value="Car Accident">Car Accident</option>
            <option value="Bus Accident">Bus Accident</option>
            <option value="Truck Accident">Truck Accident</option>
          </select>
            <div className="flex justify-end mt-4">
              <button onClick={handleResolveSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
              <button className='bg-red-500 text-white px-4 py-2 rounded' onClick={() => setModalVisible(false) && console.log('cancel')}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Basic Modal Styling */}
      <style>
        {`
          .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .modal-content {
            background: white;
            padding: 20px;
            border-radius: 8px;
            width: 400px;
            max-width: 90%;
          }
          textarea {
            margin-bottom: 10px;
          }
          button {
            margin-right: 5px;
          }
        `}
      </style>
    </CardContainer>
  );
}

export default Reports
