const Movie = require('../model/movieModel');   
const Category = require('../model/categoryModel');
const Actor = require('../model/actorModel');
const User = require('../model/userModel');
const Room = require('../model/roomModel');
const Cinema = require('../model/cinemaModel');
const Showtime = require('../model/showtimeModel');
const Ticket = require('../model/ticketModel');
const catchAsync = require('./../utils/catchAsync');
const jwt = require('jsonwebtoken');

//firebase
// const { initializeApp } = require("firebase/app");
// const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");

//lưu ảnh, lưu trailer


//Admin Login
// const signToken = id => {
//     return jwt.sign({id}, process.env.JWT_SECRET, {
//       expiresIn: process.env.JWT_EXPIRES_IN
//     })
//   }
//   const sendToken = (user, statusCode, req, res) => {
//     const token = signToken(user._id);
//     res.cookie('jwt', token, {
//       expires: new Date(
//         Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
//       ),
//       httpOnly: true,
//       secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
//     });
  
//     // Remove password from output
//     user.password = undefined;
  
//     res.redirect('/index');
//   };

  
// exports.login = catchAsync(async (req, res, next) => {
//     const { email, password } = req.body;
    
//     // 1) Check if email and password exist
//     if (!email || !password) {
//         res.render("error.hbs");
//     }
//     // 2) Check if user exists && password is correct
//     const user = await User.findOne({ email }).select('+password');
//     if (!user) {
//         res.render("error.hbs");
//     }
  
//     // 3) If everything ok, send token to client
//     sendToken(user, 200,req, res);
//   });

//Movie
exports.getAllMovies = async(req, res) => {
    try{
        const movies = await Movie.find({}).lean();
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
        const movies = await Movie.findById(req.params.id).populate({path:'actor', select:'name'}).lean();
        let results = {
            option_category: await Category.find({}).lean(),
            option_actor: await Actor.find({}).lean()
        }

        res.render("movie_detail.hbs", {
            //movie
            titles:"Movie Detail",
            title: movies.title,
            category: movies.category,
            ratingsAverage: movies.ratingsAverage,
            ratingsQuantity: movies.ratingsQuantity,
            imageCover: movies.imageCover,
            actor: movies.actor[0],
            trailer: movies.trailer,
            release_date: movies.release_date,
            description: movies.description,
            country: movies.country,
            _id:movies._id,
            //movie category, actor option để update
            option_category: results.option_category,
            option_actor: results.option_actor
        });
    } catch (error) {
        console.log(`${error.name}: ${error.message}`);
        res.render("error.hbs");
    };
};

exports.movie_delete = async(req, res) => {
    try {
        const movies = await Movie.findByIdAndRemove(req.params.id).lean();
        res.redirect("/index");
    } catch (error) {
        console.log(`${error.name}: ${error.message}`);
        res.render("error.hbs");
    };
};
exports.insertMovieGet = async(req, res) => {
    try {
        let results = {
            option_category: await Category.find({}).lean(),
            option_actor: await Actor.find({}).lean()
        }
        res.render('movie_insert', {
            titles:'Insert Movie',
            option_category: results.option_category,
            option_actor: results.option_actor
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
        console.log(req.files);
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
        };
        const result = await Movie.findByIdAndUpdate(req.params.id, movies, { new: true }).lean();
        res.redirect('/index');
    } catch (error) {
        console.log(`${error.name}: ${error.message}`);
        res.render("error.hbs");
    };
};

//User
exports.getAllUsers = async(req, res) => {
    try{
        const users = await User.find({}).lean();
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
//Category
exports.getAllCategory = async(req, res) => {
    try{
        const categories = await Category.find({}).lean();
        res.render("category.hbs", {
            titles: "List Categories",
            categories:categories
        });
       
    }   
    catch (error){
        console.log(`${error.name}: ${error.message}`);
        res.render("error.hbs");
    };
};
exports.insertCategoryPost = async(req, res) => {
    try {
        const categories = new Category({
            name:req.body.name
        });
        await categories.save();
        res.redirect('/category');
    } catch (error) {
        console.log(`${error.name}: ${error.message}`);
        res.render("error.hbs");
    };
};
exports.deleteCategory = async(req, res) => {
    try {
        const categories = await Category.findByIdAndRemove(req.params.id).lean();
        res.redirect("/category");
    } catch (error) {
        console.log(`${error.name}: ${error.message}`);
        res.render("error.hbs");
    };
};
exports.updateCategoryPost = async(req, res) => {
    try {
        const categories = {
            name: req.body.name,
        };
        const result = await Category.findByIdAndUpdate(req.params.id, categories, { new: true }).lean();
        res.redirect('/category')
    } catch (error) {
        console.log(`${error.name}: ${error.message}`);
        res.render("error.hbs");
    };
};
exports.detailCategory = async(req, res) => {
    try {
        const categories = await Category.findById(req.params.id).lean();
        res.render("category_detail.hbs", {
            //movie
            titles:"Category Detail",
            name: categories.name,
            _id: categories._id
        });
    } catch (error) {
        console.log(`${error.name}: ${error.message}`);
        res.render("error.hbs");
    };
};
//Room
exports.getAllRoom = async(req, res) => {
    try{
        const rooms = await Room.find({}).populate({path: 'cinema', select: 'name'}).lean();
        const cinemas = await Cinema.find({}).lean();
        res.render("room.hbs", {
            titles: "List Rooms",
            rooms: rooms,
            cinema: cinemas
        });
       
    }
    catch (error){
        console.log(`${error.name}: ${error.message}`);
        res.render("error.hbs");
    };
};

exports.insertRoomPost = async(req, res) => {
    try {
        const rooms = new Room({
            cinema: req.body.cinema,
            name:req.body.name
        });
        await rooms.save();
        res.redirect('/room');
    } catch (error) {
        console.log(`${error.name}: ${error.message}`);
        res.render("error.hbs");
    };
};
exports.deleteRoom = async(req, res) => {
    try {
        const rooms = await Room.findByIdAndRemove(req.params.id).lean();
        res.redirect("/room");
    } catch (error) {
        console.log(`${error.name}: ${error.message}`);
        res.render("error.hbs");
    };
};
// exports.detailRoom = async(req, res) => {
//     try {
//         const rooms = await Room.findById(req.params.id).lean();
//         res.render("room_detail.hbs", {
//             titles:"Room Detail",
//             cinema: rooms.cinema,
//             name: rooms.name,
//             _id: rooms._id
//         });
//     } catch (error) {
//         console.log(`${error.name}: ${error.message}`);
//         res.render("error.hbs");
//     };
// };
// exports.updateRoomPost = async(req, res) => {
//     try {
//         const rooms = {
//             cinema: req.body.name,
//             name: req.body.name
//         };
//         const result = await Category.findByIdAndUpdate(req.params.id, rooms, { new: true }).lean();
//         res.redirect('/room')
//     } catch (error) {
//         console.log(`${error.name}: ${error.message}`);
//         res.render("error.hbs");
//     };
// };

//Cinema
exports.getAllCinema = async(req, res) => {
    try{
        const cinemas = await Cinema.find({}).lean();
        res.render("cinema.hbs", {
            titles: "List Cinemas",
            cinemas: cinemas
        });
       
    }
    catch (error){
        console.log(`${error.name}: ${error.message}`);
        res.render("error.hbs");
    };
};

exports.insertCinemaPost = async(req, res) => {
    try {
        const cinemas = new Cinema({
            name: req.body.name,
            location:[
                req.body.coordinates, 
                req.body.address, 
                req.body.description
            ]
        });
        console.log(req.body);
        await cinemas.save();
        res.redirect('/cinema');
    } catch (error) {
        console.log(`${error.name}: ${error.message}`);
        res.render("error.hbs");
    };
};

exports.deleteCinema = async(req, res) => {
    try {
        const cinemas = await Cinema.findByIdAndRemove(req.params.id).lean();
        res.redirect("/cinema");
    } catch (error) {
        console.log(`${error.name}: ${error.message}`);
        res.render("error.hbs");
    };
};
exports.detailCinema = async(req, res) => {
    try {
        const cinemas = await Cinema.findById(req.params.id).lean();
        res.render("cinema_detail.hbs", {
            //movie
            titles:"Cinema Detail",
            name: cinemas.name,
            location: cinemas.location
        });
        console.log(cinemas)
    } catch (error) {
        console.log(`${error.name}: ${error.message}`);
        res.render("error.hbs");
    };
};
//Showtime
//Cinema
exports.getAllShowtime = async(req, res) => {
    try{
        const showtimes = await Showtime.find({}).populate({path: 'movie room', select: 'title name'}).lean();
        const rooms = await Room.find({}).lean();
        const movies = await Movie.find({}).lean();
        res.render("showtime.hbs", {
            titles: "List Cinemas",
            showtimes: showtimes,
            rooms: rooms,
            movies: movies
        });
       
    }
    catch (error){
        console.log(`${error.name}: ${error.message}`);
        res.render("error.hbs");
    };
};

exports.insertShowtimePost = async(req, res) => {
    try {
        const showtimes = new Showtime({
            room: req.body.room,
            movie: req.body.movie,
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            price: req.body.price
        });
        await showtimes.save();
        res.redirect('/showtime');
    } catch (error) {
        console.log(`${error.name}: ${error.message}`);
        res.render("error.hbs");
    };
};

exports.deleteShowtime = async(req, res) => {
    try {
        const showtimes = await Showtime.findByIdAndRemove(req.params.id).lean();
        res.redirect("/showtime");
    } catch (error) {
        console.log(`${error.name}: ${error.message}`);
        res.render("error.hbs");
    };
};

//Thống kê(của Nghĩa)
exports.ThongkeDoanhThu = async(req, res) => {
    try{
        const movies = await Movie.find({}).lean();
        const users = await User.find({}).lean();
        const query = await Ticket.aggregate([
            {
            $match: {
                $expr: {
                $and: [
                    { $eq: [{ $month: "$booking_time" }, parseInt(req.query.month)] },
                    { $eq: [{ $year: "$booking_time" }, parseInt(req.query.year)] }
                ]
                }
            }
            }
        ]
        );
        const results = await Ticket.populate(query, 'showtime')
        const priceArr = results.map(item => item.showtime.price)
        res.render(
            "statistic.hbs",{
                so_luong_ve: results.length,
                tong_tien: priceArr.reduce((accumulator, currentValue) => accumulator + currentValue,
                0),
                movies: movies.length,
                users: users.length    
        });
    }
    catch (error){
        console.log(`${error.name}: ${error.message}`);
        res.render("error.hbs");
    };
}

