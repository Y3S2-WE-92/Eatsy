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

    socket.on('joinDeliveryRoom', (deliveryPersonId) => {
      console.log('Socket joining delivery room:', deliveryPersonId);
      socket.join(deliveryPersonId);
    });

    socket.on('updateDeliveryPersonLocation', async ({ deliveryPersonId, location }, callback) => {
      console.log('Delivery person location update:', { deliveryPersonId, location });
      try {
        if (!location || !location.latitude || !location.longitude) {
          const error = { error: 'Invalid location format' };
          socket.emit('locationUpdateError', error);
          if (callback) callback({ success: false, ...error });
          return;
        }

        const geoLocation = {
          type: 'Point',
          coordinates: [location.longitude, location.latitude],
        };

        // Update location in the database
        const delivery = await Delivery.findOneAndUpdate(
          { deliveryPersonId, status: { $in: ['assigned', 'picked_up'] } },
          { $set: { location: geoLocation, lastUpdated: new Date() } },
          { new: true }
        );

        // Update delivery person's location in the User Service database
        try {
          await axios.patch(
            `${process.env.USER_SERVICE_URL}/api/deliveryPerson/location/${deliveryPersonId}`,
            { location: geoLocation }
          );
        } catch (userServiceError) {
          console.error('Error updating location in User Service:', userServiceError.message);
          // Continue even if user service update fails
        }

        if (delivery) {
          // Broadcast the updated location to the relevant order room
          io.to(delivery.orderId.toString()).emit('locationUpdate', {
            deliveryPersonId,
            location,
            lastUpdated: new Date(),
          });
          
          if (callback) callback({ 
            success: true, 
            message: 'Location updated successfully',
            delivery: {
              id: delivery._id,
              status: delivery.status,
              lastUpdated: delivery.lastUpdated
            }
          });
        } else {
          // Even if no active delivery is found, we still want to update the location for the delivery person
          try {
            await axios.patch(
              `${process.env.USER_SERVICE_URL}/api/deliveryPerson/location/${deliveryPersonId}`,
              { location: geoLocation }
            );
            
            if (callback) callback({ 
              success: true, 
              message: 'Only user location updated (no active delivery)'
            });
          } catch (error) {
            const errorMsg = { error: 'Failed to update location: ' + error.message };
            socket.emit('locationUpdateError', errorMsg);
            if (callback) callback({ success: false, ...errorMsg });
          }
        }
      } catch (error) {
        console.error('Error in updateDeliveryPersonLocation:', error.message);
        const errorMsg = { error: 'Server error: ' + error.message };
        socket.emit('locationUpdateError', errorMsg);
        if (callback) callback({ success: false, ...errorMsg });
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};