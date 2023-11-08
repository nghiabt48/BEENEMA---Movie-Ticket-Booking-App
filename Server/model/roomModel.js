const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
  cinema: {
      type: mongoose.Schema.ObjectId,
      ref: 'Cinema'
  },
  name: String,
  booked_seats: [String]
})

const Room = mongoose.model('Room', roomSchema)
module.exports = Room