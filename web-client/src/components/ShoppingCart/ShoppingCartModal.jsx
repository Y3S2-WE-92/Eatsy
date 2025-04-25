import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import Counter from "./Counter";
import { formatCurrency } from "../../utils/format-utils/CurrencyUtil";
import { useNavigate } from "react-router-dom";

function ShoppingCartModal({ cart, isOpen, onClose }) {
  const navigate = useNavigate();
  const [items, setItems] = useState(cart.items);
  const [checkoutAmount, setCheckoutAmount] = useState(0);

  useEffect(() => {
    setItems(cart.items);
    setCheckoutAmount(calculateTotal());
  }, [cart.items]);

  const handleQuantityChange = (itemID, selectedSize, newQuantity) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.itemID === itemID && item.selectedSize === selectedSize
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
    // Recalculate total after updating quantity
    setCheckoutAmount(calculateTotal());
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + 0; // Add Delivery fee
  };

  const handleCheckout = () => {
    onClose();
    navigate("/customer/checkout/" + cart.id + "/" + checkoutAmount);
  };

  return (
    <dialog
      id="shopping-cart-modal"
      className="modal modal-bottom sm:modal-middle"
      open={isOpen}
    >
      <div className="modal-box min-w-10/12 max-w-5xl">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <h2 className="card-title text-2xl">{cart.restaurantID}</h2>
            <button className="btn" onClick={onClose}>
              <IoClose />
            </button>
          </div>

          <div className="overflow-x-auto overflow-y-auto rounded-box border border-base-content/5 bg-base-100 mt-4 max-h-96">
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
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className="text-center">{item.name}</td>
                    <td className="text-center">
                      <Counter
                        existingQty={item.quantity}
                        onQuantityChange={(newQty) =>
                          handleQuantityChange(item.itemID, item.selectedSize, newQty)
                        }
                      />
                    </td>
                    <td>{formatCurrency(item.price)}</td>
                    <td>{formatCurrency(item.price * item.quantity)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="text-end">
                <tr>
                  <td colSpan={3}>Subtotal</td>
                  <td>{formatCurrency(calculateSubtotal())}</td>
                </tr>
                <tr>
                  <td colSpan={3}>Delivery Fee</td>
                  <td>+ {formatCurrency(0)}</td>
                </tr>
                <tr>
                  <td colSpan={3}>Total</td>
                  <td className="font-bold text-lg">
                    {formatCurrency(calculateTotal())}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="modal-action">
            <div className="flex flex-row gap-8 items-center mb-4 md:mb-0">
              <div className="flex flex-col items-end">
                <p>Total Amount</p>
                <p className="font-bold text-xl">
                  {formatCurrency(calculateTotal())}
                </p>
              </div>
              <button className="btn btn-primary" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default ShoppingCartModal;