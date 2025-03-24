import React, { useMemo } from 'react';
import placeIcons from '../data/placeIcons.json';

/**
 * A rectangular passport stamp with:
 *  - Rounded corners
 *  - A top-left icon
 *  - Multi-line text on the right
 *  - Slight random rotation and random color
 */
const PassportStampSVG = ({
  city = 'Unknown City',
  country = 'Unknown Country',
  entryDate,
  exitDate,
  purpose,
  icon,
  color
}) => {
  //
  // 1) If no color is passed, pick a random color from a curated list.
  //
  const possibleColors = [
    '#FF5733', // Reddish
    '#33A1FF', // Blue
    '#33FF57', // Green
    '#FF33C4', // Pink/Magenta
    '#FFB533', // Orange/Yellow
    '#9D33FF'  // Purple
  ];

  const finalColor = useMemo(() => {
    if (color) return color;
    const index = Math.floor(Math.random() * possibleColors.length);
    return possibleColors[index];
  }, [color]);

  //
  // 2) Slight random angle so the stamp isn’t perfectly horizontal.
  //    Range: -5..+5 degrees
  //
  const randomAngle = useMemo(() => {
    return Math.floor(Math.random() * 11) - 5;
  }, []);

  //
  // 3) Determine the icon path:
  //    - If an `icon` prop is given, use that.
  //    - Otherwise, see if placeIcons.json has a match for the city.
  //    - Else, fallback to a generic icon.
  //
  const finalIcon = icon || (placeIcons[city] || '/images/icons/generic-icon.png');

  //
  // 4) Define a rectangle path with some margin for the icon in the top-left.
  //    The SVG is 160x110, with a “rectangle” from (10,10) to (150,100).
  //    Corners are slightly rounded using Q commands for a stamp-like feel.
  //
  const viewBoxWidth = 160;
  const viewBoxHeight = 110;
  const stampPath = `
    M10,10
    Q10,0 20,0
    L140,0
    Q150,0 150,10
    L150,100
    Q150,110 140,110
    L20,110
    Q10,110 10,100
    Z
  `;

  //
  // 5) Render the stamp
  //
  return (
    <svg
      width={viewBoxWidth}
      height={viewBoxHeight}
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      style={{ overflow: 'visible', display: 'block' }}
    >
      {/* Rotate around the center (80, 55) for a slight tilt */}
      <g transform={`rotate(${randomAngle}, 80, 55)`}>
        {/* Dashed rectangle border */}
        <path
          d={stampPath}
          fill="none"
          stroke={finalColor}
          strokeWidth="3"
          strokeDasharray="6,4"
        />

        {/*
          6) Place the icon in the top-left area. 
             We'll colorize the black PNG icon using CSS masking in <foreignObject>.
             Adjust x/y/width/height if it’s still too big or overlapping the border.
        */}
        <foreignObject x="20" y="10" width="30" height="30">
          <div
            style={{
              width: '30px',
              height: '30px',
              backgroundColor: finalColor,
              WebkitMaskImage: `url(${finalIcon})`,
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              WebkitMaskSize: 'contain',

              maskImage: `url(${finalIcon})`,
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
              maskSize: 'contain'
            }}
          />
        </foreignObject>

        {/*
          7) Multi-line text to the right of the icon. 
             We'll anchor at x=60 so there's space for the icon (30px wide + margin).
             We use <tspan> to put each piece of data on its own line.
        */}
        <text
          x="60"
          y="25"
          fill={finalColor}
          fontSize="10"
          fontWeight="bold"
          textAnchor="start"
        >
          {/* City on the first line */}
          <tspan x="60" dy="0">{city}</tspan>
          {/* Country on the second line */}
          <tspan x="60" dy="1.2em">{country}</tspan>

          {/* Entry date (optional) */}
          {entryDate && (
            <tspan x="60" dy="1.2em">
              Entry: {new Date(entryDate).toLocaleDateString()}
            </tspan>
          )}

          {/* Exit date (optional) */}
          {exitDate && (
            <tspan x="60" dy="1.2em">
              Exit: {new Date(exitDate).toLocaleDateString()}
            </tspan>
          )}

          {/* Purpose (optional) */}
          {purpose && (
            <tspan x="60" dy="1.2em">
              {purpose}
            </tspan>
          )}
        </text>
      </g>
    </svg>
  );
};

export default PassportStampSVG;
