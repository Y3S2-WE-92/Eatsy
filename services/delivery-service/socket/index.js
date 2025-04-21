const axios = require('axios');
const Delivery = require('../models/delivery.model');

module.exports = (io) => {
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('joinOrder', (orderId) => {
    console.log('Socket joining order room:', orderId);
    socket.join(orderId);
    });

    socket.on('updateDeliveryPersonLocation', async ({ deliveryPersonId, location }) => {
    console.log('Delivery person location update received for deliveryPersonId:', deliveryPersonId, 'with location:', location);
    try {
        // Validate location format
        if (!location || !location.longitude || !location.latitude) {
        console.log('Invalid location format');
        socket.emit('locationUpdateError', { error: 'Invalid location format' });
        return;
        }

        // Update location via User Service API
        const geoLocation = {
        type: 'Point',
        coordinates: [location.longitude, location.latitude]
        };
        try {
        await axios.put(
            `${process.env.USER_SERVICE_URL}/api/delivery-person/${deliveryPersonId}`,
            { location: geoLocation },
            { headers: { Authorization: `Bearer ${process.env.SERVICE_JWT}` } }
        );
        console.log('Delivery person location updated via user-service:', geoLocation);
        } catch (error) {
        console.error('Error updating delivery person location:', error.message);
        socket.emit('locationUpdateError', { error: 'Failed to update location' });
        return;
        }

        // Find associated order from Delivery model
        const delivery = await Delivery.findOne({
        deliveryPersonId,
        status: { $in: ['assigned', 'picked_up'] }
        });
        if (delivery) {
        console.log('Emitting delivery person location update to order room:', delivery.orderId);
        io.to(delivery.orderId.toString()).emit('deliveryPersonLocationUpdate', {
            deliveryPersonId,
            location: geoLocation,
            lastUpdated: new Date()
        });
        } else {
        console.log('No active delivery found for deliveryPersonId:', deliveryPersonId);
        }
    } catch (error) {
        console.error('Error in updateDeliveryPersonLocation:', error);
        socket.emit('locationUpdateError', { error: 'Server error' });
    }
    });

    socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    });
});
};