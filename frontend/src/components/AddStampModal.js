import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet'; // Added import here
import SelectableMap from './SelectableMap';
import SearchComponent from './SearchComponent';
import './AddStampModal.css';

async function fetchCityDataFromLatLng(lat, lng) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`;
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'TravelStampsApp/1.0 (email@example.com)' }
    });
    const data = await response.json();
    if (data && data.address) {
      const address = data.address;
      const city = address.city || address.town || address.village || address.state || 'Unknown';
      const country = address.country || 'Unknown';
      return { city, country };
    }
  } catch (err) {
    console.error('Error in reverse geocoding:', err);
  }
  return null;
}

function AddStampModal({ onClose, onConfirm, fetchCityData, randomReadableColor }) {
  const [tempStamp, setTempStamp] = useState({
    city: '',
    country: '',
    entryDate: '',
    exitDate: '',
    purpose: ''
  });

  const handleSearch = async (query) => {
    const cityData = await fetchCityData(query);
    if (cityData) {
      setTempStamp(prev => ({ ...prev, city: cityData.city, country: cityData.country }));
    }
  };

  const handleMapSelect = async (latlng) => {
    const cityData = await fetchCityDataFromLatLng(latlng.lat, latlng.lng);
    if (cityData) {
      setTempStamp(prev => ({ ...prev, city: cityData.city, country: cityData.country }));
    }
  };

  const handleConfirm = () => {
    onConfirm({
      ...tempStamp,
      color: randomReadableColor(),
      entryDate: tempStamp.entryDate || null,
      exitDate: tempStamp.exitDate || null
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add a Stamp</h2>
        <SearchComponent onCitySearch={handleSearch} />
        <div style={{ height: '300px', margin: '1rem 0' }}>
          <MapContainer center={[51.505, -0.09]} zoom={5} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <SelectableMap onSelect={handleMapSelect} />
          </MapContainer>
        </div>
        <label>
          Entry Date:
          <input
            type="date"
            value={tempStamp.entryDate}
            onChange={e => setTempStamp({ ...tempStamp, entryDate: e.target.value })}
          />
        </label>
        <label>
          Exit Date:
          <input
            type="date"
            value={tempStamp.exitDate}
            onChange={e => setTempStamp({ ...tempStamp, exitDate: e.target.value })}
          />
        </label>
        <label>
          Purpose:
          <input
            type="text"
            value={tempStamp.purpose}
            onChange={e => setTempStamp({ ...tempStamp, purpose: e.target.value })}
          />
        </label>
        <div className="modal-buttons">
          <button onClick={handleConfirm}>Confirm</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default AddStampModal;
