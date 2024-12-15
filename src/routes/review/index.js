const express = require('express');
const ReviewController = require('../../controllers/review.controller');
const asyncHandler = require('../../helpers/asyncHandler.js');
const router = express.Router();

// post comment
router.post('/rescue-units/reviews/:incidentTypeId', asyncHandler(ReviewController.createReview));

//delete comment
router.delete('/rescue-units/reviews/:reviewId', asyncHandler(ReviewController.deleteReview));

//update comment
router.put('/rescue-units/reviews/:reviewId', asyncHandler(ReviewController.updatedReview))

//get all comment by id
router.get('/rescue-units/reviews/:incidentTypeId', asyncHandler(ReviewController.getAllReviewsById))

module.exports = router;