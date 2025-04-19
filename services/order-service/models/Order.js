const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: { type: String, required: true },
  restaurantId: { type: String, required: true },
  items: [{
    itemId: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  deliveryAddress: {
    address: { type: String, required: true },
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], required: true } // [longitude, latitude]
    }
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'ready', 'assigned', 'picked_up', 'delivered'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

orderSchema.index({ 'deliveryAddress.location': '2dsphere' });

module.exports = mongoose.model('Order', orderSchema);