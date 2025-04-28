import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import MapContainer from './MapContainer';
import OrderDetails from './OrderDetails';
import ActiveStatusButton from './ActiveStatusButton';
import { deliveryAPI } from '../../services/delivery-service'; // Fix the import
import { orderAPI } from '../../services/order-service'; // Fix the import
import axios from 'axios';
const DELIVERY_API_URL = import.meta.env.VITE_DELIVERY_API_URL

mapboxgl.accessToken = "pk.eyJ1IjoiamFrYWRwIiwiYSI6ImNtOXZqa3V0ODBnNDYycXNjMGZsMDZ6bXEifQ._21wZoGlO774ykfUi1X7Rw";

const DeliveryMap = ({ mode = "delivery", orderData = null }) => {
  const mapRef = useRef(null);
  const deliveryPersonMarkerRef = useRef(null);

  const DELIVERY_PERSON_ID = "680a7778b80586911ffda91e"; // Replace with actual delivery person ID

  const [orderDetails, setOrderDetails] = useState(orderData); // Selected order details
  const [nearbyOrders, setNearbyOrders] = useState([]); // List of nearby orders (for delivery mode)
  const [myOrders, setMyOrders] = useState([]); // List of assigned orders (for delivery mode)
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showMyOrders, setShowMyOrders] = useState(false); // State to toggle "My Orders" view
  const [isActive, setIsActive] = useState(false);
  const [showMarkers, setShowMarkers] = useState(false);
  const [estimatedDuration, setEstimatedDuration] = useState(null);

  useEffect(() => {
    const fetchDeliveryPersonLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            if (deliveryPersonMarkerRef.current) {
              deliveryPersonMarkerRef.current.setLngLat([longitude, latitude]);
            } else if (mapRef.current) {
              deliveryPersonMarkerRef.current = new mapboxgl.Marker()
                .setLngLat([longitude, latitude])
                .addTo(mapRef.current);
            }
            mapRef.current.flyTo({ center: [longitude, latitude], zoom: 12 });
          },
          (error) => {
            console.error('Error fetching delivery person location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    if (mode === "delivery") {
      // Fetch nearby orders
      axios.get(orderAPI.getNearbyOrders(6.915582, 79.974036))
        .then((response) => {
          const orders = response.data.map(order => ({
            orderId: order._id,
            customerName: order.customerID,
            restaurantName: order.restaurantID,
            restaurantLocation: order.deliveryLocation.location.coordinates || [6.900911, 79.917611],
            customerLocation: order.deliveryLocation.location.coordinates,
            items: order.items,
            status: order.status,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
          }));
          setNearbyOrders(orders);
          console.log('Nearby orders:', orders.length + ' orders found');
        })
        .catch((error) => {
          console.error('Error fetching nearby orders:', error);
        });

      // Fetch delivery person's location
      fetchDeliveryPersonLocation();
    }
  }, [mode]);

  const fetchAndDrawRoute = async () => {
    if (!deliveryPersonMarkerRef.current || !orderDetails) {
      console.error('Delivery person marker or order details are not initialized.');
      return;
    }

    const deliveryPersonLocation = deliveryPersonMarkerRef.current.getLngLat();
    const coordinates = `${deliveryPersonLocation.lng},${deliveryPersonLocation.lat};${orderDetails.restaurantLocation[0]},${orderDetails.restaurantLocation[1]};${orderDetails.customerLocation[0]},${orderDetails.customerLocation[1]}`;
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0].geometry;
        const duration = Math.ceil(data.routes[0].duration / 60); // Convert seconds to minutes

        if (mapRef.current.getSource('route')) {
          mapRef.current.getSource('route').setData({
            type: 'Feature',
            geometry: route,
          });
        } else {
          mapRef.current.addSource('route', {
            type: 'geojson',
            data: {
              type: 'Feature',
              geometry: route,
            },
          });

          mapRef.current.addLayer({
            id: 'route',
            type: 'line',
            source: 'route',
            layout: {
              'line-join': 'round',
              'line-cap': 'round',
            },
            paint: {
              'line-color': '#3887be',
              'line-width': 5,
            },
          });
        }

        mapRef.current.flyTo({ center: [deliveryPersonLocation.lng, deliveryPersonLocation.lat], zoom: 12 });

        setEstimatedDuration(duration);
        setShowMarkers(true);
      }
    } catch (error) {
      console.error('Error fetching route:', error);
    }
  };

  const handleCallCustomer = () => {
    if (orderDetails) {
      window.open(`tel:${orderDetails.customerPhone}`, '_self');
    }
  };

  const handleUpdateStatus = async (status) => {
    if (!orderDetails) return;

    try {
      await axios.put(
        deliveryAPI.updateOrderStatus(orderDetails.orderId),
        { status },
        // { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert(`Order status updated to ${status}`);
      setOrderDetails(null);
      setShowOrderDetails(false);
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status");
    }
  };

  const toggleActiveStatus = () => {
    setIsActive((prev) => !prev);
  };

  const handleOrderClick = (order) => {
    setOrderDetails(order);
    setShowOrderDetails(true);
  };

  const handleAssignOrder = async () => {
    if (!orderDetails) return;

    try {
      const response = await axios.post(
        `${DELIVERY_API_URL}/delivery/assign`,
        {
          id: orderDetails.orderId,
          restaurantId: orderDetails.restaurantName,
          deliveryPersonId: DELIVERY_PERSON_ID,
          customerId: orderDetails.customerName,
          deliveryAddress: {
        location: {
          type: "Point",
          coordinates: orderDetails.customerLocation,
        },
        address: orderDetails.deliveryAddress,
          },
        }
      );

      const { deliveryPersonId } = response.data;
      setOrderDetails({ ...orderDetails, status: "assigned", deliveryPersonId });
      setMyOrders((prevOrders) => [...prevOrders, { ...orderDetails, status: "assigned", deliveryPersonId }]);
      alert(`Order ${orderDetails.orderId} assigned successfully!`);
      setShowOrderDetails(false);
    } catch (error) {
      console.error("Error assigning order:", error);
      alert("Failed to assign order");
    }
  };

  const toggleMyOrders = () => {
    setShowMyOrders((prev) => !prev);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '800px' }}>
      <MapContainer
        mapRef={mapRef}
        restaurantLocation={orderDetails?.restaurantLocation}
        customerLocation={orderDetails?.customerLocation}
        deliveryPersonMarkerRef={deliveryPersonMarkerRef}
        showMarkers={showMarkers}
        nearbyOrders={mode === "delivery" ? nearbyOrders : []} // Pass nearby orders only in delivery mode
        onOrderClick={handleOrderClick} // Handle order marker click
      />
      {mode === "delivery" && (
        <>
          {/* <ActiveStatusButton isActive={isActive} toggleActiveStatus={toggleActiveStatus} /> */}
          <button
            onClick={toggleMyOrders}
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              zIndex: 1000,
              padding: '10px 20px',
              backgroundColor: '#007BFF',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {showMyOrders ? 'Hide My Orders' : 'My Orders'}
          </button>
          {showMyOrders && (
            <div
              style={{
                position: 'absolute',
                top: '60px',
                left: '10px',
                zIndex: 1000,
                backgroundColor: '#fff',
                padding: '15px',
                borderRadius: '8px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                width: '300px',
                maxHeight: '400px',
                overflowY: 'auto',
              }}
            >
              <h3 style={{ marginBottom: '10px', fontSize: '18px', fontWeight: 'bold' }}>My Orders</h3>
              {myOrders.length > 0 ? (
                myOrders.map((order) => (
                  <div
                    key={order.orderId}
                    style={{
                      marginBottom: '10px',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleOrderClick(order)}
                  >
                    <p><strong>Order ID:</strong> {order.orderId}</p>
                    <p><strong>Restaurant:</strong> {order.restaurantName}</p>
                    <p><strong>Customer:</strong> {order.customerName}</p>
                  </div>
                ))
              ) : (
                <p>No orders assigned yet.</p>
              )}
            </div>
          )}
        </>
      )}
      {showOrderDetails && orderDetails && (
        <OrderDetails
          orderDetails={orderDetails}
          fetchAndDrawRoute={fetchAndDrawRoute}
          handleCallCustomer={handleCallCustomer}
          estimatedDuration={estimatedDuration}
          handleAssignOrder={mode === "delivery" ? handleAssignOrder : null} // Assign order only in delivery mode
          handleUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  );
};

export default DeliveryMap;