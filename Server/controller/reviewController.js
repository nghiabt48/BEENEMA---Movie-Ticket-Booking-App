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
exports.createReview = factory.createOne(Review)
exports.deleteReview = factory.deleteOne(Review)
exports.updateReview = factory.updateOne(Review)
