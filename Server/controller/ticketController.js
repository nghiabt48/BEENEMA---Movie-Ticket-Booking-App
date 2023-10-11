const Ticket = require('../model/ticketModel')
const factory = require('./handleFactory');
const catchAsync = require('../utils/catchAsync');
const Showtime = require('../model/showtimeModel');
const AppError = require('../utils/appError');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


exports.createTicket = catchAsync(async function(req, res, next) {
  const ticket = await Ticket.create({
    showtime: req.body.showtime,
    user: req.body.user,
    movie: req.body.movie,
    seat_number: req.body.seat_number
  })
  res.status(201).json({
    status: 'success',
    data: ticket
  })
})
exports.getAllTickets = factory.getAll(Ticket)
exports.getTicket = factory.getOne(Ticket, {path: 'showtime', select: 'start_time', populate: { path: 'cinema', select: 'name'}}, {path: 'movie', select: 'title'})
exports.deleteTicket = factory.deleteOne(Ticket)
exports.updateTicket = factory.updateOne(Ticket)

exports.getShowtime = catchAsync(async(req, res, next)=> {
   req.showtime = await Showtime.findById(req.params.showtimeId).populate({ path: 'movie cinema', select: 'title price name' })
   next()
})
exports.getTicketFromOneUser = catchAsync(async(req, res, next)=> {
  const user = req.user.id
  const tickets = await Ticket.find({user}).populate({path: 'movie', select: 'title'}).populate({path: 'showtime', select: 'start_time'})
  res.status(200).json({
    status: 'success',
    data: {
      ticket: tickets
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
