import React from "react";
import { IoClose } from "react-icons/io5";
import ShoppingCartModal from "./ShoppingCartModal";

function ViewAllCartsModal({ carts }) {
  const handleClose = () => {
    const modal = document.getElementById("shopping-cart-view-modal");
    modal.close();
  };
  const handleViewCart = () => {
    const cartViewModal = document.getElementById("shopping-cart-view-modal");
    cartViewModal.close();
    const modal = document.getElementById("shopping-cart-modal");
    modal.showModal();
  };

  return (
    <dialog
      id="shopping-cart-view-modal"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center mb-3">
            <h2 className="card-title">My Cart</h2>
            <button className="btn" onClick={handleClose}>
              <IoClose className="text-lg" />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {carts.map((cart) => (
              <div
                key={cart.id}
                className="card card-compact bg-base-200 border border-base-content/5"
              >
                <div className="card-body">
                  <div className="card-title">{cart.restaurant.name}</div>
                  <button>
                    <div className="card-actions justify-end">
                      <button
                        className="btn btn-primary btn-block"
                        onClick={handleViewCart}
                      >
                        View Cart
                      </button>
                    </div>
                  </button>
                </div>
                <ShoppingCartModal cart={cart} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default ViewAllCartsModal;
