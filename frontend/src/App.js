import React, { useState } from 'react';
import MapComponent from './components/MapComponent';
import SearchComponent from './components/SearchComponent';
import StampComponent from './components/StampComponent';

function App() {
  const [stamps, setStamps] = useState([]);

  const handleCitySelect = (cityData) => {
    const newStamp = {
      city: cityData.city || "Sample City",
      country: cityData.country || "Sample Country",
      entryDate: cityData.entryDate || null,
      exitDate: cityData.exitDate || null,
      purpose: cityData.purpose || "",
      icon: cityData.icon || "/assets/generic-icon.png",
      color: cityData.color || "#FF5733"
    };

    // For a real project, you could POST this to your backend API.
    setStamps(prev => [...prev, newStamp]);
  };

  const handleCitySearch = (query) => {
    // Simulate a search result (replace with a call to a geocoding API)
    const simulatedCityData = {
      city: query,
      country: "Simulated Country",
      icon: null,  // Logic to determine the icon will apply in handleCitySelect.
      color: "#3399FF"
    };
    handleCitySelect(simulatedCityData);
  };

  return (
    <div>
      <h1>Travel Stamps</h1>
      <SearchComponent onCitySearch={handleCitySearch} />
      <MapComponent onCitySelect={handleCitySelect} />
      <div className="stamps">
        {stamps.map((stamp, index) => (
          <StampComponent key={index} stamp={stamp} />
        ))}
      </div>
    </div>
  );
}

export default App;
