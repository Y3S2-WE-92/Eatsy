import React from "react";
import { IoClose } from "react-icons/io5";
import { formatCurrency } from "../../../utils/format-utils/CurrencyUtil";

function OrderViewModal({ order, isOpen, onClose }) {
  const calculateSubtotal = (items) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateTotal = (items) => {
    return calculateSubtotal(items);
  };

  return (
    <dialog open={isOpen} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box min-w-8/10 max-w-5xl">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center mb-3">
            <h2 className="card-title">Reference No: {order.refNo}</h2>
            <button className="btn" onClick={onClose}>
              <IoClose className="text-lg" />
            </button>
          </div>
          <div className="overflow-x-auto overflow-y-auto rounded-box border border-base-content/5 bg-base-100 mt-4 max-h-96">
            <table className="table text-end">
              <thead>
                <tr>
                  <th className="text-center">Item</th>
                  <th className="text-center">Size</th>
                  <th className="text-center">Quantity</th>
                  <th>Unit Price</th>
                  <th>SubTotal</th>
                </tr>
              </thead>
              <tbody>
                {order?.items.map((item) => (
                  <tr key={`${item.itemID}-${item.selectedSize}`}>
                    <td className="text-center">{item.name}</td>
                    <td className="text-center">{item.selectedSize}</td>
                    <td className="text-center">{item.quantity}</td>
                    <td>{formatCurrency(item.price)}</td>
                    <td>{formatCurrency(item.price * item.quantity)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="text-end">
                <tr>
                  <td colSpan={4}>Total</td>
                  <td className="font-bold text-lg">
                    {formatCurrency(
                      calculateTotal(order.items, order.deliveryCost)
                    )}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default OrderViewModal;
