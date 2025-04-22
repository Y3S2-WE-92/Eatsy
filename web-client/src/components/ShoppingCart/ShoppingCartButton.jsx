import React from "react";
import { useLocation } from "react-router-dom";
import ViewAllCartsModal from "./ViewAllCartsModal";

const carts = [
  {
    id: 1,
    restaurant: {
      id: 1,
      name: "Restaurant 1",
      deliveryFee: 100,
      rating: 4.5,
      deliveryTime: "30-45 min",
    },
    items: [
      {
        id: 1,
        name: "Item 1",
        quantity: 2,
        price: 100,
      },
      {
        id: 2,
        name: "Item 2",
        quantity: 1,
        price: 200,
      },
    ],
  },
  {
    id: 2,
    restaurant: {
      id: 2,
      name: "Restaurant 2",
      deliveryFee: 200,
      rating: 4.5,
      deliveryTime: "30-45 min",
    },
    items: [
      {
        id: 1,
        name: "Item 1",
        quantity: 1,
        price: 100,
      },
      {
        id: 2,
        name: "Item 2",
        quantity: 2,
        price: 200,
      },
      {
        id: 3,
        name: "Item 3",
        quantity: 1,
        price: 300,
      },
      {
        id: 4,
        name: "Item 4",
        quantity: 1,
        price: 400,
      },
      {
        id: 5,
        name: "Item 5",
        quantity: 1,
        price: 500,
      },
    ],
  },
];
function CartMenu() {
  return (
    <div
      tabIndex={0}
      className="card card-compact dropdown-content bg-base-300 z-1 mb-2 w-72 shadow"
    >
      <div className="card-body">
        <span className="text-lg font-bold">{carts.length} Carts</span>
        <ul className="menu gap-2">
          {carts.map((cart) => (
            <li key={cart.id}>{cart.restaurant.name}</li>
          ))}
        </ul>
        <div className="card-actions">
          <button
            className="btn btn-primary btn-block"
            onClick={() =>
              document.getElementById("shopping-cart-view-modal").showModal()
            }
          >
            View carts
          </button>
        </div>
      </div>
    </div>
  );
}

function ShoppingCartButton() {
  const location = useLocation();
  const isCustomerRoot = location.pathname === "/customer/";

  return (
    <div>
      {isCustomerRoot ? (
        // Normal Button
        <div className="dropdown dropdown-end">
          <button
            tabIndex={0}
            role="button"
            className="btn btn-outline rounded-full bg-base-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="hidden lg:inline-flex text-sm">My Carts</span>

            <div className="badge badge-xs badge-error indicator-menu">{carts.length}</div>
          </button>
          <CartMenu />
        </div>
      ) : (
        // Floating Action Button
        <div className="dropdown dropdown-top fixed bottom-16 right-8 flex items-end justify-end z-50">
          <button
            tabIndex={0}
            role="button"
            className="btn border border-2 border-success btn-neutral btn-circle btn-xl"
          >
            <div className="indicator p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>

              <div className="badge badge-sm badge-error indicator-item">{carts.length}</div>
            </div>
          </button>
          <CartMenu />
        </div>
      )}
      <ViewAllCartsModal carts={carts} />
    </div>
  );
}

export default ShoppingCartButton;
