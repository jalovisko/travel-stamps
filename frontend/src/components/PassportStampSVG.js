import React, { useMemo } from 'react';

/**
 * Props:
 *  - city, country, entryDate, exitDate, purpose
 *  - icon
 *  - color
 */
const PassportStampSVG = ({
  city = 'Unknown City',
  country = 'Unknown Country',
  entryDate,
  exitDate,
  purpose,
  icon,
  color = '#FF5733'
}) => {
  // If you have special icons for city/country, handle them here:
  const finalIcon = icon || '/images/icons/generic-icon.png';

  // An example path with arcs and lines. You can tweak it or create your own.
  // This shape is ~120 wide x 80 high.
  const stampPath = `
    M10,10
    Q10,0 20,0
    L100,0
    Q110,0 110,10
    L110,70
    Q110,80 100,80
    L20,80
    Q10,80 10,70
    Z
  `;

  // Slight random rotation for a more "stamped" feel
  // (You could do a random angle, or set a fixed tilt like -5 degrees)
  const randomRotation = useMemo(() => {
    // e.g., random angle between -10 and 10 degrees
    const angle = Math.floor(Math.random() * 21) - 10;
    return `rotate(${angle}, 60, 40)`;
  }, []);

  return (
    <svg
      width="120"
      height="80"
      viewBox="0 0 120 80"
      style={{
        // If you want to scale it bigger, just adjust width/height or use transform
        display: 'block',
      }}
    >
      {/* Group everything so we can rotate the entire stamp slightly */}
      <g transform={randomRotation}>
        {/* The dashed border to simulate a stamped edge */}
        <path
          d={stampPath}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeDasharray="6,4"
        />

        {/* Optional icon in the top-left */}
        <image
          href={finalIcon}
          x="15"
          y="10"
          width="20"
          height="20"
        />

        {/* City/Country text in the center */}
        <text
          x="60" 
          y="35"
          fill={color}
          fontSize="10"
          fontWeight="bold"
          textAnchor="middle"
        >
          {city}, {country}
        </text>

        {/* Entry/Exit/Purpose text below */}
        {entryDate && (
          <text
            x="60"
            y="50"
            fill={color}
            fontSize="8"
            textAnchor="middle"
          >
            Entry: {new Date(entryDate).toLocaleDateString()}
          </text>
        )}
        {exitDate && (
          <text
            x="60"
            y="60"
            fill={color}
            fontSize="8"
            textAnchor="middle"
          >
            Exit: {new Date(exitDate).toLocaleDateString()}
          </text>
        )}
        {purpose && (
          <text
            x="60"
            y="70"
            fill={color}
            fontSize="8"
            textAnchor="middle"
          >
            {purpose}
          </text>
        )}
      </g>
    </svg>
  );
};

export default PassportStampSVG;
