const Review = require('../models/review.model'); // Import model Review
const RescueUnit = require('../models/rescueUnit.model'); // Import model RescueUnit
const { BadRequestError, NotFoundError } = require('../core/error.response');
const {getInforData} = require("../utils");
const mongoose = require('mongoose')


class ReviewService {
    // static async createReview({ userId, incidentTypeId, rating, comment }) {
    //     if (!userId || !incidentTypeId ) {
    //         throw new BadRequestError('User ID, Incident Type ID are required');
    //     }
    //     const rescueUnit = await RescueUnit.findOne({ userId });
    //     if (!rescueUnit) {
    //         throw new NotFoundError("Rescue Unit not found for the given User ID");
    //     }
    //     const incidentType = rescueUnit.incidentTypes.id(incidentTypeId);
    //     if (!incidentType) {
    //         throw new NotFoundError("Incident Type not found for the given ID");
    //     }
    //
    //     Object.assign(incidentType, updateData);
    //
    //     await rescueUnit.save();
    //     return {
    //         message: "Incident Type updated successfully",
    //         updatedIncidentType: incidentType,
    //     }
    //     }
    // static async createReview( {rescueUnitId, userId, rating, comment }) {
    //     const actualRescueUnitId = rescueUnitId.rescueUnitId || rescueUnitId;
    //     if (!mongoose.Types.ObjectId.isValid(actualRescueUnitId)) {
    //         throw new BadRequestError("Invalid rescueUnitId.");
    //     }
    //
    //     if (!rescueUnitId || !userId || !rating || !comment) {
    //         throw new BadRequestError("All fields (rescueUnitId, userId, rating, comment) are required.");
    //     }
    //
    //     const rescueUnit = await RescueUnit.findById(actualRescueUnitId);
    //     if (!rescueUnit) {
    //         throw new NotFoundError("Rescue Unit not found.");
    //     }
    //     const newReview = await Review.create({
    //         rescueUnitId,
    //         userId,
    //         rating,
    //         comment
    //     });
    //
    //     return getInforData({
    //         fields: ['rating', 'comment', 'rescueUnitId', 'userId', '_id'],
    //         object: newReview
    //     });
    //
    // }
    //
    // static async getReviewsByRescueUnit(rescueUnitId, { limit = 10, page = 1 }) {
    //     if (!rescueUnitId) {
    //         throw new BadRequestError("rescueUnitId is required.");
    //     }
    //
    //     const reviews = await Review.find({ rescueUnitId })
    //         .limit(limit)
    //         .skip((page - 1) * limit)
    //         .sort({ createdAt: -1 });
    //
    //     const totalReviews = await Review.countDocuments({ rescueUnitId });
    //
    //     return {
    //         reviews,
    //         total: totalReviews,
    //         page,
    //         limit
    //     };
    // }
    //
    // // 4. Xóa review
    // static async deleteReview({reviewId}) {
    //     if (!reviewId) {
    //         throw new BadRequestError("reviewId is required.");
    //     }
    //     const deletedReview = await Review.findByIdAndDelete(reviewId);
    //
    //     if (!deletedReview) {
    //         throw new NotFoundError("Review not found.");
    //     }
    //
    //     return deletedReview;
    // }
    //
    // // 5. Cập nhật review
    // static async updateReview(reviewId, updateData) {
    //     if (!reviewId || !updateData) {
    //         throw new BadRequestError("reviewId and update data are required.");
    //     }
    //     const updatedReview = await Review.findByIdAndUpdate(reviewId, updateData, { new: true });
    //     if (!updatedReview) {
    //         throw new NotFoundError("Review not found.");
    //     }
    //
    //     return updatedReview;
    // }
    //
    // static async getAverageRating(rescueUnitId) {
    //     if (!rescueUnitId) {
    //         throw new BadRequestError("rescueUnitId is required.");
    //     }
    //
    //     const result = await Review.aggregate([
    //         { $match: { rescueUnitId } },
    //         { $group: { _id: "$rescueUnitId", averageRating: { $avg: "$rating" } } }
    //     ]);
    //
    //     if (result.length === 0) {
    //         throw new NotFoundError("No reviews found for this Rescue Unit.");
    //     }
    //
    //     return result[0].averageRating;
    // }

    static async createReview({incidentTypeId, userId, content, rating}) {
        const rescue = await  RescueUnit.findOne({
            'incidentTypes._id': incidentTypeId,
        })

        if (!rescue){
            throw new NotFoundError('không có loại dịch vụ này');
        }
        const newReview = await Review.create({ incidentTypeId, userId, content, rating });

        return newReview
    }

    static async updateReview({reviewId, content, newRating}) {
        const updatedReview = await Review.findByIdAndUpdate(
            reviewId,
            { content, rating: newRating },
            { new: true }
        )

        if(!updatedReview){
            throw new NotFoundError('Bình luận không tìm thấy')
        }
        return updatedReview
    }

    static async deleteReview({reviewId}) {
        const review = await Review.findById(reviewId);
        if (!review) {
            throw new Error('Review not found');
        }
        await review.deleteOne();
        return { message: 'Review deleted successfully' };
    }

    static async getAllReviewsById(incidentTypeId){
        const rescueUnit = await RescueUnit.findOne({ 'incidentTypes._id': incidentTypeId });
        if (!rescueUnit) {
            throw new NotFoundError('Khong co dich vu nay');
        }
        const reviews = await Review.find({ incidentTypeId }).populate('userId', 'name').lean();
        return reviews;
    }

}

module.exports = ReviewService;
