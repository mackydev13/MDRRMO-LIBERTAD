import React, { useState ,useEffect} from 'react';
import { db } from '../../configs/firebase';
import { toast } from 'react-toastify';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';

const EmergencyHotlineCard = ({ onAddHotline, onUpdateHotline, editingHotline }) => {
  const [hotlineName, setHotlineName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  

  useEffect(() => {
    if (editingHotline) {
      setHotlineName(editingHotline.hotlineName);
      setPhoneNumber(editingHotline.phoneNumber);
      setAddress(editingHotline.address);
    }
  }, [editingHotline]);


  const handleAddHotline = () => {
    if (hotlineName && phoneNumber && address) {
        
      if (editingHotline) {
        onUpdateHotline({id: editingHotline.id ,hotlineName, phoneNumber, address });
      }else{
        onAddHotline({hotlineName, phoneNumber, address });
      }


      setHotlineName('');
      setPhoneNumber('');
      setAddress('');
    } else {
      toast.error('Please fill in all fields.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-sm mx-auto">

      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        {editingHotline ? 'Edit Emergency Hotline' : 'Add Emergency Hotline'}
      </h3>

      <input
        type="text"
        placeholder="Hotline Name"
        value={hotlineName}
        onChange={(e) => setHotlineName(e.target.value)}
        className="w-full p-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="tel"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
        <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <button
        onClick={handleAddHotline}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        {editingHotline ? 'Update Hotline' : 'Add Hotline'}
      </button>
    </div>  );
};

export default EmergencyHotlineCard;
