import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { featuredRestaurants } from "../../constants";
import { styles } from "../../styles/styles";
import {
  LikeButton,
  SeeMoreButton,
  FoodItemCard,
  ShoppingCartButton,
  CloseButton,
} from "../../components";
import { useImageLoaded } from "../../utils/image-utils/useImageLoaded";
import ImageLoader from "../../components/Loaders/ImageLoader";
import { getRestaurantByID } from "../../utils/fetch-utils/customer/fetch-user";
import { getMenuItemsByRestaurantID } from "../../utils/fetch-utils/customer/fetch-restaurant";

function RestaurantView() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);

  const isCoverImageLoaded = useImageLoaded(restaurant?.profileImage);
  const isProfileImageLoaded = useImageLoaded(restaurant?.coverImage);

  const fetchRestaurantByID = async () => {
    try {
      const response = await getRestaurantByID(id);
      return response;
    } catch (error) {
      console.error(
        "Failed to fetch customer from user-service:",
        error.message
      );
      return null;
    }
  };

  const fetchMenuItemsByRestaurantID = async () => {
    try {
      const response = await getMenuItemsByRestaurantID(id);
      return Array.isArray(response?.menuItems) ? response.menuItems : [];
    } catch (error) {
      console.error("Failed to fetch menu items:", error.message);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch restaurant and menu items concurrently
        const [restaurantData, menuItemsData] = await Promise.all([
          fetchRestaurantByID(),
          fetchMenuItemsByRestaurantID(),
        ]);

        if (!restaurantData) {
          setError("Restaurant not found");
          return;
        }

        setRestaurant(restaurantData);
        setMenuItems(menuItemsData);
      } catch (error) {
        setError("Failed to load restaurant or menu items");
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [id]);

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }

  return (
    <div>
      <ShoppingCartButton />

      <div className="flex flex-col p-0">
        <div className="relative">
          <div className="absolute p-4 z-10">
            <CloseButton link="/customer" />
          </div>
          {/* Black Overlay */}
          <div className="absolute glass top-0 left-0 w-full h-full"></div>
          {/* Cover image */}
          {isCoverImageLoaded ? (
            <img
              src={restaurant.coverImage}
              alt={restaurant.name}
              className="w-full h-32 object-cover"
            />
          ) : (
            <div className="w-full h-32 object-cover">
              <ImageLoader />
            </div>
          )}
        </div>
        {/* Profile section */}
        <div
          className={`${styles.paddingX} flex flex-row items-center gap-4 py-4 bg-base-200`}
        >
          {isProfileImageLoaded ? (
            <img
              src={restaurant.profileImage}
              alt={restaurant.name}
              className="w-20 h-20 md:w-30 md:h-30 rounded-full border-2 border-accent/30 object-cover"
            />
          ) : (
            <div className="w-20 h-20 md:w-30 md:h-30 rounded-full border-2 border-accent/30 object-cover bg-accent/30">
              <ImageLoader />
            </div>
          )}
          <div className="flex flex-col md:flex-row md:justify-between w-full gap-2">
            <div className="flex flex-col w-full">
              <h2 className="text-2xl font-bold">{restaurant.name}</h2>
              <p className="text-sm text-gray-500">{restaurant.address}</p>
            </div>
            <div className="flex flex-row gap-8 w-full md:justify-end items-center">
              <div className="flex flex-col md:gap-2 md:items-end text-sm text-gray-500">
                <p>Delivery Fee: LKR {restaurant?.deliveryFee}</p>
                <p>Rating: {restaurant?.rating}</p>
                <p>Delivery Time: {restaurant?.deliveryTime}</p>
              </div>
              <LikeButton />
            </div>
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
            {menuItems.length > 0 ? (
              <div className="card-content flex flex-row gap-2 overflow-x-auto">
                {menuItems.map((item) => (
                  <FoodItemCard key={item._id} item={item} />
                ))}
              </div>
            ) : (
              <p>No menu items available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantView;
