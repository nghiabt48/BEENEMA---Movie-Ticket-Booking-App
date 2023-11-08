var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./router/userRouter');
const productRouter = require('./router/movieRouter')
const cinemaRouter = require('./router/cinemaRouter')
const ticketRouter = require('./router/ticketRouter')
const paymentRouter = require('./router/paymentRouter')
const reviewRouter = require('./router/reviewRouter')
const showtimeRouter = require('./router/showtimeRouter')
const bookingRouter = require('./router/bookingRouter')
const actorRouter = require('./router/actorRouter')

const globalErrorHandler = require('./controller/errorController');
const AppError = require('./utils/appError');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/api/users/reset-password/:token', (req, res, next) => {
  const currentUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  res.render('ResetPassword', {token: req.params.token, currentUrl})
})

app.use('/api/showtimes', showtimeRouter)
app.use('/api/movies', productRouter)
app.use('/api/users', usersRouter)
app.use('/api/reviews', reviewRouter)
app.use('/api/cinemas', cinemaRouter)
app.use('/api/tickets', ticketRouter)
app.use('/api/payments', paymentRouter)
app.use('/api/bookings', bookingRouter)
app.use('/api/actors', actorRouter)
app.use('/api/rooms', require('./router/roomRouter'))
// error handler

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler)


module.exports = app;
