// multerSetup.js
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

// Configure Cloudinary Storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "product_images", // Folder in Cloudinary to store images
    allowed_formats: ["jpg", "jpeg", "png", "webp"], // Include webp in allowed formats
    // Optional: Define public_id for dynamic file names
    // public_id: (req, file) => 'your_file_name',
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
