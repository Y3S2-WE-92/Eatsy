import React from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import { styles } from "../../styles/styles";

import ShoppingCartButton from "../../components/ShoppingCart/ShoppingCartButton";

function Home() {
  const foodCategories = [
    { id: 1, name: "Burgers", icon: "🍔" },
    { id: 2, name: "Pizza", icon: "🍕" },
    { id: 3, name: "Sushi", icon: "🍣" },
    { id: 4, name: "Salads", icon: "🥗" },
    { id: 5, name: "Desserts", icon: "🍰" },
    { id: 6, name: "Drinks", icon: "🥤" },
    { id: 7, name: "Snacks", icon: "🍿" },
    { id: 8, name: "Breakfast", icon: "🍳" },
    { id: 9, name: "Brunch", icon: "🥂" },
    { id: 10, name: "Lunch", icon: "🍽️" },
    { id: 11, name: "Dinner", icon: "🍽️" },
    { id: 12, name: "Takeout", icon: "📦" },
    { id: 13, name: "Delivery", icon: "🚚" },
    { id: 14, name: "Catering", icon: "🍽️" },
    { id: 15, name: "Vegan", icon: "🥬" },
  ]
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
            Select Delivery Location
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
            placeholder="Search for products"
            className="search input w-full max-w-xs border-0"
          />
        </div>
        {/* Shopping Cart Button */}
        <ShoppingCartButton />
      </div>
      <div className="flex flex-row gap-2">
        <ul className={`${styles.paddingX} flex flex-row justify-center bg-base-100 w-full rounded-box gap-6 p-2 overflow-x-auto`}>
          {foodCategories.map((category) => (
            <li key={category.id} className="flex flex-col items-center">
              <button className="btn btn-ghost btn-circle btn-xl border border-accent/30">
                {category.icon}
              </button>
              <span className="text-sm">{category.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
