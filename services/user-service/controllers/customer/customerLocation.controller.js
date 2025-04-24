const CustomerLocation = require("../../models/customer/customerLocation.model");

const getCustomerLocations = async (req, res) => {
    try {
        const locations = await CustomerLocation.find({ customerID: req.params.id });
        res.status(200).json(locations);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

const addCustomerLocation = async (req, res) => {
    try {
        const { customerID, name, deliveryAddress } = req.body;

        const newLocation = new CustomerLocation({ customerID, name, deliveryAddress });
        await newLocation.save();

        res.status(201).json({ msg: "Location added successfully" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

const deleteCustomerLocation = async (req, res) => {
    try {
        await CustomerLocation.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: "Location deleted successfully" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

module.exports = {
    getCustomerLocations,
    addCustomerLocation,
    deleteCustomerLocation
}