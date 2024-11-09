const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Import the Auth routes
const userRoutes = require("./routes/User");
app.use("/user", userRoutes);

const productRoutes = require("./routes/ProductRoute");
app.use("/product", productRoutes);

const categoryRoutes = require("./routes/CategoryRoute");
app.use("/category", categoryRoutes);

const favoriteRoutes = require("./routes/FavoriteRoute");
app.use("/favorite", favoriteRoutes); // Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
