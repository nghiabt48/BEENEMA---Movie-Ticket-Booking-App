const mongoose = require('mongoose')
const Movie = require('./movieModel');
const Showtime = require('./showtimeModel');
const AppError = require('../utils/appError');
const { getShowtimeByCinema } = require('../controller/showtimeController');

const currentTimestamp = Date.now();
const offsetHours = 7;
const date = new Date(currentTimestamp + offsetHours * 60 * 60 * 1000);
const ticketSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  showtime: {
    type: mongoose.Schema.ObjectId,
    ref: 'Showtime'
  },
  seats: [String],
  booking_time: {
    type: Date,
    default: date.toLocaleString()
  },
  ticket_code: {
    type: String,
    default: generateRandomString(5) // random strings for ticket codes
  }
})
function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
  }
  return result;
}
ticketSchema.statics.calculatePrice = async function (ticketID) {
  try {
    const ticket = await this.aggregate([
      {
        $match: { _id: ticketID }
      },
      {
        $lookup: {
          from: 'showtimes',
          localField: 'showtime',
          foreignField: '_id',
          as: 'showtimeData'
        }
      },
      {
        $unwind: '$showtimeData'
      },
      {
        $project: {
          price: '$showtimeData.price'
        }
      }
    ]);

    if (ticket.length > 0) {
      return ticket[0].price;
    }
    return null;
  } catch (error) {
    throw new Error(error);
  }
};
ticketSchema.pre(/^find/, async function (next) {
  this.populate({
    path: 'showtime',
    populate: [
      { path: 'room', model: 'Room', select: 'name', populate: { path: 'cinema', model: 'Cinema', select: 'name'} },
      { path: 'movie', model: 'Movie', select: 'title imageCover' }
    ]
  })
  next();
})
const Ticket = mongoose.model('Ticket', ticketSchema)
module.exports = Ticket