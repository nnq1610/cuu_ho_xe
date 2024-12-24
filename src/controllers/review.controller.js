'use strict'

const ReviewService = require('../services/review.service')
const {OkSuccess, CreatedSuccess, SuccessResponse} = require('../core/success.response.js');
const {reviewValidationSchema} = require('../validators/review.validation')
class ReviewController {

    createReview = async (req, res, next) => {
        const {incidentTypeId} = req.params
        const { userId, content, rating } = req.body;
        const data = {userId, content, rating}
        const {error} = reviewValidationSchema.validate(data, {abortEarly: false})
        if (error) {
            return res.status(400).json({
                success: false,
                message: "validate sai",
                errors: error.details.map((err) => err.message),
            });
        }
        new SuccessResponse({
            message : "Create success",
            metadata: await ReviewService.createReview({ incidentTypeId, userId, content, rating })
        }).send(res);
    }

    deleteReview = async(req, res, next) => {
        const {reviewId} = req.params
        new SuccessResponse({
            message: "Remove success !!!",
            metadata:  await  ReviewService.deleteReview({reviewId})
        }).send(res)
    }

    updatedReview = async(req, res, next) => {
        const {reviewId} = req.params
        const { content, rating: newRating } = req.body;
        const data = {content, rating}
        const {error} = reviewValidationSchema.validate(data, {abortEarly: false})
        if (error) {
            return res.status(400).json({
                success: false,
                message: "validate sai",
                errors: error.details.map((err) => err.message),
            });
        }
        const updatedReview = await ReviewService.updateReview({ reviewId, content, newRating });
        new SuccessResponse({
            message:"Update success",
            metadata: updatedReview
        }).send(res)
    }

    getAllReviewsById = async(req, res, next) => {
        const {incidentTypeId} = req.params

        new SuccessResponse({
            message:'get successfully',
            metadata: await ReviewService.getAllReviewsById(incidentTypeId)
        }).send(res)
    }

}

module.exports = new ReviewController();
