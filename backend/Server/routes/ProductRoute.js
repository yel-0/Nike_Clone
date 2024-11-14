const express = require("express");
const router = express.Router();
const upload = require("../config/multer"); // Import multer setup for Cloudinary
const productController = require("../controllers/ProductController");
const { isAdminToken } = require("../middware/Auth");

// Routes
router.post(
  "/create",
  isAdminToken,
  upload.array("images", 10),
  productController.createProduct
);
router.put(
  "/products/:id",
  isAdminToken,
  upload.array("images", 10),
  productController.updateProduct
);
router.delete("/delete/:id", isAdminToken, productController.deleteProduct);
router.get("/getAll", productController.getAllProducts);
router.get("/category/:categoryId", productController.getProductsByCategoryId);
router.get("/getFilteredProducts", productController.getFilteredProducts);
router.get("/:id", productController.getProductById);
// Assuming you are using Express Router
router.get("/by/category", productController.getLatestProductsByCategoryName);
router.get("/products/search", productController.searchProductsByName);

module.exports = router;
