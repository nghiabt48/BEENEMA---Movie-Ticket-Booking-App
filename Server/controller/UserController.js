const User = require('./../model/userModel')
const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError')
const factory = require('./handleFactory');
const Ticket = require('../model/ticketModel');
const multer = require('multer');
const sharp = require('sharp');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single('avatar');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  res.status(201).json({
    status: 'success',
    path: req.file.filename
  })
});
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id
  next()
}
exports.getMyTickets = catchAsync(async (req, res, next) => {
  // // 1.Find all tickets
  // const tickets = await Ticket.find({ user: req.user.id})
  // // 2. Find tickets that contain user's id
  // const movieIDs = tickets.map(el => el.movie)
  // const movies = await Movie.find({ _id: { $in: movieIDs } })
  const tickets = await Ticket.find({ user: req.user.id})
  res.status(200).json({
    status: 'success',
    tickets
  })
})
exports.getAllUsers = factory.getAll(User)
exports.getUser = factory.getOne(User)
exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /change-password.',
        400
      )
    );
  }
  // 2) Filtered out unwanted fields names that are not allowed to be updated
        //Chỉ được update những field này 

  const filteredBody = filterObj(req.body, 'avatar','username', 'email', 'phone_number', 'address', 'location');

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});
exports.updateUser = factory.updateOne(User)