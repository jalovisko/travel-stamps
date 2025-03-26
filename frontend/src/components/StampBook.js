import React from 'react';
import StampPage from './StampPage';
import './StampBook.css';

function StampBook({ stamps, currentSpread, stampsPerSpread }) {
  const startIndex = currentSpread * stampsPerSpread;
  const spreadStamps = stamps.slice(startIndex, startIndex + stampsPerSpread);
  
  const leftPageStamps = spreadStamps.slice(0, 8);
  const rightPageStamps = spreadStamps.slice(8);

  return (
    <div className="stamp-book">
      <StampPage stamps={leftPageStamps} />
      <StampPage stamps={rightPageStamps} />
    </div>
  );
}

export default StampBook;
