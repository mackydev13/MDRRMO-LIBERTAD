import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup , useMap} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const IncidentMapComponent = ({ incidents , selectedLocation = null}) => {


  
const ChangeMapView = ({ coords }) => {
    const map = useMap();
        useEffect(() => {
          if (coords) {
            map.setView(coords, 15);
          }
        }, [coords, map]);
        return null;
      };
      
  return (
    <MapContainer center={[11.76939, 121.91882]} zoom={5} style={{ height: '500px', margin: '0 auto'}}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {selectedLocation && (
        <ChangeMapView coords={selectedLocation} />
      )}
      {incidents.map((incident) => (
        <Marker key={incident.id} position={[incident.location.latitude, incident.location.longitude]} icon={customIcon}>
          <Popup>
            <>
              <p><strong>Incident Location:</strong> {incident.location.latitude}, {incident.location.longitude}</p>
              <p><strong>Incident Status:</strong> {incident.status}</p>
              <p><strong>Incident Description:</strong> {incident.description}</p>
              <p><strong>Incident Level:</strong> {incident.statusLevel}</p>
            </>  
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default IncidentMapComponent;