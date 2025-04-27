import React from "react";
import { IoClose } from "react-icons/io5";

function MapViewModal({ isOpen, onClose }) {
  return (
    <dialog
      open={isOpen}
      id="map-view-modal"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box min-w-10/12 max-w-5xl">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center mb-3">
            <h2 className="card-title">MapViewModal</h2>
            <button className="btn" onClick={onClose}>
              <IoClose className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default MapViewModal;
