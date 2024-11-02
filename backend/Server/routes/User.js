const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");

const secretKey = process.env.SECRET_KEY;

// Register route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the entered password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Create and return a JWT token
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      secretKey,
      {
        expiresIn: "3h",
      }
    );
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/all", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    // Convert `page` and `limit` to integers
    const pageInt = parseInt(page, 10);
    const limitInt = parseInt(limit, 10);

    // Fetch users with pagination
    const users = await User.find()
      .skip((pageInt - 1) * limitInt)
      .limit(limitInt)
      .lean();

    // Get total user count for pagination info
    const totalUsers = await User.countDocuments();

    res.json({
      users,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limitInt),
      currentPage: pageInt,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users", error });
  }
});

// Route to delete a user by userId
router.delete("/delete/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user by ID and delete
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user", error });
  }
});

module.exports = router;
