const express = require('express');
const router = express.Router()
const upload = require('../upload')
const authController = require('./../controller/authController')
const movieController = require('./../controller/movieController')
const reviewRouter = require('./reviewRouter')

router.use('/:movieId/reviews', reviewRouter)
router.route('/top-5').get(movieController.TopSellingMovie, movieController.getAllMovies)
router
  .route('/')
  .get(movieController.getAllMovies)
  .post(authController.protect, authController.restrictTo('admin'), movieController.uploadMovieImages, movieController.resizeMovieImages, movieController.createMovie)
router.get('/search', movieController.getMovieByName)
router
  .route('/id/:id')
  .get(movieController.getMovieByID)
  .patch(authController.protect, authController.restrictTo('admin'),movieController.uploadMovieImages, movieController.resizeMovieImages, movieController.updateMovie)
  .delete(authController.protect, authController.restrictTo('admin'), movieController.deleteMovie)

module.exports = router