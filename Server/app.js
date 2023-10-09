var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

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

app.use('/api/users', usersRouter);
// error handler

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler)


module.exports = app;
