import React from 'react';
import StampComponent from './StampComponent';
import './StampPage.css';

function StampPage({ stamps }) {
  return (
    <div className="stamp-page">
      {stamps.map((stamp, index) => (
        <StampComponent key={index} stamp={stamp} />
      ))}
    </div>
  );
}

export default StampPage;
