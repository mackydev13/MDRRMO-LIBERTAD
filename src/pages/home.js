import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserCard from 'components/ui-elements/UserCard';
import EditUserModal from 'components/ui-elements/EditUserModal';
import {db} from '../configs/firebase'
import { collection, getDocs , deleteDoc, doc} from 'firebase/firestore';


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
      } catch (err) {
        setError(err.message);
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
  
  

  console.log(userData);
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
     </div>
  );
 }

export default Home
