const mongoose = require('mongoose')

const logsSchema = new mongoose.Schema({
  showtime: {
    type: mongoose.Types.ObjectId,
    ref: 'Showtime',
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  room: {
    type: mongoose.Types.ObjectId,
    ref: 'Room',
  },
  seat_number: String,
  status: {
    type: String,
    enum: ['available', 'selected', 'reserved']
  }
})

const SeatLogs = mongoose.model('SeatLogs', logsSchema)
module.exports = SeatLogs