import React from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import { styles } from "../../styles/styles";

import ShoppingCartButton from "../../components/ShoppingCart/ShoppingCartButton";
import SeeMoreButton from "../../components/Buttons/SeemoreButton";

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
  ];

  const featuredProducts = [
    { id: 1, name: "Burger", price: 650.00, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fDB8fHww" },
    { id: 2, name: "Pizza", price: 1200.00, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D" },
    { id: 3, name: "Sushi", price: 300.00, image: "https://images.unsplash.com/photo-1617196035154-1e7e6e28b0db?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHN1c2hpfGVufDB8fDB8fHww" },
    { id: 4, name: "Salad", price: 400.00, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FsYWR8ZW58MHx8MHx8fDA%3D" },
    { id: 5, name: "Dessert", price: 500.00, image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRlc3NlcnR8ZW58MHx8MHx8fDA%3D" },
  ];

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
      <div className="flex flex-col gap-2">
        {/*Filter By Categories */}
        <ul
          className={`${styles.paddingX} flex flex-row justify-center bg-base-100 w-full rounded-box gap-6 p-2 overflow-x-auto`}
        >
          {foodCategories.map((category) => (
            <li key={category.id} className="flex flex-col items-center">
              <button className="btn btn-ghost btn-circle btn-xl border border-accent/30">
                {category.icon}
              </button>
              <span className="text-sm">{category.name}</span>
            </li>
          ))}
        </ul>

        <div className="card w-full shadow-xl rounded-none border-t border-t-accent/50">
          <div className="card-body">
            <div className="card-header flex flex-row justify-between items-center">
              <h2 className="card-title">Featured Products</h2>
              <div className="card-actions">
                <SeeMoreButton link="/products" />
              </div>
            </div>
            <div className="card-content flex flex-row gap-2 overflow-x-auto">
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="card w-48 bg-base-100 shadow-xl border border-accent/30"
                >
                  <figure>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-32 object-cover"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{product.name}</h2>
                    <p>LKR {product.price.toFixed(2)}</p>
                    <div className="card-actions justify-center">
                      <button className="btn btn-primary btn-sm">Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
