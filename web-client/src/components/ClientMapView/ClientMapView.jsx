import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import MapContainer from '../DeliveryMap/MapContainer';
import { orderAPI } from '../../services/order-service';
import { userAPI } from '../../services/user-service'; 

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

if (!MAPBOX_TOKEN) {
  console.error('Mapbox token is missing. Please check your .env file.');
}

mapboxgl.accessToken = MAPBOX_TOKEN;

const ClientMapView = ({ orderData }) => {
  const mapRef = useRef(null);
  const deliveryPersonMarkerRef = useRef(null);

  const [orderDetails, setOrderDetails] = useState(orderData);
  const [showMarkers, setShowMarkers] = useState(false);

  const fetchOrderDetails = async () => {
    if (!orderData) {
      console.error('Order data is not provided.');
      return;
    }

    if (!orderData.restaurantLocation || !orderData.customerLocation) {
      try {
        const response = await axios.get(orderAPI.getOrderByID(orderData._id));
        const order = response.data;

        const restaurantResponse = await axios.get(userAPI.getRestaurantByID(order.restaurantID));
        const restaurant = restaurantResponse.data;

        const updatedOrderDetails = {
          orderId: order._id,
          customerName: order.customerID,
          restaurantName: restaurant.name,
          restaurantLocation: restaurant.location.coordinates,
          customerLocation: order.deliveryLocation.location.coordinates,
          items: order.items,
          status: order.status,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
        };

        setOrderDetails(updatedOrderDetails);
        setShowMarkers(true);
        drawMarkersAndRoute(updatedOrderDetails); // Unified function to handle markers and route
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    } else {
      setOrderDetails(orderData);
      setShowMarkers(true);
      drawMarkersAndRoute(orderData); // Unified function to handle markers and route
    }
  };

  const drawMarkersAndRoute = async (details) => {
    if (!details || !details.restaurantLocation || !details.customerLocation) {
      console.error('Order details or locations are not initialized.');
      return;
    }

    const restaurantCoordinates = details.restaurantLocation;
    const customerCoordinates = details.customerLocation;

    // Validate coordinates
    if (
      !Array.isArray(restaurantCoordinates) ||
      restaurantCoordinates.length !== 2 ||
      isNaN(restaurantCoordinates[0]) ||
      isNaN(restaurantCoordinates[1]) ||
      !Array.isArray(customerCoordinates) ||
      customerCoordinates.length !== 2 ||
      isNaN(customerCoordinates[0]) ||
      isNaN(customerCoordinates[1])
    ) {
      console.error('Invalid coordinates:', { restaurantCoordinates, customerCoordinates });
      return;
    }

    // Draw restaurant and customer markers
    if (mapRef.current) {
      const restaurantIcon = 'https://cdn-icons-png.flaticon.com/128/3448/3448332.png';
      const customerIcon = 'https://cdn-icons-png.flaticon.com/128/5974/5974636.png';

      new mapboxgl.Marker({ color: 'red' })
        .setLngLat(restaurantCoordinates)
        .setPopup(new mapboxgl.Popup().setText('Restaurant Location'))
        .addTo(mapRef.current);

      new mapboxgl.Marker({ color: 'blue' })
        .setLngLat(customerCoordinates)
        .setPopup(new mapboxgl.Popup().setText('Customer Location'))
        .addTo(mapRef.current);
    }

    // Fetch and draw the route
    const coordinates = `${restaurantCoordinates[0]},${restaurantCoordinates[1]};${customerCoordinates[0]},${customerCoordinates[1]}`;
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (!data.routes || data.routes.length === 0) {
        console.error('No routes found:', data);
        return;
      }

      const route = data.routes[0].geometry;

      if (mapRef.current) {
        if (mapRef.current.getSource('route')) {
          // Update existing route source
          mapRef.current.getSource('route').setData({
            type: 'Feature',
            geometry: route,
          });
        } else {
          // Add new route source and layer
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

        // Fly to the route
        mapRef.current.flyTo({ center: restaurantCoordinates, zoom: 12 });
      }
    } catch (error) {
      console.error('Error fetching route:', error);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [orderData]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '800px' }}>
      <MapContainer
        mapRef={mapRef}
        restaurantLocation={orderDetails?.restaurantLocation}
        customerLocation={orderDetails?.customerLocation}
        deliveryPersonMarkerRef={deliveryPersonMarkerRef}
        showMarkers={showMarkers}
        nearbyOrders={[]} // No nearby orders in client view
        onOrderClick={() => {}} // No order click handling in client view
      />
    </div>
  );
};

export default ClientMapView;
