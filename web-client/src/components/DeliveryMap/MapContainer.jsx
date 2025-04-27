import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = "pk.eyJ1IjoiamFrYWRwIiwiYSI6ImNtOXZqa3V0ODBnNDYycXNjMGZsMDZ6bXEifQ._21wZoGlO774ykfUi1X7Rw";

// Disable Mapbox telemetry
mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js', null, true);
mapboxgl.config.API_URL = 'https://api.mapbox.com'; // Ensure API URL is correct
mapboxgl.config.REQUIRE_ACCESS_TOKEN = true;

const MapContainer = ({ mapRef, restaurantLocation, customerLocation, deliveryPersonMarkerRef, showMarkers, nearbyOrders, onOrderClick }) => {
  const mapContainerRef = useRef(null);

  const createMarker = (iconUrl, coordinates, mapInstance, onClick = null) => {
    const element = document.createElement('div');
    element.style.backgroundImage = `url(${iconUrl})`;
    element.style.backgroundSize = 'contain';
    element.style.backgroundRepeat = 'no-repeat';
    element.style.width = '40px';
    element.style.height = '40px';

    const marker = new mapboxgl.Marker({ element }).setLngLat(coordinates).addTo(mapInstance);
    if (onClick) {
      marker.getElement().addEventListener('click', onClick);
    }
    return marker;
  };

  useEffect(() => {
    try {
      mapboxgl.config.REQUIRE_ACCESS_TOKEN = true;
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: restaurantLocation || [80.0379, 7.0698], // Default center
        zoom: 15,
      });

      const bikeIcon = 'https://cdn-icons-png.flaticon.com/128/8441/8441282.png';
      deliveryPersonMarkerRef.current = createMarker(bikeIcon, restaurantLocation || [79.9738, 6.9156], mapRef.current);

      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          deliveryPersonMarkerRef.current.setLngLat([longitude, latitude]);
          mapRef.current.flyTo({ center: [longitude, latitude], zoom: 15 });
        },
        (error) => {
          console.error('Error watching position:', error);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
        mapRef.current?.remove();
      };
    } catch (error) {
      console.error('Error initializing Mapbox map:', error);
    }
  }, [mapRef, restaurantLocation]);

  useEffect(() => {
    if (showMarkers && mapRef.current) {
      if (restaurantLocation) {
        const restaurantIcon = 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png';
        createMarker(restaurantIcon, restaurantLocation, mapRef.current);
      }

      if (customerLocation) {
        const customerIcon = 'https://cdn-icons-png.flaticon.com/128/5974/5974636.png';
        createMarker(customerIcon, customerLocation, mapRef.current);
      }
    }
  }, [showMarkers, mapRef, restaurantLocation, customerLocation]);

  useEffect(() => {
    if (nearbyOrders && mapRef.current) {
      nearbyOrders.forEach((order) => {
        const orderIcon = 'https://cdn-icons-png.flaticon.com/128/3448/3448332.png';
        createMarker(orderIcon, order.restaurantLocation, mapRef.current, () => onOrderClick(order));
      });
    }
  }, [nearbyOrders, mapRef, onOrderClick]);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />;
};

export default MapContainer;
