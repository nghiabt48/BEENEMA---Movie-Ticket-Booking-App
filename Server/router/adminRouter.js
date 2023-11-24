const express = require('express');
const router = express.Router();
const adminController = require('./../controller/adminController');
//login
router.get('/', function(req, res, next) {
    res.render('login', {title:'Admin'});
});
router.post('/login', adminController.login);
//router.use(adminController.protect);
// trang chủ
router.get('/test', function(req, res, next) {

    res.render('test');
});
//Movie
router.get('/index', adminController.getAllMovies);
router.get('/index/detailmovie/:id', adminController.movieDetail);
router.get('/index/deletemovie/:id', adminController.movie_delete);
router.get('/index/insert_getmovie', adminController.insertMovieGet);
router.post('/index/insert_postmovie', adminController.insertMoviePost);
router.post('/index/update_postmovie/:id', adminController.updateMoviePost);

//User
router.get('/user', adminController.getAllUsers);

//Category
router.get('/category', adminController.getAllCategory);
router.post('/category/insert_postcategory', adminController.insertCategoryPost);
router.get('/category/deletecategory/:id', adminController.deleteCategory);
router.get('/category/:id', adminController.detailCategory);
router.post('/category/update_postcategory/:id', adminController.updateCategoryPost);

module.exports = router