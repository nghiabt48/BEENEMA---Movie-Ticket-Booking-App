const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError')
const APIFeatures = require('./../utils/apiFeatures');

exports.getAll = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on tour (hack)
    let filter = {};
    if (req.params.movieId) filter = { movie: req.params.movieId };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    let query = features.query
    if(populateOptions){
      query = query.populate(populateOptions)
    }
    const doc = await query;
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc
      }
    });
  });

exports.deleteOne = Model => catchAsync(async (req, res, next) => {
  const document = await Model.findByIdAndDelete(req.params.id)
  if(!document) return next(new AppError('No document found with that id', 404))
  res.status(204).json({
    status: 'success',
    message: 'Document deleted successfully'
  })

})
exports.updateOne = (Model, filteredBody) => catchAsync(async (req, res, next) => {
  if(filteredBody) req.body = filteredBody
  let document = await Model.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
  if(!document) return next(new AppError('Document with this id not found', 404))
  res.status(200).json({
    status: 'success',
    data: {
      document
    }
  })
})
exports.createOne = Model => catchAsync(async (req, res, next) => {
  let document = await Model.create(req.body)
  res.status(201).json({
    status: 'success',
    data: {
      document
    }
  })
})
exports.getOne = (Model, populateOptions1, populateOptions2) => catchAsync(async (req, res, next) => {
  let query =  Model.findById(req.params.id)
  if(populateOptions1) query = query.populate(populateOptions1)
  if(populateOptions2) query = query.populate(populateOptions2)
  const document = await query
  if(!document) return next(new AppError('Document with this id not found', 404))
  res.status(201).json({
    status: 'success',
    data: {
      document
    }
  })
})
