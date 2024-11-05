import React,{useState,useEffect} from "react"
import EmergencyHotlineCard from "components/ui-elements/EmergencyHotlineCard"
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import {db} from '../configs/firebase'

function Hotline() {
  const [hotlines, setHotlines] = useState([]);
  const [editingHotline, setEditingHotline] = useState(null);
  const hotlinesCollection = collection(db, 'hotlines');

   // Fetch hotlines from Firebase
  useEffect(() => {
    const unsubscribe = onSnapshot(hotlinesCollection, (snapshot) => {
      const fetchedHotlines = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setHotlines(fetchedHotlines);
    });
    return () => unsubscribe();
  }, []);

  const handleAddHotline = async (hotline) => {
    try {
      await addDoc(hotlinesCollection, hotline);
    } catch (error) {
      console.error('Error adding hotline:', error);
    }
  };

  const handleUpdateHotline = async (updatedHotline) => {
    try {
      const hotlineRef = doc(db, 'hotlines', updatedHotline.id);
      await updateDoc(hotlineRef, {
        hotlineName: updatedHotline.hotlineName,
        phoneNumber: updatedHotline.phoneNumber,
        address: updatedHotline.address
      });

      setEditingHotline(null);
    } catch (error) {
      console.error('Error updating hotline:', error);
    }
  };

  const handleDeleteHotline = async (id) => {
    try {
      const hotlineRef = doc(db, 'hotlines', id);
      await deleteDoc(hotlineRef);
    } catch (error) {
      console.error('Error deleting hotline:', error);
    }
  };

  const handleEditHotline = (hotline) => {
    setEditingHotline(hotline);
  }; 


return (
  <div className="flex gap-4">
      <div className="w-20/20 text-center">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Create Hotline</h3>
        <EmergencyHotlineCard
        onAddHotline={handleAddHotline}
        onUpdateHotline={handleUpdateHotline}
        editingHotline={editingHotline}
      />   
      </div>
      <div className="w-full flex flex-col gap-2">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Emergency Hotlines</h2>
       {hotlines.map((hotline) => (
          <div
            key={hotline.id}
            className="bg-white p-4 mb-3 rounded-lg shadow-md flex justify-between items-center"
          >
            <div className="flex justify-between items-center space-x-10">
              <h4 className="font-semibold text-gray-800">{hotline.hotlineName}</h4>
              <p className="text-gray-600">{hotline.phoneNumber}</p>
              <p className="text-gray-600">{hotline.address}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEditHotline(hotline)}
                className="text-blue-500 hover:text-blue-600 p-2 border border-blue-500 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteHotline(hotline.id)}
                className="text-red-500 hover:text-red-600 p-2 border border-red-500 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}</div>

     </div>
  )
}


export default Hotline;

