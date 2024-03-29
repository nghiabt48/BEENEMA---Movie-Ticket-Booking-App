const jwt = require('jsonwebtoken')
const User = require('./../model/userModel')
const { promisify } = require('util');
const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError');
const Email = require('../utils/email');
const crypto = require('crypto')

const signToken = id => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}
const sendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
  });

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};
exports.protect =catchAsync(async(req, res, next) => {
  // Get token
  let token
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
  {
    token = req.headers.authorization.split(' ')[1];
  } 
  
  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
})

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};
exports.register = catchAsync(async(req, res, next) => {
  const newUser = await User.create({
    username: req.body.username,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    email: req.body.email
  })
  res.status(201).json({
    status: 'success',
    data: newUser
  })
})
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) If everything ok, send token to client
  sendToken(user, 200,req, res);
});
exports.forgetPassword = catchAsync(async (req, res, next) => {
// 1) Get user based on POSTed email
const user = await User.findOne({ email: req.body.email });
if (!user) {
  return next(new AppError('There is no user with email address.', 404));
}

// 2) Generate the random reset token
const resetToken = user.createPasswordResetToken();
await user.save({ validateBeforeSave: false });

// 3) Send it to user's email
try {
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/users/reset-password/${resetToken}`;
  await new Email(user, resetURL).sendPasswordReset();

  res.status(200).json({
    status: 'success',
    message: 'Token sent to email!'
  });
} catch (err) {
  console.log(err)
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save({ validateBeforeSave: false });

  return next(
    new AppError('There was an error sending the email. Try again later!'),
    500
  );
}
})
exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save({validateBeforeSave: false});

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  sendToken(user, 200,req, res);
});

exports.changePassword = catchAsync(async (req, res, next) => {
  // const token = req.headers.authorization.split(' ')[1]
  // console.log(token)
  // if(token === null){
  //   return next(new AppError('Please Login again', 401))
  // }
  const user = await User.findById(req.user.id).select('+password')
  if(user)
  {
    if(!await(user.correctPassword(req.body.password, user.password)))
    return next(new AppError('Current password is not correct', 401));

    user.password = req.body.newpassword
    user.passwordConfirm = req.body.passwordconfirm
    await user.save()

    sendToken(user, 200, req, res)
  }
})
