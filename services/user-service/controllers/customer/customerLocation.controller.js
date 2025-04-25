const CustomerLocation = require("../../models/customer/customerLocation.model");

const getCustomerLocations = async (req, res) => {
  try {
    const { id } = req.user;
    const locations = await CustomerLocation.find({ customerID: id });
    res.status(200).json(locations);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const getAllCustomerLocations = async (req, res) => {
  try {
    const { id } = req.params;
    const locations = await CustomerLocation.find();
    res.status(200).json(locations);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const addCustomerLocation = async (req, res) => {
  try {
    const { customerID, name, deliveryAddress } = req.body;

    if (!customerID || !name || !deliveryAddress?.address || !deliveryAddress?.location?.coordinates) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    const newLocation = new CustomerLocation({ customerID, name, deliveryAddress });
    await newLocation.save();

    res.status(201).json({ msg: "Location added successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const deleteCustomerLocation = async (req, res) => {
  try {
    const location = await CustomerLocation.findByIdAndDelete(req.params.id);
    if (!location) {
      return res.status(404).json({ msg: "Location not found" });
    }
    res.status(200).json({ msg: "Location deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const getLocationByID = async (req, res) => {
  try {
    const location = await CustomerLocation.findById(req.params.id).populate("customerID", "name phone");
    if (!location) {
      return res.status(404).json({ msg: "Location not found" });
    }
    res.status(200).json(location);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  getCustomerLocations,
  getAllCustomerLocations,
  addCustomerLocation,
  deleteCustomerLocation,
  getLocationByID
};
