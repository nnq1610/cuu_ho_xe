const Review = require('../models/review.model'); // Import model Review
const RescueUnit = require('../models/rescueUnit.model'); // Import model RescueUnit
const { BadRequestError, NotFoundError } = require('../core/error.response');
const {getInforData} = require("../utils");

class ReviewService {
    // 1. Tạo review mới
    static async createReview({ rescueUnitId, userId, rating, comment }) {
        // Kiểm tra đầu vào
        if (!rescueUnitId || !userId || !rating || !comment) {
            throw new BadRequestError("All fields (rescueUnitId, userId, rating, comment) are required.");
        }
        // Kiểm tra xem RescueUnit có tồn tại không
        const rescueUnit = await RescueUnit.findById(rescueUnitId);
        if (!rescueUnit) {
            throw new NotFoundError("Rescue Unit not found.");
        }

        // Tạo review
        const newReview = await Review.create({
            rescueUnitId,
            userId,
            rating,
            comment
        });

        return getInforData({
            fields: ['rating', 'comment', 'rescueUnitId', 'userId', '_id'],
            object: newReview
        });

    }

    // 2. Lấy danh sách review theo `rescueUnitId`
    static async getReviewsByRescueUnit(rescueUnitId, { limit = 10, page = 1 }) {
        if (!rescueUnitId) {
            throw new BadRequestError("rescueUnitId is required.");
        }

        const reviews = await Review.find({ rescueUnitId })
            .limit(limit)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const totalReviews = await Review.countDocuments({ rescueUnitId });

        return {
            reviews,
            total: totalReviews,
            page,
            limit
        };
    }

    // 4. Xóa review
    static async deleteReview({reviewId}) {
        if (!reviewId) {
            throw new BadRequestError("reviewId is required.");
        }
        const deletedReview = await Review.findByIdAndDelete(reviewId);
        if (!deletedReview) {
            throw new NotFoundError("Review not found.");
        }

        return deletedReview;
    }

    // 5. Cập nhật review
    static async updateReview(reviewId, updateData) {
        if (!reviewId || !updateData) {
            throw new BadRequestError("reviewId and update data are required.");
        }

        const updatedReview = await Review.findByIdAndUpdate(reviewId, updateData, { new: true });
        if (!updatedReview) {
            throw new NotFoundError("Review not found.");
        }

        return updatedReview;
    }

    // 6. Lấy trung bình rating cho một `rescueUnitId`
    static async getAverageRating(rescueUnitId) {
        if (!rescueUnitId) {
            throw new BadRequestError("rescueUnitId is required.");
        }

        const result = await Review.aggregate([
            { $match: { rescueUnitId } },
            { $group: { _id: "$rescueUnitId", averageRating: { $avg: "$rating" } } }
        ]);

        if (result.length === 0) {
            throw new NotFoundError("No reviews found for this Rescue Unit.");
        }

        return result[0].averageRating;
    }
}

module.exports = ReviewService;
