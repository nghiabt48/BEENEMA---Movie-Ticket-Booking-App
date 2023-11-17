const catchAsync = require('../utils/catchAsync')
const Showtime = require('./../model/showtimeModel')
const factory = require('./handleFactory')

exports.createShowTime = factory.createOne(Showtime)
exports.getShowTime = factory.getOne(Showtime, { path: 'movie', select: 'title price' }, { path: 'cinema', select: 'name' })
exports.getAllShowtimes = factory.getAll(Showtime, { path: 'room', select: 'name cinema' }, { path: 'movie', select: 'title' })
exports.getShowtimeByCinema1 = catchAsync(async (req, res, next) => {
  if (!req.query.cinema) return next()
  const showtimes = await Showtime.find().populate({ path: 'movie cinema', select: 'title name' })
  res.status(200).json({
    status: 'success',
    data: showtimes
  })
})
exports.getShowtimeByCinema = catchAsync(async (req, res, next) => {
  if (!req.query.cinema) return next()
  console.log('entered')
  let showtimes = await Showtime.find().populate('room movie', 'cinema name title')
  showtimes = showtimes.filter(showtime => showtime.room.cinema == req.query.cinema)
  res.status(200).json({
    status: 'success',
    data: {
      showtimes
    }
  })
})

