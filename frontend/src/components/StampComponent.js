import React from 'react';
import PassportStampSVG from './PassportStampSVG';

const StampComponent = ({ stamp }) => {
  // Example inline styles to space out the stamps. 
  // You could also do this with a CSS class.
  const containerStyle = {
    width: '200px',
    textAlign: 'center'
  };

  return (
    <div style={containerStyle}>
      <PassportStampSVG
        city={stamp.city}
        country={stamp.country}
        entryDate={stamp.entryDate}
        exitDate={stamp.exitDate}
        purpose={stamp.purpose}
        icon={stamp.icon}
        color={stamp.color}
      />
    </div>
  );
};

export default StampComponent;
