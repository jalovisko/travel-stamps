import React from 'react';
import PassportStampSVG from './PassportStampSVG';

const StampComponent = ({ stamp }) => {
  return (
    <div style={{ margin: '1rem' }}>
      <PassportStampSVG
        city={stamp.city}
        country={stamp.country}
        entryDate={stamp.entryDate}
        exitDate={stamp.exitDate}
        purpose={stamp.purpose}
        icon={stamp.icon}
        // color={stamp.color} // or omit color to randomize each time
      />
    </div>
  );
};

export default StampComponent;
