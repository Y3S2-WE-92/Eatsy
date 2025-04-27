const axios = require('axios');
const Delivery = require('../models/delivery.model');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('joinOrder', (orderId) => {
      console.log('Socket joining order room:', orderId);
      socket.join(orderId);
    });

    socket.on('joinDelivery', ({ deliveryPersonId }) => {
      console.log('Socket joining delivery for deliveryPersonId:', deliveryPersonId);
      socket.join(deliveryPersonId);
    });

    socket.on('updateDeliveryPersonLocation', async ({ deliveryPersonId, location }) => {
      console.log('Delivery person location update:', { deliveryPersonId, location });
      try {
        if (!location || !location.longitude || !location.latitude) {
          socket.emit('locationUpdateError', { error: 'Invalid location format' });
          return;
        }

        const geoLocation = {
          type: 'Point',
          coordinates: [location.longitude, location.latitude],
        };

        // Update location in Delivery model
        const delivery = await Delivery.findOneAndUpdate(
          { deliveryPersonId, status: { $in: ['assigned', 'picked_up'] } },
          { $set: { location: geoLocation, lastUpdated: new Date() } },
          { new: true }
        );

        if (delivery) {
          // Optionally update user service

          // await axios.put(
          //   `${process.env.USER_SERVICE_URL}/api/delivery-person/${deliveryPersonId}`,
          //   { location: geoLocation },
          //   // { headers: { Authorization: `Bearer ${process.env.SERVICE_JWT}` } }
          // );

          io.to(delivery.orderId.toString()).emit('locationUpdate', {
            deliveryPersonId,
            location,
            lastUpdated: new Date(),
          });
        } else {
          socket.emit('locationUpdateError', { error: 'No active delivery found' });
        }
      } catch (error) {
        console.error('Error in updateDeliveryPersonLocation:', error.message);
        socket.emit('locationUpdateError', { error: 'Server error' });
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};