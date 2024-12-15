const multer = require('multer');
const cloudinary = require('../configs/cloudinary.config');
const { v4: uuidv4 } = require('uuid');

// Cấu hình upload với multer, nhưng chúng ta chỉ sử dụng multer để lưu tạm file trước khi upload lên Cloudinary
const storage = multer.memoryStorage(); // Lưu file vào bộ nhớ thay vì vào ổ cứng
const upload = multer({ storage: storage }).single('image'); // 'image' là tên trường file trong form
// Middleware xử lý upload lên Cloudinary
const uploadToCloudinary = async (req, res, next) => {
    if (req.file) {
        try {
            const uploadResponse = await cloudinary.uploader.upload_stream({
                public_id: `users/${uuidv4()}`, // Đặt ID duy nhất cho ảnh
                resource_type: 'image',         // Chỉ tải ảnh lên
                folder: 'users/',               // Thư mục ảnh trong Cloudinary
                transformation: [{ width: 500, height: 500, crop: 'limit' }] // Thêm nếu bạn cần transform ảnh (resize, crop)
            }, (error, result) => {
                if (error) return next(error);
                req.file.url = result.secure_url; // Lưu URL ảnh từ Cloudinary vào req.file.url
                next();
            });

            // Stream ảnh từ bộ nhớ lên Cloudinary
            uploadResponse.end(req.file.buffer);
        } catch (error) {
            return next(error);
        }
    } else {
        next(); // Không có file tải lên thì chuyển tiếp yêu cầu
    }
};

module.exports = { upload, uploadToCloudinary };
