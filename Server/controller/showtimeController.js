const catchAsync = require('../utils/catchAsync')
const Showtime = require('./../model/showtimeModel')
const factory = require('./handleFactory')

exports.createShowTime = factory.createOne(Showtime)
exports.getShowTime = factory.getOne(Showtime, {path: 'movie', select: 'title price'}, {path: 'cinema', select: 'name'})
// exports.getAllShowtimes = factory.getAll(Showtime, {path: 'room', select: 'name', populate: {path: 'cinema', select: 'name'}}, {path: 'movie', select: 'title'})
exports.getAllShowtimes = catchAsync(async(req, res, next) => {
  req.query.start_time = { $gt: req.request_time }
  const data = await Showtime.find(req.query)
  .populate({path: 'room', select: 'name', populate: 'cinema'})
  .populate({path: 'movie', select: 'title imageCover'})
  res.json({
    status: 'success',
    data
  })
})
exports.getShowtimeByName = catchAsync(async(req, res, next) => {
  if(!req.query.title) return next();

  let showtimes = await Showtime.find({start_time: { $gt: req.request_time }}).populate({path: 'room', select: 'name', populate: 'cinema'}).populate({path: 'movie', select: 'title imageCover'})
  const uniqueShowtime = new Set();
  let uniqueShowtimeList = showtimes.filter(showtime => {
    if (!uniqueShowtime.has(showtime.room.cinema.name)) {
      uniqueShowtime.add(showtime.room.cinema.name);
      return true;
    }
    return false;
  });
  
  uniqueShowtimeList = uniqueShowtimeList.filter(item => item.movie.title == req.query.title)
  let data = uniqueShowtimeList
  if(data.length < 1) {
    data = showtimes.filter(item => item.movie.title == req.query.title)
  }
  res.json({
    status: 'success',
    data
  })
})
exports.getShowtimeByCinema = catchAsync(async (req, res, next) => {
  if (!req.query.cinema) return next()
  let data = await Showtime.find({start_time: { $gt: req.request_time }})
  .populate({path: 'room', select: 'name', populate: 'cinema'})
  .populate({path: 'movie', select: 'title imageCover'})
  data = data.filter(showtime => showtime.room.cinema._id == req.query.cinema)
  res.status(200).json({
    status: 'success',
    data
  })
})
exports.getRequestTime = async(req, res, next) => {
  const now = new Date()
  now.setHours(now.getHours() + 7) 
  req.request_time = now
  next()
}

