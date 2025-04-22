import React from "react";
import { useParams } from "react-router-dom";
import { featuredRestaurants } from "../../constants";
import { styles } from "../../styles/styles";
import { LikeButton, SeeMoreButton, FoodItemCard, ShoppingCartButton } from "../../components";

function RestaurantView() {
  const { id } = useParams();

  const restaurant = featuredRestaurants.find(
    (restaurant) => restaurant.id.toString() === id
  );

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }

  const { name, image, description, deliveryFee, rating, deliveryTime } =
    restaurant;

  return (
    <div>
    <ShoppingCartButton/>
      <div className="flex flex-col">
        {/* Cover image */}
        <img src={image} alt={name} className="w-full h-32 object-cover" />
        {/* Profile section */}
        <div
          className={`${styles.paddingX} flex flex-row items-center gap-4 py-4 bg-base-200`}
        >
          <img
            src={image}
            alt={name}
            className="w-30 h-30 rounded-full border-2 border-accent/30 object-cover"
          />
          <div className="flex flex-col md:flex-row md:justify-between w-full">
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold">{name}</h2>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
          </div>
          <div className="flex flex-row gap-8 w-full justify-end items-center">
            <div className="flex flex-col gap-2 items-end">
              <p className="text-sm text-gray-500">
                Delivery Fee: LKR {deliveryFee.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">Rating: {rating}</p>
              <p className="text-sm text-gray-500">
                Delivery Time: {deliveryTime}
              </p>
            </div>
            <LikeButton />
          </div>
        </div>
        <div className="card w-full rounded-none">
          <div className="card-body">
            <div className="card-header flex flex-row justify-between items-center">
              <div className="card-title">Featured Food Items</div>
              <div className="card-actions">
                <SeeMoreButton link="" />
              </div>
            </div>
            <div className="card-content flex flex-row gap-2 overflow-x-auto">
              {restaurant.foodItems.map((item)=>(
                <FoodItemCard item={item}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantView;
