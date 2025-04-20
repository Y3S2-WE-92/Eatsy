const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  username: { type: String, unique: true },
  password: String,
  role : { type: String, default: "admin" },
});

module.exports = mongoose.model("Admin", AdminSchema);
