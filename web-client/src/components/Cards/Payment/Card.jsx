import React, { useState } from "react";
import { mastercard, chip, visa } from "../../../assets/images";
import ConfirmModal from './ConfirmModal';

const Card = ({ cardName, last4, id, brand, onDelete, menuOpen, onEdit, onMenuToggle }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDeleteClick = () => {
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    onDelete(id);
    setConfirmOpen(false);
  };

  return (
    <div className="relative w-[90%] max-w-[490px] h-[225px] sm:h-[130px] md:h-[270px] z-10">
      <div className="absolute w-full h-full p-4 sm:p-6 rounded-[20px] sm:rounded-[25px] backdrop-blur-lg bg-black text-white bg-opacity-10 shadow-[0_25px_45px_rgba(0,0,0,0.25)] border border-white/10 flex flex-col justify-between">

        {/* Header */}
        <header className="flex justify-between items-start">
          <span className="flex items-center">
            <img
              src={brand === "visa" ? visa : mastercard}
              alt="Card brand"
              className="w-10 sm:w-12 mr-2"
            />
            <h5 className="text-sm sm:text-base font-normal">{brand === "visa" ? "" : "Master Card"}</h5>
          </span>

          {/* 3 Dots Menu */}
          <div className="relative">
            <button
              onClick={() => onMenuToggle(id)}
              className="text-white text-xl sm:text-2xl font-bold"
            >
              &#x22EE;
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-base-300 rounded-box text-black shadow-lg py-2 z-20">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => onEdit(id)}
                >
                  Edit
                </button>
                <button
                  className="w-full text-left px-4 py-2"
                  onClick={handleDeleteClick}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Card details */}
        <div className="flex justify-between items-end mt-8 sm:mt-10">
          <div>
            <h6 className="text-[9px] sm:text-[10px] font-normal">Card Number</h6>
            <h5 className="text-base sm:text-lg tracking-wider">•••• •••• •••• {last4}</h5>
            <h5 className="mt-4 sm:mt-5 text-sm sm:text-base">{cardName}</h5>
          </div>

          <img src={chip} alt="Chip" className="w-10 sm:w-12" />
        </div>
      </div>

      {/* Confirm Modal */}
      <ConfirmModal
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
        header="Confirm Delete"
        message="Are you sure you want to delete this card?"
      />
    </div>
  );
};

export default Card;
