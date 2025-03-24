import React, { useState } from 'react';
import './App.css';
import MapComponent from './components/MapComponent';
import SearchComponent from './components/SearchComponent';
import StampComponent from './components/StampComponent';

function App() {
  const [stamps, setStamps] = useState([]);

  // 1. Helper function to fetch city data from Nominatim (forward geocoding)
  const fetchCityData = async (query) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&addressdetails=1&q=${encodeURIComponent(query)}`;
    try {
      const response = await fetch(url, {
        headers: {
          // Good practice: include a valid User-Agent
          'User-Agent': 'MyTravelStampsApp/1.0 (myemail@example.com)'
        }
      });
      const data = await response.json();
      if (data && data.length > 0) {
        // Extract city/country from the address object
        const { address } = data[0];
        const city = address.city || address.town || address.village || address.state || "Unknown";
        const country = address.country || "Unknown";
        return { city, country };
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching city data:", error);
      return null;
    }
  };

  // 2. When user searches, get real city data and create a new stamp
  const handleCitySearch = async (query) => {
    const cityData = await fetchCityData(query);
    if (cityData) {
      handleCitySelect({
        ...cityData,
        color: "#3399FF"
      });
    } else {
      console.log("No results for that city.");
    }
  };

  // 3. Called when a city is found (search or map click). Create a new stamp.
  const handleCitySelect = (cityData) => {
    const newStamp = {
      city: cityData.city || "Sample City",
      country: cityData.country || "Sample Country",
      entryDate: cityData.entryDate || null,
      exitDate: cityData.exitDate || null,
      purpose: cityData.purpose || "",
      icon: cityData.icon || "",   // or set a default icon
      color: cityData.color || "#FF5733"
    };
    setStamps(prev => [...prev, newStamp]);
  };

  return (
    <div className="App">
      <h1>Travel Stamps</h1>
      {/* Pass handleCitySearch to the search component */}
      <SearchComponent onCitySearch={handleCitySearch} />

      {/* Pass handleCitySelect to map so we can do reverse geocoding on click */}
      <MapComponent onCitySelect={handleCitySelect} />

      {/* Container for the "travel book" and stamps */}
      <div className="travel-book">
        <div className="stamps-container">
          {stamps.map((stamp, index) => (
            <StampComponent key={index} stamp={stamp} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
