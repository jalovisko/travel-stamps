import React, { useState } from 'react';
import './Modal.css'; // We'll define some basic overlay styles

const LocationConfirmationModal = ({ 
  show, 
  onClose, 
  cityData, 
  onConfirm 
}) => {
  // If the modal should not be displayed or cityData is missing, return null
  if (!show || !cityData) return null;

  // Local state for user inputs
  const [entryDate, setEntryDate] = useState('');
  const [exitDate, setExitDate] = useState('');
  const [purpose, setPurpose] = useState('');

  const handleConfirm = () => {
    // Pass the final data (including the user’s optional fields) back up
    onConfirm({
      city: cityData.city,
      country: cityData.country,
      // If a date is provided, convert string -> Date, else null
      entryDate: entryDate ? new Date(entryDate) : null,
      exitDate: exitDate ? new Date(exitDate) : null,
      purpose: purpose || ''
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Confirm Location</h3>
        <p><strong>City:</strong> {cityData.city}</p>
        <p><strong>Country:</strong> {cityData.country}</p>

        <label>
          Entry Date:
          <input 
            type="date" 
            value={entryDate} 
            onChange={(e) => setEntryDate(e.target.value)} 
          />
        </label>

        <label>
          Exit Date:
          <input 
            type="date" 
            value={exitDate} 
            onChange={(e) => setExitDate(e.target.value)} 
          />
        </label>

        <label>
          Purpose:
          <input 
            type="text" 
            placeholder="e.g. vacation, business" 
            value={purpose} 
            onChange={(e) => setPurpose(e.target.value)} 
          />
        </label>

        <div className="modal-buttons">
          <button onClick={handleConfirm}>Confirm</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default LocationConfirmationModal;
