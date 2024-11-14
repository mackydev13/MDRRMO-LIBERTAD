import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const MapTracker = ({ firebaseLat, firebaseLng }) => {
  const [location, setLocation] = useState({lat: firebaseLat, lng:  firebaseLng}); // Default to San Francisco

  console.log(firebaseLat,firebaseLng);

  // Load Google Maps
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyB7ETOwK6NMmiPXlHUAThIjfDbCxXq_A6c', // replace with your API key
  });

  // Map container style
  const mapContainerStyle = {
    width: '100%',
    height: '600px',
  };

  return (
    <div>
      {isLoaded && location && (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={location}
          zoom={15}
        >
          <Marker position={location} />
        </GoogleMap>
      )}
    </div>
  );
};

export default MapTracker;
