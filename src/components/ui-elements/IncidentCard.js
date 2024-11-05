import React,{useEffect,useState} from 'react';
import axios from 'axios';

const IncidentCard = ({id, user,title, description, date, imageUrl,location, status,onDelete,onAccept }) => {
  
  const [address, setAddress] = useState('');

  useEffect(() => {
    getAddressFromLatLng(location.latitude, location.longitude); // Call the getAddressFromLatLng function with default values
  }, []);



  const getAddressFromLatLng = async (lat, lng) => {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;

  try {
    const response = await axios.get(url);
    const address = response.data.display_name; // Get the formatted address
    setAddress(address);
  } catch (error) {
    console.error("Error fetching address:", error);
    return null; // Handle error as needed
  }
};

   
return (
    <div className="bg-white flex flex justify-around items-center shadow-lg rounded-lg p-6 mx-auto mb-4">
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Incident"
          className="w-20 h-30 object-cover flex justify-center rounded-t-lg mb-4"
        />
      )}
      <h2 className="text-xl font-semibold text-gray-800 mb-2 flex flex-col"><span className="font-semibold">UserID: </span>{user}</h2>
      <h2 className="text-xl font-semibold text-gray-800 mb-2 flex flex-col"><span className="font-semibold">Title: </span>{title}</h2>
      <p className="text-gray-600 mb-4 flex flex-col"><span className="font-semibold">Description: </span>{description}</p>
      
      <div className="text-gray-500 text-sm mb-4">
        <p><span className="font-semibold">Date:</span> {date}</p>
        <p><span className="font-semibold">Location:</span> {address}</p>
        <p><span className="font-semibold">Status:</span> {status}</p>
      </div>

      <div className="flex justify-end space-x-2">
        {/* <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"> */}
        {/*   View Details */}
        {/* </button> */}
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={onAccept}>
          Accept
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600" onClick={onDelete}n>
          Delete
        </button>
      </div>
    </div>
  );
};

export default IncidentCard;
