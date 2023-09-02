const User = require("../models/userModel");

exports.getUserData = async (req, res) => {
  console.log("calling /getuser");
  try {
    const { email } = req.body;

    // Fetch user data based on the provided email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userData = {
      username: user.username,
      email: user.email,
    };

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};
