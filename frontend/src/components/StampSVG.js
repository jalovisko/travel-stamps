import React from 'react';

const StampSVG = ({ stamp }) => {
  const { city, country, entryDate, exitDate, purpose, icon, color } = stamp;
  return (
    <svg width="200" height="200">
      <rect width="200" height="200" fill={color} rx="20" ry="20" />
      <image href={icon || "/assets/generic-icon.png"} x="20" y="20" width="50" height="50" />
      <text x="20" y="100" fill="#fff" fontSize="16">{city}, {country}</text>
      {entryDate && (
        <text x="20" y="120" fill="#fff" fontSize="12">
          Entry: {new Date(entryDate).toLocaleDateString()}
        </text>
      )}
      {exitDate && (
        <text x="20" y="140" fill="#fff" fontSize="12">
          Exit: {new Date(exitDate).toLocaleDateString()}
        </text>
      )}
      {purpose && (
        <text x="20" y="160" fill="#fff" fontSize="12">
          {purpose}
        </text>
      )}
    </svg>
  );
};

export default StampSVG;
