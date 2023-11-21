const Movie = require('../model/movieModel');   
const Category = require('../model/categoryModel');
const Actor = require('../model/actorModel');
const User = require('../model/userModel');
//Admin Login
//Movie
exports.getAllMovies = async(req, res) => {
    try{
        const movies = await Movie.find({});
        res.render("index.hbs", {
            titles: "Movies",
            movies:movies
        });
       
    }
    catch (error){
        console.log(`${error.name}: ${error.message}`);
        res.render("error.hbs");
    };
};

exports.movieDetail = async(req, res) => {
    try {
        const movies = await Movie.findById(req.params.id);
        res.render("movie_detail.hbs", {
            titles:"Movie Detail",
            title: movies.title,
            category: movies.category,
            ratingsAverage: movies.ratingsAverage,
            ratingsQuantity: movies.ratingsQuantity,
            imageCover: movies.imageCover,
            actor: movies.actor,
            trailer: movies.trailer,
            release_date: movies.release_date,
            description: movies.description,
            country: movies.country,
            _id:movies._id,
        });
    } catch (error) {
        console.log(`${error.name}: ${error.message}`);
        res.render("error.hbs");
    };
};

exports.movie_delete = async(req, res) => {
    try {
        const movies = await Movie.findByIdAndRemove(req.params.id);
        res.redirect("/index");
    } catch (error) {
        console.log(`${error.name}: ${error.message}`);
        res.render("error.hbs");
    };
};
exports.insertMovieGet = async(req, res) => {
    try {
        // let results = {
        //     category: await Category.find({}),
        //     actor: await Actor.find({})
        // }
        res.render('movie_insert', {
            title:'Insert Movie',
            // category: results.category,
            // actor: results.actor
        });
    } catch (error) {
        console.log(`${error.name}: ${error.message}`);
        res.render("error.hbs");
    };
};

exports.insertMoviePost = async(req, res) => {
    try {
        const movies = new Movie({
            title: req.body.title,
            category: req.body.category,
            ratingsAverage: req.body.ratingsAverage,
            ratingsQuantity: req.body.ratingsQuantity,
            imageCover: req.body.imageCover,
            actor: req.body.actor,
            trailer: req.body.trailer,
            release_date: req.body.release_date,
            description: req.body.description,
            country: req.body.country
        });
        await movies.save();
        res.redirect('/index');
    } catch (error) {
        console.log(`${error.name}: ${error.message}`);
        res.render("error.hbs");
    };
};

exports.updateMoviePost = async(req, res) => {
    try {
        const movies = {
            title: req.body.title,
            category: req.body.category,
            ratingsAverage: req.body.ratingsAverage,
            ratingsQuantity: req.body.ratingsQuantity,
            imageCover: req.body.imageCover,
            actor: req.body.actor,
            trailer: req.body.trailer,
            release_date: req.body.release_date,
            description: req.body.description,
            country: req.body.country,
            _id: req.params.id
        };
        const result = await Movie.findByIdAndUpdate(req.params.id, movies, { new: true });
        res.redirect('/index');
    } catch (error) {
        console.log(`${error.name}: ${error.message}`);
        res.render("error.hbs");
    };
};

//User
exports.getAllUsers = async(req, res) => {
    try{
        const users = await User.find({});
        res.render("user.hbs", {
            titles: "List Users",
            users:users
        });
       
    }   
    catch (error){
        console.log(`${error.name}: ${error.message}`);
        res.render("error.hbs");
    };
};
