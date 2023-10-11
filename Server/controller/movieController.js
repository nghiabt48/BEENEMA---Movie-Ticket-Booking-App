const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handleFactory');
const Movie = require('./../model/movieModel');
const multer = require('multer')
const sharp = require('sharp');

const multerStorage = multer.memoryStorage()
const multerFilter = (req, file, cb) => {
  if(file.mimetype.startsWith('image')) cb(null, true)
  else cb(new AppError('Not an image! Please upload only images.', 400), false);
}
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});
exports.uploadMovieImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 3 }
]);
exports.resizeMovieImages = catchAsync(async (req, res, next) => {
  if (!req.files.imageCover && !req.files.images) return next();
  // 1) Cover image
  req.body.imageCover = `movie-${Date.now()}-${req.files.imageCover[0].originalname}-cover.jpeg`;
  await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/movies/${req.body.imageCover}`);

  // 2) Images
  if(req.body.images){
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (file, i) => {
        const filename = `movies-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;
  
        await sharp(file.buffer)
          .resize(1000, 1500)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toFile(`public/img/movies/${filename}`);
  
        req.body.images.push(filename);
      })
    );
  }
  

  next();
});


// Get all products
exports.TopSellingMovie = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage';
  req.query.fields = 'title, genre, image, duration ,price, ratingsAverage';
  next();
};
exports.getAllMovies = factory.getAll(Movie)
//Get product by _id
exports.getMovieByID = factory.getOne(Movie, {path: 'reviews', select: '-__v'})
exports.getMovieByName = catchAsync(async (req, res, next) => {
  const title = req.query.title
  const movie = await Movie.find({title: {$regex: title, $options: 'i'}})
  res.status(200).json({
    status: 'success',
    movie
  })
})
// Create new product
exports.createMovie = catchAsync(async (req, res, next) => {
  const movie = await Movie.create(req.body)
  res.status(201).json({
    status: 'success',
    data: movie
  })
})
// router.post('/add',upload.single('image'), async (req, res) => {
//   try {
//     req.body.image = req.file.filename
//     await Product.create(req.body);
//     res.redirect('table')
//   } catch (err) {
//     res.status(400).json({
//       status: 'failed',
//       message: err
//     });
//   }
// })
// Update product
exports.updateMovie = factory.updateOne(Movie)
// router.patch('/table/:id', upload.single('image'), async (req, res) => {
//   try{
//     req.body.image = req.file.filename
//     await Product.findByIdAndUpdate(req.params.id, req.body, {runValidators: true})
//     res.redirect('/products/table')
//   } catch (err) {
//     res.send('err while updating product: ' + err.message)
//   }
// })
exports.deleteMovie = factory.deleteOne(Movie)




