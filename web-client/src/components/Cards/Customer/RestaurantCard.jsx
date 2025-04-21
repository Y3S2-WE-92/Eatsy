import React from "react";
import { Link } from "react-router-dom";

function RestaurantCard({ restaurant }) {
  return (
    <Link to={`/customer/restaurant/${restaurant.id}`}>
        <div
      key={restaurant.id}
      className="card min-w-56 bg-base-100 border border-accent/30"
    >
      <figure>
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-32 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{restaurant.name}</h2>
        <p>LKR {restaurant.deliveryFee.toFixed(2)} Delivery Fee</p>
        <p>Rating: {restaurant.rating}</p>
        <p>Delivery Time: {restaurant.deliveryTime}</p>
      </div>
    </div>
    </Link>
  );
}

export default RestaurantCard;
