import React from 'react';
import StampSVG from './StampSVG';

const StampComponent = ({ stamp }) => {
  return (
    <div style={{ 
      border: `3px solid ${stamp.color}`, 
      padding: '10px', 
      display: 'inline-block', 
      margin: '10px'
    }}>
      <StampSVG stamp={stamp} />
      <h3>{stamp.city}, {stamp.country}</h3>
      {stamp.entryDate && <p>Entry: {new Date(stamp.entryDate).toLocaleDateString()}</p>}
      {stamp.exitDate && <p>Exit: {new Date(stamp.exitDate).toLocaleDateString()}</p>}
      {stamp.purpose && <p>Purpose: {stamp.purpose}</p>}
    </div>
  );
};

export default StampComponent;
