import React from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapEvents({ onCitySelect }) {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;

      // Reverse geocoding request
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`;
      try {
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'MyTravelStampsApp/1.0 (myemail@example.com)'
          }
        });
        const data = await response.json();
        if (data && data.address) {
          const address = data.address;
          // Fallback to different address fields in case city is not found
          const city = address.city || address.town || address.village || address.state || "Unknown";
          const country = address.country || "Unknown";

          // Create a new stamp
          onCitySelect({
            city,
            country,
            color: "#FF5733" // or any color logic you want
          });
        }
      } catch (error) {
        console.error("Error reverse geocoding:", error);
      }
    }
  });
  return null;
}

const MapComponent = ({ onCitySelect }) => {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapEvents onCitySelect={onCitySelect} />
    </MapContainer>
  );
};

export default MapComponent;
