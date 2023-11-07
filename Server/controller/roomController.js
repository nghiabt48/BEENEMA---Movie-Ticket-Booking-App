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

exports.getRoomByCinema = catchAsync(async(req, res, next)=> {
  const cinema = req.query.cinema
  const rooms = await Room.find().populate({path: 'cinema', match: {name: cinema}})
  res.status(200).json({
    status: 'success',
    data: {
      rooms
    }
  })
})
exports.getCheckout = catchAsync(async (req, res, next) => {
  const showtime = await Showtime.findById(req.params.showtimeId).populate({ path: 'movie cinema', select: 'title price name' })
  // Create payment intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: showtime.movie.price * req.params.seats,
    currency: "vnd",
    automatic_payment_methods: {
      enabled: true
    }
  })
  // Return the secret
  res.status(200).json({
    status: 'success',
    paymentIntent: paymentIntent.client_secret
  })
})
exports.createTicketCheckout = catchAsync(async(req, res, next) => {
  const showtime = req.showtime
  const { price, seat_number} = req.body

  if( !req.user.id || !price || !showtime || !seat_number) return next(new AppError("Don't have enough fields to create a ticket"), 400)
  const ticket = await Ticket.create({user: req.user.id, movie: showtime.movie, showtime,seat_number, price})
  res.status(201).json({
    status: 'success',
    data: ticket
  })
})
