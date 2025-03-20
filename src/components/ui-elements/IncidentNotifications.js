import React, { useEffect, useState } from "react";
import { db, onSnapshot } from "../../configs/firebase";
import { collection, getDocs, deleteDoc, updateDoc, doc, where } from 'firebase/firestore';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BellIcon } from "@heroicons/react/24/outline";
import { Outlet, useLocation, useNavigate } from 'react-router-dom'


const IncidentNotifications = () => {
  const [newIncidents, setNewIncidents] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchIncidents = async () => {
      const incidentsCollection = collection(db, 'incidents');
      const unsubscribe = onSnapshot(
        incidentsCollection, where('status', '!==', 'Pending'),
        (snapshot) => {
          const incidentsList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          const list = incidentsList.filter(incident => incident.status !== 'Resolved' && incident.status !== 'Rejected' && incident.status !== 'On-Going Rescue' && incident.Notification !== 'Viewed');

          console.log(list);
          setNewIncidents(list);
          setLoading(false);
        },
        (err) => {
          setError(err.message);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    };
    fetchIncidents();
  }, []);


  const handleNotificationClick = async (incident) => {
    try {
      // Update the status of the incident in Firestore
      const incidentRef = doc(db, "incidents", incident.id);
      await updateDoc(incidentRef, {
        Notification: "Viewed",
      });

      // Optionally navigate to the incident details page
      navigate("/reports");

      setNewIncidents((prevIncidents) =>
        prevIncidents.filter((i) => i.id !== incident.id)
      );
      setShowDropdown(!showDropdown);
      console.log(newIncidents);
    } catch (error) {
      console.error("Error updating incident:", error);
    }
  };

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        onClick={handleDropdownToggle}
      >
        <span className="sr-only">View notifications</span>
        <BellIcon className="h-10 w-10 rounded-full" aria-hidden="true" />
        {newIncidents.length > 0 && (
          <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
            {newIncidents.length}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <ul className="py-1" role="menu">
            {newIncidents.length === 0 ? (
              <li className="px-4 py-2 text-gray-700" role="menuitem">
                No new notifications
              </li>
            ) : (
              newIncidents.map((incident, index) => (
                <li
                  key={index}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  onClick={() => handleNotificationClick(incident)}
                >
                  {incident.description || 'Unnamed Incident'}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};


export default IncidentNotifications;
