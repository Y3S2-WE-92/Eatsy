import React from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../../utils/format-utils/CurrencyUtil";
import ImageLoader from "../../Loaders/ImageLoader";
import { useImageLoaded } from "../../../utils/image-utils/useImageLoaded";

function RestaurantCard({ restaurant }) {
  const isImageLoaded = useImageLoaded(restaurant.image);

  return (
    <Link to={`/customer/restaurant-view/${restaurant._id}`}>
      <div
        key={restaurant.id}
        className="card min-w-56 bg-base-100 border border-accent/30"
      >
        <figure>
          {isImageLoaded ? (
            <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-32 object-cover"
          />
          ):(
            <div className="w-full h-32 bg-accent/30">
              <ImageLoader />
            </div>
          )}
        </figure>
        <div className="card-body">
          <h2 className="card-title truncate">{restaurant.name}</h2>
          <p>Delivery Fee: {formatCurrency(restaurant.deliveryFee)}</p>
          <p>Rating: {restaurant.rating}</p>
          <p>Delivery Time: {restaurant.deliveryTime}</p>
        </div>
      </div>
    </Link>
  );
}

export default RestaurantCard;
