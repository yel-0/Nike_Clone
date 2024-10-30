const express = require("express");
const router = express.Router();
const upload = require("../config/multer"); // Import multer setup for Cloudinary
const productController = require("../controllers/ProductController");

// Routes
router.post(
  "/create",
  upload.array("images", 10),
  productController.createProduct
);
router.put(
  "/products/:id",
  upload.array("images", 10),
  productController.updateProduct
);
router.delete("/delete/:id", productController.deleteProduct);
router.get("/getAll", productController.getAllProducts);
router.get("/category/:categoryId", productController.getProductsByCategoryId);
router.get("/filter", productController.getFilteredProducts);
router.get("/:id", productController.getProductById);
module.exports = router;
