const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const path = require("path");
const Category = require("../models/Category");

// Create a new product with images
exports.createProduct = async (req, res) => {
  let images = [];

  try {
    // Check if files were uploaded
    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => file.path); // Assuming you are using multer with Cloudinary and `file.path` gives the correct URL
    }

    // Prepare product data with uploaded image URLs
    const productData = {
      ...req.body,
      imageUrl: images, // Set the imageUrl field to the array of image URLs
    };

    // Save the product to the database
    const product = new Product(productData);
    const savedProduct = await product.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error);

    // Cleanup: delete each uploaded image from Cloudinary if an error occurs
    if (images.length > 0) {
      await Promise.all(
        images.map(async (imageUrl) => {
          // Extract public_id from the Cloudinary URL for deletion
          const publicId = imageUrl.split("/").slice(-1)[0].split(".")[0];
          await cloudinary.uploader.destroy(`product_images/${publicId}`);
        })
      );
    }

    res.status(500).json({ message: "Error creating product", error });
  }
};

// Update an existing product
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const newImages = req.files ? req.files.map((file) => file.path) : [];

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let updatedImages;
    if (Array.isArray(req.body.images)) {
      // If images is already an array, use it directly
      updatedImages = req.body.images;
    } else if (
      typeof req.body.images === "string" &&
      req.body.images.startsWith("[")
    ) {
      // If images is a JSON string of an array, parse it
      updatedImages = JSON.parse(req.body.images);
    } else if (typeof req.body.images === "string") {
      // If images is a single URL string, wrap it in an array
      updatedImages = [req.body.images];
    } else {
      // If images is undefined or not valid, set to empty array
      updatedImages = [];
    }

    // Get existing images from the database
    const existingImages = product.imageUrl || [];

    // Find images to delete
    const imagesToDelete = existingImages.filter(
      (img) => !updatedImages.includes(img)
    );

    // Delete images from Cloudinary
    await Promise.all(
      imagesToDelete.map(async (imageUrl) => {
        const publicId = imageUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`product_images/${publicId}`);
      })
    );

    // Combine updated and new images
    const updatedData = {
      ...req.body,
      imageUrl: [...updatedImages, ...newImages],
    };

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);

    // Cleanup newly uploaded images if an error occurs
    if (newImages) {
      await Promise.all(
        newImages.map(async (newImage) => {
          const publicId = newImage.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(`product_images/${publicId}`);
        })
      );
    }

    res.status(500).json({ message: "Error updating product", error });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the product to get Cloudinary image public IDs
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete images from Cloudinary
    if (product.imageUrl && product.imageUrl.length) {
      await Promise.all(
        product.imageUrl.map(async (imageUrl) => {
          // Extract the public ID from the image URL
          const publicId = imageUrl.split("/").pop().split(".")[0];
          // Delete the image in the "product_images" folder
          await cloudinary.uploader.destroy(`product_images/${publicId}`);
        })
      );
    }

    // Delete product from the database
    await Product.findByIdAndDelete(id);

    res
      .status(200)
      .json({ message: "Product and images deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Error deleting product", error });
  }
};
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching product" });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page); // Default to page 1
    const limit = parseInt(req.query.limit); // Default to 10 products per page
    const skip = (page - 1) * limit;

    const products = await Product.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate({
        path: "category",
        select: "name",
      })
      .populate({
        path: "associatedProducts",
        select: "name price",
      })
      .select(
        "name description price sizes colors stock useFor gender ageGroup keyFeatures tags imageUrl createdAt"
      )
      .lean();

    const modifiedProducts = products.map((product) => ({
      ...product,
      imageUrl:
        Array.isArray(product.imageUrl) && product.imageUrl.length > 0
          ? [product.imageUrl[0]]
          : [],
    }));

    // Send only the products without pagination info
    res.status(200).json(modifiedProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products", error });
  }
};

exports.getProductsByCategoryId = async (req, res) => {
  const { categoryId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 15;

  try {
    const products = await Product.find({ category: categoryId })
      .populate({
        path: "category",
        select: "name",
      })
      .populate({
        path: "associatedProducts",
        select: "name price",
      })
      .select(
        "name description price sizes colors stock useFor gender ageGroup keyFeatures tags imageUrl"
      )
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const modifiedProducts = products.map((product) => ({
      ...product,
      imageUrl:
        Array.isArray(product.imageUrl) && product.imageUrl.length > 0
          ? [product.imageUrl[0]]
          : [],
    }));

    res.status(200).json(modifiedProducts);
  } catch (error) {
    console.error("Error fetching products by category ID:", error);
    res
      .status(500)
      .json({ message: "Error fetching products by category ID", error });
  }
};

exports.getFilteredProducts = async (req, res) => {
  const {
    categoryId,
    gender,
    colors, // Expecting colors to be an array from the frontend
    ageGroup,
    useFor,
    sortBy,
    page = 1,
    limit = 10,
  } = req.query;

  const filter = {};

  // Applying filters based on request query parameters
  if (categoryId) filter.category = categoryId;
  if (gender) filter.gender = gender;

  // Colors filtering
  if (colors) {
    // Split colors into an array if it is provided as a comma-separated string
    const colorArray = Array.isArray(colors) ? colors : colors.split(",");

    // Use the $in operator to filter products that have any of the specified colors
    filter.colors = { $in: colorArray };
  }

  if (ageGroup) filter.ageGroup = ageGroup;
  if (useFor) filter.useFor = useFor;

  // Setting sorting options
  const sortOptions = {};
  if (sortBy === "priceAsc") sortOptions.price = 1;
  if (sortBy === "priceDesc") sortOptions.price = -1;

  try {
    const products = await Product.find(filter)
      .populate({
        path: "category",
        select: "name",
      })
      .populate({
        path: "associatedProducts",
        select: "name price",
      })
      .select(
        "name description price sizes colors stock useFor gender ageGroup keyFeatures tags imageUrl"
      )
      .sort(sortOptions)
      .skip((parseInt(page) - 1) * parseInt(limit)) // Dynamically set skip based on page from frontend
      .limit(parseInt(limit)) // Limit per request
      .lean();

    // Modify products to include only the first image URL if it’s an array
    const modifiedProducts = products.map((product) => ({
      ...product,
      imageUrl:
        Array.isArray(product.imageUrl) && product.imageUrl.length > 0
          ? [product.imageUrl[0]]
          : [],
    }));

    res.status(200).json(modifiedProducts);
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    res.status(500).json({
      message: "Error fetching filtered products",
      error: error.message,
    });
  }
};

exports.getLatestProductsByCategoryName = async (req, res) => {
  const { categoryName } = req.query; // Get category name from query params
  const limit = 10; // Limit to the latest 10 products

  try {
    // Find the unique category by its name
    const category = await Category.findOne({
      name: new RegExp(`^${categoryName}$`, "i"),
    });

    // If the category doesn't exist, respond with a 404 error
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // console.log(category._id.toString());
    // Fetch the latest products in the found category
    const products = await Product.find({ category: category._id })
      .sort({ createdAt: -1 }) // Sort by creation date (latest first)
      .limit(limit)
      .populate({
        path: "category",
        select: "name",
      })
      .select(
        "name description price stock colors useFor gender ageGroup keyFeatures tags imageUrl"
      )
      .lean();

    // Modify products to keep only the first image
    const modifiedProducts = products.map((product) => ({
      ...product,
      imageUrl:
        Array.isArray(product.imageUrl) && product.imageUrl.length > 0
          ? [product.imageUrl[0]] // Keep only the first image in imageUrl
          : [],
    }));

    res.status(200).json(modifiedProducts);
  } catch (error) {
    console.error("Error fetching products by category name:", error);
    res
      .status(500)
      .json({ message: "Error fetching products by category name", error });
  }
};
