const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const path = require("path");

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
  const newImages = req.files ? req.files.map((file) => file.path) : null;

  try {
    // Fetch the current product to check its existing images
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Get existing images from the database
    const existingImages = product.imageUrl || [];
    const updatedImages = req.body.images || []; // URLs of images to keep

    // Find images to delete from the server
    const imagesToDelete = existingImages.filter(
      (img) => !updatedImages.includes(img)
    );

    // Delete images that are no longer in the updated images list from Cloudinary
    await Promise.all(
      imagesToDelete.map(async (imageUrl) => {
        const publicId = imageUrl.split("/").slice(-1)[0].split(".")[0];
        await cloudinary.uploader.destroy(`product_images/${publicId}`);
      })
    );

    // Prepare the updated data
    const updatedData = {
      ...req.body,
      imageUrl: [...updatedImages, ...(newImages || [])], // Combine existing with new images
    };

    // Update the product in the database
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);

    // Cleanup: Delete newly uploaded images if any error occurs
    if (newImages) {
      try {
        await Promise.all(
          newImages.map(async (newImage) => {
            const publicId = newImage.split("/").slice(-1)[0].split(".")[0];
            await cloudinary.uploader.destroy(`product_images/${publicId}`);
          })
        );
      } catch (cleanupError) {
        console.error(
          "Error deleting newly uploaded images during cleanup:",
          cleanupError
        );
      }
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
    const products = await Product.find()
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
    colors,
    ageGroup,
    useFor,
    sortBy,
    page = 1,
    limit = 15,
  } = req.query;
  console.log("hello filter");

  const filter = {};

  // Filter by category
  if (categoryId) filter.category = categoryId;

  // Filter by gender
  if (gender) filter.gender = gender;

  // Filter by colors
  if (colors) filter.colors = { $in: colors.split(",") };

  // Filter by age group
  if (ageGroup) filter.ageGroup = ageGroup;

  // Filter by useFor
  if (useFor) filter.useFor = useFor;

  // Sorting
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
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
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
    console.error("Error fetching filtered products:", error);
    res
      .status(500)
      .json({ message: "Error fetching filtered products", error });
  }
};
