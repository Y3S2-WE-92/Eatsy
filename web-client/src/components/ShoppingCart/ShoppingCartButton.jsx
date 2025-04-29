import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ViewAllCartsModal from "./ViewAllCartsModal";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from "react-redux";

function CartMenu({ carts, onOpenModal }) {
  return (
    <div
      tabIndex={0}
      className="card card-compact dropdown-content bg-base-300 z-1 mb-2 mt-2 w-72 shadow"
    >
      <div className="card-body">
        <ul className="list bg-base-100 rounded-box shadow-md">
          {carts.map((cart, index) => (
            <li className="list-row">
              <div className="text-4xl font-thin opacity-30 tabular-nums">
                {index + 1}
              </div>
              <div className="list-col-grow">
                <div>{cart.restaurantName}</div>
                <div className="text-xs font-semibold opacity-60">
                  {cart.items.length} Items
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="card-actions">
          <button className="btn btn-primary btn-block" onClick={onOpenModal}>
            View carts
          </button>
        </div>
      </div>
    </div>
  );
}

function ShoppingCartButton() {
  const location = useLocation();
  const isCustomerRoot =
    location.pathname === "/customer/" || location.pathname === "/customer";
  const [isViewAllCartsModalOpen, setIsViewAllCartsModalOpen] = useState(false);

  const carts = useSelector((state) => state.cart.carts);

  const handleOpenViewAllCartsModal = () => setIsViewAllCartsModalOpen(true);
  const handleCloseViewAllCartsModal = () => setIsViewAllCartsModalOpen(false);

  return (
    <div>
      {isCustomerRoot ? (
        <div className="dropdown dropdown-end">
          <button
            tabIndex={0}
            role="button"
            className="btn btn-outline rounded-full bg-base-100"
          >
            <FaCartShopping />
            <span className="hidden lg:inline-flex text-sm">My Carts</span>
            {carts.length > 0 && (
              <div className="badge badge-xs badge-error indicator-menu">
                {carts.length}
              </div>
            )}
          </button>
          <CartMenu carts={carts} onOpenModal={handleOpenViewAllCartsModal} />
        </div>
      ) : (
        <div className="dropdown dropdown-top fixed bottom-16 right-8 flex items-end justify-end z-50">
          <button
            tabIndex={0}
            role="button"
            className="btn border border-2 border-success btn-neutral btn-circle btn-xl"
          >
            <div className="indicator p-2">
              <FaCartShopping />
              {carts.length > 0 && (
                <div className="badge badge-sm badge-error indicator-item">
                  {carts.length}
                </div>
              )}
            </div>
          </button>
          <CartMenu carts={carts} onOpenModal={handleOpenViewAllCartsModal} />
        </div>
      )}

      <ViewAllCartsModal
        carts={carts}
        isOpen={isViewAllCartsModalOpen}
        onClose={handleCloseViewAllCartsModal}
      />
    </div>
  );
}

export default ShoppingCartButton;
