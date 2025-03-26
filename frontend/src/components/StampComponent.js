import React from 'react';
import PassportStampSVG from './PassportStampSVG';

function StampComponent({ stamp }) {
  return (
    <div style={{ margin: '0.5rem' }}>
      <PassportStampSVG
        city={stamp.city}
        country={stamp.country}
        entryDate={stamp.entryDate}
        exitDate={stamp.exitDate}
        purpose={stamp.purpose}
        color={stamp.color}
        icon={stamp.icon}
      />
    </div>
  );
}

export default StampComponent;
