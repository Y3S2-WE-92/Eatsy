const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: { type: String, unique: true },
  username: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'customer' },
});

module.exports = mongoose.model('Customer', CustomerSchema);
