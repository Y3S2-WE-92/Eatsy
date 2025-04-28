import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import ShoppingCartModal from "./ShoppingCartModal";
import { useDispatch } from "react-redux";
import { removeCart } from "../../redux/customer/cartSlice";

function ViewAllCartsModal({ carts, isOpen, onClose }) {
  const dispatch = useDispatch();
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
              <div className="flex flex-row gap-2 items-center">
                <h2 className="card-title">My Carts</h2>
                <div className="badge badge-soft badge-primary">
                  {carts.length}
                </div>
              </div>
              <button className="btn" onClick={onClose}>
                <IoClose className="text-lg" />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {carts.length > 0 ? (
                carts.map((cart, index) => (
                  <div
                    key={index}
                    className="card card-compact bg-base-200 border border-base-content/5"
                  >
                    <div className="card-body">
                      <div className="card-title">
                        Restaurant: {cart.restaurantName}
                      </div>
                      <div className="card-actions justify-end">
                        <button
                          className="btn btn-primary btn-block"
                          onClick={() => handleViewCart(cart)}
                        >
                          View Cart
                        </button>
                        <button
                          onClick={() => dispatch(removeCart(cart))}
                          className="btn btn-outline btn-error btn-block"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="card card-compact bg-base-200 border border-base-content/5">
                  <div className="card-body">
                    <div className="card-title text-center text-sm text-error">
                      No Existing Carts to Show
                    </div>
                  </div>
                </div>
              )}
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
