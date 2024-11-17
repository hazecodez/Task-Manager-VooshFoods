const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.json({ message: "User already exists" });

    const user = await User.create({ name, email, password });
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.json({ message: "Invalid email" });
    } else if (await bcrypt.compare(password, user.password)) {
      res.json({ message: "Incorrect password" });
    } else {
      res.status(200).json({
        user,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
