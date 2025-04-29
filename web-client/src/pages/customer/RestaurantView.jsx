import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
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
import { StarRating } from "../../components";
import { formatCurrency } from "../../utils/format-utils/CurrencyUtil";
import { formatMinutesTime } from "../../utils/format-utils/TimeFormatUtil";
import { calculateDeliveryTimeInMinutes } from "../../utils/calc-utils/calculateDeliveryTime";

function RestaurantView() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      try {
        // Fetch restaurant and menu items concurrently
        const [restaurantData, menuItemsData] = await Promise.all([
          fetchRestaurantByID(),
          fetchMenuItemsByRestaurantID(),
        ]);

        if (!restaurantData) {
          setError("Restaurant not found");
          setIsLoading(false);
          return;
        }

        setRestaurant(restaurantData);
        setMenuItems(menuItemsData);
        setIsLoading(false);
      } catch (error) {
        setError("Failed to load restaurant or menu items");
        console.error("Error fetching data:", error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)]">
        <span className="loading loading-spinner loading-xl text-primary"></span>
        <p>Loading Restaurant...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)]">
        <p className="text-error text-lg font-bold">{error}</p>
      </div>
    );
  }

  const filteredMenuItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              src={restaurant?.coverImage}
              alt={restaurant?.name}
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
              src={restaurant?.profileImage}
              alt={restaurant?.name}
              className="w-20 h-20 md:w-30 md:h-30 rounded-full border-2 border-accent/30 object-cover"
            />
          ) : (
            <div className="w-20 h-20 md:w-30 md:h-30 rounded-full border-2 border-accent/30 object-cover bg-accent/30">
              <ImageLoader />
            </div>
          )}
          <div className="flex flex-col md:flex-row md:justify-between w-full gap-2">
            <div className="flex flex-col w-full gap-2">
              <h2 className="text-2xl font-bold">{restaurant?.name}</h2>
              <p className="text-sm text-base-content">{restaurant?.address}</p>
              <StarRating rating={restaurant?.rating} />
            </div>
            <div className="flex flex-row gap-8 w-full md:justify-end items-center">
              <div className="flex flex-col md:gap-2 md:items-end text-sm text-base-content">
                <p>Delivery Fee: {formatCurrency(restaurant?.deliveryFee)}</p>
                <p>Delivery Time: {formatMinutesTime(calculateDeliveryTimeInMinutes())}</p>
              </div>
              <LikeButton />
            </div>
          </div>
        </div>
        <div className="card w-full rounded-none">
          <div className="card-body">
            <div className="card-header flex flex-row justify-between items-center">
              <div className="flex flex-row gap-2">
                <div className="card-title truncate">Featured Food Items</div>
                <span className="text-xs badge badge-soft badge-primary">
                  {filteredMenuItems.length}{" "}
                  <span className="hidden lg:inline-flex text-sm">Results</span>
                </span>
              </div>
              <div className="flex flex-row gap-2">
                <div className="search flex flex-row items-center border border-accent rounded-full md:w-sm pl-4">
                  <IoSearchSharp />
                  <input
                    type="text"
                    placeholder="Search foods, or drinks"
                    className="search input border-0 rounded-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <SeeMoreButton link="" />
              </div>
            </div>
            {menuItems.length > 0 ? (
              <div className="card-content flex flex-row gap-2 overflow-x-auto mt-2">
                {filteredMenuItems?.map((item) => (
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
