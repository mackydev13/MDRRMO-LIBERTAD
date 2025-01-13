import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserCard from 'components/ui-elements/UserCard';
import EditUserModal from 'components/ui-elements/EditUserModal';
import {db} from '../configs/firebase'
import { collection, getDocs ,addDoc, serverTimestamp, updateDoc,deleteDoc, doc} from 'firebase/firestore';
import CardContainer from 'components/ui-elements/CardContainer';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import DaataGridTable from "components/ui-elements/DataGridTable";
import { Icon } from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import FetchImageFromS3 from 'components/ui-elements/FetchImageFromS3';

import { fetchData,selectData,addData, updateData, deleteData } from 'store/Data';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PersonDetails() {

    const dispatch = useDispatch();
    const data = useSelector(selectData);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectionRow, setSelectionRow] = useState(true);
    const [selectionModel, setSelectionModel] = useState([]);
    const [users, setUsers] = useState(data);
    const [action, setAction] = useState('');
    const [error, setError] = useState(null);
    
     useEffect(() => {
      fetchData();
    }, []);


    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Involvedment_Details'));
        const usersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersData);
        dispatch(addData('Involvedment_Details', usersData));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
    const handleDelete = async (id) => {
  
        const confirmed = window.confirm("Are you sure you want to delete this user?");
        
        if (confirmed) {
          try {
        await deleteDoc(doc(db, 'Involvedment_Details', id)); // Delete the user document from Firestore
        setUsers(users.filter(user => user.id !== id)); // Update local state
        dispatch(fetchData('Involvedment_Details'));
  
        toast.success('User deleted successfully.');
      } catch (err) {
        console.error("Error deleting user:", err);
      }  
        }
    };
  
    const handleDialogClose = () => {
      setIsDialogOpen(false);
      setSelectionModel([]);
    };
  
    const handleSave = async ()  => {
        try {
            const docRef = await addDoc(collection(db, 'Involvedment_Details'), {
              ...selectionModel,
              createdAt: serverTimestamp(),
            });
            setIsDialogOpen(false);
            console.log("Document written with ID: ", docRef.id);
          } catch (error) {
            console.error("Error adding document: ", error);
          }
    };
  
    const handleEdit = (row) => {
      setAction('edit');
      setSelectionModel({ ...row });
      setIsDialogOpen(true);
    };
  
    const handleSelectionChange = (ids) => {
      const selectedRows = users.filter((row) => ids.includes(row.id));
      setSelectionModel(selectedRows);
    };
    

    const handleUpdate = async (data) => {
    console.log(data);

      // try {
      //   const docRef = doc(db, 'Involvedment_Details', data.id);
      //   await updateDoc(docRef, data);
      //   setIsDialogOpen(false);
      //   console.log("Document updated successfully");
      // } catch (error) {
      //   console.error("Error updating document:", error);
      // }
    };
  
    const columns = [
      { field: 'id', headerName: 'ID', width:100 },
      { field: 'name', headerName: 'Name', width: 150 },
      { field: 'age', headerName: 'Age', width: 100 },
      { field: 'baranggay', headerName: 'Address', width: 100 },
      { field: 'causeOfIncident', headerName: 'Cause of Incident', width: 100 },
      {
        field: 'actions',
        type: 'actions',
        align: 'center',
        headerName: 'Actions',
        width: 150,
        renderCell: (params) => (
          <div className='flex justify-evenly items-center'>
            <button className='mr-2' onClick={() => handleEdit(params.row)}><EditNoteIcon /></button>
            <button onClick={() => handleDelete(params.id)}><PersonRemoveIcon /></button>
          </div>
        ),
      },
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
      <div className="bg-gray-100">
        <CardContainer title="Involvedment Details">
            <div className="flex">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2" onClick={() => setIsDialogOpen(true) && setAction('add')}>Add</button>
            </div>
          <div className="flex ">
            <div className="w-1/2 ">
              <DaataGridTable dissableMultipleRowSelection={true} selectedRowData={handleSelectionChange} selectionRow={selectionModel} col={columns} rowData={users} />
            </div>
            <div className="flex ml-4 shadow-lg rounded-lg w-1/2 p-2  flex-col justify-evenly" style={{ backgroundColor: '#0B5A81', color: 'white' }}>
              <h2 className="text-4xl font-semibold text-center">Information</h2>
              <div className="flex items-center">
              <div className="flex w-1/2 flex-col">
                <img src={selectionModel[0]?.image || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} className="w-100 rounded-full object-cover p-2" />
                {/* <p className="text-gray-600 text-center p-2 text-white"><strong>ID:</strong> {selectionModel[0]?.id}</p> */}
              </div>
              <div className="flex flex-col w-1/2 p-2">
                <p className="text-gray-600 p-2 text-white"><strong>Name:</strong> {selectionModel[0]?.name}</p>
                <p className="text-gray-600 p-2 text-white"><strong>Age:</strong> {selectionModel[0]?.age}</p>
                <p className="text-gray-600 p-2 text-white"><strong>Address:</strong> {selectionModel[0]?.baranggay}</p>
                <p className="text-gray-600 p-2 text-white"><strong>Cause of Incident:</strong> {selectionModel[0]?.baranggay}</p>
              </div>
              </div>
            </div>
          </div>
        </CardContainer>
        <Dialog open={isDialogOpen} onClose={handleDialogClose} className='flex justify-center items-center rounded'>
          <DialogTitle className='text-center text-4xl'>Involvedment Details</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Name"
              fullWidth
              value={selectionModel?.name || ''}
              onChange={(e) =>
                setSelectionModel((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <TextField
              margin="dense"
              label="Age"
              type="number"
              fullWidth
              value={selectionModel?.age || ''}
              onChange={(e) =>
                setSelectionModel((prev) => ({ ...prev, age: e.target.value }))
              }
            />
              <select
              className="w-full p-4 mb-4 mt-4 bg-gray-200 rounded-lg"
              value={selectionModel?.baranggay || ''}
              onChange={(e) =>
                setSelectionModel((prev) => ({ ...prev, baranggay: e.target.value }))
              }
            >
            <option value="" disabled>Select Baranggay</option>
            {Baranggay.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select
              className="w-full p-4 bg-gray-200 rounded-lg"
              value={selectionModel?.causeOfIncident || ''}
              onChange={(e) =>
                setSelectionModel((prev) => ({ ...prev, causeOfIncident: e.target.value }))
              }
            >
            <option value="" disabled>Select Cause of Incident</option>
            <option value="Motorcycle Accident">Motorcycle Accident</option>
            <option value="Car Accident">Car Accident</option>
            <option value="Bus Accident">Bus Accident</option>
            <option value="Truck Accident">Truck Accident</option>
          </select>
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={handleDialogClose}>Cancel</Button>
            {action === 'edit' ? (
              <Button color="primary" onClick={ () => handleUpdate(selectionModel)}>Save</Button>
            ) : (
              <Button color="primary" onClick={handleSave}>Add</Button>
            )}
          </DialogActions>
        </Dialog>
       </div>
    );
   }

export default PersonDetails;
