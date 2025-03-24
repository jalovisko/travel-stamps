import React, { useState } from 'react';
import MapComponent from './components/MapComponent';
import SearchComponent from './components/SearchComponent';
import StampComponent from './components/StampComponent';
import LocationConfirmationModal from './components/LocationConfirmationModal';

function App() {
  const [stamps, setStamps] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedCityData, setSelectedCityData] = useState(null);

  // Example function for searching a city (forward geocoding with Nominatim)
  // Then we open the confirmation modal
  const handleCitySearch = async (query) => {
    // Replace with your actual forward geocoding logic
    // e.g., fetch Nominatim, parse city/country
    const cityData = await fetchCityData(query);

    if (cityData) {
      setSelectedCityData(cityData);
      setShowConfirmation(true);
    }
  };

  // Called when the user clicks on the map (reverse geocoding)
  // We open the confirmation modal
  const handleCitySelect = (cityData) => {
    setSelectedCityData(cityData);
    setShowConfirmation(true);
  };

  // Called when user confirms the location in the modal
  const handleConfirmLocation = (finalData) => {
    // finalData includes city, country, entryDate, exitDate, purpose
    // We can add color, random angle, or any other stamp properties here
    const newStamp = {
      ...finalData,
      // e.g., random color or default color
      color: randomReadableColor(),
    };

    setStamps(prev => [...prev, newStamp]);

    // Close the modal
    setShowConfirmation(false);
    setSelectedCityData(null);
  };

  // Example function to pick a random color from a curated list
  const randomReadableColor = () => {
    const colors = ['#FF5733', '#33A1FF', '#33FF57', '#FF33C4', '#FFB533', '#9D33FF'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div>
      <h1>Travel Stamps</h1>

      {/* 1) Searching for a city */}
      <SearchComponent onCitySearch={handleCitySearch} />

      {/* 2) Clicking on the map */}
      <MapComponent onCitySelect={handleCitySelect} />

      {/* 3) Display the stamps */}
      <div className="stamps-container">
        {stamps.map((stamp, index) => (
          <StampComponent key={index} stamp={stamp} />
        ))}
      </div>

      {/* 4) Confirmation Modal */}
      <LocationConfirmationModal
        show={showConfirmation}
        cityData={selectedCityData}
        onClose={() => {
          setShowConfirmation(false);
          setSelectedCityData(null);
        }}
        onConfirm={handleConfirmLocation}
      />
    </div>
  );
}

export default App;

// Example of forward geocoding (Nominatim)
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
