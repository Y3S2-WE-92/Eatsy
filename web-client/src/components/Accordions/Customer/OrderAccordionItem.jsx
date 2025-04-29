import React from "react";
import { formatCustomDate } from "../../../utils/format-utils/DateUtil";
import { formatStatusBadge } from "../../../utils/format-utils/StatusUtil";
import { formatCurrency } from "../../../utils/format-utils/CurrencyUtil";
import OrderTimeline from "../../Timelines/Customer/OrderTimeline";
import MapViewButton from "../../MapView/MapViewButton";

function OrderAccordionItem({ order, isFirstItem }) {
  const calculateSubtotal = (items) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateTotal = (items, deliveryCost = 0) => {
    return calculateSubtotal(items) + deliveryCost;
  };

  return (
    <div className="collapse collapse-arrow join-item border-base-100 border bg-base-200">
      <input type="radio" name="my-accordion-4" defaultChecked={isFirstItem} />
      <div className="collapse-title font-semibold flex flex-col md:flex-row justify-between">
        <div className="flex flex-row items-center gap-2">
          <h2>Reference No: {order.refNo}</h2>
          <div
            className={`badge badge-sm badge-soft badge-${
              formatStatusBadge(order.status).badgeClass
            }`}
          >
            {formatStatusBadge(order.status).text}
          </div>
        </div>
        <div className="flex flex-row items-center gap-4">
          <small>{formatCustomDate(order.createdAt)}</small>
          <MapViewButton />
        </div>
      </div>
      <div className="collapse-content text-sm">
        <div className="flex flex-col gap-4 px-4">
          <div>
            <p className="text-sm">From: {order.restaurantName}</p>
            <p className="text-sm">
              Delivery Location: {order.deliveryLocation.address}
            </p>
          </div>
          <OrderTimeline currentStatus={order.status} />
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
                {order.items.map((item) => (
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
                  <td colSpan={4}>Subtotal</td>
                  <td>{formatCurrency(calculateSubtotal(order.items))}</td>
                </tr>
                <tr>
                  <td colSpan={4}>Delivery Fee</td>
                  <td>+ {formatCurrency(order.deliveryCost || 0)}</td>
                </tr>
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
    </div>
  );
}

export default OrderAccordionItem;
