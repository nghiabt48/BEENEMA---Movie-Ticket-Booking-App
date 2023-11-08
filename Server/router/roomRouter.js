const express = require('express');
const roomController = require('./../controller/roomController');
const router = express.Router()

router.route('/').get(roomController.getRooms).post(roomController.createRoom)
router.route('/:id').patch(roomController.updateRoom).delete(roomController.deleteRoom)
module.exports = router