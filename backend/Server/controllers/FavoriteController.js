const Favorite = require("../models/Favorite");
// const Product = require("../models/Product");

// Add a product to favorites
const addFavorite = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.userId;

    // Check if the favorite already exists
    const existingFavorite = await Favorite.findOne({ userId, productId });
    if (existingFavorite) {
      return res
        .status(400)
        .json({ message: "Product is already in your favorites." });
    }

    // Add to favorites if it doesn't exist
    const favorite = new Favorite({ userId, productId });
    await favorite.save();

    res.status(201).json({ message: "Product added to favorites.", favorite });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
};

// Remove a product from favorites
const removeFavorite = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.userId;

    const favorite = await Favorite.findOneAndDelete({ userId, productId });
    if (!favorite) {
      return res.status(404).json({ message: "Favorite not found." });
    }

    res.status(200).json({ message: "Product removed from favorites." });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
};

// Get all favorites for a user
const getFavorites = async (req, res) => {
  try {
    const userId = req.user.userId;

    const favorites = await Favorite.find({ userId }).populate(
      "productId",
      "name description price sizes colors stock useFor gender ageGroup keyFeatures tags imageUrl"
    );

    const modifiedFavorites = favorites.map((favorite) => ({
      ...favorite.toObject(),
      productId: {
        ...favorite.productId.toObject(),
        imageUrl:
          Array.isArray(favorite.productId.imageUrl) &&
          favorite.productId.imageUrl.length > 0
            ? [favorite.productId.imageUrl[0]] // Select the first image
            : [],
      },
    }));

    res.status(200).json(modifiedFavorites);
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = { addFavorite, removeFavorite, getFavorites };
