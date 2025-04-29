import React, { useEffect, useState } from 'react';
import { getMyRecentOrders } from '../../../utils/fetch-utils/restaurant/fetch-restaurant';
import { formatStatusBadge } from '../../../utils/format-utils/StatusUtil';

function RecentOrders() {
  const [recentOrders, setRecentOrders] = useState([]);

  const fetchMyRecentOrders = async () => {
    try {
      const response = await getMyRecentOrders();
      setRecentOrders(response);
    } catch (error) {
      console.error("Failed to fetch menu items:", error.message);
    }
  };

  useEffect(() => {
    fetchMyRecentOrders();
  }, []);

  return (
    <ul className="list bg-base-300 rounded-box shadow-md">
      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Recent Orders</li>
      {
        recentOrders.map((order) => {
          const { text, badgeClass } = formatStatusBadge(order.status);
          return (
            <li className="list-row" key={order._id || order.refNo}>
              <div className='list-col-grow'>
                {
                  order.items.map((item, index) => (
                    <div key={index}>{item.name} x {item.quantity}</div>
                  ))
                }
                <div className="text-xs uppercase font-semibold opacity-60">{order.refNo}</div>
              </div>
              <div className={`badge badge-soft badge-${badgeClass}`}>{text}</div>
            </li>
          );
        })
      }
    </ul>
  );
}

export default RecentOrders;
