import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import ShoppingCartModal from "./ShoppingCartModal";

function ViewAllCartsModal({ carts, isOpen, onClose }) {
  const [selectedCart, setSelectedCart] = useState(null);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const handleViewCart = (cart) => {
    setSelectedCart(cart);
    setIsCartModalOpen(true);
    onClose();
  };

  const handleCartModalClose = () => {
    setIsCartModalOpen(false);
    setSelectedCart(null);
  };

  return (
    <>
      <dialog
        id="shopping-cart-view-modal"
        className="modal modal-bottom sm:modal-middle"
        open={isOpen}
      >
        <div className="modal-box">
          <div className="flex flex-col">
            <div className="flex flex-row justify-between items-center mb-3">
              <h2 className="card-title">My Carts</h2>
              <button className="btn" onClick={onClose}>
                <IoClose className="text-lg" />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {carts.map((cart, index) => (
                <div
                  key={index}
                  className="card card-compact bg-base-200 border border-base-content/5"
                >
                  <div className="card-body">
                    <div className="card-title">
                      Restaurant ID: {cart.restaurantID}
                    </div>
                    <div className="card-actions justify-end">
                      <button
                        className="btn btn-primary btn-block"
                        onClick={() => handleViewCart(cart)}
                      >
                        View Cart
                      </button>
                      <button className="btn btn-outline btn-error btn-block">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </dialog>
      {selectedCart && (
        <ShoppingCartModal
          cart={selectedCart}
          isOpen={isCartModalOpen}
          onClose={handleCartModalClose}
        />
      )}
    </>
  );
}

export default ViewAllCartsModal;