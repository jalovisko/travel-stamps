import React, { useState } from 'react';
import MapComponent from './components/MapComponent';
import SearchComponent from './components/SearchComponent';
import StampComponent from './components/StampComponent';
import LocationConfirmationModal from './components/LocationConfirmationModal';

function App() {
  const [stamps, setStamps] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedCityData, setSelectedCityData] = useState(null);

  // Called when the user searches for a city (forward geocoding with Nominatim)
  const handleCitySearch = async (query) => {
    const cityData = await fetchCityData(query);
    if (cityData) {
      setSelectedCityData(cityData);
      setShowConfirmation(true);
    }
  };

  // Called when the user clicks on the map (reverse geocoding)
  const handleCitySelect = (cityData) => {
    setSelectedCityData(cityData);
    setShowConfirmation(true);
  };

  // Called when the user confirms the location in the modal
  const handleConfirmLocation = (finalData) => {
    const newStamp = {
      ...finalData,
      color: randomReadableColor(),
    };

    setStamps((prev) => [...prev, newStamp]);
    setShowConfirmation(false);
    setSelectedCityData(null);
  };

  // Picks a random color from a curated list
  const randomReadableColor = () => {
    const colors = ['#FF5733', '#33A1FF', '#33FF57', '#FF33C4', '#FFB533', '#9D33FF'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Export the current stamps array to a JSON file
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

  // Import stamps from a JSON file
  const handleImportJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const importedData = JSON.parse(evt.target.result);
        if (Array.isArray(importedData)) {
          setStamps(importedData);
        } else {
          console.error("Imported JSON is not an array of stamps");
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <h1>Travel Stamps</h1>

      {/* Searching for a city */}
      <SearchComponent onCitySearch={handleCitySearch} />

      {/* Clicking on the map */}
      <MapComponent onCitySelect={handleCitySelect} />

      {/* Display the stamps */}
      <div className="stamps-container">
        {stamps.map((stamp, index) => (
          <StampComponent key={index} stamp={stamp} />
        ))}
      </div>

      {/* Confirmation Modal */}
      <LocationConfirmationModal
        show={showConfirmation}
        cityData={selectedCityData}
        onClose={() => {
          setShowConfirmation(false);
          setSelectedCityData(null);
        }}
        onConfirm={handleConfirmLocation}
      />

      {/* Export/Import Buttons */}
      <div style={{ margin: '1rem 0' }}>
        <button onClick={handleExportJSON}>Export JSON</button>
        <input
          type="file"
          accept=".json"
          onChange={handleImportJSON}
          style={{ marginLeft: '1rem' }}
        />
      </div>
    </div>
  );
}

export default App;

// Example of forward geocoding using Nominatim
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
