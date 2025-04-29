import React, { useState } from "react";
import { PiMapPinFill } from "react-icons/pi";
import MapViewModal from "./MapViewModal";

function MapViewButton() {
  const [isMapViewModalOpen, setIsMapViewModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsMapViewModalOpen(true);
  };

  const handleModalClose = () => {
    setIsMapViewModalOpen(false);
  };

  return (
    <>
      <button className="btn btn-primary rounded-full text-sm z-10" onClick={handleModalOpen}><PiMapPinFill />View Map</button>
      <MapViewModal isOpen={isMapViewModalOpen} onClose={handleModalClose}/>
    </>
  );
}

export default MapViewButton;
