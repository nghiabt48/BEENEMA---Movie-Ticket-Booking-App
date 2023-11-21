const mongoose = require('mongoose')
const Movie = require('./movieModel');
const Showtime = require('./showtimeModel');
const AppError = require('../utils/appError');

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
    default: Date.now()
  },
  ticket_code: {
    type: String,
    default: "GKSNDS" // random strings for ticket codes
  }
})
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
ticketSchema.pre('save', async function(next) {
  if(!this.isModified('seat_number')) return next()
  const showtime = await Showtime.findById(this.showtime)
  this.price = showtime.price;
// ***********************************
  //Check ghế
  const bookedSeats = this.obtained_seat;  
  const availableSeats = showtime.available_seats;
  let updatedAvailableSeats
  // Check xem ghế có khả dụng không
  if(bookedSeats.every(seats => availableSeats.includes(seats)))
  {
    // Lọc và xóa các ghế đã được đặt khỏi danh sách ghế khả dụng
    updatedAvailableSeats = availableSeats.filter(
      seat => !bookedSeats.includes(seat)
    );
    // Cập nhật danh sách ghế khả dụng mới vào suất chiếu
    showtime.available_seats = updatedAvailableSeats
    await showtime.save()
  }
  else return next(new AppError("Ghế đã được đặt, hãy chọn ghế khác.", 400))
// ********************************
})
const Ticket = mongoose.model('Ticket', ticketSchema)
module.exports = Ticket