import React from "react";
import { IoClose } from "react-icons/io5";
import Counter from "../../ShoppingCart/Counter";
import { formatCurrency } from "../../../utils/format-utils/CurrencyUtil";

function FoodItemModal({ item, isOpen, onClose }) {
  return (
    <>
      <dialog
        id="shopping-cart-view-modal"
        className="modal modal-bottom sm:modal-middle"
        open={isOpen}
      >
        <div className="modal-box min-w-8/10 max-w-5xl">
          <div className="flex flex-col">
            <div className="flex flex-row justify-between items-center mb-3">
              <h2 className="card-title">{item.name}</h2>
              <button className="btn" onClick={onClose}>
                <IoClose className="text-lg" />
              </button>
            </div>
            <div className="card lg:card-side bg-base-100 shadow-sm">
              <figure>
                <img
                  src={item.image}
                  alt={item.name}
                />
              </figure>
              <div className="card-body w-full">
                <div>
                    <table className="table">
                        <tbody>
                            {item.sizePrice?.map((size) => (
                                <tr key={size.size}>
                                    <td>{size.size}</td>
                                    <td>{formatCurrency(size.price)}</td>
                                    <td>
                                        <Counter/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default FoodItemModal;
