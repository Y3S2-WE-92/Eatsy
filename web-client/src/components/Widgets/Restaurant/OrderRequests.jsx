import React, { useState, useEffect } from "react";
import {
  connectRestaurantSocket,
  listenNewOrder,
  disconnectSocket,
} from "../../../sockets/restaurant.socket";
import { IoClose, IoCheckmarkSharp } from "react-icons/io5";
import OrderViewModal from "../../Modals/Restaurants/OrderViewModal";
import { useToast } from "../../../utils/alert-utils/ToastUtil";
import { formatCustomDate } from "../../../utils/format-utils/DateUtil";
import {
  AcceptOrder,
  RejectOrder,
} from "../../../utils/update-utils/restaurant/update-order";
import { useRestaurant } from "../../../utils/redux-utils/redux-restaurant";

function OrderRequests() {
  const toast = useToast();
  const restaurant = useRestaurant();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOrderViewModalOpen, setIsOrderViewModalOpen] = useState(false);

  useEffect(() => {
    connectRestaurantSocket(restaurant.id);

    listenNewOrder((newOrder) => {
      setOrders((prev) => [...prev, newOrder]);
      toast.info("You have a new order!");
    });

    return () => {
      disconnectSocket();
    };
  }, [restaurant.id]);

  const handleItemClick = (order) => {
    setSelectedOrder(order);
    setIsOrderViewModalOpen(true);
  };

  const handleAccept = async (id, refNo) => {
    try {
      await AcceptOrder(id);
      setOrders((prev) => prev.filter((order) => order._id !== id));
      toast.success(`Order ${refNo} accepted!`);
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };

  const handleReject = async (id, refNo) => {
    try {
      await RejectOrder(id);
      setOrders((prev) => prev.filter((order) => order._id !== id));
      toast.error(`Order ${refNo} rejected!`);
    } catch (error) {
      console.error("Error rejecting order:", error);
    }
  };

  return (
    <>
      <ul className="list bg-base-300 rounded-box shadow-sm border border-base-300 md:w-96 flex flex-col min-h-48 overflow-y-auto flex-1 gap-2">
        <li className="p-4 tracking-wide sticky top-0 glass-transparent bg-base-100/80 z-10">
          <div className="flex justify-between items-center">
            <p className="text-sm font-semibold">Order Requests</p>
            <span className="badge badge-sm badge-soft badge-error">
              {orders.length}
            </span>
          </div>
        </li>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <li
              onClick={() => handleItemClick(order)}
              className="list-row hover:bg-base-200 mx-2"
            >
              <div className="text-4xl font-thin opacity-30 tabular-nums">
                {index + 1}
              </div>
              <div className="list-col-grow">
                <div>Ref No: {order.refNo}</div>
                <div className="text-xs font-semibold opacity-60">
                  {formatCustomDate(order.createdAt)}
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <button
                  onClick={() => handleAccept(order._id, order.refNo)}
                  className="btn btn-circle btn-success btn-sm text-xl font-bold"
                >
                  <IoCheckmarkSharp />
                </button>
                <button
                  onClick={() => handleReject(order._id, order.refNo)}
                  className="btn btn-circle btn-error btn-sm text-xl font-bold"
                >
                  <IoClose />
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="text-center h-full flex flex-col justify-center items-center gap-4 text-base-content/60">
            <div className="flex flex-col">
              <p className="text-sm font-semibold ">No pending orders</p>
              <small>New Requests will appear here</small>
            </div>
            <span className="loading loading-dots loading-xs" />
          </li>
        )}
      </ul>
      {isOrderViewModalOpen && (
        <OrderViewModal
          isOpen={isOrderViewModalOpen}
          onClose={() => setIsOrderViewModalOpen(false)}
          order={selectedOrder}
        />
      )}
    </>
  );
}

export default OrderRequests;
