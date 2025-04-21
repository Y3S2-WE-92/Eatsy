const mongoose = require('mongoose');

const DeliveryPersonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  telephone: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  vehicleNumber: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] } // [longitude, latitude]
  },
  available: { type: Boolean, default: true },
  currentOrder: { type: mongoose.Schema.Types.ObjectId, default: null } // orderId from order-service
});

DeliveryPersonSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('DeliveryPerson', DeliveryPersonSchema);