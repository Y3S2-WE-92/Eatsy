import React from 'react'
import { IoClose } from "react-icons/io5";
import { FaLocationCrosshairs } from "react-icons/fa6";

function NewLocationModal({ isOpen, onClose }) {
  return (
    <dialog
      id="shopping-cart-modal"
      className="modal modal-bottom sm:modal-middle"
      open={isOpen}
    >
      <div className="modal-box">
        <div className="flex flex-col gap-3">
          <div className="flex flex-row justify-between items-center">
            <h2 className="card-title text-2xl truncate">Add New Location</h2>
            <button className="btn" onClick={onClose}>
              <IoClose />
            </button>
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex flex-col gap-3 w-full">
              <input
                type="text"
                placeholder="Location Name"
                className="input input-bordered"
              />
              <textarea
                placeholder="Location Address"
                className="textarea textarea-bordered"
              />
            </div>
            <button className="btn btn-info"><FaLocationCrosshairs/> Get Location</button>
          </div>
          <button className="btn btn-primary">Save</button>
        </div>
      </div>
    </dialog>
  );
}

export default NewLocationModal