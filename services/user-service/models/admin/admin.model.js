const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required:true },
  phone: { type: String, unique: true, required:true },
  username: { type: String, unique: true, required:true },
  password: {type: String, required: true},
  profileImage: String,
});

module.exports = mongoose.model('Admin', AdminSchema);
