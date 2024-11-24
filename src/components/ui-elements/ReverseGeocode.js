import React, { useState } from "react";
import axios from "axios";

const ReverseGeocode = ({ lat, lng }) => {
  const [address, setAddress] = useState("");

  try {
    const response =  axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );

    const data = response.data;
    if (data && data.display_name) {
      setAddress(data.display_name);
    } else {
      setAddress("No address found.");
    }
  } catch (error) {
    console.error("Error fetching address:", error);
    setAddress("Error fetching address.");
  }

  return (
    <div>
      <p>{address}</p>
    </div>
  );
};

export default ReverseGeocode;
