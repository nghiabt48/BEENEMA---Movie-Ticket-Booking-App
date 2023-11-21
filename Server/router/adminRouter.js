const express = require('express');
const router = express.Router();
const adminController = require('./../controller/adminController');
//login
router.get('/', function(req, res, next) {
    res.render('login', {title:'Admin'});
});
// trang chủ
// router.get('/index', function(req, res, next) {

//     res.render('index', {title:'Admin Home'});
// });
//Movie
router.get('/index', adminController.getAllMovies);
router.get('/index/detailmovie/:id', adminController.movieDetail);
router.get('/index/deletemovie/:id', adminController.movie_delete);
router.get('/index/insert_getmovie', adminController.insertMovieGet);
router.post('/index/insert_postmovie', adminController.insertMoviePost);
router.post('/index/update_postmovie/:id', adminController.updateMoviePost);

//User
router.get('/user', adminController.getAllUsers);



module.exports = router