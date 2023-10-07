const mongoose = require('mongoose')

const showtimeSchema = new mongoose.Schema({
  room: {
      type: mongoose.Schema.ObjectId,
      ref: 'Room'
  },
  movie: {
      type: mongoose.Schema.ObjectId,
      ref: 'Movie'
  },
  time: [String],
  price: Number
})

const Showtime = mongoose.model('Showtime', showtimeSchema)
module.exports = Showtime