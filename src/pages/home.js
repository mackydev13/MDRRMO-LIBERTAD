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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({id: '',name: '', email: ''});
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
  
  const handleEdit = () => {
    console.log("Edit button clicked");
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

   const handleSave = (updatedData) => {
    console.log(updatedData);
    setUserData(updatedData);
  };
  
  return (  
     <div className="bg-gray-100">
       {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {users.map(user => (
       <UserCard
        id={user.id}
        name={user.name}
        age={user.age}
        contact={user.contact}
        address={user.address}
        email={user.email}
        registrationDate={user.createdAt.toDate().toLocaleDateString()}
        avatar={user.avatar}
        onEdit={() => setIsModalOpen(true)}
        onDelete={() => handleDelete(user.id)}
      />
      ))
      }
       <EditUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userData={userData}
        onSave={handleSave}
      />

      {/* <CardContainer title="Users List" > */}
        {/* <DaataGridTable col={columns} rowData={users}/> */}
    {/*   <div className="flex flex-row justify-between"> */}
    {/*     <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> */}
    {/*       add user */}
    {/*     </button> */}
    {/*   </div> */}
    {/**/}
    {/*   <Box sx={{ height: 400, width: '100%' }}> */}
    {/*   <DataGrid */}
    {/*     rows={rows} */}
    {/*     columns={columns} */}
    {/*     initialState={{ pagination: { paginationModel } }} */}
    {/*     pageSizeOptions={[5, 10]} */}
    {/*     checkboxSelection */}
    {/*     sx={{ border: 0 }} */}
    {/*   /> */}
    {/* </Box> */}
      {/* </CardContainer> */}
     </div>
  );
 }

export default Home
