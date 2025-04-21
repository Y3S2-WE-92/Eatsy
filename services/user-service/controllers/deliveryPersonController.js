const DeliveryPerson = require('../models/deliveryperson.model');

exports.getDeliveryPerson = async (req, res) => {
  try {
    const { id } = req.params;
    const deliveryPerson = await DeliveryPerson.findById(id).select('name location updatedAt');
    if (!deliveryPerson) {
      return res.status(404).json({ error: 'Delivery person not found' });
    }
    res.json(deliveryPerson);
  } catch (error) {
    console.error('Error in getDeliveryPerson:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getNearbyDeliveryPersons = async (req, res) => {
  try {
    const { longitude, latitude, maxDistance = 1000000 } = req.query; // maxDistance in meters (10km)
    if (!longitude || !latitude) {
      return res.status(400).json({ error: 'Longitude and latitude required' });
    }
    const deliveryPersons = await DeliveryPerson.find({
      available: true,
      currentOrder: null,
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(longitude), parseFloat(latitude)] },
          $maxDistance: parseInt(maxDistance)
        }
      }
    }).limit(1).select('name location updatedAt');
    res.json(deliveryPersons);
  } catch (error) {
    console.error('Error in getNearbyDeliveryPersons:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateDeliveryPerson = async (req, res) => {
  try {
    const { id } = req.params;
    const { location, available, currentOrder } = req.body;
    const deliveryPerson = await DeliveryPerson.findById(id);
    if (!deliveryPerson) {
      return res.status(404).json({ error: 'Delivery person not found' });
    }
    if (location && location.type === 'Point' && Array.isArray(location.coordinates) && location.coordinates.length === 2) {
      deliveryPerson.location = location;
    }
    if (typeof available === 'boolean') {
      deliveryPerson.available = available;
    }
    if (currentOrder !== undefined) {
      deliveryPerson.currentOrder = currentOrder || null;
    }
    deliveryPerson.updatedAt = new Date();
    await deliveryPerson.save();
    res.json({ message: 'Delivery person updated', deliveryPerson });
  } catch (error) {
    console.error('Error in updateDeliveryPerson:', error);
    res.status(500).json({ error: error.message });
  }
};