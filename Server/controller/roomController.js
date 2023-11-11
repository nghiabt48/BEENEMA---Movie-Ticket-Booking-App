const Ticket = require('../model/ticketModel')
const factory = require('./handleFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Cinema = require('../model/cinemaModel')
const Room = require('../model/roomModel')


exports.createRoom = factory.createOne(Room)
exports.getAllRooms = factory.getAll(Room)
exports.getRoom = factory.getOne(Room)
exports.deleteRoom = factory.deleteOne(Room)
exports.updateRoom = factory.updateOne(Room)

exports.getRooms = catchAsync(async(req, res, next)=> { 
  let rooms
  if(req.query.cinema) {
    rooms = (await Room.find().populate({path: 'cinema', select: 'name'})).filter(room => room.cinema.name.includes(req.query.cinema))
  } else rooms = await Room.find().populate("cinema", "name")
  res.status(200).json({
    status: 'success',
    data: {
      rooms
    }
  })
})

