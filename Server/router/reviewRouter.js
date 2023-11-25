const express = require('express');
const reviewController = require('./../controller/reviewController')
const authController = require('./../controller/authController')
const router = express.Router({mergeParams: true})

router.use(authController.protect);

router
  .route('/')
  .get(reviewController.getMyReviewsOnMovie)
  .get(reviewController.getAllReviews)
  // nest with movies/12345678/reviews
  .post(authController.restrictTo('user'), reviewController.setMovieAndUserId,
  reviewController.reviewCheck, reviewController.createReview)

router.route('/:id')
  .get(reviewController.getReview)
  .delete(reviewController.deleteReview)
  .patch(reviewController.updateReview)

module.exports = router