import React from 'react';
import './Toolbar.css';

function Toolbar({
  onAddStamp,
  onExportJSON,
  onImportJSON,
  onPrevPage,
  onNextPage,
  disablePrev,
  disableNext
}) {
  return (
    <div className="toolbar">
      <button onClick={onAddStamp}>Add Stamp</button>
      <button onClick={onExportJSON}>Export JSON</button>
      <label className="import-label">
        Import JSON
        <input type="file" accept=".json" onChange={onImportJSON} />
      </label>
      <button onClick={onPrevPage} disabled={disablePrev}>
        &lt; Prev
      </button>
      <button onClick={onNextPage} disabled={disableNext}>
        Next &gt;
      </button>
    </div>
  );
}

export default Toolbar;
