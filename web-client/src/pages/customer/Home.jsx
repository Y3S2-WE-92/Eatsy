import React from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import { styles } from "../../styles/styles";

import ShoppingCartButton from "../../components/ShoppingCart/ShoppingCartButton";
import { RestaurantCard, SeeMoreButton } from "../../components";

import { featuredRestaurants, foodCategories } from "../../constants";

function Home() {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative flex flex-row p-2 gap-2 justify-center items-center sticky top-16 z-10">
        {/* Select Delivery Location */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            className="btn btn-ghost border border-accent rounded-full"
          >
            <FaLocationArrow />
            <span className="hidden lg:inline-flex text-sm">
              Select Delivery Location
            </span>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full"
          >
            <li>
              <a>Location 1</a>
            </li>
            <li>
              <a>Location 2</a>
            </li>
          </ul>
        </div>
        <div className="search flex flex-row items-center border border-accent rounded-full px-4 w-lg">
          <IoSearchSharp />
          <input
            type="text"
            placeholder="Search for restaurants, foods, or drinks"
            className="search input w-full max-w-xs border-0"
          />
        </div>
        {/* Shopping Cart Button */}
        <ShoppingCartButton />
      </div>
      <div className="flex flex-col gap-2">
        {/*Filter By Categories */}
        <div
          className={`${styles.paddingX} flex flex-row lg:justify-center bg-base-100 w-full rounded-box gap-6 p-2 overflow-x-auto`}
        >
          {foodCategories.map((category) => (
            <div key={category.id} className="flex flex-col items-center">
              <button className="btn btn-ghost btn-circle btn-xl border border-accent/30">
                {category.icon}
              </button>
              <span className="text-sm">{category.name}</span>
            </div>
          ))}
        </div>

        <div className="card w-full rounded-none border-t border-t-accent/50">
          <div className="card-body">
            <div className="card-header flex flex-row justify-between items-center">
              <h2 className="card-title">Featured Restaurants</h2>
              <div className="card-actions">
                <SeeMoreButton link="/products" />
              </div>
            </div>
            <div className="card-content flex flex-row gap-2 overflow-x-auto">
              {featuredRestaurants.map((restaurant) => (
                <RestaurantCard restaurant={restaurant} key={restaurant.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
