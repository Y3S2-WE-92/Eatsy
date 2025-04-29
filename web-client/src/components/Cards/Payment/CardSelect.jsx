import { useState } from "react";
import { mastercard, visa } from "../../../assets/images";

function CardSelect({ savedCards, onSelect, onOther }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!savedCards || savedCards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <div>No Saved Cards</div>
        <button className="btn btn-outline" onClick={onOther}>Use another card</button>
      </div>
    );
  }

  const card = savedCards[activeIndex];

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Card UI */}
      <div className="relative w-[90%] max-w-[490px] h-[230px] sm:h-[250px] md:h-[270px]">
        <div className="absolute w-full h-full p-4 sm:p-6 rounded-[20px] sm:rounded-[25px] backdrop-blur-lg bg-black text-white bg-opacity-10 shadow-[0_25px_45px_rgba(0,0,0,0.25)] border border-white/10 flex flex-col justify-between">

          {/* Header */}
          <header className="flex justify-between items-start">
            <span className="flex items-center">
              <img
                src={card.brand === "visa" ? visa : mastercard}
                alt="Card brand"
                className="w-10 sm:w-12 mr-2"
              />
              <h5 className="text-sm sm:text-base font-normal">
                {card.brand === "visa" ? "" : "Master Card"}
              </h5>
            </span>
          </header>

          {/* Card details */}
          <div className="flex justify-between items-end mt-8 sm:mt-10">
            <div>
              <h6 className="text-[9px] sm:text-[10px] font-normal">Card Number</h6>
              <h5 className="text-base sm:text-lg tracking-wider">•••• •••• •••• {card.last4}</h5>
              <h5 className="mt-4 sm:mt-5 text-sm sm:text-base">{card.cardName}</h5>
            </div>

            <button className="btn btn-sm btn-primary" onClick={() => onSelect(card)}>Use</button>
          </div>
        </div>
      </div>

      {/* DaisyUI Pagination */}
      <div className="join">
        {savedCards.map((_, index) => (
          <button
            key={index}
            className={`join-item btn btn-xs ${activeIndex === index ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setActiveIndex(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <div className="divider">or</div>

      {/* Use other card */}
      <button className="btn btn-outline w-full max-w-xs" onClick={onOther}>Use another card</button>
    </div>
  );
}

export default CardSelect;
