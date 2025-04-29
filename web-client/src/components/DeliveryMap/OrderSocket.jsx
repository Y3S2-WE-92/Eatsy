import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import {
  connectDeliverySocket,
  listenNewOrder,
  listenOrderReady,
  disconnectSocket,
} from "../../sockets/delivery.order.socket";
import { IoClose, IoCheckmarkSharp } from "react-icons/io5";
import OrderViewModal from "../Modals/Restaurants/OrderViewModal";
import { useToast } from "../../utils/alert-utils/ToastUtil";
import { formatCustomDate } from "../../utils/format-utils/DateUtil";
import {
  AcceptOrder,
  RejectOrder,
} from "../../utils/update-utils/restaurant/update-order";
import OrderHistoryByPersonId from "./OrderHistoryByPersonId";
import { useDeliveryPerson } from '../../utils/redux-utils/redux-delivery';

function OrderRequests() {
  const toast = useToast();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOrderViewModalOpen, setIsOrderViewModalOpen] = useState(false);
  
  const deliveryPerson = useDeliveryPerson();
  const deliveryPersonID = deliveryPerson.id;

  const mapRef = useRef(null);
  const deliveryPersonMarkerRef = useRef(null);
  const restaurantMarkerRef = useRef(null);

  const drawMarkersAndRoute = async (restaurantCoordinates, deliveryPersonCoordinates) => {
    if (!restaurantCoordinates || !deliveryPersonCoordinates) {
      console.error("Coordinates for restaurant or delivery person are missing.");
      return;
    }

    // Draw restaurant and delivery person markers
    if (mapRef.current) {
      const restaurantIcon = "https://cdn-icons-png.flaticon.com/128/3448/3448332.png";
      const deliveryPersonIcon = "https://cdn-icons-png.flaticon.com/128/8441/8441282.png";

      // Add restaurant marker
      if (!restaurantMarkerRef.current) {
        restaurantMarkerRef.current = new mapboxgl.Marker({ color: "red" })
          .setLngLat(restaurantCoordinates)
          .setPopup(new mapboxgl.Popup().setText("Restaurant Location"))
          .addTo(mapRef.current);
      } else {
        restaurantMarkerRef.current.setLngLat(restaurantCoordinates);
      }

      // Add delivery person marker
      if (!deliveryPersonMarkerRef.current) {
        deliveryPersonMarkerRef.current = new mapboxgl.Marker({ color: "blue" })
          .setLngLat(deliveryPersonCoordinates)
          .setPopup(new mapboxgl.Popup().setText("Delivery Person Location"))
          .addTo(mapRef.current);
      } else {
        deliveryPersonMarkerRef.current.setLngLat(deliveryPersonCoordinates);
      }
    }

    // Fetch and draw the route
    const coordinates = `${restaurantCoordinates[0]},${restaurantCoordinates[1]};${deliveryPersonCoordinates[0]},${deliveryPersonCoordinates[1]}`;
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (!data.routes || data.routes.length === 0) {
        console.error("No routes found:", data);
        return;
      }

      const route = data.routes[0].geometry;

      if (mapRef.current) {
        if (mapRef.current.getSource("route")) {
          // Update existing route source
          mapRef.current.getSource("route").setData({
            type: "Feature",
            geometry: route,
          });
        } else {
          // Add new route source and layer
          mapRef.current.addSource("route", {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: route,
            },
          });

          mapRef.current.addLayer({
            id: "route",
            type: "line",
            source: "route",
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#3887be",
              "line-width": 5,
            },
          });
        }

        // Fly to the route
        mapRef.current.flyTo({ center: restaurantCoordinates, zoom: 12 });
      }
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  useEffect(() => {
    connectDeliverySocket(deliveryPersonID);

    listenNewOrder((newOrder) => {
      setOrders((prev) => [...prev, newOrder]);
      toast.info("You have a new order!");
    });

    listenOrderReady((orderData) => {
      toast.success(`Order ${orderData.refNo} is ready for delivery!`);
    });

    return () => {
      disconnectSocket();
    };
  }, [deliveryPersonID]);

  const handleItemClick = (order) => {
    setSelectedOrder(order);
    setIsOrderViewModalOpen(true);

    // Example coordinates (replace with actual data)
    const restaurantCoordinates = order.restaurantLocation?.coordinates || [79.8612, 6.9271]; // Default to Colombo
    const deliveryPersonCoordinates = [79.865, 6.927]; // Replace with actual delivery person location

    drawMarkersAndRoute(restaurantCoordinates, deliveryPersonCoordinates);
  };

  const handleAccept = async (id) => {
    try {
      await AcceptOrder(id);
      setOrders((prev) => prev.filter((order) => order._id !== id));
      toast.success("Order accepted!");
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await RejectOrder(id);
      setOrders((prev) => prev.filter((order) => order._id !== id));
      toast.error("Order rejected!");
    } catch (error) {
      console.error("Error rejecting order:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Order Requests List */}
      <ul className="list bg-base-100 rounded-box shadow-sm border border-base-300 w-full md:w-1/2 flex flex-col overflow-y-auto h-[78vh] gap-2">
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
                  onClick={() => handleAccept(order._id)}
                  className="btn btn-circle btn-success btn-sm text-xl font-bold"
                >
                  <IoCheckmarkSharp />
                </button>
                <button
                  onClick={() => handleReject(order._id)}
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

      {/* Order History */}
      <div className="w-full md:w-1/2 flex flex-col overflow-y-auto h-[78vh]">
        <OrderHistoryByPersonId deliveryPersonID={deliveryPersonID} />
      </div>

      {/* Order View Modal */}
      {isOrderViewModalOpen && (
        <OrderViewModal
          isOpen={isOrderViewModalOpen}
          onClose={() => setIsOrderViewModalOpen(false)}
          order={selectedOrder}
        />
      )}
    </div>
  );
}

export default OrderRequests;
