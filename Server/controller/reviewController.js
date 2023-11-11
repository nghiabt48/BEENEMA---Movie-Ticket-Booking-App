const AppError = require('../utils/appError');
const Review = require('./../model/reviewModel')
const catchAsync = require('./../utils/catchAsync')
const factory = require('./handleFactory');

exports.setMovieAndUserId = (req, res, next) => {
  if(!req.body.movie) req.body.movie = req.params.movieId // comes from movie route
  req.body.user = req.user.id
  next()
}
exports.getAllReviews = factory.getAll(Review)
exports.getReview = factory.getOne(Review)
exports.createReview =catchAsync(async(req, res, next) => {
  const review = await Review.find({movie: req.body.movie, user: req.body.user})
  if(review.length !== 0) return next(new AppError("You already have a review on this movie.", 409))
  res.status(201).json({
    status: "success",
    review: await Review.create(req.body)
  })
})
exports.deleteReview = factory.deleteOne(Review)
exports.updateReview = factory.updateOne(Review)
