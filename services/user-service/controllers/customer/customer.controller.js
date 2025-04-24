const Customer = require("../../models/customer/customer.model");

const register = async (req, res) => {
  try {
    const { name, email, phone, username, password } = req.body;

    const existingUser = await Customer.findOne({
      $or: [{ email }, { username }, { phone }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({
          msg: "Customer already exists with provided email, username, or phone",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCustomer = new Customer({
      name,
      email,
      phone,
      username,
      password: hashedPassword,
    });

    await newCustomer.save();
    res.status(201).json({ msg: "Customer registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const customer = await Customer.findOne({ username });
    if (!customer)
      return res.status(400).json({ msg: "Invalid username or password" });

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid username or password" });

    const token = jwt.sign(
      { id: customer._id, role: customer.role },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    res.status(200).json({
      token,
      user: {
        username: customer.username,
        role: customer.role,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  register,
  login,
};