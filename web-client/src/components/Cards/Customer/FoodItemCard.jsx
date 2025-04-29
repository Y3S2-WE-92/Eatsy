import React, { useState } from "react";
import { formatCurrency } from "../../../utils/format-utils/CurrencyUtil";
import ImageLoader from "../../Loaders/ImageLoader";
import { useImageLoaded } from "../../../utils/image-utils/useImageLoaded";
import FoodItemModal from "../../Modals/Customer/FoodItemModal";

function FoodItemCard({ item }) {
  const [isFoodItemModalOpen, setIsFoodItemModalOpen] = useState(false);
  const isImageLoaded = useImageLoaded(item.image);

  const handleFoodItemModalOpen = () => {
    setIsFoodItemModalOpen(true);
  };

  const handleFoodItemModalClose = () => {
    setIsFoodItemModalOpen(false);
  };

  return (
    <>
      <div
        key={item.id}
        className="card min-w-56 max-w-56 bg-base-100 border border-accent/30"
        onClick={handleFoodItemModalOpen}
      >
        <figure>
          {isImageLoaded ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-32 object-cover"
            />
          ) : (
            <div className="w-full h-32 bg-accent/30">
              <ImageLoader />
            </div>
          )}
        </figure>
        <div className="card-body">
          <div className="card-title truncate">{item.name}</div>
          <div className="flex flex-col">
          <small>Starting from </small><p className="font-bold">{formatCurrency(item.sizes[0].price)}</p>
          </div>
        </div>
      </div>
      {isFoodItemModalOpen && (
        <FoodItemModal
          item={item}
          isOpen={isFoodItemModalOpen}
          onClose={handleFoodItemModalClose}
        />
      )}
    </>
  );
}

export default FoodItemCard;
