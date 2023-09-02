const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User registration
exports.register = async (req, res) => {
  console.log("calling /register");
  try {
    const { username, email, password, phone } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create a new user
    const user = new User({ username, email, password, phone });

    // Save the user to the database
    await user.save();

    // You can generate a JWT token here and send it to the client for authentication
    // For simplicity, I'll just respond with a success message
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

// User login
exports.login = async (req, res) => {
  console.log("calling /login");
  try {
    const { username, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ username });

    // Check if the user exists and the password is correct
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, "thisisverhardsecretkeyeiei", {
      expiresIn: "1h", // Token expiration time
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};
