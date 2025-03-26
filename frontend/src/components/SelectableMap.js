import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

function SelectableMap({ onSelect }) {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [startPoint, setStartPoint] = useState(null);
  const [startTime, setStartTime] = useState(null);

  const map = useMapEvents({
    mousedown(e) {
      // Convert latlng to container point (pixel coordinates)
      const point = map.latLngToContainerPoint(e.latlng);
      setStartPoint(point);
      setStartTime(Date.now());
    },
    mouseup(e) {
      const endPoint = map.latLngToContainerPoint(e.latlng);
      const timeDiff = Date.now() - startTime;
      const distance = startPoint ? startPoint.distanceTo(endPoint) : 0;
      // If the movement is small and the tap is quick, register as a drop
      if (distance < 5 && timeDiff < 200) {
        setMarkerPosition(e.latlng);
        onSelect(e.latlng);
      }
    },
    // Optionally clear startPoint on dragstart to avoid false positives
    dragstart() {
      setStartPoint(null);
      setStartTime(null);
    }
  });

  return markerPosition ? <Marker position={markerPosition} /> : null;
}

export default SelectableMap;
