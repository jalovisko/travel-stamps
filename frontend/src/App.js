import React, { useState } from 'react';
import './App.css';
import Toolbar from './components/Toolbar';
import StampBook from './components/StampBook';
import AddStampModal from './components/AddStampModal';

import 'leaflet/dist/leaflet.css';        // Leaflet CSS
import './leafletDefaultIcons';           // The snippet from above

// Example forward geocoding (Nominatim)
async function fetchCityData(query) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&addressdetails=1&q=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'TravelStampsApp/1.0 (email@example.com)' }
    });
    const data = await response.json();
    if (data && data.length > 0) {
      const { address } = data[0];
      const city = address.city || address.town || address.village || address.state || 'Unknown';
      const country = address.country || 'Unknown';
      return { city, country };
    }
  } catch (err) {
    console.error('Error fetching city data:', err);
  }
  return null;
}

function App() {
  const [stamps, setStamps] = useState([]);
  const [currentSpread, setCurrentSpread] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // In our design, one spread (two pages) holds 16 stamps
  const stampsPerSpread = 16;
  const totalSpreads = Math.ceil(stamps.length / stampsPerSpread);

  const handleNextSpread = () => {
    if (currentSpread < totalSpreads - 1) {
      setCurrentSpread(prev => prev + 1);
    }
  };

  const handlePrevSpread = () => {
    if (currentSpread > 0) {
      setCurrentSpread(prev => prev - 1);
    }
  };

  // Export stamps to JSON
  const handleExportJSON = () => {
    const jsonString = JSON.stringify(stamps, null, 2);
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonString);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "travel-stamps.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  // Import stamps from JSON file
  const handleImportJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const importedData = JSON.parse(evt.target.result);
        if (Array.isArray(importedData)) {
          setStamps(importedData);
          setCurrentSpread(0);
        } else {
          console.error("Imported JSON is not an array of stamps");
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    };
    reader.readAsText(file);
  };

  // When user confirms adding a stamp from the modal
  const handleAddStamp = (stampData) => {
    setStamps(prev => [...prev, stampData]);
    setShowModal(false);
  };

  // Example function to pick a random color
  const randomReadableColor = () => {
    const colors = ['#FF5733', '#33A1FF', '#33FF57', '#FF33C4', '#FFB533', '#9D33FF'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="App">
      <Toolbar
        onAddStamp={() => setShowModal(true)}
        onExportJSON={handleExportJSON}
        onImportJSON={handleImportJSON}
        onPrevPage={handlePrevSpread}
        onNextPage={handleNextSpread}
        disablePrev={currentSpread <= 0}
        disableNext={currentSpread >= totalSpreads - 1}
      />

      <StampBook
        stamps={stamps}
        currentSpread={currentSpread}
        stampsPerSpread={stampsPerSpread}
      />

      {showModal && (
        <AddStampModal
          onClose={() => setShowModal(false)}
          onConfirm={handleAddStamp}
          fetchCityData={fetchCityData}
          randomReadableColor={randomReadableColor}
        />
      )}
    </div>
  );
}

export default App;
