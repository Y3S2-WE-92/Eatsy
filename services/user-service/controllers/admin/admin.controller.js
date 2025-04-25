const Admin = require("../../models/admin/admin.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, phone, username, password, profileImage } = req.body;

    const existingAdmin = await Admin.findOne({
      $or: [{ email }, { phone }, { username }],
    });

    if (existingAdmin) {
      return res
        .status(400)
        .json({ msg: "Admin already exists with provided email, phone, or username" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name,
      email,
      phone,
      username,
      password: hashedPassword,
      profileImage,
    });

    await newAdmin.save();
    res.status(201).json({ msg: "Admin registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ msg: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid username or password" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });

    res.status(200).json({
      token,
      user: {
        id: admin._id,
        username: admin.username,
        name: admin.name,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select("-password");
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const getAdminByID = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id).select("-password");
    if (!admin) {
      return res.status(404).json({ msg: "Admin not found" });
    }
    res.status(200).json(admin);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  register,
  login,
  getAllAdmins,
  getAdminByID,
};
