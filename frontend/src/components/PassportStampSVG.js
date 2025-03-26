import React, { useMemo } from 'react';
import placeIcons from '../data/placeIcons.json';

// The word-based wrapping utility
function wrapWords(str, maxLen = 14) {
  const words = str.split(/\s+/);
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    if (!currentLine) {
      currentLine = word;
    } else if (currentLine.length + 1 + word.length > maxLen) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine += ' ' + word;
    }
  }
  if (currentLine) lines.push(currentLine);

  return lines;
}

const PassportStampSVG = ({
  city = 'Unknown City',
  country = 'Unknown Country',
  entryDate,
  exitDate,
  purpose,
  icon,
  color
}) => {
  // 1) Choose color
  const possibleColors = [
    '#0D47A1', '#1B5E20', '#B71C1C', '#004D40', '#3E2723', '#424242', '#1A237E', '#006064',
    '#283593', '#880E4F', '#BF360C', '#00695C', '#4A148C', '#311B92', '#2C3E50', '#37474F',
    '#4E342E', '#212121'
  ];
  const finalColor = useMemo(() => {
    if (color) return color;
    const idx = Math.floor(Math.random() * possibleColors.length);
    return possibleColors[idx];
  }, [color]);

  // 2) Random angle
  const randomAngle = useMemo(() => {
    return Math.floor(Math.random() * 11) - 5; // -5..+5
  }, []);

  // 3) Determine icon (city, country, fallback)
  const finalIcon =
    icon ||
    (placeIcons[city] || placeIcons[country] || '/images/icons/generic-icon.png');

  // 4) Stamp shape
  // Increase viewBoxWidth and adjust path coordinates for a wider stamp.
  const viewBoxWidth = 200;
  const viewBoxHeight = 110;
  const stampPath = `
    M10,10
    Q10,0 20,0
    L180,0
    Q190,0 190,10
    L190,100
    Q190,110 180,110
    L20,110
    Q10,110 10,100
    Z
  `;

  // 5) Word-wrap city and country
  const cityLines = wrapWords(city, 14);
  const countryLines = wrapWords(country, 14);

  // Build an array of lines to display
  const lines = [
    ...cityLines,
    ...countryLines,
    entryDate ? `Entry: ${entryDate}` : null,
    exitDate ? `Exit: ${exitDate}` : null,
    purpose || null
  ].filter(Boolean);

  return (
    <svg
      width={viewBoxWidth}
      height={viewBoxHeight}
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      style={{ overflow: 'visible', display: 'block' }}
    >
      {/* Adjust rotation center to the new width (half of 200 is 100) */}
      <g transform={`rotate(${randomAngle}, 100, 55)`}>
        {/* Dashed border */}
        <path
          d={stampPath}
          fill="none"
          stroke={finalColor}
          strokeWidth="3"
          strokeDasharray="6,4"
        />

        {/* Icon at top-left */}
        <foreignObject x="20" y="15" width="30" height="30">
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

        {/* Multi-line text, each line in a <tspan> */}
        <text
          x="60"
          y="25"
          fill={finalColor}
          fontSize="10"
          textAnchor="start"
          style={{ fontFamily: 'Special Elite, monospace' }}
        >
          {lines.map((line, i) => (
            <tspan key={i} x="60" dy={i === 0 ? 0 : "1.2em"}>
              {line}
            </tspan>
          ))}
        </text>
      </g>
    </svg>
  );
};

export default PassportStampSVG;
