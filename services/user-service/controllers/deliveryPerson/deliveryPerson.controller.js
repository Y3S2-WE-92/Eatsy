const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const DeliveryPerson = require("../../models/deliveryPerson/deliveryPerson.model");

// Register a new delivery person
const register = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      username,
      password,
      nic,
      vehicleNo,
      licenseNo,
      profileImage,
    } = req.body;

    const existingUser = await DeliveryPerson.findOne({
      $or: [{ email }, { username }, { phone }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "User already exists with provided email, username, or phone number" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newDeliveryPerson = new DeliveryPerson({
      name,
      phone,
      email,
      username,
      password: hashedPassword,
      nic,
      vehicleNo,
      licenseNo,
      profileImage,
    });

    await newDeliveryPerson.save();
    res.status(201).json({ msg: "Delivery person registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Login delivery person
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const deliveryPerson = await DeliveryPerson.findOne({ username });
    if (!deliveryPerson)
      return res.status(400).json({ msg: "Invalid username or password" });

    const isMatch = await bcrypt.compare(password, deliveryPerson.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid username or password" });

    const token = jwt.sign(
      { id: deliveryPerson._id },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    res.status(200).json({
      token,
      user: {
        username: deliveryPerson.username,
        id: deliveryPerson._id,
        accountStatus: deliveryPerson.accountStatus,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get all delivery persons
const getDeliveryPersons = async (req, res) => {
  try {
    const filter = {};
    if (req.query.accountStatus) filter.accountStatus = req.query.accountStatus;
    if (req.query.availability !== undefined)
      filter.availability = req.query.availability === "true";

    const deliveryPersons = await DeliveryPerson.find(filter);
    res.json(deliveryPersons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a delivery person by ID
const getDeliveryPersonById = async (req, res) => {
  try {
    const person = await DeliveryPerson.findById(req.params.id);
    if (!person) return res.status(404).json({ error: "Delivery person not found" });
    res.json(person);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update delivery person
const updateDeliveryPerson = async (req, res) => {
  try {
    const updated = await DeliveryPerson.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: "Delivery person not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update availability
const updateAvailability = async (req, res) => {
  try {
    const { availability } = req.body;
    const updated = await DeliveryPerson.findByIdAndUpdate(
      req.params.id,
      { availability },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: "Delivery person not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update location
const updateLocation = async (req, res) => {
  try {
    const { coordinates } = req.body;
    const updated = await DeliveryPerson.findByIdAndUpdate(
      req.params.id,
      { location: { type: "Point", coordinates } },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: "Delivery person not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get nearby delivery persons
const getNearbyDeliveryPersons = async (req, res) => {
  try {
    const { lat, lng, maxDistance = 5000 } = req.query;
    if (!lat || !lng) return res.status(400).json({ error: "lat and lng are required" });

    const nearby = await DeliveryPerson.find({
      availability: true,
      location: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: parseInt(maxDistance),
        },
      },
    });

    res.json(nearby);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const verifyDeliveryPerson = async (req, res) => {
  try {
    const { id, adminId } = req.params;

    const deliveryPerson = await DeliveryPerson.findByIdAndUpdate(
      id,
      { verifiedBy: adminId },
      { new: true }
    );

    if (!deliveryPerson) {
      return res.status(404).json({ error: "delivery person not found" });
    }

    res.json({ verified: true, verifiedBy: deliveryPerson.verifiedBy });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error ", err);
  }
};


const getAllDeliveryPersonsIds = async (req, res) => {
  try {
    const deliveryPersons = await DeliveryPerson.find({}, "_id");
    res.json(deliveryPersons.map((person) => person._id));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  register,
  login,
  getDeliveryPersons,
  getDeliveryPersonById,
  updateDeliveryPerson,
  updateAvailability,
  updateLocation,
  getNearbyDeliveryPersons,
  getAllDeliveryPersonsIds,
  verifyDeliveryPerson
};
