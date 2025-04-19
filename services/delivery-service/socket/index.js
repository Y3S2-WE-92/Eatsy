const Driver = require('../models/Driver');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('joinOrder', (orderId) => {
      console.log('Socket joining order room:', orderId);
      socket.join(orderId);
    });

    socket.on('updateDriverLocation', async ({ driverId, location }) => {
      console.log('Driver location update received for driverId:', driverId, 'with location:', location);
      try {
        const driver = await Driver.findById(driverId);
        if (!driver) {
          console.log('Driver not found for driverId:', driverId);
          return;
        }
        driver.location.coordinates = [location.longitude, location.latitude];
        await driver.save();
        console.log('Driver location updated in database:', driver.location);

        if (driver.currentOrder) {
          console.log('Emitting driver location update to order room:', driver.currentOrder);
          io.to(driver.currentOrder.toString()).emit('driverLocationUpdate', {
            driverId,
            location: driver.location
          });
        }
      } catch (error) {
        console.error('Error updating driver location:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};