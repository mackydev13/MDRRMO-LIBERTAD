import React from 'react';

const IncidentCard = ({ user,title, description, date, imageUrl,location, status }) => {
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
        <p><span className="font-semibold">Location:</span> {location}</p>
        <p><span className="font-semibold">Status:</span> {status}</p>
      </div>

      <div className="flex justify-end space-x-2">
        {/* <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"> */}
        {/*   View Details */}
        {/* </button> */}
        <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
          Responce
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Delete
        </button>
      </div>
    </div>
  );
};

export default IncidentCard;
