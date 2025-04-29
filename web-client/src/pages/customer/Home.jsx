import React, { useState, useEffect } from "react";
import { FaFilterCircleXmark } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import { styles } from "../../styles/styles";
import {
  RestaurantCard,
  SeeMoreButton,
  ShoppingCartButton,
  LocationSelectButton,
} from "../../components";
import { foodCategories } from "../../constants";
import { getAllRestaurants } from "../../utils/fetch-utils/customer/fetch-user";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [featuredRestaurants, setFeaturedRestaurants] = useState([]);
  const [isRestaurantsLoading, setIsRestaurantsLoading] = useState(true);

  const fetchAllRestaurants = async () => {
    setIsRestaurantsLoading(true);
    try {
      const response = await getAllRestaurants();
      setIsRestaurantsLoading(false);
      return response;
    } catch (error) {
      console.error("Failed to fetch restaurants:", error.message);
      setIsRestaurantsLoading(false);
      return [];
    }
  };

  useEffect(() => {
    fetchAllRestaurants().then((restaurants) => {
      setFeaturedRestaurants(restaurants);
    });
  }, []);

  // Filter restaurants based on search query and selected category
  const filteredRestaurants = featuredRestaurants.filter((restaurant) => {
    // Search query match logic
    const matchesSearch =
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.menuItems.some((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      );

    // Category match logic
    const matchesCategory = selectedCategory
      ? restaurant.categories.includes(selectedCategory)
      : true;

    return matchesSearch && matchesCategory;
  });

  // Handle category selection
  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
  };

  return (
    <div className={`${styles.paddingX} relative flex flex-col gap-2`}>
      {/* Top Bar */}
      <div className="flex flex-col p-4 gap-2 justify-center items-center sticky top-0 z-10 bg-base-100/80">
        <div className="flex flex-row gap-2">
          {/* Location Select Button */}
          <LocationSelectButton />

          {/* Search Bar */}
          <div className="search flex flex-row items-center border border-accent rounded-full md:w-lg pl-4">
            <IoSearchSharp />
            <input
              type="text"
              placeholder="Search for restaurants, foods, or drinks"
              className="search input border-0 rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {/* Shopping Cart Button */}
          <ShoppingCartButton />
        </div>
        {/* Filter By Categories */}
        <div
          className={`${styles.paddingX} flex flex-row lg:justify-center w-full rounded-box gap-4 py-4 overflow-x-auto`}
        >
          {foodCategories.map((category) => (
            <div key={category.id} className="flex flex-col items-center">
              <button
                className={`btn btn-ghost bg-base-100 btn btn-circle btn-xl border ${
                  selectedCategory === category.name
                    ? "border-accent bg-base-300"
                    : "border-accent/30"
                }`}
                onClick={() => handleCategoryClick(category.name)}
              >
                {category.icon}
              </button>
              <span className="text-sm badge badge-soft mt-2">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="card w-full rounded-none">
          <div className="card-body">
            <div className="card-header flex flex-row justify-between items-center">
              <div className="flex flex-row items-center justify-center gap-2">
                <div className="card-title truncate">Featured Restaurants</div>
                <span className="text-xs badge badge-soft badge-primary">
                  {filteredRestaurants.length}{" "}
                  <span className="hidden lg:inline-flex text-sm">Results</span>
                </span>
                {/* Clear Filters Button */}
                {(searchQuery || selectedCategory) && (
                  <button
                    className="btn btn-outline rounded-full bg-base-100 btn-xs"
                    onClick={clearFilters}
                    disabled={!searchQuery && !selectedCategory}
                  >
                    <FaFilterCircleXmark />
                    <span className="hidden lg:inline-flex text-sm">
                      Clear Filters
                    </span>
                  </button>
                )}
              </div>
              <div className="card-actions">
                <SeeMoreButton link="/customer" />
              </div>
            </div>
            {!isRestaurantsLoading ? (
              <div className="card-content flex flex-row gap-2 mt-2 overflow-x-auto">
                {filteredRestaurants.length > 0 ? (
                  filteredRestaurants.map((restaurant) => (
                    <RestaurantCard
                      restaurant={restaurant}
                      key={restaurant._id}
                    />
                  ))
                ) : (
                  <div className="text-center w-full py-4">
                    No restaurants found matching your criteria.
                  </div>
                )}
              </div>
            ) : (
              <div className="card-content flex flex-row gap-2 mt-2 overflow-x-auto">
                <div className="flex flex-col items-center justify-center w-full">
                  <span className="loading loading-spinner loading-xl text-primary"></span>
                  <p>Loading Restaurants...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
