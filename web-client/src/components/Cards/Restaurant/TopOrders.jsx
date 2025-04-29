import React, { useState, useEffect } from "react";
import { getMyTopOrders } from "../../../utils/fetch-utils/restaurant/fetch-restaurant";
import { formatCustomDate } from "../../../utils/format-utils/DateUtil";
import { formatCurrency } from "../../../utils/format-utils/CurrencyUtil";

function TopOrders() {
  const [topOrders, setTopOrders] = useState([]);

  const fetchMyTopOrders = async () => {
    try {
      const response = await getMyTopOrders();
      setTopOrders(response);
    } catch (error) {
      console.error("Failed to fetch menu items:", error.message);
    }
  };

  useEffect(() => {
    fetchMyTopOrders();
  }, []);

  return (
    <ul className="list bg-base-300 rounded-box shadow-md">
      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
        Top Orders This Week
      </li>
      {topOrders.map((order, index) => (
        <li className="list-row" key={order._id}>
          <div className="text-4xl font-thin opacity-30 tabular-nums">{index + 1}</div>
          <div className="list-col-grow">
            <div>{order.refNo}</div>
            <div className="text-xs uppercase font-semibold opacity-60">
              {formatCustomDate(order.createdAt)}
            </div>
          </div>
          <div className="list-col text-right">
            <div className="font-semibold">{formatCurrency(order.restaurantCost)}</div>
            <div className="text-xs uppercase font-semibold opacity-60">
              {order.items.length} Items
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TopOrders;
