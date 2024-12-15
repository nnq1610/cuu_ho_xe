'use strict'

const ReviewService = require('../services/review.service')
const {OkSuccess, CreatedSuccess, SuccessResponse} = require('../core/success.response.js');

class ReviewController {

    createReview = async (req, res, next) => {
        const {incidentTypeId} = req.params
        const { userId, content, rating } = req.body;
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