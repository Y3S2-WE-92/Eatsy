const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, required: true },
  deliveryPersonId: { type: mongoose.Schema.Types.ObjectId, required: true },
  restaurantId: { type: String, required: true },
  customerId: { type: String, required: true },
  deliveryLocation: {
    address: { type: String, required: false },
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], required: true }
    }
  },
  status: {
    type: String,
    enum: ['assigned', 'picked_up', 'delivered'],
    default: 'assigned'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

deliverySchema.index({ 'deliveryAddress.location': '2dsphere' });

module.exports = mongoose.model('Delivery', deliverySchema);