 import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const MapTracker = ({ initialLat, initialLng }) => {
    const mapSrc = `https://www.google.com/maps?q=${initialLat ?? 11.76939},${initialLng?? 121.91882}&z=15&output=embed`;
    
  return (
    <div>
      {(
      <>
      <div className="mapouter">
        <div className="gmap_canvas">
            <iframe width="100%" height="500" id="gmap_canvas" src={mapSrc} frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0">
            </iframe>
        </div>
      </div>

      </>
      )}
    </div>
  );
};

export default MapTracker;
