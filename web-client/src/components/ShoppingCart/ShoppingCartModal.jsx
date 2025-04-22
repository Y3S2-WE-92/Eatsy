import React from "react";
import { IoClose } from "react-icons/io5";
import Counter from "./Counter";
import { formatCurrency } from "../../utils/format-utils/CurrencyUtil";

function ShoppingCartModal({cart}) {
  const handleClose = () => {
    const modal = document.getElementById("shopping-cart-modal");
    modal.close();
  };
  return (
    <dialog
      id="shopping-cart-modal"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box min-w-10/12 max-w-5xl">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <h2 className="card-title">{cart.restaurant.name}</h2>
            <button className="btn" onClick={handleClose}>
              <IoClose />
            </button>
          </div>
          <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-4">
            <table className="table text-end">
              {/* head */}
              <thead>
                <tr>
                  <th className="text-center">Item</th>
                  <th className="text-center">Quantity</th>
                  <th>Unit Price</th>
                  <th>SubTotal</th>
                </tr>
              </thead>
              <tbody>
              {cart.items.map((item) => (
                  <tr key={item.id}>
                    <td className="text-center">{item.name}</td>
                    <td className="text-center"><Counter existingQty={item.quantity}/></td>
                    <td>{formatCurrency(item.price)}</td>
                    <td>{formatCurrency(item.price)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="text-end">
              <tr>
                <td colSpan={3}>Subtotal</td>
                <td>{formatCurrency(300)}</td>
              </tr>
              <tr>
                <td colSpan={3}>Delivery Fee</td>
                <td>+ {formatCurrency(cart.restaurant.deliveryFee)}</td>
              </tr>
                <tr>
                  <td colSpan={3}>Total</td>
                  <td className="font-bold text-lg">{formatCurrency(400)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="modal-action">
            <button className="btn btn-primary">Checkout</button>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default ShoppingCartModal;
