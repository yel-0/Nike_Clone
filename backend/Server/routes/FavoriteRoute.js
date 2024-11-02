const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middware/Auth");
const {
  addFavorite,
  removeFavorite,
  getFavorites,
} = require("../controllers/FavoriteController");

// Route to add a product to favorites
router.post("/add", verifyToken, addFavorite);

// Route to remove a product from favorites
router.delete("/remove/:productId", verifyToken, removeFavorite);

// Route to get all favorites for a user
router.get("/get", verifyToken, getFavorites);

module.exports = router;
