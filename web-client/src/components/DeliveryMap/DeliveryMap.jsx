import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { io } from 'socket.io-client'; // Import socket.io-client

mapboxgl.accessToken = proccess.env.MAP_BOX_TOKEN; 

const DeliveryMap = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const deliveryPersonMarkerRef = useRef(null);

  const restaurant = [80.0379, 7.0698]; 
  const destination = [80.2049, 6.9421]; 

  useEffect(() => {
    const socket = io('http://localhost:4003'); // Connect to the backend socket server

    try {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: restaurant,
        zoom: 9,
      });

      new mapboxgl.Marker({ color: 'red' }).setLngLat(restaurant).addTo(mapRef.current);
      new mapboxgl.Marker({ color: 'blue' }).setLngLat(destination).addTo(mapRef.current);

      // Add a custom icon for the delivery person
      const bikeIcon = 'https://cdn-icons-png.flaticon.com/512/194/194655.png'; // URL to bike icon
      const bikeElement = document.createElement('div');
      bikeElement.style.backgroundImage = `url(${bikeIcon})`;
      bikeElement.style.backgroundSize = 'contain';
      bikeElement.style.backgroundRepeat = 'no-repeat';
      bikeElement.style.width = '40px';
      bikeElement.style.height = '40px';

      deliveryPersonMarkerRef.current = new mapboxgl.Marker({ element: bikeElement })
        .setLngLat(restaurant) // Initial position
        .addTo(mapRef.current);

      const fetchAndDrawRoute = async (deliveryPersonLocation) => {
        const coordinates = `${deliveryPersonLocation[0]},${deliveryPersonLocation[1]};${restaurant[0]},${restaurant[1]};${destination[0]},${destination[1]}`;
        const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.routes && data.routes.length > 0) {
          const route = data.routes[0].geometry;

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
        }
      };

      const trackLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.watchPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              const newLocation = [longitude, latitude];

              if (deliveryPersonMarkerRef.current) {
                deliveryPersonMarkerRef.current.setLngLat(newLocation);
              }

              socket.emit('updateDeliveryPersonLocation', {
                deliveryPersonId: '68067da499930ec1a71626ee', // Replace with actual deliveryPersonId
                location: { longitude, latitude },
              });

              fetchAndDrawRoute(newLocation);

              mapRef.current.flyTo({ center: newLocation, zoom: 12 });
            },
            (error) => {
              console.error('Error getting location:', error);
            },
            { enableHighAccuracy: true, maximumAge: 0 }
          );
        } else {
          console.error('Geolocation is not supported by this browser.');
        }
      };

      trackLocation();
    } catch (error) {
      console.error('Error initializing Mapbox map:', error);
    }

    return () => {
      mapRef.current?.remove();
      socket.disconnect(); // Disconnect the socket on cleanup
    };
  }, []);

  return (
    <div
      ref={mapContainerRef}
      style={{ width: '100%', height: '800px' }}
    />
  );
};

export default DeliveryMap;