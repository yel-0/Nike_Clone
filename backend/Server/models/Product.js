const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  sizes: [{ type: String }],
  colors: [{ type: String }],
  imageUrl: [{ type: String, required: true }],
  stock: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  useFor: { type: String, required: true },
  gender: { type: String, enum: ["male", "female", "unisex"], required: true },
  ageGroup: {
    type: String,
    enum: ["adult", "kid", "boy", "girl"],
    required: true,
  },
  associatedProducts: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  ],
  keyFeatures: [{ type: String }],
  tags: [{ type: String, trim: true }],
  discountPercentage: { type: Number, default: 0 },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
