const cloudinary = require('cloudinary').v2;

// Cấu hình Cloudinary với các thông tin của bạn
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Từ Cloudinary Dashboard
    api_key: process.env.CLOUDINARY_API_KEY,       // Từ Cloudinary Dashboard
    api_secret: process.env.CLOUDINARY_API_SECRET  // Từ Cloudinary Dashboard
});

module.exports = cloudinary;
