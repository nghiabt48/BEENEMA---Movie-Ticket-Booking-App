const express = require('express');
const ticketController = require('./../controller/ticketController')
const router = express.Router()
const authCOntroller = require('../controller/authController')

router.use(authCOntroller.protect)

router.get('/checkout/:showtimeId/:seats', authCOntroller.protect, ticketController.getCheckout)
router.post('/checkout/:showtimeId/create-ticket',ticketController.getShowtime, ticketController.createTicketCheckout) 
router.route('/user').get(ticketController.getTicketFromOneUser)

router.route('/:id')
  .get(ticketController.getTicket)
  .patch(ticketController.updateTicket)
  .delete(ticketController.deleteTicket)

router.use(authCOntroller.restrictTo('admin'))
router
  .route('/')
  .get(ticketController.getAllTickets)
  .post(ticketController.createTicket)
module.exports = router