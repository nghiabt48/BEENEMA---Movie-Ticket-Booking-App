const catchAsync = require('../utils/catchAsync')
const Showtime = require('./../model/showtimeModel')
const factory = require('./handleFactory')

exports.createShowTime = factory.createOne(Showtime)
exports.getShowTime = factory.getOne(Showtime, {path: 'movie', select: 'title price'}, {path: 'cinema', select: 'name'})
exports.getAllShowtimes = factory.getAll(Showtime, {path: 'room', select: 'name'}, {path: 'movie', select: 'title imageCover'})
exports.getShowtimeBySomething = catchAsync(async (req, res, next) => {
  if(!req.query) return next()
  const showtimes = await Showtime.find({room: req.query.room}).populate({path: 'movie room', select: 'title name'})
  res.status(200).json({
    status: 'success',
    data: showtimes
  })
})

