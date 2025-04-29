import React from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../../utils/format-utils/CurrencyUtil";
import ImageLoader from "../../Loaders/ImageLoader";
import { useImageLoaded } from "../../../utils/image-utils/useImageLoaded";
import StarRating from "../../Ratings/StarRating";
import { formatMinutesTime } from "../../../utils/format-utils/TimeFormatUtil";
import { calculateDeliveryTimeInMinutes } from "../../../utils/calc-utils/calculateDeliveryTime";

function RestaurantCard({ restaurant }) {
  const isImageLoaded = useImageLoaded(restaurant.profileImage);

  return (
    <Link to={`/customer/restaurant-view/${restaurant._id}`}>
      <div
        key={restaurant.id}
        className="card min-w-56 bg-base-100 border border-accent/30"
      >
        <figure>
          {isImageLoaded ? (
            <img
              src={restaurant.profileImage}
              alt={restaurant.name}
              className="w-full h-32 object-cover"
            />
          ) : (
            <div className="w-full h-32 bg-accent/30">
              <ImageLoader />
            </div>
          )}
        </figure>
        <div className="card-body">
          <h2 className="card-title truncate">{restaurant.name}</h2>
          <StarRating rating={restaurant?.rating} />
          <div className="flex flex-col">
          <span>
            {formatCurrency(restaurant.deliveryFee)}{" "}|{" "}
            {formatMinutesTime(calculateDeliveryTimeInMinutes())}
          </span>
          <span> for Delivery </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default RestaurantCard;
