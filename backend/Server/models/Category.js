const mongoose = require("mongoose");

// Define the Category Schema
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});

// Compile the schema into a model
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
