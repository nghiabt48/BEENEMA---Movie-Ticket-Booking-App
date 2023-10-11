const express = require('express');
const showtimeController = require('./../controller/showtimeController')
const router = express.Router()

router
  .route('/')
  .get(showtimeController.getAllShowtimes)
  .post(showtimeController.createShowTime)

router.route('/:id')
  .get(showtimeController.getShowTime)
  
module.exports = router