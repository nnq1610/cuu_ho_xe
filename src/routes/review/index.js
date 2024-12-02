const express = require('express');
const reviewController = require('../../controllers/review.controller');
const asyncHandler = require('../../helpers/asyncHandler.js');
const router = express.Router();

// Sign up
router.post('/reviews', asyncHandler(reviewController.createReview));

router.delete('/reviews', asyncHandler(reviewController.deleteReview))


module.exports = router;