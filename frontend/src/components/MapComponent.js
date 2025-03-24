import React from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapEvents = ({ onCitySelect }) => {
  useMapEvents({
    click(e) {
      // Here you might perform reverse geocoding based on e.latlng.
      // For now, simulate city data on map click:
      const cityData = {
        city: "Clicked City",
        country: "Clicked Country",
        icon: null,
        color: "#FF5733"
      };
      onCitySelect(cityData);
    }
  });
  return null;
};

const MapComponent = ({ onCitySelect }) => {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapEvents onCitySelect={onCitySelect} />
    </MapContainer>
  );
};

export default MapComponent;
