import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserCard from 'components/ui-elements/UserCard';
import EditUserModal from 'components/ui-elements/EditUserModal';
import {db} from '../configs/firebase'
import { collection, getDocs , deleteDoc, doc} from 'firebase/firestore';
import CardContainer from 'components/ui-elements/CardContainer';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import DaataGridTable from "components/ui-elements/DataGridTable";
import { Icon } from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';


const columns = [
  { field: 'id', headerName: 'ID', width: 200 },
  {field: 'Profile', headerName: 'Profile', width: 200},
  { field: 'name', headerName: 'fullName', width: 150 },
    {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width:100,
  },
  { field: 'address', headerName: 'Address', width: 150 },
  { field: 'contact', headerName: 'Contact', width: 150 },
  { field: 'email', headerName: 'Email', width: 150 },
  { field: 'createdAt', headerName: 'Registered Date', width: 130 },
];

function Home() {
    
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userData, setUserData] = useState({id: '',name: '', email: ''});
  const [selectionRow, setSelectionRow] = useState(true);
  const [selectionModel, setSelectionModel] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
   useEffect(() => {
    fetchUsers(); 
  }, []);
  
  const fetchUsers = async () => {
      try {
        // Get a reference to the 'users' collection in Firestore
        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);

        // Map each document to a user object
        const usersList = usersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Update the users state
        setUsers(usersList);


        console.log(usersList);
      } catch (err) {
        setError(err.message);
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

  const handleDelete = async (id) => {
      const confirmed = window.confirm("Are you sure you want to delete this user?");
      
      if (confirmed) {
        try {
      await deleteDoc(doc(db, 'users', id)); // Delete the user document from Firestore
      setUsers(users.filter(user => user.id !== id)); // Update local state
      alert("User deleted successfully");
    } catch (err) {
      console.error("Error deleting user:", err);
    }  
      }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectionModel([]);
  };

  const handleSave = () => {
    const updatedUsers = setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === selectionModel.id ? { ...selectionModel } : user
      )
    );
    console.log(updatedUsers);
    handleDialogClose();
  };

  const handleEdit = (row) => {
    console.log(row);
    setSelectionModel({ ...row });
    setIsDialogOpen(true);
  };

  const handleSelectionChange = (ids) => {
    console.log(ids);    
    const selectedRows = users.filter((row) => ids.includes(row.id));
    setSelectionModel(selectedRows);
    console.log(selectedRows);
  };


  const columns = [
    { field: 'id', headerName: 'ID', width:100 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'age', headerName: 'Age', width: 100 },
    { field: 'address', headerName: 'Address', width: 100 },
    { field: 'contact', headerName: 'Contact', width: 100 },
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
  
  return ( 
    <div className="bg-gray-100">
      <CardContainer title="Users">
        <div className="flex ">
          <div className="w-1/2 ">
            <DaataGridTable selectedRowData={handleSelectionChange} selectionRow={selectionRow} col={columns} rowData={users} />
          </div>
          <div className="flex ml-4 shadow-lg rounded-lg w-1/2 p-2  flex-col justify-evenly" style={{ backgroundColor: '#0B5A81', color: 'white' }}>
            <h2 className="text-4xl font-semibold text-center">Users Profile</h2>
            <div className="flex items-center">
            <div className="flex w-1/2 flex-col">
              <img src={selectionModel[0]?.image || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} className="w-100 rounded-full object-cover p-2" />
              <p className="text-gray-600 text-center p-2 text-white"><strong>ID:</strong> {selectionModel[0]?.id}</p>
            </div>
            <div className="flex flex-col w-1/2 p-2">
              <h3 className="text-3xl font-semibold  mb-2 text-center p-2">Information</h3>
              <p className="text-gray-600 p-2 text-white"><strong>Name:</strong> {selectionModel[0]?.name}</p>
              <p className="text-gray-600 p-2 text-white"><strong>Age:</strong> {selectionModel[0]?.age}</p>
              <p className="text-gray-600 p-2 text-white"><strong>Address:</strong> {selectionModel[0]?.address}</p>
              <p className="text-gray-600 p-2 text-white"><strong>Contact:</strong> {selectionModel[0]?.contact}</p>
              <p className="text-gray-600 p-2 text-white"><strong>Email:</strong> {selectionModel[0]?.email}</p>
              <p className="text-gray-600 p-2 text-white"><strong>Registered Date:</strong> {selectionModel[0]?.createdAt.toDate().toLocaleDateString()}</p>
            </div>
            </div>
          </div>
        </div>
      </CardContainer>
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Edit User</DialogTitle>
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
          <TextField
            margin="dense"
            label="Address"
            fullWidth
            value={selectionModel?.address || ''}
            onChange={(e) =>
              setSelectionModel((prev) => ({ ...prev, address: e.target.value }))
            }
          />
          <TextField
            margin="dense"
            label="Contact"
            fullWidth
            value={selectionModel?.contact || ''}
            onChange={(e) =>
              setSelectionModel((prev) => ({ ...prev, contact: e.target.value }))
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
     </div>
  );
 }

export default Home
