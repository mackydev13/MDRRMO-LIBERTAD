import React from 'react';

const UserCard = ({id, name,age,address,contact, email, registrationDate, avatar,onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-lg mb-2 rounded-lg mx-auto">
      <div className="flex items-center justify-around">
        {avatar ? (
          <div className="flex flex-col items-center">
             <img
            src={require(`../../assets/libertad.png`)}
            className="w-24 h-24 rounded-full object-cover p-2"
          />
           <div>
              <h1>LBT{id}</h1>
          </div>
          </div>
                 ) : (
           <div className="flex flex-col items-center p-2">
               <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center object-cover text-white">
            No Image
          </div>
          <div>
              <h1>ID: LBT{id}</h1>
          </div>
          </div>)}
        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
        <p className="text-gray-600">{age}</p>
        <p className="text-gray-600">{address}</p>
        <p className="text-gray-600">{contact}</p>
        <p className="text-gray-600">{email}</p>
        <p className="text-gray-500 mt-2">Registered on: {registrationDate}</p>
         <div className="flex space-x-2">
        <button
          onClick={onEdit}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="px-2 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Delete
        </button>
      </div>
      </div>
   </div>
  );
};

export default UserCard;
